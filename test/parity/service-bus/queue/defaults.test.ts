import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "queue has populated defaults",
  async ({ azure_queue, expect }) => {
    const { createQueue, getQueue, location } = azure_queue

    const { name } = await createQueue({})

    const queue = await getQueue(name!)

    expect(queue.createdAt).toBeDefined()
    expect(queue.updatedAt).toBeDefined()

    expect(queue).toMatchObject({
      name,
      type: "Microsoft.ServiceBus/namespaces/queues",
      location,
      countDetails: {
        activeMessageCount: 0,
        deadLetterMessageCount: 0,
        scheduledMessageCount: 0,
        transferMessageCount: 0,
        transferDeadLetterMessageCount: 0,
      },
      accessedAt: new Date("0001-01-01T07:52:58.000Z"),
      sizeInBytes: 0,
      messageCount: 0,
      lockDuration: "PT1M",
      maxSizeInMegabytes: 1024,
      maxMessageSizeInKilobytes: 256,
      requiresDuplicateDetection: false,
      requiresSession: false,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      deadLetteringOnMessageExpiration: false,
      duplicateDetectionHistoryTimeWindow: "PT10M",
      maxDeliveryCount: 10,
      status: "Active",
      enableBatchedOperations: true,
      enablePartitioning: false,
      enableExpress: false,
    })
  },
)
