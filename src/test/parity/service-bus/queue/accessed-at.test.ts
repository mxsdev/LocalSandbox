import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "accessedAt is updated on receiver open",
  async ({ azure_queue, expect }) => {
    const { createReceiver, createQueue, getQueue } = azure_queue

    const queue = await createQueue({})
    expect(queue.accessedAt?.getTime()).toBeLessThan(0)

    const receiver = createReceiver(queue.name!)

    const receiveDate = new Date()
    await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })

    const { accessedAt } = await getQueue(queue.name!)

    expect(accessedAt).toBeDefined()

    expect(accessedAt!.getTime()).toBeGreaterThan(receiveDate.getTime())
    expect(accessedAt!.getTime()).toBeGreaterThan(queue.accessedAt!.getTime())
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

    const { accessedAt } = await getQueue(queue.name!)

    expect(accessedAt).toBeDefined()

    expect(accessedAt!.getTime()).toBeGreaterThan(sendDate.getTime())
    expect(accessedAt!.getTime()).toBeGreaterThan(queue.accessedAt!.getTime())
  },
)
