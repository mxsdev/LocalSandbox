import path from "node:path"
import child_process from "node:child_process"
import { version } from "../../package.json"
import {
  type Command,
  createCommand,
  Option,
} from "@commander-js/extra-typings"
import { startLocalSandboxServer } from "lib/server/start-server.js"
import { findUp } from "find-up"
import {
  DEFAULT_LOCALSANDBOX_AMQP_PORT,
  DEFAULT_LOCALSANDBOX_PORT,
  getServerEnv,
  type ServerEnv,
} from "lib/server/env.js"
import { checkConfig } from "lib/server/check-config.js"
import Configstore from "configstore"
import { z } from "zod"
import detectPort from "detect-port"

const storeSchema = z
  .object({
    server: z
      .object({
        port: z.number(),
        pid: z.number(),
      })
      .optional(),
  })
  .optional()
  .default({})

const store = new Configstore("localsandbox", {
  config: storeSchema.parse(undefined),
})

const getConfig = () => {
  return storeSchema.safeParse(store.get("config")).data ?? {}
}

const setConfig = (config: z.infer<typeof storeSchema>) => {
  store.set("config", storeSchema.parse(config))
}

type StoreConfig = ReturnType<typeof getConfig>

const checkServerRunning = async (config: StoreConfig) => {
  const res =
    config.server &&
    (await detectPort(config.server.port)) !== config.server.port

  if (!res) {
    setConfig({
      ...config,
      server: undefined,
    })
  }

  return res
}

const getEnvironmentVariableHelp = (
  vals: Partial<Record<keyof ServerEnv, string>>,
) => {
  const max_width = Math.max(...Object.keys(vals).map((key) => key.length))

  return [
    "",
    "Environment Variables:",
    ...Object.entries(vals).map(([key, val]) => {
      return `  ${key.padEnd(max_width)}  ${val}`
    }),
  ].join("\n")
}

const PORT_OPTION = new Option(
  "-p --port <PORT>",
  "Port to run the API server on",
)
  .argParser((v) => z.coerce.number().parse(v))
  .default(DEFAULT_LOCALSANDBOX_PORT)

const AMQP_PORT_OPTION = new Option(
  "--amqp-port <PORT>",
  "Port to run the AMQP broker on",
)
  .argParser((v) => z.coerce.number().parse(v))
  .default(DEFAULT_LOCALSANDBOX_AMQP_PORT)

const LOG_LEVEL_OPTION = new Option("-l --log-level <LEVEL>", "Log level")
  .choices(["info", "debug", "error", "warn", "trace"] as const)
  .argParser((v) => v.toLowerCase())
  .default("info")

const SERVER_ENV_VAR_HELP = getEnvironmentVariableHelp({
  LOCALSANDBOX_PORT: "Port to run the API server on",
  LOCALSANDBOX_AMQP_PORT: "Port to run the AMQP broker on",
  LOG_LEVEL: "Log level",
})

export const runCli = (_program: Command) => {
  const program = _program

  const run_cmd = program
    .createCommand("run")
    .description("Start LocalSandbox server")
    .addOption(LOG_LEVEL_OPTION)
    .addOption(PORT_OPTION)
    .addOption(AMQP_PORT_OPTION)
    .addHelpText("after", SERVER_ENV_VAR_HELP)
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
    .addHelpText("after", SERVER_ENV_VAR_HELP)
    .action(async ({ port, amqpPort, logLevel }) => {
      const env = getServerEnv({
        LOCALSANDBOX_PORT: port,
        LOCALSANDBOX_AMQP_PORT: amqpPort,
        LOG_LEVEL: logLevel,
      })

      const logger = console
      const config = getConfig()

      const package_json_file = await findUp("package.json", {
        cwd: import.meta.dirname,
      })
      if (!package_json_file) {
        throw new Error("Could not find root package.json")
      }

      if (!(await checkConfig({ env, logger }))) {
        process.exit(1)
      }

      const root_dir = path.dirname(package_json_file)

      const start_server_module_path = path.join(
        root_dir,
        "dist/scripts/start-server.js",
      )

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

      setConfig({
        ...config,
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
      const config = getConfig()
      const logger = console

      if (!(await checkServerRunning(config))) {
        logger.error(`Server is not running!`)
        process.exitCode = 1

        return
      }

      try {
        process.kill(config.server!.pid)
        setConfig({
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
      const config = getConfig()
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
