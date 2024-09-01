import z from "zod"
import { Mutex } from "async-mutex"
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
import {
  EdgeSpecMiddlewareError,
  NotFoundError,
} from "edgespec/middleware/http-exceptions.js"

const idField = <K extends string>(key: K) => `${key}_id` as const
type IdFields<K extends string> = ReturnType<typeof idField<K>>

const pluralized = <K extends string>(key: K) => `${key}s` as const
type Pluralized<K extends string> = ReturnType<typeof pluralized<K>>

type AnyModelSchema = z.AnyZodObject | z.ZodEffects<z.AnyZodObject> | z.ZodType

type SchemaShape<M extends AnyModelSchema> = M extends z.AnyZodObject
  ? M["shape"]
  : M extends z.ZodEffects<z.AnyZodObject>
    ? {
        [K in Exclude<
          keyof M["_output"],
          keyof ReturnType<M["innerType"]>
        >]: z.ZodLiteral<M["_output"][K]>
      } & ReturnType<M["innerType"]>["shape"]
    : {
        [K in keyof M["_output"]]: z.ZodLiteral<M["_output"][K]>
      }
const getModelSchemaKeys = <M extends AnyModelSchema>(
  schema: M,
): SchemaShape<M> =>
  schema instanceof z.ZodObject
    ? schema.shape
    : schema instanceof z.ZodEffects
      ? schema.innerType().shape
      : {}

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

type SpecWhereCheck<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root>,
  ModelName extends keyof Root & string,
> = SpecWithRelationalJoin<Root, Spec, ModelName>

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

type ModelTriggers<
  Root extends ModelSpecs<any>,
  ModelName extends keyof Root & string = keyof Root & string,
> = {
  change?: (
    args: ModelName extends keyof Root & string
      ? {
          model: ModelName
          store: Model<Root, Root[ModelName], ModelName>
          old_val: SpecWithRelationalId<Root, Root[ModelName]> | null
          new_val: SpecWithRelationalId<Root, Root[ModelName]> | null
        }
      : never,
  ) => void
}

export const createNewStore = <T extends Store<any>>(store: T): T => {
  const new_store = {}

  Object.assign(
    new_store,
    Object.fromEntries(
      Object.entries(store).map(([k, v]) => [
        k,
        v["createNewInstance"](new_store),
      ]),
    ),
  )

  return new_store as T
}

class Model<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, keyof Root & string>,
  ModelName extends keyof Root & string,
> {
  constructor(
    protected spec: Spec,
    protected models: Store<Root>,
    protected modelName: ModelName,
    public triggers: ModelTriggers<Root> = {},
  ) {}

  private createNewInstance(models: Store<Root>) {
    return new Model(this.spec, models, this.modelName)
  }

  protected mutex = new Mutex()

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

  update() {
    return new ModelSelectBuilder(this)
  }

  insert() {
    return new ModelInsertBuilder(this)
  }

  delete() {
    return this.select()["delete"]()
  }
}

class ModelSelectBuilder<
  Root extends ModelSpecs<any>,
  Spec extends ModelSpec<any, any>,
  ModelName extends keyof Root & string,
  Output = SpecWithRelationalJoin<Root, Spec, ModelName>,
