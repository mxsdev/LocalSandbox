import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["./scripts/cli.ts", "./scripts/start-server.ts"],
  outDir: "./dist/scripts",
  format: "esm",
  platform: "node",
  clean: true,
  minify: true,
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;",
  },
})
