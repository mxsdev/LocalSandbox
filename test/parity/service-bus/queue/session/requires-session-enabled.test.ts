import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "cannot accept session if requiresSession is false",
  {
    timeout: 60000,
  },
  async ({ azure_queue, expect }) => {
    const { createQueue, acceptSession } = azure_queue

    const queue = await createQueue({ requiresSession: false })

    await expect(
      acceptSession(queue.name!, "session", {
        maxAutoLockRenewalDurationInMs: 0,
      }),
    )
      .rejects.toThrowError
      // TODO: message is not being sent right...
      // "A sessionful message receiver cannot be created on an entity that does not require sessions. Ensure RequiresSession is set to true when creating a Queue or Subscription to enable sessionful behavior.",
      ()
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
