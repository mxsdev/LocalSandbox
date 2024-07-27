import { startServer } from "edgespec/adapters/node"
import { bundle } from "."

export const serve = async (port: number) => {
  const server = await startServer(bundle, {
    port,
  })

  return server
}
