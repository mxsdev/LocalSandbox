import { NotFoundError } from "edgespec/middleware/http-exceptions.js"
import topicRoutes from "../../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/topics.js"
import { extractRoute } from "../../../openapi/extract-route.js"
import { azure_routes } from "../routes.js"

azure_routes.implementRoute(
  ...extractRoute(
    topicRoutes,
    "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]",
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

    const topic = ctx.store.sb_topic
      .insert()
      .values({
        ...parameters,
        id: `${namespace.id}/topics/${req.routeParams.topicName}`,
        location: namespace.location,
        sb_namespace_id: namespace.id,
        name: req.routeParams.topicName,
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

    return ctx.json(topic)
  },
)

azure_routes.implementRoute(
  ...extractRoute(
    topicRoutes,
    "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]",
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

    const queue = ctx.store.sb_topic
      .select()
      .where((q) => q.sb_namespace().id === namespace.id)
      .where((q) => q.name === req.routeParams.topicName)
      .executeTakeFirstOrThrow(() => new NotFoundError("Queue not found"))

    const countDetails =
      ctx.azure_service_bus_broker?.messageDestinationMessageCountDetails(
        queue.id,
      )

    return ctx.json({
      ...queue,
      properties: {
        ...queue.properties,
        countDetails,
      },
    })
  },
)
