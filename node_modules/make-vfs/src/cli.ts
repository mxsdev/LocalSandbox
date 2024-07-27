#!/usr/bin/env node
import { getVirtualFilesystemModuleFromDirPath } from "./index"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import * as fs from "fs/promises"
import mkdirp from "mkdirp"
import path from "path"

const argv = yargs(hideBin(process.argv))
  .option("dir", {
    type: "string",
    description: "The directory to load files from",
  })
  .option("extensions", {
    type: "string",
    description: "Valid extensions to write into vfs module",
  })
  .option("outfile", {
    type: "string",
    description: "The output vfs module file e.g. vfs.ts or migrations.ts",
  })
  .option("no-import-ext", {
    type: "boolean",
    description: "Do not add the extension to the import path",
  })
  .option("content-format", {
    type: "string",
    choices: [
      "buffer",
      "string",
      "import-star",
      "import-default",
      "require",
      "export-pathlist",
    ],
    default: "buffer",
    description: "The format to store files in the vfs module.",
  })
  .option("verbose", {
    type: "boolean",
    default: false,
  })
  .example(
    "make-vfs ./migrations --extensions sql --content-format=string ./migrations.ts",
    "Put all your migrations into a typescript module"
  )
  .example(
    "make-vfs ./routes --extensions ts,js ./routes.generated.ts --content-format=import-default --no-import-ext",
    "Put all your filesystem routes into a typescript module"
  ).argv as any

async function main() {
  let dir: string = argv.dir ?? argv._[0]
  let outfile: string = argv.outfile ?? argv._[1]

  if (!dir || !outfile) {
    console.log("Missing dir and/or outfile, use --help for usage")
    process.exit(1)
  }

  let extensions: string[] | undefined = undefined
  if (argv.extensions) extensions = argv.extensions.split(",")

  const opts = {
    dirPath: dir,
    extensions,
    contentFormat: argv.contentFormat,
    targetPath: outfile,
    noImportExt: !argv.importExt,
  }
  if (argv.verbose) {
    console.log(opts)
  }

  await mkdirp(path.dirname(outfile))
  await fs.writeFile(outfile, await getVirtualFilesystemModuleFromDirPath(opts))
}

main()
