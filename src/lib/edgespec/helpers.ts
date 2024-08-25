import { EdgeSpecRouteBundle } from "./types/index.js"

/**
 * Loads a file created by `edgespec bundle` and returns the default export.
 * This is a very thin wrapper over `import()` that adds some types.
 */
export const loadBundle = async (
  bundlePath: string
): Promise<EdgeSpecRouteBundle> => {
  const bundle = await import(bundlePath)
  // If the file is imported as CJS, the default export is nested.
  // Naming this with .mjs seems to break some on-the-fly transpiling tools downstream.
  return bundle.default.default ?? bundle.default
}
