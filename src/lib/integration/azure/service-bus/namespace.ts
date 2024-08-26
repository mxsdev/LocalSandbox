import { NotFoundError } from "edgespec/middleware/http-exceptions.js"
import namespaceRoutes from "../../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/namespace-preview.js"
import { extractRoute } from "../../../openapi/extract-route.js"
import { azure_routes } from "../routes.js"

azure_routes.implementRoute(
  ...extractRoute(
    namespaceRoutes,
    "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]",
    "PUT",
  ),
  async (req, ctx) => {
    const parameters = req.jsonBody

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

    const namespace = ctx.store.sb_namespace
      .insert()
      .values({
        ...parameters,
        // TODO: support unique indexes
        location: resource_group.location,
        name: req.routeParams.namespaceName,
        resource_group_id: resource_group.id,
      })
      .onAllConflictMerge()
      .executeTakeFirstOrThrow()

    return ctx.json(namespace)
  },
)
