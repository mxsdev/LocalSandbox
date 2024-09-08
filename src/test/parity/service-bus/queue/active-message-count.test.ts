import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("gives accurate messageCount", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue, getQueue } = azure_queue

  const queue = await createQueue({})

  const sender = createSender(queue.name!)

  await sender.sendMessages({
    body: "hello world!",
  })

  await expect(getQueue(queue.name!)).resolves.toMatchObject({
    countDetails: {
      activeMessageCount: 1,
    },
  })

  const receiver = createReceiver(queue.name!)

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toBe("hello world!")

  await expect(getQueue(queue.name!)).resolves.toMatchObject({
    countDetails: {
      activeMessageCount: 1,
    },
  })

  await receiver.completeMessage(message!)

  await expect(getQueue(queue.name!)).resolves.toMatchObject({
    countDetails: {
      activeMessageCount: 0,
    },
  })
})
