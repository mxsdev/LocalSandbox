import type { Options } from "tsup"
import fs from "fs"

export const common_scripts_tsup_options = {
  entry: ["./scripts/cli.ts", "./scripts/start-server.ts"],
  env: {
    __AZL_PYTHON_MAIN: fs.readFileSync(
      "./packages/azure-local-cli/azure_local_cli/__main__.py",
      "utf-8",
    ),
  },
  noExternal: [/(.*)/],
  platform: "node",
  clean: true,
  minify: true,
  bundle: true,
} satisfies Options
