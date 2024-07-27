
/* MAIN */

type Result = {
  promise: Promise<void>,
  isPending: () => boolean,
  increment: () => void,
  decrement: () => void
};

/* EXPORT */

export type {Result};
