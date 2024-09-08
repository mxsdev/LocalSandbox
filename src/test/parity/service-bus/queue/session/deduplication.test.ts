import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "deduplication occurs across sessions",
  async ({ azure_queue, expect }) => {
    const { createSender, acceptSession, createQueue } = azure_queue

    const queue = await createQueue({
      requiresSession: true,
      requiresDuplicateDetection: true,
    })
    const sender = createSender(queue.name!)

    await sender.sendMessages({
      body: "1",
      sessionId: "session1",
      messageId: "id",
    })
    await sender.sendMessages({
      body: "2",
      sessionId: "session2",
      messageId: "id",
    })

    {
      const receiver = await acceptSession(queue.name!, "session1")
      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(1)
    }

    {
      const receiver = await acceptSession(queue.name!, "session2")
      const messages = await receiver.receiveMessages(1, { maxWaitTimeInMs: 0 })
      expect(messages).toHaveLength(0)
    }
  },
)
