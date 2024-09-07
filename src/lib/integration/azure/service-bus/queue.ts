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
          // TODO: automate this
          createdAt:
            parameters.properties?.createdAt ?? new Date().toISOString(),
          accessedAt:
            parameters.properties?.accessedAt ??
            // TODO: set this (based on location TZ) to 0001-01-01 00:00:00.000Z
            new Date(-62135568422000).toISOString(),
        },
      })
      .onAllConflictMerge()
      .executeTakeFirstOrThrow()

    return ctx.json(queue)
  },
)

azure_routes.implementRoute(
  ...extractRoute(
    queueRoutes,
    "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues/[queueName]",
    "GET",
  ),
  async (req, ctx) => {
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
      .select()
      .where((q) => q.sb_namespace().id === namespace.id)
      .where((q) => q.name === req.routeParams.queueName)
      .executeTakeFirstOrThrow(() => new NotFoundError("Queue not found"))

    const messageCount =
      ctx.azure_service_bus_broker?.messageSourceMessageCount(queue.id)

    const messageCountDetails =
      ctx.azure_service_bus_broker?.messageSourceMessageCountDetails(queue.id)

    return ctx.json({
      ...queue,
      properties: {
        ...queue.properties,
        messageCount,
        countDetails: messageCountDetails,
      },
    })
  },
)
