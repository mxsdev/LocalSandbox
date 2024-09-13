import { z } from "zod"

export const DEFAULT_LOCALSANDBOX_PORT = 7329
export const DEFAULT_LOCALSANDBOX_AMQP_PORT = 5672

const envSchema = z.object({
  LOG_LEVEL: z.string().default("info"),
  LOCALSANDBOX_PORT: z.coerce.number().default(7329),
  LOCALSANDBOX_AMQP_PORT: z.coerce.number().default(5672),
})

export type ServerEnv = z.output<typeof envSchema>

export const getServerEnv = (
  overrides: Partial<z.input<typeof envSchema>> = {},
) => envSchema.parse({ ...process.env, ...overrides })
