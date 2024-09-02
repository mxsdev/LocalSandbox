import ms from "ms"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "Can schedule a message to a queue",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const schedule_at = new Date(Date.now() + 200)

    const msg = await sender.scheduleMessages(
      {
        body: "hello world!",
      },
      schedule_at,
    )

    await delay(ms("100ms"))

    await sender.cancelScheduledMessages(msg)

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 300,
    })
    expect(message).toBeFalsy()
  },
)
