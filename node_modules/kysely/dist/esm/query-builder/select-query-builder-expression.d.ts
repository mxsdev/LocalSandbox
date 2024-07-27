import { AliasableExpression } from '../expression/expression.js';
import { SelectQueryNode } from '../operation-node/select-query-node.js';
export interface SelectQueryBuilderExpression<O> extends AliasableExpression<O> {
    get isSelectQueryBuilder(): true;
    /**
     * Creates the OperationNode that describes how to compile this expression into SQL.
     *
     * If you are creating a custom expression, it's often easiest to use the {@link sql}
     * template tag to build the node:
     *
     * ```ts
     * class SomeExpression<T> implements Expression<T> {
     *   toOperationNode(): OperationNode {
     *     return sql`some sql here`.toOperationNode()
     *   }
     * }
     * ```
     */
    toOperationNode(): SelectQueryNode;
}
