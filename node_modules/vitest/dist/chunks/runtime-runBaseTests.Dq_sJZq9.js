import { performance } from 'node:perf_hooks';
import { startTests, collectTests } from '@vitest/runner';
import 'pathe';
import '@vitest/runner/utils';
import { getSafeTimers } from '@vitest/utils';
import { g as getWorkerState } from '../vendor/global.7bFbnyXl.js';
import '../vendor/env.2ltrQNq0.js';
import { a as globalExpect, r as resetModules, v as vi } from '../vendor/vi.Elqer9-7.js';
import { a as startCoverageInsideWorker, s as stopCoverageInsideWorker } from '../vendor/coverage.BhYSDdTT.js';
import { a as resolveSnapshotEnvironment, s as setupChaiConfig, r as resolveTestRunner } from '../vendor/index.CVqMv71L.js';
import { createRequire } from 'node:module';
import util from 'node:util';
import timers from 'node:timers';
import { installSourcemapsSupport } from 'vite-node/source-map';
import { KNOWN_ASSET_TYPES } from 'vite-node/constants';
import { V as VitestIndex } from '../vendor/index.DI9daj1Q.js';
import { s as setupCommonEnv } from '../vendor/setup-common.symvFZPh.js';
import { c as closeInspector } from '../vendor/inspector.-FCQUzqR.js';
import 'std-env';
import 'chai';
import '../vendor/_commonjsHelpers.BFTU3MAI.js';
import '@vitest/expect';
import '@vitest/snapshot';
import '@vitest/utils/error';
import '../vendor/tasks.DhVtQBtW.js';
import '@vitest/utils/source-map';
import '../vendor/base.DRHPZCCj.js';
import '../vendor/date.W2xKR2qe.js';
import '@vitest/spy';
import '../path.js';
import 'node:url';
import '../vendor/rpc.BGx7q_k2.js';
import '../vendor/index.BpSiYbpB.js';
import '../vendor/benchmark.B6pblCp2.js';
import '../vendor/index.BJmtb_7W.js';
import '../vendor/run-once.Db8Hgq9X.js';

let globalSetup = false;
async function setupGlobalEnv(config, { environment }, executor) {
  await setupCommonEnv(config);
  Object.defineProperty(globalThis, "__vitest_index__", {
    value: VitestIndex,
    enumerable: false
  });
  const state = getWorkerState();
  if (!state.config.snapshotOptions.snapshotEnvironment) {
    state.config.snapshotOptions.snapshotEnvironment = await resolveSnapshotEnvironment(config, executor);
  }
  if (globalSetup) {
    return;
  }
  globalSetup = true;
  if (environment.transformMode === "web") {
    const _require = createRequire(import.meta.url);
    _require.extensions[".css"] = resolveCss;
    _require.extensions[".scss"] = resolveCss;
    _require.extensions[".sass"] = resolveCss;
    _require.extensions[".less"] = resolveCss;
    KNOWN_ASSET_TYPES.forEach((type) => {
      _require.extensions[`.${type}`] = resolveAsset;
    });
    process.env.SSR = "";
  } else {
    process.env.SSR = "1";
  }
  globalThis.__vitest_required__ = {
    util,
    timers
  };
  installSourcemapsSupport({
    getSourceMap: (source) => state.moduleCache.getSourceMap(source)
  });
  if (!config.disableConsoleIntercept) {
    await setupConsoleLogSpy();
  }
}
function resolveCss(mod) {
  mod.exports = "";
}
function resolveAsset(mod, url) {
  mod.exports = url;
}
async function setupConsoleLogSpy() {
  const { createCustomConsole } = await import('./runtime-console.C2L2zykk.js');
  globalThis.console = createCustomConsole();
}
async function withEnv({ environment }, options, fn) {
  globalThis.__vitest_environment__ = environment.name;
  globalExpect.setState({
    environment: environment.name
  });
  const env = await environment.setup(globalThis, options);
  try {
    await fn();
  } finally {
    const { setTimeout } = getSafeTimers();
    await new Promise((resolve) => setTimeout(resolve));
    await env.teardown(globalThis);
  }
}

async function run(method, files, config, environment, executor) {
  const workerState = getWorkerState();
  await setupGlobalEnv(config, environment, executor);
  await startCoverageInsideWorker(config.coverage, executor);
  if (config.chaiConfig) {
    setupChaiConfig(config.chaiConfig);
  }
  const runner = await resolveTestRunner(config, executor);
  workerState.onCancel.then((reason) => {
    var _a;
    closeInspector(config);
    (_a = runner.onCancel) == null ? void 0 : _a.call(runner, reason);
  });
  workerState.durations.prepare = performance.now() - workerState.durations.prepare;
  workerState.durations.environment = performance.now();
  await withEnv(
    environment,
    environment.options || config.environmentOptions || {},
    async () => {
      var _a, _b, _c, _d;
      workerState.durations.environment = performance.now() - workerState.durations.environment;
      for (const file of files) {
        const isIsolatedThreads = config.pool === "threads" && (((_b = (_a = config.poolOptions) == null ? void 0 : _a.threads) == null ? void 0 : _b.isolate) ?? true);
        const isIsolatedForks = config.pool === "forks" && (((_d = (_c = config.poolOptions) == null ? void 0 : _c.forks) == null ? void 0 : _d.isolate) ?? true);
        if (isIsolatedThreads || isIsolatedForks) {
          workerState.mockMap.clear();
          resetModules(workerState.moduleCache, true);
        }
        workerState.filepath = file;
        if (method === "run") {
          await startTests([file], runner);
        } else {
          await collectTests([file], runner);
        }
        vi.resetConfig();
        vi.restoreAllMocks();
      }
      await stopCoverageInsideWorker(config.coverage, executor);
    }
  );
  workerState.environmentTeardownRun = true;
}

export { run };
