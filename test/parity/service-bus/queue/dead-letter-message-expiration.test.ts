import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"
import { BrokerConstants } from "lib/broker/constants.js"

fixturedTest(
  "dead letter expired messages with deadLetteringOnMessageExpiration",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue, getQueue } = azure_queue

    const dlq = await createQueue({})

    const queue = await createQueue({
      deadLetteringOnMessageExpiration: true,
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    const sender = createSender(queue.name!)

    const ttlMs = 200

    await sender.sendMessages({
      body: "hello world!",
      timeToLive: ttlMs,
    })

    await delay(ttlMs)

    {
      const receiver = createReceiver(queue.name!)

      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    }

    {
      const receiver = createReceiver(dlq.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 5000,
      })
      expect(message?.deadLetterSource).toBe(queue.name)
      expect(message?.deadLetterReason).toBe(
        BrokerConstants.errors.messageExpired.reason,
      )
      expect(message?.deadLetterErrorDescription).toBe(
        BrokerConstants.errors.messageExpired.description,
      )
      expect(message).toBeTruthy()

      await expect(getQueue(queue.name!)).resolves.toMatchObject({
        countDetails: {
          transferDeadLetterMessageCount: 0,
        },
      })
      expect(message?.sequenceNumber).toBeDefined()
      expect(message?.enqueuedSequenceNumber).toBeUndefined()
    }
  },
)
