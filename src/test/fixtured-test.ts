import pMemoize from "p-memoize"
import { test } from "vitest"
import { testPort, testServiceBusPort } from "./setup.js"
import { randomUUID } from "node:crypto"
import { SBQueue, ServiceBusManagementClient } from "@azure/arm-servicebus"
import { SubscriptionClient } from "@azure/arm-subscriptions"
import type { ServiceClientOptions } from "@azure/core-client"
import { LocalSandboxAzureCredential } from "../lib/service-client/local-sandbox-azure-credential.js"
import { ResourceManagementClient } from "@azure/arm-resources"
import { Logger } from "pino"
import { PassThrough } from "node:stream"
import { getLogger } from "../lib/logger/index.js"
import { createAzureIntegration } from "../lib/integration/index.js"
import {
  createNewStore,
  IntegrationStore,
} from "../lib/integration/integration.js"
import { azure_routes } from "../lib/integration/azure/routes.js"
import { getTestLogger } from "./get-test-logger.js"
import { ServiceBusClient, ServiceBusClientOptions } from "@azure/service-bus"
import { QualifiedNamespaceId } from "../lib/broker/broker.js"

const getAzureContext = (onTestFinished: (cb: () => Promise<void>) => void) => {
  const store = azure_routes["store"]

  const port = testPort
  const id = randomUUID()
  const endpoint = new URL(`https://127.0.0.1:${port}/azure`)

  const sb_port = testServiceBusPort
  const sb_endpoint = new URL(`https://127.0.0.1:${sb_port}`)

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
    subscription_id: id,
    credential: local_sandbox_credential,
    sb_management_client,
    subscription_client,
    service_client_options,
    resource_client,
    location,
    sb_endpoint,
    store,

    getSbClient: (
      {
        namespace_name,
        resource_group_name,
        subscription_id,
      }: QualifiedNamespaceId,
      opts?: ServiceBusClientOptions,
    ) => {
      const sb_client = new ServiceBusClient(
        `Endpoint=sb://localhost/${subscription_id}/${resource_group_name}/${namespace_name};SharedAccessKeyName=${"1234"};SharedAccessKey=password`,
        {
          customEndpointAddress: sb_endpoint.toString(),
          ...opts,
        },
      )

      onTestFinished(() => sb_client.close())

      return sb_client
    },

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

type AzureContext = ReturnType<typeof getAzureContext>

const getAzureContextWithQueueFixtures = async (azure: AzureContext) => {
  const { resource_client, sb_management_client, subscription_id, location } =
    azure

  const resource_group = await resource_client.resourceGroups.createOrUpdate(
    "rg",
    {
      location,
    },
  )

  const namespace =
    await sb_management_client.namespaces.beginCreateOrUpdateAndWait(
      resource_group.name!,
      "namespace",
      {
        location,
      },
    )

  const createQueue = async (queue_name: string, parameters: SBQueue) =>
    sb_management_client.queues.createOrUpdate(
      resource_group.name!,
      namespace.name!,
      queue_name,
      parameters,
    )

  return {
    ...azure,
    resource_group,
    namespace,
    sb_client: azure.getSbClient({
      namespace_name: namespace.name!,
      resource_group_name: resource_group.name!,
      subscription_id,
    }),
    createQueue,
  }
}

export type TestContext = {
  azure: ReturnType<typeof getAzureContext>
  azure_rg: Awaited<ReturnType<AzureContext["rg"]>>
  azure_sb_namespace: Awaited<ReturnType<AzureContext["sb"]["namespace"]>>
  azure_store: IntegrationStore<typeof azure_routes>
  azure_queue: Awaited<ReturnType<typeof getAzureContextWithQueueFixtures>>
  logger: (app?: string) => Logger
}

export const fixturedTest = test.extend<TestContext>({
  azure: async ({ onTestFinished }, use) => {
    await use(getAzureContext(onTestFinished))
  },
  // azure_queue: async ({ azure, logger }, use) => {},
  azure_rg: async ({ azure }, use) => {
    await use(await azure.rg())
  },
  azure_sb_namespace: async ({ azure }, use) => {
    await use(await azure.sb.namespace())
  },
  logger: async ({}, use) => {
    await use(getTestLogger)
  },
  azure_store: async ({}, use) => {
    await use(createNewStore(azure_routes["store"]))
  },
  azure_queue: async ({ azure }, use) => {
    await use(await getAzureContextWithQueueFixtures(azure))
  },
})
