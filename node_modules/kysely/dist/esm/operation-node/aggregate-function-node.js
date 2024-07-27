/// <reference types="./aggregate-function-node.d.ts" />
import { freeze } from '../util/object-utils.js';
import { WhereNode } from './where-node.js';
/**
 * @internal
 */
export const AggregateFunctionNode = freeze({
    is(node) {
        return node.kind === 'AggregateFunctionNode';
    },
    create(aggregateFunction, aggregated = []) {
        return freeze({
            kind: 'AggregateFunctionNode',
            func: aggregateFunction,
            aggregated,
        });
    },
    cloneWithDistinct(aggregateFunctionNode) {
        return freeze({
            ...aggregateFunctionNode,
            distinct: true,
        });
    },
    cloneWithFilter(aggregateFunctionNode, filter) {
        return freeze({
            ...aggregateFunctionNode,
            filter: aggregateFunctionNode.filter
                ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, 'And', filter)
                : WhereNode.create(filter),
        });
    },
    cloneWithOrFilter(aggregateFunctionNode, filter) {
        return freeze({
            ...aggregateFunctionNode,
            filter: aggregateFunctionNode.filter
                ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, 'Or', filter)
                : WhereNode.create(filter),
        });
    },
    cloneWithOver(aggregateFunctionNode, over) {
        return freeze({
            ...aggregateFunctionNode,
            over,
        });
    },
});
