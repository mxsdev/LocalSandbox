import type { z } from "zod"
import type { Middleware } from "../middleware/types.js"
import type { InferRecordKey } from "./util.js"
import type { SecuritySchemeObject } from "openapi3-ts/oas31"

export type QueryArrayFormat = "brackets" | "comma" | "repeat"
export type QueryArrayFormats = readonly QueryArrayFormat[]

export type GlobalSpec = {
  authMiddleware: Record<string, Middleware<any, any>>
  beforeAuthMiddleware?: ReadonlyArray<Middleware<any, any, {}>>
  afterAuthMiddleware?: ReadonlyArray<Middleware<any, any>>

  openapi?: {
    apiName?: string
    productionServerUrl?: string
    securitySchemas?: Record<string, SecuritySchemeObject>
    readonly globalSchemas?: Record<string, z.ZodTypeAny>
  }

  shouldValidateResponses?: boolean
  supportedArrayFormats?: QueryArrayFormats
  passErrors?: boolean

  /**
   * If an endpoint accepts multiple auth methods and they all fail, this hook will be called with the errors thrown by the middlewares.
   * You can inspect the errors and throw a more generic error in this hook if you want.
   */
  onMultipleAuthMiddlewareFailures?: (errors: unknown[]) => void
}

export type GetAuthMiddlewaresFromGlobalSpec<GS extends GlobalSpec> =
  InferRecordKey<GS["authMiddleware"]>
