import which from "which"
import fs from "node:fs/promises"
import path from "node:path"
import child_process from "node:child_process"
import { lookpath } from "lookpath"

global.__dirname ??= import.meta.dirname

export const runAzureLocalCli = async (...args: string[]) => {
  const az_path = await which("az", { nothrow: true })

  if (!az_path || !(await lookpath(az_path))) {
    console.error("Could not find az cli in PATH")
    process.exitCode = 1
    process.exit()
  }

  // const az_abs_path = await fs.realpath(az_path)

  const stdout = await new Promise<string>((resolve, reject) => {
    child_process.exec(`${az_path} --version`, {}, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }

      resolve(stdout)
    })
  })

  const [, python_location_match] =
    stdout.match(/^Python location '(.*)'/m) ?? []

  if (!python_location_match) {
    console.error("Could not find python location from az cli")
    process.exitCode = 1
    process.exit()
  }

  const script =
    process.env["__AZL_PYTHON_MAIN"] ??
    (
      await fs.readFile(
        path.join(
          __dirname,
          "../../../packages/azure-local-cli/azure_local_cli/__main__.py",
        ),
      )
    ).toString()

  if (!script) {
    console.error("Could not find azure-local-cli python script")
    process.exitCode = 1
    process.exit()
  }

  await new Promise<void>((resolve) => {
    const proc = child_process.spawn(
      python_location_match,
      ["-c", script, ...args],
      {
        stdio: "inherit",
      },
    )

    proc.on("exit", (code) => {
      resolve()
      process.exitCode = code ?? 0
    })
  })
}
