import { randomUUID } from "node:crypto"
import {
  createIntegration,
  createModelSpecs,
  IntegrationModel,
  IntegrationStore,
} from "../integration.js"
import { subscription } from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"
import { Middleware } from "edgespec"
import { bearerToken } from "../../util/bearer-token.js"
import { resourceGroup } from "../../../../output/resources/resource-manager/Microsoft.Resources/stable/2024-07-01/resources.js"
import { sbNamespace } from "../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/namespace-preview.js"
import {
  sbQueue,
  sbQueueProperties,
} from "../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/Queue.js"
import { z } from "zod"
import { Temporal } from "@js-temporal/polyfill"
import { zodTimeout } from "../../util/timeout.js"
import { AzureServiceBusBroker } from "../../broker/broker.js"
import { withExternallyPopulatedLogger } from "../../logger/with-logger.js"
import {
  sbSubscription,
  sbSubscriptionProperties,
} from "../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/subscriptions.js"
import {
  sbTopic,
  sbTopicProperties,
} from "../../../../output/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/topics.js"
import { entityStatus } from "../../../../output/servicebus/resource-manager/common/v1/definitions.js"

export const DEFAULT_SUBSCRIPTION_DISPLAY_NAME =
  "LocalSandbox Test Subscription"
export const DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE =
  "https://localsandbox.io"

const bearerAuthMiddleware: Middleware<
  {
    store: IntegrationStore<typeof azure_routes>
  },
  {
    subscription: IntegrationModel<typeof azure_routes, "subscription">
  }
> = async (req, ctx, next) => {
  const subscription_id = bearerToken.safeParse(
    req.headers.get("Authorization"),
  ).data

  // TODO: make sure req.routeParams.subscriptionId === subscription_id

  if (!subscription_id) {
    return new Response("Unauthorized", { status: 401 })
  }

  const subscription = ctx.store.subscription
    .insert()
    .values({
      subscriptionId: subscription_id,
      displayName: DEFAULT_SUBSCRIPTION_DISPLAY_NAME,
      authorizationSource: DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE,
      state: "Enabled",
    })
    .onAllConflictDoNothing()
    .executeTakeFirstOrThrow()

  ctx.subscription = subscription

  return await next(req, ctx)
}

const queueOrTopicExcludesDefaults = {
  maxSizeInMegabytes: true,
  requiresDuplicateDetection: true,
  enablePartitioning: true,
  enableExpress: true,
  maxMessageSizeInKilobytes: true,
} as const

const queueOrTopicDefaults = {
  maxSizeInMegabytes: sbQueueProperties.shape.maxSizeInMegabytes.default(1024),
  requiresDuplicateDetection:
    sbQueueProperties.shape.requiresDuplicateDetection.default(false),
  enablePartitioning: sbQueueProperties.shape.enablePartitioning.default(false),
  enableExpress: sbQueueProperties.shape.enableExpress.default(false),
  maxMessageSizeInKilobytes:
    sbQueueProperties.shape.maxMessageSizeInKilobytes.default(256),
} as const satisfies Record<keyof typeof queueOrTopicExcludesDefaults, unknown>

const queueOrSubscriptionExcludesDefaults = {
  maxDeliveryCount: true,
  lockDuration: true,
  requiresSession: true,
  deadLetteringOnMessageExpiration: true,
  duplicateDetectionHistoryTimeWindow: true,
} as const

const queueOrSubscriptionDefaults = {
  maxDeliveryCount: sbQueueProperties.shape.maxDeliveryCount.default(10),
  lockDuration: z
    .string()
    .duration()
    .optional()
    .default("PT1M")
    .refine(
      (serialized) =>
        Temporal.Duration.from(serialized).total({
          unit: "minute",
        }) <= 5,
      // TODO: get this error message accurate to Azure
      "Lock duration cannot exceed 5 minutes",
    ),
  requiresSession: sbQueueProperties.shape.requiresSession.default(false),
  deadLetteringOnMessageExpiration:
    sbQueueProperties.shape.deadLetteringOnMessageExpiration.default(false),
  duplicateDetectionHistoryTimeWindow:
    sbQueueProperties.shape.duplicateDetectionHistoryTimeWindow.default(
      "PT10M",
    ),
} as const satisfies Record<
  keyof typeof queueOrSubscriptionExcludesDefaults,
  unknown
>

const queueLikeExcludesDefaults = {
  defaultMessageTimeToLive: true,
  duplicateDetectionHistoryTimeWindow: true,
  autoDeleteOnIdle: true,
  status: true,
} as const

