import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can receive concurrently from multiple queues without race conditions",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({})
    const queue2 = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const sender2 = sb_client.createSender(queue2.name!)
    onTestFinished(() => sender.close())

    await Promise.all([
      sender.sendMessages({
        body: "hello world!",
      }),
      sender2.sendMessages({
        body: "hello world2!",
      }),
    ])

    {
      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world!")

      await receiver.completeMessage(message!)
    }

    {
      const receiver = sb_client.createReceiver(queue2.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world2!")

      await receiver.completeMessage(message!)
    }
  },
)
