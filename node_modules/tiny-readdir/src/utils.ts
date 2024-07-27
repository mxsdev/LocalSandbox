
/* MAIN */

const castArray = <T> ( value: T[] | T ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const isFunction = ( value: unknown ): value is Function => {

  return ( typeof value === 'function' );

};

/* EXPORT */

export {castArray, isFunction};
