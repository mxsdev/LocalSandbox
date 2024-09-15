import { promisify } from "node:util"
import type { Server } from "net"
import type { Logger } from "pino"
import rhea, {
  type Connection,
  type Container,
  type Receiver,
  type Sender,
  type Session,
  type Message,
  type Delivery,
} from "rhea"
import { TEST_CERT, TEST_PK } from "../tls/index.js"

export interface BrokerServerOpts {
  port?: number
  logger?: Logger
  tls?: boolean
  cleanup?: () => Promise<void>
}

export interface BrokerMessageEvent {
  message: Message
  delivery: Delivery
  receiver: Receiver
  session: Session
  connection: Connection
  container: Container
}

export interface BrokerReceiverEvent {
  receiver: Receiver
  connection: Connection
  session: Session
  container: Container
}

export interface BrokerSenderEvent {
  sender: Sender
  connection: Connection
  session: Session
  container: Container
}

export interface BrokerConnectionEvent {
  connection: Connection
  container: Container
}

export abstract class BrokerServer {
  private readonly container: Container
  private server?: Server

  protected opts: BrokerServerOpts & Required<Pick<BrokerServerOpts, "port">>

  get logger() {
    return this.opts.logger
  }

  set logger(val: Logger | undefined) {
    this.opts.logger = val
  }

  protected generateUUID() {
    return this.container.generate_uuid()
  }

  abstract onMessage(event: BrokerMessageEvent): Promise<void>

  abstract onReceiverOpen(event: BrokerReceiverEvent): Promise<void>
  abstract onReceiverClose(event: BrokerReceiverEvent): Promise<void>

  abstract onSenderOpen(event: BrokerSenderEvent): Promise<void>
  abstract onSenderClose(event: BrokerSenderEvent): Promise<void>

  protected async onConnectionOpen(
    event: BrokerConnectionEvent,
  ): Promise<void> {}

  protected async onConnectionClose(
    event: BrokerConnectionEvent,
  ): Promise<void> {}

  constructor(opts: BrokerServerOpts = {}) {
    this.opts = {
      ...opts,
      port: opts.port ?? 5671,
      tls: opts.tls ?? true,
    }

    this.container = rhea.create_container({
      max_frame_size: 512,
    })

    // this.container.on("connection_open", (e) => {})
    // this.container.on("connection_close", (e) => {})

    this.container.on("message", async (e) => {
      this.logger?.trace({ receiver: e.receiver.name }, "Received AMQP message")
      await this.onMessage(e)
    })

    this.container.on("sender_open", async (e) => {
      this.logger?.trace("AMQP Sender Open")
      await this.onSenderOpen(e)
    })
    this.container.on("sender_close", async (e) => {
      this.logger?.trace("AMQP Sender Closed")
      await this.onSenderClose(e)
    })

    this.container.on("receiver_open", async (e) => {
      this.logger?.trace("AMQP Receiver Open")
      await this.onReceiverOpen(e)
    })
    this.container.on("receiver_close", async (e) => {
      this.logger?.trace("AMQP Receiver Closed")
      await this.onReceiverClose(e)
    })

    this.container.on("connection_open", async (e) => {
      this.logger?.trace("AMQP Receiver Open")
      await this.onConnectionOpen(e)
    })
    this.container.on("connection_close", async (e) => {
      this.logger?.trace("AMQP Receiver Closed")
      await this.onConnectionClose(e)
    })
  }

  async open() {
    if (this.server) return

    this.logger?.info("Launching AMQP broker...")

    const server = this.container.listen({
      port: this.opts.port,
      ...(this.opts.tls
        ? {
            transport: "tls",
            cert: TEST_CERT,
            key: TEST_PK,
          }
        : {}),
    })
    this.server = server

    await new Promise<void>((resolve, reject) => {
      server.addListener("listening", () => {
        this.logger?.info(`AMQP Broker listening on port ${this.opts.port}`)
        resolve()
      })

      server.addListener("error", (e) => {
        reject(e)
      })
    }).finally(() => {
      server.removeAllListeners("listening")
    })
  }

  async close() {
    this.logger?.info("Shutting down AMQP broker...")

    await this.opts.cleanup?.()

    try {
      if (this.server) {
        await promisify(this.server.close.bind(this.server))()
      }

      this.logger?.info("AMQP broker closed")
    } finally {
      this.server?.removeAllListeners()
      this.container.removeAllListeners()
    }
  }

  set port(val: number) {
    if (this.server) throw new Error("Cannot set port while server is running")

    this.opts.port = val
  }

  get port() {
    return this.opts.port
  }
}
