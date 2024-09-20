import { defineConfig } from "tsup"
import { common_scripts_tsup_options } from "./tsup.scripts.common.config.js"

export default defineConfig({
  ...common_scripts_tsup_options,

  outDir: "./dist/scripts/esm",

  format: "esm",
  legacyOutput: true,

  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;",
  },
})
