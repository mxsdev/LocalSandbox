import { NotFoundError } from "edgespec/middleware/http-exceptions.js"
import subscriptionRoutes from "../../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/subscriptions.js"
import { extractRoute } from "../../../openapi/extract-route.js"
import { azure_routes } from "../routes.js"

azure_routes.implementRoute(
  ...extractRoute(
    subscriptionRoutes,
    "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions/[subscriptionName]",
    "PUT",
  ),
  async (req, ctx) => {
    const parameters = req.jsonBody

    const topic = ctx.store.sb_topic
      .select()
      .where(
        (topic) =>
          topic.sb_namespace().resource_group().subscription()
            .subscriptionId === ctx.subscription.subscriptionId,
      )
      .where(
        (topic) =>
          topic.sb_namespace().resource_group().subscription()
            .subscriptionId === req.routeParams.subscriptionId,
      )
      .where(
        (topic) =>
          topic.sb_namespace().resource_group().name ===
          req.routeParams.resourceGroupName,
      )
      .where(
        (topic) => topic.sb_namespace().name === req.routeParams.namespaceName,
      )
      .where((topic) => topic.name === req.routeParams.topicName)
      .executeTakeFirstOrThrow(() => new NotFoundError("Topic not found"))

    const subscription = ctx.store.sb_subscription
      .insert()
      .values({
        ...parameters,
        location: topic.location,
        // sb_namespace_id: namespace.id,
        sb_topic_id: topic.id,
        name: req.routeParams.subscriptionName,
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

    return ctx.json(subscription)
  },
)

azure_routes.implementRoute(
  ...extractRoute(
    subscriptionRoutes,
    "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions/[subscriptionName]",
    "GET",
  ),
  async (req, ctx) => {
    const topic = ctx.store.sb_topic
      .select()
      .where(
        (topic) =>
          topic.sb_namespace().resource_group().subscription()
            .subscriptionId === ctx.subscription.subscriptionId,
      )
      .where(
        (topic) =>
          topic.sb_namespace().resource_group().subscription()
            .subscriptionId === req.routeParams.subscriptionId,
      )
      .where(
        (topic) =>
          topic.sb_namespace().resource_group().name ===
          req.routeParams.resourceGroupName,
      )
      .where(
        (topic) => topic.sb_namespace().name === req.routeParams.namespaceName,
      )
      .where((topic) => topic.name === req.routeParams.topicName)
      .executeTakeFirstOrThrow(() => new NotFoundError("Topic not found"))

    const subscription = ctx.store.sb_subscription
      .select()
      .where((q) => q.sb_topic().id === topic.id)
      .where((q) => q.name === req.routeParams.subscriptionName)
      .executeTakeFirstOrThrow(() => new NotFoundError("Queue not found"))

    const messageCount =
      ctx.azure_service_bus_broker?.messageSourceMessageCount(subscription.id)

    const messageCountDetails =
      ctx.azure_service_bus_broker?.messageSourceMessageCountDetails(
        subscription.id,
      )

    return ctx.json({
      ...subscription,
      properties: {
        ...subscription.properties,
        messageCount,
        countDetails: messageCountDetails,
      },
    })
  },
)