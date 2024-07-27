"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preventAwait = preventAwait;
function preventAwait(clazz, message) {
    Object.defineProperties(clazz.prototype, {
        then: {
            enumerable: false,
            value: () => {
                throw new Error(message);
            },
        },
    });
}
