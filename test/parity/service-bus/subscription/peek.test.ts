import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "cannot peek messages on a topic",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})

    const sender = createSender(topic.name!)
    const receiver = createReceiver(topic.name!)

    await sender.sendMessages({
      body: "hello world!",
    })

    await expect(receiver.peekMessages(1)).resolves.toStrictEqual([])
  },
)

fixturedTest(
  "can peek message",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})
    const subscription1 = await createSubscription(topic.name!, {})
    const subscription2 = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)
    const receiver1 = createReceiver(topic.name!, subscription1.name!)
    const receiver2 = createReceiver(topic.name!, subscription2.name!)

    {
      const [message] = await receiver1.peekMessages(1)
      expect(message).toBeFalsy()
    }

    {
      const [message] = await receiver2.peekMessages(1)
      expect(message).toBeFalsy()
    }

    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const [message] = await receiver1.peekMessages(1)
      expect(message).toBeTruthy()
    }

    {
      const [message] = await receiver2.peekMessages(1)
      expect(message).toBeTruthy()
    }
  },
)

fixturedTest(
  "can peek multiple messages",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})
    const subscription1 = await createSubscription(topic.name!, {})
    const subscription2 = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)
    const receiver1 = createReceiver(topic.name!, subscription1.name!)
    const receiver2 = createReceiver(topic.name!, subscription2.name!)

    {
      const [message] = await receiver1.peekMessages(2)
      expect(message).toBeFalsy()
    }

    {
      const [message] = await receiver2.peekMessages(2)
      expect(message).toBeFalsy()
    }

    await sender.sendMessages({
      body: "hello world!",
    })

    await sender.sendMessages({
      body: "hello world2!",
    })

    await sender.sendMessages({
      body: "hello world3!",
    })

    {
      const [message1, message2] = await receiver1.peekMessages(2)
      expect(message1!.body).toBe("hello world!")
      expect(message1!.enqueuedTimeUtc).toBeTruthy()
      expect(message2!.body).toBe("hello world2!")
    }

    {
      const [message1, message2] = await receiver2.peekMessages(2)
      expect(message1!.body).toBe("hello world!")
      expect(message1!.enqueuedTimeUtc).toBeTruthy()
      expect(message2!.body).toBe("hello world2!")
    }
  },
)

fixturedTest.todo("can peek scheduled messages")
