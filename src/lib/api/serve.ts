import { getNodeHandler, startServer } from "edgespec/adapters/node.js"
import https from "node:https"
import { TEST_CERT, TEST_PK } from "../tls/index.js"
import type { EdgeSpecRouteBundle } from "edgespec"

export const serve = async (bundle: EdgeSpecRouteBundle, port: number) => {
  const server = await startServer(bundle, {
    port,
  })

  return server
}

export const serveHTTPS = async (bundle: EdgeSpecRouteBundle, port: number) => {
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
