import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("content type", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)

  await sender.sendMessages({
    body: {
      message: "hello world!",
    },
    contentType: "application/json",
  })

  const receiver = createReceiver(queue.name!)

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toStrictEqual({ message: "hello world!" })
  expect(message!.contentType).toBe("application/json")

  await receiver.completeMessage(message!)
})

fixturedTest("subject", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)

  await sender.sendMessages({
    body: {
      message: "hello world!",
    },
    subject: "Test Message",
  })

  const receiver = createReceiver(queue.name!)

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toStrictEqual({ message: "hello world!" })
  expect(message!.subject).toBe("Test Message")

  await receiver.completeMessage(message!)
})

fixturedTest("correlation id", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)

  await sender.sendMessages({
    body: {
      message: "hello world!",
    },
    correlationId: "1234",
  })

  const receiver = createReceiver(queue.name!)

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toStrictEqual({ message: "hello world!" })
  expect(message!.correlationId).toBe("1234")

  await receiver.completeMessage(message!)
})

fixturedTest("message id", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)

  await sender.sendMessages({
    body: {
      message: "hello world!",
    },
    messageId: "1234",
  })

  const receiver = createReceiver(queue.name!)

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toStrictEqual({ message: "hello world!" })
  expect(message!.messageId).toBe("1234")

  await receiver.completeMessage(message!)
})
