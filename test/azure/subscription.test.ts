import { type Subscription, SubscriptionClient } from "@azure/arm-subscriptions"
import { fixturedTest } from "../fixtured-test.js"
import toArray from "it-all"
import {
  DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE,
  DEFAULT_SUBSCRIPTION_DISPLAY_NAME,
} from "lib/integration/azure/routes.js"
import { LocalSandbox } from "lib/sdk/local-sandbox.js"

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

  const credential = new LocalSandbox(alt_id)

  const alternate_client = new SubscriptionClient(credential, {
    ...azure.service_client_options,
    pipeline: credential.pipeline,
  })

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
