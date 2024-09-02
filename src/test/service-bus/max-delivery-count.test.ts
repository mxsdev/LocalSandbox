import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "expires messages after max delivery count",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({
      maxDeliveryCount: 2,
    })

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(1)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(2)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const messages = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(messages).toHaveLength(0)
    }
  },
)
