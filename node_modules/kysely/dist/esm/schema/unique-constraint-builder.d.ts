import { OperationNodeSource } from '../operation-node/operation-node-source.js';
import { UniqueConstraintNode } from '../operation-node/unique-constraint-node.js';
export declare class UniqueConstraintNodeBuilder implements OperationNodeSource {
    #private;
    constructor(node: UniqueConstraintNode);
    toOperationNode(): UniqueConstraintNode;
    /**
     * Adds `nulls not distinct` to the unique constraint definition
     *
     * Supported by PostgreSQL dialect only
     */
    nullsNotDistinct(): UniqueConstraintNodeBuilder;
}
export type UniqueConstraintNodeBuilderCallback = (builder: UniqueConstraintNodeBuilder) => UniqueConstraintNodeBuilder;
