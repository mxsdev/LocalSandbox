import pMemoize from "p-memoize"
import { test } from "vitest"
import { testPort, testServiceBusPort } from "./setup.js"
import { randomUUID } from "node:crypto"
import {
  SBQueue,
  SBSubscription,
  SBTopic,
  ServiceBusManagementClient,
} from "@azure/arm-servicebus"
import { SubscriptionClient } from "@azure/arm-subscriptions"
import type { ServiceClientOptions } from "@azure/core-client"
import { LocalSandboxAzureCredential } from "../lib/service-client/local-sandbox-azure-credential.js"
import { ResourceManagementClient } from "@azure/arm-resources"
import { Logger } from "pino"
import {
  createNewStore,
  IntegrationStore,
} from "../lib/integration/integration.js"
import { azure_routes } from "../lib/integration/azure/routes.js"
import { getTestLogger } from "./get-test-logger.js"
import { ServiceBusClient, ServiceBusClientOptions } from "@azure/service-bus"
import { QualifiedNamespaceId } from "../lib/broker/broker.js"
import { z } from "zod"
import { DefaultAzureCredential } from "@azure/identity"
import { Temporal } from "@js-temporal/polyfill"

const getEnv = () => {
  const env_schema = z
    .object({
      TEST_AZURE_E2E: z.coerce.boolean(),
      AZURE_SUBSCRIPTION_ID: z.string(),
      AZURE_RESOURCE_GROUP: z.string(),
      AZURE_SERVICE_BUS_NAMESPACE: z.string(),
      AZURE_SERVICE_BUS_CONNECTION_STRING: z.string(),
    })
    .partial()

  const env = env_schema.parse(process.env)

  const azure = env_schema
    .pick({
      TEST_AZURE_E2E: true,
      AZURE_SUBSCRIPTION_ID: true,
      AZURE_RESOURCE_GROUP: true,
      AZURE_SERVICE_BUS_NAMESPACE: true,
      AZURE_SERVICE_BUS_CONNECTION_STRING: true,
    })
    .required()
    .extend({
      TEST_AZURE_E2E: env_schema.shape.TEST_AZURE_E2E.pipe(z.literal(true)),
    })
    .safeParse(env).data

  return {
    ...env,
    azure,
  }
}

type TestEnv = ReturnType<typeof getEnv>

const getAzureContext = (
  onTestFinished: (cb: () => Promise<void>) => void,
  env: TestEnv,
) => {
  const e2e_config = env.azure

  const store = azure_routes["store"]

  const port = testPort
  const subscriptionId = e2e_config?.AZURE_SUBSCRIPTION_ID ?? randomUUID()
  const endpoint = new URL(`https://127.0.0.1:${port}/azure`)

  const sb_port = testServiceBusPort
  const sb_local_endpoint = new URL(`https://127.0.0.1:${sb_port}`)

  const local_sandbox_credential = new LocalSandboxAzureCredential(
    subscriptionId,
  )

  const credential =
    e2e_config?.TEST_AZURE_E2E === true
      ? new DefaultAzureCredential()
      : local_sandbox_credential

  const service_client_options: ServiceClientOptions = {
    ...(e2e_config?.TEST_AZURE_E2E
      ? {}
      : {
          endpoint: endpoint.toString(),
        }),
    retryOptions: {
      maxRetries: 0,
    },
  }

  const subscription_client = new SubscriptionClient(credential, {
    ...service_client_options,
  })

  const resource_client = new ResourceManagementClient(
    credential,
    subscriptionId,
    {
      ...service_client_options,
    },
  )

  const sb_management_client = new ServiceBusManagementClient(
    credential,
    subscriptionId,
    {
      ...service_client_options,
    },
  )

  const location = "westus" as const

  const rg_name = e2e_config?.AZURE_RESOURCE_GROUP ?? "rg" // TODO: use randomUUID()

  const rg = pMemoize(async () =>
    e2e_config?.AZURE_RESOURCE_GROUP
      ? resource_client.resourceGroups.get(rg_name)
      : resource_client.resourceGroups.createOrUpdate(rg_name, { location }),
  )

  const sb = {
    default_queue_params:
      e2e_config?.TEST_AZURE_E2E === true
        ? ({
            autoDeleteOnIdle: Temporal.Duration.from({
              minutes: 5,
            }).toString(),
          } as SBQueue)
        : {},

    namespace_name: e2e_config?.AZURE_SERVICE_BUS_NAMESPACE ?? "namespace", // TODO: use randomUUID()
    namespace: pMemoize(async () =>
      e2e_config?.AZURE_SERVICE_BUS_NAMESPACE
        ? sb_management_client.namespaces.get(
            rg_name,
            e2e_config.AZURE_SERVICE_BUS_NAMESPACE,
          )
        : sb_management_client.namespaces.beginCreateOrUpdateAndWait(
            (await rg()).name!,
            "namespace",
            {
              location,
            },
          ),
    ),
  }

  const sb_connection_string = e2e_config?.TEST_AZURE_E2E
    ? e2e_config.AZURE_SERVICE_BUS_CONNECTION_STRING
    : `Endpoint=sb://localhost/${subscriptionId}/${rg_name}/${sb.namespace_name};SharedAccessKeyName=${"1234"};SharedAccessKey=password`

  const sb_client = new ServiceBusClient(sb_connection_string, {
    ...(e2e_config?.TEST_AZURE_E2E
      ? {}
      : {
          customEndpointAddress: sb_local_endpoint.toString(),
        }),
    ...service_client_options,
  })

  return {
    e2e_config,

    baseURL: endpoint,
    id: subscriptionId,
    subscription_id: subscriptionId,
    credential: credential,
    sb_management_client,
    subscription_client,
    service_client_options,
    resource_client,
    location,
    sb_endpoint: sb_local_endpoint,
    store,

    getSbClient: (
      { subscription_id }: QualifiedNamespaceId,
      opts?: ServiceBusClientOptions,
    ) => {
      const sb_client = e2e_config?.TEST_AZURE_E2E
        ? new ServiceBusClient(
            `Endpoint=sb://localhost/${subscription_id}/${rg_name}/${sb.namespace_name};SharedAccessKeyName=${"1234"};SharedAccessKey=password`,
            {
              customEndpointAddress: sb_local_endpoint.toString(),
              ...opts,
            },
          )
        : new ServiceBusClient(
            `Endpoint=sb://localhost/${subscription_id}/${rg_name}/${sb.namespace_name};SharedAccessKeyName=${"1234"};SharedAccessKey=password`,
            {
              customEndpointAddress: sb_local_endpoint.toString(),
              ...opts,
            },
          )

      onTestFinished(() => sb_client.close())

      return sb_client
    },

    rg,
    rg_name,

    sb: {
      ...sb,
      sb_connection_string,
      sb_client,
    },
  }
}

