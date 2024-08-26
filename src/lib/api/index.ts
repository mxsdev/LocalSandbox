import { PassThrough } from "node:stream"
import { createWithEdgeSpec, EdgeSpecRouteMap, Middleware } from "edgespec"
import { z } from "zod"
import { routeBundleFromRouteMap } from "../edgespec-util/route-bundle-from-route-map.js"
import { Integration } from "../integration/integration.js"
import { createWithDefaultExceptionHandling } from "edgespec/middleware/index.js"
import { createAzureIntegration } from "../integration/index.js"
import { getLogger } from "../logger/index.js"

const routeLoggingMiddleware: Middleware = async (req, ctx, next) => {
  const stream = new PassThrough()
  const logger = getLogger({
    stream,
    app: "api",
  })

  stream.on("data", (chunk) => {
    console.log((chunk.toString() as string).slice(0, -1))
  })

  logger.debug(
    { url: req.url, method: req.method, headers: [...req.headers.entries()] },
    "Got API Request",
  )

  const res = await next(req, ctx)

  stream.destroy()
  stream.removeAllListeners()

  return res
}

export const withRouteSpec = createWithEdgeSpec({
  authMiddleware: {},
  beforeAuthMiddleware: [
    routeLoggingMiddleware,
    createWithDefaultExceptionHandling(),
  ],
})

const azure_integration = createAzureIntegration({})

export const routes: EdgeSpecRouteMap = {
  "/azure/[...params]": withRouteSpec({
    methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
    routeParams: z.object({
      params: z.string().array(),
    }),
  })(async (req) => {
    return await azure_integration.edgeSpecRouteBundle.makeRequest(req)
  }),
}

export const bundle = routeBundleFromRouteMap(routes)
