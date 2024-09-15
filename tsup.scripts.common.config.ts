import type { Options } from "tsup"

export const common_scripts_tsup_options = {
  entry: ["./scripts/cli.ts", "./scripts/start-server.ts"],
  platform: "node",
  clean: true,
  minify: true,
  bundle: true,
} satisfies Options
