import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can complete single message from queue w/ session id",
  async ({ azure_queue, expect }) => {
    const { createSender, createTopic, createSubscription, acceptSession } =
      azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {
      requiresSession: true,
    })

    const sender = createSender(topic.name!)
    await sender.sendMessages({
      body: "hello world!",
      sessionId: "session",
    })
    await sender.sendMessages({
      body: "hello world!",
      sessionId: "session2",
    })

    const receiver = await acceptSession(
      topic.name!,
      subscription.name!,
      "session2",
    )

    const [message] = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
    expect(message!.body).toBe("hello world!")
    expect(message!.sessionId).toBe("session2")
    expect(message!.sequenceNumber!.toNumber()).toBe(2)

    await receiver.completeMessage(message!)
  },
)
