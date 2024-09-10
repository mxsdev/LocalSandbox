import { z } from "zod"
import type { GlobalSpec } from "./types/global-spec.js"
import type { Middleware, MiddlewareChain } from "./middleware/types.js"
import type { CreateWithRouteSpecFn, RouteSpec } from "./types/route-spec.js"
import type { ResponseTypeToContext } from "./types/context.js"
import type { InferRecordKey } from "./types/util.js"
import {
  EdgeSpecMultiPartFormDataResponse,
  EdgeSpecJsonResponse,
  type EdgeSpecRequest,
  EdgeSpecResponse,
  type EdgeSpecRouteFn,
  EdgeSpecCustomResponse,
  type SerializableToResponse,
} from "./types/web-handler.js"
import { withMethods } from "./middleware/with-methods.js"
import { withInputValidation } from "./middleware/with-input-validation.js"
import { withUnhandledExceptionHandling } from "./middleware/with-unhandled-exception-handling.js"
import { ResponseValidationError } from "./middleware/http-exceptions.js"

const attachMetadataToRouteFn = <
  const GS extends GlobalSpec,
  const RS extends RouteSpec<InferRecordKey<GS["authMiddleware"]>>,
>(
  { globalSpec, routeSpec }: { globalSpec: GS; routeSpec: RS },
  routeFn: EdgeSpecRouteFn,
) => {
  routeFn._globalSpec = globalSpec
  routeFn._routeSpec = routeSpec
  return { routeFn, routeSpec }
}

export const createWithEdgeSpec = <const GS extends GlobalSpec>(
  globalSpec: GS,
): CreateWithRouteSpecFn<GS> => {
  return (routeSpecs) => (routeFn) =>
    (Array.isArray(routeSpecs) ? routeSpecs : [routeSpecs]).map((routeSpec) =>
      attachMetadataToRouteFn(
        {
          globalSpec,
          routeSpec,
        },
        async (request, ctx) => {
          const onMultipleAuthMiddlewareFailures =
            globalSpec.onMultipleAuthMiddlewareFailures ??
            routeSpec.onMultipleAuthMiddlewareFailures

          const supportedAuthMiddlewares = new Set<string>(
            routeSpec.auth == null || routeSpec.auth === "none"
              ? []
              : Array.isArray(routeSpec.auth)
                ? routeSpec.auth
                : [routeSpec.auth],
          )

          const authMiddlewares = Object.entries(globalSpec.authMiddleware)
            .filter(([k, _]) => supportedAuthMiddlewares.has(k))
            .map(([_, v]) => v)

          return await wrapMiddlewares(
            [
              // Injected into the VM when running in WinterCG emulation mode
              // @ts-expect-error
              ...(typeof _injectedEdgeSpecMiddleware !== "undefined"
                ? // @ts-expect-error
                  _injectedEdgeSpecMiddleware
                : []),
              ...(globalSpec.passErrors
                ? []
                : [withUnhandledExceptionHandling]),
              // this serializes responses that are returned by middleware WITHOUT
              // validating them against the routeSpec
              //
              // this allows returning EdgeSpecResponse.json or ctx.json in a
              // middleware, instead of having to return a raw Response
              //
              // this is needed, for instance, when an error middleware returns an
              // error response that does not match the routeSpec's response shape
              serializeResponse(globalSpec, routeSpec, false),
              ...(globalSpec.beforeAuthMiddleware ?? []),
              firstAuthMiddlewareThatSucceeds(
                authMiddlewares,
                onMultipleAuthMiddlewareFailures,
              ),
              ...(globalSpec.afterAuthMiddleware ?? []),
              ...(routeSpec.middleware ?? []),
              withMethods(routeSpec.methods),
              withInputValidation({
                supportedArrayFormats: globalSpec.supportedArrayFormats ?? [
                  "brackets",
                  "comma",
                  "repeat",
                ],
                commonParams: routeSpec.commonParams,
                formData: routeSpec.multiPartFormData,
                jsonBody: routeSpec.jsonBody,
                queryParams: routeSpec.queryParams,
                routeParams: routeSpec.routeParams,
                urlEncodedFormData: routeSpec.urlEncodedFormData,
              }),
              // this serializes responses that are returned by the route function,
              // validating them against the routeSpec
              serializeResponse(globalSpec, routeSpec),
            ],
            routeFn,
            request,
            ctx,
          )
        },
      ),
    )
}

