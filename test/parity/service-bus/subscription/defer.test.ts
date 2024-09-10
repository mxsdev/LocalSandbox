import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("can defer single message", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createTopic, createSubscription } =
    azure_queue

  const topic = await createTopic({})
  const subscription = await createSubscription(topic.name!, {})

  const sender = createSender(topic.name!)
  await sender.sendMessages({ body: "hello world!" })

  const receiver = createReceiver(topic.name!, subscription.name!)

  {
    const [message] = await receiver.receiveMessages(1)
    await receiver.deferMessage(message!)

    const [deferred_message] = await receiver.receiveDeferredMessages(
      message!.sequenceNumber!,
    )
    expect(deferred_message).toBeTruthy()
    expect(deferred_message).toMatchObject({ body: "hello world!" })
    expect(deferred_message?.state).toBe("deferred")
  }

  {
    const messages = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 1000,
    })
    expect(messages).toHaveLength(0)
  }
})
