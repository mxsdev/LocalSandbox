import { test, describe } from "vitest"
import { uuidToString } from "../../../lib/util/uuid.js"
import { unreorderLockToken } from "../../../lib/util/service-bus.js"

describe("uuid", () => {
  test("can parse buffer to uuid string", ({ expect }) => {
    expect(uuidToString.parse(Buffer.from([48]))).toMatchInlineSnapshot(
      `"30000000-0000-0000-0000-000000000000"`,
    )
  })
})

test("can parse reordered uuid", ({ expect }) => {
  expect(
    uuidToString.parse(
      unreorderLockToken(
        Buffer.from([0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      ),
    ),
  ).toMatchInlineSnapshot(`"30000000-0000-0000-0000-000000000000"`)
})
