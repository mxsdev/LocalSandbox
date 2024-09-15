import {
  createIntegration,
  createModelSpecs,
  type IntegrationModel,
  type IntegrationStore,
} from "../integration.js"
import { subscription } from "generated/azure-rest-api-specs/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"
import type { Middleware } from "edgespec"
import { bearerToken } from "lib/util/bearer-token.js"
import { resourceGroup } from "generated/azure-rest-api-specs/resources/resource-manager/Microsoft.Resources/stable/2024-07-01/resources.js"
import { sbNamespace } from "generated/azure-rest-api-specs/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/namespace-preview.js"
import {
  sbQueue,
  sbQueueProperties,
} from "generated/azure-rest-api-specs/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/Queue.js"
import { z } from "zod"
import { Temporal } from "@js-temporal/polyfill"
import { zodTimeout } from "lib/util/timeout.js"
import { AzureServiceBusBroker } from "lib/broker/broker.js"
import { withExternallyPopulatedLogger } from "lib/logger/with-logger.js"
import {
  sbSubscription,
  sbSubscriptionProperties,
} from "generated/azure-rest-api-specs/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/subscriptions.js"
import {
  sbTopic,
  sbTopicProperties,
} from "generated/azure-rest-api-specs/servicebus/resource-manager/Microsoft.ServiceBus/stable/2021-11-01/topics.js"
import { entityStatus } from "generated/azure-rest-api-specs/servicebus/resource-manager/common/v1/definitions.js"
import { getServerEnv, type ServerEnv } from "lib/server/env.js"

export const DEFAULT_SUBSCRIPTION_DISPLAY_NAME =
  "LocalSandbox Test Subscription"
export const DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE =
  "https://localsandbox.io"

const envMiddleware: Middleware<
  {},
  {
    env: ServerEnv
  }
> = async (req, ctx, next) => {
  ctx.env ??= getServerEnv()
  return await next(req, ctx)
}

const bearerAuthMiddleware: Middleware<
  {
    store: IntegrationStore<typeof azure_routes>
    env: ServerEnv
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
    .values({ subscriptionId: subscription_id })
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
    authMiddleware: {
      bearer: bearerAuthMiddleware,
    },
    afterAuthMiddleware: [
      envMiddleware,
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
          let new_timeout: NodeJS.Timeout | undefined

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
        .omit({
          id: true,
          subscriptionPolicies: true,
          displayName: true,
          authorizationSource: true,
          state: true,
        })
        .required()
        .extend(
          subscription.pick({ id: true, subscriptionPolicies: true }).partial()
            .shape,
        )
        .extend({
          displayName: subscription.shape.displayName.default(
            DEFAULT_SUBSCRIPTION_DISPLAY_NAME,
          ),
          authorizationSource: subscription.shape.authorizationSource.default(
            DEFAULT_SUBSCRIPTION_AUTHORIZATION_SOURCE,
          ),
          state: subscription.shape.state.default("Enabled"),
        })
        .transform((v) => ({
          ...v,
          id: `/subscriptions/${v.subscriptionId}`,
        })),
    },
    resource_group: {
      primaryKey: "id",
      schema: resourceGroup
        .omit({ id: true })
        .extend({ id: z.any(), subscription_id: z.string() })
        .transform((v) => ({
          ...v,
          id: `/subscriptions/${v.subscription_id}/resourceGroups/${v.name}`,
        })),
      hasOne: ["subscription"],
    },
    sb_namespace: {
      primaryKey: "id",
      schema: sbNamespace
        .and(
          z.object({
            id: z.any(),
            resource_group_id: z.string(),
            name: z.string(),
          }),
        )
        .transform((v) => ({
          ...v,
          id: `${v.resource_group_id}/providers/Microsoft.ServiceBus/namespaces/${v.name}`,
        })),
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
      schema: sbQueue
        .and(
          z.object({
            type: z
              .literal("Microsoft.ServiceBus/namespaces/queues")
              .optional()
              .default("Microsoft.ServiceBus/namespaces/queues"),
            id: z.any(),
            name: z.string(),
            sb_namespace_id: z.string(),
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
          }),
        )
        .transform((v) => ({
          ...v,
          id: `${v.sb_namespace_id}/queues/${v.name}`,
          properties: {
            ...v.properties,
            createdAt: v.properties.createdAt ?? new Date().toISOString(),
            updatedAt: v.properties.updatedAt ?? new Date().toISOString(),
            accessedAt:
              v.properties.accessedAt ??
              new Date(-62135568422000).toISOString(),
          },
        })),
      hasOne: ["sb_namespace"],
    },
  }),
})

azure_routes.implementRoute(
  "/[tenantId]/v2.0/.well-known/openid-configuration",
  {
    methods: ["GET"],
    auth: "none",
    routeParams: z.object({
      tenantId: z.string(),
    }),
  },
  async (req) => {
    const tenant = req.routeParams.tenantId

    return Response.json({
      issuer: `https://login.microsoftonline.com/${tenant}/v2.0`,
      authorization_endpoint: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`,
      token_endpoint: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
      jwks_uri: `https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`,
      response_modes_supported: ["query", "fragment", "form_post"],
      response_types_supported: [
        "code",
        "id_token",
        "code id_token",
        "token id_token",
        "token",
      ],
      scopes_supported: ["openid", "profile", "email", "offline_access"],
      subject_types_supported: ["pairwise"],
      id_token_signing_alg_values_supported: ["RS256"],
      token_endpoint_auth_methods_supported: [
        "client_secret_post",
        "private_key_jwt",
        "client_secret_basic",
      ],
    })
  },
)
