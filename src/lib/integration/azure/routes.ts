import { randomUUID } from "node:crypto"
import {
  createIntegration,
  createModelSpecs,
  IntegrationModel,
  IntegrationStore,
} from "../integration.js"
import { subscription } from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"
import { Middleware } from "edgespec"
import { bearerToken } from "../../util/bearer-token.js"
import { resourceGroup } from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2024-07-01/resources.js"
import { sbNamespace } from "../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/namespace-preview.js"

export const DEFAULT_SUBSCRIPTION_DISPLAY_NAME =
  "LocalSandbox Test Subscription"
export const DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE =
  "https://localsandbox.io"

const bearerAuthMiddleware: Middleware<
  {
    store: IntegrationStore<typeof azure_routes>
  },
  {
    subscription: IntegrationModel<typeof azure_routes, "subscription">
  }
> = async (req, ctx, next) => {
  const subscription_id = bearerToken.safeParse(
    req.headers.get("Authorization"),
  ).data

  // TODO: make sure req.routeParams.subscriptionId === subscription_id

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

export const azure_routes = createIntegration({
  globalSpec: {
    authMiddleware: {},
    afterAuthMiddleware: [bearerAuthMiddleware],
    passErrors: true,
  },
  models: createModelSpecs({
    subscription: {
      primaryKey: "subscriptionId",
      schema: subscription
        .omit({ id: true, subscriptionPolicies: true })
        .required()
        .extend(
          subscription.pick({ id: true, subscriptionPolicies: true }).partial()
            .shape,
        )
        .transform((v) => ({
          ...v,
          id: v.id ?? `/subscriptions/${v.subscriptionId}`,
        })),
    },
    resource_group: {
      primaryKey: "id",
      schema: resourceGroup
        .omit({ id: true })
        .extend({ id: resourceGroup.shape.id })
        .transform((v) => ({
          ...v,
          id: v.id ?? randomUUID(),
        })),
      hasOne: ["subscription"],
    },
    sb_namespace: {
      primaryKey: "id",
      schema: sbNamespace.transform((v) => ({
        ...v,
        id: v.id ?? randomUUID(),
      })),
    },
  }),
})
