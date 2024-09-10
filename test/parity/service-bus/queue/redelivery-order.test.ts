import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "redelivery order is based on sequence number",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)

    await sender.sendMessages({ body: "1" })
    await sender.sendMessages({ body: "2" })

    {
      const receiver = createReceiver(queue.name!)

      const [message] = await receiver.receiveMessages(1)

      const receiver2 = createReceiver(queue.name!)

      const [message2] = await receiver2.receiveMessages(1)
      expect(message2!.body).toBe("2")

      await receiver.abandonMessage(message!)
      await receiver2.abandonMessage(message2!)
    }

    {
      const receiver = createReceiver(queue.name!, {})

      const [message1, message2] = await receiver.receiveMessages(2, {
        maxWaitTimeInMs: 0,
      })

      expect(message1!.body).toBe("1")
      expect(message2!.body).toBe("2")
    }
  },
)
