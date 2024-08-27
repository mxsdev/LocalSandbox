import { getNodeHandler, startServer } from "edgespec/adapters/node.js"
import { bundle } from "./index.js"
import https from "node:https"
import { TEST_CERT, TEST_PK } from "../tls/index.js"

export const serve = async (port: number) => {
  const server = await startServer(bundle, {
    port,
  })

  return server
}

export const serveHTTPS = async (port: number) => {
  const handler = getNodeHandler(bundle, {})
  const server = https
    .createServer(
      {
        key: TEST_PK,
        cert: TEST_CERT,
      },
      handler,
    )
    .listen(port)
  return server
}
