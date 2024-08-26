import { NotFoundError } from "edgespec/middleware/http-exceptions.js"
import queueRoutes from "../../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/Queue.js"
import { extractRoute } from "../../../openapi/extract-route.js"
import { azure_routes } from "../routes.js"

azure_routes.implementRoute(
  ...extractRoute(
    queueRoutes,
    "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues/[queueName]",
    "PUT",
  ),
  async (req, ctx) => {
    const parameters = req.jsonBody

    const namespace = ctx.store.sb_namespace
      .select()
      .where(
        (ns) =>
          ns.resource_group().subscription().subscriptionId ===
          ctx.subscription.subscriptionId,
      )
      .where(
        (ns) =>
          ns.resource_group().subscription().subscriptionId ===
          req.routeParams.subscriptionId,
      )
      .where(
        (ns) => ns.resource_group().name === req.routeParams.resourceGroupName,
      )
      .where((ns) => ns.name === req.routeParams.namespaceName)
      .executeTakeFirstOrThrow(() => new NotFoundError("Namespace not found"))

    const queue = ctx.store.sb_queue
      .insert()
      .values({
        ...parameters,
        location: namespace.location,
        sb_namespace_id: namespace.id,
        name: req.routeParams.queueName,
        properties: {
          ...parameters.properties,
          createdAt: new Date().toISOString(),
          messageCount: 0,
        },
      })
      .onAllConflictMerge()
      .executeTakeFirstOrThrow()

    return ctx.json(queue)
  },
)
