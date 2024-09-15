import type { Options } from "tsup"

export const common_tsup_options = {
  entry: ["src/**/*.ts"],
  dts: { entry: ["src/index.ts"] },

  platform: "node",

  clean: true,
  minify: false,
  bundle: false,

  sourcemap: true,
} satisfies Options
