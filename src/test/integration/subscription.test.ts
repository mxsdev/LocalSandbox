import { Subscription, SubscriptionClient } from "@azure/arm-subscriptions"
import { fixturedTest } from "../fixtured-test.js"
import toArray from "it-all"
import {
  DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE,
  DEFAULT_SUBSCRIPTION_DISPLAY_NAME,
} from "../../lib/integration/index.js"
import { LocalSandboxAzureCredential } from "../../lib/service-client/local-sandbox-azure-credential.js"

fixturedTest("has basic subscription", async ({ azure, expect }) => {
  const subscriptions = await toArray(
    azure.subscription_client.subscriptions.list(),
  )

  expect(subscriptions).toStrictEqual<Subscription[]>([
    {
      subscriptionId: azure.id,
      id: `/subscriptions/${azure.id}`,
      displayName: DEFAULT_SUBSCRIPTION_DISPLAY_NAME,
      authorizationSource: DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE,
      state: "Enabled",
    },
  ])
})

fixturedTest("subscriptions isolated to account", async ({ azure, expect }) => {
  const alt_id = "1234"

  const alternate_client = new SubscriptionClient(
    new LocalSandboxAzureCredential(alt_id),
    {
      ...azure.service_client_options,
    },
  )

  {
    const subscriptions = await toArray(alternate_client.subscriptions.list())

    expect(subscriptions).toHaveLength(1)
    expect(subscriptions).toMatchObject<Subscription[]>([
      {
        subscriptionId: alt_id,
      },
    ])
  }

  {
    const subscriptions = await toArray(
      azure.subscription_client.subscriptions.list(),
    )

    expect(subscriptions).toStrictEqual<Subscription[]>([
      {
        subscriptionId: azure.id,
        id: `/subscriptions/${azure.id}`,
        displayName: DEFAULT_SUBSCRIPTION_DISPLAY_NAME,
        authorizationSource: DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE,
        state: "Enabled",
      },
    ])
  }
})
