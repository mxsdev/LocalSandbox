import type { DatabaseConnection, QueryResult } from "kysely"
import type { BindParams, Database } from "sql.js"

import { CompiledQuery } from "kysely"

export class SqlJsConnection implements DatabaseConnection {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async executeQuery<R>(
    compiledQuery: CompiledQuery<unknown>
  ): Promise<QueryResult<R>> {
    return {
      rows: this.database
        .exec(compiledQuery.sql, compiledQuery.parameters as BindParams)
        .map(({ columns, values }) =>
          values.map(
            (row) =>
              columns.reduce(
                (acc, column, i) => ({ ...acc, [column]: row[i] }),
                {}
              ) as R
          )
        )
        .flat(),
    }
  }

  async *streamQuery() {
    throw new Error("Not supported with SQLite")
  }
}
