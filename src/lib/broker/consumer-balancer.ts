import type { Delivery, Message, Sender } from "rhea"
import type {
  BrokerStore,
  QualifiedNamespaceId,
  QualifiedQueueId,
} from "./broker.js"
import { BrokerQueue, DeliveryTag, SenderName } from "./queue.js"
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
  private queues: Record<
    string,
    BrokerQueue<
      ParsedTypedRheaMessageWithId & {
        message_annotations: {
          [Constants.sequenceNumber]: BufferLikeEncodedLong
        }
      }
    >
  > = {}
  private next_sequence_number = new Long(1)

  // TODO: check if sequence number is allocated per-queue or per-namespace
  allocateSequenceNumber() {
    const sequence_number = this.next_sequence_number
    this.next_sequence_number = this.next_sequence_number.add(1)
    return sequence_number
  }

  constructor(
    private readonly store: BrokerStore,
    private readonly logger?: Logger,
  ) {}

  queueMessageCount(queueId: QualifiedQueueId | string) {
    return this.getOrCreate(this.getQueueFromStoreOrThrow(queueId).id)
      .messageCount
  }

  queueMessageCountDetails(queueId: QualifiedQueueId | string) {
    return this.getOrCreate(this.getQueueFromStoreOrThrow(queueId).id)
      .messageCountDetails
  }

  removeConsumers(where: (consumer: Sender) => boolean) {
    Object.values(this.queues).forEach((q) => q.removeConsumers(where))
  }

  renewLock(
    queueId: QualifiedQueueId | string,
    ...args: Parameters<BrokerQueue<any>["renewLock"]>
  ) {
    const queue = this.getQueueFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreate(queue.id)
    return broker_queue.renewLock(...args)
  }

  updateConsumerDisposition(
    queueId: QualifiedQueueId | string,
    ...args: Parameters<BrokerQueue<any>["updateConsumerDisposition"]>
  ) {
    const queue = this.getQueueFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreate(queue.id)
    broker_queue.updateConsumerDisposition(...args)
  }

  add(
    qualifiedQueueId: QualifiedQueueId,
    sender: Sender,
    sender_name?: string,
  ) {
    // ensure queue exists
    const queue = getQueueFromStoreOrThrow(
      qualifiedQueueId,
      this.store,
      this.logger,
    )

    this.addSenderToQueue(sender, queue.id)
  }

  peekMessageFromQueue(
    queueId: QualifiedQueueId | string,
    messageCount: number,
  ) {
    // TODO: handle when queue is deleted more gracefully
    const queue = this.getQueueFromStoreOrThrow(queueId)

    return this.getOrCreate(queue.id).peekMessages(messageCount)
  }

  consumeDeferredMessages(
    queueId: QualifiedQueueId | string,
    ...sequenceIds: Long[]
  ) {
    const queue = this.getQueueFromStoreOrThrow(queueId)
    const broker_queue = this.getOrCreate(queue.id)

    return sequenceIds
      .map((sequenceId) => broker_queue.consumeDeferredMessage(sequenceId))
      .filter((v): v is Exclude<typeof v, undefined> => !!v)
  }

  sendMessagesToQueue(
    queueId: QualifiedQueueId | string,
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

      m["message_annotations"] = {
        ...m["message_annotations"],

        [Constants.sequenceNumber]:
          m["message_annotations"][Constants.sequenceNumber] ??
          unserializedLongToBufferLike.parse(this.allocateSequenceNumber()),

        // TODO: figure out when "transferring" occurs to re-allocate sequence #
        //
        // ...(pre_exisitng_sequence_number != null
        //   ? {
        //       [Constants.enqueueSequenceNumber]: pre_exisitng_sequence_number,
        //     }
        //   : {}),
        // [Constants.sequenceNumber]:
        //   unserializedLongToBufferLike.parse(sequence_number),
      }

      m["delivery_count"] ??= 0

      return m as typeof m & {
        message_annotations: {
          [Constants.sequenceNumber]: BufferLikeEncodedLong
        }
      }
    })

    this.getOrCreate(queue.id).scheduleMessages(...messages)

    const sequence_numbers = messages.map(
      (m) => m.message_annotations[Constants.sequenceNumber],
    )

    this.logger?.debug({ sequence_numbers }, "assigned sequence numbers")

    return sequence_numbers
  }

  cancelScheduledMessage(
    queueId: QualifiedQueueId | string,
    sequence_number: Long,
  ) {
    return this.getOrCreate(
      this.getQueueFromStoreOrThrow(queueId).id,
    ).cancelScheduledMessage(sequence_number)
  }

  remove(sender: Sender) {
    // delete this.consumers[sender.name]
    this.removeSenderFromAll(sender)
  }

  private getOrCreate(queueId: string) {
    if (this.queues[queueId]) {
      return this.queues[queueId]
    } else {
      const queue = new BrokerQueue(this.store, queueId, this.logger, this)
      this.queues[queueId] = queue
      return queue
    }
  }

  private delete(queueId: string) {
    // TODO
    const queue = this.queues[queueId]
    if (!queue) return

    queue.close()
    delete this.queues[queueId]
  }

  private addSenderToQueue(sender: Sender, queueId: string) {
    this.getOrCreate(queueId).addConsumer(sender)
  }

  private removeSenderFromAll(sender: Sender) {
    Object.values(this.queues).forEach((q) => q.removeConsumer(sender))
  }

  close() {
    Object.keys(this.queues).forEach(this.delete.bind(this))
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
