import { test } from "vitest"
import { testPort } from "./setup.js"
import { randomUUID } from "node:crypto"
import { ServiceBusManagementClient } from "@azure/arm-servicebus"
import { SubscriptionClient } from "@azure/arm-subscriptions"
import type { ServiceClientOptions } from "@azure/core-client"
import { LocalSandboxAzureCredential } from "../lib/service-client/local-sandbox-azure-credential.js"
import { TokenCredential } from "@azure/core-auth"

export interface TestContext {
  azure: {
    baseURL: URL
    id: string
    sb_management_client: ServiceBusManagementClient
    subscription_client: SubscriptionClient
    service_client_options: ServiceClientOptions
    credential: TokenCredential
  }
}

export const fixturedTest = test.extend<TestContext>({
  azure: async ({}, use) => {
    // const port = await getPort()
    // const server = await serve(port)

    const port = testPort
    const id = randomUUID()
    const endpoint = new URL(`https://127.0.0.1:${port}/azure`)

    const local_sandbox_credential = new LocalSandboxAzureCredential(id)

    const service_client_options: ServiceClientOptions = {
      endpoint: endpoint.toString(),
      retryOptions: {
        maxRetries: 0,
      },
    }

    const subscription_client = new SubscriptionClient(
      local_sandbox_credential,
      {
        ...service_client_options,
      },
    )

    const sb_management_client = new ServiceBusManagementClient(
      local_sandbox_credential,
      id,
      {
        ...service_client_options,
      },
    )

    await use({
      baseURL: endpoint,
      id,
      credential: local_sandbox_credential,
      sb_management_client,
      subscription_client,
      service_client_options,
    })
  },
})
