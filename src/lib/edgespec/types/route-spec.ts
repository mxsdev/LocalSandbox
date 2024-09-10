import type { z } from "zod"
import type {
  AccumulateMiddlewareChainResultOptions,
  MiddlewareChain,
  MapMiddlewares,
} from "../middleware/types.js"
import type {
  GetAuthMiddlewaresFromGlobalSpec,
  GlobalSpec,
} from "./global-spec.js"
import type {
  EdgeSpecCustomResponse,
  EdgeSpecMultiPartFormDataResponse,
  EdgeSpecJsonResponse,
  EdgeSpecRouteFn,
  HTTPMethods,
  EdgeSpecRouteParams,
} from "./web-handler.js"
import type { ResponseTypeToContext } from "./context.js"

export type RouteSpec<AuthMiddlewares extends string> = {
  methods: readonly HTTPMethods[]

  jsonBody?: z.ZodTypeAny
  multiPartFormData?: z.ZodTypeAny
  queryParams?: z.ZodTypeAny
  commonParams?: z.ZodTypeAny
  urlEncodedFormData?: z.ZodTypeAny
  routeParams?: z.ZodTypeAny

  jsonResponse?: z.ZodTypeAny
  multipartFormDataResponse?: z.ZodTypeAny
  customResponseMap?: Record<string, z.ZodTypeAny>

  auth?:
    | AuthMiddlewares
    | readonly AuthMiddlewares[]
    | "none"
    | null
    | undefined

  middleware?: MiddlewareChain<any>

  openApiMetadata?: any

  onMultipleAuthMiddlewareFailures?: (errors: unknown[]) => void
}

type CustomResponseMapToEdgeSpecResponse<
  M extends Record<string, z.ZodTypeAny>,
  K extends keyof M = keyof M,
> = K extends keyof M & string
  ? EdgeSpecCustomResponse<z.output<M[K]>, K>
  : never

type GetRouteSpecResponseType<
  GS extends GlobalSpec,
  RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>,
> =
  | (RS["jsonResponse"] extends z.ZodTypeAny
      ? EdgeSpecJsonResponse<z.output<RS["jsonResponse"]>>
      : never)
  | (RS["multipartFormDataResponse"] extends z.ZodObject<any>
      ? EdgeSpecMultiPartFormDataResponse<
          z.output<RS["multipartFormDataResponse"]>
        >
      : never)
  | (RS["customResponseMap"] extends Record<string, z.ZodTypeAny>
      ? CustomResponseMapToEdgeSpecResponse<RS["customResponseMap"]>
      : never)
  | Response

/**
 * Collects all middleware request options from a Global/Route spec pair
 *
 * This goes in order of execution:
 *  1. Global middlewares (intersection)
 *  2. Auth middlewares (union)
 *  3. Global middlewares after auth (intersection)
 *  4. Route middlewares (intersection)
 */
type GetMiddlewareRequestOptions<
  GS extends GlobalSpec,
  RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>,
> = (RS["jsonBody"] extends infer ZT extends z.ZodTypeAny
  ? { jsonBody: z.output<ZT> }
  : {}) &
  (RS["multiPartFormData"] extends infer ZT extends z.ZodTypeAny
    ? { multiPartFormData: z.output<ZT> }
    : {}) &
  (RS["queryParams"] extends infer ZT extends z.ZodTypeAny
    ? { query: z.output<ZT> }
    : {}) &
  (RS["commonParams"] extends infer ZT extends z.ZodTypeAny
    ? { commonParams: z.output<ZT> }
    : {}) &
  (RS["urlEncodedFormData"] extends infer ZT extends z.ZodTypeAny
    ? { urlEncodedFormData: z.output<ZT> }
    : {}) &
  (RS["routeParams"] extends infer ZT extends z.ZodTypeAny
    ? { routeParams: z.output<ZT> }
    : { routeParams: EdgeSpecRouteParams })

type GetMiddlewareRequestContext<
  GS extends GlobalSpec,
  RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>,
> = AccumulateMiddlewareChainResultOptions<
  GS["beforeAuthMiddleware"] extends MiddlewareChain
    ? GS["beforeAuthMiddleware"]
    : readonly [],
  "intersection"
> &
  (RS["auth"] extends "none"
    ? {}
    : undefined extends RS["auth"]
      ? {}
      : AccumulateMiddlewareChainResultOptions<
          MapMiddlewares<
            GS["authMiddleware"],
            RS["auth"] extends undefined | null
              ? "none"
              : Exclude<RS["auth"], undefined | null>
          >,
          "union"
        >) &
  AccumulateMiddlewareChainResultOptions<
    GS["afterAuthMiddleware"] extends MiddlewareChain
      ? GS["afterAuthMiddleware"]
      : readonly [],
    "intersection"
  > &
  AccumulateMiddlewareChainResultOptions<
    RS["middleware"] extends MiddlewareChain<any>
      ? RS["middleware"]
      : readonly [],
    "intersection"
  >

export type EdgeSpecRouteFnFromSpecs<
  GS extends GlobalSpec,
  RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>,
> = EdgeSpecRouteFn<
  GetMiddlewareRequestOptions<GS, RS>,
  GetRouteSpecResponseType<GS, RS>,
  GetMiddlewareRequestContext<GS, RS> &
    ResponseTypeToContext<GetRouteSpecResponseType<GS, RS>>
>

export type CreateWithRouteSpecFn<GS extends GlobalSpec> = <
  const RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>,
>(
  routeSpec: RS | RS[],
) => (route: EdgeSpecRouteFnFromSpecs<GS, RS>) => Array<{
  routeFn: EdgeSpecRouteFn
  routeSpec: RS
}>
