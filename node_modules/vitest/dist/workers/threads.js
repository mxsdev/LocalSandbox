import { r as runBaseTests } from '../vendor/base.Csk7BT3h.js';
import { a as createThreadsRpcOptions } from '../vendor/utils.DkxLWvS1.js';
import 'vite-node/client';
import '../vendor/global.7bFbnyXl.js';
import '../vendor/execute.jzOWtys_.js';
import 'node:vm';
import 'node:url';
import 'node:fs';
import 'vite-node/utils';
import 'pathe';
import '@vitest/utils/error';
import '../path.js';
import '@vitest/utils';
import '../vendor/base.DRHPZCCj.js';

class ThreadsBaseWorker {
  getRpcOptions(ctx) {
    return createThreadsRpcOptions(ctx);
  }
  runTests(state) {
    return runBaseTests("run", state);
  }
  collectTests(state) {
    return runBaseTests("collect", state);
  }
}
var threads = new ThreadsBaseWorker();

export { threads as default };
