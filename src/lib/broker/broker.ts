import {
  encodeRheaMessage,
  parseBatchOrMessage,
  parseRheaMessage,
} from "../amqp/parse-message.js"
import {
  type BrokerConnectionEvent,
  type BrokerMessageEvent,
  type BrokerReceiverEvent,
  type BrokerSenderEvent,
  BrokerServer,
  type BrokerServerOpts,
} from "./broker-server.js"
import rhea, {
  type Receiver,
  type Sender,
  type Session,
  type Connection,
} from "rhea"
import { BrokerConsumerBalancer } from "./consumer-balancer.js"
import {
  getQualifiedIdFromModel,
  getQueueOrTopicOrSubscriptionFromStoreOrThrow,
  isQualifiedMessageSourceId,
  isQualifiedQueueId,
} from "./util.js"
import { Constants } from "@azure/core-amqp"
import { Deque } from "@datastructures-js/deque"
import { z } from "zod"
import { serializedLong } from "../util/long.js"
import { BrokerConstants } from "./constants.js"
import { unreorderLockToken } from "../util/service-bus.js"
import type { Middleware } from "edgespec"
import type { Logger } from "pino"
import type {
  BrokerStore,
  QualifiedMessageDestinationId,
  QualifiedMessageSourceId,
} from "./types.js"
import { parseBrokerURL } from "./url.js"
import { StoreBusError } from "./errors.js"

type ConnectionQueueLinkId =
  | QualifiedMessageDestinationId
  | QualifiedMessageSourceId

export class AzureServiceBusBroker extends BrokerServer {
  private readonly connection_handshakes: Record<
    string,
    Deque<ConnectionQueueLinkId>
  > = {}

  private readonly link_queue = new WeakMap<
    Sender | Receiver,
    ConnectionQueueLinkId
  >()

