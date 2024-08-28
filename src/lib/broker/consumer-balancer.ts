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

export class BrokerConsumerBalancer {
  private queues: Record<string, BrokerQueue<ParsedTypedRheaMessageWithId>> = {}

  constructor(
    private readonly store: BrokerStore,
    private readonly connection_namespaces: Record<
      string,
      QualifiedNamespaceId
    >,
    private readonly logger?: Logger,
  ) {}

  removeConsumers(where: (consumer: Sender) => boolean) {
    Object.values(this.queues).forEach((q) => q.removeConsumers(where))
  }

  add(sender: Sender, sender_name?: string) {
    const queue_name = getPeerQueue(sender_name ?? sender)

    const connection_namespace =
      this.connection_namespaces[sender.connection.container_id]

    if (!connection_namespace) {
      this.logger?.error(
        "Could not find connection metadata for queue, did the handshake go through?",
      )
      throw new Error("Could not find connection metadata for queue")
    }

    const qualifiedQueueId = { ...connection_namespace, queue_name }

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
  ) {
    // TODO: handle when queue is deleted more gracefully
    const queue = this.getQueueFromStoreOrThrow(queueId)

    this.getOrCreate(queue.id).scheduleMessages(...message)

    // TODO: should this be delayed until the message is successfully consumed e2e?
    delivery.accept()
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
