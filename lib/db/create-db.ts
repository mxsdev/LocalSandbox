import { DB } from "sqlite"
import { createDenoSqliteKysely } from "../kysely/create-kysely.ts"
import { DB_MIGRATIONS } from "./migrations.ts"
import type { DB as KyselyTypes } from "./kysely-db-types.ts"

export async function createDB() {
  // Open a database
  const db = new DB()

  const kysely = createDenoSqliteKysely<KyselyTypes>({ database: db })

  db.execute(DB_MIGRATIONS)

  return {
    db,
    kysely,
  }
}
