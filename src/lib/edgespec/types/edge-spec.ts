import type { Middleware } from "edgespec/middleware/types.js"
import {
  createEdgeSpecRequest,
  type EdgeSpecRouteFn,
  type EdgeSpecRouteParams,
  EdgeSpecRequest,
  HTTPMethods,
} from "./web-handler.js"

import type { ReadonlyDeep } from "type-fest"
import { wrapMiddlewares } from "edgespec/create-with-edge-spec.js"
import { getDefaultContext } from "./context.js"
import { Server } from "node:http"
import type { RouteSpec } from "./route-spec.js"
import {
  EdgeSpecMiddlewareError,
  InputValidationError,
  MethodNotAllowedError,
} from "edgespec/middleware/http-exceptions.js"
import { GetAuthMiddlewaresFromGlobalSpec, GlobalSpec } from "./global-spec.js"

export type EdgeSpecRouteMatcher = (pathname: string) =>
  | {
      matchedRoute: string
      routeParams: EdgeSpecRouteParams
    }
  | undefined
  | null

export type EdgeSpecRouteMap<GS extends GlobalSpec = any> = Record<
  string,
  {
    routeSpec: RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>
    routeFn: EdgeSpecRouteFn
  }[]
>

export interface EdgeSpecOptions {
  handle404?: EdgeSpecRouteFn
}

interface MakeRequestOptions {
  /**
   * Defaults to true. When true, we will attempt to automatically remove any pathname prefix from the request. This is useful when you're hosting an EdgeSpec service on a subpath of your application.
   *
   * For example, if you're hosting an EdgeSpec service "Foo" at /foo/[...path], then this option will automatically remove the /foo prefix from the request so that the Foo service only sees /[...path].
   *
   * This currently only works if your parent application is also an EdgeSpec service and it's hosting the child service on a wildcard route (/foo/[...path]).
   */
  automaticallyRemovePathnamePrefix?: boolean

  /**
   * If you want to manually remove a pathname prefix, you can specify it here. `automaticallyRemovePathnamePrefix` must be false when specifying this option.
   */
  removePathnamePrefix?: string

  middleware?: Middleware[]
}

// make this deeply immutable to force usage through helper functions
export type EdgeSpecRouteBundle = ReadonlyDeep<
  EdgeSpecOptions & {
    routeMatcher: EdgeSpecRouteMatcher
    routeMapWithHandlers: EdgeSpecRouteMap
    makeRequest: (
      request: Request,
      options?: MakeRequestOptions,
    ) => Promise<Response>
  }
>

export type EdgeSpecAdapter<
  Options extends Array<unknown> = [],
  ReturnValue = void,
> = (edgeSpec: EdgeSpecRouteBundle, ...options: Options) => ReturnValue

export function makeRequestAgainstEdgeSpec(
  edgeSpec: EdgeSpecRouteBundle,
  options: MakeRequestOptions = {},
): (request: Request) => Promise<Response> {
  return async (request: Request) => {
    const {
      routeMatcher,
      routeMapWithHandlers,
      handle404 = () =>
        new Response("Not found", {
          status: 404,
        }),
    } = edgeSpec

    const { removePathnamePrefix, automaticallyRemovePathnamePrefix = true } =
      options

    let pathname = new URL(request.url).pathname
    if (removePathnamePrefix) {
      if (automaticallyRemovePathnamePrefix) {
        throw new Error(
          "automaticallyRemovePathnamePrefix and removePathnamePrefix cannot both be specified",
        )
      }

      pathname = pathname.replace(removePathnamePrefix, "")
    } else {
      if ((request as any).routeParams) {
        // These are the route params of the parent route hosting the EdgeSpec service
        const routeParams = (request as unknown as EdgeSpecRequest).routeParams

        // If the child service is hosted at /foo/[...path], we want to find the [...path] parameter
        const wildcardRouteParameters = Object.values(routeParams).filter((p) =>
          Array.isArray(p),
        )
        if (wildcardRouteParameters.length === 0) {
          throw new Error("No wildcard route parameters found")
        }

        if (wildcardRouteParameters.length > 1) {
          throw new Error("Only one wildcard route parameter is supported")
        }

        const wildcardRouteParameter = wildcardRouteParameters[0]

        pathname = `/${(wildcardRouteParameter as string[]).join("/")}`
      }
    }

    const { matchedRoute, routeParams } = routeMatcher(pathname) ?? {}

    let routes = matchedRoute && routeMapWithHandlers[matchedRoute]

    const edgeSpecRequest = createEdgeSpecRequest(request, {
      edgeSpec,
      routeParams: routeParams ?? {},
    })

    if (!routes) {
      return await handle404(edgeSpecRequest, getDefaultContext())
    }

    return wrapMiddlewares(
      options.middleware ?? [],
      async (req: EdgeSpecRequest, ctx) => {
        let last_error: Error | undefined = undefined

        for (const route of routes.filter((v) =>
          v.routeSpec.methods.includes(req.method as HTTPMethods),
        )) {
          console.log(route)
          try {
            return await route.routeFn(req, ctx)
          } catch (e) {
            if (
              e instanceof InputValidationError ||
              e instanceof MethodNotAllowedError ||
              // fall through on "unimplemented" errors
              (e instanceof EdgeSpecMiddlewareError && e.status === 501)
            ) {
              last_error = e
              continue
            }

            throw e
          }
        }

        throw last_error!
      },
      edgeSpecRequest,
      getDefaultContext(),
    )
  }
}
