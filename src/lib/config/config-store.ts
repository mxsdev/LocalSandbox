import type ConfigstoreConstructor from "configstore"
import pMemoize from "p-memoize"
import { z } from "zod"

const storeSchema = z
  .object({
    server: z
      .object({
        port: z.number(),
        pid: z.number(),
      })
      .optional(),

    cert: z
      .object({
        key: z.string(),
        cert: z.string(),
        expiration: z.string().datetime(),
      })
      .optional(),
  })
  .optional()
  .default({})

export type StoreConfig = z.output<typeof storeSchema>

export class ConfigStore {
  private readonly store

  constructor(Configstore: typeof ConfigstoreConstructor) {
    this.store = new Configstore("localsandbox", {
      config: storeSchema.parse(undefined),
    })
  }

  get() {
    const config = storeSchema.safeParse(this.store.get("config")).data
    return config ?? {}
  }

  update(update: Partial<z.input<typeof storeSchema>>) {
    const new_config = storeSchema.parse({
      ...this.store.get("config"),
      ...update,
    })

    this.store.set("config", new_config)
  }
}

export const getDefaultConfigStore = pMemoize(async () => {
  return new ConfigStore((await import("configstore")).default)
})
