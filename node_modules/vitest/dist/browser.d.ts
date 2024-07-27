export { collectTests, processError, startTests } from '@vitest/runner';
import { R as ResolvedConfig, C as CoverageOptions, b as CoverageProvider, c as CoverageProviderModule } from './reporters-B7ebVMkT.js';
import { Formatter } from 'tinyrainbow';
import { VitestExecutor } from './execute.js';
import * as spy$1 from '@vitest/spy';
import 'vite';
import '@vitest/pretty-format';
import 'vite-node';
import '@vitest/snapshot';
import '@vitest/expect';
import '@vitest/runner/utils';
import '@vitest/utils';
import 'tinybench';
import 'node:stream';
import 'vite-node/client';
import '@vitest/snapshot/manager';
import 'vite-node/server';
import 'node:worker_threads';
import '@vitest/utils/source-map';
import 'node:fs';
import 'chai';
import 'node:vm';

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

var spy = /*#__PURE__*/_mergeNamespaces({
  __proto__: null
}, [spy$1]);

interface DiffOptions {
    aAnnotation?: string;
    aColor?: Formatter;
    aIndicator?: string;
    bAnnotation?: string;
    bColor?: Formatter;
    bIndicator?: string;
    changeColor?: Formatter;
    changeLineTrailingSpaceColor?: Formatter;
    commonColor?: Formatter;
    commonIndicator?: string;
    commonLineTrailingSpaceColor?: Formatter;
    contextLines?: number;
    emptyFirstOrLastLinePlaceholder?: string;
    expand?: boolean;
    includeChangeCounts?: boolean;
    omitAnnotationLines?: boolean;
    patchColor?: Formatter;
    compareKeys?: any;
    truncateThreshold?: number;
    truncateAnnotation?: string;
    truncateAnnotationColor?: Formatter;
}

declare function setupCommonEnv(config: ResolvedConfig): Promise<void>;
declare function loadDiffConfig(config: ResolvedConfig, executor: VitestExecutor): Promise<DiffOptions | undefined>;
declare function loadSnapshotSerializers(config: ResolvedConfig, executor: VitestExecutor): Promise<void>;

interface Loader {
    executeId: (id: string) => Promise<{
        default: CoverageProviderModule;
    }>;
}
declare function getCoverageProvider(options: CoverageOptions | undefined, loader: Loader): Promise<CoverageProvider | null>;
declare function startCoverageInsideWorker(options: CoverageOptions | undefined, loader: Loader): Promise<unknown>;
declare function takeCoverageInsideWorker(options: CoverageOptions | undefined, loader: Loader): Promise<unknown>;
declare function stopCoverageInsideWorker(options: CoverageOptions | undefined, loader: Loader): Promise<unknown>;

export { spy as SpyModule, getCoverageProvider, loadDiffConfig, loadSnapshotSerializers, setupCommonEnv, startCoverageInsideWorker, stopCoverageInsideWorker, takeCoverageInsideWorker };
