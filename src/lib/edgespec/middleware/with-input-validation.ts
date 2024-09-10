import { z, ZodError, ZodFirstPartyTypeKind } from "zod"

import type { QueryArrayFormats } from "edgespec/types/global-spec.js"
import type { Middleware } from "edgespec/middleware/index.js"
import {
  BadRequestError,
  InputParsingError,
  InputValidationError,
  InvalidContentTypeError,
  InvalidQueryParamsError,
} from "./http-exceptions.js"
import type { EdgeSpecRequest } from "edgespec/types/web-handler.js"

const getZodObjectSchemaFromZodEffectSchema = (
  isZodEffect: boolean,
  schema: z.ZodTypeAny,
): z.ZodTypeAny | z.ZodObject<any> => {
  if (!isZodEffect) {
    return schema as z.ZodObject<any>
  }

  let currentSchema = schema

  while (currentSchema instanceof z.ZodEffects) {
    currentSchema = currentSchema._def.schema
  }

  return currentSchema as z.ZodObject<any>
}

/**
 * This function is used to get the correct schema from a ZodEffect | ZodDefault | ZodOptional schema.
 * TODO: this function should handle all special cases of ZodSchema and not just ZodEffect | ZodDefault | ZodOptional
 */
const getZodDefFromZodSchemaHelpers = (schema: z.ZodTypeAny) => {
  const special_zod_types = [
    ZodFirstPartyTypeKind.ZodOptional,
    ZodFirstPartyTypeKind.ZodDefault,
    ZodFirstPartyTypeKind.ZodEffects,
  ]

  while (special_zod_types.includes(schema._def.typeName)) {
    if (
      schema._def.typeName === ZodFirstPartyTypeKind.ZodOptional ||
      schema._def.typeName === ZodFirstPartyTypeKind.ZodDefault
    ) {
      schema = schema._def.innerType
      continue
    }

    if (schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects) {
      schema = schema._def.schema
      continue
    }
  }
  return schema._def
}

const tryGetZodSchemaAsObject = (
  schema: z.ZodTypeAny,
): z.ZodObject<any> | undefined => {
  const isZodEffect = schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
  const safe_schema = getZodObjectSchemaFromZodEffectSchema(isZodEffect, schema)
  const isZodObject =
    safe_schema._def.typeName === ZodFirstPartyTypeKind.ZodObject

  if (!isZodObject) {
    return undefined
  }

  return safe_schema as z.ZodObject<any>
}

const isZodSchemaArray = (schema: z.ZodTypeAny) => {
  const def = getZodDefFromZodSchemaHelpers(schema)
  return def.typeName === ZodFirstPartyTypeKind.ZodArray
}

const isZodSchemaBoolean = (schema: z.ZodTypeAny) => {
  const def = getZodDefFromZodSchemaHelpers(schema)
  return def.typeName === ZodFirstPartyTypeKind.ZodBoolean
}

const parseQueryParams = (
  schema: z.ZodTypeAny,
  input: Record<string, unknown>,
  supportedArrayFormats: QueryArrayFormats,
) => {
  const parsed_input = Object.assign({}, input)
  const obj_schema = tryGetZodSchemaAsObject(schema)

  if (obj_schema) {
    for (const [key, value] of Object.entries(obj_schema.shape)) {
      if (isZodSchemaArray(value as z.ZodTypeAny)) {
        const array_input = input[key]

        if (
          typeof array_input === "string" &&
          supportedArrayFormats.includes("comma")
        ) {
          parsed_input[key] = array_input.split(",")
        }

        const bracket_syntax_array_input = input[`${key}[]`]
        if (
          typeof bracket_syntax_array_input === "string" &&
          supportedArrayFormats.includes("brackets")
        ) {
          const pre_split_array = bracket_syntax_array_input
          parsed_input[key] = pre_split_array.split(",")
        }

        if (
          Array.isArray(bracket_syntax_array_input) &&
          supportedArrayFormats.includes("brackets")
        ) {
          parsed_input[key] = bracket_syntax_array_input
        }

        continue
      }

      if (isZodSchemaBoolean(value as z.ZodTypeAny)) {
        const boolean_input = input[key]

        if (typeof boolean_input === "string") {
          parsed_input[key] = boolean_input === "true"
        }
      }
    }
  }

  return schema.parse(parsed_input)
}