type AzureContext = ReturnType<typeof getAzureContext>

const getAzureContextWithQueueFixtures = async (azure: AzureContext) => {
  const {
    sb_management_client,
    sb: { default_queue_params, namespace_name },
    rg_name,
    e2e_config,
  } = azure

  if (!e2e_config) {
    // ensure resource group, namespace are created
    await azure.rg()
    await azure.sb.namespace()
  }

  // TODO: handle clean-up in this function
  const createQueue = async (parameters: SBQueue) =>
    sb_management_client.queues.createOrUpdate(
      rg_name,
      namespace_name,
      randomUUID(),
      {
        ...default_queue_params,
        ...parameters,
      },
    )

  const createTopic = async (parameters: SBTopic) =>
    sb_management_client.topics.createOrUpdate(
      rg_name,
      namespace_name,
      randomUUID(),
      {
        ...default_queue_params,
        ...parameters,
      },
    )

  const createSubscription = async (
    topic_name: string,
    parameters: SBSubscription,
  ) =>
    sb_management_client.subscriptions.createOrUpdate(
      rg_name,
      namespace_name,
      topic_name,
      randomUUID(),
      {
        ...default_queue_params,
        ...parameters,
      },
    )

  const getQueue = async (queue_name: string) =>
    sb_management_client.queues.get(rg_name, namespace_name, queue_name)

  return {
    ...azure,
    sb_client: azure.sb.sb_client,

    createQueue,
    getQueue,

    createTopic,
    createSubscription,
  }
}

export type TestContext = {
  azure: ReturnType<typeof getAzureContext>
  env: TestEnv
  expectCorrelatedTime: (actual: Date, expected: Date) => void
  azure_rg: Awaited<ReturnType<AzureContext["rg"]>>
  azure_sb_namespace: Awaited<ReturnType<AzureContext["sb"]["namespace"]>>
  azure_store: IntegrationStore<typeof azure_routes>
  azure_queue: Awaited<ReturnType<typeof getAzureContextWithQueueFixtures>>
  logger: (app?: string) => Logger
}

export const fixturedTest = test.extend<TestContext>({
  expectCorrelatedTime: async ({ env, expect }, use) => {
    use((actual, expected) => {
      const time_window = env.TEST_AZURE_E2E === true ? 800 : 100
      const delta = Math.abs(actual!.getTime() - expected.getTime())

      expect(
        delta,
        `Expected remote times to be correlated: \n\t${actual}\n\t${expected}\n`,
      ).toBeLessThan(time_window)
    })
  },
  env: async ({}, use) => {
    await use(getEnv())
  },
  azure: async ({ onTestFinished, env }, use) => {
    await use(getAzureContext(onTestFinished, env))
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
