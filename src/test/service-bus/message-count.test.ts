import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "gives accurate messageCount",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue, getQueue } = azure_queue

    const queue = await createQueue("queue", {})

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
    })

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      messageCount: 1,
    })

    const receiver = sb_client.createReceiver(queue.name!)
    onTestFinished(() => receiver.close())

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      messageCount: 1,
    })

    await receiver.completeMessage(message!)

    await expect(getQueue(queue.name!)).resolves.toMatchObject({
      messageCount: 0,
    })
  },
)
