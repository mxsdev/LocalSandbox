import { subscription } from "../../../output/resources/resource-manager/Microsoft.Resources/stable/2016-06-01/subscriptions.js"
import hash from "object-hash"
import {
  parseBatchOrMessage,
  parseRheaMessage,
  parseRheaMessageBody,
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
  type AmqpError,
  generate_uuid,
  Delivery,
  Connection,
} from "rhea"
import { BrokerConsumerBalancer } from "./consumer-balancer.js"
import { getPeerQueue, getQueueFromStoreOrThrow } from "./util.js"
import { Constants } from "@azure/core-amqp"
import { Deque } from "@datastructures-js/deque"

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
    // perform initial handshake
    if (message.reply_to) {
      try {
        const consumer = this.cbs_senders[message.reply_to]
        if (!consumer) {
          this.logger?.error(
            { reply_to: message.reply_to },
            "Could not reply to queue consumer",
          )
          throw new Error("Could not reply to queue consumer")
        }

        // if (
        //   message.application_properties?.["operation"] ===
        //   "com.microsoft:schedule-message"
        // ) {
        //   const existing_connection =
        //     this.connection_namespaces[connection.container_id]

        //   if (!existing_connection) {
        //     this.logger?.error(
        //       { reply_to: message.reply_to },
        //       "Could not find existing connection",
        //     )
        //     throw new Error("Could not find existing connection")
        //   }

        //   const link_name =
        //     message.application_properties?.["associated-link-name"]

        //   if (!link_name) {
        //     this.logger?.error(
        //       { reply_to: message.reply_to },
        //       "Message did not have assocaited link name",
        //     )
        //     throw new Error("Message did not have assocaited link name")
        //   }

        //   this.logger?.debug(
        //     {
        //       reply_to: message.reply_to,
        //       existing_connection,
        //       properties: message.application_properties,
        //       receiver: receiver.name,
        //     },
        //     "Accepting scheduled message",
        //   )

        //   const { messages } = message.body as {
        //     messages: { message: Buffer; "message-id": string }[]
        //   }

        //   const queue_name = getPeerQueue(link_name)

        //   this.consumer_balancer.deliverMessagesToQueue(
        //     { ...existing_connection, queue_name },
        //     delivery,
        //     ...messages.flatMap(({ message: buffer, "message-id": mid }) =>
        //       parseBatchOrMessage(buffer).map((v) => {
        //         v["message_id"] ??= mid ?? generate_uuid()
        //         return v as typeof v & { message_id: string }
        //       }),
        //     ),
        //   )

        //   delivery.accept()

        //   consumer.send({
        //     correlation_id: message.message_id,
        //     body: {
        //       // TODO: does this need to be implemented when sequence number
        //       // support is added?
        //       [Constants.sequenceNumbers]: [],
        //     },
        //     application_properties: {
        //       "status-code": 200,
        //     },
        //   })

        //   return
        // }

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

        consumer.send({
          correlation_id: message.message_id,
          body: "Accepted",
          application_properties: {
            "status-code": 200,
          },
        })
      } catch (e: any) {
        delivery.reject({ description: e.message })
      }

      return
    }

    try {
      const queue = this.link_queue.get(receiver)

      console.log(message)

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
        delivery,
        ...messages_to_enqueue.map((m) => {
          m["message_id"] ??= generate_uuid()
          return m as typeof m & { message_id: string }
        }),
      )
    } catch (e: any) {
      delivery.reject({
        description: e.message,
      })
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
