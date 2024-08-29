import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "Can schedule a message to a queue",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const schedule_at = new Date(Date.now() + 200)

    await sender.scheduleMessages(
      {
        body: "hello world!",
        bodyType: "value",
      },
      schedule_at,
    )

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")

    await receiver.completeMessage(message!)

    expect(Date.now() >= schedule_at.getTime()).toBe(true)
  },
)
