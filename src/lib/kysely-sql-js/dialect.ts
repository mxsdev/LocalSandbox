import type { Dialect } from "kysely";

import type { SqlJsDialectConfig } from "./types";

import {
  Kysely,
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler,
} from "kysely";

import { SqlJsDriver } from "./driver";

export class SqlJsDialect implements Dialect {
  private config: SqlJsDialectConfig;

  constructor(config: SqlJsDialectConfig) {
    this.config = config;
  }

  createAdapter = () => new SqliteAdapter();

  createDriver = () => new SqlJsDriver(this.config);

  createIntrospector = (db: Kysely<any>) => new SqliteIntrospector(db);

  createQueryCompiler = () => new SqliteQueryCompiler();
}
