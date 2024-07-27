
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import path from 'node:path';
import readdir from '../dist/index.js';

/* HELPERS */

const toBasename = filePath => path.basename ( filePath );

/* MAIN */

describe ( 'Tiny Readdir', it => {

  it ( 'finds folders, files and symlinks', async t => {

    const cwdPath = process.cwd ();
    const root1Path = path.join ( cwdPath, 'test', 'root1' );
    const root2Path = path.join ( cwdPath, 'test', 'root2' );
    const folder1Path = path.join ( root1Path, 'folder1' );
    const folder2Path = path.join ( root1Path, 'folder2' );
    const folder1DeepPath = path.join ( folder1Path, 'deep' );
    const file1aPath = path.join ( folder1Path, 'file1a.txt' );
    const file1bPath = path.join ( folder1Path, 'file1b.txt' );
    const file2Path = path.join ( folder2Path, 'file2.txt' );
    const fileDeep1Path = path.join ( folder1DeepPath, 'file1.txt' );
    const symlink1FromPath = path.join ( root1Path, 'symlink' );
    const symlink1ToPath = root2Path;
    const symlink2FromPath = path.join ( root2Path, 'symlink' );
    const symlink2ToPath = root1Path;

    fs.mkdirSync ( root1Path );
    fs.mkdirSync ( root2Path );
    fs.mkdirSync ( folder1Path );
    fs.mkdirSync ( folder2Path );
    fs.mkdirSync ( folder1DeepPath );
    fs.writeFileSync ( file1aPath, '' );
    fs.writeFileSync ( file1bPath, '' );
    fs.writeFileSync ( file2Path, '' );
    fs.writeFileSync ( fileDeep1Path, '' );
    fs.symlinkSync ( symlink1ToPath, symlink1FromPath );
    fs.symlinkSync ( symlink2ToPath, symlink2FromPath );

    const expected = {
      directories: [folder1Path, folder2Path, folder1DeepPath, root2Path],
      directoriesNames: new Set ( [folder1Path, folder2Path, folder1DeepPath, root2Path].map ( toBasename ) ),
      directoriesNamesToPaths: { folder1: [folder1Path], folder2: [folder2Path], deep: [folder1DeepPath], root2: [root2Path] },
      files: [file1aPath, file1bPath, file2Path, fileDeep1Path],
      filesNames: new Set ( [file1aPath, file1bPath, file2Path, fileDeep1Path].map ( toBasename ) ),
      filesNamesToPaths: { 'file1a.txt': [file1aPath], 'file1b.txt': [file1bPath], 'file2.txt': [file2Path], 'file1.txt': [fileDeep1Path] },
      symlinks: [symlink1FromPath, symlink2FromPath],
      symlinksNames: new Set ( [symlink1FromPath, symlink2FromPath].map ( toBasename ) ),
      symlinksNamesToPaths: { symlink: [symlink1FromPath, symlink2FromPath] },
      map: {
        [root1Path]: {
          directories: [folder1Path, folder2Path],
          directoriesNames: new Set ( [folder1Path, folder2Path].map ( toBasename ) ),
          directoriesNamesToPaths: {},
          files: [],
          filesNames: new Set (),
          filesNamesToPaths: {},
          symlinks: [symlink1FromPath],
          symlinksNames: new Set ( [symlink1FromPath].map ( toBasename ) ),
          symlinksNamesToPaths: {}
        },
        [root2Path]: {
          directories: [],
          directoriesNames: new Set (),
          directoriesNamesToPaths: {},
          files: [],
          filesNames: new Set (),
          filesNamesToPaths: {},
          symlinks: [symlink2FromPath],
          symlinksNames: new Set ( [symlink2FromPath].map ( toBasename ) ),
          symlinksNamesToPaths: {}
        },
        [folder1Path]: {
          directories: [folder1DeepPath],
          directoriesNames: new Set ( [folder1DeepPath].map ( toBasename ) ),
          directoriesNamesToPaths: {},
          files: [file1aPath, file1bPath],
          filesNames: new Set ( [file1aPath, file1bPath].map ( toBasename ) ),
          filesNamesToPaths: {},
          symlinks: [],
          symlinksNames: new Set (),
          symlinksNamesToPaths: {}
        },
        [folder2Path]: {
          directories: [],
          directoriesNames: new Set (),
          directoriesNamesToPaths: {},
          files: [file2Path],
          filesNames: new Set ( [file2Path].map ( toBasename ) ),
          filesNamesToPaths: {},
          symlinks: [],
          symlinksNames: new Set (),
          symlinksNamesToPaths: {}
        },
        [folder1DeepPath]: {
          directories: [],
          directoriesNames: new Set (),
          directoriesNamesToPaths: {},
          files: [fileDeep1Path],
          filesNames: new Set ( [fileDeep1Path].map ( toBasename ) ),
          filesNamesToPaths: {},
          symlinks: [],
          symlinksNames: new Set (),
          symlinksNamesToPaths: {}
        },
        [symlink1FromPath]: {
          directories: [root2Path],
          directoriesNames: new Set ( [root2Path].map ( toBasename ) ),
          directoriesNamesToPaths: {},
          files: [],
          filesNames: new Set (),
          filesNamesToPaths: {},
          symlinks: [],
          symlinksNames: new Set (),
          symlinksNamesToPaths: {}
        },
        [symlink2FromPath]: {
          directories: [],
          directoriesNames: new Set (),
          directoriesNamesToPaths: {},
          files: [],
          filesNames: new Set (),
          filesNamesToPaths: {},
          symlinks: [],
          symlinksNames: new Set (),
          symlinksNamesToPaths: {}
        }
      }
    };

    try {

      const result = await readdir ( root1Path, { followSymlinks: true } );

      t.deepEqual ( result, expected );

    } finally {

      fs.rmSync ( root1Path, { recursive: true } );
      fs.rmSync ( root2Path, { recursive: true } );

    }

  });

  it ( 'supports a depth option', async t => {

    const cwdPath = process.cwd ();

    const {files: files0} = await readdir ( cwdPath, { depth: 0 } );
    const {files: files1} = await readdir ( cwdPath, { depth: 1 } );
    const {files: filesInfinity} = await readdir ( cwdPath, { depth: Infinity } );

    t.true ( files0.length === 0 );
    t.true ( files1.length > 0 && files1.length < 10 );
    t.true ( filesInfinity.length > 100 );

  });

  it ( 'supports a limit option', async t => {

    const cwdPath = process.cwd ();
    const root1Path = path.join ( cwdPath, 'test', 'root1' );
    const root2Path = path.join ( cwdPath, 'test', 'root2' );
    const folder1Path = path.join ( root1Path, 'folder1' );
    const folder2Path = path.join ( root1Path, 'folder2' );
    const folder1DeepPath = path.join ( folder1Path, 'deep' );
    const file1aPath = path.join ( folder1Path, 'file1a.txt' );
    const file1bPath = path.join ( folder1Path, 'file1b.txt' );
    const file2Path = path.join ( folder2Path, 'file2.txt' );
    const fileDeep1Path = path.join ( folder1DeepPath, 'file1.txt' );
    const symlink1FromPath = path.join ( root1Path, 'symlink' );
    const symlink1ToPath = root2Path;
    const symlink2FromPath = path.join ( root2Path, 'symlink' );
    const symlink2ToPath = root1Path;

    fs.mkdirSync ( root1Path );
    fs.mkdirSync ( root2Path );
    fs.mkdirSync ( folder1Path );
    fs.mkdirSync ( folder2Path );
    fs.mkdirSync ( folder1DeepPath );
    fs.writeFileSync ( file1aPath, '' );
    fs.writeFileSync ( file1bPath, '' );
    fs.writeFileSync ( file2Path, '' );
    fs.writeFileSync ( fileDeep1Path, '' );
    fs.symlinkSync ( symlink1ToPath, symlink1FromPath );
    fs.symlinkSync ( symlink2ToPath, symlink2FromPath );

    const expected = {
      directories: [folder1Path, folder2Path],
      directoriesNames: new Set ( [folder1Path, folder2Path].map ( toBasename ) ),
      directoriesNamesToPaths: { folder1: [folder1Path], folder2: [folder2Path] },
      files: [],
      filesNames: new Set (),
      filesNamesToPaths: {},
      symlinks: [symlink1FromPath],
      symlinksNames: new Set ( [symlink1FromPath].map ( toBasename ) ),
      symlinksNamesToPaths: { symlink: [symlink1FromPath] },
      map: {
        [root1Path]: {
          directories: [folder1Path, folder2Path],
          directoriesNames: new Set ( [folder1Path, folder2Path].map ( toBasename ) ),
          directoriesNamesToPaths: {},
          files: [],
          filesNames: new Set (),
          filesNamesToPaths: {},
          symlinks: [symlink1FromPath],
          symlinksNames: new Set ( [symlink1FromPath].map ( toBasename ) ),
          symlinksNamesToPaths: {}
        },
        [folder1Path]: {
          directories: [],
          directoriesNames: new Set (),
          directoriesNamesToPaths: {},
          files: [],
          filesNames: new Set (),
          filesNamesToPaths: {},
          symlinks: [],
          symlinksNames: new Set (),
          symlinksNamesToPaths: {}
        },
        [folder2Path]: {
          directories: [],
          directoriesNames: new Set (),
          directoriesNamesToPaths: {},
          files: [],
          filesNames: new Set (),
          filesNamesToPaths: {},
          symlinks: [],
          symlinksNames: new Set (),
          symlinksNamesToPaths: {}
        }
      }
    };

    try {

      const result = await readdir ( root1Path, { limit: 3, followSymlinks: true } );

      t.deepEqual ( result, expected );

    } finally {

      fs.rmSync ( root1Path, { recursive: true } );
      fs.rmSync ( root2Path, { recursive: true } );

    }

  });

  it ( 'does not freeze the main thread', async t => {

    return new Promise ( resolve => {

      let count = 0;
      let start = Date.now ();

      const aborter = new AbortController ();
      const signal = aborter.signal;

      const intervalId = setInterval ( () => {
        count += 1;
        console.log ( 'tick', count );
        if ( count !== 100 ) return;
        clearInterval ( intervalId );
        const end = Date.now ();
        const elapsed = end - start;
        console.log ( 'elapsed', elapsed );
        console.log ( elapsed );
        if ( elapsed > 1500 ) {
          t.fail ();
        } else {
          t.pass ();
        }
        aborter.abort ();
        resolve ();
      }, 10 );

      readdir ( '/', { signal } );

    });

  });

});
