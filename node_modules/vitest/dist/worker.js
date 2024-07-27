import { pathToFileURL } from 'node:url';
import { workerId } from 'tinypool';
import { ViteNodeRunner, ModuleCacheMap } from 'vite-node/client';
import { readFileSync } from 'node:fs';
import { resolve, normalize } from 'pathe';
import { e as environments } from './vendor/index.D4nqnQWz.js';
import { i as isChildProcess, s as setProcessTitle } from './vendor/base.DRHPZCCj.js';
import { s as setupInspect } from './vendor/inspector.-FCQUzqR.js';
import { c as createRuntimeRpc, a as rpcDone } from './vendor/rpc.BGx7q_k2.js';
import 'node:console';
import '@vitest/utils';
import 'node:module';
import './vendor/index.BpSiYbpB.js';
import './vendor/global.7bFbnyXl.js';

function isBuiltinEnvironment(env) {
  return env in environments;
}
const _loaders = /* @__PURE__ */ new Map();
async function createEnvironmentLoader(options) {
  if (!_loaders.has(options.root)) {
    const loader = new ViteNodeRunner(options);
    await loader.executeId("/@vite/env");
    _loaders.set(options.root, loader);
  }
  return _loaders.get(options.root);
}
async function loadEnvironment(ctx, rpc) {
  var _a;
  const name = ctx.environment.name;
  if (isBuiltinEnvironment(name)) {
    return environments[name];
  }
  const loader = await createEnvironmentLoader({
    root: ctx.config.root,
    fetchModule: async (id) => {
      const result = await rpc.fetch(id, "ssr");
      if (result.id) {
        return { code: readFileSync(result.id, "utf-8") };
      }
      return result;
    },
    resolveId: (id, importer) => rpc.resolveId(id, importer, "ssr")
  });
  const root = loader.root;
  const packageId = name[0] === "." || name[0] === "/" ? resolve(root, name) : ((_a = await rpc.resolveId(`vitest-environment-${name}`, void 0, "ssr")) == null ? void 0 : _a.id) ?? resolve(root, name);
  const pkg = await loader.executeId(normalize(packageId));
  if (!pkg || !pkg.default || typeof pkg.default !== "object") {
    throw new TypeError(
      `Environment "${name}" is not a valid environment. Path "${packageId}" should export default object with a "setup" or/and "setupVM" method.`
    );
  }
  const environment = pkg.default;
  if (environment.transformMode !== "web" && environment.transformMode !== "ssr") {
    throw new TypeError(
      `Environment "${name}" is not a valid environment. Path "${packageId}" should export default object with a "transformMode" method equal to "ssr" or "web".`
    );
  }
  return environment;
}

if (isChildProcess()) {
  setProcessTitle(`vitest ${workerId}`);
}
async function execute(mehtod, ctx) {
  const prepareStart = performance.now();
  const inspectorCleanup = setupInspect(ctx);
  process.env.VITEST_WORKER_ID = String(ctx.workerId);
  process.env.VITEST_POOL_ID = String(workerId);
  try {
    if (ctx.worker[0] === ".") {
      throw new Error(
        `Path to the test runner cannot be relative, received "${ctx.worker}"`
      );
    }
    const file = ctx.worker.startsWith("file:") ? ctx.worker : pathToFileURL(ctx.worker).toString();
    const testRunnerModule = await import(file);
    if (!testRunnerModule.default || typeof testRunnerModule.default !== "object") {
      throw new TypeError(
        `Test worker object should be exposed as a default export. Received "${typeof testRunnerModule.default}"`
      );
    }
    const worker = testRunnerModule.default;
    if (!worker.getRpcOptions || typeof worker.getRpcOptions !== "function") {
      throw new TypeError(
        `Test worker should expose "getRpcOptions" method. Received "${typeof worker.getRpcOptions}".`
      );
    }
    const { rpc, onCancel } = createRuntimeRpc(worker.getRpcOptions(ctx));
    const beforeEnvironmentTime = performance.now();
    const environment = await loadEnvironment(ctx, rpc);
    if (ctx.environment.transformMode) {
      environment.transformMode = ctx.environment.transformMode;
    }
    const state = {
      ctx,
      // here we create a new one, workers can reassign this if they need to keep it non-isolated
      moduleCache: new ModuleCacheMap(),
      mockMap: /* @__PURE__ */ new Map(),
      config: ctx.config,
      onCancel,
      environment,
      durations: {
        environment: beforeEnvironmentTime,
        prepare: prepareStart
      },
      rpc,
      providedContext: ctx.providedContext
    };
    const methodName = mehtod === "collect" ? "collectTests" : "runTests";
    if (!worker[methodName] || typeof worker[methodName] !== "function") {
      throw new TypeError(
        `Test worker should expose "runTests" method. Received "${typeof worker.runTests}".`
      );
    }
    await worker[methodName](state);
  } finally {
    await rpcDone().catch(() => {
    });
    inspectorCleanup();
  }
}
function run(ctx) {
  return execute("run", ctx);
}
function collect(ctx) {
  return execute("collect", ctx);
}

export { collect, run };
