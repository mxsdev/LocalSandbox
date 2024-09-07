import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"
import { describe } from "vitest"

describe("ttl", () => {
  fixturedTest(
    "message ttl is respected",
    async ({ azure_queue, expect, env }) => {
      const { createSender, createReceiver, createQueue } = azure_queue

      const queue = await createQueue({})

      const sender = createSender(queue.name!)

      const ttlMs = env.TEST_AZURE_E2E ? 5000 : 200

      await sender.sendMessages({
        body: "hello world!",
        timeToLive: ttlMs,
      })

      await delay(ttlMs)

      const receiver = createReceiver(queue.name!)

      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    },
  )

  fixturedTest(
    "message default ttl is respected",
    async ({ azure_queue, expect, env }) => {
      const { createSender, createReceiver, createQueue } = azure_queue

      const ttlMs = env.TEST_AZURE_E2E ? 5000 : 200

      const queue = await createQueue({
        defaultMessageTimeToLive: Temporal.Duration.from({
          milliseconds: ttlMs,
        }).toString(),
      })

      const sender = createSender(queue.name!)

      await sender.sendMessages({
        body: "hello world!",
      })

      await delay(ttlMs)

      const receiver = createReceiver(queue.name!)

      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    },
  )
})
