import { Temporal } from "@js-temporal/polyfill"
import delay from "delay"
import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "supports auto-delete on idle",
  async ({ onTestFinished, azure_queue, expect }) => {
    const { resource_group, namespace, sb_management_client, createQueue } =
      azure_queue

    process.env["LOCALSANDBOX_NO_ENFORCE_SB_AUTO_DELETE_IDLE_MINIMUM"] = "true"
    onTestFinished(() => {
      delete process.env["LOCALSANDBOX_NO_ENFORCE_SB_AUTO_DELETE_IDLE_MINIMUM"]
    })

    const queue = await createQueue("queue", {
      autoDeleteOnIdle: Temporal.Duration.from({
        milliseconds: 100,
      }).toString(),
    })

    await expect(
      sb_management_client.queues.get(
        resource_group.name!,
        namespace.name!,
        queue.name!,
      ),
    ).resolves.not.toThrow()

    await delay(100)

    await expect(
      sb_management_client.queues.get(
        resource_group.name!,
        namespace.name!,
        queue.name!,
      ),
    ).rejects.toThrow()
  },
)
