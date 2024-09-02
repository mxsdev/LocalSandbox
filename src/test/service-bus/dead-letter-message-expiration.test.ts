import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "dead letter expired messages with deadLetteringOnMessageExpiration",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const dlq = await createQueue({})

    const queue = await createQueue({
      deadLetteringOnMessageExpiration: true,
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const ttlMs = 200

    await sender.sendMessages({
      body: "hello world!",
      timeToLive: ttlMs,
    })

    await delay(ttlMs)

    {
      const receiver = sb_client.createReceiver(queue.name!)
      onTestFinished(() => receiver.close())

      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    }

    {
      const receiver = sb_client.createReceiver(dlq.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message).toBeTruthy()
    }
  },
)
