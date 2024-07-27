import { github_integration } from "./github"
import { IntegrationFactory } from "./integration"

export const INTEGRATIONS = {
  github: github_integration,
} satisfies Record<string, IntegrationFactory>

export type SupportedIntegration = keyof typeof INTEGRATIONS
