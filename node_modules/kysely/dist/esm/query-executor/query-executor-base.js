/// <reference types="./query-executor-base.d.ts" />
import { freeze } from '../util/object-utils.js';
import { Deferred } from '../util/deferred.js';
import { logOnce } from '../util/log-once.js';
const NO_PLUGINS = freeze([]);
export class QueryExecutorBase {
    #plugins;
    constructor(plugins = NO_PLUGINS) {
        this.#plugins = plugins;
    }
    get plugins() {
        return this.#plugins;
    }
    transformQuery(node, queryId) {
        for (const plugin of this.#plugins) {
            const transformedNode = plugin.transformQuery({ node, queryId });
            // We need to do a runtime check here. There is no good way
            // to write types that enforce this constraint.
            if (transformedNode.kind === node.kind) {
                node = transformedNode;
            }
            else {
                throw new Error([
                    `KyselyPlugin.transformQuery must return a node`,
                    `of the same kind that was given to it.`,
                    `The plugin was given a ${node.kind}`,
                    `but it returned a ${transformedNode.kind}`,
                ].join(' '));
            }
        }
        return node;
    }
    async executeQuery(compiledQuery, queryId) {
        return await this.provideConnection(async (connection) => {
            const result = await connection.executeQuery(compiledQuery);
            const transformedResult = await this.#transformResult(result, queryId);
            // TODO: remove.
            warnOfOutdatedDriverOrPlugins(result, transformedResult);
            return transformedResult;
        });
    }
    async *stream(compiledQuery, chunkSize, queryId) {
        const connectionDefer = new Deferred();
        const connectionReleaseDefer = new Deferred();
        this.provideConnection(async (connection) => {
            connectionDefer.resolve(connection);
            // Lets wait until we don't need connection before returning here (returning releases connection)
            return await connectionReleaseDefer.promise;
        }).catch((ex) => connectionDefer.reject(ex));
        const connection = await connectionDefer.promise;
        try {
            for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
                yield await this.#transformResult(result, queryId);
            }
        }
        finally {
            connectionReleaseDefer.resolve();
        }
    }
    async #transformResult(result, queryId) {
        for (const plugin of this.#plugins) {
            result = await plugin.transformResult({ result, queryId });
        }
        return result;
    }
}
// TODO: remove.
function warnOfOutdatedDriverOrPlugins(result, transformedResult) {
    const { numAffectedRows } = result;
    if ((numAffectedRows === undefined &&
        result.numUpdatedOrDeletedRows === undefined) ||
        (numAffectedRows !== undefined &&
            transformedResult.numAffectedRows !== undefined)) {
        return;
    }
    logOnce('kysely:warning: outdated driver/plugin detected! QueryResult.numUpdatedOrDeletedRows is deprecated and will be removed in a future release.');
}
