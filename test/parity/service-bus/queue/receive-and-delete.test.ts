import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("receiveAndDelete mode", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)
  await sender.sendMessages({
    body: "hello world!",
  })

  {
    const receiver = createReceiver(queue.name!, {
      receiveMode: "receiveAndDelete",
    })

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")
  }

  {
    const receiver = createReceiver(queue.name!)

    const messages = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })
    expect(messages).toHaveLength(0)
  }
})
