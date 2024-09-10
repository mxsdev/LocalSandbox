import type { Middleware } from "edgespec/middleware/types.js"
import type { HTTPMethods } from "edgespec/types/web-handler.js"
import { MethodNotAllowedError } from "./http-exceptions.js"

export const withMethods =
  (methods: readonly HTTPMethods[]): Middleware =>
  async (req, ctx, next) => {
    if (!(methods as string[]).includes(req.method)) {
      throw new MethodNotAllowedError(methods)
    }

    return await next(req, ctx)
  }
