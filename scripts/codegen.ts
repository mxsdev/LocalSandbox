import {
  Generator,
  SqliteDialect,
  SqliteAdapter,
  Transformer,
  ExportStatementNode,
  ColumnMetadata,
  TableMetadata,
} from "kysely-codegen"
import { SqliteIntrospector } from "kysely-codegen/dist/dialects/sqlite/sqlite-introspector.js"
import { createDB } from "../lib/db/create-db.ts"
import { join } from "path"
import SQLParser from "node-sql-parser"
import { pascalCase } from "case"

type DataTypesList = [
  "varchar",
  "char",
  "text",
  "integer",
  "int2",
  "int4",
  "int8",
  "smallint",
  "bigint",
  "boolean",
  "real",
  "double precision",
  "float4",
  "float8",
  "decimal",
  "numeric",
  "binary",
  "bytea",
  "date",
  "datetime",
  "time",
  "timetz",
  "timestamp",
  "timestamptz",
  "serial",
  "bigserial",
  "uuid",
  "json",
  "jsonb",
  "blob",
  "varbinary"
]

type SQLDataType = DataTypesList[number]

if (import.meta.main) {
  const { kysely } = await createDB()

  const dialect = {
    adapter: new SqliteAdapter(),
    introspector: new SqliteIntrospector(),
  } as any

  const metadata = await new SqliteIntrospector().introspect({
    db: kysely as any,
  })

  const kysely_preamble = [
    `import type { ColumnType } from "kysely"`,

    `export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;`,
  ].join("\n\n")

  let needs_kysely_preamble = false

  const zodObjects = metadata.tables
    .map((table) => {
      return `export const ${table.name} = z.object({\n${table.columns
        .map((col) => {
          if (col.hasDefaultValue) {
            needs_kysely_preamble = true
          }

          const zod =
            sqlColToZod(col, table) + (col.isNullable ? ".nullable()" : "")

          return `  ${col.name}: ${col.isNullable ? "?" : ""}${
            col.hasDefaultValue
              ? `${zod}.transform((x) => x as unknown as Generated<typeof x>)`
              : zod
          }`
        })
        .join(",\n")}\n})`
    })
    .join("\n\n")

  const tsTypes = metadata.tables
    .map(
      (table) =>
        `export type ${pascalCase(table.name)} = z.output<typeof ${table.name}>`
    )
    .join("\n\n")

  const db = `export interface DB {\n${metadata.tables
    .map((table) => `  ${table.name}: ${pascalCase(table.name)}`)
    .join(",\n")}\n}`

  const preamble = [
    "/* THIS CODE IS GENERATED, DO NOT MODIFY! */",
    `import z from "zod"`,
    ...(needs_kysely_preamble ? [kysely_preamble] : []),
  ].join("\n\n")

  const outFile = [preamble, zodObjects, tsTypes, db].join("\n\n")

  await Deno.writeFile(
    join(import.meta.dirname!, "../lib/db/kysely-db-types-zod.ts"),
    new TextEncoder().encode(outFile),
    {
      create: true,
    }
  )

  const codegen = await new Generator().generate({
    db: kysely as any,
    dialect: {
      adapter: new SqliteAdapter(),
      introspector: new SqliteIntrospector(),
    } as any,
  })

  await Deno.writeFile(
    join(import.meta.dirname!, "../lib/db/kysely-db-types.ts"),
    new TextEncoder().encode(
      `/* THIS CODE IS GENERATED, DO NOT MODIFY! */\n\n${codegen}`
    ),
    {
      create: true,
    }
  )
}

function sqlColToZod(col: ColumnMetadata, table: TableMetadata): string {
  const ast = new SQLParser.Parser().astify(
    `CREATE TABLE dummy ( id ${col.dataType} );`
  )

  if (!Array.isArray(ast)) {
    throw new Error()
  }

  const [create_table_node] = ast

  if (create_table_node.type !== "create") {
    throw new Error()
  }

  const create_definition = create_table_node.create_definitions?.[0]

  if (!create_definition) {
    throw new Error()
  }

  const { definition } = create_definition

  if (Array.isArray(definition)) {
    throw new Error("??")
  }

  const base = sqlDataTypeToZod(
    definition.dataType.toLowerCase() as SQLDataType
  )

  // TODO: enum values w/ CHECK

  return base
}

function sqlDataTypeToZod(dt: SQLDataType) {
  switch (dt) {
    case "text":
    case "varchar":
    case "uuid": {
      return `z.string()`
    }

    default: {
      throw new Error(`unhandled case ${dt}`)
    }
  }
}
