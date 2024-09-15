import Configstore from "lib/configstore/index.js"
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
  constructor(private readonly key: string) {}

  private readonly store = new Configstore("localsandbox", {
    config: storeSchema.parse(undefined),
  })

  get() {
    const config = storeSchema.safeParse(this.store.get(this.key)).data
    return config ?? {}
  }

  update(update: Partial<z.input<typeof storeSchema>>) {
    const new_config = storeSchema.parse({
      ...this.store.get(this.key),
      ...update,
    })

    this.store.set(this.key, new_config)
  }
}

const default_configstore = new ConfigStore("localsandbox")

export const getDefaultConfigStore = () => default_configstore
