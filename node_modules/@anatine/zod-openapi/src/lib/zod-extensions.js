"use strict";
/*
This code is heavily inspired by https://github.com/asteasolutions/zod-to-openapi/blob/master/src/zod-extensions.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendZodWithOpenApi = void 0;
const zod_openapi_1 = require("./zod-openapi");
function extendZodWithOpenApi(zod, forceOverride = false) {
    if (!forceOverride && typeof zod.ZodSchema.prototype.openapi !== 'undefined') {
        // This zod instance is already extended with the required methods,
        // doing it again will just result in multiple wrapper methods for
        // `optional` and `nullable`
        return;
    }
    zod.ZodSchema.prototype.openapi = function (metadata) {
        return (0, zod_openapi_1.extendApi)(this, metadata);
    };
}
exports.extendZodWithOpenApi = extendZodWithOpenApi;
//# sourceMappingURL=zod-extensions.js.map