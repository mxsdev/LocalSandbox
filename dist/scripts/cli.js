import { createRequire } from 'module';const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;
import {
  checkConfig,
  getServerEnv,
  startLocalSandboxServer
} from "./chunk-FMIF4OJI.js";

// scripts/cli.ts
import { program } from "@commander-js/extra-typings";

// src/cli/index.ts
import path from "node:path";
import child_process from "node:child_process";

// package.json
var version = "1.0.0";

// src/cli/index.ts
import { createCommand } from "@commander-js/extra-typings";
import { findUp } from "find-up";
import Configstore from "configstore";
import { z } from "zod";
import detectPort from "detect-port";
var storeSchema = z.object({
  server: z.object({
    port: z.number(),
    pid: z.number()
  }).optional()
}).optional().default({});
var store = new Configstore("localsandbox", {
  config: storeSchema.parse(void 0)
});
var getConfig = () => {
  return storeSchema.safeParse(store.get("config")).data ?? {};
};
var setConfig = (config) => {
  store.set("config", storeSchema.parse(config));
};
var checkServerRunning = async (config) => {
  const res = config.server && await detectPort(config.server.port) !== config.server.port;
  if (!res) {
    setConfig({
      ...config,
      server: void 0
    });
  }
  return res;
};
var runCli = (program2) => {
  const run_cmd = createCommand("run").description("Start LocalSandbox server").action(async () => {
    await startLocalSandboxServer();
  });
  const start_cmd = createCommand("start").description("Start LocalSandbox server in the background").action(async () => {
    const env = getServerEnv();
    const logger = console;
    const config = getConfig();
    if (await checkServerRunning(config)) {
      logger.error(`Server is already running on port ${config.server.port}`);
      process.exitCode = 1;
      return;
    }
    const package_json_file = await findUp("package.json", {
      cwd: import.meta.dirname
    });
    if (!package_json_file) {
      throw new Error("Could not find root package.json");
    }
    if (!await checkConfig({ env, logger })) {
      process.exit(1);
    }
    const root_dir = path.dirname(package_json_file);
    const start_server_module_path = path.join(
      root_dir,
      "dist/scripts/start-server.js"
    );
    const proc = child_process.fork(start_server_module_path, {
      detached: true,
      stdio: "ignore"
    });
    proc.disconnect();
    proc.unref();
    const { pid } = proc;
    if (pid == null) {
      logger.error(`Failed to fork process!`);
      process.exitCode = 1;
      return;
    }
    setConfig({
      ...config,
      server: {
        port: env.LOCALSANDBOX_PORT,
        pid
      }
    });
    logger.info(`Server started on pid ${pid}`);
  });
  const stop_cmd = createCommand("stop").description("Stop server running in the background").action(async () => {
    const config = getConfig();
    const logger = console;
    if (!await checkServerRunning(config)) {
      logger.error(`Server is not running!`);
      process.exitCode = 1;
      return;
    }
    try {
      process.kill(config.server.pid);
      setConfig({
        ...config,
        server: void 0
      });
      logger.info(`Server stopped`);
    } catch (e) {
      logger.error(`Failed to stop server`, { err: e });
      process.exitCode = 1;
    }
  });
  const status_command = createCommand("status").description("Check the status of the running server").action(async () => {
    const config = getConfig();
    const logger = console;
    if (config.server) {
      if (!await checkServerRunning(config)) {
        logger.info(`Server crashed (pid ${config.server.pid})`);
      } else {
        logger.info(
          `Server is running on port ${config.server.port}, pid ${config.server.pid}`
        );
      }
    } else {
      logger.info(`Server is not running`);
    }
  });
  program2.version(version).addCommand(run_cmd).addCommand(start_cmd).addCommand(stop_cmd).addCommand(status_command).parse();
};

// scripts/cli.ts
runCli(program);
