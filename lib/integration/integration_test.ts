import * as t from "assert"
import { createIntegration, createModel } from "./integration.ts"
import z from "zod"

Deno.test("basic integration test", async () => {
  const integration = createIntegration({
    globalSpec: {
      authMiddleware: {},
    },
    models: {
      user: createModel({
        primaryKey: "id",
        schema: z.object({
          id: z.string(),
        }),
      }),
    },
  }).withRoute(
    "/hello",
    {
      method: ["GET"],
      jsonResponse: z.object({}),
    },
    async (req, ctx) => {
      return ctx.json()
    }
  )
})
