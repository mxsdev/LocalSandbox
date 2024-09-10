import {
  type EdgeSpecCustomResponse,
  type EdgeSpecJsonResponse,
  type EdgeSpecMultiPartFormDataResponse,
  EdgeSpecResponse,
  type SerializableToResponse,
} from "./web-handler.js"

export type ResponseTypeToContext<
  ResponseType extends SerializableToResponse | Response,
> =
  Exclude<ResponseType, Response> extends EdgeSpecJsonResponse<infer T>
    ? {
        json: typeof EdgeSpecResponse.json<T>
      }
    : Exclude<ResponseType, Response> extends EdgeSpecMultiPartFormDataResponse<
          infer T
        >
      ? {
          multipartFormData: typeof EdgeSpecResponse.multipartFormData<T>
        }
      : Exclude<ResponseType, Response> extends EdgeSpecCustomResponse<
            infer T,
            infer C
          >
        ? {
            custom: typeof EdgeSpecResponse.custom<T, C>
          }
        : {
            json: typeof EdgeSpecResponse.json<unknown>
            multipartFormData: typeof EdgeSpecResponse.multipartFormData<
              Record<string, string>
            >
          }

const DEFAULT_CONTEXT = {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  json: EdgeSpecResponse.json,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  multipartFormData: EdgeSpecResponse.multipartFormData,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  custom: EdgeSpecResponse.custom,
} as const

export const getDefaultContext = () => ({ ...DEFAULT_CONTEXT })
