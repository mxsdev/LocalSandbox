import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"
import { describe } from "vitest"

describe("ttl", () => {
  fixturedTest(
    "message ttl is respected",
    async ({ onTestFinished, azure_queue, expect }) => {
      const { sb_client, createQueue } = azure_queue

      const queue = await createQueue("queue", {})

      const sender = sb_client.createSender(queue.name!)
      onTestFinished(() => sender.close())

      const ttlMs = 200

      await sender.sendMessages({
        body: "hello world!",
        timeToLive: ttlMs,
      })

      await delay(ttlMs)

      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    },
  )

  fixturedTest(
    "message default ttl is respected",
    async ({ onTestFinished, azure_queue, expect }) => {
      const { sb_client, createQueue } = azure_queue

      const ttlMs = 200

      const queue = await createQueue("queue", {
        defaultMessageTimeToLive: Temporal.Duration.from({
          milliseconds: ttlMs,
        }).toString(),
      })

      const sender = sb_client.createSender(queue.name!)
      onTestFinished(() => sender.close())

      await sender.sendMessages({
        body: "hello world!",
      })

      await delay(ttlMs)

      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    },
  )
})