import {
  encodeRheaMessage,
  parseBatchOrMessage,
  parseRheaMessage,
} from "../amqp/parse-message.js"
import type { azure_routes } from "../integration/azure/routes.js"
import type { IntegrationStore } from "../integration/integration.js"
import {
  BrokerConnectionEvent,
  BrokerMessageEvent,
  BrokerReceiverEvent,
  BrokerSenderEvent,
  BrokerServer,
  BrokerServerOpts,
} from "./server.js"
import {
  type Receiver,
  type Sender,
  type Session,
  generate_uuid,
  Connection,
} from "rhea"
import { BrokerConsumerBalancer } from "./consumer-balancer.js"
import { getQueueFromStoreOrThrow } from "./util.js"
import { Constants } from "@azure/core-amqp"
import { Deque } from "@datastructures-js/deque"
import { z } from "zod"
import {
  serializedLong,
  unserializedLongToArrayLike,
  unserializedLongToBufferLike,
} from "../util/long.js"
import { BrokerConstants } from "./constants.js"

export type BrokerStore = IntegrationStore<typeof azure_routes>

export interface QualifiedNamespaceId {
  subscription_id: string
  namespace_name: string
  resource_group_name: string
}

export interface QualifiedQueueId extends QualifiedNamespaceId {
  queue_name: string
}

export class AzureServiceBusBroker extends BrokerServer {
  private readonly connection_handshakes: Record<
    string,
    Deque<QualifiedQueueId>
  > = {}

  private readonly link_queue = new WeakMap<
    Sender | Receiver,
    QualifiedQueueId
  >()

  private completeHandshake(connection: Connection, queue: QualifiedQueueId) {
    this.connection_handshakes[connection.container_id] ??= new Deque()
    this.connection_handshakes[connection.container_id]!.pushFront(queue)
  }

  private consumeHandshake(connection: Connection) {
    const queue = this.connection_handshakes[connection.container_id]?.popBack()
    if (this.connection_handshakes[connection.container_id]?.size() === 0) {
      // GC
      delete this.connection_handshakes[connection.container_id]
    }
    return queue
  }

  private cbs_senders: Record<string, Sender> = {}

  // TODO: cleanup
  // private readonly queue_consumers: Record<string, Sender> = {}
  private readonly consumer_balancer = new BrokerConsumerBalancer(
    this.store,
    this.logger,
  )

  private session_id_map = new WeakMap<Session, string>()

