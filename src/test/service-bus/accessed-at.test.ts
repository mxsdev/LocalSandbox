import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "accessedAt is updated on receiver open",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue, getQueue } = azure_queue

    const queue = await createQueue("queue", {})

    expect(queue.accessedAt).toBeUndefined()

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    const receiveDate = new Date()
    await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })

    const { createdAt } = await getQueue(queue.name!)

    expect(createdAt).toBeDefined()
    expect(Math.abs(createdAt!.getTime() - receiveDate.getTime())).toBeLessThan(
      10,
    )
  },
)

fixturedTest(
  "accessedAt is updated on message sent",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue, getQueue } = azure_queue

    const queue = await createQueue("queue", {})

    expect(queue.accessedAt).toBeUndefined()

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const sendDate = new Date()
    await sender.sendMessages({
      body: "hello world!",
      bodyType: "value",
    })

    const { createdAt } = await getQueue(queue.name!)

    expect(createdAt).toBeDefined()
    expect(Math.abs(createdAt!.getTime() - sendDate.getTime())).toBeLessThan(10)
  },
)