const queueLikeDefaults = {
  defaultMessageTimeToLive: z.string().duration().optional(),
  duplicateDetectionHistoryTimeWindow: z
    .string()
    .duration()
    .optional()
    .default(Temporal.Duration.from({ minutes: 10 }).toString()),
  autoDeleteOnIdle: z
    .string()
    .duration()
    .optional()
    .refine(
      (serialized) =>
        !serialized ||
        (process.env["LOCALSANDBOX_NO_ENFORCE_SB_AUTO_DELETE_IDLE_MINIMUM"]
          ? true
          : Temporal.Duration.from(serialized).total({
              unit: "minute",
            }) > 5),
      // TODO: get this error message accurate to Azure
      "autoDeleteOnIdle cannot be less than 5 minutes",
    ),
  status: entityStatus.optional().default("Active"),
} as const satisfies Record<keyof typeof queueLikeExcludesDefaults, unknown>

export const azure_routes = createIntegration({
  globalSpec: {
    authMiddleware: {},
    afterAuthMiddleware: [
      bearerAuthMiddleware,
      AzureServiceBusBroker.middleware(),
      withExternallyPopulatedLogger,
    ],
    passErrors: true,
  },
  triggers: {
    sb_queue: {
      change(args) {
        // TODO: support topics, subscriptions too
        if (args.new_val?.autoDeleteTimeout) {
          args.new_val.autoDeleteTimeout.refresh()
        }

        if (
          args.new_val?.properties.autoDeleteOnIdle !==
          args.old_val?.properties.autoDeleteOnIdle
        ) {
          let new_timeout: NodeJS.Timeout | undefined = undefined

          if (args.new_val?.properties.autoDeleteOnIdle) {
            clearTimeout(args.new_val.autoDeleteTimeout)
            new_timeout = setTimeout(() => {
              args.store
                .delete()
                .where((q) => q.id === args.new_val?.id)
                .execute()
            }, Temporal.Duration.from(args.new_val?.properties.autoDeleteOnIdle).total("milliseconds"))
          }

          args.store
            .update()
            .where((q) => q.id === (args.new_val?.id ?? args.old_val?.id))
            .set({
              autoDeleteTimeout: new_timeout,
            })
            .execute()
        }
      },
    },
  },
  models: createModelSpecs({
    subscription: {
      primaryKey: "subscriptionId",
      schema: subscription
        .omit({ id: true, subscriptionPolicies: true })
        .required()
        .extend(
          subscription.pick({ id: true, subscriptionPolicies: true }).partial()
            .shape,
        )
        .transform((v) => ({
          ...v,
          id: v.id ?? `/subscriptions/${v.subscriptionId}`,
        })),
    },
    resource_group: {
      primaryKey: "id",
      schema: resourceGroup.omit({ id: true }).extend({ id: z.string() }),
      hasOne: ["subscription"],
    },
    sb_namespace: {
      primaryKey: "id",
      schema: sbNamespace.and(z.object({ id: z.string() })),
      hasOne: ["resource_group"],
    },
    sb_topic: {
      primaryKey: "id",
      schema: sbTopic.and(
        z.object({
          properties: sbTopicProperties
            .omit({
              ...queueLikeExcludesDefaults,
              ...queueOrTopicExcludesDefaults,
              supportOrdering: true,
            })
            .extend({
              ...queueLikeDefaults,
              ...queueOrTopicDefaults,
              supportOrdering:
                sbTopicProperties.shape.supportOrdering.default(true),
            })
            .default({}),

          autoDeleteTimeout: zodTimeout.optional(),

          id: z.string(),
        }),
      ),
      hasOne: ["sb_namespace"],
    },
    sb_subscription: {
      primaryKey: "id",
      schema: sbSubscription.and(
        z.object({
          properties: sbSubscriptionProperties
            .omit({
              ...queueLikeExcludesDefaults,
              ...queueOrSubscriptionExcludesDefaults,
            })
            .extend({
              ...queueLikeDefaults,
              ...queueOrSubscriptionDefaults,
            })
            .default({}),

          autoDeleteTimeout: zodTimeout.optional(),

          id: z.string(),
        }),
      ),
      hasOne: ["sb_topic"],
    },
    sb_queue: {
      primaryKey: "id",
      schema: sbQueue.and(
        z.object({
          properties: sbQueueProperties
            .omit({
              ...queueLikeExcludesDefaults,
              ...queueOrSubscriptionExcludesDefaults,
              ...queueOrTopicExcludesDefaults,
            })
            .extend({
              ...queueLikeDefaults,
              ...queueOrSubscriptionDefaults,
              ...queueOrTopicDefaults,
            })
            .default({}),

          autoDeleteTimeout: zodTimeout.optional(),

          id: z.string(),
        }),
      ),
      hasOne: ["sb_namespace"],
    },
  }),
})
