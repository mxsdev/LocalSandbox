import type { Delivery, Sender } from "rhea"
import type {
  BrokerStore,
  QualifiedNamespaceId,
  QualifiedQueueId,
} from "./broker.js"
import { BrokerQueue } from "./queue.js"
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
  private next_sequence_number = new Long(0)

  constructor(
    private readonly store: BrokerStore,
    private readonly logger?: Logger,
  ) {}

  removeConsumers(where: (consumer: Sender) => boolean) {
    Object.values(this.queues).forEach((q) => q.removeConsumers(where))
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

  deliverMessagesToQueue(
    queueId: QualifiedQueueId | string,
    delivery: Delivery,
    ...message: ParsedTypedRheaMessageWithId[]
  ): BufferLikeEncodedLong[] {
    // TODO: handle when queue is deleted more gracefully
    const queue = this.getQueueFromStoreOrThrow(queueId)

    const messages = message.map((m) => {
      const sequence_number = this.next_sequence_number
      this.next_sequence_number = this.next_sequence_number.add(1)

      m["message_annotations"] = {
        ...m["message_annotations"],
        [Constants.sequenceNumber]:
          unserializedLongToBufferLike.parse(sequence_number),
      }
      return m as typeof m & {
        message_annotations: {
          [Constants.sequenceNumber]: BufferLikeEncodedLong
        }
      }
    })

    this.getOrCreate(queue.id).scheduleMessages(...messages)

    // TODO: should this be delayed until the message is successfully consumed e2e?
    delivery.accept()

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
      const queue = new BrokerQueue(this.store, queueId, this.logger)
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
