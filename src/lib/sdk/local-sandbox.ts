import type {
  AccessToken,
  GetTokenOptions,
  TokenCredential,
} from "@azure/core-auth"
import type { ServiceClientOptions } from "@azure/core-client"
import { DEFAULT_RESOURCE_NAME } from "lib/server/env.js"

export class LocalSandbox implements TokenCredential {
  readonly serviceClientOptions: ServiceClientOptions
  readonly port: number

  get credential(): TokenCredential {
    return this
  }

  get endpointUrl() {
    return new URL(this.endpoint)
  }

  get endpoint() {
    return `https://localhost.localsandbox.sh:${this.port}/azure`
  }

  readonly subscriptionId: string

  constructor(subscriptionId?: string | undefined, opts?: { port: number }) {
    this.subscriptionId = subscriptionId ?? DEFAULT_RESOURCE_NAME

    this.port = opts?.port ?? 5545

    this.serviceClientOptions = {
      endpoint: this.endpoint,
    }
  }

  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    return {
      token: this.subscriptionId,
      expiresOnTimestamp: Infinity,
    }
  }
}