  override async onMessage({
    message,
    delivery,
    receiver,
    connection,
    session,
  }: BrokerMessageEvent): Promise<void> {
    const operation = message.application_properties?.["operation"]

    try {
      const respondSuccess = (consumer: Sender, body?: any) =>
        consumer.send({
          correlation_id: message.message_id,
          body,
          application_properties: {
            "status-code": 200,
          },
        })

      if (message.reply_to && operation === Constants.operationPutToken) {
        const consumer = this.cbs_senders[message.reply_to]
        if (!consumer) {
          this.logger?.error(
            { reply_to: message.reply_to },
            "Could not reply to queue consumer",
          )
          throw new Error("Could not reply to queue consumer")
        }

        // perform initial handshake

        const sb_connection_string = message.application_properties?.["name"]

        if (!sb_connection_string) {
          this.logger?.error("No connection string")
          throw new Error("No connection string")
        }

        let sb_connection_url: URL

        try {
          sb_connection_url = new URL(sb_connection_string)
        } catch (err) {
          this.logger?.error({ err }, "Failed to parse sb connection string")
          throw new Error("Failed to parse sb connection string")
        }

        const [
          ,
          subscription_id,
          resource_group_name,
          namespace_name,
          queue_name,
        ] = sb_connection_url.pathname.split("/")

        if (
          !subscription_id ||
          !resource_group_name ||
          !namespace_name ||
          !queue_name
        ) {
          this.logger?.error(
            { sb_connection_string },
            "Invalid sb connection string",
          )
          throw new Error("Invalid sb connection string")
        }

        const queue = {
          resource_group_name,
          namespace_name,
          subscription_id,
          queue_name,
        }

        // ensure queue exists
        getQueueFromStoreOrThrow(queue, this.store, this.logger)

        this.completeHandshake(connection, queue)

        this.logger?.info(
          {
            resource_group_name,
            namespace_name,
            subscription_id,
            sb_connection_string,
          },
          "Handshake initialized",
        )

        delivery.accept()
        respondSuccess(consumer, "Accepted")
      } else {
        if (operation) {
          const parsed = z
            .discriminatedUnion("operation", [
              z.object({
                operation: z.literal(Constants.operations.scheduleMessage),
                body: z.object({
                  messages: z.array(
                    z.object({
                      message: z.instanceof(Buffer),
                      [Constants.messageIdMapKey]: z.string(),
                    }),
                  ),
                }),
              }),
              z.object({
                operation: z.literal(
                  Constants.operations.cancelScheduledMessage,
                ),
                body: z.object({
                  [Constants.sequenceNumbers]: serializedLong.array(),
                }),
              }),
              z.object({
                operation: z.literal(Constants.operations.peekMessage),
                body: z.object({
                  [Constants.fromSequenceNumber]: serializedLong,
                  [Constants.messageCount]: z.number(),
                }),
              }),
              z.object({
                operation: z.literal(
                  Constants.operations.receiveBySequenceNumber,
                ),
                body: z.object({
                  [Constants.sequenceNumbers]: serializedLong.array(),
                  [Constants.receiverSettleMode]: z.number().int(),
                }),
              }),
              z.object({
                operation: z.literal(
                  BrokerConstants.debug.operations.setSequenceNumber,
                ),
                body: z.object({
                  [Constants.sequenceNumber]: serializedLong,
                }),
              }),
            ])
            .safeParse({
              operation,
              body: message.body,
            })

          if (!parsed.success) {
            this.logger?.warn(
              { err: parsed.error.format() },
              `Failed to parse message operation "${operation}"`,
            )
            return
          }

          if (
            parsed.data.operation ===
            BrokerConstants.debug.operations.setSequenceNumber
          ) {
            const sequenceNumber = parsed.data.body[Constants.sequenceNumber]

            this.logger?.info(
              `Setting broker sequence number to ${sequenceNumber.toString()}`,
            )

            this.consumer_balancer["next_sequence_number"] = sequenceNumber

            delivery.accept()
            return
          }

          if (!message.reply_to) {
            this.logger?.error(
              {
                receiver: receiver.name,
                operation,
              },
              "Expected message to have reply_to",
            )
            throw new Error("Expected message to have reply_to")
          }

          const consumer = this.cbs_senders[message.reply_to]
          if (!consumer) {
            this.logger?.error(
              { reply_to: message.reply_to },
              "Could not reply to queue consumer",
            )
            throw new Error("Could not reply to queue consumer")
          }

          const queue = this.link_queue.get(receiver)

          if (!queue) {
            this.logger?.error(
              "Could not find queue for receiver, did the handshake go through?",
            )
            throw new Error(
              "Could not find queue for receiver, did the handshake go through?",
            )
          }

          this.logger?.debug(
            {
              reply_to: message.reply_to,
              queue_name: queue.queue_name,
              properties: message.application_properties,
              receiver: receiver.name,
              body: message.body,
            },
            `Performing operation ${parsed.data.operation}...`,
          )

          switch (parsed.data.operation) {
            case Constants.operations.scheduleMessage:
              {
                const sequenceNumbers =
                  this.consumer_balancer.deliverMessagesToQueue(
                    queue,
                    ...parsed.data.body.messages.flatMap(
                      ({ message: buffer, "message-id": mid }) =>
                        parseBatchOrMessage(buffer).map((v) => {
                          v["message_id"] ??= mid ?? generate_uuid()
                          return v as typeof v & { message_id: string }
                        }),
                    ),
                  )

                delivery.accept()
                respondSuccess(consumer, {
                  [Constants.sequenceNumbers]: sequenceNumbers,
                })
              }
              break

            case Constants.operations.cancelScheduledMessage:
              {
                const sequenceNumbers =
                  parsed.data.body[Constants.sequenceNumbers]

                for (const sequenceNumber of sequenceNumbers) {
                  if (
                    !this.consumer_balancer.cancelScheduledMessage(
                      queue,
                      sequenceNumber,
                    )
                  ) {
                    this.logger?.warn(
                      `Tried to schedule sequence ${sequenceNumber} which was not found!`,
                    )
                  }
                }

                delivery.accept()
                respondSuccess(consumer)
              }
              break

            case Constants.operations.peekMessage:
              {
                const {
                  [Constants.fromSequenceNumber]: sequenceNumber,
                  // TODO: do we need to correlate w/ sequence number and "replay" certain messages?
                  [Constants.messageCount]: messageCount,
                } = parsed.data.body

                const peekedMessages =
                  this.consumer_balancer.peekMessageFromQueue(
                    queue,
                    messageCount,
                  )

                this.logger?.debug(
                  {
                    peekedMessages,
                  },
                  "peeking messages...",
                )

                delivery.accept()
                respondSuccess(consumer, {
                  messages: peekedMessages.map((m) => ({
                    message: encodeRheaMessage(m),
                  })),
                })
              }
              break

            case Constants.operations.receiveBySequenceNumber:
              {
                const {
                  [Constants.sequenceNumbers]: sequenceNumbers,
                  // TODO: figure this out
                  [Constants.receiverSettleMode]: receiverSettleMode,
                } = parsed.data.body

                respondSuccess(consumer, {
                  messages: this.consumer_balancer
                    .consumeDeferredMessages(queue, ...sequenceNumbers)
                    .map((m) => ({ message: encodeRheaMessage(m) })),
                })

                if (receiverSettleMode === 1) {
                  delivery.accept()
                  delivery.update(true)
                }
              }
              break

            default:
              {
                this.logger?.error(
                  { message },
                  `Unhandled operation ${operation}`,
                )
              }
              break
          }
        } else {
          const queue = this.link_queue.get(receiver)

          if (!queue) {
            this.logger?.error(
              "Could not find queue for receiver, did the handshake go through?",
            )
            throw new Error(
              "Could not find queue for receiver, did the handshake go through?",
            )
          }

          const parsed_message = parseRheaMessage(message)
          const messages_to_enqueue = parseBatchOrMessage(parsed_message)

          this.logger?.debug(
            {
              receiver: receiver.name,
              queue_name: queue.queue_name,
              num_messages: messages_to_enqueue.length,
            },
            "delivering message batch",
          )

          this.consumer_balancer.deliverMessagesToQueue(
            queue,
            ...messages_to_enqueue.map((m) => {
              m["message_id"] ??= generate_uuid()
              return m as typeof m & { message_id: string }
            }),
          )
          delivery.accept()
        }
      }
    } catch (e: any) {
      delivery.reject({ description: e.message })
    }
  }

