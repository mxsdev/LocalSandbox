import rhea from "rhea"
import { Temporal } from "@js-temporal/polyfill"
import { Delivery, Message, Sender, SenderEvents } from "rhea"
import { Deque } from "@datastructures-js/deque"
import { Logger } from "pino"
import { Constants } from "@azure/core-amqp"
import { BrokerStore } from "./broker.js"
import {
  getQualifiedQueueIdFromStoreQueue,
  getQueueFromStoreOrThrow,
} from "./util.js"
import Long from "long"
import { BufferLikeEncodedLong, serializedLong } from "../util/long.js"
import { BrokerConsumerBalancer } from "./consumer-balancer.js"
import { uuidToString } from "../util/uuid.js"

interface QueueConsumerDeliveryInfo<M> {
  delivery: Delivery
  message: M
}

export type DeliveryTag = Pick<Delivery, "tag"> & Partial<Pick<Delivery, "id">>
export type SenderName = Pick<Sender, "name">

class DeliveryMap<T> {
  private _deliveries: Record<string, T> = {}

  get length() {
    return Object.keys(this._deliveries).length
  }

  constructor(private logger: Logger | undefined) {}

  private deliveryKey(delivery: DeliveryTag) {
    return uuidToString.parse(delivery.tag)
  }

  get(delivery: DeliveryTag) {
    return this._deliveries[this.deliveryKey(delivery)]
  }

  store(delivery: DeliveryTag, val: T) {
    const key = this.deliveryKey(delivery)
    if (this._deliveries[key] != null) {
      this.logger?.warn(
        { key, delivery_id: delivery.id },
        "Stored delivery overwrote another, this should never happen!!",
      )
    }
    this._deliveries[key] = val
  }

  protected finish(delivery: Delivery) {
    const res = this._deliveries[this.deliveryKey(delivery)]
    if (!res) {
      this.logger?.warn(
        { delivery_id: delivery.id },
        "Tried to finish delivery that does not exist, this should never happen!!",
      )
    }
    delete this._deliveries[this.deliveryKey(delivery)]
    return res
  }
}

interface QueueConsumer<M> {
  sender: Sender
  current_delivery: DeliveryMap<QueueConsumerDeliveryInfo<M>>
  listeners: Partial<Record<SenderEvents, (...args: any[]) => void>>
  schedule_for_deletion: boolean
}

export class BrokerQueue<
  M extends Message & {
    message_id: string
    message_annotations: {
      [K in (typeof Constants)["sequenceNumber"]]: BufferLikeEncodedLong
    }
  },
