/// <reference types="./delete-query-node.d.ts" />
import { freeze } from '../util/object-utils.js';
import { FromNode } from './from-node.js';
import { OrderByNode } from './order-by-node.js';
import { UsingNode } from './using-node.js';
/**
 * @internal
 */
export const DeleteQueryNode = freeze({
    is(node) {
        return node.kind === 'DeleteQueryNode';
    },
    create(fromItems, withNode) {
        return freeze({
            kind: 'DeleteQueryNode',
            from: FromNode.create(fromItems),
            ...(withNode && { with: withNode }),
        });
    },
    cloneWithOrderByItems(deleteNode, items) {
        return freeze({
            ...deleteNode,
            orderBy: deleteNode.orderBy
                ? OrderByNode.cloneWithItems(deleteNode.orderBy, items)
                : OrderByNode.create(items),
        });
    },
    cloneWithoutOrderBy(deleteNode) {
        return freeze({
            ...deleteNode,
            orderBy: undefined,
        });
    },
    cloneWithLimit(deleteNode, limit) {
        return freeze({
            ...deleteNode,
            limit,
        });
    },
    cloneWithoutLimit(deleteNode) {
        return freeze({
            ...deleteNode,
            limit: undefined,
        });
    },
    cloneWithUsing(deleteNode, tables) {
        return freeze({
            ...deleteNode,
            using: deleteNode.using !== undefined
                ? UsingNode.cloneWithTables(deleteNode.using, tables)
                : UsingNode.create(tables),
        });
    },
});
