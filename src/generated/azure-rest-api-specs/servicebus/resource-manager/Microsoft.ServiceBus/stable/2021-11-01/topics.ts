import { z } from "zod"
import {
  systemData,
  messageCountDetails,
  entityStatus,
} from "../../../common/v1/definitions.js"
import { proxyResource } from "../../../common/v2/definitions.js"

export const sbTopicProperties = z
  .object({
    sizeInBytes: z
      .number()
      .int()
      .describe("Size of the topic, in bytes.")
      .readonly()
      .optional(),
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe("Exact time the message was created.")
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
        "Last time the message was sent, or a request was received, for this topic.",
      )
      .readonly()
      .optional(),
    subscriptionCount: z
      .number()
      .int()
      .describe("Number of subscriptions.")
      .readonly()
      .optional(),
    countDetails: messageCountDetails.optional(),
    defaultMessageTimeToLive: z
      .string()
      .duration()
      .describe(
        "ISO 8601 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.",
      )
      .optional(),
    maxSizeInMegabytes: z
      .number()
      .int()
      .describe(
        "Maximum size of the topic in megabytes, which is the size of the memory allocated for the topic. Default is 1024.",
      )
      .optional(),
    maxMessageSizeInKilobytes: z
      .number()
      .int()
      .describe(
        "Maximum size (in KB) of the message payload that can be accepted by the topic. This property is only used in Premium today and default is 1024.",
      )
      .optional(),
    requiresDuplicateDetection: z
      .boolean()
      .describe("Value indicating if this topic requires duplicate detection.")
      .optional(),
    duplicateDetectionHistoryTimeWindow: z
      .string()
      .duration()
      .describe(
        "ISO8601 timespan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.",
      )
      .optional(),
    enableBatchedOperations: z
      .boolean()
      .describe(
        "Value that indicates whether server-side batched operations are enabled.",
      )
      .optional(),
    status: entityStatus.optional(),
    supportOrdering: z
      .boolean()
      .describe("Value that indicates whether the topic supports ordering.")
      .optional(),
    autoDeleteOnIdle: z
      .string()
      .duration()
      .describe(
        "ISO 8601 timespan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.",
      )
      .optional(),
    enablePartitioning: z
      .boolean()
      .describe(
        "Value that indicates whether the topic to be partitioned across multiple message brokers is enabled.",
      )
      .optional(),
    enableExpress: z
      .boolean()
      .describe(
        "Value that indicates whether Express Entities are enabled. An express topic holds a message in memory temporarily before writing it to persistent storage.",
      )
      .optional(),
  })
  .describe("The Topic Properties definition.")

export const sbTopic = z
  .object({
    properties: sbTopicProperties.optional(),
    systemData: systemData.optional(),
  })
  .and(proxyResource)
  .describe("Description of topic resource.")

export const sbTopicListResult = z
  .object({
    value: z
      .array(sbTopic)
      .describe("Result of the List Topics operation.")
      .optional(),
    nextLink: z
      .string()
      .describe(
        "Link to the next set of results. Not empty if Value contains incomplete list of topics.",
      )
      .optional(),
  })
  .describe("The response to the List Topics operation.")

export default {
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics":
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
        jsonResponse: sbTopicListResult.describe(
          "Successfully retrieved list of topics.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]":
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
          topicName: z.string().describe("The topic name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: sbTopic.describe(
          "Parameters supplied to create a topic resource.",
        ),
        jsonResponse: sbTopic.describe("Topic successfully created."),
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
          topicName: z.string().describe("The topic name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: sbTopic.describe(
          "Topic description successfully retrieved.",
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
          topicName: z.string().describe("The topic name."),
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
