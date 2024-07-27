/// <reference types="./order-by-parser.d.ts" />
import { isDynamicReferenceBuilder } from '../dynamic/dynamic-reference-builder.js';
import { OrderByItemNode } from '../operation-node/order-by-item-node.js';
import { RawNode } from '../operation-node/raw-node.js';
import { isExpressionOrFactory, parseExpression } from './expression-parser.js';
import { parseStringReference } from './reference-parser.js';
export function isOrderByDirection(thing) {
    return thing === 'asc' || thing === 'desc';
}
export function parseOrderBy(args) {
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
export function parseOrderByItem(ref, direction) {
    const parsedRef = parseOrderByExpression(ref);
    if (OrderByItemNode.is(parsedRef)) {
        if (direction) {
            throw new Error('Cannot specify direction twice!');
        }
        return parsedRef;
    }
    return OrderByItemNode.create(parsedRef, parseOrderByDirectionExpression(direction));
}
function parseOrderByExpression(expr) {
    if (isExpressionOrFactory(expr)) {
        return parseExpression(expr);
    }
    if (isDynamicReferenceBuilder(expr)) {
        return expr.toOperationNode();
    }
    const [ref, direction] = expr.split(' ');
    if (direction) {
        if (!isOrderByDirection(direction)) {
            throw new Error(`Invalid order by direction: ${direction}`);
        }
        return OrderByItemNode.create(parseStringReference(ref), parseOrderByDirectionExpression(direction));
    }
    return parseStringReference(expr);
}
function parseOrderByDirectionExpression(expr) {
    if (!expr) {
        return undefined;
    }
    if (expr === 'asc' || expr === 'desc') {
        return RawNode.createWithSql(expr);
    }
    return expr.toOperationNode();
}
