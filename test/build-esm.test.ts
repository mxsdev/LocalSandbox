import { test } from "vitest"
import { LocalSandbox } from "../dist/esm/index.js"

test("esm build", async ({ expect }) => {
  const local_sandbox = new LocalSandbox()
  expect(local_sandbox.subscriptionId).toBe("default")
})
