import type { IntegrationFactory } from "../integration.js"
import { azure_routes } from "./routes.js"
import "./resource-groups.js"
import "./susbcriptions.js"
import "./service-bus/index.js"
import { AzureServiceBusBroker } from "../../broker/broker.js"

interface AzureIntegrationConfig {
  broker: AzureServiceBusBroker
}

export const createAzureIntegration: IntegrationFactory<
  AzureIntegrationConfig
> = (args) => {
  const { broker } = args

  const build = azure_routes.build()

  return (req, opts) =>
    build.edgeSpecRouteBundle.makeRequest(req, {
      ...opts,
      middleware: [broker.middleware, ...(opts?.middleware ?? [])],
    })
}
