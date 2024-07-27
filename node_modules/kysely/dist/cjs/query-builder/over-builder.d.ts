import { DynamicReferenceBuilder } from '../dynamic/dynamic-reference-builder.js';
import { OperationNodeSource } from '../operation-node/operation-node-source.js';
import { OverNode } from '../operation-node/over-node.js';
import { OrderByDirectionExpression } from '../parser/order-by-parser.js';
import { PartitionByExpression } from '../parser/partition-by-parser.js';
import { StringReference } from '../parser/reference-parser.js';
export declare class OverBuilder<DB, TB extends keyof DB> implements OperationNodeSource {
    #private;
    constructor(props: OverBuilderProps);
    /**
     * Adds an order by clause item inside the over function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
     * from "person"
     * ```
     */
    orderBy<OE extends StringReference<DB, TB> | DynamicReferenceBuilder<any>>(orderBy: OE, direction?: OrderByDirectionExpression): OverBuilder<DB, TB>;
    /**
     * Adds partition by clause item/s inside the over function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     (eb) => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy(['last_name', 'first_name'])
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name", "first_name") as "average_age"
     * from "person"
     * ```
     */
    partitionBy(partitionBy: ReadonlyArray<PartitionByExpression<DB, TB>>): OverBuilder<DB, TB>;
    partitionBy<PE extends PartitionByExpression<DB, TB>>(partitionBy: PE): OverBuilder<DB, TB>;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
    toOperationNode(): OverNode;
}
export interface OverBuilderProps {
    readonly overNode: OverNode;
}
