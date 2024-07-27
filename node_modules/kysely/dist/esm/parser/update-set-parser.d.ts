import { ColumnUpdateNode } from '../operation-node/column-update-node.js';
import { ExpressionBuilder } from '../expression/expression-builder.js';
import { UpdateKeys, UpdateType } from '../util/column-type.js';
import { ValueExpression } from './value-parser.js';
import { ExtractRawTypeFromReferenceExpression, ReferenceExpression } from './reference-parser.js';
export type UpdateObject<DB, TB extends keyof DB, UT extends keyof DB = TB> = {
    [C in UpdateKeys<DB[UT]>]?: ValueExpression<DB, TB, UpdateType<DB[UT][C]>> | undefined;
};
export type UpdateObjectFactory<DB, TB extends keyof DB, UT extends keyof DB> = (eb: ExpressionBuilder<DB, TB>) => UpdateObject<DB, TB, UT>;
export type UpdateObjectExpression<DB, TB extends keyof DB, UT extends keyof DB = TB> = UpdateObject<DB, TB, UT> | UpdateObjectFactory<DB, TB, UT>;
export type ExtractUpdateTypeFromReferenceExpression<DB, TB extends keyof DB, RE, DV = unknown> = UpdateType<ExtractRawTypeFromReferenceExpression<DB, TB, RE, DV>>;
export declare function parseUpdate(...args: [UpdateObjectExpression<any, any, any>] | [ReferenceExpression<any, any>, ValueExpression<any, any, any>]): ReadonlyArray<ColumnUpdateNode>;
export declare function parseUpdateObjectExpression(update: UpdateObjectExpression<any, any, any>): ReadonlyArray<ColumnUpdateNode>;
