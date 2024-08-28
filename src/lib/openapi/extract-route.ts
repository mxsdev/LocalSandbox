import { HTTPMethods } from "edgespec"

export const extractRoute = <
  const R extends Readonly<
    Record<K, readonly { readonly methods: readonly HTTPMethods[] }[]>
  >,
  const K extends keyof R,
  const M extends R[K][number]["methods"][number],
>(
  routes: R,
  key: K,
  method: M,
) =>
  [
    key,
    routes[key].find((val) => val.methods.includes(method)) as Extract<
      R[K][number],
      { methods: readonly M[] }
    >,
  ] as const