import { fixturedTest } from "test/fixtured-test.js"

fixturedTest(
  "naming scheme of topic & subscription id is correct",
  async ({ azure_queue, expect }) => {
    const {
      createTopic,
      createSubscription,
      sb: { namespace_name },
      rg_name,
      subscription_id,
    } = azure_queue

    const topic = await createTopic({})
    const subscription = await createSubscription(topic.name!, {})

    expect(topic.id).toBe(
      `/subscriptions/${subscription_id}/resourceGroups/${rg_name}/providers/Microsoft.ServiceBus/namespaces/${namespace_name}/topics/${topic.name!}`,
    )

    expect(subscription.id).toBe(
      `/subscriptions/${subscription_id}/resourceGroups/${rg_name}/providers/Microsoft.ServiceBus/namespaces/${namespace_name}/topics/${topic.name!}/subscriptions/${subscription.name!}`,
    )
  },
)
