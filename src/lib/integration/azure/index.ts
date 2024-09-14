import type { IntegrationFactory } from "../integration.js"
import { azure_routes } from "./routes.js"
import "./resource-groups.js"
import "./susbcriptions.js"
import "./service-bus/index.js"
import type { AzureServiceBusBroker } from "../../broker/broker.js"
import { getServerEnv } from "lib/server/env.js"
import type { Logger } from "pino"

interface AzureIntegrationConfig {
  broker: AzureServiceBusBroker
  store_bundle: ReturnType<(typeof azure_routes)["createStoreBundle"]>
  logger?: Logger
}

export const createAzureIntegration: IntegrationFactory<
  AzureIntegrationConfig
> = (args) => {
  const { broker, store_bundle: store, logger } = args

  const env = getServerEnv()
  const build = azure_routes.build()

  if (
    !env.LOCALSANDBOX_DISABLE_DEFAULT_RESOURCES &&
    env.LOCALSANDBOX_DEFAULT_SUBSCRIPTION_ID
  ) {
    logger?.debug(
      `Creating default subscription "${env.LOCALSANDBOX_DEFAULT_SUBSCRIPTION_ID}"`,
    )
    const subscription = store.store.subscription
      .insert()
      .values({
        subscriptionId: env.LOCALSANDBOX_DEFAULT_SUBSCRIPTION_ID,
      })
      .onAllConflictDoNothing()
      .executeTakeFirstOrThrow()

    // create default resources
    if (env.LOCALSANDBOX_DEFAULT_RESOURCE_GROUP) {
      logger?.debug(
        `Creating default resource group "${env.LOCALSANDBOX_DEFAULT_RESOURCE_GROUP}"`,
      )

      const resource_group = store.store.resource_group
        .insert()
        .values({
          location: env.LOCALSANDBOX_DEFAULT_LOCATION,
          subscription_id: subscription.subscriptionId,
          name: env.LOCALSANDBOX_DEFAULT_RESOURCE_GROUP,
        })
        .onAllConflictDoNothing()
        .executeTakeFirstOrThrow()

      if (env.LOCALSANDBOX_DEFAULT_NAMESPACE) {
        logger?.debug(
          `Creating default namespace "${env.LOCALSANDBOX_DEFAULT_NAMESPACE}"`,
        )

        const namespace = store.store.sb_namespace
          .insert()
          .values({
            location: env.LOCALSANDBOX_DEFAULT_LOCATION,
            resource_group_id: resource_group.id,
            name: env.LOCALSANDBOX_DEFAULT_NAMESPACE,
          })
          .onAllConflictDoNothing()
          .executeTakeFirstOrThrow()

        if (env.LOCALSANDBOX_DEFAULT_QUEUE) {
          logger?.debug(
            `Creating default queue "${env.LOCALSANDBOX_DEFAULT_QUEUE}"`,
          )

          store.store.sb_queue
            .insert()
            .values({
              name: env.LOCALSANDBOX_DEFAULT_QUEUE,
              sb_namespace_id: namespace.id,
            })
            .onAllConflictDoNothing()
            .executeTakeFirstOrThrow()
        }
      }
    }
  }

  return async (req, opts) =>
    await build.edgeSpecRouteBundle.makeRequest(req, {
      ...opts,
      middleware: [
        broker.middleware,
        store.middleware,
        ...(opts?.middleware ?? []),
      ],
    })
}
