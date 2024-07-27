/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    setupFiles: ["./src/test/setup.ts"],
  },
})
