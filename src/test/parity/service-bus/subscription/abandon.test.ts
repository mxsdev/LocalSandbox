import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can abandon single message from queue",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {
      maxDeliveryCount: 1,
    })

    const sender = createSender(topic.name!)
    await sender.sendMessages({ body: "hello world!" })

    const receiver = createReceiver(topic.name!, subscription.name!)

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
