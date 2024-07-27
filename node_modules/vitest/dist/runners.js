import { setState, GLOBAL_EXPECT, getState } from '@vitest/expect';
import { g as getSnapshotClient, c as createExpect, v as vi } from './vendor/vi.Elqer9-7.js';
import 'pathe';
import { g as getTestName } from './vendor/tasks.DhVtQBtW.js';
import { createDefer, getSafeTimers } from '@vitest/utils';
import { g as getWorkerState } from './vendor/global.7bFbnyXl.js';
import './vendor/env.2ltrQNq0.js';
import { r as rpc } from './vendor/rpc.BGx7q_k2.js';
import { getTests, getNames } from '@vitest/runner/utils';
import { updateTask } from '@vitest/runner';
import { a as getBenchOptions, g as getBenchFn } from './vendor/benchmark.B6pblCp2.js';
import 'chai';
import './vendor/_commonjsHelpers.BFTU3MAI.js';
import '@vitest/snapshot';
import '@vitest/utils/error';
import '@vitest/utils/source-map';
import './vendor/base.DRHPZCCj.js';
import './vendor/date.W2xKR2qe.js';
import '@vitest/spy';
import 'std-env';
import './vendor/index.BpSiYbpB.js';
import './vendor/index.BJmtb_7W.js';

class VitestTestRunner {
  constructor(config) {
    this.config = config;
  }
  snapshotClient = getSnapshotClient();
  workerState = getWorkerState();
  __vitest_executor;
  cancelRun = false;
  assertionsErrors = /* @__PURE__ */ new WeakMap();
  pool = this.workerState.ctx.pool;
  importFile(filepath, source) {
    if (source === "setup") {
      this.workerState.moduleCache.delete(filepath);
    }
    return this.__vitest_executor.executeId(filepath);
  }
  onCollectStart(file) {
    this.workerState.current = file;
  }
  onBeforeRunFiles() {
    this.snapshotClient.clear();
  }
  onAfterRunFiles() {
    this.workerState.current = void 0;
  }
  async onAfterRunSuite(suite) {
    if (this.config.logHeapUsage && typeof process !== "undefined") {
      suite.result.heap = process.memoryUsage().heapUsed;
    }
    if (suite.mode !== "skip" && "filepath" in suite) {
      for (const test of getTests(suite)) {
        if (test.mode === "skip") {
          const name = getNames(test).slice(1).join(" > ");
          this.snapshotClient.skipTestSnapshots(name);
        }
      }
      const result = await this.snapshotClient.finishCurrentRun();
      if (result) {
        await rpc().snapshotSaved(result);
      }
    }
    this.workerState.current = suite.suite || suite.file;
  }
  onAfterRunTask(test) {
    this.snapshotClient.clearTest();
    if (this.config.logHeapUsage && typeof process !== "undefined") {
      test.result.heap = process.memoryUsage().heapUsed;
    }
    this.workerState.current = test.suite || test.file;
  }
  onCancel(_reason) {
    this.cancelRun = true;
  }
  async onBeforeRunTask(test) {
    if (this.cancelRun) {
      test.mode = "skip";
    }
    if (test.mode !== "run") {
      return;
    }
    clearModuleMocks(this.config);
    this.workerState.current = test;
  }
  async onBeforeRunSuite(suite) {
    if (this.cancelRun) {
      suite.mode = "skip";
    }
    if (suite.mode !== "skip" && "filepath" in suite) {
      await this.snapshotClient.startCurrentRun(
        suite.filepath,
        "__default_name_",
        this.workerState.config.snapshotOptions
      );
    }
    this.workerState.current = suite;
  }
  onBeforeTryTask(test) {
    setState(
      {
        assertionCalls: 0,
        isExpectingAssertions: false,
        isExpectingAssertionsError: null,
        expectedAssertionsNumber: null,
        expectedAssertionsNumberErrorGen: null,
        testPath: test.file.filepath,
        currentTestName: getTestName(test),
        snapshotState: this.snapshotClient.snapshotState
      },
      globalThis[GLOBAL_EXPECT]
    );
  }
  onAfterTryTask(test) {
    const {
      assertionCalls,
      expectedAssertionsNumber,
      expectedAssertionsNumberErrorGen,
      isExpectingAssertions,
      isExpectingAssertionsError
    } = "context" in test && test.context._local ? test.context.expect.getState() : getState(globalThis[GLOBAL_EXPECT]);
    if (expectedAssertionsNumber !== null && assertionCalls !== expectedAssertionsNumber) {
      throw expectedAssertionsNumberErrorGen();
    }
    if (isExpectingAssertions === true && assertionCalls === 0) {
      throw isExpectingAssertionsError;
    }
    if (this.config.expect.requireAssertions && assertionCalls === 0) {
      throw this.assertionsErrors.get(test);
    }
  }
  extendTaskContext(context) {
    if (this.config.expect.requireAssertions) {
      this.assertionsErrors.set(
        context.task,
        new Error("expected any number of assertion, but got none")
      );
    }
    let _expect;
    Object.defineProperty(context, "expect", {
      get() {
        if (!_expect) {
          _expect = createExpect(context.task);
        }
        return _expect;
      }
    });
    Object.defineProperty(context, "_local", {
      get() {
        return _expect != null;
      }
    });
    return context;
  }
}
function clearModuleMocks(config) {
  const { clearMocks, mockReset, restoreMocks, unstubEnvs, unstubGlobals } = config;
  if (restoreMocks) {
    vi.restoreAllMocks();
  } else if (mockReset) {
    vi.resetAllMocks();
  } else if (clearMocks) {
    vi.clearAllMocks();
  }
  if (unstubEnvs) {
    vi.unstubAllEnvs();
  }
  if (unstubGlobals) {
    vi.unstubAllGlobals();
  }
}

