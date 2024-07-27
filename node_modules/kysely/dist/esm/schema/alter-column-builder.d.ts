import { AlterColumnNode } from '../operation-node/alter-column-node.js';
import { OperationNodeSource } from '../operation-node/operation-node-source.js';
import { DataTypeExpression } from '../parser/data-type-parser.js';
import { DefaultValueExpression } from '../parser/default-value-parser.js';
export declare class AlterColumnBuilder {
    #private;
    constructor(column: string);
    setDataType(dataType: DataTypeExpression): AlteredColumnBuilder;
    setDefault(value: DefaultValueExpression): AlteredColumnBuilder;
    dropDefault(): AlteredColumnBuilder;
    setNotNull(): AlteredColumnBuilder;
    dropNotNull(): AlteredColumnBuilder;
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call<T>(func: (qb: this) => T): T;
}
/**
 * Allows us to force consumers to do exactly one alteration to a column.
 *
 * Basically, deny the following:
 *
 * ```ts
 * db.schema.alterTable('person').alterColumn('age', (ac) => ac)
 * ```
 *
 * ```ts
 * db.schema.alterTable('person').alterColumn('age', (ac) => ac.dropNotNull().setNotNull())
 * ```
 *
 * Which would now throw a compilation error, instead of a runtime error.
 */
export declare class AlteredColumnBuilder implements OperationNodeSource {
    #private;
    constructor(alterColumnNode: AlterColumnNode);
    toOperationNode(): AlterColumnNode;
}
export type AlterColumnBuilderCallback = (builder: AlterColumnBuilder) => AlteredColumnBuilder;
