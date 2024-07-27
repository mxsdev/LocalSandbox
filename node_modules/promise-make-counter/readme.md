# Promise Make Counter

A simple function that makes a counter-based promise, which can be incremented and decremented, and it resolves once its counter reaches zero.

This is an alternative to creating a promise that waits on many other promises to resolve. You can do that, but creating many promises can be surprisingly slow, instead you could use this package, switch internally to using callbacks-style APIs rather than async/await-style APIs, and just increment the counter at the start of each callback, and decrement it at its end, once its job is done.

## Install

```sh
npm install --save promise-make-counter
```

## Usage

```ts
import fs from 'node:fs';
import makeCounterPromise from 'promise-make-counter';

// Let's create a counter-based promise

const {promise, isPending, increment, decrement} = makeCounterPromise ();

// Now let's do some work that's tracked by our counter-based promise
// It's important to always increment at the start, and decrement at the end

for ( const filePath of filePaths ) {

  increment ();

  fs.readFile ( filePath, 'utf8', ( error, data ) => {

    // Do something here...

    decrement ();

  });

}

// Let's wait for the counter-based promise to resolve
// This will happen once its internal counter will reach zero

await promise;
```

## License

MIT © Fabio Spampinato
