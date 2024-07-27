import { v as VitestRunMode, U as UserConfig, aj as VitestOptions, Q as Vitest, R as ResolvedConfig, i as ProvidedContext, ak as WorkspaceProject, e as RuntimeRPC, A as ApiConfig, al as Logger, am as TestSequencer, an as WorkspaceSpec } from './reporters-B7ebVMkT.js';
export { ay as BrowserBuiltinProvider, az as BrowserCommand, aA as BrowserCommandContext, aE as BrowserOrchestrator, at as BrowserProvider, as as BrowserProviderInitializationOptions, av as BrowserProviderModule, ax as BrowserProviderOptions, z as BrowserScript, aB as BrowserServer, aC as BrowserServerState, aD as BrowserServerStateContext, au as CDPSession, aH as HTMLOptions, aG as JUnitOptions, aF as JsonOptions, ao as ProcessPool, aw as ResolvedBrowserOptions, ar as TestSequencerConstructor, aq as VitestPackageInstaller, ap as getFilePoolName } from './reporters-B7ebVMkT.js';
import { UserConfig as UserConfig$1, Plugin, ResolvedConfig as ResolvedConfig$1 } from 'vite';
import * as vite from 'vite';
export { vite as Vite };
export { createServer, isFileServingAllowed, parseAst, parseAstAsync } from 'vite';
import { Writable } from 'node:stream';
import createDebug from 'debug';
import '@vitest/pretty-format';
import '@vitest/runner';
import 'vite-node';
import '@vitest/snapshot';
import '@vitest/expect';
import '@vitest/runner/utils';
import '@vitest/utils';
import 'tinybench';
import 'vite-node/client';
import '@vitest/snapshot/manager';
import 'vite-node/server';
import 'node:worker_threads';
import '@vitest/utils/source-map';
import 'node:fs';
import 'chai';

declare function createVitest(mode: VitestRunMode, options: UserConfig, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;

declare function VitestPlugin(options?: UserConfig, ctx?: Vitest): Promise<Plugin[]>;

interface CliOptions extends UserConfig {
    /**
     * Override the watch mode
     */
    run?: boolean;
    /**
     * Removes colors from the console output
     */
    color?: boolean;
    /**
     * Output collected tests as JSON or to a file
     */
    json?: string | boolean;
}
/**
 * Start Vitest programmatically
 *
 * Returns a Vitest instance if initialized successfully.
 */
declare function startVitest(mode: VitestRunMode, cliFilters?: string[], options?: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest | undefined>;

interface CLIOptions {
    allowUnknownOptions?: boolean;
}
declare function parseCLI(argv: string | string[], config?: CLIOptions): {
    filter: string[];
    options: CliOptions;
};

declare function registerConsoleShortcuts(ctx: Vitest, stdin: NodeJS.ReadStream | undefined, stdout: NodeJS.WriteStream | Writable): () => void;

interface GlobalSetupContext {
    config: ResolvedConfig;
    provide: <T extends keyof ProvidedContext & string>(key: T, value: ProvidedContext[T]) => void;
}

interface MethodsOptions {
    cacheFs?: boolean;
}
declare function createMethodsRPC(project: WorkspaceProject, options?: MethodsOptions): RuntimeRPC;

declare function createDebugger(namespace: `vitest:${string}`): createDebug.Debugger | undefined;

declare function resolveFsAllow(projectRoot: string, rootConfigFile: string | false | undefined): string[];

declare function resolveApiServerConfig<Options extends ApiConfig & UserConfig>(options: Options, defaultPort: number): ApiConfig | undefined;
declare function resolveConfig(mode: VitestRunMode, options: UserConfig, viteConfig: ResolvedConfig$1, logger: Logger): ResolvedConfig;

declare class FilesNotFoundError extends Error {
    code: string;
    constructor(mode: 'test' | 'benchmark');
}
declare class GitNotFoundError extends Error {
    code: string;
    constructor();
}

declare const rootDir: string;
declare const distDir: string;

declare class BaseSequencer implements TestSequencer {
    protected ctx: Vitest;
    constructor(ctx: Vitest);
    shard(files: WorkspaceSpec[]): Promise<WorkspaceSpec[]>;
    sort(files: WorkspaceSpec[]): Promise<WorkspaceSpec[]>;
}

export { BaseSequencer, GitNotFoundError, type GlobalSetupContext, TestSequencer, FilesNotFoundError as TestsNotFoundError, Vitest, VitestPlugin, WorkspaceProject, WorkspaceSpec, createDebugger, createMethodsRPC, createVitest, distDir, parseCLI, registerConsoleShortcuts, resolveApiServerConfig, resolveConfig, resolveFsAllow, rootDir, startVitest };
