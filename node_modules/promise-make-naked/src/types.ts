
/* MAIN */

type PromiseResolve <T> = ( value: T | PromiseLike<T> ) => void;

type PromiseReject = ( reason?: unknown ) => void;

type Result <T> = {
  promise: Promise<T>,
  resolve: PromiseResolve<T>,
  reject: PromiseReject,
  isPending: () => boolean,
  isResolved: () => boolean,
  isRejected: () => boolean
};

/* EXPORT */

export type {PromiseResolve, PromiseReject, Result};
