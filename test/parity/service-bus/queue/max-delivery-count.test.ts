import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "expires messages after max delivery count",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({
      maxDeliveryCount: 2,
    })

    const sender = createSender(queue.name!)

    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const receiver = createReceiver(queue.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(0)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = createReceiver(queue.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(1)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = createReceiver(queue.name!)

      const messages = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(messages).toHaveLength(0)
    }
  },
)
