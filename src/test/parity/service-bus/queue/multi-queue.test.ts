import Long from "long"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can receive concurrently from multiple queues without race conditions",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})
    const queue2 = await createQueue({})

    const sender = createSender(queue.name!)

    const sender2 = createSender(queue2.name!)

    await Promise.all([
      sender.sendMessages({
        body: "hello world!",
      }),
      sender2.sendMessages({
        body: "hello world2!",
      }),
    ])

    {
      const receiver = createReceiver(queue.name!)

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world!")
      expect(message!.sequenceNumber).toEqual(new Long(1))

      await receiver.completeMessage(message!)
    }

    {
      const receiver = createReceiver(queue2.name!)

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world2!")
      expect(message!.sequenceNumber).toEqual(new Long(1))

      await receiver.completeMessage(message!)
    }
  },
)
