
/* IMPORT */

import {noop} from './utils';
import type {PromiseResolve, PromiseReject, Result} from './types';

/* MAIN */

const makeNakedPromise = <T> (): Result<T> => {

  let resolve: PromiseResolve<T> = noop;
  let reject: PromiseReject = noop;

  let resolved = false;
  let rejected = false;

  const promise = new Promise<T> ( ( res, rej ): void => {

    resolve = value => {
      resolved = true;
      return res ( value );
    };

    reject = value => {
      rejected = true;
      return rej ( value );
    };

  });

  const isPending = (): boolean => !resolved && !rejected;
  const isResolved = (): boolean => resolved;
  const isRejected = (): boolean => rejected;

  return {promise, resolve, reject, isPending, isResolved, isRejected};

};

/* EXPORT */

export default makeNakedPromise;
export type {Result};
