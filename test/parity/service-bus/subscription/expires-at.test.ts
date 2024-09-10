import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "message has accurate expires at time",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)
    const receiver = createReceiver(topic.name!, subscription.name!)

    const ttlMs = 100000

    await sender.sendMessages({
      body: "hello world!",
      timeToLive: ttlMs,
    })

    {
      const [message] = await receiver.receiveMessages(1)
      expect(message).toBeTruthy()

      expect(message?.expiresAtUtc).toStrictEqual(
        new Date(message!.enqueuedTimeUtc!.getTime() + ttlMs),
      )
    }
  },
)
