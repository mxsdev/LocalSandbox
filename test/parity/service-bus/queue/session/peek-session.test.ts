import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "deduplication occurs across sessions",
  async ({ azure_queue, expect }) => {
    const { createSender, acceptSession, createQueue } = azure_queue

    const queue = await createQueue({ requiresSession: true })
    const sender = createSender(queue.name!)

    await sender.sendMessages({ body: "1", sessionId: "session1" })
    await sender.sendMessages({ body: "2", sessionId: "session2" })

    {
      const receiver = await acceptSession(queue.name!, "session1")
      const messages = await receiver.peekMessages(2)
      expect(messages).toHaveLength(1)
    }
  },
)
