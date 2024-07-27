// https://github.com/vercel/next.js/blob/402f0360cece821b9e0017f6ecb499d129993600/packages/next/shared/lib/router/utils/route-matcher.ts
import type { RouteRegex } from "./route-regex"

export type RouteParams = { [paramName: string]: string | string[] }
export type RouteMatcherFunc = (
  pathname: string | null | undefined
) => RouteParams | false

export function getRouteMatcherFunc(routeRegex: RouteRegex): RouteMatcherFunc {
  const { re, groups } = routeRegex
  return (pathname: string | null | undefined) => {
    const routeMatch = re.exec(pathname!)
    if (!routeMatch) {
      return false
    }

    const decode = (param: string) => {
      try {
        return decodeURIComponent(param)
      } catch (_) {
        throw new Error("failed to decode param")
      }
    }
    const params: { [paramName: string]: string | string[] } = {}

    Object.keys(groups).forEach((slugName: string) => {
      const g = groups[slugName]
      const m = routeMatch[g.pos]
      if (m !== undefined) {
        params[slugName] = ~m.indexOf("/")
          ? m.split("/").map((entry) => decode(entry))
          : g.repeat
          ? [decode(m)]
          : decode(m)
      }
    })
    return params
  }
}
