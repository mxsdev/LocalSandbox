import ora from "ora"
import { create } from "tar"

const bundle_filename = process.env["BUNDLE_FILENAME"]

if (!bundle_filename) {
  console.error("BUNDLE_FILENAME is not set")
  process.exit(1)
}

const spinner = ora("Bundling CLI").start()

await create(
  {
    file: `${bundle_filename}`,
    gzip: true,
    C: "./dist/binary",
  },
  ["."],
)
  .then(() => spinner.succeed("Bundling CLI complete"))
  .catch((e) => {
    spinner.fail("Bundling CLI failed")
    console.error(e)
    process.exit(1)
  })
