import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "receiveAndDelete mode",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const receiver = sb_client.createReceiver(queue.name!, {
        receiveMode: "receiveAndDelete",
      })
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world!")
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
