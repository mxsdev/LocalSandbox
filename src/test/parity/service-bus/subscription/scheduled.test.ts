import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "Can schedule a message to a queue",
  async ({ azure_queue, expect, env }) => {
    const {
      createSender,
      createReceiver,
      createTopic,
      createSubscription,
      getTopic,
      getSubscription,
    } = azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)

    const scheduleMs = env.TEST_AZURE_E2E ? 5000 : 200

    const schedule_at = new Date(Date.now() + scheduleMs)

    await expect(getTopic(topic.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
    })
    await expect(
      getSubscription(topic.name!, subscription.name!),
    ).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
    })

    const [sequence_number] = await sender.scheduleMessages(
      {
        body: "hello world!",
      },
      schedule_at,
    )
    expect(sequence_number).toBeDefined()

    await expect(getTopic(topic.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 1,
      },
    })
    await expect(
      getSubscription(topic.name!, subscription.name!),
    ).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
    })

    const receiver = createReceiver(topic.name!, subscription.name!)

    {
      const messages = await receiver.peekMessages(1)
      expect(messages).toHaveLength(0)
    }

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")
    expect(message!.scheduledEnqueueTimeUtc).toStrictEqual(schedule_at)
    expect(message!.state).toBe("scheduled")
    expect(message!.sequenceNumber!.toNumber()).toStrictEqual(1)
    expect(message!.sequenceNumber!.toNumber()).toStrictEqual(
      sequence_number!.toNumber(),
    )
    expect(message!.enqueuedSequenceNumber).toStrictEqual(2)

    await expect(getTopic(topic.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
    })
    await expect(
      getSubscription(topic.name!, subscription.name!),
    ).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
      messageCount: 1,
    })

    await receiver.completeMessage(message!)

    await expect(getTopic(topic.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
    })
    await expect(
      getSubscription(topic.name!, subscription.name!),
    ).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
      messageCount: 0,
    })

    expect(Date.now() >= schedule_at.getTime()).toBe(true)
  },
)
