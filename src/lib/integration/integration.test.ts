import { createIntegration, createModel } from "./integration.ts"
import z from "zod"
import { expect, test } from "vitest"

test("basic integration test", async () => {
  let ct = 1

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
            id: `user-${ct++}`,
          })
          .execute()

        return ctx.json({ ok: true })
      }
    )
    .build()

  await integration.edgeSpecRouteBundle
    .makeRequest(
      new Request("http://localhost:3000/hello", {
        method: "POST",
      })
    )
    .then((r) => r.json())

  await integration.edgeSpecRouteBundle
    .makeRequest(
      new Request("http://localhost:3000/hello", {
        method: "POST",
      })
    )
    .then((r) => r.json())

  await integration.edgeSpecRouteBundle
    .makeRequest(
      new Request("http://localhost:3000/hello", {
        method: "POST",
      })
    )
    .then((r) => r.json())

  const res = await integration.edgeSpecRouteBundle
    .makeRequest(
      new Request("http://localhost:3000/hello", {
        method: "GET",
      })
    )
    .then((r) => r.json())

  console.log(res)
})
