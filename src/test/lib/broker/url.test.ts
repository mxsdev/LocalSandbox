import { test } from "vitest"
import { parseBrokerURL } from "../../../lib/broker/url.js"

test("can parse queue or topic URL", ({ expect }) => {
  const url = new URL("sb://localhost/subscription/rg/namespace/queue-or-topic")
  expect(parseBrokerURL(url)).toMatchInlineSnapshot(`
    {
      "namespace_name": "namespace",
      "queue_or_topic_name": "queue-or-topic",
      "resource_group_name": "rg",
      "subqueue": undefined,
      "subscription_id": "subscription",
    }
  `)
})

test("can parse subscription URL", ({ expect }) => {
  const url = new URL(
    "sb://localhost/subscription/rg/namespace/queue-or-topic/Subscriptions/subscription",
  )
  expect(parseBrokerURL(url)).toMatchInlineSnapshot(`
    {
      "namespace_name": "namespace",
      "queue_or_topic_name": "queue-or-topic",
      "resource_group_name": "rg",
      "subqueue": {
        "name": "subscription",
        "type": "subscription",
      },
      "subscription_id": "subscription",
    }
  `)
})

test("can parse queue w/ deadletter URL", ({ expect }) => {
  const url = new URL(
    "sb://localhost/subscription/rg/namespace/queue-or-topic/$DeadLetterQueue",
  )
  expect(parseBrokerURL(url)).toMatchInlineSnapshot(`
    {
      "namespace_name": "namespace",
      "queue_or_topic_name": "queue-or-topic",
      "resource_group_name": "rg",
      "subqueue": {
        "type": "deadletter",
      },
      "subscription_id": "subscription",
    }
  `)
})

test("can parse queue w/ management url", ({ expect }) => {
  const url = new URL(
    "sb://localhost/subscription/rg/namespace/queue-or-topic/$management",
  )
  expect(parseBrokerURL(url)).toMatchInlineSnapshot(`
    {
      "internal": "$management",
      "namespace_name": "namespace",
      "queue_or_topic_name": "queue-or-topic",
      "resource_group_name": "rg",
      "subqueue": undefined,
      "subscription_id": "subscription",
    }
  `)
})

test("can parse subscription w/ management url", ({ expect }) => {
  const url = new URL(
    "sb://localhost/subscription/rg/namespace/topic/Subscriptions/subscription/$management",
  )
  expect(parseBrokerURL(url)).toMatchInlineSnapshot(`
    {
      "internal": "$management",
      "namespace_name": "namespace",
      "queue_or_topic_name": "topic",
      "resource_group_name": "rg",
      "subqueue": {
        "name": "subscription",
        "type": "subscription",
      },
      "subscription_id": "subscription",
    }
  `)
})
