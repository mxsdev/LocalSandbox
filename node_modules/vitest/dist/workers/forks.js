import v8 from 'node:v8';
import { c as createForksRpcOptions, u as unwrapSerializableConfig } from '../vendor/utils.DkxLWvS1.js';
import { r as runBaseTests } from '../vendor/base.Csk7BT3h.js';
import '@vitest/utils';
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
import '../vendor/base.DRHPZCCj.js';

class ForksBaseWorker {
  getRpcOptions() {
    return createForksRpcOptions(v8);
  }
  async executeTests(method, state) {
    const exit = process.exit;
    state.ctx.config = unwrapSerializableConfig(state.ctx.config);
    try {
      await runBaseTests(method, state);
    } finally {
      process.exit = exit;
    }
  }
  runTests(state) {
    return this.executeTests("run", state);
  }
  collectTests(state) {
    return this.executeTests("collect", state);
  }
}
var forks = new ForksBaseWorker();

export { forks as default };
