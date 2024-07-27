# Promise Make Naked

A simple function that makes a promise that can be resolved, rejected or introspected from the outside.

## Install

```sh
npm install --save promise-make-naked
```

## Usage

```ts
import makeNakedPromise from 'promise-make-naked';

// Let's create a naked Promise

const {promise, resolve, reject, isPending, isResolved, isRejected} = makeNakedPromise ();

resolve ( 123 ); // Resolve the promise with the provided value
reject ( new Error () ); // Reject the promise with the provided reason

isPending (); // Check if the promise is still pending
isResolved (); // Check if the promise got resolved
isRejected (); // Check if the promise got rejected
```

## License

MIT © Fabio Spampinato
