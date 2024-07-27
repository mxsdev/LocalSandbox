import test from "ava"
import getRouteMatcher from "../index"

test("should match a variety of routes", (t) => {
  const routeMatcher = getRouteMatcher([
    "/health",
    "/api/nested",
    "/api/items/[item_name]",
    "/api/[someslug]/list",
    "/api/[slug1]/deepnest/[slug2]/image.png",
    "/api/[someslug]/greetings/[...anything]",
  ])

  t.deepEqual(routeMatcher("/health"), {
    matchedRoute: "/health",
    routeParams: {},
  })

  t.deepEqual(routeMatcher("/api/nested"), {
    matchedRoute: "/api/nested",
    routeParams: {},
  })

  t.deepEqual(routeMatcher("/api/items/someitem"), {
    matchedRoute: "/api/items/[item_name]",
    routeParams: { item_name: "someitem" },
  })

  t.deepEqual(routeMatcher("/api/someslug/list"), {
    matchedRoute: "/api/[someslug]/list",
    routeParams: { someslug: "someslug" },
  })

  t.deepEqual(routeMatcher("/api/slug1/deepnest/slug2/image.png"), {
    matchedRoute: "/api/[slug1]/deepnest/[slug2]/image.png",
    routeParams: {
      slug1: "slug1",
      slug2: "slug2",
    },
  })

  t.deepEqual(
    routeMatcher("/api/someslug/greetings/something/somethingelse.txt"),
    {
      matchedRoute: "/api/[someslug]/greetings/[...anything]",
      routeParams: {
        someslug: "someslug",
        anything: ["something", "somethingelse.txt"],
      },
    }
  )
})
