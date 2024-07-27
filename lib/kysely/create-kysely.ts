import { DB as DenoSQLiteDatabase } from "https://deno.land/x/sqlite@v3.8/mod.ts"

import {
  Driver,
  SqliteDialectConfig,
  DatabaseConnection,
  CompiledQuery,
  QueryResult,
  DatabaseIntrospector,
  Dialect,
  DialectAdapter,
  Kysely,
  QueryCompiler,
  SqliteAdapter,
  SqliteDriver,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "npm:kysely"

export function createDenoSqliteKysely<DB = any>(
  config: DenoSqliteDialectConfig
) {
  return new Kysely<DB>({
    dialect: new DenoSqliteDialect(config),
  })
}

export class DenoSqliteDialect implements Dialect {
  readonly #config: DenoSqliteDialectConfig

  constructor(config: DenoSqliteDialectConfig) {
    this.#config = Object.freeze({ ...config })
  }

  createDriver(): Driver {
    return new DenoSqliteDriver(this.#config)
  }

  createQueryCompiler(): QueryCompiler {
    return new SqliteQueryCompiler()
  }

  createAdapter(): DialectAdapter {
    return new SqliteAdapter()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new SqliteIntrospector(db)
  }
}

export interface DenoSqliteDialectConfig {
  /**
   * An sqlite Database instance or a function that returns one.
   *
   * If a function is provided, it's called once when the first query is executed.
   *
   * https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#new-databasepath-options
   */
  database: DenoSQLiteDatabase | (() => Promise<DenoSQLiteDatabase>)
  /**
   * Called once when the first query is executed.
   *
   * This is a Kysely specific feature and does not come from the `better-sqlite3` module.
   */
  onCreateConnection?: (connection: DatabaseConnection) => Promise<void>
}

export class DenoSqliteDriver implements Driver {
  readonly #config: DenoSqliteDialectConfig
  readonly #connectionMutex = new ConnectionMutex()

  #db?: DenoSQLiteDatabase
  #connection?: DatabaseConnection

  constructor(config: DenoSqliteDialectConfig) {
    this.#config = Object.freeze({ ...config })
  }

  async init(): Promise<void> {
    this.#db =
      typeof this.#config.database === "function"
        ? await this.#config.database()
        : this.#config.database

    this.#connection = new SqliteConnection(this.#db)

    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.#connection)
    }
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    // SQLite only has one single connection. We use a mutex here to wait
    // until the single connection has been released.
    await this.#connectionMutex.lock()
    return this.#connection!
  }

  async beginTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("begin"))
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("commit"))
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("rollback"))
  }

  async releaseConnection(): Promise<void> {
    this.#connectionMutex.unlock()
  }

  async destroy(): Promise<void> {
    this.#db?.close()
  }
}

class SqliteConnection implements DatabaseConnection {
  readonly #db: DenoSQLiteDatabase

  constructor(db: DenoSQLiteDatabase) {
    this.#db = db
  }

  executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
    const { sql, parameters } = compiledQuery
    const stmt = this.#db.prepareQuery(sql)

    if (stmt.columns().length >= 1) {
      return Promise.resolve({
        rows: stmt.allEntries(parameters as any[]) as O[],
      })
    } else {
      const changes = stmt.execute(parameters as any[])

      const numAffectedRows =
        changes !== undefined && changes !== null && changes !== 0
          ? BigInt(changes)
          : undefined
      const lastInsertRowid = this.#db.lastInsertRowId

      return Promise.resolve({
        // TODO: remove.
        numUpdatedOrDeletedRows: numAffectedRows,
        numAffectedRows,
        insertId:
          lastInsertRowid !== undefined &&
          lastInsertRowid !== null &&
          lastInsertRowid !== 0
            ? BigInt(lastInsertRowid)
            : undefined,
        rows: [],
      })
    }
  }

  // deno-lint-ignore require-yield
  async *streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error("Sqlite driver doesn't support streaming")
  }
}

class ConnectionMutex {
  #promise?: Promise<void>
  #resolve?: () => void

  async lock(): Promise<void> {
    while (this.#promise) {
      await this.#promise
    }

    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve
    })
  }

  unlock(): void {
    const resolve = this.#resolve

    this.#promise = undefined
    this.#resolve = undefined

    resolve?.()
  }
}
