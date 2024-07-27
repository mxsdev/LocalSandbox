import { Custom } from '@vitest/runner';
import '@vitest/runner/utils';
import { ah as BenchFunction, ai as BenchmarkAPI } from './reporters-B7ebVMkT.js';
import { Options } from 'tinybench';

declare function getBenchOptions(key: Custom): Options;
declare function getBenchFn(key: Custom): BenchFunction;
declare const bench: BenchmarkAPI;

export { getBenchOptions as a, bench as b, getBenchFn as g };
