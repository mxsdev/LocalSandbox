import { z } from "zod"
import {
  systemData,
  messageCountDetails,
  entityStatus,
} from "../../../common/v1/definitions.js"
import { proxyResource } from "../../../common/v2/definitions.js"

export const sbQueueProperties = z
  .object({
    countDetails: messageCountDetails.optional(),
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe("The exact time the message was created.")
      .readonly()
      .optional(),
    updatedAt: z
      .string()
      .datetime({ offset: true })
      .describe("The exact time the message was updated.")
      .readonly()
      .optional(),
    accessedAt: z
      .string()
      .datetime({ offset: true })
      .describe(
        "Last time a message was sent, or the last time there was a receive request to this queue.",
      )
      .readonly()
      .optional(),
    sizeInBytes: z
      .number()
      .int()
      .describe("The size of the queue, in bytes.")
      .readonly()
      .optional(),
    messageCount: z
      .number()
      .int()
      .describe("The number of messages in the queue.")
      .readonly()
      .optional(),
    lockDuration: z
      .string()
      .duration()
      .describe(
        "ISO 8601 timespan duration of a peek-lock; that is, the amount of time that the message is locked for other receivers. The maximum value for LockDuration is 5 minutes; the default value is 1 minute.",
      )
      .optional(),
    maxSizeInMegabytes: z
      .number()
      .int()
      .describe(
        "The maximum size of the queue in megabytes, which is the size of memory allocated for the queue. Default is 1024.",
      )
      .optional(),
    maxMessageSizeInKilobytes: z
      .number()
      .int()
      .describe(
        "Maximum size (in KB) of the message payload that can be accepted by the queue. This property is only used in Premium today and default is 1024.",
      )
      .optional(),
    requiresDuplicateDetection: z
      .boolean()
      .describe(
        "A value indicating if this queue requires duplicate detection.",
      )
      .optional(),
    requiresSession: z
      .boolean()
      .describe(
        "A value that indicates whether the queue supports the concept of sessions.",
      )
      .optional(),
    defaultMessageTimeToLive: z
      .string()
      .duration()
      .describe(
        "ISO 8601 default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.",
      )
      .optional(),
    deadLetteringOnMessageExpiration: z
      .boolean()
      .describe(
        "A value that indicates whether this queue has dead letter support when a message expires.",
      )
      .optional(),
    duplicateDetectionHistoryTimeWindow: z
      .string()
      .duration()
      .describe(
        "ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.",
      )
      .optional(),
    maxDeliveryCount: z
      .number()
      .int()
      .describe(
        "The maximum delivery count. A message is automatically deadlettered after this number of deliveries. default value is 10.",
      )
      .optional(),
    status: entityStatus.optional(),
    enableBatchedOperations: z
      .boolean()
      .describe(
        "Value that indicates whether server-side batched operations are enabled.",
      )
      .optional(),
    autoDeleteOnIdle: z
      .string()
      .duration()
      .describe(
        "ISO 8061 timeSpan idle interval after which the queue is automatically deleted. The minimum duration is 5 minutes.",
      )
      .optional(),
    enablePartitioning: z
      .boolean()
      .describe(
        "A value that indicates whether the queue is to be partitioned across multiple message brokers.",
      )
      .optional(),
    enableExpress: z
      .boolean()
      .describe(
        "A value that indicates whether Express Entities are enabled. An express queue holds a message in memory temporarily before writing it to persistent storage.",
      )
      .optional(),
    forwardTo: z
      .string()
      .describe("Queue/Topic name to forward the messages")
      .optional(),
    forwardDeadLetteredMessagesTo: z
      .string()
      .describe("Queue/Topic name to forward the Dead Letter message")
      .optional(),
  })
  .describe("The Queue Properties definition.")

export const sbQueue = z
  .object({
    properties: sbQueueProperties.optional(),
    systemData: systemData.optional(),
  })
  .and(proxyResource)
  .describe("Description of queue Resource.")

export const sbQueueListResult = z
  .object({
    value: z
      .array(sbQueue)
      .describe("Result of the List Queues operation.")
      .optional(),
    nextLink: z
      .string()
      .describe(
        "Link to the next set of results. Not empty if Value contains incomplete list of queues.",
      )
      .optional(),
  })
  .describe("The response to the List Queues operation.")

export default {
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues":
    [
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
          $skip: z.coerce
            .number()
            .int()
            .optional()
            .describe(
              "Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.",
            ),
          $top: z.coerce
            .number()
            .int()
            .optional()
            .describe(
              "May be used to limit the number of results to the most recent N usageDetails.",
            ),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: sbQueueListResult.describe(
          "Queues successfully returned.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues/[queueName]":
    [
      {
        methods: ["PUT"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          queueName: z.string().describe("The queue name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: sbQueue.describe(
          "Parameters supplied to create or update a queue resource.",
        ),
        jsonResponse: sbQueue.describe("Queue successfully created."),
      },
      {
        methods: ["GET"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          queueName: z.string().describe("The queue name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: sbQueue.describe(
          "Queue description successfully returned.",
        ),
      },
      {
        methods: ["DELETE"],
        queryParams: z.object({
          "api-version": z.string().describe("Client API version."),
        }),
        routeParams: z.object({
          resourceGroupName: z
            .string()
            .describe(
              "Name of the Resource group within the Azure subscription.",
            ),
          namespaceName: z.string().describe("The namespace name"),
          queueName: z.string().describe("The queue name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: z.object({}),
      },
    ],
} as const
