# make-vfs

Easily make a virtual filesystem from a directory.

- Create a typescript module that imports all your filesystem routes
- Create a javascript module that contains the content of all of your migrations

See some examples of what a [vfs module looks like here](https://github.com/seveibar/make-vfs/blob/main/tests/snapshots/generate-vfs-module.test.ts.md#L1)

## Usage

```
$ make-vfs --help
Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --dir             The directory to load files from                    [string]
  --extensions      Valid extensions to write into vfs module           [string]
  --outfile         The output vfs module file e.g. vfs.ts or migrations.ts
                                                                        [string]
  --no-import-ext   Do not add the extension to the import path        [boolean]
  --content-format  The format to store files in the vfs module.
         [string] [choices: "buffer", "string", "import-star", "import-default",
                                                  "require"] [default: "buffer"]

Examples:
  make-vfs ./migrations --extensions sql    Put all your migrations into a
  --content-format=string ./migrations.ts   typescript module
  make-vfs ./routes --extensions ts,js      Put all your filesystem routes into
  ./routes.generated.ts                     a typescript module
  --content-format=import-default
  --no-import-ext
```

### Usage as Library

```ts
import {
  getVirtualFilesystemModuleFromDirPath,
  getVirtualFileSystemFromDirPath,
  getMatchingFilePaths,
} from "./index"

const moduleString = await getVirtualFilesystemModuleFromDirPath({
  dir: "./migrations",
  extensions: ["sql"],
  outfile: "./migrations.ts",
  contentFormat: "string",
})
/*
export default {
  "0001_initial_migration": "CREATE TABLE users (id serial primary key)",
  "0002_add_email_to_users": "ALTER TABLE users ADD COLUMN email text",
}
*/
```

### Embedding as Part of a Build System

`make-vfs` can be embedded as part of your build system. For example, maybe
you want to build an application with filesystem routes, after creating a new
route or as a prebuild step you would just run `make-vfs ./src/routes ./src/routes.generated.ts`
e.g. inside a package.json `prebuild` script.
