import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "cannot consume messages while last message is locked",
  async ({ azure_queue, expect }) => {
    const { createSender, acceptSession, createQueue } = azure_queue

    const queue = await createQueue({ requiresSession: true })
    const sender = createSender(queue.name!)
    const sessionId = "session"

    await sender.sendMessages({ body: "1", sessionId })
    await sender.sendMessages({ body: "2", sessionId })

    const receiver = await acceptSession(queue.name!, sessionId)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("1")
    expect(message!.sessionId).toBe(sessionId)
    expect(message!.sequenceNumber!.toNumber()).toBe(1)

    await expect(acceptSession(queue.name!, sessionId)).rejects.toThrowError(
      "The requested session 'session' cannot be accepted. It may be locked by another receiver.",
    )

    await expect(acceptSession(queue.name!, sessionId)).rejects.toThrowError(
      "The requested session 'session' cannot be accepted. It may be locked by another receiver.",
    )

    await receiver.close()

    {
      const receiver = await acceptSession(queue.name!, sessionId)

      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("2")
      expect(message!.sessionId).toBe(sessionId)
      expect(message!.sequenceNumber!.toNumber()).toBe(2)

      await receiver.completeMessage(message!)
    }
  },
)
