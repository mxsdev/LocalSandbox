import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"
import { BrokerConstants } from "../../../../lib/broker/constants.js"

fixturedTest(
  "dead letter expired messages with deadLetteringOnMessageExpiration",
  async ({ azure_queue, expect }) => {
    const {
      createSender,
      createReceiver,
      createQueue,
      createTopic,
      createSubscription,
      getTopic,
      getSubscription,
      getQueue,
    } = azure_queue

    const dlq = await createQueue({})

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {
      deadLetteringOnMessageExpiration: true,
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    const sender = createSender(topic.name!)

    const ttlMs = 200

    await sender.sendMessages({
      body: "hello world!",
      timeToLive: ttlMs,
    })

    await delay(ttlMs)

    {
      const receiver = createReceiver(topic.name!, subscription.name!)

      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    }

    {
      const receiver = createReceiver(dlq.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 5000,
      })
      expect(message?.deadLetterSource).toBe(
        `${topic.name}/Subscriptions/${subscription.name}`,
      )
      expect(message?.deadLetterReason).toBe(
        BrokerConstants.errors.messageExpired.reason,
      )
      expect(message?.deadLetterErrorDescription).toBe(
        BrokerConstants.errors.messageExpired.description,
      )
      expect(message).toBeTruthy()

      await expect(
        getSubscription(topic.name!, subscription.name!),
      ).resolves.toMatchObject({
        countDetails: {
          transferDeadLetterMessageCount: 0,
        },
      })
      await expect(getTopic(topic.name!)).resolves.toMatchObject({
        countDetails: {
          transferDeadLetterMessageCount: 0,
        },
      })
      await expect(getQueue(dlq.name!)).resolves.toMatchObject({
        countDetails: {
          transferDeadLetterMessageCount: 0,
        },
      })

      expect(message?.sequenceNumber?.toNumber()).toStrictEqual(1)
      expect(message?.enqueuedSequenceNumber).toStrictEqual(1)
    }
  },
)
