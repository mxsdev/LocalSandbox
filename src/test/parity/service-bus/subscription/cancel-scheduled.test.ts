import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can cancel a scheduled message from a queue",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createTopic, createSubscription } =
      azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {})

    const sender = createSender(topic.name!)

    const schedule_at = new Date(Date.now() + 2500)

    const msg = await sender.scheduleMessages(
      {
        body: "hello world!",
      },
      schedule_at,
    )

    await sender.cancelScheduledMessages(msg)
    const receiver = createReceiver(topic.name!, subscription.name!)

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 1000,
    })
    expect(message).toBeFalsy()
  },
)
