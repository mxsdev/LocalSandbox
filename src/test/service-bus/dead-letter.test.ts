import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can manually dead letter message",
  async ({ azure_queue, onTestFinished, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const dlq = await createQueue("dlq", {})
    const queue = await createQueue("queue", {
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
      bodyType: "value",
    })

    {
      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world!")

      await receiver.deadLetterMessage(message!, {
        deadLetterReason: "dead letter reason",
        deadLetterErrorDescription: "dead letter error description",
      })
    }

    {
      const receiver = sb_client.createReceiver(dlq.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world!")

      await receiver.completeMessage(message!)

      expect(message?.deadLetterSource).toBe(dlq.name!)
      expect(message?.deadLetterReason).toBe("dead letter reason")
      expect(message?.deadLetterErrorDescription).toBe(
        "dead letter error description",
      )

      // TODO: ensure dead letter options are present
    }
  },
)

fixturedTest.todo("fails properly when trying to dead letter to same queue")
fixturedTest.todo("cannot dead-letter when dlq is not set")
fixturedTest.todo("dead-letters automatically once max attempts are reached")
