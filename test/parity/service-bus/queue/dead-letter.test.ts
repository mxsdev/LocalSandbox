import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can manually dead letter message",
  async ({ azure_queue, expect }) => {
    const { createSender, createReceiver, createQueue, getQueue } = azure_queue

    const dlq = await createQueue({})
    const queue = await createQueue({
      forwardDeadLetteredMessagesTo: dlq.name!,
    })

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      countDetails: {
        transferDeadLetterMessageCount: 0,
      },
    })

    const sender = createSender(queue.name!)

    await sender.sendMessages({
      body: "hello world!",
    })

    const receiver = createReceiver(queue.name!)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")
    expect(message?.sequenceNumber).toBeDefined()

    await receiver.deadLetterMessage(message!, {
      deadLetterReason: "dead letter reason",
      deadLetterErrorDescription: "dead letter error description",
    })

    const receiver_dlq = createReceiver(dlq.name!)

    const [dead_lettered_message] = await receiver_dlq.receiveMessages(1)
    expect(dead_lettered_message!.body).toBe("hello world!")

    await receiver_dlq.completeMessage(dead_lettered_message!)

    expect(dead_lettered_message?.deadLetterSource).toBe(queue.name!)
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
    expect(dead_lettered_message?.sequenceNumber).toStrictEqual(
      message?.sequenceNumber,
    )

    // TODO: ensure dead letter options are present
  },
)

fixturedTest.todo("fails properly when trying to dead letter to same queue")
fixturedTest.todo("cannot dead-letter when dlq is not set")
fixturedTest.todo("dead-letters automatically once max attempts are reached")
