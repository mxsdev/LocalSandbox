import type { MapArray } from "../types/util.js"
import type {
  EdgeSpecRequest,
  SerializableToResponse,
} from "../types/web-handler.js"

export type Middleware<
  RequiredContext = {},
  NewContext = {},
  RequestOptions = {},
> = (
  request: EdgeSpecRequest<
    {
      routeParams: Readonly<Record<string, unknown>>
    } & RequestOptions
  >,
  ctx: RequiredContext & Partial<NewContext>,
  next: (
    request: EdgeSpecRequest,
    ctx: RequiredContext & Partial<NewContext>
  ) => Promise<Response>
) =>
  | Response
  | SerializableToResponse
  | Promise<Response | SerializableToResponse>

export type MiddlewareChain<RequiredOptions = any> =
  readonly Middleware<RequiredOptions>[]

/**
 * Collect all result options from a middleware chain
 *
 * For example:
 *
 * ```ts
 *  Middleware<{}, { auth: string }>
 *  Middleware<{}, { user: string }>
 *
 *  ->
 *
 *  { auth: string, user: string }
 * ```
 */
export type AccumulateMiddlewareChainResultOptions<
  MiddlewareChain,
  AccumulationType extends "union" | "intersection",
> = MiddlewareChain extends readonly [
  Middleware<any, infer ResultOptions>,
  ...infer Remaining,
]
  ? AccumulationType extends "intersection"
    ? ResultOptions &
        AccumulateMiddlewareChainResultOptions<Remaining, AccumulationType>
    :
        | ResultOptions
        | AccumulateMiddlewareChainResultOptions<Remaining, AccumulationType>
  : MiddlewareChain extends readonly any[]
    ? AccumulationType extends "intersection"
      ? {}
      : never
    : never

/**
 * Picks out a subset of middlewares from a map, maintaining the order given in the array
 *
 * For example:
 *
 * ```ts
 * MiddlewareMap = {
 *  "session_token": Middleware<{}, { session_token: string }>,
 *  "pat": Middleware<{}, { pat: string }>,
 *  "api_token": Middleware<{}, { api_token: string }>
 * }
 * Middlewares = ["session_token", "pat"]
 *
 * ->
 *
 * [ Middleware<{}, { session_token: string }>, Middleware<{}, { pat: string }> ]
 * ```
 *
 */
export type MapMiddlewares<
  MiddlewareMap extends { [mw: string]: Middleware },
  Middlewares extends
    | readonly (keyof MiddlewareMap)[]
    | keyof MiddlewareMap
    | "none",
> = Middlewares extends readonly (keyof MiddlewareMap)[]
  ? MapArray<MiddlewareMap, Middlewares>
  : Middlewares extends infer K extends keyof MiddlewareMap
    ? readonly [MiddlewareMap[K]]
    : readonly []
