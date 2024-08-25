import { z } from "zod"

const edgeSpecConfigSchema = z
  .object({
    /**
     * Defaults to the current working directory.
     */
    rootDirectory: z.string().optional(),
    /**
     * If this path is relative, it's resolved relative to the `rootDirectory` option.
     */
    tsconfigPath: z.string().optional(),
    /**
     * If this path is relative, it's resolved relative to the `rootDirectory` option.
     */
    routesDirectory: z.string().optional(),
    /**
     * The platform you're targeting.
     *
     * Defaults to `wintercg-minimal`, and you should use this whenever possible for maximal compatibility.
     *
     * Check [the docs](https://github.com/seamapi/edgespec/blob/main/docs/edgespec-config.md) for more information.
     */
    platform: z
      .enum(["node", "wintercg-minimal"])
      .default("wintercg-minimal")
      .optional(),
  })
  .strict()

export type EdgeSpecConfig = z.infer<typeof edgeSpecConfigSchema>

export const defineConfig = (config: EdgeSpecConfig): EdgeSpecConfig => {
  const parsedConfig = edgeSpecConfigSchema.safeParse(config)

  if (parsedConfig.success) {
    return parsedConfig.data
  }

  throw new Error(`Invalid config: ${parsedConfig.error}`)
}
