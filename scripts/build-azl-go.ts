import { execSync } from "node:child_process"
import os from "node:os"

const cmd = `go build -o ./dist/binary/azl${os.platform() === "win32" ? ".exe" : ""} ./azl.go`

execSync(cmd, { stdio: "inherit" })
