import z from "zod"
import {
  type CreateWithRouteSpecFn,
  type EdgeSpecRouteBundle,
  type EdgeSpecRouteFn,
  type EdgeSpecRouteFnFromSpecs,
  type GetAuthMiddlewaresFromGlobalSpec,
  type GlobalSpec,
  type RouteSpec,
  createWithEdgeSpec,
  makeRequestAgainstEdgeSpec,
  HTTPMethods,
  Middleware,
  EdgeSpecRouteMap,
} from "edgespec"
import { getRouteMatcher } from "next-route-matcher"

const idField = <K extends string>(key: K) => `${key}_id` as const
type IdFields<K extends string> = ReturnType<typeof idField<K>>

const pluralized = <K extends string>(key: K) => `${key}s` as const
type Pluralized<K extends string> = ReturnType<typeof pluralized<K>>

type AnyModelSchema = z.AnyZodObject | z.ZodEffects<z.AnyZodObject>

type SchemaShape<M extends AnyModelSchema> = M extends z.AnyZodObject
  ? M["shape"]
  : M extends z.ZodEffects<z.AnyZodObject>
    ? {
        [K in Exclude<
          keyof M["_output"],
          keyof ReturnType<M["innerType"]>
        >]: z.ZodLiteral<M["_output"][K]>
      } & ReturnType<M["innerType"]>
    : never
const getModelSchemaKeys = <M extends AnyModelSchema>(
  schema: M,
): SchemaShape<M> =>
  schema instanceof z.ZodObject ? schema.shape : schema.innerType()

type SpecRelationalIds<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root>,
> = Spec["hasOne"] extends (keyof Root & string)[]
  ? {
      [K in Spec["hasOne"][number] as IdFields<K>]: z.output<
        SchemaShape<Root[K]["schema"]>[Root[K]["primaryKey"]]
      >
    }
  : {}

type ReverseHasOne<
  Root extends ModelSpecs<any>,
  ModelName extends keyof Root & string,
  ModelNames extends keyof Root & string = keyof Root & string,
> = ModelNames extends keyof Root & string
  ? Root[ModelNames]["hasOne"] extends (keyof Root & string)[]
    ? Root[ModelNames]["hasOne"][number] extends ModelName
      ? ModelNames
      : never
    : never
  : never

type SpecRelationalJoin<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root>,
  ModelName extends keyof Root & string,
> = (Spec["hasOne"] extends (keyof Root & string)[]
  ? {
      [K in Spec["hasOne"][number]]: () => SpecWithRelationalJoin<
        Root,
        Root[K],
        K
      >
    }
  : {}) & {
  [K in ReverseHasOne<
    Root,
    ModelName
  > as Pluralized<K>]: () => SpecWithRelationalJoin<Root, Root[K], K>[]
}

type SpecWithRelationalId<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root>,
> = z.output<Spec["schema"]> & SpecRelationalIds<Root, Spec>

type InputSpecWithRelationalId<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root>,
> = z.input<Spec["schema"]> & SpecRelationalIds<Root, Spec>

type SpecWithRelationalJoin<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root>,
  ModelName extends keyof Root & string,
> = z.output<Spec["schema"]> & SpecRelationalJoin<Root, Spec, ModelName>

type ModelSpec<Schema extends AnyModelSchema, ModelKeys> = {
  primaryKey: keyof SchemaShape<Schema>
  schema: Schema

  hasOne?: ModelKeys[]
}

type LazyError = (() => Error) | Error

const resolveLazyError = (err: LazyError) =>
  typeof err === "function" ? err() : err

class Model<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root & string>,
  ModelName extends keyof Root & string,
