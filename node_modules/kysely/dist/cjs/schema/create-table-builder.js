"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableBuilder = void 0;
const column_definition_node_js_1 = require("../operation-node/column-definition-node.js");
const create_table_node_js_1 = require("../operation-node/create-table-node.js");
const prevent_await_js_1 = require("../util/prevent-await.js");
const column_definition_builder_js_1 = require("./column-definition-builder.js");
const object_utils_js_1 = require("../util/object-utils.js");
const foreign_key_constraint_node_js_1 = require("../operation-node/foreign-key-constraint-node.js");
const column_node_js_1 = require("../operation-node/column-node.js");
const foreign_key_constraint_builder_js_1 = require("./foreign-key-constraint-builder.js");
const data_type_parser_js_1 = require("../parser/data-type-parser.js");
const primary_constraint_node_js_1 = require("../operation-node/primary-constraint-node.js");
const unique_constraint_node_js_1 = require("../operation-node/unique-constraint-node.js");
const check_constraint_node_js_1 = require("../operation-node/check-constraint-node.js");
const table_parser_js_1 = require("../parser/table-parser.js");
const on_commit_action_parse_js_1 = require("../parser/on-commit-action-parse.js");
const unique_constraint_builder_js_1 = require("./unique-constraint-builder.js");
const expression_parser_js_1 = require("../parser/expression-parser.js");
/**
 * This builder can be used to create a `create table` query.
 */
