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

  constructor(
    private readonly id: string,
    opts?: { port: number },
  ) {
    this.pipeline = createClientPipeline({})

    this.pipeline.addPolicy({
      name: bearerTokenAuthenticationPolicyName,
      sendRequest: async (request, next) => {
        request.headers.set("Authorization", `Bearer ${this.id}`)
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
      token: this.id,
      expiresOnTimestamp: Infinity,
    }
  }
}
