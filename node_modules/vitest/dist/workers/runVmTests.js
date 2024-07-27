import { createRequire } from 'node:module';
import util from 'node:util';
import timers from 'node:timers';
import { performance } from 'node:perf_hooks';
import { startTests, collectTests } from '@vitest/runner';
import { installSourcemapsSupport } from 'vite-node/source-map';
import { KNOWN_ASSET_TYPES } from 'vite-node/constants';
import { s as setupChaiConfig, r as resolveTestRunner, a as resolveSnapshotEnvironment } from '../vendor/index.CVqMv71L.js';
import { a as startCoverageInsideWorker, s as stopCoverageInsideWorker } from '../vendor/coverage.BhYSDdTT.js';
import { g as getWorkerState } from '../vendor/global.7bFbnyXl.js';
import { V as VitestIndex } from '../vendor/index.DI9daj1Q.js';
import { s as setupCommonEnv } from '../vendor/setup-common.symvFZPh.js';
import { c as closeInspector } from '../vendor/inspector.-FCQUzqR.js';
import 'chai';
import 'pathe';
import '../path.js';
import 'node:url';
import '../vendor/rpc.BGx7q_k2.js';
import '@vitest/utils';
import '../vendor/index.BpSiYbpB.js';
import '../vendor/benchmark.B6pblCp2.js';
import '@vitest/runner/utils';
import '../vendor/index.BJmtb_7W.js';
import '../vendor/env.2ltrQNq0.js';
import 'std-env';
import '../vendor/run-once.Db8Hgq9X.js';
import '../vendor/vi.Elqer9-7.js';
import '../vendor/_commonjsHelpers.BFTU3MAI.js';
import '@vitest/expect';
import '@vitest/snapshot';
import '@vitest/utils/error';
import '../vendor/tasks.DhVtQBtW.js';
import '@vitest/utils/source-map';
import '../vendor/base.DRHPZCCj.js';
import '../vendor/date.W2xKR2qe.js';
import '@vitest/spy';

async function run(method, files, config, executor) {
  const workerState = getWorkerState();
  await setupCommonEnv(config);
  Object.defineProperty(globalThis, "__vitest_index__", {
    value: VitestIndex,
    enumerable: false
  });
  if (workerState.environment.transformMode === "web") {
    const _require = createRequire(import.meta.url);
    _require.extensions[".css"] = resolveCss;
    _require.extensions[".scss"] = resolveCss;
    _require.extensions[".sass"] = resolveCss;
    _require.extensions[".less"] = resolveCss;
    KNOWN_ASSET_TYPES.forEach((type) => {
      _require.extensions[`.${type}`] = resolveAsset;
    });
  }
  globalThis.__vitest_required__ = {
    util,
    timers
  };
  installSourcemapsSupport({
    getSourceMap: (source) => workerState.moduleCache.getSourceMap(source)
  });
  await startCoverageInsideWorker(config.coverage, executor);
  if (config.chaiConfig) {
    setupChaiConfig(config.chaiConfig);
  }
  const [runner, snapshotEnvironment] = await Promise.all([
    resolveTestRunner(config, executor),
    resolveSnapshotEnvironment(config, executor)
  ]);
  config.snapshotOptions.snapshotEnvironment = snapshotEnvironment;
  workerState.onCancel.then((reason) => {
    var _a;
    closeInspector(config);
    (_a = runner.onCancel) == null ? void 0 : _a.call(runner, reason);
  });
  workerState.durations.prepare = performance.now() - workerState.durations.prepare;
  const { vi } = VitestIndex;
  for (const file of files) {
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
function resolveCss(mod) {
  mod.exports = "";
}
function resolveAsset(mod, url) {
  mod.exports = url;
}

export { run };
