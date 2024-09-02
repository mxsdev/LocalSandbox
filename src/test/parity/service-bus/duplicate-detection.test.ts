import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can deduplicate recent messages",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({
      requiresDuplicateDetection: true,
    })

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    const receiver = sb_client.createReceiver(queue.name!, {})
    onTestFinished(() => receiver.close())

    {
      const messages = await receiver.receiveMessages(2, {
        maxWaitTimeInMs: 0,
      })

      expect(messages).toHaveLength(1)
    }
  },
)

fixturedTest(
  "duplicate detection does not occur for messages outside of history window period",
  { timeout: 40000 },
  async ({ onTestFinished, azure_queue, expect, env }) => {
    const { sb_client, createQueue } = azure_queue

    const duplicateDetectionMs = env.TEST_AZURE_E2E ? 20000 : 200
    const queue = await createQueue({
      requiresDuplicateDetection: true,
      duplicateDetectionHistoryTimeWindow: Temporal.Duration.from({
        milliseconds: duplicateDetectionMs,
      }).toString(),
    })

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    await delay(duplicateDetectionMs * 1.5)

    await sender.sendMessages({
      body: "hello world!",
      messageId: "1234",
    })

    const receiver = sb_client.createReceiver(queue.name!, {})
    onTestFinished(() => receiver.close())

    {
      const messages = await receiver.receiveMessages(2, {
        maxWaitTimeInMs: 0,
      })

      expect(messages).toHaveLength(2)
    }
  },
)
