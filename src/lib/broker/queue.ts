import rhea from "rhea"
import { Temporal } from "@js-temporal/polyfill"
import { Delivery, Message, Sender, SenderEvents } from "rhea"
import { Deque } from "@datastructures-js/deque"
import { Logger } from "pino"
import { Constants } from "@azure/core-amqp"
import {
  BrokerStore,
  QualifiedQueueIdWithSubqueueType,
  SubqueueType,
} from "./broker.js"
import {
  getQualifiedQueueIdFromStoreQueue,
  getQueueFromStoreOrThrow,
} from "./util.js"
import Long from "long"
import {
  BufferLikeEncodedLong,
  serializedLong,
  unserializedLongToBufferLike,
} from "../util/long.js"
import { BrokerConsumerBalancer } from "./consumer-balancer.js"
import { uuidToString } from "../util/uuid.js"
import { MessageCountDetails } from "@azure/arm-servicebus"
import { BrokerConstants } from "./constants.js"
import { z } from "zod"

interface QueueConsumerDeliveryInfo<M> {
  delivery: Delivery
  message: M
}

export type DeliveryTag = Pick<Delivery, "tag"> & Partial<Pick<Delivery, "id">>
export type SenderName = Pick<Sender, "name">

type MessageWithProperties<Base extends Message, MessageAnnotations> = Base & {
  message_annotations: MessageAnnotations
}

type MessageWithSequenceNumber<Base extends Message> = MessageWithProperties<
  Base,
  {
    [Constants.sequenceNumber]: BufferLikeEncodedLong
  }
>

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

class SequenceNumberFactory {
  private next_sequence_number = new Long(1)

  allocateNextSequenceNumber() {
    const sequence_number = this.next_sequence_number
    this.next_sequence_number = this.next_sequence_number.add(1)
    return sequence_number
  }
}

interface QueueConsumer<M> {
  sender: Sender
  current_delivery: DeliveryMap<QueueConsumerDeliveryInfo<M>>
  listeners: Partial<Record<SenderEvents, (...args: any[]) => void>>
  schedule_for_deletion: boolean
}

type ScheduledMessage<M extends Message> = MessageWithSequenceNumber<M>

type TaggedMessage = Message & {
  message_id: string
  message_annotations?: Record<string, any>
}

export class BrokerQueue<M extends TaggedMessage> {
  private _messages = new Deque<{
    message: ScheduledMessage<M>
    scheduled_at: Date
  }>()

  private deferred_messages = new Map<string, ScheduledMessage<M>>()
  private locked_messages = new Map<
    string,
    {
      message: ScheduledMessage<M>
      timeout: NodeJS.Timeout
      lock_duration_ms: number
    }
  >()
  private scheduled_messages: Record<
    string,
    { timeout: NodeJS.Timeout; message: ScheduledMessage<M> }
  > = {}

  private message_expiration_timeouts: Record<string, NodeJS.Timeout> = {}

  private consumers: Record<string, QueueConsumer<ScheduledMessage<M>>> = {}

  private num_messages_transferred_to_dlq: number = 0

  constructor(
    private store: BrokerStore,
    public queue_id: string,
    private logger: Logger | undefined,
    private consumer_balancer: BrokerConsumerBalancer,
    private sequence_number_factory = new SequenceNumberFactory(),
  ) {}

  private get queue() {
    // TODO: handle deletes more gracefully..
    return getQueueFromStoreOrThrow(this.queue_id, this.store, this.logger)
  }

  private get fifo() {
    return false
  }

  private pushMessage(message: ScheduledMessage<M>, place: "front" | "back") {
    message.message_annotations[Constants.enqueuedTime] = new Date()
    message.message_annotations[Constants.messageState] ??=
      BrokerConstants.messageState.active

    this._messages[place === "front" ? "pushFront" : "pushBack"]({
      message,
      scheduled_at: message.message_annotations[Constants.enqueuedTime],
    })
  }

  private enqueue(...messages: ScheduledMessage<M>[]) {
    messages.forEach((message) => this.pushMessage(message, "front"))
  }

