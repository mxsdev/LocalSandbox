import { test } from "vitest"

import {
  ConnectionConfig,
  ConnectionContextBase,
  Constants,
} from "@azure/core-amqp"
import { ListenOptions } from "net"
import { Container as ContainerPromise } from "rhea-promise"
import rhea, {
  Connection,
  ConnectionEvents,
  ConnectionOptions,
  ReceiverEvents,
  SenderEvents,
  Container,
  Receiver,
  Session,
  Message,
  Delivery,
  Sender,
} from "rhea"
// import message from "../node_modules/rhea/lib/message.js"
import { ServiceBusMessageBatch } from "@azure/service-bus"
import { TEST_CERT, TEST_PK } from "../src/lib/tls/index.js"
import {
  isSectionMessage,
  parseBatchOrMessage,
  parseRheaMessage,
  RheaBufferSectionTypecode,
} from "../src/lib/amqp/parse-message.js"

const port = 5671

const container = rhea.create_container({
  id: "bushog",
  max_frame_size: 512,
  host: "0.0.0.0",
  port,
})

// const container = original_container as any as Container

const containerListenOptions: ListenOptions = {
  port,
}
const server = container.listen(
  // containerListenOptions,
  {
    port,
    host: "0.0.0.0",
    transport: "tls",
    cert: TEST_CERT,
    key: TEST_PK,
  },
)

process.on("SIGINT", () => {
  console.log("exiting gracefully...")
  server.close()
  process.exit(1)
})

await new Promise<void>((res) => {
  server.addListener("listening", () => {
    console.log(`listening on port ${port}...`)
    res()
  })
})

container.on(
  "connection_open",
  (ctx: { connection: Connection; container: Container }) => {
    console.log("connection open??", ctx.connection.properties)
  },
)

container.on(
  "session_open",
  (ctx: { connection: Connection; container: Container; session: Session }) => {
    console.log("session open??")
  },
)

container.on("connection_close", () => {
  console.log("connection close??")
})

let senders: Sender[] = []

container.on("sender_open", (e) => {
  console.log("sender open??", e.sender.name)
  senders.push(e.sender)
})

container.on("sender_close", (e) => {
  console.log("sender close??", e.sender.name)
  senders = senders.filter((s) => s !== e.sender)
})

interface Remote {
  attach: {
    source: any
    target: any
  }
}

container.on(
  "receiver_open",
  (ctx: {
    receiver: Receiver & { remote: Remote }
    connection: Connection
    session: Session
    container: Container
  }) => {
    console.log(
      "receiver open",
      ctx.receiver.name,
      ctx.receiver.properties,
      ctx.receiver,
    )

    // if (!ctx.receiver.source.address) {
    //   ctx.receiver.set_source({ address: ctx.container.generate_uuid() })
    // }
  },
)

container.on("receiver_close", () => {
  console.log("receiver close??")
})

container.on(
  "message",
  (ctx: {
    message: Message
    delivery: Delivery
    receiver: Receiver
    sender: Sender
    session: Session
    connection: Connection
    container: Container
  }) => {
    console.log(
      ctx.message,
      "sender: " + ctx.sender?.name,
      "receiver: " + ctx.receiver?.name,
      // ctx.receiver,

      // "message: " + ctx.message.body + ", from: " + ctx.receiver.source.address,
    )

    ctx.delivery.accept()

    const reply_to_sender = senders.find((s) => s.name === ctx.message.reply_to)

    console.log({ reply_to_sender: !!reply_to_sender })

    if (reply_to_sender) {
      reply_to_sender.send({
        correlation_id: ctx.message.message_id,
        body: "Accepted",
        application_properties: {
          "status-code": 200,
        },
      })
    }

    const message = parseRheaMessage(ctx.message)
    const to_enqueue = parseBatchOrMessage(message)
    // const body = parseRheaMessageBody(message)

    console.log(to_enqueue)
  },
)
