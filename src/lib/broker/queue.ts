import { Delivery, generate_uuid, Message, Sender, SenderEvents } from "rhea"
import { Deque } from "@datastructures-js/deque"
import { Logger } from "pino"
import { Constants } from "@azure/core-amqp"
import { BrokerStore, QualifiedQueueId } from "./broker.js"
import {
  getQualifiedQueueIdFromStoreQueue,
  getQueueFromStoreOrThrow,
} from "./util.js"
import Long from "long"
import { BufferLikeEncodedLong, serializedLong } from "../util/long.js"
import { BrokerConsumerBalancer } from "./consumer-balancer.js"

interface QueueConsumerDeliveryInfo<M> {
  delivery: Delivery
  message: M
}

interface QueueConsumer<M> {
  sender: Sender
  current_delivery: Record<string, QueueConsumerDeliveryInfo<M>>
  listeners: Partial<Record<SenderEvents, (...args: any[]) => void>>
}

export class BrokerQueue<
  M extends Message & {
    message_id: string
    message_annotations: {
      [K in (typeof Constants)["sequenceNumber"]]: BufferLikeEncodedLong
    }
  },
> {
  private _messages = new Deque<M>()

  private deferred_messages = new Map<string, M>()
  private locked_messages = new Map<string, M>()

  private timeouts: Record<string, NodeJS.Timeout> = {}

  private consumers: Record<string, QueueConsumer<M>> = {}

  constructor(
    private store: BrokerStore,
    public queue_id: string,
    private logger: Logger | undefined,
    private consumer_balancer: BrokerConsumerBalancer,
  ) {}

  private get queue() {
    // TODO: handle deletes more gracefully..
    return getQueueFromStoreOrThrow(this.queue_id, this.store, this.logger)
  }

  private get fifo() {
    return false
  }

  private enqueue(...messages: M[]) {
    messages.forEach(this._messages.pushFront.bind(this._messages))
  }

  private enqueueFront(...messages: M[]) {
    messages.forEach(this._messages.pushBack.bind(this._messages))
  }

  private dequeue() {
    return this._messages.popBack()
  }

  consumeDeferredMessage(sequenceId: Long) {
    const res = this.deferred_messages.get(sequenceId.toString())
    this.deferred_messages.delete(sequenceId.toString())
    return res
  }

  tryDeadletterMessage(message: M, reason?: string, description?: string) {
    const queue = this.queue

    if (queue.properties.forwardDeadLetteredMessagesTo === queue.name) {
      throw new Error("Cannot dead-letter to self")
    }

    const queue_id = getQualifiedQueueIdFromStoreQueue(queue)

    // TODO: should we throw here if there's no queue, or if queue is invalid?
    // TODO: should we throw here if the message has already been dead lettered?
    if (queue.properties.forwardDeadLetteredMessagesTo) {
      const dlq_id = {
        ...queue_id,
        queue_name: queue.properties.forwardDeadLetteredMessagesTo,
      }

      message.message_annotations[Constants.deadLetterSource] =
        dlq_id.queue_name

      message.message_annotations[Constants.deadLetterReason] = reason

      message.message_annotations[Constants.deadLetterDescription] = description

      this.consumer_balancer.deliverMessagesToQueue(dlq_id, message)
    }
  }

  scheduleMessages(...messages: M[]) {
    const messages_for_immediate_delivery: M[] = []

    for (const message of messages) {
      const scheduled_enqueued_time = message.message_annotations?.[
        Constants.scheduledEnqueueTime
      ] as Date | undefined

      if (
        scheduled_enqueued_time &&
        !(scheduled_enqueued_time instanceof Date)
      ) {
        throw new Error(
          `Expected ${Constants.scheduledEnqueueTime} to be parsed as JS Date instance`,
        )
      }

      if (
        scheduled_enqueued_time &&
        scheduled_enqueued_time.getTime() > Date.now()
      ) {
        this.timeouts[
          serializedLong
            .parse(message.message_annotations[Constants.sequenceNumber])
            .toString()
        ] = setTimeout(() => {
          this.enqueue(message)
          this.tryFlush()
        }, scheduled_enqueued_time.getTime() - Date.now())
      } else {
        messages_for_immediate_delivery.push(message)
      }
    }

    this.enqueue(...messages_for_immediate_delivery)
    this.tryFlush()
  }

  peekMessages(messageCount: number) {
    // TODO: introduce more efficient implementation...
    return this._messages
      .toArray()
      .slice(this._messages.size() - messageCount, this._messages.size())
      .reverse()
  }

  cancelScheduledMessage(sequence_number: Long): boolean {
    const existing_timeout = this.timeouts[sequence_number.toString()]

    if (!existing_timeout) {
      return false
    }

    clearTimeout(existing_timeout)
    return true
  }

  scheduleMessagesInFront(...message: M[]) {
    this.enqueueFront(...message)
    this.tryFlush()
  }

  addConsumer(sender: Sender) {
    this.logger?.debug(
      { sender: sender.name, queue_id: this.queue_id },
      "Registering sender",
    )

    const retrieveConsumer = (delivery: Delivery) => {
      const consumer = this.consumers[sender.name]

      if (!consumer) {
        this.logger?.error({ sender: sender.name }, "Could not find consumer")
        return
      }

      if (!consumer.current_delivery[delivery.id]) {
        this.logger?.error(
          { sender: sender.name },
          "Expected to find delivery...",
        )
        return
      }

      return { consumer, ...consumer.current_delivery[delivery.id] }
    }

    const tryRedeliverMessage = (message: M) => {
      this.locked_messages.delete(message.message_id)

      message.delivery_count ??= 0
      message.delivery_count += 1

      // TODO: if message.delivery_count > queue.maxretries, send to DLQ or destroy

      this.scheduleMessagesInFront(message)
    }

    const listeners = {
      [SenderEvents.senderOpen]: (e: any) => {
        this.logger?.trace({ sender: e.sender.name }, "sender is open")
        this.tryFlush()
      },
      [SenderEvents.sendable]: (e: any) => {
        this.logger?.debug("sender is sendable")
        this.tryFlush()
      },
      [SenderEvents.accepted]: (e: { delivery: Delivery; sender: Sender }) => {
        this.logger?.debug("sender accepted message")

        const { consumer, delivery, message } =
          retrieveConsumer(e.delivery) ?? {}
        if (!consumer || !delivery || !message) return

        if (consumer.sender.rcv_settle_mode === 1) {
          delivery.update(true)
        }

        this.locked_messages.delete(message.message_id)

        delete consumer.current_delivery[delivery.id]

        this.tryFlush()
      },
      [SenderEvents.modified]: (e: { delivery: Delivery }) => {
        const undeliverable_here =
          e.delivery.remote_state?.["undeliverable_here"]
        const delivery_failed = e.delivery.remote_state?.["delivery_failed"]
        const message_annotations =
          e.delivery.remote_state?.["message_annotations"]

        this.logger?.debug(
          { undeliverable_here, delivery_failed, message_annotations },
          "sender modified message",
        )

        if (undeliverable_here) {
          // TODO: implement this
        }

        if (delivery_failed) {
          // TODO: implement this
        }

        // TODO: merge message annotations w/ existing ones
      },
      [SenderEvents.released]: (e: { delivery: Delivery }) => {
        this.logger?.debug(
          {
            undeliverable_here: e.delivery.remote_state?.["undeliverable_here"],
            message_annotations:
              e.delivery.remote_state?.["message_annotations"],
          },
          "sender released message",
        )

        const { consumer, delivery, message } =
          retrieveConsumer(e.delivery) ?? {}
        if (!consumer || !delivery || !message) return

        delete consumer.current_delivery[delivery.id]
        this.locked_messages.delete(message.message_id)

        // take this as wanting to defer
        if (e.delivery.remote_state?.["undeliverable_here"]) {
          this.deferred_messages.set(
            serializedLong
              .parse(message.message_annotations[Constants.sequenceNumber])
              .toString(),
            message,
          )
        }

        if (consumer.sender.rcv_settle_mode === 1) {
          delivery.update(true)
        }
      },
      [SenderEvents.settled]: (e: { delivery: Delivery; sender: Sender }) => {
        this.logger?.debug("sender settled")

        this.tryFlush()
      },
      [SenderEvents.rejected]: (e: { delivery: Delivery }) => {
        this.logger?.debug(Object.keys(e), "sender rejected message")

        const { consumer, delivery, message } =
          retrieveConsumer(e.delivery) ?? {}
        if (!consumer || !delivery || !message) return

        const error = e.delivery.remote_state?.["error"]

        if (error?.condition === Constants.deadLetterName) {
          message.application_properties ??= {}
          message.application_properties["DeadLetterReason"] =
            error.info["DeadLetterReason"]
          message.application_properties["DeadLetterErrorDescription"] =
            error.info["DeadLetterErrorDescription"]
        }

        delete consumer.current_delivery[delivery.id]

        this.locked_messages.delete(message.message_id)

        this.tryDeadletterMessage(message)
        delivery.update(true)
      },
    }

    Object.entries(listeners).forEach((args) => sender.addListener(...args))

    this.consumers[sender.name] = { sender, listeners, current_delivery: {} }
    this.tryFlush()
  }

  removeConsumer(sender: Sender) {
    const consumer = this.consumers[sender.name]
    if (consumer) {
      Object.entries(consumer.listeners).forEach(
        (args) => args[1] && consumer.sender.removeListener(...args),
      )

      delete this.consumers[sender.name]
    }
  }

  removeConsumers(where: (consumer: Sender) => boolean) {
    for (const consumer of Object.values(this.consumers)) {
      if (where(consumer.sender)) {
        this.removeConsumer(consumer.sender)
      }
    }
  }

  close() {
    Object.values(this.timeouts).forEach(clearTimeout)
  }

  private tryFlush() {
    let consumer: QueueConsumer<M> | undefined

    while (
      (consumer = Object.values(this.consumers).find(
        (consumer) =>
          // !consumer.current_delivery &&
          consumer.sender.sendable() &&
          consumer.sender.is_open() &&
          consumer.sender.is_remote_open() &&
          (!this.fifo || this.locked_messages.size === 0) &&
          this._messages.size() > 0,
      ))
    ) {
      const message = this.dequeue()!

      // TODO: check queue lock mode?
      this.locked_messages.set(message.message_id, message)

      // From: azure-sdk-for-js/sdk/servicebus/service-bus/src/serviceBusMessage.ts:602
      //
      // Constants.enqueuedTime
      // Constants.sequenceNumber
      // Constants.enqueueSequenceNumber
      // Constants.messageState
      //    1 => deferred
      //    2 => scheduled
      // Constants.deadLetterSource

      // TODO: implement this properly
      message.message_annotations[Constants.lockedUntil] =
        +new Date().getTime() + 1000000000

      // TODO: timeout
      const delivery = consumer.sender.send(message)

      this.logger?.debug(
        {
          delivery_id: delivery.id,
          consumer: consumer.sender.name,
          // delivery: consumer.current_delivery?.delivery.id,
        },
        "Sent message",
      )

      consumer.current_delivery[delivery.id] = { delivery, message }
    }
  }
}
