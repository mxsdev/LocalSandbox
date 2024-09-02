import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "can renew lock",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { sb_client, createQueue } = azure_queue

    const lockDurationMs = 500

    const queue = await createQueue({
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
      await delay(lockDurationMs / 2)

      {
        const messages = await receiver.receiveMessages(1, {
          maxWaitTimeInMs: 0,
        })

        expect(messages).toHaveLength(0)
      }

      const relocked_at_date = await receiver.renewMessageLock(message!)
      expect(
        Math.abs(relocked_at_date.getTime() - Date.now() - lockDurationMs),
      ).toBeLessThanOrEqual(100)
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
