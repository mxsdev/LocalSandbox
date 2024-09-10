import type { Middleware } from "./types.js"

export type Logger = {
  debug: (...args: any[]) => void
  info: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}

/**
 * Attaches a provided logger to ctx.logger.
 * `ctx.logger` is used by internal EdgeSpec middleware when provided (instead of `console`).
 */
export const createWithLogger =
  <L extends Logger>(
    logger: L,
  ): Middleware<
    {},
    {
      logger: L
    }
  > =>
  async (req, ctx, next) => {
    ctx.logger = logger
    return await next(req, ctx)
  }
