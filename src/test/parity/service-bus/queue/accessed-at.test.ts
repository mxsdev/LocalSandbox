import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "accessedAt is updated on receiver open",
  async ({ azure_queue, expect, expectCorrelatedTime }) => {
    const { createReceiver, createQueue, getQueue } = azure_queue

    const queue = await createQueue({})
    expect(queue.accessedAt?.getTime()).toBeLessThan(0)

    const receiver = createReceiver(queue.name!)

    const receiveDate = new Date()
    await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })

    const { createdAt } = await getQueue(queue.name!)

    expect(createdAt).toBeDefined()
    expectCorrelatedTime(createdAt!, receiveDate)
  },
)

fixturedTest(
  "accessedAt is updated on message sent",
  async ({ azure_queue, expect, expectCorrelatedTime }) => {
    const { createSender, createQueue, getQueue } = azure_queue

    const queue = await createQueue({})

    expect(queue.accessedAt?.getTime()).toBeLessThan(0)

    const sender = createSender(queue.name!)

    const sendDate = new Date()
    await sender.sendMessages({
      body: "hello world!",
    })

    const { createdAt } = await getQueue(queue.name!)

    expect(createdAt).toBeDefined()
    expectCorrelatedTime(createdAt!, sendDate)
  },
)
