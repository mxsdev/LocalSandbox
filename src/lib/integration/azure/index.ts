import type { IntegrationFactory } from "../integration.js"
import { azure_routes } from "./routes.js"
import "./resource-groups.js"
import "./susbcriptions.js"
import "./service-bus/index.js"

export const createAzureIntegration: IntegrationFactory = () => {
  return azure_routes.build()
}
