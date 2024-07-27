"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOrderByDirection = isOrderByDirection;
exports.parseOrderBy = parseOrderBy;
exports.parseOrderByItem = parseOrderByItem;
const dynamic_reference_builder_js_1 = require("../dynamic/dynamic-reference-builder.js");
const order_by_item_node_js_1 = require("../operation-node/order-by-item-node.js");
const raw_node_js_1 = require("../operation-node/raw-node.js");
const expression_parser_js_1 = require("./expression-parser.js");
const reference_parser_js_1 = require("./reference-parser.js");
function isOrderByDirection(thing) {
    return thing === 'asc' || thing === 'desc';
}
function parseOrderBy(args) {
    if (args.length === 2) {
        return [parseOrderByItem(args[0], args[1])];
    }
    if (args.length === 1) {
        const [orderBy] = args;
        if (Array.isArray(orderBy)) {
            return orderBy.map((item) => parseOrderByItem(item));
        }
        return [parseOrderByItem(orderBy)];
    }
    throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(ref, direction) {
    const parsedRef = parseOrderByExpression(ref);
    if (order_by_item_node_js_1.OrderByItemNode.is(parsedRef)) {
        if (direction) {
            throw new Error('Cannot specify direction twice!');
        }
        return parsedRef;
    }
    return order_by_item_node_js_1.OrderByItemNode.create(parsedRef, parseOrderByDirectionExpression(direction));
}
function parseOrderByExpression(expr) {
    if ((0, expression_parser_js_1.isExpressionOrFactory)(expr)) {
        return (0, expression_parser_js_1.parseExpression)(expr);
    }
    if ((0, dynamic_reference_builder_js_1.isDynamicReferenceBuilder)(expr)) {
        return expr.toOperationNode();
    }
    const [ref, direction] = expr.split(' ');
    if (direction) {
        if (!isOrderByDirection(direction)) {
            throw new Error(`Invalid order by direction: ${direction}`);
        }
        return order_by_item_node_js_1.OrderByItemNode.create((0, reference_parser_js_1.parseStringReference)(ref), parseOrderByDirectionExpression(direction));
    }
    return (0, reference_parser_js_1.parseStringReference)(expr);
}
function parseOrderByDirectionExpression(expr) {
    if (!expr) {
        return undefined;
    }
    if (expr === 'asc' || expr === 'desc') {
        return raw_node_js_1.RawNode.createWithSql(expr);
    }
    return expr.toOperationNode();
}
