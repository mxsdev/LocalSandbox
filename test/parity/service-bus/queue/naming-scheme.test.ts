import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "naming scheme of queue id is correct",
  async ({ azure_queue, expect }) => {
    const {
      createQueue,
      sb: { namespace_name },
      rg_name,
      subscription_id,
    } = azure_queue

    const queue = await createQueue({})

    expect(queue.id).toBe(
      `/subscriptions/${subscription_id}/resourceGroups/${rg_name}/providers/Microsoft.ServiceBus/namespaces/${namespace_name}/queues/${queue.name!}`,
    )
  },
)