  override async onReceiverOpen({
    receiver,
  }: BrokerReceiverEvent): Promise<void> {
    this.logger?.debug({ receiver: receiver.name }, "receiver opened")

    const queue = this.consumeHandshake(receiver.connection)

    if (queue) {
      this.link_queue.set(receiver, queue)
    }
  }
  override async onReceiverClose({
    receiver,
  }: BrokerReceiverEvent): Promise<void> {
    this.link_queue.delete(receiver)
  }

  override async onSenderOpen({ sender }: BrokerSenderEvent): Promise<void> {
    this.logger?.debug(
      { sender: sender.name, properties: sender.properties },
      "sender opened",
    )

    const queue = this.consumeHandshake(sender.connection)

    if (queue) {
      this.consumer_balancer.add(queue, sender)
    } else {
      this.cbs_senders[sender.name] = sender
    }
  }

  override async onSenderClose({ sender }: BrokerSenderEvent): Promise<void> {
    this.link_queue.delete(sender)

    if (sender.name in this.cbs_senders) {
      delete this.cbs_senders[sender.name]
    } else {
      this.consumer_balancer.remove(sender)
    }
  }

  private getSessionId(session: Session): string {
    const res = this.session_id_map.get(session)

    if (res) {
      return res
    } else {
      const id = this.generateUUID()
      this.session_id_map.set(session, id)
      return id
    }
  }

  protected override async onConnectionClose({
    connection,
  }: BrokerConnectionEvent): Promise<void> {
    this.consumer_balancer.removeConsumers(
      (sender) => sender.connection === connection,
    )
  }

  override async close(): Promise<void> {
    this.consumer_balancer.close()
    return await super.close()
  }

  constructor(
    private store: BrokerStore,
    opts?: BrokerServerOpts,
  ) {
    super(opts)
  }
}
