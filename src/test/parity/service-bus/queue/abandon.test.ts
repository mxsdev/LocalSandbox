import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can abandon single message from queue",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({ maxDeliveryCount: 1 })

    const sender = createSender(queue.name!)

    await sender.sendMessages({
      body: "hello world!",
    })

    const receiver = createReceiver(queue.name!, {})

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
