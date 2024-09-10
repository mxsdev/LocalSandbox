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
        id: `${topic.id}/subscriptions/${req.routeParams.subscriptionName}`,
        location: topic.location,
        // sb_namespace_id: namespace.id,
        sb_topic_id: topic.id,
        name: req.routeParams.subscriptionName,
        type: "Microsoft.ServiceBus/namespaces/topics/subscriptions",
        properties: {
          ...parameters.properties,
          // TODO: automate this
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          accessedAt: new Date().toISOString(),
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
        defaultMessageTimeToLive:
          subscription.properties.defaultMessageTimeToLive ??
          "P10675199DT2H48M5.4775807S",

        messageCount,
        countDetails: messageCountDetails,

        // TODO: support this
        deadLetteringOnFilterEvaluationExceptions: false,

        enableBatchedOperations: true,

        // TODO: support this
        isClientAffine: false,
      },
    })
  },
)
