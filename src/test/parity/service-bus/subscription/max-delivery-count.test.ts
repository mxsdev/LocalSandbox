import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "expires messages after max delivery count",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createSubscription, createTopic } =
      azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {
      maxDeliveryCount: 2,
    })

    const sender = createSender(topic.name!)
    await sender.sendMessages({ body: "hello world!" })

    {
      const receiver = createReceiver(topic.name!, subscription.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(0)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = createReceiver(topic.name!, subscription.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(1)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = createReceiver(topic.name!, subscription.name!)

      const messages = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(messages).toHaveLength(0)
    }
  },
)
