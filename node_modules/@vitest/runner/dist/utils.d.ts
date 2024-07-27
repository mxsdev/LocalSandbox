import { S as Suite, F as File, T as Task, a as Test, C as Custom } from './tasks-zB5uPauP.js';
export { b as ChainableFunction, c as createChainable } from './tasks-zB5uPauP.js';
import { Arrayable } from '@vitest/utils';

/**
 * If any tasks been marked as `only`, mark all other tasks as `skip`.
 */
declare function interpretTaskModes(suite: Suite, namePattern?: string | RegExp, onlyMode?: boolean, parentIsOnly?: boolean, allowOnly?: boolean): void;
declare function someTasksAreOnly(suite: Suite): boolean;
declare function generateHash(str: string): string;
declare function calculateSuiteHash(parent: Suite): void;
declare function createFileTask(filepath: string, root: string, projectName: string, pool?: string): File;

/**
 * Partition in tasks groups by consecutive concurrent
 */
declare function partitionSuiteChildren(suite: Suite): Task[][];

declare function isAtomTest(s: Task): s is Test | Custom;
declare function getTests(suite: Arrayable<Task>): (Test | Custom)[];
declare function getTasks(tasks?: Arrayable<Task>): Task[];
declare function getSuites(suite: Arrayable<Task>): Suite[];
declare function hasTests(suite: Arrayable<Suite>): boolean;
declare function hasFailed(suite: Arrayable<Task>): boolean;
declare function getNames(task: Task): string[];

/**
 * Return a function for running multiple async operations with limited concurrency.
 */
declare function limitConcurrency(concurrency?: number): <Args extends unknown[], T>(func: (...args: Args) => PromiseLike<T> | T, ...args: Args) => Promise<T>;

export { calculateSuiteHash, createFileTask, generateHash, getNames, getSuites, getTasks, getTests, hasFailed, hasTests, interpretTaskModes, isAtomTest, limitConcurrency, partitionSuiteChildren, someTasksAreOnly };
