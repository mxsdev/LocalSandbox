import {
  EdgeSpecRouteBundle,
  EdgeSpecRouteMap,
  makeRequestAgainstEdgeSpec,
} from "edgespec"
import getRouteMatcher from "next-route-matcher"

export function routeBundleFromRouteMap(
  routeMap: EdgeSpecRouteMap
): EdgeSpecRouteBundle {
  const edgeSpecRouteBundle: EdgeSpecRouteBundle = {
    routeMatcher: getRouteMatcher(Object.keys(routeMap)),
    routeMapWithHandlers: routeMap,
    makeRequest: async (req, options) =>
      makeRequestAgainstEdgeSpec(edgeSpecRouteBundle, options)(req),
  }

  return edgeSpecRouteBundle
}
