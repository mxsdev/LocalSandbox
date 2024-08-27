import type { Delivery, Message, Sender } from "rhea"
import type {
  BrokerStore,
  QualifiedNamespaceId,
  QualifiedQueueId,
} from "./broker.js"
import { BrokerQueue } from "./queue.js"
import hash from "object-hash"
import { getPeerQueue, getQueueFromStoreOrThrow } from "./util.js"
import { Logger } from "pino"
import { ParsedTypedRheaMessage } from "../amqp/parse-message.js"

export class BrokerConsumerBalancer {
  private queues: Record<string, BrokerQueue<ParsedTypedRheaMessage>> = {}

  constructor(
    private readonly store: BrokerStore,
    private readonly connection_namespaces: Record<
      string,
      QualifiedNamespaceId
    >,
    private readonly logger?: Logger,
  ) {}

  // TODO: cleanup
  //   private consumers: Record<string, Sender> = {}

  removeConsumers(where: (consumer: Sender) => boolean) {
    Object.values(this.queues).forEach((q) => q.removeConsumers(where))
  }

  add(sender: Sender) {
    const queue_name = getPeerQueue(sender)

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
    getQueueFromStoreOrThrow(qualifiedQueueId, this.store, this.logger)

    // this.consumers[sender.name] = sender
    this.addSenderToQueue(sender, qualifiedQueueId)
  }

  deliverMessagesToQueue(
    queueId: QualifiedQueueId,
    delivery: Delivery,
    ...message: ParsedTypedRheaMessage[]
  ) {
    getQueueFromStoreOrThrow(queueId, this.store, this.logger)

    this.getOrCreate(queueId).scheduleMessages(...message)

    // TODO: should this be delayed until the message is successfully consumed e2e?
    delivery.accept()
  }

  remove(sender: Sender) {
    // delete this.consumers[sender.name]
    this.removeSenderFromAll(sender)
  }

  private getOrCreate(queueId: QualifiedQueueId) {
    const qid = hash(queueId)

    if (this.queues[qid]) {
      return this.queues[qid]
    } else {
      const queue = new BrokerQueue(this.logger)
      this.queues[qid] = queue
      return queue
    }
  }

  private delete(queueId: QualifiedQueueId | string) {
    const qid = typeof queueId === "string" ? queueId : hash(queueId)

    // TODO
    const queue = this.queues[qid]
    if (!queue) return

    queue.close()
    delete this.queues[qid]
  }

  private addSenderToQueue(sender: Sender, queueId: QualifiedQueueId) {
    this.getOrCreate(queueId).addConsumer(sender)
  }

  private removeSenderFromAll(sender: Sender) {
    Object.values(this.queues).forEach((q) => q.removeConsumer(sender))
  }

  close() {
    Object.keys(this.queues).forEach(this.delete.bind(this))
  }
}
