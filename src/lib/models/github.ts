import z from "https://deno.land/x/zod@v3.23.8/index.ts"

export const user = z.object({
  id: z.string(),
  username: z.string(),
})
