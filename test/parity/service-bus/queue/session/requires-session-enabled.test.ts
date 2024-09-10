import { fixturedTest } from "test/fixtured-test.js"

fixturedTest.todo("requiresSession must be enabled to use sessions")

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
