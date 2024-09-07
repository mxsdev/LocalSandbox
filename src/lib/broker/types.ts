import { Delivery, Sender } from "rhea"
import { azure_routes } from "../integration/azure/routes.js"
import { IntegrationStore } from "../integration/integration.js"

export type BrokerStore = IntegrationStore<typeof azure_routes>

export type QueueModel = BrokerStore["sb_queue"]["_type"] & {
  _model: "sb_queue"
}

export type TopicModel = BrokerStore["sb_topic"]["_type"] & {
  _model: "sb_topic"
}

export type SubscriptionModel = BrokerStore["sb_subscription"]["_type"] & {
  _model: "sb_subscription"
}

export type QueueOrTopicModel = QueueModel | TopicModel
export type QueueOrSubscriptionModel = QueueModel | SubscriptionModel
export type QueueOrTopicOrSubscriptionModel =
  | QueueModel
  | TopicModel
  | SubscriptionModel

export interface QualifiedNamespaceId {
  subscription_id: string
  namespace_name: string
  resource_group_name: string
}

export type SubqueueType = "deadletter"

export interface QualifiedQueueOrTopicId extends QualifiedNamespaceId {
  queue_or_topic_name: string
}

export interface QualifiedQueueOrTopicOrSubscriptionId
  extends QualifiedQueueOrTopicId {
  subscription_name?: string
}

export interface _QualifiedQueueId extends QualifiedNamespaceId {
  queue_name: string
}

export interface _QualifiedTopicId extends QualifiedNamespaceId {
  topic_name: string
}

export interface _QualifiedSubscriptionId extends _QualifiedTopicId {
  subscription_name: string
}

interface _QualifiedQueueIdWithSubqueueType extends _QualifiedQueueId {
  subqueue: SubqueueType | undefined
}

export type QualifiedQueueOrSubscriptionIdWithSubqueueType = (
  | _QualifiedQueueId
  | _QualifiedSubscriptionId
) & {
  subqueue: SubqueueType | undefined
}

export type QualifiedMessageDestinationId = (
  | _QualifiedQueueId
  | _QualifiedTopicId
  | QualifiedQueueOrTopicId
) & {
  subqueue: SubqueueType | undefined
}

export type QualifiedMessageSourceId =
  QualifiedQueueOrSubscriptionIdWithSubqueueType

export type DeliveryTag = Pick<Delivery, "tag"> & Partial<Pick<Delivery, "id">>
export type SenderName = Pick<Sender, "name">
