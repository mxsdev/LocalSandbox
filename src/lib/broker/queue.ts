import { Delivery, generate_uuid, Message, Sender, SenderEvents } from "rhea"
import { Deque } from "@datastructures-js/deque"
import { Logger } from "pino"
import { Constants } from "@azure/core-amqp"

interface QueueConsumer {
  sender: Sender
  current_delivery?: Delivery
  listeners: Partial<Record<SenderEvents, (...args: any[]) => void>>
}

export class BrokerQueue<M extends Message> {
  _messages = new Deque<M>()

  constructor(private logger: Logger | undefined) {}

  private enqueue(...messages: M[]) {
    messages
      .map((m) => {
        m.message_id ??= generate_uuid()
        return m
      })
      .map(this._messages.pushFront.bind(this._messages))
  }

  private dequeue() {
    return this._messages.popBack()
  }

  private consumers: Record<string, QueueConsumer> = {}

  scheduleMessages(...message: M[]) {
    this.enqueue(...message)
    this.tryFlush()
  }

  addConsumer(sender: Sender) {
    const listeners = {
      [SenderEvents.senderOpen]: (e: any) => {
        this.logger?.trace({ sender: e.sender.name }, "sender is open")
        this.tryFlush()
      },
      [SenderEvents.sendable]: (e: any) => {
        this.logger?.trace("sender is sendable")
        this.tryFlush()
      },
      [SenderEvents.accepted]: (e: { delivery: Delivery; sender: Sender }) => {
        this.logger?.trace("sender accepted message")

        const consumer = this.consumers[sender.name]

        if (!consumer) {
          this.logger?.error({ sender: sender.name }, "Could not find consumer")
          return
        }

        if (!consumer.current_delivery) {
          this.logger?.error(
            { sender: sender.name },
            "Expected to find delivery...",
          )
          return
        }

        if (e.sender.rcv_settle_mode === 1) {
          consumer.current_delivery.update(true)
        }

        delete consumer.current_delivery
      },
      [SenderEvents.settled]: (e: { delivery: Delivery; sender: Sender }) => {
        this.logger?.trace("sender settled")
      },
      [SenderEvents.rejected]: (e: any) => {
        this.logger?.trace("sender rejected message")

        const consumer = this.consumers[sender.name]

        if (!consumer) {
          this.logger?.error({ sender: sender.name }, "Could not find consumer")
          return
        }

        if (!consumer.current_delivery) {
          this.logger?.error(
            { sender: sender.name },
            "Expected to find delivery...",
          )
          return
        }

        delete this.consumers[sender.name]!.current_delivery
      },
    }

    Object.entries(listeners).forEach((args) => sender.addListener(...args))

    this.consumers[sender.name] = { sender, listeners }
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

  close() {}

  private tryFlush() {
    for (
      let consumer = Object.values(this.consumers).find(
        (consumer) => !consumer.current_delivery,
      );
      consumer &&
      consumer.sender.sendable() &&
      consumer.sender.is_open() &&
      consumer.sender.is_remote_open() &&
      this._messages.size() > 0;

    ) {
      const message = this.dequeue()!

      message.message_annotations ??= {}

      // From: sdk/servicebus/service-bus/src/serviceBusMessage.ts:602
      //
      // Constants.enqueuedTime
      // Constants.sequenceNumber
      // Constants.enqueueSequenceNumber
      // Constants.messageState
      //    1 => deferred
      //    2 => scheduled
      // Constants.deadLetterSource

      message.message_annotations[Constants.lockedUntil] =
        +new Date().getTime() + 1000000000

      // TODO: timeout
      const delivery = consumer.sender.send(message)

      consumer.current_delivery = delivery
    }
  }
}