> {
  constructor(
    protected spec: Spec,
    protected models: Store<Root>,
    protected modelName: ModelName,
  ) {}

  _type!: SpecWithRelationalJoin<Root, Spec, ModelName>

  protected _store: Record<
    z.output<SchemaShape<Spec["schema"]>[Spec["primaryKey"]]>,
    SpecWithRelationalId<Root, Spec>
  > = {} as any

  protected get store(): Record<
    z.output<SchemaShape<Spec["schema"]>[Spec["primaryKey"]]>,
    SpecWithRelationalJoin<Root, Spec, ModelName>
  > {
    const res = Object.fromEntries(
      Object.entries(this._store).map(([id, data]) => [
        id,
        {
          ...(data as any),
          ...Object.fromEntries(
            this.spec.hasOne?.map((key) => [
              key,
              () =>
                this.models[key as keyof Store<Root>]
                  .select()
                  .where((v: any) => {
                    return (
                      v[
                        this.models[key as keyof Root & string]["spec"][
                          "primaryKey"
                        ]
                      ] === (data as any)[idField(key)]
                    )
                  })
                  .executeTakeFirstOrThrow(),
            ]) ?? [],
          ),

          ...Object.fromEntries(
            Object.entries(this.models)
              .filter(([_, v]) => v["spec"].hasOne?.includes(this.modelName))
              .map(([key, store]) => [
                pluralized(key),
                () =>
                  store
                    .select()
                    .where((v: any) => {
                      return v[idField(this.modelName)] === id
                    })
                    .execute(),
              ]),
          ),
        },
      ]),
    ) as any

    // console.log(Object.entries(this._store).map(([id, data]) => [id, data]))
    // console.log(res)

    return res
  }

  get(
    primaryKey: z.output<SchemaShape<Spec["schema"]>[Spec["primaryKey"]]>,
  ): SpecWithRelationalJoin<Root, Spec, ModelName> | undefined {
    return this.store[primaryKey]
  }

  getOrThrow(
    primaryKey: z.output<SchemaShape<Spec["schema"]>[Spec["primaryKey"]]>,
    err?: LazyError,
  ): SpecWithRelationalJoin<Root, Spec, ModelName> {
    const res = this.get(primaryKey)

    if (!res) {
      throw err
        ? resolveLazyError(err)
        : // TODO: improve this error
          new Error("No result found")
    }

    return res
  }

  select() {
    return new ModelSelectBuilder(this)
  }

  insert() {
    return new ModelInsertBuilder(this)
  }
}

class ModelSelectBuilder<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, any>,
  ModelName extends keyof Root & string,
  Output = SpecWithRelationalJoin<Root, Spec, ModelName>,
> {
  whereRules: ((val: z.output<Spec["schema"]>) => boolean)[] = []

  constructor(private root: Model<any, Spec, any>) {}

  where<F extends z.output<Spec["schema"]>>(
    predicate: (val: z.output<Spec["schema"]>) => val is F,
  ): ModelSelectBuilder<Root, Spec, ModelName, Output & F>
  where(predicate: (val: z.output<Spec["schema"]>) => boolean): this
  where(predicate: (val: z.output<Spec["schema"]>) => boolean): this {
    this.whereRules.push(predicate)
    return this
  }

  execute(): Output[] {
    return Object.values(this.root["store"]).filter((val): val is Output =>
      this.whereRules.every((rule) => rule(val as z.output<Spec["schema"]>)),
    )
  }

  executeTakeFirst(): Output | undefined {
    return Object.values(this.root["store"]).find((val): val is Output =>
      this.whereRules.every((rule) => rule(val as z.output<Spec["schema"]>)),
    )
  }

  executeTakeFirstOrThrow(err?: LazyError): Output {
    const res = this.executeTakeFirst()

    if (!res) {
      throw err
        ? resolveLazyError(err)
        : // TODO: improve this error
          new Error("No result(s) found")
    }

    return res
  }
}

class ModelInsertBuilder<
  Spec extends ModelSpec<any, any>,
  Root extends ModelSpecs<any>,
> {
  changes: SpecWithRelationalId<Root, Spec>[] = []

  on_conflict: "mergeall" | "donothing" | undefined

  constructor(private root: Model<Root, Spec, any>) {}

  get spec() {
    return this.root["spec"]
  }

  get store() {
    return this.root["store"]
  }

  get primaryKey(): Spec["primaryKey"] {
    return this.spec.primaryKey
  }

  // TODO: handle upsert
  // TODO: handle duplicate primary keys
  // TODO: validate foreign IDs
  values(
    vals:
      | InputSpecWithRelationalId<Root, Spec>
      | InputSpecWithRelationalId<Root, Spec>[],
  ): this {
    const vals_array = Array.isArray(vals) ? vals : [vals]
    this.changes.push(
      ...vals_array.map((val) =>
        (this.spec.schema as z.ZodAny)
          .and(
            z.object(
              Object.fromEntries(
                this.spec.hasOne?.map((k) => {
                  const spec = this.root["models"][k]!["spec"]
                  return [
                    idField(k),
                    getModelSchemaKeys(spec.schema)[spec.primaryKey],
                  ]
                }) ?? [],
              ),
            ),
          )
          .parse(val),
      ),
    )
    return this
  }

  onAllConflictMerge = (): this => {
    this.on_conflict = "mergeall"

    return this
  }

  onAllConflictDoNothing = (): this => {
    this.on_conflict = "donothing"

    return this
  }

  execute() {
    for (const change of this.changes) {
      if (this.root["_store"][change[this.primaryKey]]) {
        if (this.on_conflict === "mergeall") {
          this.root["_store"][change[this.primaryKey]] = {
            ...this.root["_store"][change[this.primaryKey]],
            ...change,
          }
        } else if (this.on_conflict === "donothing") {
          // do nothing...
        } else {
          // TODO: improve error
          throw new Error("Duplicate primary key!")
        }
      } else {
        this.root["_store"][change[this.primaryKey]] = change
      }
    }

    return this.changes.map((c) => this.store[c[this.primaryKey]])
  }

  executeTakeFirst() {
    return this.execute()[0]
  }

  executeTakeFirstOrThrow(err?: LazyError) {
    const result = this.executeTakeFirst()

    if (!result) {
      throw err
        ? resolveLazyError(err)
        : // TODO: improve error
          new Error("No result!")
    }

    return result
  }
}

