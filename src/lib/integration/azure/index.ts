import { z } from "zod"
import {
  createIntegration,
  createModelSpecs,
  IntegrationFactory,
  IntegrationModel,
  IntegrationStore,
} from "../integration.js"
import subscriptionRoutes, {
  subscription,
} from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"
import { Middleware } from "edgespec"
import { bearerToken } from "../../util/bearer-token.js"

export const DEFAULT_SUBSCRIPTION_DISPLAY_NAME =
  "LocalSandbox Test Subscription"
export const DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE =
  "https://localsandbox.io"

export const createAzureIntegration: IntegrationFactory = () => {
  const bearerAuthMiddleware: Middleware<
    {
      store: IntegrationStore<typeof integration>
    },
    {
      subscription: IntegrationModel<typeof integration, "subscription">
    }
  > = async (req, ctx, next) => {
    const subscription_id = bearerToken.safeParse(
      req.headers.get("Authorization"),
    ).data

    if (!subscription_id) {
      return new Response("Unauthorized", { status: 401 })
    }

    const subscription = ctx.store.subscription
      .insert()
      .values({
        subscriptionId: subscription_id,
        displayName: DEFAULT_SUBSCRIPTION_DISPLAY_NAME,
        authorizationSource: DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE,
        state: "Enabled",
      })
      .onAllConflictDoNothing()
      .executeTakeFirstOrThrow()

    ctx.subscription = subscription

    return await next(req, ctx)
  }

  const integration = createIntegration({
    globalSpec: {
      authMiddleware: {},
      afterAuthMiddleware: [bearerAuthMiddleware],
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
          .omit({ id: true, subscriptionPolicies: true })
          .required()
          .extend(
            subscription
              .pick({ id: true, subscriptionPolicies: true })
              .partial().shape,
          )
          .transform((v) => ({
            ...v,
            id: v.id ?? `/subscriptions/${v.subscriptionId}`,
          })),
      },
    }),
  }).withRoute("/subscriptions", subscriptionRoutes["/subscriptions"][0])

  integration.implementRoute("GET", "/subscriptions", async (_, ctx) => {
    return ctx.json({
      value: [ctx.subscription],
      // TODO: maybe don't do this??
      nextLink: "",
    })
  })

  return integration.build()
}
