import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can parse and receive large message batch without delays",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const queue = await createQueue({})

    const sender = createSender(queue.name!)

    const batch = await sender.createMessageBatch({
      maxSizeInBytes: 256_000,
    })

    const num_messages = 1000

    for (let i = 0; i < num_messages; i++) {
      expect(batch.tryAddMessage({ body: "hello world!" })).toBe(true)
    }

    await sender.sendMessages(batch)

    const receiver = createReceiver(queue.name!)

    {
      const messages = await receiver.receiveMessages(num_messages)
      expect(messages).toHaveLength(num_messages)
    }
  },
)
