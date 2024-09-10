import { fixturedTest } from "test/fixtured-test.js"
import { BrokerConstants } from "lib/broker/constants.js"

fixturedTest(
  "expires messages after max delivery count and sends to DLQ",
  async ({ azure_queue, expect }) => {
    const {
      createSender,
      createReceiver,
      createQueue,
      createTopic,
      createSubscription,
    } = azure_queue

    const dlq = await createQueue({})
    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {
      maxDeliveryCount: 2,
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    const sender = createSender(topic.name!)

    await sender.sendMessages({
      body: "hello world!",
    })

    {
      const receiver = createReceiver(topic.name!, subscription.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(0)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = createReceiver(topic.name!, subscription.name!)

      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
      expect(message!.deliveryCount).toBe(1)

      await receiver.abandonMessage(message!)
    }

    {
      const receiver = createReceiver(dlq.name!)

      const [message] = await receiver.receiveMessages(1)
      expect(message).toBeDefined()
      expect(message?.deadLetterReason).toBe(
        BrokerConstants.errors.maxDeliveryCountExceeded.reason,
      )
      expect(message?.deadLetterErrorDescription).toBe(
        BrokerConstants.errors.maxDeliveryCountExceeded.description,
      )
      expect(message?.deadLetterSource).toBe(
        `${topic.name!}/Subscriptions/${subscription.name!}`,
      )
    }
  },
)
