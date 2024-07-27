
/* IMPORT */

import type {FN, DebounceOptions, Debounced} from './types';

/* MAIN */

const debounce = <Args extends unknown[]> ( fn: FN<Args, unknown>, wait: number = 1, options?: DebounceOptions ): Debounced<Args> => {

  /* VARIABLES */

  wait = Math.max ( 1, wait );

  const leading = options?.leading ?? false;
  const trailing = options?.trailing ?? true;
  const maxWait = Math.max ( options?.maxWait ?? Infinity, wait );

  let args: Args | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let timestampCall = 0;
  let timestampInvoke = 0;

  /* HELPERS */

  const getInstantData = (): [number, boolean] => {

    const timestamp = Date.now ();
    const elapsedCall = timestamp - timestampCall;
    const elapsedInvoke = timestamp - timestampInvoke;
    const isInvoke = ( elapsedCall >= wait || elapsedInvoke >= maxWait );

    return [timestamp, isInvoke];

  };

  const invoke = ( timestamp: number ): void => {

    timestampInvoke = timestamp;

    if ( !args ) return; // This should never happen

    const _args = args;

    args = undefined;

    fn.apply ( undefined, _args );

  };

  const onCancel = (): void => {

    resetTimeout ( 0 );

  };

  const onFlush = (): void => {

    if ( !timeout ) return;

    onCancel ();

    invoke ( Date.now () );

  };

  const onLeading = ( timestamp: number ): void => {

    timestampInvoke = timestamp;

    if ( leading ) return invoke ( timestamp );

  };

  const onTrailing = ( timestamp: number ): void => {

    if ( trailing && args ) return invoke ( timestamp );

    args = undefined;

  };

  const onTimeout = (): void => {

    timeout = undefined;

    const [timestamp, isInvoking] = getInstantData ();

    if ( isInvoking ) return onTrailing ( timestamp );

    return updateTimeout ( timestamp );

  };

  const updateTimeout = ( timestamp: number ): void => {

    const elapsedCall = timestamp - timestampCall;
    const elapsedInvoke = timestamp - timestampInvoke;
    const remainingCall = wait - elapsedCall;
    const remainingInvoke = maxWait - elapsedInvoke;
    const ms = Math.min ( remainingCall, remainingInvoke );

    return resetTimeout ( ms );

  };

  const resetTimeout = ( ms: number ): void => {

    if ( timeout ) clearTimeout ( timeout );

    if ( ms <= 0 ) return;

    timeout = setTimeout ( onTimeout, ms );

  };

  /* DEBOUNCED */

  const debounced = ( ...argsLatest: Args ): void => {

    const [timestamp, isInvoking] = getInstantData ();
    const hadTimeout = !!timeout;

    args = argsLatest;
    timestampCall = timestamp;

    if ( isInvoking || !timeout ) resetTimeout ( wait );

    if ( isInvoking ) {

      if ( !hadTimeout ) return onLeading ( timestamp );

      return invoke ( timestamp );

    }

  };

  /* DEBOUNCED UTILITIES */

  debounced.cancel = onCancel;

  debounced.flush = onFlush;

  /* RETURN */

  return debounced;

};

/* EXPORT */

export default debounce;
