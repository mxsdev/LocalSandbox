import { z } from "zod"
import {
  systemData,
  messageCountDetails,
  entityStatus,
} from "../../../common/v1/definitions.js"
import { proxyResource } from "../../../common/v2/definitions.js"

export const sbClientAffineProperties = z
  .object({
    clientId: z
      .string()
      .describe(
        "Indicates the Client ID of the application that created the client-affine subscription.",
      )
      .optional(),
    isDurable: z
      .boolean()
      .describe(
        "For client-affine subscriptions, this value indicates whether the subscription is durable or not.",
      )
      .optional(),
    isShared: z
      .boolean()
      .describe(
        "For client-affine subscriptions, this value indicates whether the subscription is shared or not.",
      )
      .optional(),
  })
  .describe("Properties specific to client affine subscriptions.")

export const sbSubscriptionProperties = z
  .object({
    messageCount: z
      .number()
      .int()
      .describe("Number of messages.")
      .readonly()
      .optional(),
    createdAt: z
      .string()
      .datetime({ offset: true })
      .describe("Exact time the message was created.")
      .readonly()
      .optional(),
    accessedAt: z
      .string()
      .datetime({ offset: true })
      .describe("Last time there was a receive request to this subscription.")
      .readonly()
      .optional(),
    updatedAt: z
      .string()
      .datetime({ offset: true })
      .describe("The exact time the message was updated.")
      .readonly()
      .optional(),
    countDetails: messageCountDetails.optional(),
    lockDuration: z
      .string()
      .duration()
      .describe(
        "ISO 8061 lock duration timespan for the subscription. The default value is 1 minute.",
      )
      .optional(),
    requiresSession: z
      .boolean()
      .describe(
        "Value indicating if a subscription supports the concept of sessions.",
      )
      .optional(),
    defaultMessageTimeToLive: z
      .string()
      .duration()
      .describe(
        "ISO 8061 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.",
      )
      .optional(),
    deadLetteringOnFilterEvaluationExceptions: z
      .boolean()
      .describe(
        "Value that indicates whether a subscription has dead letter support on filter evaluation exceptions.",
      )
      .optional(),
    deadLetteringOnMessageExpiration: z
      .boolean()
      .describe(
        "Value that indicates whether a subscription has dead letter support when a message expires.",
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
      .describe("Number of maximum deliveries.")
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
        "ISO 8061 timeSpan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.",
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
    isClientAffine: z
      .boolean()
      .describe(
        "Value that indicates whether the subscription has an affinity to the client id.",
      )
      .optional(),
    clientAffineProperties: sbClientAffineProperties.optional(),
  })
  .describe("Description of Subscription Resource.")

export const sbSubscription = z
  .object({
    properties: sbSubscriptionProperties.optional(),
    systemData: systemData.optional(),
  })
  .and(proxyResource)
  .describe("Description of subscription resource.")

export const sbSubscriptionListResult = z
  .object({
    value: z
      .array(sbSubscription)
      .describe("Result of the List Subscriptions operation.")
      .optional(),
    nextLink: z
      .string()
      .describe(
        "Link to the next set of results. Not empty if Value contains incomplete list of subscriptions.",
      )
      .optional(),
  })
  .describe("The response to the List Subscriptions operation.")

export default {
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions":
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
          topicName: z.string().describe("The topic name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: sbSubscriptionListResult.describe(
          "Successfully retrieved list of subscriptions.",
        ),
      },
    ],
  "/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions/[subscriptionName]":
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
          subscriptionName: z.string().describe("The subscription name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonBody: sbSubscription.describe(
          "Parameters supplied to create a subscription resource.",
        ),
        jsonResponse: sbSubscription.describe(
          "Subscription create request accepted.",
        ),
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
          subscriptionName: z.string().describe("The subscription name."),
          subscriptionId: z
            .string()
            .describe(
              "Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.",
            ),
        }),
        jsonResponse: sbSubscription.describe(
          "Successfully retrieved subscription description.",
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
          subscriptionName: z.string().describe("The subscription name."),
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
