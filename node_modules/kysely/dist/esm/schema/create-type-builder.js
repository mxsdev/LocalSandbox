/// <reference types="./create-type-builder.d.ts" />
import { preventAwait } from '../util/prevent-await.js';
import { freeze } from '../util/object-utils.js';
import { CreateTypeNode } from '../operation-node/create-type-node.js';
export class CreateTypeBuilder {
    #props;
    constructor(props) {
        this.#props = freeze(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    /**
     * Creates an anum type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
     * ```
     */
    asEnum(values) {
        return new CreateTypeBuilder({
            ...this.#props,
            node: CreateTypeNode.cloneWithEnum(this.#props.node, values),
        });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
        return func(this);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
preventAwait(CreateTypeBuilder, "don't await CreateTypeBuilder instances directly. To execute the query you need to call `execute`");
