import { test } from "vitest"
import { testPort } from "./setup.js"
import { randomUUID } from "node:crypto"

export interface TestContext {
  api: {
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
    const baseURL = new URL(`https://127.0.0.1:${port}/${id}`)

    await use({
      baseURL,
      id,
    })
  },
})
