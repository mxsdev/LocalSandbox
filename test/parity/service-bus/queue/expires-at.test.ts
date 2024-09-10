import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "message has accurate expires at time",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)
    const receiver = createReceiver(queue.name!)

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
