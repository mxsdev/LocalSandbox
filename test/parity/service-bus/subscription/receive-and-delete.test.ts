import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("receiveAndDelete mode", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createTopic, createSubscription } =
    azure_queue

  const topic = await createTopic({})
  const subscription = await createSubscription(topic.name!, {})

  const sender = createSender(topic.name!)
  await sender.sendMessages({
    body: "hello world!",
  })

  {
    const receiver = createReceiver(topic.name!, subscription.name!, {
      receiveMode: "receiveAndDelete",
    })

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")
  }

  {
    const receiver = createReceiver(topic.name!, subscription.name!)

    const messages = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 0,
    })
    expect(messages).toHaveLength(0)
  }
})
