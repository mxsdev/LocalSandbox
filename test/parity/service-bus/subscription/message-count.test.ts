import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("gives accurate messageCount", async ({ azure_queue, expect }) => {
  const {
    createSender,
    createReceiver,
    createTopic,
    createSubscription,
    getSubscription,
  } = azure_queue

  const topic = await createTopic({})
  const subscription = await createSubscription(topic.name!, {})

  const sender = createSender(topic.name!)

  await sender.sendMessages({
    body: "hello world!",
  })

  await expect(
    getSubscription(topic.name!, subscription.name!),
  ).resolves.toMatchObject({
    messageCount: 1,
  })

  const receiver = createReceiver(topic.name!, subscription.name!)

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toBe("hello world!")

  await expect(
    getSubscription(topic.name!, subscription.name!),
  ).resolves.toMatchObject({
    messageCount: 1,
  })

  await receiver.completeMessage(message!)

  await expect(
    getSubscription(topic.name!, subscription.name!),
  ).resolves.toMatchObject({
    messageCount: 0,
  })
})
