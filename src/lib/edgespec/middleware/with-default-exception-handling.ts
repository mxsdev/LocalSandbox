import { Middleware } from "edgespec/middleware/types.js"
import { Logger } from "./with-logger.js"
import kleur from "kleur"

interface CreateWithDefaultExceptionHandlingOptions {
  coloredLogs?: boolean
  logWhen?: (status: number, error: unknown) => boolean
  includeStackTraceInResponse?: boolean
}

/**
 *
 */
export const createWithDefaultExceptionHandling =
  ({
    coloredLogs = true,
    logWhen = (status) => status >= 500,
    includeStackTraceInResponse = true,
  }: CreateWithDefaultExceptionHandlingOptions = {}): Middleware<{
    logger?: Logger
  }> =>
  async (req, ctx, next) => {
    try {
      return await next(req, ctx)
    } catch (e: any) {
      let response: Response
      if ("_isHttpException" in e) {
        response = Response.json(
          {
            message: e.message,
            stack: includeStackTraceInResponse ? e.stack : undefined,
          },
          {
            status: e.status,
          },
        )
      } else {
        response = Response.json(
          {
            message: "Internal server error",
            stack: includeStackTraceInResponse ? e.stack : undefined,
          },
          {
            status: 500,
          },
        )
      }

      if (logWhen(response.status, e)) {
        const logger = ctx.logger ?? console
        kleur.enabled = coloredLogs

        const { pathname } = new URL(req.url)
        const routeLog =
          response.status >= 500
            ? kleur.bgRed(`${pathname} threw an error`)
            : kleur.bgYellow(`${pathname} threw an error`)

        logger.error(
          `${routeLog}: ${e instanceof Error ? e.stack : e.toString()}`,
        )
      }

      return response
    }
  }
