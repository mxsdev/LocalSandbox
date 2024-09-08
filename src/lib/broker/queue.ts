import rhea, { message } from "rhea"
import { Temporal } from "@js-temporal/polyfill"
import { Delivery, Message, Sender, SenderEvents } from "rhea"
import { Logger, P } from "pino"
import { Constants } from "@azure/core-amqp"
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
import {
  BrokerStore,
  DeliveryTag,
  QualifiedMessageDestinationId,
  QueueModel,
  SenderName,
  SubqueueType,
  SubscriptionModel,
} from "./types.js"
import {
  getQualifiedIdFromModel,
  getQueueFromStoreOrThrow,
  getSubscriptionFromStoreOrThrow,
  getTopicFromStoreOrThrow,
  populateMessageWithDefaultExpiryTime,
} from "./util.js"
import {
  MinPriorityQueue,
  PriorityQueue,
} from "@datastructures-js/priority-queue"
import {
  parseRheaMessage,
  parseRheaMessageBody,
} from "../amqp/parse-message.js"

interface QueueConsumerDeliveryInfo<M extends TaggedMessage> {
  delivery: Delivery
  message: ScheduledMessage<M>
}

type MessageWithProperties<Base extends Message, MessageAnnotations> = Base & {
  message_annotations: MessageAnnotations
}

type MessageWithSequenceNumber<Base extends Message> = MessageWithProperties<
  Base,
  {
    [Constants.sequenceNumber]: BufferLikeEncodedLong
  }
>

class MessageScheduler<M extends Message> {
  private scheduled_messages: Record<
    string,
    { timeout: NodeJS.Timeout; message: ScheduledMessage<M> }
  > = {}

  constructor(private sendMessage: (message: ScheduledMessage<M>) => void) {}

  get messages() {
    return Object.values(this.scheduled_messages).map(({ message }) => message)
  }

  scheduleMessage(message: ScheduledMessage<M>, scheduled_enqueued_time: Date) {
    const message_sequence_number_id = serializedLong
      .parse(message.message_annotations[Constants.sequenceNumber])
      .toString()

    message.message_annotations[Constants.messageState] =
      BrokerConstants.messageState.scheduled

    this.scheduled_messages[message_sequence_number_id] = {
      timeout: setTimeout(() => {
        delete this.scheduled_messages[message_sequence_number_id]
        this.sendMessage(message)
      }, scheduled_enqueued_time.getTime() - Date.now()),
      message,
    }

    return message
  }

  cancelMessage(sequence_number: Long) {
    const existing_timeout = this.scheduled_messages[sequence_number.toString()]

    if (!existing_timeout) {
      return false
    }

    clearTimeout(existing_timeout.timeout)
    return true
  }

  close() {
    Object.values(this.scheduled_messages).forEach(({ timeout }) =>
      clearTimeout(timeout),
    )
  }
}

class DeliveryMap<T> {
  private _deliveries: Record<string, T> = {}

  get deliveries() {
    return Object.values(this._deliveries)
  }

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
  constructor(private initial_sequence_number = new Long(1)) {}

  private next_sequence_number = this.initial_sequence_number

  allocateNextSequenceNumber() {
    const sequence_number = this.next_sequence_number
    this.next_sequence_number = this.next_sequence_number.add(1)
    return sequence_number
  }

  bindToMessage<M extends Message>(msg: M, force_reallocation = false) {
    msg.message_annotations ??= {}

    if (force_reallocation) {
      msg.message_annotations[Constants.sequenceNumber] =
        unserializedLongToBufferLike.parse(this.allocateNextSequenceNumber())
    } else {
      msg.message_annotations[Constants.sequenceNumber] ??=
        unserializedLongToBufferLike.parse(this.allocateNextSequenceNumber())
    }

    return msg as typeof msg & {
      message_annotations: {
        [Constants.sequenceNumber]: z.output<
          typeof unserializedLongToBufferLike
        >
      }
    }
  }
}

