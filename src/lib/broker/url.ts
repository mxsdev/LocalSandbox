import { z } from "zod"
import { BrokerConstants } from "./constants.js"
import { Constants } from "@azure/core-amqp"

const baseTuple = [
  z.string().max(0),
  z.string(),
  z.string(),
  z.string(),
  z.string(),
] as const

const brokerUrlSchema = z
  .union([
    z.tuple([...baseTuple]),
    // z.tuple([...baseTuple, z.string()]),
    z.tuple([
      ...baseTuple,
      z.literal(BrokerConstants.subscriptionsSubqueue),
      z.string(),
    ]),
  ])
  .transform(
    ([
      ,
      subscription_id,
      resource_group_name,
      namespace_name,
      queue_or_topic_name,
      subqueue_type,
      subqueue_name,
    ]) => {
      return {
        subscription_id,
        resource_group_name,
        namespace_name,
        queue_or_topic_name,
        ...(subqueue_type === "Subscriptions" && subqueue_name
          ? { subscription_name: subqueue_name }
          : {}),
      }
    },
  )

export const parseBrokerURL = (url: URL) => {
  const parts = url.pathname.split("/")

  const internal = z.enum([Constants.management]).safeParse(parts.at(-1))
  if (internal.success) parts.pop()

  const subqueue = z
    .literal(BrokerConstants.deadLetterSubqueue)
    .transform(() => "deadletter" as const)
    .safeParse(parts.at(-1))
  if (subqueue.success) parts.pop()

  return {
    ...brokerUrlSchema.parse(parts),

    ...(subqueue.success
      ? {
          subqueue: subqueue.data,
        }
      : {}),

    ...(internal.success
      ? {
          internal: internal.data,
        }
      : {}),
  }
}
