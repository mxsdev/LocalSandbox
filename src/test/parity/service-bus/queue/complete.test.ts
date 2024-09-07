import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can complete single message from queue",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)
    await sender.sendMessages({
      body: "hello world!",
    })

    const receiver = createReceiver(queue.name!)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")
    expect(message!.sequenceNumber!.toNumber()).toBe(1)

    await receiver.completeMessage(message!)
  },
)
