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
} from "rhea-promise"

export async function serveAMQP(port: number) {
  const container = new Container({})
  const containerListenOptions: ListenOptions = {
    port,
  }
  const server = container.listen(containerListenOptions)

  container.on("sender_open", () => {})
}
