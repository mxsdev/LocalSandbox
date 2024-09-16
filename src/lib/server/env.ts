import { Temporal } from "@js-temporal/polyfill"
import { z } from "zod"

export const DEFAULT_LOCALSANDBOX_PORT = 7329
export const DEFAULT_LOCALSANDBOX_AMQP_PORT = 5672

export const DEFAULT_RESOURCE_NAME = "default" as const

const resource_name = z.union([
  z.enum(["disabled", "false"]).transform(() => undefined),
  z.string().optional().default(DEFAULT_RESOURCE_NAME),
])

const envSchema = z.object({
  LOG_LEVEL: z.string().default("info"),
  LOCALSANDBOX_PORT: z.coerce.number().default(7329),
  LOCALSANDBOX_AMQP_PORT: z.coerce.number().default(5672),

  LOCALSANDBOX_DEFAULT_LOCATION: z.string().optional().default("westus2"),

  LOCALSANDBOX_DEFAULT_SUBSCRIPTION_ID: resource_name,
  LOCALSANDBOX_DISABLE_DEFAULT_RESOURCES: z.coerce
    .string()
    .optional()
    .default("false")
    .transform((v) => v.toLowerCase() === "true" || v === "1"),
  LOCALSANDBOX_DEFAULT_RESOURCE_GROUP: resource_name,
  LOCALSANDBOX_DEFAULT_NAMESPACE: resource_name,
  LOCALSANDBOX_DEFAULT_QUEUE: resource_name,

  LOCALSANDBOX_HTTPS: z.coerce.boolean().optional().default(true),
  LOCALSANDBOX_CERT_RETRIEVAL_URL: z
    .string()
    .url()
    .optional()
    .default("https://cert.localsandbox.sh"),
  LOCALSANDBOX_CERT_CACHE_EXPIRATION: z
    .string()
    .duration()
    .optional()
    .default(Temporal.Duration.from({ days: 1 }).toString()),
})

export type ServerEnv = z.output<typeof envSchema>

export const getServerEnv = (
  overrides: Partial<z.input<typeof envSchema>> = {},
) => envSchema.parse({ ...process.env, ...overrides })