> {
  private get mutex() {
    return this.root["mutex"]
  }

  whereRules: ((val: SpecWhereCheck<Root, Spec, ModelName>) => boolean)[] = []

  constructor(private root: Model<Root, Spec, any>) {}

  where<F extends SpecWhereCheck<Root, Spec, ModelName>>(
    predicate: (val: SpecWhereCheck<Root, Spec, ModelName>) => val is F,
  ): ModelSelectBuilder<Root, Spec, ModelName, Output & F>
  where(
    predicate: (val: SpecWhereCheck<Root, Spec, ModelName>) => boolean,
  ): this
  where(
    predicate: (val: SpecWhereCheck<Root, Spec, ModelName>) => boolean,
  ): this {
    this.whereRules.push(predicate)
    return this
  }

  updates: ((
    val: SpecWhereCheck<Root, Spec, ModelName>,
  ) => Partial<SpecWithRelationalId<Root, Spec>>)[] = []

  set(
    updateFn:
      | (typeof this.updates)[number]
      | ReturnType<(typeof this.updates)[number]>,
  ): this {
    this.updates.push(
      typeof updateFn === "function" ? updateFn : () => updateFn,
    )
    return this
  }

  delete_mode = false
  private delete(): this {
    this.delete_mode = true
    return this
  }

  execute(): Output[] {
    const getMatches = () =>
      Object.values(this.root["store"]).filter((val): val is Output =>
        this.whereRules.every((rule) =>
          rule(val as SpecWhereCheck<Root, Spec, ModelName>),
        ),
      )

    if (this.updates.length > 0 || this.delete_mode) {
      for (const match of getMatches()) {
        const id = match[this.root["spec"].primaryKey as keyof Output]

        let old_val: any = this.root["_store"][id] ?? null
        let new_val: any = null

        if (this.updates.length > 0) {
          let updates: any = {}

          for (const update of this.updates) {
            updates = {
              ...updates,
              ...update(match as any),
            }
          }

          if (this.root["spec"].primaryKey in updates) {
            throw new Error("Cannot update primary key")
          }

          this.root["_store"][id] = {
            ...this.root["_store"][id],
            ...updates,
          }
          new_val = this.root["_store"][id]
        } else if (this.delete_mode) {
          delete this.root["_store"][id]
        }

        if (new_val || old_val) {
          this.root.triggers.change?.({
            model: this.root["modelName"],
            store: this.root,
            new_val,
            old_val,
            // TODO: type this properly
          } as any)
        }
      }
    }

    return getMatches()
  }

  executeTakeFirst(): Output | undefined {
    if (this.updates.length > 0) {
      return this.execute()[0]
    }

    return Object.values(this.root["store"]).find((val): val is Output =>
      this.whereRules.every((rule) =>
        rule(val as SpecWhereCheck<Root, Spec, ModelName>),
      ),
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
                    getModelSchemaKeys(spec.schema)?.[spec.primaryKey] ??
                      z.string(),
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
    let old_val: any = null
    let new_val: any = null

    for (const change of this.changes) {
      if (this.root["_store"][change[this.primaryKey]]) {
        if (this.on_conflict === "mergeall") {
          old_val ??= this.root["_store"][change[this.primaryKey]]
          new_val = {
            ...this.root["_store"][change[this.primaryKey]],
            ...change,
          }

          this.root["_store"][change[this.primaryKey]] = new_val
        } else if (this.on_conflict === "donothing") {
          // do nothing...
        } else {
          // TODO: improve error
          throw new Error("Duplicate primary key!")
        }
      } else {
        old_val ??= this.root["_store"][change[this.primaryKey]]
        new_val = change

        this.root["_store"][change[this.primaryKey]] = change
      }
    }

    if (new_val || old_val) {
      this.root.triggers.change?.({
        model: this.root["modelName"],
        store: this.root,
        new_val,
        old_val,
        // TODO: type this properly
      } as any)
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
      keyof SpecMap & string
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

export const getStore = <const MS extends ModelSpecs<any>>(
  modelSpecs: MS,
  triggers?: ModelTriggers<MS>,
) => {
  let models: Store<MS> = {} as any

  Object.assign(
    models,
    Object.fromEntries(
      Object.entries(modelSpecs).map(([modelName, modelSpec]) => [
        modelName,
        new Model(modelSpec as any, models, modelName, triggers),
      ]),
    ),
  )

  return models
}

interface IntegrationSpec<MS extends ModelSpecs<any>, GS extends GlobalSpec> {
  globalSpec: GS
  models: MS
  triggers?: ModelTriggers<MS>
}

export function createIntegration<
  const MS extends ModelSpecs<any>,
  const GS extends GlobalSpec,
>(integrationSpec: IntegrationSpec<MS, GS>) {
  const { models: modelSpecs, globalSpec, triggers } = integrationSpec

  const models = getStore(modelSpecs, triggers)

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

  return new IntegrationBuilder(createRouteFn, {}, models, {
    cleanup: async () => {
      // db.close()
    },
    integrationSpec,
  })
}

export class UnimplementedError extends EdgeSpecMiddlewareError {
  constructor(message = "Not Implemented") {
    super(message, 501)
  }
}

const UNIMPLEMENTED_ROUTE: () => Response = () => {
  throw new UnimplementedError("Not Implemented")
}

export type IntegrationSpecFromIntegration<
  I extends IntegrationBuilder<any, any>,
> =
  I extends IntegrationBuilder<any, infer IS extends IntegrationSpec<any, any>>
    ? IS
    : never

export type IntegrationStore<I extends IntegrationBuilder<any, any>> = Store<
  IntegrationSpecFromIntegration<I>["models"]
>

export type IntegrationModel<
  I extends IntegrationBuilder<any, any>,
  Model extends keyof IntegrationStore<I>,
> = IntegrationStore<I>[Model]["_type"]

export class IntegrationBuilder<
  const GS extends GlobalSpec,
  const IS extends IntegrationSpec<any, any>,
  // RouteMap extends EdgeSpecRouteMap<GS> = {},
> {
  constructor(
    private readonly createWithRouteFn: CreateWithRouteSpecFn<GS>,
    private routeMap: EdgeSpecRouteMap<GS>,
    private store: IntegrationStore<IntegrationBuilder<GS, IS>>,
    private readonly options: {
      cleanup: () => Promise<void>
      readonly integrationSpec: IS
    },
  ) {}

  // TODO: support adding multiple routes
  implementRoute<
    const Route extends string,
    const RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>,
  >(url: Route, routeSpec: RS, route?: EdgeSpecRouteFnFromSpecs<GS, RS>): this {
    this.routeMap = {
      ...this.routeMap,
      [url]: [
        ...(this.routeMap[url] ?? []),
        {
          ...(route
            ? {
                routeFn: this.createWithRouteFn(routeSpec)(route)[0]!.routeFn,
              }
            : {
                routeFn: UNIMPLEMENTED_ROUTE,
              }),
          routeSpec,
          // unimplemented: true,
        },
      ],
    } as EdgeSpecRouteMap<GS>

    return this
  }

  build() {
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
    }
  }
}

export type Integration<GS extends GlobalSpec = any> = Awaited<
  ReturnType<IntegrationBuilder<GS, any>["build"]>
>

export interface IntegrationConfig {}

export type IntegrationFactory = (config: IntegrationConfig) => Integration
