import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "Can schedule a message to a queue",
  async ({ onTestFinished, azure_queue, expect, env }) => {
    const { sb_client, createQueue, getQueue } = azure_queue

    const queue = await createQueue({})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    const scheduleMs = env.TEST_AZURE_E2E ? 5000 : 200

    const schedule_at = new Date(Date.now() + scheduleMs)

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
    })

    await sender.scheduleMessages(
      {
        body: "hello world!",
      },
      schedule_at,
    )

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 1,
      },
    })

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    {
      const [message] = await receiver.peekMessages(1)
      expect(message!.state).toBe("scheduled")
    }

    expect(Date.now() < schedule_at.getTime()).toBe(true)

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")
    expect(message!.scheduledEnqueueTimeUtc).toStrictEqual(schedule_at)
    expect(message!.state).toBe("scheduled")

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
      messageCount: 1,
    })

    await receiver.completeMessage(message!)

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      countDetails: {
        scheduledMessageCount: 0,
      },
      messageCount: 0,
    })

    expect(Date.now() >= schedule_at.getTime()).toBe(true)
  },
)
