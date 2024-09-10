import { type Logger, P } from "pino"
import type {
  _QualifiedQueueId,
  _QualifiedSubscriptionId,
  _QualifiedTopicId,
  BrokerStore,
  QualifiedQueueOrTopicId,
  QualifiedQueueOrTopicOrSubscriptionId,
  QueueModel,
  QueueOrSubscriptionModel,
  QueueOrTopicModel,
  QueueOrTopicOrSubscriptionModel,
  SubscriptionModel,
  TopicModel,
} from "./types.js"
import { Message } from "rhea"
import { Temporal } from "@js-temporal/polyfill"

export const getQueueOrTopicOrSubscriptionFromStoreOrThrow = (
  ...args: Parameters<typeof getQueueOrTopicOrSubscriptionFromStore>
) => {
  const [queueId, _, logger] = args

  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find queue or subscription",
    )

    return new Error(`Queue or subscription not found`)
  }

  const res = getQueueOrTopicOrSubscriptionFromStore(...args)

  if (!res) {
    throw err()
  }

  return res
}

const getQueueOrTopicOrSubscriptionFromStore = (
  queueId: QualifiedQueueOrTopicOrSubscriptionId | string,
  store: BrokerStore,
  logger: Logger | undefined,
): QueueOrTopicOrSubscriptionModel | undefined => {
  if (typeof queueId === "string" || queueId.subscription_id) {
    const subscription = getSubscriptionFromStore(
      typeof queueId === "string"
        ? queueId
        : {
            ...queueId,
            topic_name: queueId.queue_or_topic_name,
            subscription_name: queueId.subscription_name!,
          },
      store,
      logger,
    )

    if (subscription) {
      return subscription
    }
  }

  // TODO: error message should say "queue or topic or subscription"
  return getMessageDestinationFromStore(queueId, store, logger)
}

export const getMessageSourceFromStoreOrThrow = (
  ...args: Parameters<typeof getMessageSourceFromStore>
) => {
  const [queueId, _, logger] = args

  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find queue or subscription",
    )

    return new Error(`Queue or subscription not found`)
  }

  const res = getMessageSourceFromStore(...args)

  if (!res) {
    throw err()
  }

  return res
}

const getMessageSourceFromStore = (
  queueId: _QualifiedQueueId | _QualifiedSubscriptionId | string,
  store: BrokerStore,
  logger: Logger | undefined,
): QueueOrSubscriptionModel | undefined => {
  if (typeof queueId === "string" || "queue_name" in queueId) {
    const res = getQueueFromStore(
      typeof queueId === "object" ? queueId : queueId,
      store,
      logger,
    )

    if (res) {
      return res
    }
  }

  if (typeof queueId === "string" || "subscription_name" in queueId) {
    const res = getSubscriptionFromStore(
      typeof queueId === "object" ? queueId : queueId,
      store,
      logger,
    )

    if (res) {
      return res
    }
  }

  return undefined
}

export const getMessageDestinationFromStoreOrThrow = (
  ...args: Parameters<typeof getMessageDestinationFromStore>
) => {
  const [queueId, _, logger] = args

  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find queue or topic",
    )

    return new Error(`Queue not found`)
  }

  const res = getMessageDestinationFromStore(...args)

  if (!res) {
    throw err()
  }

  return res
}

const getMessageDestinationFromStore = (
  queueId:
    | QualifiedQueueOrTopicId
    | _QualifiedQueueId
    | _QualifiedTopicId
    | string,
  store: BrokerStore,
  logger: Logger | undefined,
): QueueOrTopicModel | undefined => {
  if (
    typeof queueId === "string" ||
    "queue_name" in queueId ||
    "queue_or_topic_name" in queueId
  ) {
    const res = getQueueFromStore(
      typeof queueId === "object"
        ? "queue_name" in queueId
          ? queueId
          : { ...queueId, queue_name: queueId.queue_or_topic_name }
        : queueId,
      store,
      logger,
    )

    if (res) {
      return res
    }
  }

  if (
    typeof queueId === "string" ||
    "topic_name" in queueId ||
    "queue_or_topic_name" in queueId
  ) {
    const res = getTopicFromStore(
      typeof queueId === "object"
        ? "topic_name" in queueId
          ? queueId
          : { ...queueId, topic_name: queueId.queue_or_topic_name }
        : queueId,
      store,
      logger,
    )

    if (res) {
      return res
    }
  }

  return undefined
}

export const getQueueFromStoreOrThrow = (
  queueId: _QualifiedQueueId | string,
  store: BrokerStore,
  logger: Logger | undefined,
) => {
  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find queue",
    )

    return new Error(`Queue not found`)
  }

  const queue = getQueueFromStore(queueId, store, logger)

  if (!queue) {
    throw err()
  }

  return queue
}

const getQueueFromStore = (
  queueId: _QualifiedQueueId | string,
  store: BrokerStore,
  _logger: Logger | undefined,
): QueueModel | undefined => {
  if (typeof queueId === "string") {
    const queue = store.sb_queue.get(queueId)
    return queue ? { ...queue, _model: "sb_queue" } : undefined
  }

  const { namespace_name, queue_name, resource_group_name, subscription_id } =
    queueId

  const queue = store.sb_queue
    .select()
    .where((queue) => queue.name === queue_name)
    .where((queue) => queue.sb_namespace().name === namespace_name)
    .where(
      (queue) =>
        queue.sb_namespace().resource_group().name === resource_group_name,
    )
    .where(
      (queue) =>
        queue.sb_namespace().resource_group().subscription().subscriptionId ===
        subscription_id,
    )
    .executeTakeFirst()

  return queue ? { ...queue, _model: "sb_queue" } : undefined
}

