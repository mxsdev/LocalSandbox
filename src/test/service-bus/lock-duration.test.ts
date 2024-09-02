import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can lock for a duration",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const lockDurationMs = 250

    const queue = await createQueue("queue", {
      lockDuration: Temporal.Duration.from({
        milliseconds: lockDurationMs,
      }).toString(),
    })

    const sender = sb_client.createSender(queue.name!)
    onTestFinished(() => sender.close())

    await sender.sendMessages({
      body: "hello world!",
    })

    const receiver = sb_client.createReceiver(queue.name!, {
      maxAutoLockRenewalDurationInMs: 0,
    })
    onTestFinished(() => receiver.close())

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")

    {
      const messages = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })

      expect(messages).toHaveLength(0)

      await delay(lockDurationMs)

      // completing the message should not do anything
      await receiver.completeMessage(message!)
    }

    {
      const [message] = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })
      expect(message!.body).toBe("hello world!")
    }
  },
)
