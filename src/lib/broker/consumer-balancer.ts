import type { Delivery, Message, Sender } from "rhea"
import {
  BrokerQueue,
  BrokerSubscription,
  BrokerTopic,
  MessageSequence,
} from "./queue.js"
import { Logger } from "pino"
import {
  ParsedTypedRheaMessage,
  ParsedTypedRheaMessageWithId,
} from "../amqp/parse-message.js"
import objectHash from "object-hash"
import Long from "long"
import { Constants } from "@azure/core-amqp"
import {
  BufferLikeEncodedLong,
  unserializedLongToArrayLike,
  unserializedLongToBufferLike,
} from "../util/long.js"
import { Temporal } from "@js-temporal/polyfill"
import {
  _QualifiedQueueId,
  BrokerStore,
  QualifiedMessageDestinationId,
  QualifiedMessageSourceId,
  SubqueueType,
  SubscriptionModel,
} from "./types.js"
import {
  getMessageDestinationFromStoreOrThrow,
  getMessageSourceFromStoreOrThrow,
  getQueueFromStoreOrThrow,
  isQualifiedMessageDestinationId,
  isQualifiedTopicId,
  isQualifiedTopicOrQueueId,
  populateMessageWithDefaultExpiryTime,
} from "./util.js"

type Queue = BrokerQueue<ParsedTypedRheaMessageWithId>
type Topic = BrokerTopic<ParsedTypedRheaMessageWithId>
type Subscription = BrokerSubscription<ParsedTypedRheaMessageWithId>

export class BrokerConsumerBalancer {
  private _queues: Record<string, Queue> = {}
  private _topics: Record<string, Topic> = {}
  private _subscriptions: Record<string, Subscription> = {}

  constructor(
    private readonly store: BrokerStore,
    private readonly logger?: Logger,
  ) {}

  messageSourceMessageCount(queueId: QualifiedMessageSourceId | string) {
    const message_source = this.getMessageSourceFromStoreOrThrow(queueId)

    return (
      this.getOrCreateMessageSource(message_source, undefined).messageCount +
      this.getOrCreateMessageSource(message_source, "deadletter").messageCount
    )
  }

  messageDestinationMessageCountDetails(
    queueId: QualifiedMessageDestinationId | string,
  ) {
    return this.getOrCreateMessageDestination(
      this.getMessageDestinationFromStoreOrThrow(queueId),
    ).messageCountDetails
  }

  messageSourceMessageCountDetails(queueId: QualifiedMessageSourceId | string) {
    return this.getOrCreateMessageSource(
      this.getMessageSourceFromStoreOrThrow(queueId),

      // TODO: should DLQ stats be included in overall count??
      typeof queueId === "object" ? queueId.subqueue : undefined,
    ).messageCountDetails
  }

  removeConsumers(where: (consumer: Sender) => boolean) {
    Object.values(this._queues).forEach((q) => q.removeConsumers(where))
  }

  renewLock(
    queueId: QualifiedMessageSourceId,
    ...args: Parameters<MessageSequence<any>["renewLock"]>
  ) {
    const queue = this.getMessageSourceFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreateMessageSource(queue, queueId.subqueue)
    return broker_queue.renewLock(...args)
  }

  updateConsumerDisposition(
    queueId: QualifiedMessageSourceId,
    ...args: Parameters<MessageSequence<any>["updateConsumerDisposition"]>
  ) {
    const queue = this.getMessageSourceFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreateMessageSource(queue, queueId.subqueue)
    broker_queue.updateConsumerDisposition(...args)
  }

  add(qualifiedQueueId: QualifiedMessageSourceId, sender: Sender) {
    // ensure queue exists
    const queue = getMessageSourceFromStoreOrThrow(
      qualifiedQueueId,
      this.store,
      this.logger,
    )

    this.getOrCreateMessageSource(queue, qualifiedQueueId.subqueue).addConsumer(
      sender,
    )
  }

  peekMessageFromQueue(
    queueId: QualifiedMessageSourceId,
    messageCount: number,
    session_id: string | undefined,
  ) {
    // TODO: handle when queue is deleted more gracefully
    const queue = this.getMessageSourceFromStoreOrThrow(queueId)

    return this.getOrCreateMessageSource(queue, queueId.subqueue).peekMessages(
      messageCount,
      session_id,
    )
  }

  consumeDeferredMessages(
    queueId: QualifiedMessageSourceId,
    ...sequenceIds: Long[]
  ) {
    const queue = this.getMessageSourceFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreateMessageSource(queue, queueId.subqueue)

    return sequenceIds
      .map((sequenceId) => broker_queue.consumeDeferredMessage(sequenceId))
      .filter((v): v is Exclude<typeof v, undefined> => !!v)
  }

