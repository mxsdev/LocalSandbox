import { PassThrough } from "node:stream"
import { createWithEdgeSpec, EdgeSpecRouteMap, Middleware } from "edgespec"
import { z } from "zod"
import { routeBundleFromRouteMap } from "../edgespec-util/route-bundle-from-route-map.js"
import { createWithDefaultExceptionHandling } from "edgespec/middleware/index.js"
import { createAzureIntegration } from "../integration/index.js"
import { getLogger } from "../logger/index.js"
import { Logger } from "pino"
import { AzureServiceBusBroker } from "../broker/broker.js"
import { azure_routes } from "../integration/azure/routes.js"
import { withLogger } from "../logger/with-logger.js"

const routeLoggingMiddleware: Middleware<{}, { logger: Logger }> = async (
  req,
  ctx,
  next,
) => {
  const stream = new PassThrough()
  const logger = getLogger({
    stream,
    app: "api",
  })

  stream.on("data", (chunk) => {
    console.log((chunk.toString() as string).slice(0, -1))
  })

  logger.debug(
    { url: req.url, method: req.method, body: await req.clone().text() },
    "Got API Request",
  )

  ctx.logger = logger

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

export const azure_service_bus_broker = new AzureServiceBusBroker(
  azure_routes["store"],
)
const azure_integration = createAzureIntegration({
  broker: azure_service_bus_broker,
})

export const routes: EdgeSpecRouteMap = {
  "/azure/[...params]": withRouteSpec({
    methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
    routeParams: z.object({
      params: z.string().array(),
    }),
  })(async (req, ctx) => {
    return await azure_integration(req, {
      middleware: [withLogger(ctx.logger.child({}))],
    })
  }),
}

export const bundle = routeBundleFromRouteMap(routes)
