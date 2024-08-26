import { z } from "zod"
import { randomUUID } from "node:crypto"
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
import resourceRoutes from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2024-07-01/resources.js"
import { Middleware } from "edgespec"
import { bearerToken } from "../../util/bearer-token.js"
import { resourceGroup } from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2024-07-01/resources.js"
import { NotFoundError } from "edgespec/middleware/http-exceptions.js"
import { extractRoute } from "../../openapi/extract-route.js"

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

  const integration = createIntegration({
    globalSpec: {
      authMiddleware: {},
      afterAuthMiddleware: [bearerAuthMiddleware],
      passErrors: true,
    },
    models: createModelSpecs({
      // resource_group: {
      //   schema: resourceGroup
      // },
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
    }),
  })
    .withRoute("/subscriptions", subscriptionRoutes["/subscriptions"][0])
    .withRoute(
      ...extractRoute(
        resourceRoutes,
        "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
        "GET",
      ),
    )
    .withRoute(
      ...extractRoute(
        resourceRoutes,
        "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
        "PUT",
      ),
    )
    .withRoute(
      ...extractRoute(
        resourceRoutes,
        "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
        "PATCH",
      ),
    )
    .withRoute(
      ...extractRoute(
        resourceRoutes,
        "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
        "DELETE",
      ),
    )
    .withRoute(
      ...extractRoute(
        resourceRoutes,
        "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
        "HEAD",
      ),
    )

  integration.implementRoute("GET", "/subscriptions", async (_, ctx) => {
    return ctx.json({
      value: [ctx.subscription],
      // TODO: maybe don't do this??
      nextLink: "",
    })
  })

  integration.implementRoute(
    "PUT",
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    async (req, ctx) => {
      const parameters = req.jsonBody

      if (
        parameters.name &&
        parameters.name !== req.routeParams.resourceGroupName
      ) {
        // TODO: make this the same as prod...
        throw new Error("Invalid name")
      }

      const resourceGroup = ctx.store.resource_group
        .insert()
        .values({
          ...parameters,
          // TODO: support unique indexes
          name: parameters.name ?? req.routeParams.resourceGroupName,
          subscription_id: ctx.subscription.subscriptionId,
        })
        .onAllConflictMerge()
        .executeTakeFirstOrThrow()

      return ctx.json(resourceGroup)
    },
  )

  integration.implementRoute(
    "PATCH",
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    async (req, ctx) => {
      const parameters = req.jsonBody

      if (
        parameters.name &&
        parameters.name !== req.routeParams.resourceGroupName
      ) {
        // TODO: make this the same as prod...
        throw new Error("Invalid name")
      }

      const resourceGroup = ctx.store.resource_group
        .update()
        .where(
          (rg) =>
            ctx.subscription.subscriptionId ===
            rg.subscription().subscriptionId,
        )
        .where(
          (rg) =>
            rg.subscription().subscriptionId === req.routeParams.subscriptionId,
        )
        .where((rg) => rg.name === req.routeParams.resourceGroupName)
        .set(parameters)
        .executeTakeFirstOrThrow()

      return ctx.json(resourceGroup)
    },
  )

  integration.implementRoute(
    "GET",
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    async (req, ctx) => {
      const subscription = ctx.store.resource_group
        .select()
        .where(
          (rg) =>
            ctx.subscription.subscriptionId ===
            rg.subscription().subscriptionId,
        )
        .where(
          (rg) =>
            rg.subscription().subscriptionId === req.routeParams.subscriptionId,
        )
        .where((rg) => rg.name === req.routeParams.resourceGroupName)
        .executeTakeFirstOrThrow(
          () => new NotFoundError("Could not find subscription"),
        )

      return ctx.json(subscription)
    },
  )

  integration.implementRoute(
    "HEAD",
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    async (req, ctx) => {
      ctx.store.resource_group
        .select()
        .where(
          (rg) =>
            ctx.subscription.subscriptionId ===
            rg.subscription().subscriptionId,
        )
        .where(
          (rg) =>
            rg.subscription().subscriptionId === req.routeParams.subscriptionId,
        )
        .where((rg) => rg.name === req.routeParams.resourceGroupName)
        .executeTakeFirstOrThrow(
          () => new NotFoundError("Could not find subscription"),
        )

      return new Response(null, { status: 204 })
    },
  )

  // TODO: DELETE endpoint

  return integration.build()
}
