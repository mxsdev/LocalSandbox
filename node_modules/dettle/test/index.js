
/* IMPORT */

import {describe} from 'fava';
import {debounce, throttle} from '../dist/index.js';

/* MAIN */

describe ( 'Dettle', () => {

  describe ( 'debounce', it => {

    it ( 'debounces function execution', async t => {

      let count = 0;
      let fn = () => count++;
      let dfn = debounce ( fn, 100 );

      for ( let i = 0; i < 1000; i++ ) {

        dfn ();

        await t.wait ( 1 );

      }

      await t.wait ( 500 );

      t.is ( count, 1 );

    });

    it ( 'works with a 0 delay', async t => {

      let count = 0;
      let fn = () => count++;
      let dfn = debounce ( fn, 0 );

      dfn ();

      await t.wait ( 5 );

      t.is ( count, 1 );

    });

  });

  describe ( 'throttle', it => {

    it ( 'throttles function execution', async t => {

      let count = 0;
      let fn = () => count++;
      let tfn = throttle ( fn, 100 );

      for ( let i = 0; i < 1000; i++ ) {

        tfn ();

        await t.wait ( 1 );

      }

      await t.wait ( 500 );

      t.true ( count > 10 );

    });

    it ( 'works with a 0 delay', async t => {

      let count = 0;
      let fn = () => count++;
      let tfn = throttle ( fn, 0 );

      tfn ();

      await t.wait ( 5 );

      t.is ( count, 1 );

    });

  });

});
