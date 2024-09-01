import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can peek message",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    {
      const [message] = await receiver.peekMessages(1)
      expect(message).toBeFalsy()
    }

    await sender.sendMessages({
      body: "hello world!",
      bodyType: "value",
    })

    {
      const [message] = await receiver.peekMessages(1)
      expect(message).toBeTruthy()
    }
  },
)

fixturedTest(
  "can peek multiple messages",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    {
      const [message] = await receiver.peekMessages(2)
      expect(message).toBeFalsy()
    }

    await sender.sendMessages({
      body: "hello world!",
      bodyType: "value",
    })

    await sender.sendMessages({
      body: "hello world2!",
      bodyType: "value",
    })

    await sender.sendMessages({
      body: "hello world3!",
      bodyType: "value",
    })

    {
      const [message1, message2] = await receiver.peekMessages(2)
      expect(message1!.body).toBe("hello world!")
      expect(message2!.body).toBe("hello world2!")
    }
  },
)