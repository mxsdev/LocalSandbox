import Configstore from "configstore"
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
  private readonly store = new Configstore("localsandbox", {
    config: storeSchema.parse(undefined),
  })

  get() {
    return storeSchema.safeParse(this.store.get("config")).data ?? {}
  }

  update(update: Partial<z.input<typeof storeSchema>>) {
    this.store.set(
      "config",
      storeSchema.parse({ ...this.store.get("config").data, ...update }),
    )
  }
}

const default_configstore = new ConfigStore()

export const getDefaultConfigStore = () => default_configstore