  private enqueueFront(...messages: ScheduledMessage<M>[]) {
    messages.forEach((message) => this.pushMessage(message, "back"))
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

  private tryDeadletterMessage(
    message: ScheduledMessage<M>,
    reason?: string,
    description?: string,
  ) {
    const queue = this.queue

    if (queue.properties.forwardDeadLetteredMessagesTo === queue.name) {
      throw new Error("Cannot dead-letter to self")
    }

    const queue_id = getQualifiedQueueIdFromStoreQueue(queue)

    // TODO: should we throw here if there's no queue, or if queue is invalid?
    // TODO: should we throw here if the message has already been dead lettered?
    const dlq_id: QualifiedQueueIdWithSubqueueType = {
      ...queue_id,
      queue_name: queue.properties.forwardDeadLetteredMessagesTo ?? queue.name!,
      subqueue: queue.properties.forwardDeadLetteredMessagesTo
        ? undefined
        : "deadletter",
    }

    if (!dlq_id.subqueue) {
      message.message_annotations[Constants.deadLetterSource] = queue.name!
    }

    message.message_annotations[Constants.deadLetterReason] = reason
    message.message_annotations[Constants.deadLetterDescription] = description

    this.consumer_balancer.sendMessagesToQueue(dlq_id, message)

    // TODO: figure out when "transfers" occur
    // this.num_messages_transferred_to_dlq++
  }

  scheduleMessages(...sourceMessages: M[]) {
    const messages = sourceMessages.map((msg) => {
      msg.message_annotations ??= {}
      msg.message_annotations[Constants.sequenceNumber] ??=
        unserializedLongToBufferLike.parse(
          this.sequence_number_factory.allocateNextSequenceNumber(),
        )
      return msg as typeof msg & {
        message_annotations: {
          [Constants.sequenceNumber]: z.output<
            typeof unserializedLongToBufferLike
          >
        }
      }
    })

    const messages_for_immediate_delivery: ScheduledMessage<M>[] = []

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

            if (this.queue.properties.deadLetteringOnMessageExpiration) {
              // TODO: populate error & reason
              this.tryDeadletterMessage({
                ...message,
                ttl: undefined,
                absolute_expiry_time: undefined,
                application_properties: {
                  ...message.application_properties,
                  [BrokerConstants.deadLetterReason]:
                    BrokerConstants.errors.messageExpired.reason,
                  [BrokerConstants.deadLetterDescription]:
                    BrokerConstants.errors.messageExpired.description,
                },
              })
            }
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
        const message_sequence_number_id = serializedLong
          .parse(message.message_annotations[Constants.sequenceNumber])
          .toString()

        message.message_annotations[Constants.messageState] =
          BrokerConstants.messageState.scheduled

        this.scheduled_messages[message_sequence_number_id] = {
          timeout: setTimeout(() => {
            delete this.scheduled_messages[message_sequence_number_id]
            this.enqueue(message)
            this.tryFlush()
          }, scheduled_enqueued_time.getTime() - Date.now()),
          message,
        }
      } else {
        messages_for_immediate_delivery.push(message)
      }
    }

    this.enqueue(...messages_for_immediate_delivery)
    this.tryFlush()

