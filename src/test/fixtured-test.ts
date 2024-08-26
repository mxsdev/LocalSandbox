import pMemoize from "p-memoize"
import { test } from "vitest"
import { testPort } from "./setup.js"
import { randomUUID } from "node:crypto"
import { ServiceBusManagementClient } from "@azure/arm-servicebus"
import { SubscriptionClient } from "@azure/arm-subscriptions"
import type { ServiceClientOptions } from "@azure/core-client"
import { LocalSandboxAzureCredential } from "../lib/service-client/local-sandbox-azure-credential.js"
import { ResourceManagementClient } from "@azure/arm-resources"

const getAzureContext = () => {
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

  const subscription_client = new SubscriptionClient(local_sandbox_credential, {
    ...service_client_options,
  })

  const resource_client = new ResourceManagementClient(
    local_sandbox_credential,
    id,
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

  const location = "uswest2" as const

  const rg = pMemoize(async () =>
    resource_client.resourceGroups.createOrUpdate("rg", { location }),
  )

  return {
    baseURL: endpoint,
    id,
    credential: local_sandbox_credential,
    sb_management_client,
    subscription_client,
    service_client_options,
    resource_client,
    location,

    rg,
    sb: {
      namespace: pMemoize(async () =>
        sb_management_client.namespaces.beginCreateOrUpdateAndWait(
          (await rg()).name!,
          "namespace",
          {
            location,
          },
        ),
      ),
    },
  }
}

export type TestContext = {
  azure: ReturnType<typeof getAzureContext>
  azure_rg: Awaited<ReturnType<ReturnType<typeof getAzureContext>["rg"]>>
  azure_sb_namespace: Awaited<
    ReturnType<ReturnType<typeof getAzureContext>["sb"]["namespace"]>
  >
}

export const fixturedTest = test.extend<TestContext>({
  azure: async ({}, use) => {
    await use(getAzureContext())
  },
  azure_rg: async ({ azure }, use) => {
    await use(await azure.rg())
  },
  azure_sb_namespace: async ({ azure }, use) => {
    await use(await azure.sb.namespace())
  },
})
