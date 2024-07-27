import 'std-env';

var _a, _b;
const isNode = typeof process < "u" && typeof process.stdout < "u" && !((_a = process.versions) == null ? void 0 : _a.deno) && !globalThis.window;
const isDeno = typeof process < "u" && typeof process.stdout < "u" && ((_b = process.versions) == null ? void 0 : _b.deno) !== void 0;
const isWindows = (isNode || isDeno) && process.platform === "win32";

export { isDeno as a, isWindows as b, isNode as i };