function createBenchmarkResult(name) {
  return {
    name,
    rank: 0,
    rme: 0,
    samples: []
  };
}
const benchmarkTasks = /* @__PURE__ */ new WeakMap();
async function runBenchmarkSuite(suite, runner) {
  var _a;
  const { Task, Bench } = await runner.importTinybench();
  const start = performance.now();
  const benchmarkGroup = [];
  const benchmarkSuiteGroup = [];
  for (const task of suite.tasks) {
    if (task.mode !== "run") {
      continue;
    }
    if ((_a = task.meta) == null ? void 0 : _a.benchmark) {
      benchmarkGroup.push(task);
    } else if (task.type === "suite") {
      benchmarkSuiteGroup.push(task);
    }
  }
  for (const subSuite of benchmarkSuiteGroup) {
    await runBenchmarkSuite(subSuite, runner);
  }
  if (benchmarkGroup.length) {
    const defer = createDefer();
    suite.result = {
      state: "run",
      startTime: start,
      benchmark: createBenchmarkResult(suite.name)
    };
    updateTask$1(suite);
    const addBenchTaskListener = (task, benchmark) => {
      task.addEventListener(
        "complete",
        (e) => {
          const task2 = e.task;
          const taskRes = task2.result;
          const result = benchmark.result.benchmark;
          Object.assign(result, taskRes);
          updateTask$1(benchmark);
        },
        {
          once: true
        }
      );
      task.addEventListener(
        "error",
        (e) => {
          const task2 = e.task;
          defer.reject(benchmark ? task2.result.error : e);
        },
        {
          once: true
        }
      );
    };
    benchmarkGroup.forEach((benchmark) => {
      const options = getBenchOptions(benchmark);
      const benchmarkInstance = new Bench(options);
      const benchmarkFn = getBenchFn(benchmark);
      benchmark.result = {
        state: "run",
        startTime: start,
        benchmark: createBenchmarkResult(benchmark.name)
      };
      const task = new Task(benchmarkInstance, benchmark.name, benchmarkFn);
      benchmarkTasks.set(benchmark, task);
      addBenchTaskListener(task, benchmark);
      updateTask$1(benchmark);
    });
    const { setTimeout } = getSafeTimers();
    const tasks = [];
    for (const benchmark of benchmarkGroup) {
      const task = benchmarkTasks.get(benchmark);
      await task.warmup();
      tasks.push([
        await new Promise(
          (resolve) => setTimeout(async () => {
            resolve(await task.run());
          })
        ),
        benchmark
      ]);
    }
    suite.result.duration = performance.now() - start;
    suite.result.state = "pass";
    tasks.sort(([taskA], [taskB]) => taskA.result.mean - taskB.result.mean).forEach(([, benchmark], idx) => {
      benchmark.result.state = "pass";
      if (benchmark) {
        const result = benchmark.result.benchmark;
        result.rank = Number(idx) + 1;
        updateTask$1(benchmark);
      }
    });
    updateTask$1(suite);
    defer.resolve(null);
    await defer;
  }
  function updateTask$1(task) {
    updateTask(task, runner);
  }
}
class NodeBenchmarkRunner {
  constructor(config) {
    this.config = config;
  }
  __vitest_executor;
  async importTinybench() {
    return await import('tinybench');
  }
  importFile(filepath, source) {
    if (source === "setup") {
      getWorkerState().moduleCache.delete(filepath);
    }
    return this.__vitest_executor.executeId(filepath);
  }
  async runSuite(suite) {
    await runBenchmarkSuite(suite, this);
  }
  async runTask() {
    throw new Error("`test()` and `it()` is only available in test mode.");
  }
}

export { NodeBenchmarkRunner, VitestTestRunner };