  private completeHandshake(
    connection: Connection,
    queue: ConnectionQueueLinkId,
  ) {
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

  private readonly session_id_map = new WeakMap<Session, string>()

  override async onMessage({
    message,
    delivery,
    receiver,
    connection,
  }: BrokerMessageEvent): Promise<void> {
    const operation = message.application_properties?.["operation"]

    try {
      const respondSuccess = (consumer: Sender, body?: any) =>
        consumer.send({
          correlation_id: message.message_id,
          body,
          application_properties: {
            [Constants.statusCode]: rhea.types.wrap_int(200),
            statusCode: rhea.types.wrap_int(200),

            [Constants.statusDescription]: "OK",
            statusDescription: "OK",
          },
        })

      // const respondFailure = (
      //   consumer: Sender,
      //   status: number,
      //   statusDescription: string,
      //   errorCondition?: string,
      // ) =>
      //   consumer.send({
      //     correlation_id: message.message_id,
      //     body: {},
      //     application_properties: {
      //       [Constants.statusCode]: rhea.types.wrap_int(status),
      //       // TODO: figure out why this is not automatically fixed upstream...
      //       statusCode: rhea.types.wrap_int(status),

      //       [Constants.errorCondition]: errorCondition,
      //       errorCondition,

      //       [Constants.statusDescription]: statusDescription,
      //       statusDescription,
      //     },
      //   })

      if (message.reply_to && operation === Constants.operationPutToken) {
        const consumer = this.cbs_senders[message.reply_to]
        if (!consumer) {
          this.logger?.error({ message }, "Could not reply to queue consumer")
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

        this.logger?.debug(
          {
            sb_connection_string,
          },
          "Parsing connection string..",
        )

        const {
          namespace_name,
          queue_or_topic_name,
          resource_group_name,
          subscription_id,
          subqueue,
          subscription_name,
        } = parseBrokerURL(sb_connection_url)

        // ensure queue exists
        const queue_or_topic_or_subscription =
          getQueueOrTopicOrSubscriptionFromStoreOrThrow(
            {
              resource_group_name,
              namespace_name,
              subscription_id,
              queue_or_topic_name,
              subscription_name,
            },
            this.store,
            this.logger,
          )

        const queueId = getQualifiedIdFromModel(queue_or_topic_or_subscription)

        this.completeHandshake(connection, {
          ...queueId,
          subqueue,
        })

        this.logger?.info(
          {
            queueId,
            sb_connection_string,
          },
          "Handshake initialized",
        )

        delivery.accept()
        delivery.update(true)

        respondSuccess(consumer, "Accepted")
      } else {
        if (operation) {
          const serializedLockToken = z
            .instanceof(Buffer)
            .transform((b) => unreorderLockToken(b))
            .or(z.string().uuid())
          const parsed = z
            .discriminatedUnion("operation", [
              z.object({
                operation: z.literal(Constants.operations.scheduleMessage),
                body: z.object({
                  messages: z.array(
                    z.object({
                      message: z.instanceof(Buffer),
                      [Constants.messageIdMapKey]: z
                        .string()
                        .optional()
                        .nullable(),
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
                  [Constants.sessionIdMapKey]: z.string().optional(),
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
                operation: z.literal(Constants.operations.updateDisposition),
                associatedLinkName: z.string(),
                body: z.object({
                  [Constants.lockTokens]: serializedLockToken.array(),
                  // TODO: verify other disposition statuses...
                  [Constants.dispositionStatus]: z.enum([
                    "completed",
                    "abandoned",
                    "suspended",
                    // TODO: dead lettered?
                  ]),
                  [Constants.deadLetterReason]: z.string().optional(),
                  [Constants.deadLetterDescription]: z.string().optional(),
                }),
              }),
              z.object({
                operation: z.literal(Constants.operations.renewLock),
                associatedLinkName: z.string(),
                body: z.object({
                  [Constants.lockTokens]: serializedLockToken.array(),
                }),
              }),
              z.object({
                operation: z.literal(Constants.operations.renewSessionLock),
                body: z.object({
                  [Constants.sessionIdMapKey]: z.string(),
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
              associatedLinkName:
                message.application_properties?.[Constants.associatedLinkName],
              body: message.body,
            })

          if (!parsed.success) {
            this.logger?.warn(
              { err: parsed.error.format() },
              `Failed to parse message operation "${operation}"`,
            )
            return
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

          if (
            parsed.data.operation ===
            BrokerConstants.debug.operations.setSequenceNumber
          ) {
            const sequenceNumber = parsed.data.body[Constants.sequenceNumber]

            if (!isQualifiedQueueId(queue)) {
              throw new Error(
                "Cannot set sequence number on non-queue (unimplemented)",
              )
            }

            this.logger?.info(
              `Setting broker sequence number to ${sequenceNumber.toString()}`,
            )

            this.consumer_balancer.setSequenceNumber(queue, sequenceNumber)

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

          this.logger?.debug(
            {
              reply_to: message.reply_to,
              queue,
              properties: message.application_properties,
              receiver: receiver.name,
            },
            `Performing operation ${parsed.data.operation}...`,
          )

          switch (parsed.data.operation) {
            case Constants.operations.scheduleMessage:
              {
                const sequenceNumbers =
                  this.consumer_balancer.sendMessagesToQueue(
                    queue,
                    ...parsed.data.body.messages.flatMap(
                      ({ message: buffer, "message-id": mid }) =>
                        parseBatchOrMessage(buffer).map((v) => {
                          v["message_id"] ??= mid ?? rhea.generate_uuid()
                          return v as typeof v & { message_id: string }
                        }),
                    ),
                  )

                respondSuccess(consumer, {
                  [Constants.sequenceNumbers]: rhea.types.wrap_array(
                    sequenceNumbers.map((v) => v.value),
                    // 0x81,
                    (rhea.types as unknown as { Long: { typecode: number } })
                      .Long.typecode,
                    undefined,
                  ),
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
                      { ...queue, subqueue: undefined },
                      sequenceNumber,
                    )
                  ) {
                    this.logger?.warn(
                      `Tried to schedule sequence ${sequenceNumber.toString()} which was not found!`,
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
                  [Constants.sessionIdMapKey]: sessionId,
                  // TODO: do we need to correlate w/ sequence number and "replay" certain messages?
                  // [Constants.fromSequenceNumber]: sequenceNumber,
                  [Constants.messageCount]: messageCount,
                } = parsed.data.body

                if (!isQualifiedMessageSourceId(queue)) {
                  respondSuccess(consumer, {
                    messages: [],
                  })
                  return
                }

                const peekedMessages =
                  this.consumer_balancer.peekMessageFromQueue(
                    queue,
                    messageCount,
                    sessionId,
                  )

                respondSuccess(consumer, {
                  messages: peekedMessages.map((m) => ({
                    message: encodeRheaMessage(m),
                  })),
                })
                // delivery.accept()
              }
              break

            case Constants.operations.receiveBySequenceNumber:
              {
                if (!isQualifiedMessageSourceId(queue)) {
                  // TODO: test this
                  throw new Error("Cannot send message to destination")
                }

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

            case Constants.operations.updateDisposition:
              {
                if (!isQualifiedMessageSourceId(queue)) {
                  throw new Error("Cannot send message to destination")
                }

                const {
                  body: {
                    [Constants.lockTokens]: lockTokens,
                    [Constants.dispositionStatus]: dispositionStatus,
                    [Constants.deadLetterReason]: deadLetterReason,
                    [Constants.deadLetterDescription]: deadLetterDescription,
                  },
                  associatedLinkName,
                } = parsed.data

                lockTokens.forEach((tag) => {
                  this.consumer_balancer.updateConsumerDisposition(
                    queue,
                    { name: associatedLinkName },
                    { tag },
                    dispositionStatus,
                    {
                      deadLetterReason,
                      deadLetterDescription,
                    },
                  )
                })

                respondSuccess(consumer, {})
              }
              break

            case Constants.operations.renewLock:
              {
                if (!isQualifiedMessageSourceId(queue)) {
                  throw new Error("Cannot send message to destination")
                }

                const {
                  body: { [Constants.lockTokens]: lockTokens },
                  associatedLinkName,
                } = parsed.data

                const expirations = lockTokens
                  .map((tag) =>
                    this.consumer_balancer.renewLock(
                      queue,
                      { name: associatedLinkName },
                      { tag },
                    ),
                  )
                  .filter((x): x is Exclude<typeof x, undefined> => !!x)

                respondSuccess(consumer, {
                  // TODO: populate this...
                  expirations: rhea.types.wrap_array(
                    expirations,
                    // 0x83,
                    (
                      rhea.types as unknown as {
                        Timestamp: { typecode: number }
                      }
                    ).Timestamp.typecode,
                    undefined,
                  ),
                })
              }
              break

            case Constants.operations.renewSessionLock:
              {
                respondSuccess(consumer, {
                  // TODO: support session locking
                  expiration: Date.now() + 9999999999999,
                })
                delivery.accept()
                delivery.update(true)
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
              queue,
              num_messages: messages_to_enqueue.length,
            },
            "delivering message batch",
          )

          this.consumer_balancer.sendMessagesToQueue(
            queue,
            ...messages_to_enqueue.map((m) => {
              m["message_id"] ??= rhea.generate_uuid()
              return m as typeof m & { message_id: string }
            }),
          )

          delivery.accept()
        }
      }
    } catch (e: any) {
      if (e instanceof StoreBusError) {
        delivery.reject(e.amqpError)
        return
      }

      this.logger?.error({ err: e }, "Unexpected error on message")
      delivery.reject({ description: e.message })
    }
  }

  override async onReceiverOpen({
    receiver,
  }: BrokerReceiverEvent): Promise<void> {
    this.logger?.debug(
      {
        receiver: receiver.name,
        source: receiver.source.address,
        target: receiver.target.address,
      },
      "receiver opened",
    )

    receiver.set_target({ address: receiver.name })

    const queue = this.consumeHandshake(receiver.connection)

    if (queue) {
      ;(receiver as any).local.attach.max_message_size = 1024 * 1024 * 1024
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
      {
        sender: sender.name,
        properties: sender.properties,
        source: sender.source.address,
        target: sender.target.address,
        session: sender.source.filter?.[Constants.sessionFilterName],
      },
      "sender opened",
    )

    try {
      const queue = this.consumeHandshake(sender.connection)

      if (!queue) {
        sender.set_source({ address: sender.name })

        this.cbs_senders[sender.target.address ?? sender.name] = sender
      } else {
        if (!isQualifiedMessageSourceId(queue)) {
          this.logger?.error(
            { queue },
            "Tried to connect receiver to message destination",
          )
          return
        }

        this.consumer_balancer.add(queue, sender)
      }
    } catch (err) {
      if (err instanceof StoreBusError) {
        sender.close(err.amqpError)
        return
      }

      // TODO: filter based on error type
      this.logger?.error({ sender: sender.name, err }, "Error adding consumer")
    }
  }

  override async onSenderClose({ sender }: BrokerSenderEvent): Promise<void> {
    this.link_queue.delete(sender)

    this.logger?.debug({ sender: sender.name }, "sender closed")

    if (sender.name in this.cbs_senders) {
      delete this.cbs_senders[sender.name]
    } else {
      this.consumer_balancer.remove(sender)
    }
  }

  protected override async onConnectionClose({
    connection,
  }: BrokerConnectionEvent): Promise<void> {
    this.consumer_balancer.removeConsumers(
      (sender) => sender.connection === connection,
    )
  }

  messageSourceMessageCount(
    ...args: Parameters<BrokerConsumerBalancer["messageSourceMessageCount"]>
  ) {
    return this.consumer_balancer.messageSourceMessageCount(...args)
  }

  messageSourceMessageCountDetails(
    ...args: Parameters<
      BrokerConsumerBalancer["messageSourceMessageCountDetails"]
    >
  ) {
    return this.consumer_balancer.messageSourceMessageCountDetails(...args)
  }

  messageDestinationMessageCountDetails(
    ...args: Parameters<
      BrokerConsumerBalancer["messageSourceMessageCountDetails"]
    >
  ) {
    return this.consumer_balancer.messageDestinationMessageCountDetails(...args)
  }

  override async close(): Promise<void> {
    this.consumer_balancer.close()
    await super.close()
  }

  constructor(
    private readonly store: BrokerStore,
    opts?: BrokerServerOpts,
  ) {
    super(opts)
    this.consumer_balancer = new BrokerConsumerBalancer(this.store, this.logger)
  }

  // TODO: cleanup
  // private readonly queue_consumers: Record<string, Sender> = {}
  private readonly consumer_balancer

  get middleware() {
    return AzureServiceBusBroker.middleware(this)
  }

  static middleware(instance?: AzureServiceBusBroker): Middleware<
    {
      logger?: Logger
    },
    {
      azure_service_bus_broker?: AzureServiceBusBroker
    }
  > {
    return async (req, ctx, next) => {
      if (instance) {
        ctx.azure_service_bus_broker ??= instance
      } else if (!ctx.azure_service_bus_broker) {
        ctx.logger?.warn(
          "Azure Service Bus broker not present in request context!",
        )
      }

      return await next(req, ctx)
    }
  }
}
