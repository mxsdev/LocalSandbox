import { g as globalApis } from '../vendor/constants.CsnA4eRy.js';
import { V as VitestIndex } from '../vendor/index.DI9daj1Q.js';
import '@vitest/runner';
import '../vendor/benchmark.B6pblCp2.js';
import '@vitest/runner/utils';
import '@vitest/utils';
import '../vendor/index.BJmtb_7W.js';
import 'pathe';
import '../vendor/global.7bFbnyXl.js';
import '../vendor/env.2ltrQNq0.js';
import 'std-env';
import '../vendor/run-once.Db8Hgq9X.js';
import '../vendor/vi.Elqer9-7.js';
import 'chai';
import '../vendor/_commonjsHelpers.BFTU3MAI.js';
import '@vitest/expect';
import '@vitest/snapshot';
import '@vitest/utils/error';
import '../vendor/tasks.DhVtQBtW.js';
import '@vitest/utils/source-map';
import '../vendor/base.DRHPZCCj.js';
import '../vendor/date.W2xKR2qe.js';
import '@vitest/spy';

function registerApiGlobally() {
  globalApis.forEach((api) => {
    globalThis[api] = VitestIndex[api];
  });
}

export { registerApiGlobally };
