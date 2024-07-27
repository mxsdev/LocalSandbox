import { z } from "zod"
import {
  createIntegration,
  createModel,
  IntegrationFactory,
} from "../integration"

export const github_integration: IntegrationFactory = () => {
  let ct = 0

  return createIntegration({
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
  })
    .withRoute(
      "/hello",
      {
        methods: ["GET"],
        jsonResponse: z.object({
          message: z.string(),
        }),
      },
      async (req, ctx) => {
        return ctx.json({
          message: `hi! users: ${await ctx.kysely
            .selectFrom("user")
            .selectAll()
            .execute()
            .then((users) => users.map((u) => u.id).join(", "))}`,
        })
      }
    )
    .withRoute(
      "/hello",
      {
        methods: ["POST"],
        jsonResponse: z.object({
          ok: z.boolean(),
        }),
      },
      async (req, ctx) => {
        await ctx.kysely
          .insertInto("user")
          .values({
            id: `user-${++ct}`,
          })
          .execute()

        return ctx.json({ ok: true })
      }
    )
    .build()
}