export const getTopicFromStoreOrThrow = (
  queueId: _QualifiedTopicId | string,
  store: BrokerStore,
  logger: Logger | undefined,
): TopicModel => {
  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find topic",
    )

    return new Error(
      `Topic not found: ${typeof queueId === "object" ? queueId.topic_name : queueId}`,
    )
  }

  const result = getTopicFromStore(queueId, store, logger)

  if (!result) {
    throw err()
  }

  return result
}

const getTopicFromStore = (
  queueId: _QualifiedTopicId | string,
  store: BrokerStore,
  _logger: Logger | undefined,
): TopicModel | undefined => {
  if (typeof queueId === "string") {
    const topic = store.sb_topic.get(queueId)

    return topic
      ? {
          ...topic,
          _model: "sb_topic",
        }
      : undefined
  }

  const { namespace_name, topic_name, resource_group_name, subscription_id } =
    queueId

  const topic = store.sb_topic
    .select()
    .where((topic) => topic.name === topic_name)
    .where((topic) => topic.sb_namespace().name === namespace_name)
    .where(
      (topic) =>
        topic.sb_namespace().resource_group().name === resource_group_name,
    )
    .where(
      (topic) =>
        topic.sb_namespace().resource_group().subscription().subscriptionId ===
        subscription_id,
    )
    .executeTakeFirst()

  return topic ? { ...topic, _model: "sb_topic" } : undefined
}

export const getSubscriptionFromStoreOrThrow = (
  queueId: _QualifiedSubscriptionId | string,
  store: BrokerStore,
  logger: Logger | undefined,
) => {
  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find subscription",
    )

    return new Error(
      `Susbcription not found: ${typeof queueId === "object" ? queueId.subscription_name : queueId}`,
    )
  }

  const result = getSubscriptionFromStore(queueId, store, logger)

  if (!result) {
    throw err()
  }

  return result
}

const getSubscriptionFromStore = (
  queueId: _QualifiedSubscriptionId | string,
  store: BrokerStore,
  _logger: Logger | undefined,
): SubscriptionModel | undefined => {
  if (typeof queueId === "string") {
    const sub = store.sb_subscription.get(queueId)

    return sub
      ? {
          ...sub,
          _model: "sb_subscription",
        }
      : undefined
  }

  const {
    namespace_name,
    topic_name,
    subscription_name,
    resource_group_name,
    subscription_id,
  } = queueId

  const subscription = store.sb_subscription
    .select()
    .where((subscription) => subscription.name === subscription_name)
    .where((subscription) => subscription.sb_topic().name === topic_name)
    .where(
      (subscription) =>
        subscription.sb_topic().sb_namespace().name === namespace_name,
    )
    .where(
      (subscription) =>
        subscription.sb_topic().sb_namespace().resource_group().name ===
        resource_group_name,
    )
    .where(
      (subscription) =>
        subscription.sb_topic().sb_namespace().resource_group().subscription()
          .subscriptionId === subscription_id,
    )
    .executeTakeFirst()

  return subscription
    ? { ...subscription, _model: "sb_subscription" }
    : undefined
}

export function getQualifiedIdFromModel(model: QueueModel): _QualifiedQueueId
export function getQualifiedIdFromModel(model: TopicModel): _QualifiedTopicId
export function getQualifiedIdFromModel(
  model: SubscriptionModel,
): _QualifiedSubscriptionId
export function getQualifiedIdFromModel(
  model: QueueOrTopicOrSubscriptionModel,
): _QualifiedQueueId | _QualifiedSubscriptionId | _QualifiedTopicId
export function getQualifiedIdFromModel(
  model: QueueOrTopicOrSubscriptionModel,
): _QualifiedQueueId | _QualifiedSubscriptionId | _QualifiedTopicId {
  const namespace =
    model._model === "sb_queue" || model._model === "sb_topic"
      ? model.sb_namespace()
      : model.sb_topic().sb_namespace()
  const resource_group = namespace.resource_group()
  const subscription = resource_group.subscription()

  const base = {
    namespace_name: namespace.name!,
    resource_group_name: resource_group.name!,
    subscription_id: subscription.subscriptionId,
  }

  switch (model._model) {
    case "sb_queue": {
      return {
        ...base,
        queue_name: model.name!,
      }
    }

    case "sb_topic": {
      return {
        ...base,
        topic_name: model.name!,
      }
    }

    case "sb_subscription": {
      return {
        ...base,
        subscription_name: model.name!,
        topic_name: model.sb_topic().name!,
      }
    }
  }
}

export const isQualifiedQueueId = <T extends object>(
  val: T,
): val is Extract<T, { queue_name: string }> => {
  return "queue_name" in val
}

export const isQualifiedSubscriptionId = <T extends object>(
  val: T,
): val is Extract<T, { topic_name: string; subscription_name: string }> => {
  return "topic_name" in val && "subscription_name" in val
}

export const isQualifiedTopicId = <T extends object>(
  val: T,
): val is Exclude<
  Extract<T, { topic_name: string }>,
  { subscription_name: never }
> => {
  return "topic_name" in val && !("subscription_name" in val)
}

export const isQualifiedTopicOrQueueId = <T extends object>(
  val: T,
): val is Extract<T, { queue_or_topic_name: string }> => {
  return "queue_or_topic_name" in val
}

export const isQualifiedMessageDestinationId = <T extends object>(val: T) => {
  return isQualifiedQueueId(val) || isQualifiedTopicId(val)
}

export const isQualifiedMessageSourceId = <T extends object>(val: T) => {
  return isQualifiedQueueId(val) || isQualifiedSubscriptionId(val)
}
