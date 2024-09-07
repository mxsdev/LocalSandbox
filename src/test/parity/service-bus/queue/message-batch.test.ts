import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "receives message batch in proper order",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const batch = await sender.createMessageBatch({
      maxSizeInBytes: 1024,
    })
    batch.tryAddMessage({
      body: "hello world!",
    })
    batch.tryAddMessage({
      body: "hello world2!",
    })

    await sender.sendMessages(batch)

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    {
      const [message1, message2] = await receiver.receiveMessages(2)

      expect(message1!.body).toBe("hello world!")
      expect(message2!.body).toBe("hello world2!")

      await receiver.completeMessage(message1!)
      await receiver.completeMessage(message2!)
    }
  },
)
