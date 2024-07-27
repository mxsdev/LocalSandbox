import { test } from "vitest"
import { Client, createClient } from "../lib/api/client"
import getPort from "get-port"
import { serve } from "../lib/api/serve"
import { testPort } from "./setup"
import { randomUUID } from "node:crypto"

export interface TestContext {
  api: {
    client: Client
    baseURL: URL
    id: string
  }
}

export const fixturedTest = test.extend<TestContext>({
  api: async ({}, use) => {
    // const port = await getPort()
    // const server = await serve(port)

    const port = testPort
    const id = randomUUID()
    const baseURL = new URL(`http://127.0.0.1:${port}`)

    const client = createClient({
      baseURL,
      id,
    })

    await use({
      client,
      baseURL,
      id,
    })
  },
})
