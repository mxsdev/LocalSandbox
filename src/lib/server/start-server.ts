import { createApiBundle } from "lib/api/index.js"
import { serve } from "lib/api/serve.js"
import { getLogger } from "lib/logger/index.js"
import type { ServerEnv } from "./env.js"
import { checkConfig } from "./check-config.js"
import {
  isAddressInUseException,
  isErrnoException,
} from "lib/util/is-errno-exception.js"

export const startLocalSandboxServer = async ({ env }: { env: ServerEnv }) => {
  let on_complete: (() => void | Promise<void>)[] = []

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
      amqp_logger: { logger: amqp_logger },
    })

    const api_server = await serve(bundle, env.LOCALSANDBOX_PORT)
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

    if (isErrnoException(e)) {
      if (isAddressInUseException(e)) {
        logger.error(
          `Port ${e.port} is already in use. Please use a different port.`,
        )
      }
      return
    }

    logger.error({ err: e }, "Error starting server")
  } finally {
    for (const fn of on_complete) {
      await fn()
    }
  }
}
