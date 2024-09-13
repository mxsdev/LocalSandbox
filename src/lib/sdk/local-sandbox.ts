import type {
  AccessToken,
  GetTokenOptions,
  TokenCredential,
} from "@azure/core-auth"
import {
  createClientPipeline,
  type ServiceClientOptions,
} from "@azure/core-client"
import { bearerTokenAuthenticationPolicyName } from "@typespec/ts-http-runtime"
import { DEFAULT_RESOURCE_NAME } from "lib/server/env.js"

export class LocalSandbox implements TokenCredential {
  readonly pipeline
  readonly serviceClientOptions: ServiceClientOptions
  readonly port: number

  get credential(): TokenCredential {
    return this
  }

  get endpointUrl() {
    return new URL(this.endpoint)
  }

  get endpoint() {
    return `http://localhost:${this.port}/azure`
  }

  readonly subscriptionId: string

  constructor(subscriptionId?: string | undefined, opts?: { port: number }) {
    this.subscriptionId = subscriptionId ?? DEFAULT_RESOURCE_NAME

    this.pipeline = createClientPipeline({})

    this.pipeline.addPolicy({
      name: bearerTokenAuthenticationPolicyName,
      sendRequest: async (request, next) => {
        request.headers.set("Authorization", `Bearer ${this.subscriptionId}`)
        return await next(request)
      },
    })

    this.port = opts?.port ?? 5545

    this.serviceClientOptions = {
      pipeline: this.pipeline,
      endpoint: this.endpoint,
      allowInsecureConnection: true,
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
