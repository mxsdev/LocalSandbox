import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can abandon single message from queue",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {
      maxDeliveryCount: 1,
    })

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
      bodyType: "value",
    })

    const receiver = sb_client.createReceiver(queue.name!, {})
    onTestFinished(() => receiver.close())

    {
      const [message] = await receiver.receiveMessages(1)

      expect(message!.body).toBe("hello world!")
      await receiver.abandonMessage(message!)
    }

    {
      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })

      expect(message).toBeUndefined()
    }
  },
)
