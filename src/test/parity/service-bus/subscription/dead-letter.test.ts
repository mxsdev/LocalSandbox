import Long from "long"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can manually dead letter message",
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
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    const sender = createSender(topic.name!)

    await sender.sendMessages({ body: "hello world!" })
    await sender.sendMessages({ body: "hello world!" })

    const receiver = createReceiver(topic.name!, subscription.name!)

    const [, message] = await receiver.receiveMessages(2)
    expect(message!.body).toBe("hello world!")
    expect(message?.sequenceNumber).toBeDefined()

    await receiver.deadLetterMessage(message!, {
      deadLetterReason: "dead letter reason",
      deadLetterErrorDescription: "dead letter error description",
    })

    const receiver_dlq = createReceiver(dlq.name!)

    const [dead_lettered_message] = await receiver_dlq.receiveMessages(1)
    expect(dead_lettered_message!.body).toBe("hello world!")

    await receiver_dlq.completeMessage(dead_lettered_message!)

    expect(dead_lettered_message?.deadLetterSource).toBe(
      `${topic.name}/Subscriptions/${subscription.name}`,
    )
    expect(dead_lettered_message?.deadLetterReason).toBe("dead letter reason")
    expect(dead_lettered_message?.deadLetterErrorDescription).toBe(
      "dead letter error description",
    )

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

    expect(dead_lettered_message?.sequenceNumber).toBeDefined()
    expect(dead_lettered_message?.enqueuedSequenceNumber).toBe(
      message?.sequenceNumber?.toNumber(),
    )
    expect(dead_lettered_message?.sequenceNumber).toEqual(new Long(1))

    // TODO: ensure dead letter options are present
  },
)

fixturedTest.todo("fails properly when trying to dead letter to same queue")
fixturedTest.todo("cannot dead-letter when dlq is not set")
fixturedTest.todo("dead-letters automatically once max attempts are reached")
