import { Logger, P } from "pino"
import {
  _QualifiedQueueId,
  _QualifiedSubscriptionId,
  _QualifiedTopicId,
  BrokerStore,
  QualifiedQueueOrTopicId,
  QualifiedQueueOrTopicOrSubscriptionId,
  QueueModel,
  QueueOrTopicModel,
  QueueOrTopicOrSubscriptionModel,
  SubscriptionModel,
  TopicModel,
} from "./types.js"

export const getQueueOrTopicOrSubscriptionFromStoreOrThrow = (
  queueId: QualifiedQueueOrTopicOrSubscriptionId | string,
  store: BrokerStore,
  logger: Logger | undefined,
): QueueOrTopicOrSubscriptionModel => {
  if (typeof queueId === "string" || queueId.subscription_id) {
    try {
      return getSubscriptionFromStoreOrThrow(
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
    } catch {
      // TODO: make sure this is an expected error
    }
  }

  // TODO: error message should say "queue or topic or subscription"
  return getMessageDestinationFromStoreOrThrow(queueId, store, logger)
}

export const getMessageSourceFromStoreOrThrow = (
  queueId: _QualifiedQueueId | _QualifiedSubscriptionId | string,
  store: BrokerStore,
  logger: Logger | undefined,
) => {
  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find queue or subscription",
    )

    return new Error(`Queue or subscription not found`)
  }

  if (typeof queueId === "string" || "queue_name" in queueId) {
    try {
      return getQueueFromStoreOrThrow(
        typeof queueId === "object" ? queueId : queueId,
        store,
        logger,
      )
    } catch {
      // TODO: make sure this is an expected error
    }
  }

  if (typeof queueId === "string" || "subscription_name" in queueId) {
    try {
      return getSubscriptionFromStoreOrThrow(
        typeof queueId === "object" ? queueId : queueId,
        store,
        logger,
      )
    } catch {
      // TODO: make sure this is an expected error
    }
  }

  throw err()
}

export const getMessageDestinationFromStoreOrThrow = (
  queueId:
    | QualifiedQueueOrTopicId
    | _QualifiedQueueId
    | _QualifiedTopicId
    | string,
  store: BrokerStore,
  logger: Logger | undefined,
): QueueOrTopicModel => {
  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find queue or topic",
    )

    return new Error(`Queue not found`)
  }

  if (
    typeof queueId === "string" ||
    "queue_name" in queueId ||
    "queue_or_topic_name" in queueId
  ) {
    try {
      return getQueueFromStoreOrThrow(
        typeof queueId === "object"
          ? "queue_name" in queueId
            ? queueId
            : { ...queueId, queue_name: queueId.queue_or_topic_name }
          : queueId,
        store,
        logger,
      )
    } catch {
      // TODO: make sure this is an expected error
    }
  }

  if (
    typeof queueId === "string" ||
    "topic_name" in queueId ||
    "queue_or_topic_name" in queueId
  ) {
    try {
      return getTopicFromStoreOrThrow(
        typeof queueId === "object"
          ? "topic_name" in queueId
            ? queueId
            : { ...queueId, topic_name: queueId.queue_or_topic_name }
          : queueId,
        store,
        logger,
      )
    } catch {
      // TODO: make sure this is an expected error
    }
  }

  throw err()
}

export const getQueueFromStoreOrThrow = (
  queueId: _QualifiedQueueId | string,
  store: BrokerStore,
  logger: Logger | undefined,
): QueueModel => {
  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find queue",
    )

    return new Error(`Queue not found: ${queue_name}`)
  }

  if (typeof queueId === "string") {
    return { ...store.sb_queue.getOrThrow(queueId, err), _model: "sb_queue" }
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
    .executeTakeFirstOrThrow(err)

  return { ...queue, _model: "sb_queue" }
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

  if (typeof queueId === "string") {
    return {
      ...store.sb_topic.getOrThrow(queueId, err),
      _model: "sb_topic",
    }
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
    .executeTakeFirstOrThrow(err)

  return { ...topic, _model: "sb_topic" }
}

export const getSubscriptionFromStoreOrThrow = (
  queueId: _QualifiedSubscriptionId | string,
  store: BrokerStore,
  logger: Logger | undefined,
): SubscriptionModel => {
  const err = () => {
    logger?.error(
      { ...(typeof queueId === "object" ? queueId : { queueId }) },
      "Could not find subscription",
    )

    return new Error(
      `Susbcription not found: ${typeof queueId === "object" ? queueId.subscription_name : queueId}`,
    )
  }

  if (typeof queueId === "string") {
    return {
      ...store.sb_subscription.getOrThrow(queueId, err),
      _model: "sb_subscription",
    }
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
    .executeTakeFirstOrThrow(err)

  return { ...subscription, _model: "sb_subscription" }
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

export const isQualifiedMessageDestinationId = <T extends object>(val: T) => {
  return isQualifiedQueueId(val) || isQualifiedTopicId(val)
}

export const isQualifiedMessageSourceId = <T extends object>(val: T) => {
  return isQualifiedQueueId(val) || isQualifiedSubscriptionId(val)
}
