import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can complete single message from queue w/ session id",
  async ({ azure_queue, expect }) => {
    const { createSender, createQueue, acceptSession } = azure_queue

    const queue = await createQueue({ requiresSession: true })

    const sender = createSender(queue.name!)
    await sender.sendMessages({
      body: "hello world!",
      sessionId: "session",
    })
    await sender.sendMessages({
      body: "hello world!",
      sessionId: "session2",
    })

    const receiver = await acceptSession(queue.name!, "session2")

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")
    expect(message!.sessionId).toBe("session2")
    expect(message!.sequenceNumber!.toNumber()).toBe(2)

    await receiver.completeMessage(message!)
  },
)

fixturedTest(
  "cannot send non-session message to session queue",
  async ({ azure_queue, expect }) => {
    const { createSender, createQueue } = azure_queue

    const queue = await createQueue({ requiresSession: true })

    const sender = createSender(queue.name!)

    await expect(
      sender.sendMessages({
        body: "hello world!",
      }),
    ).rejects.toThrowError(
      "ServiceBusError: InvalidOperationError: The SessionId was not set on a message, and it cannot be sent to the entity. Entities that have session support enabled can only receive messages that have the SessionId set to a valid value.",
    )
  },
)
