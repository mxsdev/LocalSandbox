import { fixturedTest } from "test/fixtured-test.js"
import { BrokerConstants } from "../../../../lib/broker/constants.js"

fixturedTest(
  "expires messages after max delivery count and sends to DLQ",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const dlq = await createQueue({})
    const queue = await createQueue({
      maxDeliveryCount: 2,
      forwardDeadLetteredMessagesTo: dlq.name!,
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
      expect(message!.deliveryCount).toBe(0)

      await receiver.abandonMessage(message!)
    }

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
      const receiver = sb_client.createReceiver(dlq.name!)
      onTestFinished(() => receiver.close())

      const [message] = await receiver.receiveMessages(1)
      expect(message).toBeDefined()
      expect(message?.deadLetterReason).toBe(
        BrokerConstants.errors.maxDeliveryCountExceeded.reason,
      )
      expect(message?.deadLetterErrorDescription).toBe(
        BrokerConstants.errors.maxDeliveryCountExceeded.description,
      )
      expect(message?.deadLetterSource).toBe(queue.name!)
    }
  },
)
