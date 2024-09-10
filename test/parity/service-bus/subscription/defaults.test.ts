import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "topic has populated defaults",
  async ({ azure_queue, expect }) => {
    const { createTopic, getTopic, location } = azure_queue

    const { name } = await createTopic({})

    const topic = await getTopic(name!)

    expect(topic.createdAt).toBeDefined()
    expect(topic.updatedAt).toBeDefined()

    expect(topic).toMatchObject({
      name,
      type: "Microsoft.ServiceBus/namespaces/topics",
      location,
      sizeInBytes: 0,
      accessedAt: new Date("0001-01-01T00:00:00.000Z"),
      subscriptionCount: 0,
      countDetails: {
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        scheduledMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
      },
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      maxSizeInMegabytes: 1024,
      maxMessageSizeInKilobytes: 256,
      requiresDuplicateDetection: false,
      duplicateDetectionHistoryTimeWindow: "PT10M",
      enableBatchedOperations: true,
      status: "Active",
      supportOrdering: true,
      enablePartitioning: false,
      enableExpress: false,
    })
  },
)

fixturedTest(
  "subscription has populated defaults",
  async ({ azure_queue, expect }) => {
    const { createTopic, createSubscription, getSubscription, location } =
      azure_queue

    const { name: topic_name } = await createTopic({})
    const { name } = await createSubscription(topic_name!, {})
    const subscription = await getSubscription(topic_name!, name!)

    expect(subscription.createdAt).toBeDefined()
    expect(subscription.updatedAt).toBeDefined()
    expect(subscription.accessedAt).toBeDefined()

    expect(subscription).toMatchObject({
      name,
      type: "Microsoft.ServiceBus/namespaces/topics/subscriptions",
      location,
      messageCount: 0,
      countDetails: {
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        scheduledMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
      },
      lockDuration: "PT1M",
      requiresSession: false,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      // TODO: re-enable once this is supported
      //   deadLetteringOnFilterEvaluationExceptions: true,
      deadLetteringOnMessageExpiration: false,
      maxDeliveryCount: 10,
      status: "Active",
      enableBatchedOperations: true,
      isClientAffine: false,
    })
  },
)
