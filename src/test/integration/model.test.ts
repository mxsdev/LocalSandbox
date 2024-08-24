import { test } from "vitest"
import {
  createModelSpecs,
  getStore,
} from "../../lib/integration/integration.js"
import { z } from "zod"
import { randomUUID } from "node:crypto"

test("one-to-many", async ({ expect }) => {
  const store = getStore(
    createModelSpecs({
      user: {
        primaryKey: "id",
        schema: z.object({
          id: z
            .string()
            .optional()
            .transform((val) => val ?? randomUUID()),
        }),
        hasOne: ["subscription"],
      },
      subscription: {
        primaryKey: "subscriptionId",
        schema: z.object({
          authorizationSource: z.string(),
          subscriptionId: z.string(),
          displayName: z.string(),
          state: z.string(),
        }),
      },
    }),
  )

  const subscription = store.subscription
    .insert()
    .values({
      authorizationSource: "",
      displayName: "",
      state: "",
      subscriptionId: "1234",
    })
    .executeTakeFirstOrThrow()

  expect(subscription.users()).toHaveLength(0)

  const user = store.user
    .insert()
    .values({
      subscription_id: subscription.subscriptionId,
    })
    .executeTakeFirstOrThrow()

  expect(user.subscription().subscriptionId).toBe(subscription.subscriptionId)
  expect(subscription.users()).toHaveLength(1)
  expect(subscription.users()[0]?.id).toBe(user.id)
})
