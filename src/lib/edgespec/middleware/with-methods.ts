import { Middleware } from "edgespec/middleware/types.js"
import { HTTPMethods } from "edgespec/types/web-handler.js"
import { MethodNotAllowedError } from "./http-exceptions.js"

export const withMethods =
  (methods: readonly HTTPMethods[]): Middleware =>
  (req, ctx, next) => {
    if (!(methods as string[]).includes(req.method)) {
      throw new MethodNotAllowedError(methods)
    }

    return next(req, ctx)
  }
