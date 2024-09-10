import type { IntegrationFactory } from "../integration.js"
import { azure_routes } from "./routes.js"
import "./resource-groups.js"
import "./susbcriptions.js"
import "./service-bus/index.js"
import type { AzureServiceBusBroker } from "../../broker/broker.js"

interface AzureIntegrationConfig {
  broker: AzureServiceBusBroker
  store_bundle: ReturnType<(typeof azure_routes)["createStoreBundle"]>
}

export const createAzureIntegration: IntegrationFactory<
  AzureIntegrationConfig
> = (args) => {
  const { broker, store_bundle: store } = args

  const build = azure_routes.build()

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