class CreateTableBuilder {
    #props;
    constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary table.
     */
    temporary() {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWith(this.#props.node, {
                temporary: true,
            }),
        });
    }
    /**
     * Adds an "on commit" statement.
     *
     * This can be used in conjunction with temporary tables on supported databases
     * like PostgreSQL.
     */
    onCommit(onCommit) {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWith(this.#props.node, {
                onCommit: (0, on_commit_action_parse_js_1.parseOnCommitAction)(onCommit),
            }),
        });
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the table already exists, no error is thrown if this method has been called.
     */
    ifNotExists() {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWith(this.#props.node, {
                ifNotExists: true,
            }),
        });
    }
    /**
     * Adds a column to the table.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey()),
     *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
     *   .addColumn('last_name', 'varchar(255)')
     *   .addColumn('bank_balance', 'numeric(8, 2)')
     *   // You can specify any data type using the `sql` tag if the types
     *   // don't include it.
     *   .addColumn('data', sql`any_type_here`)
     *   .addColumn('parent_id', 'integer', (col) =>
     *     col.references('person.id').onDelete('cascade'))
     *   )
     * ```
     *
     * With this method, it's once again good to remember that Kysely just builds the
     * query and doesn't provide the same API for all databases. For example, some
     * databases like older MySQL don't support the `references` statement in the
     * column definition. Instead foreign key constraints need to be defined in the
     * `create table` query. See the next example:
     *
     * ```ts
     *   .addColumn('parent_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'person_parent_id_fk', ['parent_id'], 'person', ['id'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     * ```
     *
     * Another good example is that PostgreSQL doesn't support the `auto_increment`
     * keyword and you need to define an autoincrementing column for example using
     * `serial`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'serial', (col) => col.primaryKey()),
     * ```
     */
    addColumn(columnName, dataType, build = object_utils_js_1.noop) {
        const columnBuilder = build(new column_definition_builder_js_1.ColumnDefinitionBuilder(column_definition_node_js_1.ColumnDefinitionNode.create(columnName, (0, data_type_parser_js_1.parseDataTypeExpression)(dataType))));
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWithColumn(this.#props.node, columnBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a primary key constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
     * ```
     */
    addPrimaryKeyConstraint(constraintName, columns) {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, primary_constraint_node_js_1.PrimaryConstraintNode.create(columns, constraintName)),
        });
    }
    /**
     * Adds a unique constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addUniqueConstraint('first_name_last_name_unique', ['first_name', 'last_name'])
     * ```
     *
     * In dialects such as PostgreSQL you can specify `nulls not distinct` as follows:
     * ```ts
     * addUniqueConstraint('first_name_last_name_unique', ['first_name', 'last_name'], (builder) => builder.nullsNotDistinct())
     * ```
     */
    addUniqueConstraint(constraintName, columns, build = object_utils_js_1.noop) {
        const uniqueConstraintBuilder = build(new unique_constraint_builder_js_1.UniqueConstraintNodeBuilder(unique_constraint_node_js_1.UniqueConstraintNode.create(columns, constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, uniqueConstraintBuilder.toOperationNode()),
        });
    }
    /**
     * Adds a check constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * addCheckConstraint('check_legs', sql`number_of_legs < 5`)
     * ```
     */
    addCheckConstraint(constraintName, checkExpression) {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, check_constraint_node_js_1.CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName)),
        });
    }
    /**
     * Adds a foreign key constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addForeignKeyConstraint(
     *   'owner_id_foreign',
     *   ['owner_id'],
     *   'person',
     *   ['id'],
     * )
     * ```
     *
     * Add constraint for multiple columns:
     *
     * ```ts
     * addForeignKeyConstraint(
     *   'owner_id_foreign',
     *   ['owner_id1', 'owner_id2'],
     *   'person',
     *   ['id1', 'id2'],
     *   (cb) => cb.onDelete('cascade')
     * )
     * ```
     */
    addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = object_utils_js_1.noop) {
        const builder = build(new foreign_key_constraint_builder_js_1.ForeignKeyConstraintBuilder(foreign_key_constraint_node_js_1.ForeignKeyConstraintNode.create(columns.map(column_node_js_1.ColumnNode.create), (0, table_parser_js_1.parseTable)(targetTable), targetColumns.map(column_node_js_1.ColumnNode.create), constraintName)));
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWithConstraint(this.#props.node, builder.toOperationNode()),
        });
    }
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
     *
     * Also see {@link temporary}.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *   .modifyFront(sql`global temporary`)
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64), col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (Postgres):
     *
     * ```sql
     * create global temporary table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(64) not null,
     *   "last_name" varchar(64) not null
     * )
     * ```
     */
    modifyFront(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWithFrontModifier(this.#props.node, modifier.toOperationNode()),
        });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link onCommit}.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *   .addColumn('id', 'integer', col => col => primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64), col => col.notNull())
     *   .modifyEnd(sql`collate utf8_unicode_ci`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(64) not null,
     *   `last_name` varchar(64) not null
     * ) collate utf8_unicode_ci
     * ```
     */
    modifyEnd(modifier) {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWithEndModifier(this.#props.node, modifier.toOperationNode()),
        });
    }
    /**
     * Allows to create table from `select` query.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('copy')
     *   .temporary()
     *   .as(db.selectFrom('person').select(['first_name', 'last_name']))
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create temporary table "copy" as
     * select "first_name", "last_name" from "person"
     * ```
     */
    as(expression) {
        return new CreateTableBuilder({
            ...this.#props,
            node: create_table_node_js_1.CreateTableNode.cloneWith(this.#props.node, {
                selectQuery: (0, expression_parser_js_1.parseExpression)(expression),
            }),
        });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('test')
     *   .$call((builder) => builder.addColumn('id', 'integer'))
     *   .execute()
     * ```
     *
     * ```ts
     * const addDefaultColumns = <T extends string, C extends string = never>(
     *   builder: CreateTableBuilder<T, C>
     * ) => {
     *   return builder
     *     .addColumn('id', 'integer', (col) => col.notNull())
     *     .addColumn('created_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     *     .addColumn('updated_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     * }
     *
     * db.schema
     *   .createTable('test')
     *   .$call(addDefaultColumns)
     *   .execute()
     * ```
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
exports.CreateTableBuilder = CreateTableBuilder;
(0, prevent_await_js_1.preventAwait)(CreateTableBuilder, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");