// export function createModelSpec<
//   const Schema extends AnyModelSchema,
//   const MS extends ModelSpecs<MS>,
// >(spec: ModelSpec<Schema, MS>): ModelSpec<Schema, MS> {
//   return spec
// }

export function createModelSpecs<
  const SpecMap extends {
    [K in keyof SpecMap]: ModelSpec<
      SpecMap[K]["schema"] extends AnyModelSchema
        ? SpecMap[K]["schema"]
        : AnyModelSchema,
      keyof SpecMap
    >
  },
>(spec: SpecMap) {
  return spec
}

type ModelSpecs<K extends string | number | symbol> = Record<
  K,
  ModelSpec<AnyModelSchema, K>
>

type Store<MS extends ModelSpecs<any>> = {
  [Key in keyof MS & string]: Model<MS, MS[Key], Key>
}

export const getStore = <const MS extends ModelSpecs<any>>(modelSpecs: MS) => {
  let models: Store<MS> = {} as any

  Object.assign(
    models,
    Object.fromEntries(
      Object.entries(modelSpecs).map(([modelName, modelSpec]) => [
        modelName,
        new Model(modelSpec as any, models, modelName),
      ]),
    ),
  )

  return models
}

interface IntegrationSpec<MS extends ModelSpecs<any>, GS extends GlobalSpec> {
  models: MS
  globalSpec: GS
}

export function createIntegration<
  const MS extends ModelSpecs<any>,
  const GS extends GlobalSpec,
>(integrationSpec: IntegrationSpec<MS, GS>) {
  const { models: modelSpecs, globalSpec } = integrationSpec

  const models = getStore(modelSpecs)

  const storeMiddleware: Middleware<{}, { store: Store<MS> }> = async (
    req,
    ctx,
    next,
  ) => {
    ctx.store = models
    return next(req, ctx)
  }

  const createRouteFn = createWithEdgeSpec({
    ...globalSpec,
    beforeAuthMiddleware: [
      ...(globalSpec.beforeAuthMiddleware ?? []),
      storeMiddleware,
    ],
  } as unknown as Omit<GS, "beforeAuthMiddleware"> & {
    beforeAuthMiddleware: [
      typeof storeMiddleware,

      ...(GS["beforeAuthMiddleware"] extends undefined
        ? []
        : Exclude<GS["beforeAuthMiddleware"], undefined>),
    ]
  })

  return new IntegrationBuilder(
    createRouteFn,
    {},
    {
      cleanup: async () => {
        // db.close()
      },
      integrationSpec,
    },
  )
}

// type EdgeSpecRouteMap<GS extends GlobalSpec> = Record<
//   string,
//   {
//     routeFn: EdgeSpecRouteFn
//     routeSpec: RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>
//   }[]
// >

// type ExpandRouteMapMethods<
//   Routes extends EdgeSpecRouteMap<any>[string],
//   K extends number = number
// > = K extends keyof Routes ? Routes[K]["routeSpec"]["methods"][number]

type ExtractCompatibleMethodFromRouteMap<
  Routes extends { routeSpec: { methods: readonly HTTPMethods[] } }[],
  Methods extends HTTPMethods,
> = Routes extends [
  infer Route extends { routeSpec: { methods: readonly HTTPMethods[] } },
  ...infer Remaining extends {
    routeSpec: { methods: readonly HTTPMethods[] }
  }[],
]
  ? [Methods] extends [Route["routeSpec"]["methods"][number]]
    ? Route
    : ExtractCompatibleMethodFromRouteMap<Remaining, Methods>
  : never

// const test_gs = {
//   authMiddleware: {},
// } as const satisfies GlobalSpec

// const test_rs_1 = {
//   methods: ["GET"],
// } as const satisfies RouteSpec<GetAuthMiddlewaresFromGlobalSpec<typeof test_gs>>

// const test_rs_2 = {
//   methods: ["POST"],
// } as const satisfies RouteSpec<GetAuthMiddlewaresFromGlobalSpec<typeof test_gs>>

// type t = ExtractCompatibleMethodFromRouteMap<
//   [{ routeSpec: typeof test_rs_1 }, { routeSpec: typeof test_rs_2 }],
//   "GET"
// >

const UNIMPLEMENTED_ROUTE: () => Response = () =>
  new Response("Not Implemented", {
    status: 501,
  })

export type IntegrationSpecFromIntegration<
  I extends IntegrationBuilder<any, any, any>,
