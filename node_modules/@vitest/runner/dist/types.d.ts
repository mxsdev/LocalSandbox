import { M as SequenceHooks, N as SequenceSetupFiles, F as File, T as Task, S as Suite, r as TaskResultPack, a as Test, C as Custom, K as TaskContext, L as ExtendedContext } from './tasks-zB5uPauP.js';
export { A as AfterAllListener, i as AfterEachListener, B as BeforeAllListener, h as BeforeEachListener, g as CustomAPI, D as DoneCallback, w as Fixture, v as FixtureFn, u as FixtureOptions, x as Fixtures, y as HookCleanupCallback, H as HookListener, I as InferFixturesTypes, O as OnTestFailedHandler, k as OnTestFinishedHandler, R as RunMode, G as RuntimeContext, d as SuiteAPI, f as SuiteCollector, E as SuiteFactory, l as SuiteHooks, n as TaskBase, z as TaskCustomOptions, j as TaskHook, p as TaskMeta, o as TaskPopulated, q as TaskResult, m as TaskState, e as TestAPI, J as TestContext, s as TestFunction, t as TestOptions, U as Use } from './tasks-zB5uPauP.js';
import { DiffOptions } from '@vitest/utils/diff';
import '@vitest/utils';

interface VitestRunnerConfig {
    root: string;
    setupFiles: string[] | string;
    name: string;
    passWithNoTests: boolean;
    testNamePattern?: RegExp;
    allowOnly?: boolean;
    sequence: {
        shuffle?: boolean;
        concurrent?: boolean;
        seed: number;
        hooks: SequenceHooks;
        setupFiles: SequenceSetupFiles;
    };
    chaiConfig?: {
        truncateThreshold?: number;
    };
    maxConcurrency: number;
    testTimeout: number;
    hookTimeout: number;
    retry: number;
    includeTaskLocation?: boolean;
    diffOptions?: DiffOptions;
}
type VitestRunnerImportSource = 'collect' | 'setup';
interface VitestRunnerConstructor {
    new (config: VitestRunnerConfig): VitestRunner;
}
type CancelReason = 'keyboard-input' | 'test-failure' | (string & Record<string, never>);
interface VitestRunner {
    /**
     * First thing that's getting called before actually collecting and running tests.
     */
    onBeforeCollect?: (paths: string[]) => unknown;
    /**
     * Called after the file task was created but not collected yet.
     */
    onCollectStart?: (file: File) => unknown;
    /**
     * Called after collecting tests and before "onBeforeRun".
     */
    onCollected?: (files: File[]) => unknown;
    /**
     * Called when test runner should cancel next test runs.
     * Runner should listen for this method and mark tests and suites as skipped in
     * "onBeforeRunSuite" and "onBeforeRunTask" when called.
     */
    onCancel?: (reason: CancelReason) => unknown;
    /**
     * Called before running a single test. Doesn't have "result" yet.
     */
    onBeforeRunTask?: (test: Task) => unknown;
    /**
     * Called before actually running the test function. Already has "result" with "state" and "startTime".
     */
    onBeforeTryTask?: (test: Task, options: {
        retry: number;
        repeats: number;
    }) => unknown;
    /**
     * When the task has finished running, but before cleanup hooks are called
     */
    onTaskFinished?: (test: Task) => unknown;
    /**
     * Called after result and state are set.
     */
    onAfterRunTask?: (test: Task) => unknown;
    /**
     * Called right after running the test function. Doesn't have new state yet. Will not be called, if the test function throws.
     */
    onAfterTryTask?: (test: Task, options: {
        retry: number;
        repeats: number;
    }) => unknown;
    /**
     * Called before running a single suite. Doesn't have "result" yet.
     */
    onBeforeRunSuite?: (suite: Suite) => unknown;
    /**
     * Called after running a single suite. Has state and result.
     */
    onAfterRunSuite?: (suite: Suite) => unknown;
    /**
     * If defined, will be called instead of usual Vitest suite partition and handling.
     * "before" and "after" hooks will not be ignored.
     */
    runSuite?: (suite: Suite) => Promise<void>;
    /**
     * If defined, will be called instead of usual Vitest handling. Useful, if you have your custom test function.
     * "before" and "after" hooks will not be ignored.
     */
    runTask?: (test: Task) => Promise<void>;
    /**
     * Called, when a task is updated. The same as "onTaskUpdate" in a reporter, but this is running in the same thread as tests.
     */
    onTaskUpdate?: (task: TaskResultPack[]) => Promise<void>;
    /**
     * Called before running all tests in collected paths.
     */
    onBeforeRunFiles?: (files: File[]) => unknown;
    /**
     * Called right after running all tests in collected paths.
     */
    onAfterRunFiles?: (files: File[]) => unknown;
    /**
     * Called when new context for a test is defined. Useful, if you want to add custom properties to the context.
     * If you only want to define custom context, consider using "beforeAll" in "setupFiles" instead.
     *
     * This method is called for both "test" and "custom" handlers.
     *
     * @see https://vitest.dev/advanced/runner.html#your-task-function
     */
    extendTaskContext?: <T extends Test | Custom>(context: TaskContext<T>) => ExtendedContext<T>;
    /**
     * Called, when files are imported. Can be called in two situations: when collecting tests and when importing setup files.
     */
    importFile: (filepath: string, source: VitestRunnerImportSource) => unknown;
    /**
     * Publicly available configuration.
     */
    config: VitestRunnerConfig;
    /**
     * The name of the current pool. Can affect how stack trace is inferred on the server side.
     */
    pool?: string;
}

export { type CancelReason, Custom, ExtendedContext, File, SequenceHooks, SequenceSetupFiles, Suite, Task, TaskContext, TaskResultPack, Test, type VitestRunner, type VitestRunnerConfig, type VitestRunnerConstructor, type VitestRunnerImportSource };
