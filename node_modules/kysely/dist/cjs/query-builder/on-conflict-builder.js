"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnConflictUpdateBuilder = exports.OnConflictDoNothingBuilder = exports.OnConflictBuilder = void 0;
const column_node_js_1 = require("../operation-node/column-node.js");
const identifier_node_js_1 = require("../operation-node/identifier-node.js");
const on_conflict_node_js_1 = require("../operation-node/on-conflict-node.js");
const binary_operation_parser_js_1 = require("../parser/binary-operation-parser.js");
const update_set_parser_js_1 = require("../parser/update-set-parser.js");
const object_utils_js_1 = require("../util/object-utils.js");
const prevent_await_js_1 = require("../util/prevent-await.js");
class OnConflictBuilder {
    #props;
    constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
    }
    /**
     * Specify a single column as the conflict target.
     *
     * Also see the {@link columns}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    column(column) {
        const columnNode = column_node_js_1.ColumnNode.create(column);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns
                    ? (0, object_utils_js_1.freeze)([...this.#props.onConflictNode.columns, columnNode])
                    : (0, object_utils_js_1.freeze)([columnNode]),
            }),
        });
    }
    /**
     * Specify a list of columns as the conflict target.
     *
     * Also see the {@link column}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    columns(columns) {
        const columnNodes = columns.map(column_node_js_1.ColumnNode.create);
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
                columns: this.#props.onConflictNode.columns
                    ? (0, object_utils_js_1.freeze)([...this.#props.onConflictNode.columns, ...columnNodes])
                    : (0, object_utils_js_1.freeze)(columnNodes),
            }),
        });
    }
    /**
     * Specify a specific constraint by name as the conflict target.
     *
     * Also see the {@link column}, {@link columns} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    constraint(constraintName) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
                constraint: identifier_node_js_1.IdentifierNode.create(constraintName),
            }),
        });
    }
    /**
     * Specify an expression as the conflict target.
     *
     * This can be used if the unique index is an expression index.
     *
     * Also see the {@link column}, {@link columns} and {@link constraint}
     * methods for alternative ways to specify the conflict target.
     */
    expression(expression) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
                indexExpression: expression.toOperationNode(),
            }),
        });
    }
    where(...args) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)),
        });
    }
    whereRef(lhs, op, rhs) {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithIndexWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new OnConflictBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithoutIndexWhere(this.#props.onConflictNode),
        });
    }
    /**
     * Adds the "do nothing" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({ first_name, pic })
     *   .onConflict((oc) => oc
     *     .column('pic')
     *     .doNothing()
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "pic")
     * values ($1, $2)
     * on conflict ("pic") do nothing
     * ```
     */
    doNothing() {
        return new OnConflictDoNothingBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
                doNothing: true,
            }),
        });
    }
    /**
     * Adds the "do update set" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({ first_name, pic })
     *   .onConflict((oc) => oc
     *     .column('pic')
     *     .doUpdateSet({ first_name })
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "pic")
     * values ($1, $2)
     * on conflict ("pic")
     * do update set "first_name" = $3
     * ```
     *
     * In the next example we use the `ref` method to reference
     * columns of the virtual table `excluded` in a type-safe way
     * to create an upsert operation:
     *
     * ```ts
     * db.insertInto('person')
     *   .values(person)
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doUpdateSet((eb) => ({
     *       first_name: eb.ref('excluded.first_name'),
     *       last_name: eb.ref('excluded.last_name')
     *     }))
     *   )
     * ```
     */
    doUpdateSet(update) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWith(this.#props.onConflictNode, {
                updates: (0, update_set_parser_js_1.parseUpdateObjectExpression)(update),
            }),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
}
exports.OnConflictBuilder = OnConflictBuilder;
(0, prevent_await_js_1.preventAwait)(OnConflictBuilder, "don't await OnConflictBuilder instances.");
class OnConflictDoNothingBuilder {
    #props;
    constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}
exports.OnConflictDoNothingBuilder = OnConflictDoNothingBuilder;
(0, prevent_await_js_1.preventAwait)(OnConflictDoNothingBuilder, "don't await OnConflictDoNothingBuilder instances.");
class OnConflictUpdateBuilder {
    #props;
    constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
    }
    where(...args) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseValueBinaryOperationOrExpression)(args)),
        });
    }
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef(lhs, op, rhs) {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithUpdateWhere(this.#props.onConflictNode, (0, binary_operation_parser_js_1.parseReferentialBinaryOperation)(lhs, op, rhs)),
        });
    }
    clearWhere() {
        return new OnConflictUpdateBuilder({
            ...this.#props,
            onConflictNode: on_conflict_node_js_1.OnConflictNode.cloneWithoutUpdateWhere(this.#props.onConflictNode),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    toOperationNode() {
        return this.#props.onConflictNode;
    }
}
exports.OnConflictUpdateBuilder = OnConflictUpdateBuilder;
(0, prevent_await_js_1.preventAwait)(OnConflictUpdateBuilder, "don't await OnConflictUpdateBuilder instances.");
