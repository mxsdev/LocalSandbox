"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueConstraintNodeBuilder = void 0;
const unique_constraint_node_js_1 = require("../operation-node/unique-constraint-node.js");
const prevent_await_js_1 = require("../util/prevent-await.js");
class UniqueConstraintNodeBuilder {
    #node;
    constructor(node) {
        this.#node = node;
    }
    toOperationNode() {
        return this.#node;
    }
    /**
     * Adds `nulls not distinct` to the unique constraint definition
     *
     * Supported by PostgreSQL dialect only
     */
    nullsNotDistinct() {
        return new UniqueConstraintNodeBuilder(unique_constraint_node_js_1.UniqueConstraintNode.cloneWith(this.#node, { nullsNotDistinct: true }));
    }
}
exports.UniqueConstraintNodeBuilder = UniqueConstraintNodeBuilder;
(0, prevent_await_js_1.preventAwait)(UniqueConstraintNodeBuilder, "don't await UniqueConstraintNodeBuilder instances directly.");
