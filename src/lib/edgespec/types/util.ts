/**
 * This just pulls the "`I`" from a `Record<I, any>`
 *
 * Had to create this utility since `keyof Record<I, any>` doesn't seem to give I :/
 */
export type InferRecordKey<R extends Record<any, any>> =
  R extends Record<infer K, any> ? K : never

/**
 * Executes an "array map" function on a tuple through a record
 *
 * For example:
 *
 * ```ts
 * Map = { [name in "arthur"|"jane"|"john"]: `hi ${name}!` }
 * Arr = [ "jane", "arthur" ]
 *
 * ->
 *
 *  [ "hi jane!", "hi arthur!" ]
 * ```
 */
export type MapArray<
  Map extends { [index: string | number | symbol]: any },
  Arr extends readonly (keyof Map)[],
> = Arr extends readonly [
  infer K extends keyof Map,
  ...infer Remaining extends (keyof Map)[],
]
  ? readonly [Map[K], ...MapArray<Map, Remaining>]
  : readonly []
