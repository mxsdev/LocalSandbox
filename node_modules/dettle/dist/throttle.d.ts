import type { FN, ThrottleOptions, Throttled } from './types.js';
declare const throttle: <Args extends unknown[]>(fn: FN<Args, unknown>, wait?: number, options?: ThrottleOptions) => Throttled<Args>;
export default throttle;
