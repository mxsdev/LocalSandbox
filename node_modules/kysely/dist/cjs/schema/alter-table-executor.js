"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableExecutor = void 0;
const object_utils_js_1 = require("../util/object-utils.js");
const prevent_await_js_1 = require("../util/prevent-await.js");
class AlterTableExecutor {
    #props;
    constructor(props) {
        this.#props = (0, object_utils_js_1.freeze)(props);
    }
    toOperationNode() {
        return this.#props.executor.transformQuery(this.#props.node, this.#props.queryId);
    }
    compile() {
        return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
    }
    async execute() {
        await this.#props.executor.executeQuery(this.compile(), this.#props.queryId);
    }
}
exports.AlterTableExecutor = AlterTableExecutor;
(0, prevent_await_js_1.preventAwait)(AlterTableExecutor, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");
