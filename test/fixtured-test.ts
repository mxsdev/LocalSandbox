/* eslint-disable no-empty-pattern */
import pMemoize from "p-memoize"
import { test } from "vitest"
import { testPort, testServiceBusPort } from "./setup.js"
import { randomUUID } from "node:crypto"
import {
  type SBQueue,
  type SBSubscription,
  type SBTopic,
  ServiceBusManagementClient,
} from "@azure/arm-servicebus"
import { SubscriptionClient } from "@azure/arm-subscriptions"
import type { ServiceClientOptions } from "@azure/core-client"
import { ResourceManagementClient } from "@azure/arm-resources"
import type { Logger } from "pino"
import { getTestLogger } from "lib/logger/get-test-logger.js"
import {
  ServiceBusClient,
  type TokenCredential,
  type ServiceBusClientOptions,
  type ServiceBusReceiverOptions,
  type ServiceBusSessionReceiverOptions,
} from "@azure/service-bus"
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

  if (!testPort) {
    throw new Error("testPort is not set")
  }

  const subscriptionId = e2e_config?.AZURE_SUBSCRIPTION_ID ?? randomUUID()

  const sb_port = testServiceBusPort
  const sb_local_endpoint = new URL(
    `https://localhost.localsandbox.sh:${sb_port}`,
  )

  const endpoint = new URL(
    `https://localhost.localsandbox.sh:${testPort}/azure`,
  )

  const credential: TokenCredential =
    e2e_config?.TEST_AZURE_E2E === true
      ? new DefaultAzureCredential()
      : {
          getToken: async () => {
            return {
              token: subscriptionId,
              expiresOnTimestamp: Infinity,
            }
          },
        }

  const service_client_options: ServiceClientOptions = {
    ...(e2e_config?.TEST_AZURE_E2E ? {} : { endpoint: endpoint.toString() }),
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
      ? await resource_client.resourceGroups.get(rg_name)
      : await resource_client.resourceGroups.createOrUpdate(rg_name, {
          location,
        }),
  )

  const sb_queue_default: SBQueue = {
    autoDeleteOnIdle: Temporal.Duration.from({
      minutes: 5,
    }).toString(),
  }

  const sb = {
    default_queue_params:
      e2e_config?.TEST_AZURE_E2E === true ? sb_queue_default : {},

    namespace_name: e2e_config?.AZURE_SERVICE_BUS_NAMESPACE ?? "namespace", // TODO: use randomUUID()
    namespace: pMemoize(async () =>
      e2e_config?.AZURE_SERVICE_BUS_NAMESPACE
        ? await sb_management_client.namespaces.get(
            rg_name,
            e2e_config.AZURE_SERVICE_BUS_NAMESPACE,
          )
        : await sb_management_client.namespaces.beginCreateOrUpdateAndWait(
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
    : `Endpoint=sb://${subscriptionId}.${rg_name}.${sb.namespace_name}.localhost.localsandbox.sh;SharedAccessKeyName=${"1234"};SharedAccessKey=password;UseDevelopmentEmulator=true`

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
    credential,
    sb_management_client,
    subscription_client,
    service_client_options,
    resource_client,
    location,
    sb_endpoint: sb_local_endpoint,

    getSbClient: (
      { subscription_id }: { subscription_id: string },
      opts?: ServiceBusClientOptions,
    ) => {
      const sb_client = e2e_config?.TEST_AZURE_E2E
        ? new ServiceBusClient(
            `Endpoint=sb://localhost.localsandbox.sh/${subscription_id}/${rg_name}/${sb.namespace_name};SharedAccessKeyName=${"1234"};SharedAccessKey=password`,
            {
              customEndpointAddress: sb_local_endpoint.toString(),
              ...opts,
            },
          )
        : new ServiceBusClient(
            `Endpoint=sb://${subscription_id}.${rg_name}.${sb.namespace_name}.localhost.localsandbox.sh;SharedAccessKeyName=${"1234"};SharedAccessKey=password`,
            {
              customEndpointAddress: sb_local_endpoint.toString(),
              ...opts,
            },
          )

      onTestFinished(async () => {
        await sb_client.close()
      })

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

const getAzureContextWithQueueFixtures = async (
  azure: AzureContext,
  onTestFinished: (cb: () => Promise<void>) => void,
) => {
  const {
    sb_management_client,
    sb: { default_queue_params, namespace_name, sb_client },
    rg_name,
    e2e_config,
  } = azure

  if (!e2e_config) {
    // ensure resource group, namespace are created
    console.log("1")
    const rg = await azure.rg()
    console.log(rg)
    await azure.sb.namespace()
    console.log("3")
  }

  const createSender = (
    ...args: Parameters<(typeof sb_client)["createSender"]>
  ) => {
    const sender = sb_client.createSender(...args)
    onTestFinished(async () => {
      await sender.close()
    })
    return sender
  }

  const acceptSession = async (
    ...args:
      | [
          queueName: string,
          sessionId: string,
          options?: ServiceBusSessionReceiverOptions,
        ]
      | [
          topicName: string,
          subscriptionName: string,
          sessionId: string,
          options?: ServiceBusSessionReceiverOptions,
        ]
  ) => {
    const receiver = await sb_client.acceptSession(
      ...(args as unknown as [any, any]),
    )
    onTestFinished(async () => {
      await receiver.close()
    })
    return receiver
  }

  const createReceiver = (
    ...args:
      | [queueName: string, options?: ServiceBusReceiverOptions]
      | [
          topicName: string,
          subscriptionName: string,
          options?: ServiceBusReceiverOptions,
        ]
  ) => {
    const receiver = sb_client.createReceiver(...(args as [any]))
    onTestFinished(async () => {
      await receiver.close()
    })
    return receiver
  }

  // TODO: handle clean-up in this function
  const createQueue = async (parameters: SBQueue) =>
    await sb_management_client.queues.createOrUpdate(
      rg_name,
      namespace_name,
      randomUUID(),
      {
        ...default_queue_params,
        ...parameters,
      },
    )

  const createTopic = async (parameters: SBTopic) =>
    await sb_management_client.topics.createOrUpdate(
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
    await sb_management_client.subscriptions.createOrUpdate(
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
    await sb_management_client.queues.get(rg_name, namespace_name, queue_name)

  const getTopic = async (topic_name: string) =>
    await sb_management_client.topics.get(rg_name, namespace_name, topic_name)

  const getSubscription = async (
    topic_name: string,
    subscription_name: string,
  ) =>
    await sb_management_client.subscriptions.get(
      rg_name,
      namespace_name,
      topic_name,
      subscription_name,
    )

  return {
    ...azure,

    createSender,
    createReceiver,
    acceptSession,

    createQueue,
    getQueue,

    createTopic,
    getTopic,

    createSubscription,
    getSubscription,
  }
}

export interface TestContext {
  azure: ReturnType<typeof getAzureContext>
  env: TestEnv
  expectCorrelatedTime: (actual: Date, expected: Date) => void
  azure_rg: Awaited<ReturnType<AzureContext["rg"]>>
  azure_sb_namespace: Awaited<ReturnType<AzureContext["sb"]["namespace"]>>
  azure_queue: Awaited<ReturnType<typeof getAzureContextWithQueueFixtures>>
  logger: (app?: string) => Logger
}

export const fixturedTest = test.extend<TestContext>({
  expectCorrelatedTime: async ({ env, expect }, use) => {
    await use((actual, expected) => {
      const time_window = env.TEST_AZURE_E2E === true ? 800 : 100
      const delta = Math.abs(actual.getTime() - expected.getTime())

      expect(
        delta,
        `Expected remote times to be correlated: \n\t${actual.toISOString()}\n\t${expected.toISOString()}\n`,
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
  logger: async ({ onTestFinished }, use) => {
    await use((...args) => {
      const { logger, cleanup } = getTestLogger(...args)

      onTestFinished(async () => {
        await cleanup()
      })

      return logger
    })
  },
  azure_queue: async ({ azure, onTestFinished }, use) => {
    await use(await getAzureContextWithQueueFixtures(azure, onTestFinished))
  },
})
