import { z } from "zod"
import {
  createIntegration,
  createModelSpecs,
  IntegrationFactory,
} from "../integration.js"
import vmRoutes, {
  virtualMachine,
} from "../../../../output/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-07-01/virtualMachine.js"
import subscriptionRoutes, {
  subscription,
} from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"

export const azure_integration: IntegrationFactory = () => {
  let ct = 0

  const integration = createIntegration({
    globalSpec: {
      authMiddleware: {},
      passErrors: true,
    },
    models: createModelSpecs({
      user: {
        primaryKey: "id",
        schema: z.object({
          id: z.string(),
        }),
        // hasOne: ["subscription"],
      },
      subscription: {
        primaryKey: "subscriptionId",
        schema: subscription
          .pick({
            authorizationSource: true,
            subscriptionId: true,
            displayName: true,
            state: true,
          })
          .required(),
      },
    }),
  })
    .withRoute("/hello", {
      methods: ["GET"],
      jsonResponse: z.object({
        message: z.string(),
      }),
    })
    .withRoute("/hello", {
      methods: ["POST"],
      jsonResponse: z.object({
        ok: z.boolean(),
      }),
    })
    .withRoute("/subscriptions", subscriptionRoutes["/subscriptions"][0])

  integration.implementRoute("GET", "/subscriptions", async (req, ctx) => {
    // TODO: filter based on auth
    const subscriptions = ctx.store.subscription.select().execute()

    // ctx.kysely.selectFrom("subscription")

    return ctx.json({
      value: subscriptions,
      nextLink: "",
    })

    // return new Response("Unimplemented", { status: 501 })
  })

  integration.implementRoute("GET", "/hello", async (_, ctx) => {
    return ctx.json({
      message: `hi! users: ${ctx.store.user
        .select()
        .execute()
        .map((u) => u.id)
        .join(", ")}`,
    })
  })

  integration.implementRoute("POST", "/hello", async (_, ctx) => {
    ctx.store.user
      .insert()
      .values({
        id: `user-${++ct}`,
      })
      .execute()

    return ctx.json({ ok: true })
  })

  return integration.build()
}
