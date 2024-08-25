import { expect } from "vitest"
import { fixturedTest } from "../vitest-context.js"
import {
  ClientSecretCredential,
  AccessToken,
  TokenCredential,
  TokenCredentialOptions,
} from "@azure/identity"
import { PublicClientApplication } from "@azure/msal-node"
import { SubscriptionClient } from "@azure/arm-subscriptions"
import { getLogger } from "../../lib/logger/index.js"
import { PassThrough } from "node:stream"

fixturedTest("basic test", async ({ api }) => {
  const endpoint = new URL(api.baseURL.toString() + "/hello")
  {
    const res = await fetch(endpoint, {}).then((r) => r.json())
    expect(res).toStrictEqual({ message: "hi! users: " })
  }

  {
    const res = await fetch(endpoint, { method: "POST" }).then((r) => r.json())
    expect(res).toStrictEqual({ ok: true })
  }

  {
    const res = await fetch(endpoint, {}).then((r) => r.json())
    expect(res).toStrictEqual({ message: "hi! users: user-1" })
  }
})

fixturedTest.skip("azure test", async ({ api }) => {
  // const TENANT_ID = "2bdbf4cc-1b4f-42d6-a2bd-dd4b25754900"
  // const credentials = new ClientSecretCredential(TENANT_ID, "123", "123")

  const access_token: AccessToken = {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yYmRiZjRjYy0xYjRmLTQyZDYtYTJiZC1kZDRiMjU3NTQ5MDAvIiwiaWF0IjoxNzI0Mzg1MDQyLCJuYmYiOjE3MjQzODUwNDIsImV4cCI6MTcyNDM4OTExNSwiYWNyIjoiMSIsImFpbyI6IkFYUUFpLzhYQUFBQW1FRWw2cVpiYlBlTVJVK0RMT0h2OGxNbDRjQWl5cmhaV3Rldi9FZGxKQWdGUlRCOGRTSlF6aWVnekJoTEM2VlNtakVUS2FEZWt5SDBXb0UrZjV2WlVYK2pkTTh3N3laT204Z3g3czdPb2ZIQ2QySS80NzJMbjJ5c0tNckExUTdQaXNxZ1FvQlNEK0xnaUF0OUlOaEVZdz09IiwiYWx0c2VjaWQiOiIxOmxpdmUuY29tOjAwMDM3RkZFNTdBM0NFNEQiLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZW1haWwiOiJtYXhAbXhzLmRldiIsImZhbWlseV9uYW1lIjoiU3RvdW1lbiIsImdpdmVuX25hbWUiOiJNYXgiLCJncm91cHMiOlsiMGQ5ZWNmYTItZTM4ZC00N2E0LThlZmQtZTc3YmJhZDI0ZjY5Il0sImlkcCI6ImxpdmUuY29tIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTk5LjIzMC4xMS4xNjQiLCJuYW1lIjoiTWF4IFN0b3VtZW4iLCJvaWQiOiI4Njg1OTEyOC1jNDU1LTRiZmEtYTFhYi04NzFiNjE4YTZlZDUiLCJwdWlkIjoiMTAwMzIwMDNCOTg4NTZGRCIsInJoIjoiMC5BV01CelBUYkswOGIxa0tpdmQxTEpYVkpBRVpJZjNrQXV0ZFB1a1Bhd2ZqMk1CTmpBV1kuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiZ2diRlJDUDAxQmtLbHJ2MVp1cWJxMG1oRk5SNDR5VnhWbm14bE5fQkRmcyIsInRpZCI6IjJiZGJmNGNjLTFiNGYtNDJkNi1hMmJkLWRkNGIyNTc1NDkwMCIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20jbWF4QG14cy5kZXYiLCJ1dGkiOiJVTk5ZY1Z4akswLXBfeUlsVUtVSUFRIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NhZSI6IjEiLCJ4bXNfY2MiOlsiQ1AxIl0sInhtc19lZG92Ijp0cnVlLCJ4bXNfaWRyZWwiOiIyNCAxIiwieG1zX3RjZHQiOjE3MjQzMDgwMzR9.RYzgfgaTXABNHD8NBMANTYXGkgmCpOFPifJAhD7URfxCcoDSSSjd7UL_2m5cfM0ICbrnvyR8DHTunlTVcUyF1wrkbNKvA5Pfj4huRwiqEQJmdiEaW8vs-55WQ0ei3oRHtwXL8mK4gg81hUeGfMe1IJ5crCLwsdRCBuK1c2KYvQWp0CbIVchPsKh_6kKvDEnvnGx4OyT7H249A_jRRFjlFRpMy4_mi0K94xhOgrUmdFJC3S81MlET7XTOKVL6oV93eZ8Y7ucq3VGkytfkDkzFmAGrdnisUSdL79cHdCpJk40Fm8mhSHssCleXY_yN3NjHQrj0zoDCvO7gmy-Luhv26w",
    expiresOnTimestamp: 1724389114,
  }

  const token_credential: TokenCredential = {
    async getToken(scopes, options) {
      return access_token
    },
  }

  const subscription_client = new SubscriptionClient(token_credential, {
    $host: api.baseURL.toString(),
    endpoint: api.baseURL.toString(),
  })

  for await (const item of subscription_client.subscriptions.list()) {
    console.log(item)
  }
})