  sendMessagesToQueue(
    queueId: QualifiedMessageDestinationId,
    ...message: ParsedTypedRheaMessageWithId[]
  ): BufferLikeEncodedLong[] {
    // TODO: handle when queue is deleted more gracefully
    const queue = this.getMessageDestinationFromStoreOrThrow(queueId)

    const messages = message.map((m) => {
      // const sequence_number = this.allocateSequenceNumber()
      const msg = m as Message

      if (queue.properties.defaultMessageTimeToLive) {
        populateMessageWithDefaultExpiryTime(
          msg,
          queue.properties.defaultMessageTimeToLive,
        )
      }

      m["delivery_count"] ??= 0

      return m
    })

    const result_messages = this.getOrCreateMessageDestination(
      queue,
    ).scheduleMessages(...messages)

    const sequence_numbers = result_messages.map(
      (m) => m.message_annotations[Constants.sequenceNumber],
    )

    // TODO: dedupe sequence numbers

    this.logger?.debug({ sequence_numbers }, "assigned sequence numbers")

    return sequence_numbers
  }

  cancelScheduledMessage(
    queueId: QualifiedMessageSourceId | QualifiedMessageDestinationId,
    sequence_number: Long,
  ) {
    if (isQualifiedTopicId(queueId) || isQualifiedTopicOrQueueId(queueId)) {
      const topic_or_queue = this.getOrCreateMessageDestination(
        this.getMessageDestinationFromStoreOrThrow(queueId),
      )

      return topic_or_queue.cancelScheduledMessage(sequence_number)
    } else {
      return this.getOrCreateMessageSource(
        this.getMessageSourceFromStoreOrThrow(queueId),
        queueId.subqueue,
      ).cancelScheduledMessage(sequence_number)
    }
  }

  remove(sender: Sender) {
    // delete this.consumers[sender.name]
    this.removeSenderFromAll(sender)
  }

  setSequenceNumber(queue: _QualifiedQueueId, sequence_number: Long) {
    // TODO: introduce public method for this purpose
    this.getOrCreateQueue(this.getQueueFromStoreOrThrow(queue).id, undefined)[
      "parent"
    ]["sequence_number_factory"]["next_sequence_number"] = sequence_number
  }

  private getOrCreateMessageDestination(
    queue: { id: string; _model: "sb_queue" | "sb_topic" },
    // subqueue: SubqueueType | undefined,
  ) {
    switch (queue._model) {
      case "sb_queue": {
        return this.getOrCreateQueue(queue.id, undefined)
      }

      case "sb_topic": {
        return this.getOrCreateTopic(queue.id)
      }
    }
  }

  getOrCreateMessageSource(
    queue:
      | { id: string; _model: "sb_queue" }
      | { id: string; _model: "sb_subscription"; sb_topic_id: string },
    subqueue: SubqueueType | undefined,
  ) {
    switch (queue._model) {
      case "sb_queue": {
        return this.getOrCreateQueue(queue.id, subqueue)
      }

      case "sb_subscription": {
        return this.getOrCreateSubscription(
          queue.id,
          queue.sb_topic_id,
          subqueue,
        )
      }
    }
  }

  private getOrCreateQueue(
    queueId: string,
    subqueue: SubqueueType | undefined,
  ) {
    if (this._queues[queueId]) {
      return this._queues[queueId].get(subqueue)
    } else {
      const queue = new BrokerQueue(this.store, queueId, this.logger, this)
      this._queues[queueId] = queue
      return queue.get(subqueue)
    }
  }

  private getOrCreateSubscription(
    subscriptionId: string,
    topicId: string,
    subqueue: SubqueueType | undefined,
  ) {
    const topic = this.getOrCreateTopic(topicId)
    const subscription = topic.getSubscription(subscriptionId)

    if (!subscription) {
      this.logger?.error(
        { subscriptionId, topicId },
        "Could not find subscription",
      )

      throw new Error("Could not find subscription")
    }

    return subscription.get(subqueue)
  }

  private getOrCreateTopic(topicId: string) {
    if (this._topics[topicId]) {
      return this._topics[topicId]
    } else {
      const topic = new BrokerTopic(this.store, topicId, this.logger, this)
      this._topics[topicId] = topic
      return topic
    }
  }

  private delete(queueId: string) {
    const queue = this._queues[queueId]
    if (!queue) return

    queue.close()
    delete this._queues[queueId]
  }

  private removeSenderFromAll(sender: Sender) {
    Object.values(this._queues).forEach((q) =>
      q.removeConsumers((s) => s.name === sender.name),
    )
  }

  close() {
    Object.keys(this._queues).forEach(this.delete.bind(this))
  }

  private getMessageDestinationFromStoreOrThrow(
    queueId: string | QualifiedMessageDestinationId,
  ) {
    // TODO: cache this
    const message_destination = getMessageDestinationFromStoreOrThrow(
      queueId,
      this.store,
      this.logger,
    )

    return message_destination
  }

  private getMessageSourceFromStoreOrThrow(
    queueId: string | QualifiedMessageSourceId,
  ) {
    // TODO: cache this
    const message_source = getMessageSourceFromStoreOrThrow(
      queueId,
      this.store,
      this.logger,
    )

    return message_source
  }

  private getQueueFromStoreOrThrow(queueId: string | _QualifiedQueueId) {
    return getQueueFromStoreOrThrow(queueId, this.store, this.logger)
  }
}
