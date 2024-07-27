/// <reference types="./unique-constraint-builder.d.ts" />
import { UniqueConstraintNode } from '../operation-node/unique-constraint-node.js';
import { preventAwait } from '../util/prevent-await.js';
export class UniqueConstraintNodeBuilder {
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
        return new UniqueConstraintNodeBuilder(UniqueConstraintNode.cloneWith(this.#node, { nullsNotDistinct: true }));
    }
}
preventAwait(UniqueConstraintNodeBuilder, "don't await UniqueConstraintNodeBuilder instances directly.");
