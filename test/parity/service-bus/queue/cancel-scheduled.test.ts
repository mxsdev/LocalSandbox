import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can cancel a scheduled message from a topic",
  {
    timeout: 60000,
  },
  async ({ azure_queue, env, expect }) => {
    const { createSender, createReceiver, createQueue, getQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)

    const schedule_in_ms = env.TEST_AZURE_E2E ? 20000 : 500
    const schedule_at = new Date(Date.now() + schedule_in_ms)

    const msg = await sender.scheduleMessages(
      {
        body: "hello world!",
      },
      schedule_at,
    )

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 1,
      },
    })

    await sender.cancelScheduledMessages(msg)
    const receiver = createReceiver(queue.name!)

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
    })

    {
      const [message] = await receiver.peekMessages(1)
      expect(message).not.toBeDefined()
    }

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: schedule_in_ms * 1.2,
    })
    expect(message).toBeFalsy()

    expect(Date.now() >= schedule_at.getTime()).toBe(true)
  },
)
