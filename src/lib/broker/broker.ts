import {
  encodeRheaMessage,
  parseBatchOrMessage,
  parseRheaMessage,
} from "../amqp/parse-message.js"
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
import {
  getQualifiedIdFromModel,
  getMessageDestinationFromStoreOrThrow,
  getQueueOrTopicOrSubscriptionFromStoreOrThrow,
  isQualifiedTopicId,
  isQualifiedMessageSourceId,
} from "./util.js"
import { Constants } from "@azure/core-amqp"
import { Deque } from "@datastructures-js/deque"
import { z } from "zod"
import {
  serializedLong,
  unserializedLongToArrayLike,
  unserializedLongToBufferLike,
} from "../util/long.js"
import { BrokerConstants } from "./constants.js"
import { unreorderLockToken } from "../util/service-bus.js"
import { Middleware } from "edgespec"
import { Logger } from "pino"
import {
  BrokerStore,
  QualifiedMessageDestinationId,
  QualifiedMessageSourceId,
  QualifiedQueueOrTopicOrSubscriptionId,
  SubqueueType,
} from "./types.js"
import { parseBrokerURL } from "./url.js"

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
            [Constants.statusCode]: 200,
          },
        })

      const respondFailure = (
        consumer: Sender,
        status: number,
        statusDescription: string,
        errorCondition?: string,
      ) =>
        consumer.send({
          correlation_id: message.message_id,
          body: {},
          application_properties: {
            [Constants.statusCode]: status,
            [Constants.errorCondition]: errorCondition,
            [Constants.statusDescription]: statusDescription,
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
        } = parseBrokerURL(sb_connection_url)

        // ensure queue exists
        const queue_or_topic_or_subscription =
          getQueueOrTopicOrSubscriptionFromStoreOrThrow(
            {
              resource_group_name,
              namespace_name,
              subscription_id,
              queue_or_topic_name,
              subscription_name:
                subqueue?.type === "subscription" ? subqueue.name : undefined,
            },
            this.store,
            this.logger,
          )

        if (
          subqueue?.type === "subscription" &&
          queue_or_topic_or_subscription.properties &&
          "forwardDeadLetteredMessagesTo" in
            queue_or_topic_or_subscription.properties &&
          queue_or_topic_or_subscription.properties
            .forwardDeadLetteredMessagesTo != null
        ) {
          delivery.reject()
          respondFailure(
            consumer,
            400,
            "Cannot create a message receiver on an entity with auto-forwarding enabled.",
          )
          return
        }

        const queueId = getQualifiedIdFromModel(queue_or_topic_or_subscription)

        this.completeHandshake(connection, {
          ...queueId,
          subqueue: subqueue?.type === "deadletter" ? "deadletter" : undefined,
        })

        this.logger?.info(
          {
            queueId,
            sb_connection_string,
          },
          "Handshake initialized",
        )

        delivery.accept()
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
                operation: z.literal(Constants.operations.updateDisposition),
                associatedLinkName: z.string(),
                body: z.object({
                  [Constants.lockTokens]: serializedLockToken.array(),
                  // TODO: verify other disposition statuses...
                  [Constants.dispositionStatus]: z.enum([
                    "completed",
                    "abandoned",
                    // TODO: dead lettered?
                  ]),
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

            this.logger?.info(
              `Setting broker sequence number to ${sequenceNumber.toString()}`,
            )

            const queue_id =
              this.consumer_balancer["getQueueFromStoreOrThrow"](queue).id

            this.consumer_balancer["getOrCreate"](queue_id, undefined)

            this.consumer_balancer["_queues"][queue_id]![
              "sequence_number_factory"
            ]["next_sequence_number"] = sequenceNumber

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

                if (!isQualifiedMessageSourceId(queue)) {
                  respondSuccess(consumer, {
                    messages: [],
                  })
                }

                const peekedMessages =
                  this.consumer_balancer.peekMessageFromQueue(
                    queue,
                    messageCount,
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

            case Constants.operations.updateDisposition:
              {
                const {
                  body: {
                    [Constants.lockTokens]: lockTokens,
                    [Constants.dispositionStatus]: dispositionStatus,
                  },
                  associatedLinkName,
                } = parsed.data

                lockTokens.forEach((tag) => {
                  this.consumer_balancer.updateConsumerDisposition(
                    queue,
                    { name: associatedLinkName },
                    { tag },
                    dispositionStatus,
                  )
                })

                respondSuccess(consumer, {})
              }
              break

            case Constants.operations.renewLock:
              {
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
                  expirations,
                })
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
              m["message_id"] ??= generate_uuid()
              return m as typeof m & { message_id: string }
            }),
          )
          delivery.accept()
        }
      }
    } catch (e: any) {
      this.logger?.error({ err: e }, "Unexpected error on message")

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

    if (!queue) {
      this.cbs_senders[sender.name] = sender
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
    return await super.close()
  }

  constructor(
    private store: BrokerStore,
    opts?: BrokerServerOpts,
  ) {
    super(opts)
  }

  // TODO: cleanup
  // private readonly queue_consumers: Record<string, Sender> = {}
  private readonly consumer_balancer = new BrokerConsumerBalancer(
    this.store,
    this.logger,
  )

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
