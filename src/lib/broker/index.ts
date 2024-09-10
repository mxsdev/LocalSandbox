import type { ListenOptions } from "net"
import { Container } from "rhea-promise"

export async function serveAMQP(port: number) {
  const container = new Container({})
  const containerListenOptions: ListenOptions = {
    port,
  }
  const server = container.listen(containerListenOptions)

  container.on("sender_open", () => {})

  return server
}
