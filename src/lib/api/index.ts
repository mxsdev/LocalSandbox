import { promisify } from "node:util"
import { PassThrough } from "node:stream"
import { createWithEdgeSpec, EdgeSpecRouteMap, Middleware } from "edgespec"
import { z } from "zod"
import { routeBundleFromRouteMap } from "../edgespec/route-bundle-from-route-map.js"
import { Integration } from "../integration/integration.js"
import { Mutex } from "async-mutex"
import { createWithDefaultExceptionHandling } from "edgespec/middleware"
import { ROOT_INTEGRATION } from "../integration/index.js"
import { getLogger } from "../logger/index.js"

const store_mutex = new Mutex()
const store: Record<
  string,
  // Record<SupportedIntegration, Integration | undefined | null>
  Integration
> = {}

const withStore: Middleware<{}, { store: typeof store }> = async (
  req,
  ctx,
  next,
) => {
  ctx.store = store
  return await next(req, ctx)
}

const routeLoggingMiddleware: Middleware = async (req, ctx, next) => {
  const stream = new PassThrough()
  const logger = getLogger({
    stream,
    app: "api",
  })

  stream.on("data", (chunk) => {
    console.log((chunk.toString() as string).slice(0, -1))
  })

  logger.debug({ url: req.url }, "Got API Request")

  const res = await next(req, ctx)

  stream.destroy()
  stream.removeAllListeners()

  return res
}

export const withRouteSpec = createWithEdgeSpec({
  authMiddleware: {},
  beforeAuthMiddleware: [
    routeLoggingMiddleware,
    withStore,
    createWithDefaultExceptionHandling(),
  ],
})

export const routes: EdgeSpecRouteMap = {
  "/[id]/[...params]": withRouteSpec({
    methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
    routeParams: z.object({
      params: z.string().array(),
      id: z.string(),
    }),
  })(async (req, ctx) => {
    const id: string = req.routeParams.id

    const createIntegration = ROOT_INTEGRATION

    const integration = await store_mutex.runExclusive(async () => {
      const integration_store = ctx.store[id] ?? (await createIntegration({}))
      ctx.store[id] ??= integration_store
      return integration_store
    })

    return await integration.edgeSpecRouteBundle.makeRequest(req)
  }),
}

export const bundle = routeBundleFromRouteMap(routes)
