import { defineConfig } from "tsup"
import { common_tsup_options } from "./tsup.common.config.js"

export default defineConfig({
  ...common_tsup_options,

  outDir: "./dist/cjs",
  format: "cjs",

  legacyOutput: true,

  //   banner: {
  //     js: "import { createRequire } from 'module';const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;",
  //   },
})
