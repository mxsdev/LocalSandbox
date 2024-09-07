import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can lock for a duration",
  async ({ azure_queue, expect, expectCorrelatedTime, env }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const lockDurationMs = env.TEST_AZURE_E2E ? 5000 : 250

    const queue = await createQueue({
      lockDuration: Temporal.Duration.from({
        milliseconds: lockDurationMs,
      }).toString(),
    })

    const sender = createSender(queue.name!)
    await sender.sendMessages({
      body: "hello world!",
    })

    const receiver = createReceiver(queue.name!, {
      maxAutoLockRenewalDurationInMs: 0,
    })

    const [message] = await receiver.receiveMessages(1)
    expect(message!.body).toBe("hello world!")

    expectCorrelatedTime(
      message!.lockedUntilUtc!,
      new Date(message!.enqueuedTimeUtc!.getTime() + lockDurationMs),
    )

    {
      const messages = await receiver.receiveMessages(1, {
        maxWaitTimeInMs: 0,
      })

      expect(messages).toHaveLength(0)

      await delay(lockDurationMs)

      // TODO: should completing the message still work even after the message is no longer locked??
    }

    {
      const [message] = await receiver.receiveMessages(1)
      expect(message!.body).toBe("hello world!")
    }
  },
)