interface MessageConsumer<M extends TaggedMessage> {
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

// TODO: include subscription model
type QueueOrSubscription = QueueModel | SubscriptionModel

type EnqueuedMessage<M extends TaggedMessage> = {
  message: ScheduledMessage<M>
  scheduled_at: Date
}

function compareScheduledMessages<M extends TaggedMessage>(
  a: Pick<EnqueuedMessage<M>, "message">,
  b: Pick<EnqueuedMessage<M>, "message">,
) {
  return serializedLong
    .parse(a.message.message_annotations[Constants.sequenceNumber])
    .compare(
      serializedLong.parse(
        b.message.message_annotations[Constants.sequenceNumber],
      ),
    )
}

class MessageConsumers<M extends TaggedMessage> {
  private _consumers: Record<
    string,
    MessageConsumer<M> & { session_id?: string }
  > = {}
  private _consumer_by_session: Record<string, MessageConsumer<M>> = {}

  get values() {
    return Object.values(this._consumers)
  }

  get(sender: Pick<Sender, "name">) {
    return this._consumers[sender.name]
  }

  add(consumer: MessageConsumer<M>, sessionId?: string) {
    if (sessionId && this._consumer_by_session[sessionId]) {
      // TODO: use error instance so it can be caught upstack
      throw new Error("Session already exists")
    }

    this._consumers[consumer.sender.name] = {
      ...consumer,
      session_id: sessionId,
    }
    if (sessionId) {
      this._consumer_by_session[sessionId] = consumer
    }
  }

  remove(sender: Pick<Sender, "name">) {
    const val = this._consumers[sender.name]

    if (val?.session_id) {
      delete this._consumer_by_session[val.session_id]
    }

    delete this._consumers[sender.name]
  }
}

export abstract class MessageSequence<M extends TaggedMessage> {
  private _messages = new PriorityQueue<EnqueuedMessage<M>>(
    compareScheduledMessages,
  )
  private _session_messages: Record<string, PriorityQueue<EnqueuedMessage<M>>> =
    {}

  private deferred_messages = new Map<string, ScheduledMessage<M>>()
  private locked_messages = new Map<
    string,
    {
      message: ScheduledMessage<M>
      timeout: NodeJS.Timeout
      lock_duration_ms: number
    }
  >()
  private message_scheduler = new MessageScheduler<ScheduledMessage<M>>(
    (message) => {
      this.enqueue(message)
      this.tryFlush()
    },
  )

  private message_expiration_timeouts: Record<string, NodeJS.Timeout> = {}

  // private consumers: Record<string, MessageConsumer<ScheduledMessage<M>>> = {}
  private consumers = new MessageConsumers<M>()

  private num_messages_transferred_to_dlq: number = 0

  constructor(
    protected store: BrokerStore,
    public queue_or_subscription_id: string,
    protected logger: Logger | undefined,
    private consumer_balancer: BrokerConsumerBalancer,
    protected parent: BrokerMessageSequenceWithSubqueues<M>,
    private sequence_number_factory = new SequenceNumberFactory(),
  ) {}

  abstract queue_type: "sb_queue" | "sb_subscription"
  abstract get queue(): QueueOrSubscription

  private get fifo() {
    return false
  }

  private pushMessage(message: ScheduledMessage<M>) {
    message.message_annotations[Constants.enqueuedTime] = new Date()
    message.message_annotations[Constants.messageState] ??=
      BrokerConstants.messageState.active

    this._messages.enqueue({
      message,
      scheduled_at: message.message_annotations[Constants.enqueuedTime],
    })
  }

  private enqueue(...messages: ScheduledMessage<M>[]) {
    messages.forEach((message) => this.pushMessage(message))
  }

  private enqueueFront(...messages: ScheduledMessage<M>[]) {
    messages.forEach((message) => this.pushMessage(message))
  }

  private dequeue() {
    try {
      return this._messages.dequeue()
    } catch {
      return undefined
    }
  }

  private refreshIdleTimeout() {
    this.queue.autoDeleteTimeout?.refresh()
  }

