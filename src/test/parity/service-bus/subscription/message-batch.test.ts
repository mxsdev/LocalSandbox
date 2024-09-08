import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "receives message batch in proper order",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)

    const batch = await sender.createMessageBatch({ maxSizeInBytes: 1024 })
    batch.tryAddMessage({ body: "hello world!" })
    batch.tryAddMessage({ body: "hello world2!" })

    await sender.sendMessages(batch)

    const receiver = createReceiver(topic.name!, subscription.name!)

    {
      const [message1, message2] = await receiver.receiveMessages(2)

      expect(message1!.body).toBe("hello world!")
      expect(message2!.body).toBe("hello world2!")

      await receiver.completeMessage(message1!)
      await receiver.completeMessage(message2!)
    }
  },
)
