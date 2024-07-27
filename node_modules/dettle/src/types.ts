
/* MAIN */

type Callback = () => void;

type FN<Args extends unknown[], Return> = ( ...args: Args ) => Return;

type DebounceOptions = { leading?: boolean, trailing?: boolean, maxWait?: number };

type Debounced<Args extends unknown[]> = FN<Args, void> & { cancel: Callback, flush: Callback };

type ThrottleOptions = { leading?: boolean, trailing?: boolean };

type Throttled<Args extends unknown[]> = FN<Args, void> & { cancel: Callback, flush: Callback };

/* EXPORT */

export type {Callback, FN, DebounceOptions, Debounced, ThrottleOptions, Throttled};
