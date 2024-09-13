import { defineConfig } from "tsup"

export default defineConfig({
  format: "esm",
  platform: "node",
  clean: true,
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;",
  },
})
