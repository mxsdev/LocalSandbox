import type { FN, DebounceOptions, Debounced } from './types.js';
declare const debounce: <Args extends unknown[]>(fn: FN<Args, unknown>, wait?: number, options?: DebounceOptions) => Debounced<Args>;
export default debounce;