> {
  private _messages = new Deque<{ message: M; scheduled_at: Date }>()

  private deferred_messages = new Map<string, M>()
  private locked_messages = new Map<
    string,
    { message: M; timeout: NodeJS.Timeout; lock_duration_ms: number }
  >()

  private message_schedule_timeouts: Record<string, NodeJS.Timeout> = {}
  private message_expiration_timeouts: Record<string, NodeJS.Timeout> = {}

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
    messages.forEach((message) =>
      this._messages.pushFront({ message, scheduled_at: new Date() }),
    )
  }

  private enqueueFront(...messages: M[]) {
    messages.forEach((message) =>
      this._messages.pushBack({ message, scheduled_at: new Date() }),
    )
  }

  private dequeue() {
    return this._messages.popBack()
  }

  private refreshIdleTimeout() {
    this.queue.autoDeleteTimeout?.refresh()
  }

  /**
   * Should be called whenever a new receive request is made or a message is
   * sent
   */
  private propagateAccess() {
    this.logger?.debug("Propagating access...")

    this.store.sb_queue
      .update()
      .where((q) => q.id === this.queue_id)
      .set((v) => ({
        properties: {
          ...v.properties,
          accessedAt: new Date().toISOString(),
        },
      }))
      .execute()
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

      message.message_annotations[Constants.deadLetterSource] = queue.name!

      message.message_annotations[Constants.deadLetterReason] = reason

      message.message_annotations[Constants.deadLetterDescription] = description

      this.consumer_balancer.deliverMessagesToQueue(dlq_id, message)
    }
  }

  scheduleMessages(...messages: M[]) {
    const messages_for_immediate_delivery: M[] = []

    const queue = this.queue

    for (const message of messages) {
      if (queue.properties.requiresDuplicateDetection) {
        const duplicateDetectionMs = Temporal.Duration.from(
          queue.properties.duplicateDetectionHistoryTimeWindow,
        ).total("milliseconds")

        if (
          this._messages
            .toArray()
            .filter(
              ({ scheduled_at }) =>
                Date.now() - scheduled_at.getTime() <= duplicateDetectionMs,
            )
            .some(
              ({ message: existing_message }) =>
                existing_message.message_id === message.message_id,
            )
        ) {
          continue
        }
      }

      const scheduled_enqueued_time = message.message_annotations?.[
        Constants.scheduledEnqueueTime
      ] as Date | undefined

      if (message.absolute_expiry_time) {
        this.message_expiration_timeouts[message.message_id] = setTimeout(
          () => {
            delete this.message_expiration_timeouts[message.message_id]
            // TODO: populate error & reason
            this.tryDeadletterMessage({
              ...message,
              ttl: undefined,
              absolute_expiry_time: undefined,
            })
          },
          Math.max(
            0,
            new Date(message.absolute_expiry_time).getTime() - Date.now(),
          ),
        )
      }

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
        this.message_schedule_timeouts[
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

  private listNonExpiredMessages() {
    return this._messages
      .toArray()
      .map(({ message }) => message)
      .filter(
        (m) =>
          !m.absolute_expiry_time ||
          new Date(m.absolute_expiry_time) > new Date(),
      )
  }

  // TODO: which messages should/shouldn't be included in the count??
  get messageCount() {
    return this.listNonExpiredMessages().length + this.locked_messages.size
  }

  peekMessages(messageCount: number) {
    this.refreshIdleTimeout()

    // TODO: introduce more efficient implementation...
    return this._messages
      .toArray()
      .map(({ message }) => message)
      .slice(this._messages.size() - messageCount, this._messages.size())
      .reverse()
  }

  cancelScheduledMessage(sequence_number: Long): boolean {
    this.refreshIdleTimeout()

    const existing_timeout =
      this.message_schedule_timeouts[sequence_number.toString()]

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

  finishDelivery(
    consumer: (typeof this.consumers)[number],
    delivery: Delivery,
  ) {
    consumer.current_delivery["finish"](delivery)

    if (
      consumer.current_delivery.length === 0 &&
      consumer.schedule_for_deletion
    ) {
      this.logger?.debug(
        { sender: consumer.sender.name },
        "Deleting consumer since all deliveries are completed",
      )
      delete this.consumers[consumer.sender.name]
    }

    this.refreshIdleTimeout()
  }

  renewLock(sender: SenderName, delivery_tag: DeliveryTag) {
    const consumer = this.consumers[sender.name]
    if (!consumer) {
      this.logger?.error(
        { sender: sender.name, consumer_ids: Object.keys(this.consumers) },
        "Could not find consumer for lock renewal",
      )
      return
    }

    const delivery_info = consumer.current_delivery.get(delivery_tag)
    if (!delivery_info) {
      this.logger?.error(
        {
          sender: sender.name,
          tags: Object.keys(consumer.current_delivery["_deliveries"]),
        },
        "Could not find delivery for lock renewal",
      )
      return
    }

    const locked_message = this.locked_messages.get(
      delivery_info.message.message_id,
    )
    if (!locked_message) {
      this.logger?.error(
        {
          sender: sender.name,
        },
        "Could not find locked message for lock renewal",
      )
      return
    }

    this.refreshIdleTimeout()

    locked_message.timeout.refresh()
    return Date.now() + locked_message.lock_duration_ms
  }

  updateConsumerDisposition(
    sender: SenderName,
    delivery_tag: DeliveryTag,
    disposition: "completed" | "abandoned" | "rejected",
  ) {
    const consumer = this.consumers[sender.name]
    if (!consumer) {
      this.logger?.error(
        { sender: sender.name, consumer_ids: Object.keys(this.consumers) },
        "Could not find consumer for disposition update",
      )
      return
    }

    const delivery_info = consumer.current_delivery.get(delivery_tag)

    if (!delivery_info) {
      this.logger?.error(
        {
          sender: sender.name,
          tags: Object.keys(consumer.current_delivery["_deliveries"]),
        },
        "Could not find delivery for disposition update",
      )
      return
    }

    const { delivery, message } = delivery_info

    switch (disposition) {
      case "completed":
        {
          if (consumer.sender.rcv_settle_mode === 1) {
            delivery.update(true)
          }

          this.locked_messages.delete(message.message_id)

          this.finishDelivery(consumer, delivery)

          this.tryFlush()
        }
        break

      case "abandoned":
        {
          this.finishDelivery(consumer, delivery)

          this.locked_messages.delete(message.message_id)

          // take this as wanting to defer
          if (delivery.remote_state?.["undeliverable_here"]) {
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

          message.delivery_count ??= 1
          message.delivery_count += 1

          const maxDeliveryCount = this.queue.properties.maxDeliveryCount

          if (message.delivery_count > maxDeliveryCount) {
            // TODO: add dead letter reason for max redeliveries
            this.tryDeadletterMessage(message)
          } else {
            this.scheduleMessagesInFront(message)
          }
        }
        break

      case "rejected":
        {
          const error = delivery.remote_state?.["error"]

          if (error?.condition === Constants.deadLetterName) {
            message.application_properties ??= {}
            message.application_properties["DeadLetterReason"] =
              error.info["DeadLetterReason"]
            message.application_properties["DeadLetterErrorDescription"] =
              error.info["DeadLetterErrorDescription"]
          }

          this.finishDelivery(consumer, delivery)

          this.locked_messages.delete(message.message_id)

          this.tryDeadletterMessage(message)
          delivery.update(true)
        }
        break
    }

    this.refreshIdleTimeout()

    return message
  }

  addConsumer(sender: Sender) {
    this.logger?.debug(
      { sender: sender.name, queue_id: this.queue_id },
      "Registering sender",
    )

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

        this.updateConsumerDisposition(e.sender, e.delivery, "completed")
      },
      [SenderEvents.released]: (e: { delivery: Delivery; sender: Sender }) => {
        this.logger?.debug(
          {
            undeliverable_here: e.delivery.remote_state?.["undeliverable_here"],
            message_annotations:
              e.delivery.remote_state?.["message_annotations"],
          },
          "sender released message",
        )

        this.updateConsumerDisposition(e.sender, e.delivery, "abandoned")
      },
      [SenderEvents.settled]: (e: { delivery: Delivery; sender: Sender }) => {
        this.logger?.debug("sender settled")

        this.tryFlush()
      },
      [SenderEvents.rejected]: (e: { delivery: Delivery; sender: Sender }) => {
        this.logger?.debug(Object.keys(e), "sender rejected message")

        const message = this.updateConsumerDisposition(
          e.sender,
          e.delivery,
          "rejected",
        )
      },
    }

    Object.entries(listeners).forEach((args) => sender.addListener(...args))

    this.consumers[sender.name] = {
      sender,
      listeners,
      current_delivery: new DeliveryMap(this.logger),
      schedule_for_deletion: false,
    }
    this.tryFlush()

    this.propagateAccess()
  }

  removeConsumer(sender: Sender) {
    this.logger?.debug({ sender: sender.name }, "Removing sender")

    const consumer = this.consumers[sender.name]

    if (!consumer) {
      this.logger?.warn({ sender: sender.name }, "Could not find consumer")
      return
    }

    Object.entries(consumer.listeners).forEach(
      (args) => args[1] && consumer.sender.removeListener(...args),
    )

    if (consumer.current_delivery.length === 0) {
      this.logger?.debug(
        { sender: consumer.sender.name },
        "Removing consumer from queue",
      )
      delete this.consumers[sender.name]
    } else {
      this.logger?.debug(
        { sender: consumer.sender.name },
        "Scheduling consumer to be removed from queue",
      )
      consumer.schedule_for_deletion = true
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
    Object.values(this.message_schedule_timeouts).forEach(clearTimeout)
    Object.values(this.message_expiration_timeouts).forEach(clearTimeout)

    Object.values(this.locked_messages).forEach(({ timeout }) =>
      clearTimeout(timeout),
    )
  }

  private tryFlush() {
    let consumer: QueueConsumer<M> | undefined

    const lockDurationMs = Temporal.Duration.from(
      this.queue.properties.lockDuration,
    ).total({ unit: "millisecond" })

    this.refreshIdleTimeout()

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
      const { message } = this.dequeue()!

      // check expired
      if (
        message.absolute_expiry_time &&
        new Date(message.absolute_expiry_time) <= new Date()
      ) {
        this.logger?.debug(
          {
            message_id: message.message_id,
            ttl: message.ttl,
            absolute_expiry_time: message.absolute_expiry_time,
            queue: this.queue_id,
          },
          "Preventing message from sending due to expiration",
        )
        continue
      }

      const consumer_copy = consumer

      // TODO: check queue lock mode?
      this.locked_messages.set(message.message_id, {
        message,
        lock_duration_ms: lockDurationMs,
        timeout: setTimeout(() => {
          this.logger?.debug(
            {
              delivery_id: delivery.id,
              consumer: consumer_copy.sender.name,
              message_id: message.message_id,
            },
            "Unlocking message due to lock timeout!",
          )

          this.finishDelivery(consumer_copy, delivery)

          this.locked_messages.delete(message.message_id)
          // TODO: check docs to see where this should be redelivered (front, back?)
          this.scheduleMessagesInFront(message)
        }, lockDurationMs),
      })

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
        +new Date().getTime() + lockDurationMs
      // console.log(
      //   "lock token",
      //   message.message_annotations[Constants.lockTokenMapKey],
      // )

      // TODO: timeout
      const delivery = consumer.sender.send(message)

      this.logger?.debug(
        {
          delivery_id: delivery.id,
          consumer: consumer.sender.name,
          delivery_tag: Buffer.from(delivery.tag).length,
          // delivery: consumer.current_delivery?.delivery.id,
        },
        "Sent message",
      )

      consumer.current_delivery.store(delivery, { delivery, message })

      this.propagateAccess()
    }
  }
}
