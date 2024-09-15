import { createApiBundle } from "lib/api/index.js"
import { serve } from "lib/api/serve.js"
import { getLogger } from "lib/logger/index.js"
import { getServerEnv, type ServerEnv } from "./env.js"
import { checkConfig } from "./check-config.js"
import {
  isAddressInUseException,
  isErrnoException,
} from "lib/util/is-errno-exception.js"
import {
  type ConfigStore,
  getDefaultConfigStore,
} from "lib/config/config-store.js"
import { ConfigCertificateStore } from "lib/cert/certificate-store.js"

export const startLocalSandboxServer = async ({
  env = getServerEnv(),
  config,
}: { env?: ServerEnv; config?: ConfigStore } = {}) => {
  let on_complete: (() => void | Promise<void>)[] = []
  config ??= await getDefaultConfigStore()

  try {
    const logger = getLogger({ level: env.LOG_LEVEL })

    if (!(await checkConfig({ env, logger }))) {
      process.exitCode = 1
      return
    }

    process.on("uncaughtException", function (err) {
      // Handle the error safely
      logger.error("Uncaught exception", {
        err,
        stack: err.stack,
        name: err.name,
      })
    })

    process.on("unhandledRejection", (reason, promise) => {
      // Handle the error safely
      logger.error("Unhandled Rejection at: Promise", { promise, reason })
    })

    const amqp_logger = getLogger({
      level: env.LOG_LEVEL,
      app: "amqp",
    })

    logger.info("Starting API server...")

    const { amqp_server, bundle } = createApiBundle({
      logger,
      amqp_logger: { logger: amqp_logger },
    })

    const api_server = await serve(
      bundle,
      env.LOCALSANDBOX_PORT,
      new ConfigCertificateStore(config, env),
    )

    on_complete.push(() => {
      logger.info("Closing api server...")
      api_server.close()
      logger.info("API server closed")
    })

    logger.info(`API listening on port ${env.LOCALSANDBOX_PORT}`)

    amqp_server.port = env.LOCALSANDBOX_AMQP_PORT

    await amqp_server.open()
    on_complete.push(async () => {
      await amqp_server.close()
    })

    await new Promise<void>((resolve, reject) => {
      let shutdown = false

      const gracefulShutdown = async () => {
        if (shutdown) return
        shutdown = true

        try {
          logger.info("Shutting down gracefully...")

          for (const fn of on_complete) {
            await fn()
          }

          on_complete = []

          logger.info("Graceful shutdown completed successfully.")

          setTimeout(() => {
            logger.error("Graceful shutdown took too long. Exiting.")
            process.exit(1)
          }, 1000).unref()

          resolve()
        } catch (e) {
          reject(e)
        }
      }

      process.on("SIGINT", async () => {
        logger.info("Received signal SIGINT")
        process.exitCode = 1
        await gracefulShutdown()
      })
    })
  } catch (e) {
    process.exitCode = 1

    const logger = getLogger()

    if (isErrnoException(e) && isAddressInUseException(e)) {
      logger.error(
        `Port ${e.port} is already in use. Please use a different port.`,
      )
    } else {
      logger.error({ err: e }, "Error starting server")
    }
  } finally {
    for (const fn of on_complete) {
      await fn()
    }
  }
}
