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
} from "edgespec"
import { type Middleware } from "edgespec/middleware"
import { getRouteMatcher } from "next-route-matcher"
import { Kysely } from "kysely"
import initSqlJs from "sql.js"
import { SqlJsDialect } from "../kysely-sql-js"

type ZodModelToKysely<T extends z.ZodObject<z.ZodRawShape>> = {
  [K in keyof T["shape"]]: z.output<T["shape"][K]>
}

type Model<
  Schema extends z.ZodObject<any, any, any, any, any> = z.ZodObject<
    any,
    any,
    any,
    any,
    any
  >
> = {
  primaryKey: keyof Schema["shape"]
  schema: Schema
}

export function createModel<const Schema extends z.ZodObject<z.ZodRawShape>>(
  model: Model<Schema>
) {
  return model
}

type ModelSpec = Record<string, Model>

type ZodModelSpecToKyselyDB<MS extends ModelSpec> = {
  [Table in keyof MS]: ZodModelToKysely<MS[Table]["schema"]>
}

interface IntegrationSpec<MS extends ModelSpec, GS extends GlobalSpec> {
  models: MS
  globalSpec: GS
}

function zodToSQL(schema: z.ZodTypeAny) {
  if (schema instanceof z.ZodString) {
    return schema.maxLength === null ? "text" : `varchar(${schema.maxLength})`
  }

  if (schema instanceof z.ZodNumber) {
    if (schema.isInt) {
      return `int`
    }
  }

  throw new Error(`Unsupported schema` + schema)
}

const SQL = await initSqlJs({})

export function createIntegration<
  const MS extends ModelSpec,
  const GS extends GlobalSpec
>(integrationSpec: IntegrationSpec<MS, GS>) {
  const { models, globalSpec } = integrationSpec

  type KyselyDB = ZodModelSpecToKyselyDB<MS>

  const db = new SQL.Database()

  const kysely = new Kysely<KyselyDB>({
    dialect: new SqlJsDialect({
      sqlJs: db,
    }),
  })

  // generate table creation schemata
  const tables = Object.entries(models)
    .map(([name, { schema, primaryKey }]) => {
      return `CREATE TABLE IF NOT EXISTS ${name} (${Object.entries(schema.shape)
        .map(([colName, colSchema]) => {
          return `${colName} ${zodToSQL(colSchema as z.ZodTypeAny)} ${
            colName === primaryKey ? "PRIMARY KEY" : ""
          }`
        })
        .join(",")});`
    })
    .join("")

  db.exec(tables)

  // const kysely = createDenoSqliteKysely<KyselyDB>({
  //   database: db,
  // })

  const kyselyMiddleware: Middleware<{}, { kysely: Kysely<KyselyDB> }> = async (
    req,
    ctx,
    next
  ) => {
    ctx.kysely = kysely
    return next(req, ctx)
  }

  const createRouteFn = createWithEdgeSpec({
    ...globalSpec,
    beforeAuthMiddleware: [
      ...(globalSpec.beforeAuthMiddleware ?? []),
      kyselyMiddleware,
    ],
  } as unknown as Omit<GS, "beforeAuthMiddleware"> & {
    beforeAuthMiddleware: [
      typeof kyselyMiddleware,

      ...(GS["beforeAuthMiddleware"] extends undefined
        ? []
        : Exclude<GS["beforeAuthMiddleware"], undefined>)
    ]
  })

  return new IntegrationBuilder(
    createRouteFn,
    {},
    {
      cleanup: async () => {
        db.close()
      },
    }
  )
}

type EdgeSpecRouteMap<GS extends GlobalSpec> = Record<
  string,
  {
    routeFn: EdgeSpecRouteFn
    routeSpec: RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>
  }[]
>

export class IntegrationBuilder<
  const GS extends GlobalSpec,
  RouteMap extends EdgeSpecRouteMap<GS> = {}
> {
  constructor(
    private readonly createWithRouteFn: CreateWithRouteSpecFn<GS>,
    private readonly routeMap: RouteMap,
    private readonly options: {
      cleanup: () => Promise<void>
    }
  ) {}

  withRoute<
    const Route extends string,
    const RS extends RouteSpec<GetAuthMiddlewaresFromGlobalSpec<GS>>
  >(url: Route, routeSpec: RS, route: EdgeSpecRouteFnFromSpecs<GS, RS>) {
    return new IntegrationBuilder(
      this.createWithRouteFn,
      {
        ...this.routeMap,
        [url]: [
          ...(this.routeMap[url] ?? []),
          {
            routeFn: this.createWithRouteFn(routeSpec)(route),
            routeSpec,
          },
        ],
      } as RouteMap & {
        [key in Route]: [
          ...(RouteMap[key] extends any[] ? RouteMap[key] : []),
          {
            routeFn: EdgeSpecRouteFn
            routeSpec: RS
          }
        ]
      },
      this.options
    )
  }

  build() {
    const routesMap = Object.fromEntries(
      Object.entries(this.routeMap).map(([route, routes]) => [
        route,
        routes.map(({ routeFn }) => routeFn),
      ])
    )

    const edgeSpecRouteBundle: EdgeSpecRouteBundle = {
      routeMatcher: getRouteMatcher(Object.keys(routesMap)),
      routeMapWithHandlers: {},
      makeRequest: async (req, options) =>
        makeRequestAgainstEdgeSpec(
          {
            ...edgeSpecRouteBundle,
            routeMapWithHandlers: Object.fromEntries(
              Object.entries(this.routeMap)
                .map(
                  ([route, routes]) =>
                    [
                      route,
                      routes.find(({ routeSpec }) =>
                        routeSpec.methods.includes(req.method as HTTPMethods)
                      )!.routeFn,
                    ] as const
                )
                .filter(([_, v]) => Boolean(v))
            ),
          },
          options
        )(req),
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
  RouteMap extends EdgeSpecRouteMap<GS> = {}
> = Awaited<ReturnType<IntegrationBuilder<GS, RouteMap>["build"]>>

export interface IntegrationConfig {}

export type IntegrationFactory = (
  config: IntegrationConfig
) => Promise<Integration> | Integration
