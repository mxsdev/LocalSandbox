import child_process from "node:child_process"
import { version } from "../../package.json"
import {
  type Command,
  createCommand,
  Option,
} from "@commander-js/extra-typings"
import { startLocalSandboxServer } from "lib/server/start-server.js"
import {
  DEFAULT_LOCALSANDBOX_AMQP_PORT,
  DEFAULT_LOCALSANDBOX_PORT,
  getServerEnv,
  type ServerEnv,
} from "lib/server/env.js"
import { checkConfig } from "lib/server/check-config.js"
import { z } from "zod"
import detectPort from "detect-port"
import {
  getDefaultConfigStore,
  type StoreConfig,
} from "lib/config/config-store.js"
import path from "node:path"

global.__dirname ??= import.meta.dirname

const configstore = getDefaultConfigStore()

const checkServerRunning = async (config: StoreConfig) => {
  const res =
    config.server &&
    (await detectPort(config.server.port)) !== config.server.port

  if (!res) {
    configstore.update({
      server: undefined,
    })
  }

  return res
}

const getEnvironmentVariableHelp = (
  vals: Partial<
    Record<
      keyof ServerEnv,
      {
        help: string
        default?: string
      }
    >
  >,
) => {
  const max_width = Math.max(...Object.keys(vals).map((key) => key.length))

  return [
    "",
    "Environment Variables:",
    ...Object.entries(vals).map(([key, val]) => {
      const default_val = val.default ? ` (default: ${val.default})` : ""

      return `  ${key.padEnd(max_width)}  ${val.help}${default_val}`
    }),
  ].join("\n")
}

const server_help = getEnvironmentVariableHelp({
  LOCALSANDBOX_DISABLE_DEFAULT_RESOURCES: {
    help: "Disable creation of default resources",
    default: "false",
  },

  LOCALSANDBOX_DEFAULT_LOCATION: {
    help: "Location to use for default created resources",
    default: "default",
  },

  LOCALSANDBOX_DEFAULT_NAMESPACE: {
    help: "Default namespace to create on startup",
    default: "default",
  },

  LOCALSANDBOX_DEFAULT_QUEUE: {
    help: "Name of default queue to create on startup",
    default: "default",
  },

  LOCALSANDBOX_DEFAULT_RESOURCE_GROUP: {
    help: "Name of default resource group to create on startup",
    default: "default",
  },

  LOCALSANDBOX_DEFAULT_SUBSCRIPTION_ID: {
    help: "Default subscription id to use",
    default: "default",
  },
})

const PORT_OPTION = new Option(
  "-p --port <PORT>",
  "Port to run the API server on",
)
  .argParser((v) => z.coerce.number().parse(v))
  .env("LOCALSANDBOX_PORT")
  .default(DEFAULT_LOCALSANDBOX_PORT)

const AMQP_PORT_OPTION = new Option(
  "--amqp-port <PORT>",
  "Port to run the AMQP broker on",
)
  .argParser((v) => z.coerce.number().parse(v))
  .env("LOCALSANDBOX_AMQP_PORT")
  .default(DEFAULT_LOCALSANDBOX_AMQP_PORT)

const LOG_LEVEL_OPTION = new Option("-l --log-level <LEVEL>", "Log level")
  .env("LOG_LEVEL")
  .choices(["info", "debug", "error", "warn", "trace"] as const)
  .argParser((v) => v.toLowerCase())
  .default("info")

export const runCli = (_program: Command) => {
  const program = _program

  const run_cmd = program
    .createCommand("run")
    .description("Start LocalSandbox server")
    .addOption(LOG_LEVEL_OPTION)
    .addOption(PORT_OPTION)
    .addOption(AMQP_PORT_OPTION)
    .addHelpText("after", server_help)
    .action(async ({ port, amqpPort, logLevel }) => {
      const env = getServerEnv({
        LOCALSANDBOX_PORT: port,
        LOCALSANDBOX_AMQP_PORT: amqpPort,
        LOG_LEVEL: logLevel,
      })

      await startLocalSandboxServer({ env })
    })

  const start_cmd = createCommand("start")
    .description("Start LocalSandbox server in the background")
    .addOption(LOG_LEVEL_OPTION)
    .addOption(PORT_OPTION)
    .addOption(AMQP_PORT_OPTION)
    .addHelpText("after", server_help)
    .action(async ({ port, amqpPort, logLevel }) => {
      const env = getServerEnv({
        LOCALSANDBOX_PORT: port,
        LOCALSANDBOX_AMQP_PORT: amqpPort,
        LOG_LEVEL: logLevel,
      })

      const logger = console

      const config = configstore.get()
      if (await checkServerRunning(config)) {
        logger.error(`Server is already running on port ${config.server!.port}`)
        process.exitCode = 1
        return
      }

      const start_server_module_path = path.join(__dirname, "start-server.js")

      if (!start_server_module_path) {
        logger.error("Could not find start-server.js script")
        process.exitCode = 1
        return
      }

      if (!(await checkConfig({ env, logger }))) {
        process.exitCode = 1
        return
      }

      const proc = child_process.fork(start_server_module_path, {
        detached: true,
        stdio: "ignore",
        env: {
          ...process.env,
          ...Object.fromEntries(
            Object.entries(env).map(([key, val]) => {
              return [key, val.toString()]
            }),
          ),
        },
      })

      proc.disconnect()
      proc.unref()

      const { pid } = proc

      if (pid == null) {
        logger.error(`Failed to fork process!`)
        process.exitCode = 1
        return
      }

      configstore.update({
        server: {
          port: env.LOCALSANDBOX_PORT,
          pid,
        },
      })

      logger.info(`Server started on pid ${pid}`)
    })

  const stop_cmd = createCommand("stop")
    .description("Stop server running in the background")
    .action(async () => {
      const config = configstore.get()
      const logger = console

      if (!(await checkServerRunning(config))) {
        logger.error(`Server is not running!`)
        process.exitCode = 1

        return
      }

      try {
        process.kill(config.server!.pid)
        configstore.update({
          ...config,
          server: undefined,
        })
        logger.info(`Server stopped`)
      } catch (e) {
        logger.error(`Failed to stop server`, { err: e })
        process.exitCode = 1
      }
    })

  const status_command = createCommand("status")
    .description("Check the status of the running server")
    .action(async () => {
      const config = configstore.get()
      const logger = console

      if (config.server) {
        if (!(await checkServerRunning(config))) {
          logger.info(`Server crashed (pid ${config.server.pid})`)
        } else {
          logger.info(
            `Server is running on port ${config.server.port}, pid ${config.server.pid}`,
          )
        }
      } else {
        logger.info(`Server is not running`)
      }
    })

  program
    .version(version)
    .addCommand(run_cmd)
    .addCommand(start_cmd)
    .addCommand(stop_cmd)
    .addCommand(status_command)
    .parse()
}
