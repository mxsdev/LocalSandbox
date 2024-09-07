import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can complete single message from queue",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})
    const subscription1 = await createSubscription(topic.name!, {})
    const subscription2 = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)

    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const receiver = createReceiver(topic.name!, subscription1.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 1000,
      })

      expect(message!.body).toBe("hello world!")
      expect(message!.sequenceNumber!.toNumber()).toBe(1)

      await receiver.completeMessage(message!)
    }

    {
      const receiver = createReceiver(topic.name!, subscription2.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 1000,
      })

      expect(message!.body).toBe("hello world!")
      expect(message!.sequenceNumber!.toNumber()).toBe(1)

      await receiver.completeMessage(message!)
    }

    const subscription3 = await createSubscription(topic.name!, {})

    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const receiver = createReceiver(topic.name!, subscription3.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 1000,
      })

      expect(message!.body).toBe("hello world!")
      expect(message!.sequenceNumber!.toNumber()).toBe(1)

      await receiver.completeMessage(message!)
    }
  },
)
