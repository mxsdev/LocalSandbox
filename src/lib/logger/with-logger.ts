import type { Middleware } from "edgespec"
import type { Logger } from "pino"

export const withLogger =
  (logger: Logger): Middleware<{}, { logger: Logger }> =>
  async (req, ctx, next) => {
    ctx.logger = logger
    return await next(req, ctx)
  }

export const withExternallyPopulatedLogger: Middleware<
  {},
  { logger: Logger }
> = async (req, ctx, next) => {
  if (!ctx.logger) {
    throw new Error("Could not find logger in API route context!")
  }
  return await next(req, ctx)
}
