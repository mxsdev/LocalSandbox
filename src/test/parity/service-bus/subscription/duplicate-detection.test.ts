import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can deduplicate recent messages at topic level",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({ requiresDuplicateDetection: true })
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    const receiver = createReceiver(topic.name!, subscription.name!)

    {
      const messages = await receiver.receiveMessages(2, {
        maxWaitTimeInMs: 0,
      })

      expect(messages).toHaveLength(1)
    }
  },
)

fixturedTest.todo("deduplication occurs independently in each subscription")

fixturedTest(
  "duplicate detection does not occur for messages outside of history window period",
  { timeout: 40000 },
  async ({ azure_queue, expect, env }) => {
    const { createSender, createReceiver, createSubscription, createTopic } =
      azure_queue

    const duplicateDetectionMs = env.TEST_AZURE_E2E ? 20000 : 200
    const topic = await createTopic({
      requiresDuplicateDetection: true,
      duplicateDetectionHistoryTimeWindow: Temporal.Duration.from({
        milliseconds: duplicateDetectionMs,
      }).toString(),
    })
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    await delay(duplicateDetectionMs * 1.5)

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    const receiver = createReceiver(topic.name!, subscription.name!, {})

    {
      const messages = await receiver.receiveMessages(2, {
        maxWaitTimeInMs: 0,
      })

      expect(messages).toHaveLength(2)
    }
  },
)
