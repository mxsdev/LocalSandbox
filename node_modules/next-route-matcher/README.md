# NextJS Router Matcher

Want to use [nextjs-style routes](https://nextjs.org/docs/routing/dynamic-routes)
without the [next module](https://github.com/vercel/next.js/)? This module lets
you easily match routes. This code was adapted directly from the NextJS
implementation.

## Installation

```bash
yarn add next-route-matcher
```

## Usage

```ts
import nextRouteMatcher from "next-route-matcher"

const routeMatcher = nextRouteMatcher([
  "/health",
  "/api/nested",
  "/api/items/[item_name]",
  "/api/[someslug]/list",
  "/api/[slug1]/deepnest/[slug2]/image.png",
  "/api/[someslug]/greetings/[...anything]",
])

routeMatcher("/health")
// {
//   matchedRoute: "/health",
//   routeParams: {},
// }

routeMatcher("/api/nested")
// {
//   matchedRoute: "/api/nested",
//   routeParams: {},
// }

routeMatcher("/api/items/someitem")
// {
//   matchedRoute: "/api/items/[item_name]",
//   routeParams: { item_name: "someitem" },
// }

routeMatcher("/api/someslug/list")
// {
//   matchedRoute: "/api/[someslug]/list",
//   routeParams: { someslug: "someslug" },
// }

routeMatcher("/api/slug1/deepnest/slug2/image.png")
// {
//   matchedRoute: "/api/[slug1]/deepnest/[slug2]/image.png",
//   routeParams: {
//     slug1: "slug1"
//     slug2: "slug2",
//   }
// },
routeMatcher("/api/someslug/greetings/something/somethingelse.txt")
// {
//   matchedRoute: "/api/[someslug]/greetings/[...anything]"
//   routeParams: {
//     someslug: "someslug",
//     anything: ["something", "somethingelse.txt"],
//   },
// }
```
