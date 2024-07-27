# Dettle

A tiny fully-featured debounce and throttle implementation.

## Install

```sh
npm install --save dettle
```

## Usage

```ts
import {debounce, throttle} from 'dettle';

const fn = () => console.log ( 'Fired!' );

// Debouncing
// The following options are supported:
// `leading`: whether the function should be called when the timeout is created, defaults to `false`
// `trailing`: whether the function should be called when the timeout expires, defaults to `true`
// `maxWait`: the maximum amount of time that can pass before the function is called, defaults to `Infinity`

const debounced = debounce ( fn, 1000, {
  leading: false,
  trailing: true,
  maxWait: Infinity
});

debounced (); // Schedule function for execution
debounced (); // Re-schedule function for execution

debounced.flush (); // Execute the function immediately, if there's a scheduled execution
debounced.cancel (); // Cancel the scheduled execution

// Throttling
// The API for throttling is basically the same, except that:
// - `leading`: is `true` by default rather than `false`
// - `maxWait`: is set implicitly for you to be equal to the wait time

const throttled = throttle ( fn, 1000, {
  leading: true,
  trailing: true
});

throttled (); // Call the function immediately
throttled (); // Schedule function for execution

throttled.flush (); // Execute the function immediately, if there's a scheduled execution
throttled.cancel (); // Cancel the scheduled execution
```

## License

MIT © Fabio Spampinato
