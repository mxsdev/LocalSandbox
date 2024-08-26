import { NotFoundError } from "edgespec/middleware/http-exceptions.js"
import { azure_routes } from "./routes.js"
import { extractRoute } from "../../openapi/extract-route.js"
import resourceRoutes from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2024-07-01/resources.js"

azure_routes.implementRoute(
  ...extractRoute(
    resourceRoutes,
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    "PUT",
  ),
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

azure_routes.implementRoute(
  ...extractRoute(
    resourceRoutes,
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    "PATCH",
  ),
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
          ctx.subscription.subscriptionId === rg.subscription().subscriptionId,
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

azure_routes.implementRoute(
  ...extractRoute(
    resourceRoutes,
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    "GET",
  ),
  async (req, ctx) => {
    const resource_group = ctx.store.resource_group
      .select()
      .where(
        (rg) =>
          ctx.subscription.subscriptionId === rg.subscription().subscriptionId,
      )
      .where(
        (rg) =>
          rg.subscription().subscriptionId === req.routeParams.subscriptionId,
      )
      .where((rg) => rg.name === req.routeParams.resourceGroupName)
      .executeTakeFirstOrThrow(
        () => new NotFoundError("Could not find resource group"),
      )

    return ctx.json(resource_group)
  },
)

azure_routes.implementRoute(
  ...extractRoute(
    resourceRoutes,
    "/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]",
    "HEAD",
  ),
  async (req, ctx) => {
    ctx.store.resource_group
      .select()
      .where(
        (rg) =>
          ctx.subscription.subscriptionId === rg.subscription().subscriptionId,
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
