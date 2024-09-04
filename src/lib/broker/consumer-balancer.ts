import type { Delivery, Message, Sender } from "rhea"
import type {
  BrokerStore,
  QualifiedNamespaceId,
  QualifiedQueueId,
  QualifiedQueueIdWithSubqueueType,
  SubqueueType,
} from "./broker.js"
import {
  BrokerQueue,
  DeliveryTag,
  MessageSequence,
  SenderName,
} from "./queue.js"
import { getPeerQueue, getQueueFromStoreOrThrow } from "./util.js"
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

export class BrokerConsumerBalancer {
  private _queues: Record<string, BrokerQueue<ParsedTypedRheaMessageWithId>> =
    {}

  constructor(
    private readonly store: BrokerStore,
    private readonly logger?: Logger,
  ) {}

  queueMessageCount(queueId: QualifiedQueueIdWithSubqueueType) {
    return this.getOrCreate(
      this.getQueueFromStoreOrThrow(queueId).id,
      queueId.subqueue,
    ).messageCount
  }

  queueMessageCountDetails(queueId: QualifiedQueueIdWithSubqueueType) {
    return this.getOrCreate(
      this.getQueueFromStoreOrThrow(queueId).id,
      queueId.subqueue,
    ).messageCountDetails
  }

  removeConsumers(where: (consumer: Sender) => boolean) {
    Object.values(this._queues).forEach((q) => q.removeConsumers(where))
  }

  renewLock(
    queueId: QualifiedQueueIdWithSubqueueType,
    ...args: Parameters<MessageSequence<any>["renewLock"]>
  ) {
    const queue = this.getQueueFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreate(queue.id, queueId.subqueue)
    return broker_queue.renewLock(...args)
  }

  updateConsumerDisposition(
    queueId: QualifiedQueueIdWithSubqueueType,
    ...args: Parameters<MessageSequence<any>["updateConsumerDisposition"]>
  ) {
    const queue = this.getQueueFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreate(queue.id, queueId.subqueue)
    broker_queue.updateConsumerDisposition(...args)
  }

  add(
    qualifiedQueueId: QualifiedQueueIdWithSubqueueType,
    sender: Sender,
    sender_name?: string,
  ) {
    // ensure queue exists
    const queue = getQueueFromStoreOrThrow(
      qualifiedQueueId,
      this.store,
      this.logger,
    )

    this.addSenderToQueue(sender, queue.id, qualifiedQueueId.subqueue)
  }

  peekMessageFromQueue(
    queueId: QualifiedQueueIdWithSubqueueType,
    messageCount: number,
  ) {
    // TODO: handle when queue is deleted more gracefully
    const queue = this.getQueueFromStoreOrThrow(queueId)

    return this.getOrCreate(queue.id, queueId.subqueue).peekMessages(
      messageCount,
    )
  }

  consumeDeferredMessages(
    queueId: QualifiedQueueIdWithSubqueueType,
    ...sequenceIds: Long[]
  ) {
    const queue = this.getQueueFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreate(queue.id, queueId.subqueue)

    return sequenceIds
      .map((sequenceId) => broker_queue.consumeDeferredMessage(sequenceId))
      .filter((v): v is Exclude<typeof v, undefined> => !!v)
  }

  sendMessagesToQueue(
    queueId: QualifiedQueueIdWithSubqueueType,
    ...message: ParsedTypedRheaMessageWithId[]
  ): BufferLikeEncodedLong[] {
    // TODO: handle when queue is deleted more gracefully
    const queue = this.getQueueFromStoreOrThrow(queueId)

    const messages = message.map((m) => {
      // const sequence_number = this.allocateSequenceNumber()
      const msg = m as Message

      if (
        !msg.absolute_expiry_time &&
        queue.properties.defaultMessageTimeToLive
      ) {
        // TODO: check if changing the default TTL affects in-flight messages,
        // or just newly scheduled ones
        const creation_time = new Date(
          (msg.creation_time
            ? new Date(msg.creation_time).getTime()
            : Date.now()) +
            Temporal.Duration.from(
              queue.properties.defaultMessageTimeToLive,
            ).total("milliseconds"),
        )

        msg.absolute_expiry_time = creation_time
      }

      // m["message_annotations"] = {
      //   ...m["message_annotations"],

      //   [Constants.sequenceNumber]:
      //     m["message_annotations"][Constants.sequenceNumber] ??
      //     unserializedLongToBufferLike.parse(this.allocateSequenceNumber()),
      // }

      m["delivery_count"] ??= 0

      return m
    })

    const result_messages = this.getOrCreate(
      queue.id,
      queueId.subqueue,
    ).scheduleMessages(...messages)

    const sequence_numbers = result_messages.map(
      (m) => m.message_annotations[Constants.sequenceNumber],
    )

    this.logger?.debug({ sequence_numbers }, "assigned sequence numbers")

    return sequence_numbers
  }

  cancelScheduledMessage(
    queueId: QualifiedQueueIdWithSubqueueType,
    sequence_number: Long,
  ) {
    return this.getOrCreate(
      this.getQueueFromStoreOrThrow(queueId).id,
      queueId.subqueue,
    ).cancelScheduledMessage(sequence_number)
  }

  remove(sender: Sender) {
    // delete this.consumers[sender.name]
    this.removeSenderFromAll(sender)
  }

  private getOrCreate(queueId: string, subqueue: SubqueueType | undefined) {
    if (this._queues[queueId]) {
      return this._queues[queueId].get(subqueue)
    } else {
      const queue = new BrokerQueue(this.store, queueId, this.logger, this)
      this._queues[queueId] = queue
      return queue.get(subqueue)
    }
  }

  private delete(queueId: string) {
    const queue = this._queues[queueId]
    if (!queue) return

    queue.close()
    delete this._queues[queueId]
  }

  private addSenderToQueue(
    sender: Sender,
    queueId: string,
    subqueue: SubqueueType | undefined,
  ) {
    this.getOrCreate(queueId, subqueue).addConsumer(sender)
  }

  private removeSenderFromAll(sender: Sender) {
    Object.values(this._queues).forEach((q) =>
      q.removeConsumers((s) => s.name === sender.name),
    )
  }

  close() {
    Object.keys(this._queues).forEach(this.delete.bind(this))
  }

  private queue_cache: Record<string, string> = {}

  private getQueueFromStoreOrThrow(queueId: string | QualifiedQueueId) {
    const queue = getQueueFromStoreOrThrow(
      typeof queueId === "string"
        ? queueId
        : (this.queue_cache[objectHash(queueId)] ?? queueId),
      this.store,
      this.logger,
    )

    if (typeof queueId === "object") {
      this.queue_cache[objectHash(queueId)] = queue.id
    }

    return queue
  }
}
