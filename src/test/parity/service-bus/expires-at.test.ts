import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "message has accurate expires at time",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

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
