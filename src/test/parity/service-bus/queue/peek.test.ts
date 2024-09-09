import { fixturedTest } from "test/fixtured-test.js"

fixturedTest.only("can peek message", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)
  const receiver = createReceiver(queue.name!)

  {
    const [message] = await receiver.peekMessages(1)
    expect(message).toBeFalsy()
  }

  await sender.sendMessages({
    body: "hello world!",
  })

  {
    const [message] = await receiver.peekMessages(1)
    expect(message).toBeTruthy()
  }
})

fixturedTest("can peek multiple messages", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)
  const receiver = createReceiver(queue.name!)

  {
    const [message] = await receiver.peekMessages(2)
    expect(message).toBeFalsy()
  }

  await sender.sendMessages({
    body: "hello world!",
  })

  await sender.sendMessages({
    body: "hello world2!",
  })

  await sender.sendMessages({
    body: "hello world3!",
  })

  {
    const [message1, message2] = await receiver.peekMessages(2)
    expect(message1!.body).toBe("hello world!")
    expect(message1!.enqueuedTimeUtc).toBeTruthy()
    expect(message2!.body).toBe("hello world2!")
  }
})

fixturedTest.todo("can peek scheduled messages")