const validateQueryParams = (
  inputUrl: string,
  schema: z.ZodTypeAny,
  supportedArrayFormats: QueryArrayFormats,
) => {
  const url = new URL(inputUrl, "http://dummy.com")

  const seenKeys = new Set<string>()

  const obj_schema = tryGetZodSchemaAsObject(schema)
  if (!obj_schema) {
    return
  }

  for (const key of url.searchParams.keys()) {
    for (const [schemaKey, value] of Object.entries(obj_schema.shape)) {
      if (isZodSchemaArray(value as z.ZodTypeAny)) {
        if (
          key === `${schemaKey}[]` &&
          !supportedArrayFormats.includes("brackets")
        ) {
          throw new InvalidQueryParamsError(
            `Bracket syntax not supported for query param "${schemaKey}"`,
          )
        }
      }
    }

    const key_schema = obj_schema.shape[key]

    if (key_schema) {
      if (isZodSchemaArray(key_schema)) {
        if (seenKeys.has(key) && !supportedArrayFormats.includes("repeat")) {
          throw new InvalidQueryParamsError(
            `Repeated parameters not supported for duplicate query param "${key}"`,
          )
        }
      }
    }

    seenKeys.add(key)
  }
}

export interface RequestInput<
  JsonBody extends z.ZodTypeAny,
  QueryParams extends z.ZodTypeAny,
  CommonParams extends z.ZodTypeAny,
  FormData extends z.ZodTypeAny,
  UrlEncodedFormData extends z.ZodTypeAny,
  RouteParams extends z.ZodTypeAny,
> {
  jsonBody?: JsonBody
  queryParams?: QueryParams
  commonParams?: CommonParams
  formData?: FormData
  routeParams?: RouteParams
  urlEncodedFormData?: UrlEncodedFormData
  supportedArrayFormats: QueryArrayFormats
}

export const validateInput = async <
  JsonBody extends z.ZodTypeAny,
  QueryParams extends z.ZodTypeAny,
  CommonParams extends z.ZodTypeAny,
  FormData extends z.ZodTypeAny,
  UrlEncodedFormData extends z.ZodTypeAny,
  RouteParams extends z.ZodTypeAny,
