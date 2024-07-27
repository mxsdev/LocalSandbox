"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteQueryNode = void 0;
const object_utils_js_1 = require("../util/object-utils.js");
const from_node_js_1 = require("./from-node.js");
const order_by_node_js_1 = require("./order-by-node.js");
const using_node_js_1 = require("./using-node.js");
/**
 * @internal
 */
exports.DeleteQueryNode = (0, object_utils_js_1.freeze)({
    is(node) {
        return node.kind === 'DeleteQueryNode';
    },
    create(fromItems, withNode) {
        return (0, object_utils_js_1.freeze)({
            kind: 'DeleteQueryNode',
            from: from_node_js_1.FromNode.create(fromItems),
            ...(withNode && { with: withNode }),
        });
    },
    cloneWithOrderByItems(deleteNode, items) {
        return (0, object_utils_js_1.freeze)({
            ...deleteNode,
            orderBy: deleteNode.orderBy
                ? order_by_node_js_1.OrderByNode.cloneWithItems(deleteNode.orderBy, items)
                : order_by_node_js_1.OrderByNode.create(items),
        });
    },
    cloneWithoutOrderBy(deleteNode) {
        return (0, object_utils_js_1.freeze)({
            ...deleteNode,
            orderBy: undefined,
        });
    },
    cloneWithLimit(deleteNode, limit) {
        return (0, object_utils_js_1.freeze)({
            ...deleteNode,
            limit,
        });
    },
    cloneWithoutLimit(deleteNode) {
        return (0, object_utils_js_1.freeze)({
            ...deleteNode,
            limit: undefined,
        });
    },
    cloneWithUsing(deleteNode, tables) {
        return (0, object_utils_js_1.freeze)({
            ...deleteNode,
            using: deleteNode.using !== undefined
                ? using_node_js_1.UsingNode.cloneWithTables(deleteNode.using, tables)
                : using_node_js_1.UsingNode.create(tables),
        });
    },
});
