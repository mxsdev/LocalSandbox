import { type RouteRegex, getRouteRegex } from "./lib/route-regex"
import {
  type RouteMatcherFunc,
  type RouteParams,
  getRouteMatcherFunc,
} from "./lib/get-route-matcher-func"

/**
 * This is the getRouteMatcher function from NextJS- it's got a bit of an ugly
 * signature, so I use a different signature in the README and as the default
 * export for this module
 **/
export const getRouteMatcherUgly = (routeMapping: {
  [route: string]: Function
}) => {
  // convert each route to a regex
  const routes: {
    fsPath: string
    routeRegex: RouteRegex
    matcherFunc: RouteMatcherFunc
    serverFunc: Function
    priority: number
  }[] = []

  for (const [fsPath, serverFunc] of Object.entries(routeMapping)) {
    const routeRegex = getRouteRegex(fsPath)
    routes.push({
      fsPath,
      routeRegex,
      matcherFunc: getRouteMatcherFunc(routeRegex),
      serverFunc,
      // TODO use whatever priority func nextjs uses
      priority: -Object.keys(routeRegex.groups).length,
    })
  }

  routes.sort((a, b) => b.priority - a.priority)

  // TODO sort routes to fix precedence

  return (incomingPath: string) => {
    for (const { serverFunc, matcherFunc, fsPath } of routes) {
      const match = matcherFunc(incomingPath)
      if (match) {
        return { serverFunc, match, fsPath }
      }
    }
    return null
  }
}

export type RouteMatcherOutput = {
  matchedRoute: string
  routeParams: RouteParams
}

export type RouteMatcher = (incomingPath: string) => RouteMatcherOutput | null

export const getRouteMatcher = (routes: string[]): RouteMatcher => {
  const routeMapping: any = {}
  for (const route of routes) routeMapping[route] = () => {}
  const uglyMatcher = getRouteMatcherUgly(routeMapping)
  return (incomingPath: string) => {
    const result = uglyMatcher(incomingPath)
    if (!result) return null
    return { matchedRoute: result.fsPath, routeParams: result.match }
  }
}

export default getRouteMatcher
