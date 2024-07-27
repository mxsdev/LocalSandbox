import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts"

export const defineDBSchema = <const T extends z.ZodObject<any>>(opts: {
  schema: T
  primaryKey: keyof T["shape"]
  indexes?: (keyof T["shape"] | (keyof T["shape"])[])[]
}) => opts
