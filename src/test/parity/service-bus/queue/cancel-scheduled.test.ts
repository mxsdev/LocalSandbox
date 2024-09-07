import ms from "ms"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can cancel a scheduled message from a queue",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)

    const schedule_at = new Date(Date.now() + 2500)

    const msg = await sender.scheduleMessages(
      {
        body: "hello world!",
      },
      schedule_at,
    )

    await sender.cancelScheduledMessages(msg)
    const receiver = createReceiver(queue.name!)

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })
    expect(message).toBeFalsy()
  },
)
