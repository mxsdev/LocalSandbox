"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteIntrospector = void 0;
const migrator_js_1 = require("../../migration/migrator.js");
const sql_js_1 = require("../../raw-builder/sql.js");
class SqliteIntrospector {
    #db;
    constructor(db) {
        this.#db = db;
    }
    async getSchemas() {
        // Sqlite doesn't support schemas.
        return [];
    }
    async getTables(options = { withInternalKyselyTables: false }) {
        let query = this.#db
            .selectFrom('sqlite_master')
            .where('type', 'in', ['table', 'view'])
            .where('name', 'not like', 'sqlite_%')
            .select('name')
            .orderBy('name')
            .$castTo();
        if (!options.withInternalKyselyTables) {
            query = query
                .where('name', '!=', migrator_js_1.DEFAULT_MIGRATION_TABLE)
                .where('name', '!=', migrator_js_1.DEFAULT_MIGRATION_LOCK_TABLE);
        }
        const tables = await query.execute();
        return Promise.all(tables.map(({ name }) => this.#getTableMetadata(name)));
    }
    async getMetadata(options) {
        return {
            tables: await this.getTables(options),
        };
    }
    async #getTableMetadata(table) {
        const db = this.#db;
        // Get the SQL that was used to create the table.
        const tableDefinition = await db
            .selectFrom('sqlite_master')
            .where('name', '=', table)
            .select(['sql', 'type'])
            .$castTo()
            .executeTakeFirstOrThrow();
        // Try to find the name of the column that has `autoincrement` 🤦
        const autoIncrementCol = tableDefinition.sql
            ?.split(/[\(\),]/)
            ?.find((it) => it.toLowerCase().includes('autoincrement'))
            ?.trimStart()
            ?.split(/\s+/)?.[0]
            ?.replace(/["`]/g, '');
        const columns = await db
            .selectFrom((0, sql_js_1.sql) `pragma_table_info(${table})`.as('table_info'))
            .select(['name', 'type', 'notnull', 'dflt_value'])
            .orderBy('cid')
            .execute();
        return {
            name: table,
            isView: tableDefinition.type === 'view',
            columns: columns.map((col) => ({
                name: col.name,
                dataType: col.type,
                isNullable: !col.notnull,
                isAutoIncrementing: col.name === autoIncrementCol,
                hasDefaultValue: col.dflt_value != null,
                comment: undefined,
            })),
        };
    }
}
exports.SqliteIntrospector = SqliteIntrospector;
