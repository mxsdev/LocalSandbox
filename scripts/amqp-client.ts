import { test } from "vitest"

import {
  ConnectionConfig,
  ConnectionContextBase,
  Constants,
} from "@azure/core-amqp"
import { ListenOptions } from "net"
import {
  Connection,
  ConnectionEvents,
  ConnectionOptions,
  ReceiverEvents,
  SenderEvents,
  Container,
  SessionEvents,
  AwaitableSender,
} from "rhea-promise"

const port = 5671
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"

const connectionOptions: ConnectionOptions = {
  port,
  transport: "tls",
  host: "127.0.0.1",
  properties: {
    queue: "queue",
  },
}

const connection = new Connection(connectionOptions)

process.on("SIGINT", async () => {
  console.log("exiting gracefully...")
  await connection.close()
  process.exit(1)
})

connection.on(ConnectionEvents.connectionClose, () => {
  console.log("connection closed!")
})

await connection.open()

{
  const sender = await connection.createAwaitableSender({
    name: "beatrice",
  })

  sender.addListener(SenderEvents.senderError, () => {
    console.log("sender error!")
  })

  sender.session.on(SessionEvents.sessionClose, () => {
    console.log("session closed")
  })

  sender.addListener(SenderEvents.senderClose, () => {
    console.log("sender closed!")
  })

  sender.addListener(SenderEvents.senderOpen, () => {})

  connection.on(ConnectionEvents.connectionError, () => {
    console.log("connection error")
  })

  console.log("ok...")

  process.on("unhandledRejection", () => {
    console.log("unhandled rejection!!")
    process.exit(1)
  })

  process.on("uncaughtException", () => {
    console.log("uncaught exception!!")
    process.exit(1)
  })

  console.log("sending...")
  await sender.send({
    body: "hi",
  })
  console.log("sent!")

  await sender.close()
}

await connection.close()
