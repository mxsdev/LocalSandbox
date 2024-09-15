import type { ListenOptions } from "net"
import { create_container } from "rhea"

export async function serveAMQP(port: number) {
  const container = create_container({})
  const containerListenOptions: ListenOptions = {
    port,
  }
  const server = container.listen(containerListenOptions)

  container.on("sender_open", () => {})

  return server
}
