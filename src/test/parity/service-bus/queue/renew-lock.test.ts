import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can renew lock",
  async ({ azure_queue, expect, expectCorrelatedTime, env }) => {
    const { createSender, createReceiver, createQueue } = azure_queue

    const lockDurationMs = env.TEST_AZURE_E2E ? 5000 : 500

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

    {
      await delay(lockDurationMs / 2)

      {
        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 0,
        })

        expect(messages).toHaveLength(0)
      }

      const relocked_at_date = await receiver.renewMessageLock(message!)
      expectCorrelatedTime(
        relocked_at_date,
        new Date(Date.now() + lockDurationMs),
      )
      expect(message?.lockedUntilUtc).toStrictEqual(relocked_at_date)

      await delay(lockDurationMs)

      {
        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 0,
        })

        expect(messages).toHaveLength(1)
        expect(messages[0]).toMatchObject({ body: "hello world!" })
      }
    }
  },
)
