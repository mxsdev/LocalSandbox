
/* IMPORT */

import {describe} from 'fava';
import makeCounterPromise from '../dist/index.js';

/* MAIN */

describe ( 'Promise Make Counter', it => {

  it ( 'resolves without increments', async t => {

    const {isPending} = makeCounterPromise ();

    t.true ( isPending () );

    await t.wait ( 0 );

    t.false ( isPending () );

  });

  it ( 'resolves after equal increments and decrements', async t => {

    const {isPending, increment, decrement} = makeCounterPromise ();

    t.true ( isPending () );

    increment ();
    increment ();
    increment ();

    await t.wait ( 0 );

    t.true ( isPending () );

    decrement ();
    decrement ();

    await t.wait ( 0 );

    t.true ( isPending () );

    decrement ();

    await t.wait ( 0 );

    t.false ( isPending () );

  });

});
