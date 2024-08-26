import { z } from "zod"

export const bearerToken = z.string().transform((str) => {
  const matches = str.match(/^Bearer\s+(.+)$/)
  if (matches) {
    return matches[1] // Extract the token part
  }
  throw new Error("Invalid Bearer token format")
})
