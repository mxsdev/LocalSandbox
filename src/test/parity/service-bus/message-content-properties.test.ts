import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "content type",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: {
        message: "hello world!",
      },
      contentType: "application/json",
    })

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toStrictEqual({ message: "hello world!" })
    expect(message!.contentType).toBe("application/json")

    await receiver.completeMessage(message!)
  },
)

fixturedTest("subject", async ({ onTestFinished, azure_queue, expect }) => {
  const { sb_client, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = sb_client.createSender(queue.name!)
  onTestFinished(() => sender.close())

  await sender.sendMessages({
    body: {
      message: "hello world!",
    },
    subject: "Test Message",
  })

  const receiver = sb_client.createReceiver(queue.name!)
  onTestFinished(() => receiver.close())

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toStrictEqual({ message: "hello world!" })
  expect(message!.subject).toBe("Test Message")

  await receiver.completeMessage(message!)
})

fixturedTest(
  "correlation id",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: {
        message: "hello world!",
      },
      correlationId: "1234",
    })

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toStrictEqual({ message: "hello world!" })
    expect(message!.correlationId).toBe("1234")

    await receiver.completeMessage(message!)
  },
)

fixturedTest("message id", async ({ onTestFinished, azure_queue, expect }) => {
  const { sb_client, createQueue } = azure_queue

  const queue = await createQueue({})

  const sender = sb_client.createSender(queue.name!)
  onTestFinished(() => sender.close())

  await sender.sendMessages({
    body: {
      message: "hello world!",
    },
    messageId: "1234",
  })

  const receiver = sb_client.createReceiver(queue.name!)
  onTestFinished(() => receiver.close())

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toStrictEqual({ message: "hello world!" })
  expect(message!.messageId).toBe("1234")

  await receiver.completeMessage(message!)
})
