
/* IMPORT */

import type {Callback} from './types';

/* MAIN */

const NOOP_PROMISE_LIKE = {
  then: ( fn: Callback ) => {
    fn ();
  }
};

/* EXPORT */

export {NOOP_PROMISE_LIKE};
