import {
  createWithEdgeSpec,
  type EdgeSpecRouteMap,
  type Middleware,
} from "edgespec"
import { z } from "zod"
import { routeBundleFromRouteMap } from "../edgespec-util/route-bundle-from-route-map.js"
import { createWithDefaultExceptionHandling } from "edgespec/middleware/index.js"
import { createAzureIntegration } from "../integration/index.js"
import type { Logger } from "pino"
import { AzureServiceBusBroker } from "../broker/broker.js"
import { azure_routes } from "../integration/azure/routes.js"
import { withLogger } from "../logger/with-logger.js"
import { getTestLogger } from "lib/logger/get-test-logger.js"
import type { BrokerServer } from "lib/broker/broker-server.js"

const routeLoggingMiddleware: Middleware<{}, { logger: Logger }> = async (
  req,
  ctx,
  next,
) => {
  const { logger, cleanup } = getTestLogger("api")

  logger.debug(
    { url: req.url, method: req.method, body: await req.clone().text() },
    "Got API Request",
  )

  ctx.logger = logger

  const res = await next(req, ctx)

  await cleanup()

  return res
}

const withRouteSpec = createWithEdgeSpec({
  authMiddleware: {},
  beforeAuthMiddleware: [
    routeLoggingMiddleware,
    createWithDefaultExceptionHandling(),
  ],
})

export const createApiBundle = (
  settings: {
    amqp_logger?: { logger: Logger; cleanup?: () => Promise<void> }
  } = {},
) => {
  let { amqp_logger } = settings
  amqp_logger ??= getTestLogger("amqp")

  const store_bundle = azure_routes.createStoreBundle()

  const azure_service_bus_broker = new AzureServiceBusBroker(
    store_bundle.store,
    {
      logger: amqp_logger.logger,
      cleanup: amqp_logger.cleanup,
      tls: false,
    },
  )

  const azure_integration = createAzureIntegration({
    broker: azure_service_bus_broker,
    store_bundle,
  })

  const routes: EdgeSpecRouteMap = {
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

  const amqp_server: BrokerServer = azure_service_bus_broker

  return {
    bundle: routeBundleFromRouteMap(routes),
    amqp_server,
  }
}
