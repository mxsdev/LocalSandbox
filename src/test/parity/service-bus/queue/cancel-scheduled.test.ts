import ms from "ms"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can cancel a scheduled message from a queue",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const schedule_at = new Date(Date.now() + 2500)

    const msg = await sender.scheduleMessages(
      {
        body: "hello world!",
      },
      schedule_at,
    )

    await sender.cancelScheduledMessages(msg)

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })
    expect(message).toBeFalsy()
  },
)