/**
 * Ensure that the default response is always merged with the final output
 * response from the route function.
 *
 * Without this, headers accumulated through middleware would never make their
 * way to the final response
 *
 * This also handles validation of the response and serializing it from an
 * EdgeSpecResponse to a wintercg-compatible Response
 */
function serializeResponse(
  globalSpec: GlobalSpec,
  routeSpec: RouteSpec<any>,
  skipValidation: boolean = false,
): Middleware {
  return async (req, ctx, next) => {
    const rawResponse = await next(req, ctx)

    const statusCode =
      rawResponse instanceof EdgeSpecResponse
        ? rawResponse.statusCode()
        : rawResponse.status

    const isSuccess = statusCode >= 200 && statusCode < 300

    try {
      const response = serializeToResponse(
        isSuccess &&
          !skipValidation &&
          (globalSpec.shouldValidateResponses ?? true),
        routeSpec,
        rawResponse,
      )

      return response
    } catch (err: any) {
      throw new ResponseValidationError(err)
    }
  }
}

export async function wrapMiddlewares(
  middlewares: MiddlewareChain,
  routeFn: EdgeSpecRouteFn<any, any, any>,
  request: EdgeSpecRequest,
  ctx: ResponseTypeToContext<Response>,
) {
  return await middlewares.reduceRight(
    (next, middleware) => {
      return async (req, ctx) => {
        return await middleware(req, ctx, next as any)
      }
    },
    async (request: EdgeSpecRequest, ctx: ResponseTypeToContext<Response>) =>
      routeFn(request, ctx),
  )(request, ctx)
}

function serializeToResponse(
  shouldValidateResponse: boolean,
  routeSpec: RouteSpec<any>,
  response: SerializableToResponse | Response,
): Response {
  if (!shouldValidateResponse) {
    return "serializeToResponse" in response
      ? response.serializeToResponse(z.any())
      : response
  }

  if (response instanceof EdgeSpecResponse) {
    if (response instanceof EdgeSpecJsonResponse) {
      return response.serializeToResponse(routeSpec.jsonResponse ?? z.any())
    }

    if (response instanceof EdgeSpecMultiPartFormDataResponse) {
      return response.serializeToResponse(
        routeSpec.multipartFormDataResponse ?? z.any(),
      )
    }

    if (response instanceof EdgeSpecCustomResponse) {
      return response.serializeToResponse(z.any())
    }
  }

  if ("serializeToResponse" in response) {
    throw new Error("Unknown Response type")
  }

  return response
}

function firstAuthMiddlewareThatSucceeds(
  authMiddlewares: MiddlewareChain,
  onMultipleAuthMiddlewareFailures:
    | ((errs: unknown[]) => void)
    | null
    | undefined,
): Middleware {
  return async (req, ctx, next) => {
    if (authMiddlewares.length === 0) {
      return await next(req, ctx)
    }

    const errors: unknown[] = []
    let didAuthMiddlewareThrow = true

    for (const middleware of authMiddlewares) {
      try {
        return await middleware(req, ctx, async (...args) => {
          // Otherwise errors unrelated to auth thrown by built-in middleware (withMethods, withValidation) will be caught here
          didAuthMiddlewareThrow = false
          return await next(...args)
        })
      } catch (error) {
        if (didAuthMiddlewareThrow) {
          errors.push(error)
          continue
        } else {
          throw error
        }
      }
    }

    if (onMultipleAuthMiddlewareFailures && didAuthMiddlewareThrow) {
      onMultipleAuthMiddlewareFailures(errors)
    }

    throw errors[errors.length - 1]
  }
}
