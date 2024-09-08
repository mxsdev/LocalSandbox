import { fixturedTest } from "test/fixtured-test.js"

fixturedTest("deadLetter subqueueType", async ({ azure_queue, expect }) => {
  const { createSender, createReceiver, createQueue, getQueue } = azure_queue

  const queue = await createQueue({})

  await expect(getQueue(queue.name!)).resolves.toMatchObject({
    countDetails: {
      transferDeadLetterMessageCount: 0,
    },
  })

  const sender = createSender(queue.name!)
  await sender.sendMessages({
    body: "hello world!",
  })

  const receiver = createReceiver(queue.name!, {})

  const [message] = await receiver.receiveMessages(1)
  expect(message!.body).toBe("hello world!")
  expect(message?.sequenceNumber).toBeDefined()

  await receiver.deadLetterMessage(message!, {
    deadLetterReason: "dead letter reason",
    deadLetterErrorDescription: "dead letter error description",
  })

  const receiver_dlq = createReceiver(queue.name!, {
    subQueueType: "deadLetter",
  })

  const [dead_lettered_message] = await receiver_dlq.receiveMessages(1, {
    maxWaitTimeInMs: 1000,
  })
  expect(dead_lettered_message!.body).toBe("hello world!")
  expect(dead_lettered_message!.sequenceNumber).toEqual(message!.sequenceNumber)

  await receiver_dlq.completeMessage(dead_lettered_message!)

  expect(dead_lettered_message?.deadLetterSource).toBeUndefined()
  expect(dead_lettered_message?.deadLetterReason).toBe("dead letter reason")
  expect(dead_lettered_message?.deadLetterErrorDescription).toBe(
    "dead letter error description",
  )

  await expect(getQueue(queue.name!)).resolves.toMatchObject({
    countDetails: {
      transferDeadLetterMessageCount: 0,
    },
  })

  expect(dead_lettered_message?.sequenceNumber).toBeDefined()
  expect(dead_lettered_message?.enqueuedSequenceNumber).toBeUndefined()
  expect(dead_lettered_message?.sequenceNumber).not.toStrictEqual(
    message?.enqueuedSequenceNumber,
  )
})

fixturedTest(
  "deadLetter subqueueType fails when auto-forwarding is enabled",
  async ({ azure_queue, expect }) => {
    const { createReceiver, createQueue } = azure_queue

    const dlq = await createQueue({})
    const queue = await createQueue({
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    const receiver_dlq = createReceiver(queue.name!, {
      subQueueType: "deadLetter",
    })

    await expect(
      receiver_dlq.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      }),
    ).rejects.toThrowError(
      "InvalidOperationError: Cannot create a message receiver on an entity with auto-forwarding enabled.",
    )
  },
)
