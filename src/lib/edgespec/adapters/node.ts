import type { NodeHandler } from "@edge-runtime/node-utils"
import http from "node:http"
import { transformToNodeBuilder } from "edgespec/edge/transform-to-node.js"
import type { Middleware } from "edgespec/middleware/index.js"
import type { EdgeSpecAdapter } from "edgespec/types/edge-spec.js"

export interface EdgeSpecNodeAdapterOptions {
  middleware?: Middleware[]
  port?: number
}

export const getNodeHandler: EdgeSpecAdapter<
  [EdgeSpecNodeAdapterOptions],
  NodeHandler
> = (edgeSpec, { port, middleware = [] }) => {
  const transformToNode = transformToNodeBuilder({
    defaultOrigin: `http://localhost${port ? `:${port}` : ""}`,
  })

  return transformToNode(
    async (req) =>
      await edgeSpec.makeRequest(req as Request, {
        middleware,
      }),
  )
}

export const startServer: EdgeSpecAdapter<
  [EdgeSpecNodeAdapterOptions],
  Promise<http.Server>
> = async (edgeSpec, opts) => {
  const server = http.createServer(getNodeHandler(edgeSpec, opts))

  const { port } = opts

  await new Promise<void>((resolve, reject) => {
    server.on("error", reject)
    server.listen(port, resolve)
  })

  return server
}