    return messages
  }

  private listNonExpiredMessages(args: { include_locked: boolean }) {
    return [
      ...this._messages.toArray().map(({ message }) => message),
      ...(args.include_locked
        ? [...this.locked_messages.values()].map(({ message }) => message)
        : []),
      ...[...this.deferred_messages.values()],
      ...[...Object.values(this.scheduled_messages)].map(
        ({ message }) => message,
      ),
    ].filter(
      (m) =>
        !m.absolute_expiry_time ||
        new Date(m.absolute_expiry_time) > new Date(),
    )
  }

  // TODO: which messages should/shouldn't be included in the count??
  get messageCount() {
    return this.listNonExpiredMessages({ include_locked: true }).length
  }

  get messageCountDetails(): MessageCountDetails {
    const non_expired_messages = this.listNonExpiredMessages({
      include_locked: true,
    })

    return {
      activeMessageCount: non_expired_messages.length,
      scheduledMessageCount: non_expired_messages.filter(
        (message) =>
          message.message_annotations?.[Constants.scheduledEnqueueTime] !=
            null && !this.locked_messages.has(message.message_id),
      ).length,
      transferDeadLetterMessageCount: this.num_messages_transferred_to_dlq,
      // TODO: implement this
      deadLetterMessageCount: 0,
      // TODO: implement this once transferring is added
      transferMessageCount: 0,
    }
  }

  peekMessages(messageCount: number) {
    this.refreshIdleTimeout()

    const peekable_messages = this.listNonExpiredMessages({
      include_locked: false,
    }).sort(
      (a, b) =>
        serializedLong
          .parse(b.message_annotations[Constants.sequenceNumber])
          .toNumber() -
        serializedLong
          .parse(a.message_annotations[Constants.sequenceNumber])
          .toNumber(),
    )

    // TODO: introduce more efficient implementation...
    return peekable_messages
      .slice(peekable_messages.length - messageCount, peekable_messages.length)
      .reverse()
  }

  cancelScheduledMessage(sequence_number: Long): boolean {
    this.refreshIdleTimeout()

    const existing_timeout = this.scheduled_messages[sequence_number.toString()]

    if (!existing_timeout) {
      return false
    }

    clearTimeout(existing_timeout.timeout)
    return true
  }

  private scheduleMessagesInFront(...message: ScheduledMessage<M>[]) {
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

    const locked_until = +Date.now() + locked_message.lock_duration_ms

    locked_message.message.message_annotations[Constants.lockedUntil] =
      new Date(locked_until)

    locked_message.timeout.refresh()
    return locked_until
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

          if (consumer.sender.rcv_settle_mode === 1) {
            delivery.update(true)
          }

          // take this as wanting to defer
          if (delivery.remote_state?.["undeliverable_here"]) {
            message.message_annotations[Constants.messageState] =
              BrokerConstants.messageState.deferred

            this.deferred_messages.set(
              serializedLong
                .parse(message.message_annotations[Constants.sequenceNumber])
                .toString(),
              message,
            )
            return
          }

          const maxDeliveryCount = this.queue.properties.maxDeliveryCount

          if ((message.delivery_count ?? 1) >= maxDeliveryCount) {
            // TODO: add dead letter reason for max redeliveries
            message.application_properties ??= {}
            message.application_properties[BrokerConstants.deadLetterReason] =
              BrokerConstants.errors.maxDeliveryCountExceeded.reason
            message.application_properties[
              BrokerConstants.deadLetterDescription
            ] = BrokerConstants.errors.maxDeliveryCountExceeded.description

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
            message.application_properties[BrokerConstants.deadLetterReason] =
              error.info["DeadLetterReason"]
            message.application_properties[
              BrokerConstants.deadLetterDescription
            ] = error.info["DeadLetterErrorDescription"]
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
    Object.values(this.scheduled_messages).forEach(({ timeout }) =>
      clearTimeout(timeout),
    )
    Object.values(this.message_expiration_timeouts).forEach(clearTimeout)

    Object.values(this.locked_messages).forEach(({ timeout }) =>
      clearTimeout(timeout),
    )
  }

  private tryFlush() {
    let consumer: QueueConsumer<ScheduledMessage<M>> | undefined

    const lockDurationMs = Temporal.Duration.from(
      this.queue.properties.lockDuration,
    ).total({ unit: "millisecond" })

    this.refreshIdleTimeout()

    while (
      (consumer = Object.values(this.consumers).find(
        (consumer) =>
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

      message.message_annotations[Constants.lockedUntil] =
        +new Date().getTime() + lockDurationMs

      // TODO: timeout
      const delivery = consumer.sender.send(message)

      message.delivery_count ??= 0
      message.delivery_count += 1

      this.logger?.debug(
        {
          delivery_id: delivery.id,
          consumer: consumer.sender.name,
          delivery_tag: Buffer.from(delivery.tag).length,
        },
        "Sent message",
      )

      consumer.current_delivery.store(delivery, { delivery, message })

      this.propagateAccess()
    }
  }
}

export class BrokerQueueWithSubqueues<M extends TaggedMessage> {
  constructor(
    private store: BrokerStore,
    public queue_id: string,
    private logger: Logger | undefined,
    private consumer_balancer: BrokerConsumerBalancer,
  ) {}

  private sequence_number_factory = new SequenceNumberFactory()

  private queue = new BrokerQueue<M>(
    this.store,
    this.queue_id,
    this.logger,
    this.consumer_balancer,
    this.sequence_number_factory,
  )

  private queue_deadletter = new BrokerQueue<M>(
    this.store,
    this.queue_id,
    this.logger,
    this.consumer_balancer,
    this.sequence_number_factory,
  )

  get(subqueue_type?: SubqueueType) {
    if (subqueue_type === "deadletter") {
      return this.queue_deadletter
    }

    return this.queue
  }

  removeConsumers(...args: Parameters<BrokerQueue<M>["removeConsumers"]>) {
    this.queue.removeConsumers(...args)
    this.queue_deadletter.removeConsumers(...args)
  }

  close() {
    this.queue_deadletter.close()
    this.queue.close()
  }
}