>(
  input: RequestInput<
    JsonBody,
    QueryParams,
    CommonParams,
    FormData,
    UrlEncodedFormData,
    RouteParams
  >,
  req: EdgeSpecRequest &
    Partial<{
      jsonBody: z.output<JsonBody>
      multiPartFormData: z.output<FormData>
      query: z.output<QueryParams>
      commonParams: z.output<CommonParams>
      urlEncodedFormData: z.output<UrlEncodedFormData>
    }>,
) => {
  const { supportedArrayFormats } = input

  if (
    (input.formData && input.jsonBody) ||
    (input.formData && input.commonParams)
  ) {
    throw new Error("Cannot use formData with jsonBody or commonParams")
  }

  if (
    (req.method === "POST" || req.method === "PATCH") &&
    (input.jsonBody || input.commonParams) &&
    !req.headers.get("content-type")?.includes("application/json")
  ) {
    throw new InvalidContentTypeError(
      `${req.method} requests must have Content-Type header with "application/json"`,
    )
  }

  if (
    input.urlEncodedFormData &&
    req.method !== "GET" &&
    !req.headers
      .get("content-type")
      ?.includes("application/x-www-form-urlencoded")
  ) {
    throw new InvalidContentTypeError(
      `Must have Content-Type header with "application/x-www-form-urlencoded"`,
    )
  }

  if (
    input.formData &&
    (req.method === "POST" || req.method === "PATCH") &&
    !req.headers.get("content-type")?.includes("multipart/form-data")
  ) {
    throw new InvalidContentTypeError(
      `${req.method} requests must have Content-Type header with "multipart/form-data"`,
    )
  }

  // TODO eventually we should support multipart/form-data

  const originalParams = Object.fromEntries(
    new URL(req.url).searchParams.entries(),
  )

  let jsonBody: any

  if (input.jsonBody || input.commonParams) {
    try {
      jsonBody = await req.clone().json()
    } catch (e: any) {
      if (!input.jsonBody?.isOptional()) {
        throw new InputParsingError("Error while parsing JSON body")
      }
    }
  }

  let multiPartFormData

  if (input.formData) {
    try {
      multiPartFormData = await req.clone().formData()
      multiPartFormData = Object.fromEntries(multiPartFormData.entries())
    } catch (e: any) {
      if (!input.formData?.isOptional()) {
        throw new InputParsingError("Error while parsing form data")
      }
    }
  }

  let urlEncodedFormData

  if (input.urlEncodedFormData) {
    try {
      const params = new URLSearchParams(await req.clone().text())
      urlEncodedFormData = Object.fromEntries(params.entries())
    } catch (e: any) {
      if (!input.urlEncodedFormData?.isOptional()) {
        throw new InputParsingError("Error while parsing url encoded form data")
      }
    }
  }

  try {
    const originalCombinedParams = {
      ...originalParams,
      ...(typeof jsonBody === "object" ? jsonBody : {}),
    }

    const willValidateRequestBody = !["GET", "DELETE", "HEAD"].includes(
      req.method,
    )

    if (Boolean(input.formData) && willValidateRequestBody) {
      req.multiPartFormData = input.formData?.parse(multiPartFormData)
    }

    if (Boolean(input.jsonBody) && willValidateRequestBody) {
      req.jsonBody = input.jsonBody?.parse(jsonBody)
    }

    if (Boolean(input.urlEncodedFormData) && willValidateRequestBody) {
      req.urlEncodedFormData =
        input.urlEncodedFormData?.parse(urlEncodedFormData)
    }

    if (Boolean(input.routeParams) && "routeParams" in req) {
      req.routeParams = input.routeParams?.parse(req.routeParams)
    }

    if (input.queryParams) {
      if (!req.url) {
        throw new Error("req.url is undefined")
      }

      validateQueryParams(req.url, input.queryParams, supportedArrayFormats)

      req.query = parseQueryParams(
        input.queryParams,
        originalParams,
        supportedArrayFormats,
      )
    }

    if (input.commonParams) {
      /**
       * as commonParams includes query params, we can use the parseQueryParams function
       */
      req.commonParams = parseQueryParams(
        input.commonParams,
        originalCombinedParams,
        supportedArrayFormats,
      )
    }
  } catch (error: any) {
    if (error instanceof BadRequestError) {
      throw error
    }

    if (error instanceof ZodError) {
      throw new InputValidationError(error)
    }

    throw new InputParsingError("Error while parsing input")
  }
}

export const withInputValidation =
  <
    JsonBody extends z.ZodTypeAny,
    QueryParams extends z.ZodTypeAny,
    CommonParams extends z.ZodTypeAny,
    FormData extends z.ZodTypeAny,
    UrlEncodedFormData extends z.ZodTypeAny,
    RouteParams extends z.ZodTypeAny,
  >(
    input: RequestInput<
      JsonBody,
      QueryParams,
      CommonParams,
      FormData,
      UrlEncodedFormData,
      RouteParams
    >,
  ): Middleware<
    {},
    {},
    {
      jsonBody: z.output<JsonBody>
      multiPartFormData: z.output<FormData>
      query: z.output<QueryParams>
      commonParams: z.output<CommonParams>
      urlEncodedFormData: z.output<UrlEncodedFormData>
    }
  > =>
  async (req, ctx, next) => {
    await validateInput(input, req)

    return await next(req, ctx)
  }