> =
  I extends IntegrationBuilder<
    any,
    infer IS extends IntegrationSpec<any, any>,
    any
  >
    ? IS
    : never

export type IntegrationStore<I extends IntegrationBuilder<any, any, any>> =
  Store<IntegrationSpecFromIntegration<I>["models"]>

export type IntegrationModel<
  I extends IntegrationBuilder<any, any, any>,
  Model extends keyof IntegrationStore<I>,
> = IntegrationStore<I>[Model]["_type"]

export class IntegrationBuilder<
  const GS extends GlobalSpec,
  const IS extends IntegrationSpec<any, any>,
  RouteMap extends EdgeSpecRouteMap<GS> = {},
> {
  constructor(
    private readonly createWithRouteFn: CreateWithRouteSpecFn<GS>,
    private readonly routeMap: RouteMap,
    private readonly options: {
      cleanup: () => Promise<void>
      readonly integrationSpec: IS
    },
  ) {}

  withRoute<
    const Route extends string,
    const RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>,
  >(url: Route, routeSpec: RS, route?: EdgeSpecRouteFnFromSpecs<GS, RS>) {
    return new IntegrationBuilder(
      this.createWithRouteFn,
      {
        ...this.routeMap,
        [url]: [
          ...(this.routeMap[url] ?? []),
          {
            ...(route
              ? {
                  routeFn: this.createWithRouteFn(routeSpec)(route),
                }
              : {
                  routeFn: UNIMPLEMENTED_ROUTE,
                }),
            routeSpec,
            unimplemented: true,
          },
        ],
      } as unknown as Omit<RouteMap, Route> & {
        [key in Route]: [
          ...(RouteMap[key] extends any[] ? RouteMap[key] : []),
          {
            routeFn: EdgeSpecRouteFn
            routeSpec: RS
          },
        ]
      },
      this.options,
    )
  }

  implementRoute<
    const Route extends keyof RouteMap,
    const Methods extends HTTPMethods[] | HTTPMethods,
  >(
    methods: Methods,
    url: Route,
    routeFn: EdgeSpecRouteFnFromSpecs<
      GS,
      ExtractCompatibleMethodFromRouteMap<
        RouteMap[Route],
        Methods extends Array<any> ? Methods[number] : Methods
      >["routeSpec"]
    >,
  ) {
    const routeMethods = Array.isArray(methods) ? methods : [methods]

    const routes = this.routeMap[url]
    let existingRoute = routes?.find((route) =>
      routeMethods.every((m) => route.routeSpec.methods.includes(m)),
    )

    if (!routes || !existingRoute) {
      throw new Error("No such route url exists!")
    }

    if (!("unimplemented" in existingRoute && existingRoute["unimplemented"])) {
      existingRoute = { ...existingRoute }
      routes.push(existingRoute)
    }

    existingRoute.routeFn = this.createWithRouteFn(existingRoute.routeSpec)(
      routeFn as any,
    )[0]!.routeFn
  }

  build() {
    // const routesMap = Object.fromEntries(
    //   Object.entries(this.routeMap).map(([route, routes]) => [
    //     route,
    //     routes.map(({ routeFn }) => routeFn),
    //   ]),
    // )

    const edgeSpecRouteBundle: EdgeSpecRouteBundle = {
      routeMatcher: getRouteMatcher(Object.keys(this.routeMap)),
      routeMapWithHandlers: this.routeMap,
      makeRequest: async (req, options) =>
        makeRequestAgainstEdgeSpec(edgeSpecRouteBundle, options)(req),
    }

    // to make request:
    // edgeSpecRouteBundle.makeRequest(new Request("http://localhost:3000/to/your/endpoint", { body: { } }))
    // note: hostname is ignored, only pathname is used

    return {
      edgeSpecRouteBundle,

      // include type information for later introspection
      _globalSpec: {} as GS,
      _routeMap: {} as RouteMap,
    }
  }
}

export type Integration<
  GS extends GlobalSpec = any,
  RouteMap extends EdgeSpecRouteMap<GS> = {},
> = Awaited<ReturnType<IntegrationBuilder<GS, any, RouteMap>["build"]>>

export interface IntegrationConfig {}

export type IntegrationFactory = (config: IntegrationConfig) => Integration

// const modelSpecs = createModelSpecs({
//   user: {
//     primaryKey: "id",
//     schema: z.object({
//       id: z.string(),
//     }),
//     hasOne: ["subscription"],
//   },
//   subscription: {
//     primaryKey: "subscriptionId",
//     schema: z.object({
//       authorizationSource: z.string(),
//       subscriptionId: z.string(),
//       displayName: z.string(),
//       state: z.string(),
//     }),
//     hasOne: ["user"],
//   },
// })

// type MS = typeof modelSpecs
// type Spec = MS["user"]

// type t = SpecWithRelationalJoin<MS, Spec>
