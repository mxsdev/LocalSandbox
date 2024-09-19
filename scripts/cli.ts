import { program } from "@commander-js/extra-typings"
import { runCli } from "../src/cli/index.js"
import { runAzureLocalCli } from "lib/cli/run-azure-local-cli.js"

if (process.env["LOCALSANDBOX_AZ_LOCAL"] !== "true") {
  runCli(program)
} else {
  void runAzureLocalCli(...process.argv.slice(2))
}
