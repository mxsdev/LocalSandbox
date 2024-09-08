import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"
import { describe } from "vitest"

fixturedTest(
  "message ttl is respected",
  async ({ azure_queue, expect, env }) => {
    const { createSender, createReceiver, createSubscription, createTopic } =
      azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)

    const ttlMs = env.TEST_AZURE_E2E ? 5000 : 200

    await sender.sendMessages({
      body: "hello world!",
      timeToLive: ttlMs,
    })

    await delay(ttlMs)

    const receiver = createReceiver(topic.name!, subscription.name!)

    const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
    expect(messages).toHaveLength(0)
  },
)

fixturedTest(
  "message default ttl is respected in topic",
  async ({ azure_queue, expect, env }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const ttlMs = env.TEST_AZURE_E2E ? 5000 : 200

    const topic = await createTopic({
      defaultMessageTimeToLive: Temporal.Duration.from({
        milliseconds: ttlMs,
      }).toString(),
    })
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)
    await sender.sendMessages({ body: "hello world!" })

    await delay(ttlMs)

    const receiver = createReceiver(topic.name!, subscription.name!)

    const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
    expect(messages).toHaveLength(0)
  },
)

fixturedTest(
  "message default ttl is respected in subscription",
  async ({ azure_queue, expect, env }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const ttlMs = env.TEST_AZURE_E2E ? 5000 : 200

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {
      defaultMessageTimeToLive: Temporal.Duration.from({
        milliseconds: ttlMs,
      }).toString(),
    })

    const sender = createSender(topic.name!)
    await sender.sendMessages({ body: "hello world!" })

    await delay(ttlMs)

    const receiver = createReceiver(topic.name!, subscription.name!)

    const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
    expect(messages).toHaveLength(0)
  },
)
