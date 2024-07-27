import { R as ResolvedConfig, P as Pool } from './reporters-B7ebVMkT.js';
import { VitestRunner, VitestRunnerImportSource, File, Suite, Task, CancelReason, Test, Custom, TaskContext, ExtendedContext } from '@vitest/runner';
import * as tinybench from 'tinybench';
import 'vite';
import '@vitest/pretty-format';
import 'vite-node';
import '@vitest/snapshot';
import '@vitest/expect';
import '@vitest/runner/utils';
import '@vitest/utils';
import 'node:stream';
import 'vite-node/client';
import '@vitest/snapshot/manager';
import 'vite-node/server';
import 'node:worker_threads';
import '@vitest/utils/source-map';
import 'node:fs';
import 'chai';

declare class VitestTestRunner implements VitestRunner {
    config: ResolvedConfig;
    private snapshotClient;
    private workerState;
    private __vitest_executor;
    private cancelRun;
    private assertionsErrors;
    pool: Pool;
    constructor(config: ResolvedConfig);
    importFile(filepath: string, source: VitestRunnerImportSource): unknown;
    onCollectStart(file: File): void;
    onBeforeRunFiles(): void;
    onAfterRunFiles(): void;
    onAfterRunSuite(suite: Suite): Promise<void>;
    onAfterRunTask(test: Task): void;
    onCancel(_reason: CancelReason): void;
    onBeforeRunTask(test: Task): Promise<void>;
    onBeforeRunSuite(suite: Suite): Promise<void>;
    onBeforeTryTask(test: Task): void;
    onAfterTryTask(test: Task): void;
    extendTaskContext<T extends Test | Custom>(context: TaskContext<T>): ExtendedContext<T>;
}

declare class NodeBenchmarkRunner implements VitestRunner {
    config: ResolvedConfig;
    private __vitest_executor;
    constructor(config: ResolvedConfig);
    importTinybench(): Promise<typeof tinybench>;
    importFile(filepath: string, source: VitestRunnerImportSource): unknown;
    runSuite(suite: Suite): Promise<void>;
    runTask(): Promise<void>;
}

export { NodeBenchmarkRunner, VitestTestRunner };
