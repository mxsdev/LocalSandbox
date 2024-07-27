"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableAddForeignKeyConstraintBuilder = void 0;
const add_constraint_node_js_1 = require("../operation-node/add-constraint-node.js");
const alter_table_node_js_1 = require("../operation-node/alter-table-node.js");
const object_utils_js_1 = require("../util/object-utils.js");
const prevent_await_js_1 = require("../util/prevent-await.js");
class AlterTableAddForeignKeyConstraintBuilder {
    #props;
    constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
    }
    onDelete(onDelete) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onDelete(onDelete),
        });
    }
    onUpdate(onUpdate) {
        return new AlterTableAddForeignKeyConstraintBuilder({
            ...this.#props,
            constraintBuilder: this.#props.constraintBuilder.onUpdate(onUpdate),
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
        return this.#props.executor.transformQuery(alter_table_node_js_1.AlterTableNode.cloneWithTableProps(this.#props.node, {
            addConstraint: add_constraint_node_js_1.AddConstraintNode.create(this.#props.constraintBuilder.toOperationNode()),
        }), this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
exports.AlterTableAddForeignKeyConstraintBuilder = AlterTableAddForeignKeyConstraintBuilder;
(0, prevent_await_js_1.preventAwait)(AlterTableAddForeignKeyConstraintBuilder, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");
