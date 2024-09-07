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
    z.tuple([...baseTuple, z.string()]),
    z.tuple([...baseTuple, z.string(), z.string()]),
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
        subqueue: {
          type: subqueue_type,
          name: subqueue_name,
        },
      }
    },
  )
  .pipe(
    z.object({
      subscription_id: z.string(),
      resource_group_name: z.string(),
      namespace_name: z.string(),
      queue_or_topic_name: z.string(),
      subqueue: z
        .discriminatedUnion("type", [
          z.object({
            type: z
              .literal(BrokerConstants.subscriptionsSubqueue)
              .transform(() => "subscription" as const),
            name: z.string(),
          }),
          z.object({
            type: z
              .literal(BrokerConstants.deadLetterSubqueue)
              .transform(() => "deadletter" as const),
          }),
          z.object({
            type: z.undefined(),
          }),
        ])
        .transform((val) => (val.type === undefined ? undefined : val)),
    }),
  )

export const parseBrokerURL = (url: URL) => {
  const parts = url.pathname.split("/")

  const end = z.enum([Constants.management]).safeParse(parts.at(-1))

  if (end.success) {
    parts.pop()
  }

  return {
    ...brokerUrlSchema.parse(parts),
    ...(end.success
      ? {
          internal: end.data,
        }
      : {}),
  }
}
