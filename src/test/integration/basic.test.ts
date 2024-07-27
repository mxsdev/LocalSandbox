import { expect } from "vitest"
import { fixturedTest } from "../vitest-context"

fixturedTest("basic test", async ({ api }) => {
  const endpoint = new URL(api.client.github.baseURL.toString() + "/hello")

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