  /**
   * Should be called whenever a new receive request is made or a message is
   * sent
   */
  private propagateAccess() {
    this.logger?.debug(
      {
        queue_or_subscription_id: this.queue_or_subscription_id,
        queue_type: this.queue_type,
      },
      "Propagating access...",
    )

    switch (this.queue_type) {
      case "sb_queue":
        {
          this.store.sb_queue
            .update()
            .where((q) => q.id === this.queue_or_subscription_id)
            .set((v) => ({
              properties: {
                ...v.properties,
                accessedAt: new Date().toISOString(),
              },
            }))
            .executeTakeFirstOrThrow()
        }
        break

      case "sb_subscription": {
        this.store.sb_subscription
          .update()
          .where((q) => q.id === this.queue_or_subscription_id)
          .set((v) => ({
            properties: {
              ...v.properties,
              accessedAt: new Date().toISOString(),
            },
          }))
          .executeTakeFirstOrThrow()
      }
    }
  }

  private tryDeadletterMessage(
    message: ScheduledMessage<M>,
    reason?: string,
    description?: string,
  ) {
    const queue = this.queue

    this.logger?.debug(
      {
        reason,
        description,
        message: message.message_id,
        sequence_number: message.message_annotations[Constants.sequenceNumber],
      },
      "Deadlettering message",
    )

    if (queue.properties.forwardDeadLetteredMessagesTo === queue.name) {
      // TODO: parity test this error
      throw new Error("Cannot dead-letter to self")
    }

    const queue_id = getQualifiedIdFromModel(queue)

    message.message_annotations[Constants.deadLetterReason] = reason
    message.message_annotations[Constants.deadLetterDescription] = description

    if (queue.properties.forwardDeadLetteredMessagesTo) {
      // send to destination
      message.message_annotations[Constants.deadLetterSource] =
        queue._model === "sb_queue"
          ? queue.name!
          : `${queue.sb_topic().name!}/${BrokerConstants.subscriptionsSubqueue}/${queue.name!}`

      if (queue._model === "sb_subscription") {
        // TODO: better understand the circumstances when we need to update this value
        message.message_annotations[Constants.enqueueSequenceNumber] =
          message.message_annotations[Constants.sequenceNumber]
        // @ts-expect-error This property is not needed for sendMessagesToQueue below
        delete message.message_annotations[Constants.sequenceNumber]
      }

      // TODO: should we throw here if there's no queue, or if queue is invalid?
      // TODO: should we throw here if the message has already been dead lettered?

      const dlq_id: QualifiedMessageDestinationId = {
        namespace_name: queue_id.namespace_name,
        resource_group_name: queue_id.resource_group_name,
        subscription_id: queue_id.subscription_id,
        queue_or_topic_name: queue.properties.forwardDeadLetteredMessagesTo,
        subqueue: undefined,
      }

      this.logger?.debug({ dlq_id }, "Forwarding deadlettered message")

      this.consumer_balancer.sendMessagesToQueue(dlq_id, message)
    } else {
      this.logger?.debug("Forwarding deadlettered message to DLQ subqueue")
      this.parent.get("deadletter").scheduleMessages(message)
    }

    // TODO: figure out when "transfers" occur
    // this.num_messages_transferred_to_dlq++
  }

  private listNonExpiredMessages(args: { include_locked: boolean }) {
    return [
      ...this._messages.toArray().map(({ message }) => message),
      ...(args.include_locked
        ? [...this.locked_messages.values()].map(({ message }) => message)
        : []),
      ...[...this.deferred_messages.values()],
      ...this.message_scheduler.messages,
    ].filter(
      (m) =>
        !m.absolute_expiry_time ||
        new Date(m.absolute_expiry_time) > new Date(),
    )
  }

  private scheduleMessagesInFront(...message: ScheduledMessage<M>[]) {
    this.enqueueFront(...message)
    this.tryFlush()
  }

  private finishDelivery(consumer: MessageConsumer<M>, delivery: Delivery) {
    consumer.current_delivery["finish"](delivery)

    if (
      consumer.current_delivery.length === 0 &&
      consumer.schedule_for_deletion
    ) {
      this.logger?.debug(
        { sender: consumer.sender.name },
        "Deleting consumer since all deliveries are completed",
      )
      this.consumers.remove(consumer.sender)
    }

    this.refreshIdleTimeout()
  }

