import { test } from "vitest"
import { LocalSandbox } from "../dist/cjs/index.js"

test("cjs build", async ({ expect }) => {
  const local_sandbox = new LocalSandbox()
  expect(local_sandbox.subscriptionId).toBe("default")
})
