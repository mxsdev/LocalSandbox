import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can defer single message",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
    })

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    {
      const [message] = await receiver.receiveMessages(1)
      await receiver.deferMessage(message!)

      const [deferred_message] = await receiver.receiveDeferredMessages(
        message!.sequenceNumber!,
      )
      expect(deferred_message).toBeTruthy()
      expect(deferred_message).toMatchObject({ body: "hello world!" })
      expect(deferred_message?.state).toBe("deferred")
    }

    {
      const messages = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(messages).toHaveLength(0)
    }
  },
)