  private tryFlush() {
    let consumer: MessageConsumer<ScheduledMessage<M>> | undefined

    const lockDurationMs = Temporal.Duration.from(
      this.queue.properties.lockDuration,
    ).total("milliseconds")

    this.refreshIdleTimeout()
    this.propagateAccess()

    this.logger?.debug({ messages: this._messages.size() }, "Flushing messages")

    for (const consumer of this.consumers.values.filter(
      (consumer) =>
        consumer.sender.sendable() &&
        consumer.sender.is_open() &&
        consumer.sender.is_remote_open() &&
        (!this.fifo || this.locked_messages.size === 0) &&
        this._messages.size() > 0,
    )) {
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
            queue: this.queue_or_subscription_id,
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
    }
  }

  scheduleMessages(...sourceMessages: M[]): ScheduledMessage<M>[] {
    const messages = sourceMessages.map((msg) =>
      this.sequence_number_factory.bindToMessage(msg),
    )

    const messages_for_immediate_delivery: ScheduledMessage<M>[] = []

    const queue = this.queue

    const requiresDuplicateDetection =
      queue._model === "sb_queue"
        ? "requiresDuplicateDetection" in queue.properties &&
          !!queue.properties.requiresDuplicateDetection
        : !!queue.sb_topic().properties.requiresDuplicateDetection

    const duplicateDetectionMs = Temporal.Duration.from(
      queue._model === "sb_queue"
        ? queue.properties.duplicateDetectionHistoryTimeWindow
        : queue.sb_topic().properties.duplicateDetectionHistoryTimeWindow,
    ).total("milliseconds")

    for (const message of messages) {
      if (requiresDuplicateDetection) {
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

      if (queue.properties.defaultMessageTimeToLive) {
        populateMessageWithDefaultExpiryTime(
          message,
          queue.properties.defaultMessageTimeToLive,
        )
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

      if (this.queue_type === "sb_queue") {
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
          this.message_scheduler.scheduleMessage(
            message,
            scheduled_enqueued_time,
          )
        } else {
          messages_for_immediate_delivery.push(message)
        }
      } else {
        messages_for_immediate_delivery.push(message)
      }
    }

    this.logger?.debug(
      {
        requiresDuplicateDetection,
        duplicateDetectionMs,
        messages: messages.length,
        queue: this.queue_or_subscription_id,
        messages_for_immediate_delivery: messages_for_immediate_delivery.length,
      },
      "Scheduling messages",
    )

    this.enqueue(...messages_for_immediate_delivery)
    this.tryFlush()

    return messages
  }

  consumeDeferredMessage(sequenceId: Long) {
    const res = this.deferred_messages.get(sequenceId.toString())
    this.deferred_messages.delete(sequenceId.toString())
    return res
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
    return this.message_scheduler.cancelMessage(sequence_number)
  }

  renewLock(sender: SenderName, delivery_tag: DeliveryTag) {
    const consumer = this.consumers.get(sender)
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
    disposition: "completed" | "abandoned" | "rejected" | "suspended",
    args?: {
      deadLetterReason?: string
      deadLetterDescription?: string
    },
  ) {
    const consumer = this.consumers.get(sender)
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

      // TODO: figure out the difference between suspended and rejected
      case "suspended":
      case "rejected":
        {
          const error = delivery.remote_state?.["error"]

          if (
            error?.condition === Constants.deadLetterName ||
            args?.deadLetterReason ||
            args?.deadLetterDescription
          ) {
            message.application_properties ??= {}
            message.application_properties[BrokerConstants.deadLetterReason] =
              args?.deadLetterReason ?? error.info["DeadLetterReason"]
            message.application_properties[
              BrokerConstants.deadLetterDescription
            ] =
              args?.deadLetterDescription ??
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
      { sender: sender.name, queue_id: this.queue_or_subscription_id },
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
      [SenderEvents.senderDraining]: (e: any) => {
        this.logger?.debug("sender is draining")
        // this.tryFlush()
      },
      [SenderEvents.senderClose]: (e: any) => {
        this.logger?.debug("sender is closed")
        // this.tryFlush()
      },
      [SenderEvents.senderFlow]: (e: any) => {
        this.logger?.debug("sender in flow")
        // this.tryFlush()
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

    this.consumers.add({
      sender,
      listeners,
      current_delivery: new DeliveryMap(this.logger),
      schedule_for_deletion: false,
    })

    this.tryFlush()

    this.propagateAccess()
  }

  removeConsumer(sender: Sender) {
    this.logger?.debug({ sender: sender.name }, "Removing sender")

    const consumer = this.consumers.get(sender)

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
      this.consumers.remove(sender)
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
    this.message_scheduler.close()
    Object.values(this.message_expiration_timeouts).forEach(clearTimeout)

    Object.values(this.locked_messages).forEach(({ timeout }) =>
      clearTimeout(timeout),
    )
  }
}

class InnerQueue<M extends TaggedMessage> extends MessageSequence<M> {
  override queue_type = "sb_queue" as const

  override get queue() {
    return getQueueFromStoreOrThrow(
      this.queue_or_subscription_id,
      this.store,
      this.logger,
    )
  }
}

class InnerSubscription<M extends TaggedMessage> extends MessageSequence<M> {
  override queue_type = "sb_subscription" as const

  override get queue() {
    return getSubscriptionFromStoreOrThrow(
      this.queue_or_subscription_id,
      this.store,
      this.logger,
    )
  }
}

abstract class BrokerMessageSequenceWithSubqueues<M extends TaggedMessage> {
  protected abstract createMessageSequence(): MessageSequence<M>

  constructor(
    protected store: BrokerStore,
    public queue_id: string,
    protected logger: Logger | undefined,
    protected consumer_balancer: BrokerConsumerBalancer,
  ) {}

  protected sequence_number_factory = new SequenceNumberFactory()

  private queue = this.createMessageSequence()
  private queue_deadletter = this.createMessageSequence()

  get(subqueue_type?: SubqueueType) {
    if (subqueue_type === "deadletter") {
      return this.queue_deadletter
    }

    return this.queue
  }

  removeConsumers(...args: Parameters<MessageSequence<M>["removeConsumers"]>) {
    this.queue.removeConsumers(...args)
    this.queue_deadletter.removeConsumers(...args)
  }

  close() {
    this.queue_deadletter.close()
    this.queue.close()
  }
}

export class BrokerQueue<
  M extends TaggedMessage,
> extends BrokerMessageSequenceWithSubqueues<M> {
  override createMessageSequence(): MessageSequence<M> {
    return new InnerQueue(
      this.store,
      this.queue_id,
      this.logger,
      this.consumer_balancer,
      this,
      this.sequence_number_factory,
    )
  }
}

export class BrokerSubscription<
  M extends TaggedMessage,
> extends BrokerMessageSequenceWithSubqueues<M> {
  override createMessageSequence(): MessageSequence<M> {
    return new InnerSubscription(
      this.store,
      this.queue_id,
      this.logger,
      this.consumer_balancer,
      this,
      this.sequence_number_factory,
    )
  }

  private closeListeners: (() => void)[] = []

  onClose(listener: () => void) {
    this.closeListeners.push(listener)
  }

  // TODO: close subscription on deletion
  override close(): void {
    this.closeListeners.forEach((l) => l())
    this.closeListeners = []

    super.close()
  }
}

export class BrokerTopic<M extends TaggedMessage> {
  private get topic() {
    return getTopicFromStoreOrThrow(this.topic_id, this.store, this.logger)
  }

  private subscription_trigger_fn: any

  private sequence_number_factory = new SequenceNumberFactory(new Long(1))

  private message_scheduler = new MessageScheduler<M>((message) => {
    this.logger?.debug(
      {
        message_id: message.message_id,
        num_subscriptions: this.subscriptions.length,
      },
      "Enqueueing scheduled message",
    )

    this.enqueue(message, true)
    this.propagateAccess()
  })

  constructor(
    protected store: BrokerStore,
    public topic_id: string,
    protected logger: Logger | undefined,
    private consumer_balancer: BrokerConsumerBalancer,
  ) {
    this.subscription_trigger_fn = store.sb_subscription.registerTrigger({
      change: (args) => {
        if (!args.old_val || !args.new_val) {
          this.refreshSubscriptions()
        }
      },
    })

    this.refreshSubscriptions()
  }

  private refreshSubscriptions() {
    const subscriptions = this.topic.sb_subscriptions()

    const registered_subscription_ids = new Set(
      this.subscriptions.map((s) => s.queue_id),
    )
    const existing_subscription_ids = new Set(subscriptions.map((s) => s.id))

    for (const subscription of subscriptions) {
      if (!registered_subscription_ids.has(subscription.id)) {
        this.registerSubscription(
          new BrokerSubscription<M>(
            this.store,
            subscription.id,
            this.logger,
            this.consumer_balancer,
          ),
        )
      }
    }

    for (const registered_subscription of [...this.subscriptions]) {
      if (!existing_subscription_ids.has(registered_subscription.queue_id)) {
        registered_subscription.close()
      }
    }
  }

  private subscriptions: BrokerSubscription<M>[] = []

  private registerSubscription(subscription: BrokerSubscription<M>) {
    subscription.onClose(
      () =>
        (this.subscriptions = this.subscriptions.filter(
          (s) => s !== subscription,
        )),
    )

    this.subscriptions.push(subscription)
  }

  private propagateAccess() {
    this.logger?.debug(
      {
        topic_id: this.topic_id,
      },
      "Propagating access...",
    )

    this.store.sb_topic
      .update()
      .where((q) => q.id === this.topic_id)
      .set((v) => ({
        properties: {
          ...v.properties,
          accessedAt: new Date().toISOString(),
        },
      }))
      .executeTakeFirstOrThrow()
  }

  get messageCountDetails(): MessageCountDetails {
    return {
      scheduledMessageCount: this.message_scheduler.messages.length,
      activeMessageCount: 0,
      transferDeadLetterMessageCount: 0,
    }
  }

  private enqueue(
    _message: M,
    force_reallocation = false,
  ): ScheduledMessage<M>[] {
    // TODO: determine why this works this way (discovered in
    // src/test/parity/service-bus/subscription/scheduled.test.ts)
    const message = this.sequence_number_factory.bindToMessage(
      _message,
      force_reallocation,
    )

    message.message_annotations[Constants.enqueueSequenceNumber] =
      message.message_annotations[Constants.sequenceNumber]

    // @ts-expect-error This will be repopulated by scheduleMessages
    delete message.message_annotations[Constants.sequenceNumber]

    this.logger?.debug(
      {
        message_id: message.message_id,
        num_subscriptions: this.subscriptions.length,
        message_annotations: message.message_annotations,
      },
      "Enqueueing message to subscriptions",
    )

    return this.subscriptions.flatMap((sub) =>
      sub.get(undefined).scheduleMessages(structuredClone(message)),
    )
  }

  scheduleMessages(...sourceMessages: M[]): ScheduledMessage<M>[] {
    this.propagateAccess()

    return sourceMessages.flatMap((message) => {
      const boundMessage = this.sequence_number_factory.bindToMessage(message)

      const scheduled_enqueued_time = message.message_annotations?.[
        Constants.scheduledEnqueueTime
      ] as Date | undefined

      if (
        scheduled_enqueued_time &&
        scheduled_enqueued_time.getTime() > Date.now()
      ) {
        return [
          this.message_scheduler.scheduleMessage(
            // TODO: does this need to get reallocated?
            boundMessage,
            scheduled_enqueued_time,
          ),
        ]
      } else {
        return this.enqueue(boundMessage)
      }
    })
  }

  close() {
    this.store.sb_subscription.unregisterTrigger(this.subscription_trigger_fn)
  }

  getSubscription(subscriptionId: string) {
    this.propagateAccess()
    return this.subscriptions.find((s) => s.queue_id === subscriptionId)
  }

  onSubscriptionChange() {
    this.refreshSubscriptions()
  }

  cancelScheduledMessage(sequence_number: Long): boolean {
    return this.message_scheduler.cancelMessage(sequence_number)
  }
}
