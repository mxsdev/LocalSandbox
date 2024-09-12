import type {
  AccessToken,
  GetTokenOptions,
  TokenCredential,
} from "@azure/core-auth"
import { createClientPipeline } from "@azure/core-client"
import { bearerTokenAuthenticationPolicyName } from "@typespec/ts-http-runtime"

export class LocalSandboxAzureCredential implements TokenCredential {
  constructor(private readonly id: string) {
    this.pipeline = createClientPipeline({})

    this.pipeline.addPolicy({
      name: bearerTokenAuthenticationPolicyName,
      sendRequest: async (request, next) => {
        const token = await this.getToken([])

        if (token) {
          request.headers.set("Authorization", `Bearer ${token.token}`)
        }

        return await next(request)
      },
    })
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

  readonly pipeline
}
