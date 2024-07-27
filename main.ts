import { createDB } from "./lib/db/create-db.ts"

const { kysely } = await createDB()

await kysely
  .insertInto("github__users")
  .values({
    id: "123",
    username: "char",
  })
  .execute()

import { DB } from "https://deno.land/x/sqlite/mod.ts"

import {
  DummyDriver,
  Generated,
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
  sql,
} from "npm:kysely"
import { createDenoSqliteKysely } from "./lib/kysely/create-kysely.ts"

// import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts"
// import { createRxDatabase, addRxPlugin, RxCollection } from "npm:rxdb"
// import { getRxStorageMemory } from "npm:rxdb/plugins/storage-memory"
// import { RxDBDevModePlugin } from "npm:rxdb/plugins/dev-mode"
// import { RxDBQueryBuilderPlugin } from "npm:rxdb/plugins/query-builder"
// import { zodToJsonSchema } from "npm:zod-to-json-schema"

// addRxPlugin(RxDBQueryBuilderPlugin)
// addRxPlugin(RxDBDevModePlugin)

// const defineSchema = <const T extends z.ZodObject<any>>(opts: {
//   schema: T
//   primaryKey: keyof T["shape"]
//   indexes?: (keyof T["shape"] | (keyof T["shape"])[])[]
// }) => opts

// const zodCollections = {
//   todos: defineSchema({
//     schema: z.object({
//       id: z.string().max(100),
//     }),
//     primaryKey: "id",
//   }),
// }

// const db = await createRxDatabase<{
//   [K in keyof typeof zodCollections]: RxCollection<
//     z.output<(typeof zodCollections)[K]["schema"]>
//   >
// }>({
//   name: "localdb",
//   storage: getRxStorageMemory(),
// })

// await db.addCollections(
//   Object.fromEntries(
//     Object.entries(zodCollections).map(([k, v]) => [
//       k,
//       {
//         schema: {
//           version: 0,
//           primaryKey: v.primaryKey,
//           indexes: v.indexes,
//           ...(zodToJsonSchema as any)(v.schema),
//         },
//       },
//     ]) as any
//   )
// )
