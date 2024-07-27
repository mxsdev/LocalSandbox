
/* IMPORT */

import makeNakedPromise from 'promise-make-naked';
import type {Result} from './types';

/* MAIN */

const makeCounterPromise = (): Result => {

  const {promise, resolve, isPending} = makeNakedPromise<void> ();

  let counter = 0;

  const increment = (): void => {

    counter += 1;

  };

  const decrement = (): void => {

    counter -= 1;

    if ( counter ) return;

    resolve ();

  };

  const init = (): void => { // Accounting for no increment/decrement calls

    increment ();

    queueMicrotask ( decrement );

  };

  init ();

  return { promise, isPending, increment, decrement };

};

/* EXPORT */

export default makeCounterPromise;
export type {Result};
