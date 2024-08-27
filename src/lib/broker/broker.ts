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
} from "rhea"
import { BrokerConsumerBalancer } from "./consumer-balancer.js"
import { getPeerQueue, getQueueFromStoreOrThrow } from "./util.js"

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
  private readonly connection_namespaces: Record<string, QualifiedNamespaceId> =
    {}

  private handshake_senders: Record<string, Sender> = {}

  // TODO: cleanup
  // private readonly queue_consumers: Record<string, Sender> = {}
  private readonly consumer_balancer = new BrokerConsumerBalancer(
    this.store,
    this.connection_namespaces,
    this.logger,
  )

  private readonly queue_producers: Record<string, Receiver> = {}

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
        const consumer = this.handshake_senders[message.reply_to]
        if (!consumer) {
          this.logger?.error(
            { reply_to: message.reply_to },
            "Could not reply to queue consumer",
          )
          throw new Error("Could not reply to queue consumer")
        }

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

        const [, subscription_id, resource_group_name, namespace_name] =
          sb_connection_url.pathname.split("/")

        if (!subscription_id || !resource_group_name || !namespace_name) {
          this.logger?.error(
            { sb_connection_string },
            "Invalid sb connection string",
          )
          throw new Error("Invalid sb connection string")
        }

        const namespace = this.store.sb_namespace
          .select()
          .where((ns) => ns.name === namespace_name)
          .where((ns) => ns.resource_group().name === resource_group_name)
          .where(
            (ns) =>
              ns.resource_group().subscription().subscriptionId ===
              subscription_id,
          )
          .executeTakeFirst()

        if (!namespace) {
          this.logger?.error({ namespace_name }, "Could not find namespace")
          throw new Error("Could not find namespace")
        }

        this.connection_namespaces[connection.container_id] = {
          namespace_name,
          resource_group_name,
          subscription_id,
        }

        this.logger?.info(
          {
            resource_group_name,
            namespace_name,
            subscription_id,
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
      // TODO: there must be a better way to do this
      const queue_name = getPeerQueue(receiver)

      const connection_namespace =
        this.connection_namespaces[connection.container_id]

      if (!connection_namespace) {
        this.logger?.error(
          "Could not find connection metadata for queue, did the handshake go through?",
        )
        throw new Error("Could not find connection metadata for queue")
      }

      const qualifiedQueueId = { ...connection_namespace, queue_name }

      const parsed_message = parseRheaMessage(message)
      const messages_to_enqueue = parseBatchOrMessage(parsed_message)

      this.logger?.debug(
        {
          receiver: receiver.name,
          queue_name,
          num_messages: messages_to_enqueue.length,
        },
        "delivering message batch",
      )

      this.consumer_balancer.deliverMessagesToQueue(
        qualifiedQueueId,
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
    this.logger?.trace({ receiver: receiver.name }, "receiver opened")

    this.queue_producers[receiver.name] = receiver
  }
  override async onReceiverClose({
    receiver,
  }: BrokerReceiverEvent): Promise<void> {
    delete this.queue_producers[receiver.name]
  }

  override async onSenderOpen({ sender }: BrokerSenderEvent): Promise<void> {
    this.logger?.debug({ sender: sender.name }, "sender opened")

    if (this.connection_namespaces[sender.connection.container_id]) {
      this.consumer_balancer.add(sender)
    } else {
      this.handshake_senders[sender.name] = sender
    }
  }

  override async onSenderClose({ sender }: BrokerSenderEvent): Promise<void> {
    if (sender.name in this.handshake_senders) {
      delete this.handshake_senders[sender.name]
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
