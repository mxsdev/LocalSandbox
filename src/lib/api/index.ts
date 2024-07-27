import { createWithEdgeSpec, EdgeSpecRouteMap, Middleware } from "edgespec"
import { z } from "zod"
import { routeBundleFromRouteMap } from "../edgespec/route-bundle-from-route-map"
import { INTEGRATIONS, SupportedIntegration } from "../integration"
import { Integration } from "../integration/integration"
import { Mutex } from "async-mutex"
import { createWithDefaultExceptionHandling } from "edgespec/middleware"

const store_mutex = new Mutex()
const store: Record<
  string,
  Record<SupportedIntegration, Integration | undefined | null>
> = {}

const withStore: Middleware<{}, { store: typeof store }> = async (
  req,
  ctx,
  next
) => {
  ctx.store = store
  return await next(req, ctx)
}

export const withRouteSpec = createWithEdgeSpec({
  authMiddleware: {},
  beforeAuthMiddleware: [withStore, createWithDefaultExceptionHandling()],
})

export const routes: EdgeSpecRouteMap = {
  "/api/[...params]": withRouteSpec({
    methods: ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"],
    routeParams: z.object({
      params: z.union([
        z
          .tuple([
            z
              .union([z.coerce.number().int().finite(), z.string().uuid()])
              .transform((id) => ({
                id,
              })),
            z.string().min(1),
          ])
          .rest(z.string()),
        z.tuple([z.string().min(1)]).rest(z.string()),
      ]),
    }),
  })(async (req, ctx) => {
    let integration_id: string
    let id: string = ""
    let removePathnamePrefix: string[]

    if (typeof req.routeParams.params[0] === "object") {
      ;[, integration_id] = req.routeParams.params
      id = req.routeParams.params[0].id.toString()

      removePathnamePrefix = [id, integration_id]
    } else {
      ;[integration_id] = req.routeParams.params

      removePathnamePrefix = [integration_id]
    }

    const integration_store = await store_mutex.runExclusive(() => {
      const integration_store = ctx.store[id] ?? {}
      ctx.store[id] ??= integration_store
      return integration_store
    })

    if (!(integration_id in INTEGRATIONS)) {
      throw new Error(`Integration ${integration_id} not supported!`)
    }

    const createIntegration =
      INTEGRATIONS[integration_id as keyof typeof INTEGRATIONS]

    const integration = await store_mutex.runExclusive(async () => {
      integration_store[integration_id] ??= await createIntegration({})
      return integration_store[integration_id as SupportedIntegration]!
    })

    return await integration.edgeSpecRouteBundle.makeRequest(req, {
      automaticallyRemovePathnamePrefix: false,
      removePathnamePrefix: "/api/" + removePathnamePrefix.join("/"),
    })
  }),
}

export const bundle = routeBundleFromRouteMap(routes)
