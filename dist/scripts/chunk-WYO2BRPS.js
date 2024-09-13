import { createRequire } from 'module';const require = createRequire(import.meta.url); const __filename = import.meta.filename; const __dirname = import.meta.dirname;
var Gr=Object.create;var Wn=Object.defineProperty;var Or=Object.getOwnPropertyDescriptor;var Hr=Object.getOwnPropertyNames;var Jr=Object.getPrototypeOf,Yr=Object.prototype.hasOwnProperty;var rn=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(n,r)=>(typeof require<"u"?require:n)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var O=(t,n)=>()=>(n||t((n={exports:{}}).exports,n),n.exports);var jr=(t,n,r,A)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of Hr(n))!Yr.call(t,o)&&o!==r&&Wn(t,o,{get:()=>n[o],enumerable:!(A=Or(n,o))||A.enumerable});return t};var Vr=(t,n,r)=>(r=t!=null?Gr(Jr(t)):{},jr(n||!t||!t.__esModule?Wn(r,"default",{value:t,enumerable:!0}):r,t));var lr=O((ql,cr)=>{"use strict";cr.exports=`"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// <define:process>
var init_define_process = __esm({
  "<define:process>"() {
  }
});

// ../format/dist/index.js
var require_dist = __commonJS({
  "../format/dist/index.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      createFormat: () => createFormat2
    });
    module2.exports = __toCommonJS2(src_exports);
    var ReflectGetOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;
    function GetOwnGetter(target, key) {
      const descriptor = ReflectGetOwnPropertyDescriptor(target, key);
      return descriptor ? descriptor.get : void 0;
    }
    __name(GetOwnGetter, "GetOwnGetter");
    var ReflectGetPrototypeOf = Reflect.getPrototypeOf;
    var TypedArray = ReflectGetPrototypeOf(Uint8Array);
    var ArrayPrototypeFilter = Array.prototype.filter;
    var ArrayPrototypePush = Array.prototype.push;
    var DatePrototypeGetTime = Date.prototype.getTime;
    var DatePrototypeToISOString = Date.prototype.toISOString;
    var ObjectGetOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
    var ObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
    var ObjectGetOwnPropertySymbols = Object.getOwnPropertySymbols;
    var ObjectKeys = Object.keys;
    var ObjectPrototypePropertyIsEnumerable = Object.prototype.propertyIsEnumerable;
    var ObjectPrototypeToString = Object.prototype.toString;
    var MapPrototypeGetSize = GetOwnGetter(Map.prototype, "size");
    var SetPrototypeGetSize = GetOwnGetter(Set.prototype, "size");
    var StringPrototypeIncludes = String.prototype.includes;
    var SymbolIterator = Symbol.iterator;
    var SymbolPrototypeToString = Symbol.prototype.toString;
    var TypedArrayPrototypeGetLength = GetOwnGetter(
      TypedArray.prototype,
      "length"
    );
    var typedArrayStrings = /* @__PURE__ */ new Set([
      "[object BigInt64Array]",
      "[object BigUint64Array]",
      "[object Float32Array]",
      "[object Float64Array]",
      "[object Int8Array]",
      "[object Int16Array]",
      "[object Int32Array]",
      "[object Uint8Array]",
      "[object Uint8ClampedArray]",
      "[object Uint16Array]",
      "[object Uint32Array]"
    ]);
    function getOwnNonIndexProperties(object, filter) {
      const indexes = Array.isArray(object) || isTypedArray(object) ? new Set([...object.keys()].map((v) => v.toString())) : void 0;
      return Object.entries(ObjectGetOwnPropertyDescriptors(object)).filter(([key, desc]) => {
        if (indexes && indexes.has(key)) {
          return false;
        }
        if (filter === 1 && !desc.enumerable) {
          return false;
        }
        return true;
      }).map(([key]) => key);
    }
    __name(getOwnNonIndexProperties, "getOwnNonIndexProperties");
    var isTypedArray = /* @__PURE__ */ __name((value) => kind(value, "object") && typedArrayStrings.has(ObjectPrototypeToString.call(value)), "isTypedArray");
    function kind(value, type) {
      return typeof value === type;
    }
    __name(kind, "kind");
    var getConstructorName = /* @__PURE__ */ __name((object) => {
      var _a;
      return (_a = object.constructor) == null ? void 0 : _a.name;
    }, "getConstructorName");
    var getPrefix = /* @__PURE__ */ __name((constructor = "", size = "") => \`\${constructor}\${size} \`, "getPrefix");
    function createFormat2(opts = {}) {
      if (opts.customInspectSymbol === void 0) {
        opts.customInspectSymbol = Symbol.for("edge-runtime.inspect.custom");
      }
      if (opts.formatError === void 0) {
        opts.formatError = (error2) => \`[\${Error.prototype.toString.call(error2)}]\`;
      }
      const { formatError, customInspectSymbol } = opts;
      function format2(...args) {
        const [firstArg] = args;
        if (!kind(firstArg, "string")) {
          if (hasCustomSymbol(firstArg, customInspectSymbol)) {
            return format2(firstArg[customInspectSymbol]({ format: format2 }));
          } else {
            return args.map((item) => inspect(item, { customInspectSymbol })).join(" ");
          }
        }
        let index = 1;
        let str = String(firstArg).replace(/%[sjdOoif%]/g, (token) => {
          if (token === "%%")
            return "%";
          if (index >= args.length)
            return token;
          switch (token) {
            case "%s": {
              const arg = args[index++];
              if (hasCustomSymbol(arg, customInspectSymbol)) {
                return format2(arg[customInspectSymbol]({ format: format2 }));
              } else if (isDate(arg) || isError(arg) || kind(arg, "bigint")) {
                return format2(arg);
              } else {
                return String(arg);
              }
            }
            case "%j":
              return safeStringify(args[index++]);
            case "%d": {
              const arg = args[index++];
              if (kind(arg, "bigint")) {
                return format2(arg);
              } else {
                return String(Number(arg));
              }
            }
            case "%O":
              return inspect(args[index++], { customInspectSymbol });
            case "%o":
              return inspect(args[index++], {
                customInspectSymbol,
                showHidden: true,
                depth: 4
              });
            case "%i": {
              const arg = args[index++];
              if (kind(arg, "bigint")) {
                return format2(arg);
              } else {
                return String(parseInt(arg, 10));
              }
            }
            case "%f":
              return String(parseFloat(args[index++]));
            default:
              return token;
          }
        });
        for (let arg = args[index]; index < args.length; arg = args[++index]) {
          if (arg === null || !kind(arg, "object")) {
            str += " " + arg;
          } else {
            str += " " + inspect(arg);
          }
        }
        return str;
      }
      __name(format2, "format");
      function formatValue(ctx, value, recurseTimes) {
        if (hasCustomSymbol(value, customInspectSymbol)) {
          return format2(value[customInspectSymbol]({ format: format2 }));
        }
        const formattedPrimitive = formatPrimitive(value);
        if (formattedPrimitive !== void 0) {
          return formattedPrimitive;
        }
        if (ctx.seen.includes(value)) {
          let index = 1;
          if (ctx.circular === void 0) {
            ctx.circular = /* @__PURE__ */ new Map();
            ctx.circular.set(value, index);
          } else {
            index = ctx.circular.get(value);
            if (index === void 0) {
              index = ctx.circular.size + 1;
              ctx.circular.set(value, index);
            }
          }
          return \`[Circular *\${index}]\`;
        }
        return formatRaw(ctx, value, recurseTimes);
      }
      __name(formatValue, "formatValue");
      function formatRaw(ctx, value, recurseTimes) {
        let keys = [];
        const constructor = getConstructorName(value);
        let base = "";
        let formatter = /* @__PURE__ */ __name(() => [], "formatter");
        let braces = ["", ""];
        let noIterator = true;
        const filter = ctx.showHidden ? 0 : 1;
        if (SymbolIterator in value) {
          noIterator = false;
          if (Array.isArray(value)) {
            const prefix = constructor !== "Array" ? getPrefix(constructor, \`(\${value.length})\`) : "";
            keys = getOwnNonIndexProperties(value, filter);
            braces = [\`\${prefix}[\`, "]"];
            if (value.length === 0 && keys.length === 0) {
              return \`\${braces[0]}]\`;
            }
            formatter = formatArray;
          } else if (isSet(value)) {
            const size = SetPrototypeGetSize.call(value);
            const prefix = getPrefix(constructor, \`(\${size})\`);
            keys = getKeys(value, ctx.showHidden);
            formatter = formatSet;
            if (size === 0 && keys.length === 0) {
              return \`\${prefix}{}\`;
            }
            braces = [\`\${prefix}{\`, "}"];
          } else if (isMap(value)) {
            const size = MapPrototypeGetSize.call(value);
            const prefix = getPrefix(constructor, \`(\${size})\`);
            keys = getKeys(value, ctx.showHidden);
            formatter = formatMap;
            if (size === 0 && keys.length === 0) {
              return \`\${prefix}{}\`;
            }
            braces = [\`\${prefix}{\`, "}"];
          } else if (isTypedArray(value)) {
            keys = getOwnNonIndexProperties(value, filter);
            const size = TypedArrayPrototypeGetLength.call(value);
            const prefix = getPrefix(constructor, \`(\${size})\`);
            braces = [\`\${prefix}[\`, "]"];
            if (value.length === 0 && keys.length === 0)
              return \`\${braces[0]}]\`;
            formatter = formatTypedArray.bind(null, size);
          } else {
            noIterator = true;
          }
        }
        if (noIterator) {
          keys = getKeys(value, ctx.showHidden);
          braces = ["{", "}"];
          if (constructor === void 0) {
            if (keys.length === 0) {
              return \`[Object: null prototype] {}\`;
            }
          } else if (constructor === "Object") {
            if (keys.length === 0) {
              return \`{}\`;
            }
          } else if (kind(value, "function")) {
            base = \`[Function\${value.name ? ": " + value.name : ""}]\`;
            if (keys.length === 0) {
              return base;
            }
          } else if (isRegExp(value)) {
            base = RegExp.prototype.toString.call(value);
            if (keys.length === 0) {
              return base;
            }
            base = " " + base;
          } else if (isDate(value)) {
            base = Number.isNaN(DatePrototypeGetTime.call(value)) ? Date.prototype.toString.call(value) : DatePrototypeToISOString.call(value);
            if (keys.length === 0) {
              return base;
            }
            base = " " + base;
          } else if (isError(value)) {
            base = formatError(value);
            if (keys.length === 0) {
              return base;
            }
            base = " " + base;
          } else if (hasCustomSymbol(value, ctx.customInspectSymbol)) {
            base = format2(value[ctx.customInspectSymbol]({ format: format2 }));
            if (keys.length === 0) {
              return base;
            }
            base = " " + base;
          } else {
            braces[0] = \`\${getPrefix(constructor)}{\`;
          }
        }
        if (recurseTimes && recurseTimes < 0) {
          return isRegExp(value) ? RegExp.prototype.toString.call(value) : "[Object]";
        }
        ctx.seen.push(value);
        const visibleKeys = new Set(keys);
        const output = formatter(ctx, value, recurseTimes, visibleKeys, keys);
        for (let i = 0; i < keys.length; i++) {
          output.push(
            formatProperty(
              ctx,
              value,
              recurseTimes,
              visibleKeys,
              keys[i],
              false
            )
          );
        }
        if (ctx.circular !== void 0) {
          const index = ctx.circular.get(value);
          if (index !== void 0) {
            const reference = \`<ref *\${index}>\`;
            base = base === "" ? reference : \`\${reference} \${base}\`;
          }
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base, braces);
      }
      __name(formatRaw, "formatRaw");
      function inspect(value, opts2) {
        opts2 = Object.assign({ seen: [], depth: 2 }, opts2);
        return formatValue(opts2, value, opts2.depth);
      }
      __name(inspect, "inspect");
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, isArray) {
        let name;
        let str;
        const desc = Object.getOwnPropertyDescriptor(value, key) || {
          value: value[key]
        };
        if (desc.value !== void 0) {
          str = formatValue(ctx, desc.value, recurseTimes);
        } else if (desc.get) {
          str = desc.set ? "[Getter/Setter]" : "[Getter]";
        } else if (desc.set) {
          str = "[Setter]";
        } else {
          str = "undefined";
        }
        if (isArray) {
          return str;
        }
        if (kind(key, "symbol")) {
          name = \`[\${SymbolPrototypeToString.call(key)}]\`;
        } else if (!visibleKeys.has(key)) {
          name = "[" + key + "]";
        } else {
          name = key;
        }
        return \`\${name}: \${str}\`;
      }
      __name(formatProperty, "formatProperty");
      function formatArray(ctx, value, recurseTimes, visibleKeys) {
        const output = [];
        for (let index = 0; index < value.length; ++index) {
          if (Object.prototype.hasOwnProperty.call(value, String(index))) {
            output.push(
              formatProperty(
                ctx,
                value,
                recurseTimes,
                visibleKeys,
                String(index),
                true
              )
            );
          } else {
            output.push("");
          }
        }
        return output;
      }
      __name(formatArray, "formatArray");
      function formatTypedArray(length, ctx, value, recurseTimes) {
        const output = new Array(length);
        for (let i = 0; i < length; ++i) {
          output[i] = value.length > 0 && kind(value[0], "number") ? String(value[i]) : formatBigInt(value[i]);
        }
        if (ctx.showHidden) {
          for (const key of [
            "BYTES_PER_ELEMENT",
            "length",
            "byteLength",
            "byteOffset",
            "buffer"
          ]) {
            const str = formatValue(ctx, value[key], recurseTimes);
            ArrayPrototypePush.call(output, \`[\${String(key)}]: \${str}\`);
          }
        }
        return output;
      }
      __name(formatTypedArray, "formatTypedArray");
      function formatSet(ctx, value, recurseTimes) {
        const output = [];
        for (const v of value) {
          ArrayPrototypePush.call(output, formatValue(ctx, v, recurseTimes));
        }
        return output;
      }
      __name(formatSet, "formatSet");
      function formatMap(ctx, value, recurseTimes) {
        const output = [];
        for (const { 0: k, 1: v } of value) {
          output.push(
            \`\${formatValue(ctx, k, recurseTimes)} => \${formatValue(
              ctx,
              v,
              recurseTimes
            )}\`
          );
        }
        return output;
      }
      __name(formatMap, "formatMap");
      return format2;
    }
    __name(createFormat2, "createFormat");
    var formatBigInt = /* @__PURE__ */ __name((bigint) => \`\${bigint}n\`, "formatBigInt");
    function formatPrimitive(value) {
      if (value === null)
        return "null";
      if (value === void 0)
        return "undefined";
      if (kind(value, "string")) {
        return \`'\${JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\\\'").replace(/\\\\"/g, '"')}'\`;
      }
      if (kind(value, "boolean"))
        return "" + value;
      if (kind(value, "number"))
        return "" + value;
      if (kind(value, "bigint"))
        return formatBigInt(value);
      if (kind(value, "symbol"))
        return value.toString();
    }
    __name(formatPrimitive, "formatPrimitive");
    function hasCustomSymbol(value, customInspectSymbol) {
      return value !== null && kind(value, "object") && customInspectSymbol in value && kind(value[customInspectSymbol], "function");
    }
    __name(hasCustomSymbol, "hasCustomSymbol");
    function isRegExp(value) {
      return kind(value, "object") && Object.prototype.toString.call(value) === "[object RegExp]";
    }
    __name(isRegExp, "isRegExp");
    function isDate(value) {
      return kind(value, "object") && Object.prototype.toString.call(value) === "[object Date]";
    }
    __name(isDate, "isDate");
    function isError(value) {
      return kind(value, "object") && (Object.prototype.toString.call(value) === "[object Error]" || value instanceof Error);
    }
    __name(isError, "isError");
    function isMap(value) {
      return kind(value, "object") && Object.prototype.toString.call(value) === "[object Map]";
    }
    __name(isMap, "isMap");
    function isSet(value) {
      return kind(value, "object") && Object.prototype.toString.call(value) === "[object Set]";
    }
    __name(isSet, "isSet");
    function isBelowBreakLength(output, start, base) {
      const breakLength = 80;
      let totalLength = output.length + start;
      if (totalLength + output.length > breakLength) {
        return false;
      }
      for (let i = 0; i < output.length; i++) {
        totalLength += output[i].length;
        if (totalLength > breakLength) {
          return false;
        }
      }
      return base === "" || !StringPrototypeIncludes.call(base, "\\n");
    }
    __name(isBelowBreakLength, "isBelowBreakLength");
    function reduceToSingleString(output, base, braces) {
      const start = output.length + braces[0].length + base.length + 10;
      if (!isBelowBreakLength(output, start, base)) {
        return (base ? base + " " : "") + braces[0] + "\\n  " + output.join(",\\n  ") + "\\n" + braces[1];
      }
      return ((base ? base + " " : "") + braces[0] + " " + output.join(", ") + " " + braces[1]).trim();
    }
    __name(reduceToSingleString, "reduceToSingleString");
    function safeStringify(input) {
      if (Array.isArray(input)) {
        input = input.map(
          (element) => JSON.parse(JSON.stringify(element, makeCircularReplacer()))
        );
      }
      return JSON.stringify(input, makeCircularReplacer());
    }
    __name(safeStringify, "safeStringify");
    function makeCircularReplacer() {
      const seen = /* @__PURE__ */ new WeakSet();
      return (key, value) => {
        if (value !== null && kind(value, "object")) {
          if (seen.has(value))
            return "[Circular]";
          seen.add(value);
        }
        return value;
      };
    }
    __name(makeCircularReplacer, "makeCircularReplacer");
    function getKeys(value, showHidden = false) {
      let keys;
      const symbols = ObjectGetOwnPropertySymbols(value);
      if (showHidden) {
        keys = ObjectGetOwnPropertyNames(value);
        if (symbols.length !== 0)
          ArrayPrototypePush.apply(keys, symbols);
      } else {
        try {
          keys = ObjectKeys(value);
        } catch (err) {
          keys = ObjectGetOwnPropertyNames(value);
        }
        if (symbols.length !== 0) {
          const filter = /* @__PURE__ */ __name((key) => ObjectPrototypePropertyIsEnumerable.call(value, key), "filter");
          ArrayPrototypePush.apply(keys, ArrayPrototypeFilter.call(symbols, filter));
        }
      }
      return keys;
    }
    __name(getKeys, "getKeys");
  }
});

// src/primitives/console.js
var console_exports = {};
__export(console_exports, {
  console: () => konsole
});
module.exports = __toCommonJS(console_exports);
init_define_process();
var import_format = __toESM(require_dist());
var format = (0, import_format.createFormat)();
var bareError = console.error.bind(console);
var bareLog = console.log.bind(console);
var assert = console.assert.bind(console);
var time = console.time.bind(console);
var timeEnd = console.timeEnd.bind(console);
var timeLog = console.timeLog.bind(console);
var trace = console.trace.bind(console);
var error = /* @__PURE__ */ __name((...args) => bareError(format(...args)), "error");
var log = /* @__PURE__ */ __name((...args) => bareLog(format(...args)), "log");
var konsole = {
  assert: (assertion, ...args) => assert(assertion, format(...args)),
  count: console.count.bind(console),
  debug: log,
  dir: console.dir.bind(console),
  error,
  info: log,
  log,
  time: (...args) => time(format(...args)),
  timeEnd: (...args) => timeEnd(format(...args)),
  timeLog,
  trace,
  warn: error
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  console
});
`});var ur=O((Gl,dr)=>{"use strict";dr.exports=`"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/primitives/timers.js
var timers_exports = {};
__export(timers_exports, {
  setInterval: () => setIntervalProxy,
  setTimeout: () => setTimeoutProxy
});
module.exports = __toCommonJS(timers_exports);
var setTimeoutProxy = new Proxy(setTimeout, {
  apply: (target, thisArg, args) => {
    const timeout = Reflect.apply(target, thisArg, args);
    return timeout[Symbol.toPrimitive]();
  }
});
var setIntervalProxy = new Proxy(setInterval, {
  apply: (target, thisArg, args) => {
    const timeout = Reflect.apply(target, thisArg, args);
    return timeout[Symbol.toPrimitive]();
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setInterval,
  setTimeout
});
`});var pr=O((Ol,gr)=>{"use strict";gr.exports=`"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/primitives/events.js
var events_exports = {};
__export(events_exports, {
  FetchEvent: () => FetchEvent,
  PromiseRejectionEvent: () => PromiseRejectionEvent
});
module.exports = __toCommonJS(events_exports);
var _FetchEvent = class _FetchEvent extends Event {
  constructor(request) {
    super("fetch");
    this.request = request;
    this.response = null;
    this.awaiting = /* @__PURE__ */ new Set();
  }
  respondWith = (response) => {
    this.response = response;
  };
  waitUntil = (promise) => {
    this.awaiting.add(promise);
    promise.finally(() => this.awaiting.delete(promise));
  };
};
__name(_FetchEvent, "FetchEvent");
var FetchEvent = _FetchEvent;
var _PromiseRejectionEvent = class _PromiseRejectionEvent extends Event {
  constructor(type, init) {
    super(type, { cancelable: true });
    this.promise = init.promise;
    this.reason = init.reason;
  }
};
__name(_PromiseRejectionEvent, "PromiseRejectionEvent");
var PromiseRejectionEvent = _PromiseRejectionEvent;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchEvent,
  PromiseRejectionEvent
});
`});var Er=O((Hl,hr)=>{"use strict";hr.exports=`"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/primitives/abort-controller.js
var abort_controller_exports = {};
__export(abort_controller_exports, {
  AbortController: () => AbortController,
  AbortSignal: () => AbortSignal,
  DOMException: () => DOMException
});
module.exports = __toCommonJS(abort_controller_exports);
var kSignal = Symbol("kSignal");
var kAborted = Symbol("kAborted");
var kReason = Symbol("kReason");
var kName = Symbol("kName");
var kOnabort = Symbol("kOnabort");
var _DOMException = class _DOMException extends Error {
  constructor(message, name) {
    super(message);
    this[kName] = name;
  }
  get name() {
    return this[kName];
  }
};
__name(_DOMException, "DOMException");
var DOMException = _DOMException;
function createAbortSignal() {
  const signal = new EventTarget();
  Object.setPrototypeOf(signal, AbortSignal.prototype);
  signal[kAborted] = false;
  signal[kReason] = void 0;
  signal[kOnabort] = void 0;
  return signal;
}
__name(createAbortSignal, "createAbortSignal");
function abortSignalAbort(signal, reason) {
  if (typeof reason === "undefined") {
    reason = new DOMException("This operation was aborted", "AbortError");
  }
  if (signal.aborted) {
    return;
  }
  signal[kReason] = reason;
  signal[kAborted] = true;
  signal.dispatchEvent(new Event("abort"));
}
__name(abortSignalAbort, "abortSignalAbort");
var _AbortController = class _AbortController {
  constructor() {
    this[kSignal] = createAbortSignal();
  }
  get signal() {
    return this[kSignal];
  }
  abort(reason) {
    abortSignalAbort(this.signal, reason);
  }
};
__name(_AbortController, "AbortController");
var AbortController = _AbortController;
var _AbortSignal = class _AbortSignal extends EventTarget {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
  get aborted() {
    return this[kAborted];
  }
  get reason() {
    return this[kReason];
  }
  get onabort() {
    return this[kOnabort];
  }
  set onabort(value) {
    if (this[kOnabort]) {
      this.removeEventListener("abort", this[kOnabort]);
    }
    if (value) {
      this[kOnabort] = value;
      this.addEventListener("abort", this[kOnabort]);
    }
  }
  throwIfAborted() {
    if (this[kAborted]) {
      throw this[kReason];
    }
  }
  static abort(reason) {
    const signal = createAbortSignal();
    abortSignalAbort(signal, reason);
    return signal;
  }
  static timeout(milliseconds) {
    const signal = createAbortSignal();
    setTimeout(() => {
      abortSignalAbort(
        signal,
        new DOMException(
          "The operation was aborted due to timeout",
          "TimeoutError"
        )
      );
    }, milliseconds);
    return signal;
  }
};
__name(_AbortSignal, "AbortSignal");
var AbortSignal = _AbortSignal;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AbortController,
  AbortSignal,
  DOMException
});
`});var Qr=O((Jl,mr)=>{"use strict";mr.exports=`"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// src/primitives/url.js
var url_exports = {};
__export(url_exports, {
  URLPattern: () => me
});
module.exports = __toCommonJS(url_exports);

// ../../node_modules/.pnpm/urlpattern-polyfill@10.0.0/node_modules/urlpattern-polyfill/dist/urlpattern.js
var _a;
var R = (_a = class {
  type = 3;
  name = "";
  prefix = "";
  value = "";
  suffix = "";
  modifier = 3;
  constructor(t, r, n, o, c, l) {
    this.type = t, this.name = r, this.prefix = n, this.value = o, this.suffix = c, this.modifier = l;
  }
  hasCustomName() {
    return this.name !== "" && typeof this.name != "number";
  }
}, __name(_a, "R"), _a);
var be = /[$_\\p{ID_Start}]/u;
var Pe = /[$_\\u200C\\u200D\\p{ID_Continue}]/u;
var M = ".*";
function Re(e, t) {
  return (t ? /^[\\x00-\\xFF]*$/ : /^[\\x00-\\x7F]*$/).test(e);
}
__name(Re, "Re");
function v(e, t = false) {
  let r = [], n = 0;
  for (; n < e.length; ) {
    let o = e[n], c = /* @__PURE__ */ __name(function(l) {
      if (!t)
        throw new TypeError(l);
      r.push({ type: "INVALID_CHAR", index: n, value: e[n++] });
    }, "c");
    if (o === "*") {
      r.push({ type: "ASTERISK", index: n, value: e[n++] });
      continue;
    }
    if (o === "+" || o === "?") {
      r.push({ type: "OTHER_MODIFIER", index: n, value: e[n++] });
      continue;
    }
    if (o === "\\\\") {
      r.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] });
      continue;
    }
    if (o === "{") {
      r.push({ type: "OPEN", index: n, value: e[n++] });
      continue;
    }
    if (o === "}") {
      r.push({ type: "CLOSE", index: n, value: e[n++] });
      continue;
    }
    if (o === ":") {
      let l = "", s = n + 1;
      for (; s < e.length; ) {
        let i = e.substr(s, 1);
        if (s === n + 1 && be.test(i) || s !== n + 1 && Pe.test(i)) {
          l += e[s++];
          continue;
        }
        break;
      }
      if (!l) {
        c(\`Missing parameter name at \${n}\`);
        continue;
      }
      r.push({ type: "NAME", index: n, value: l }), n = s;
      continue;
    }
    if (o === "(") {
      let l = 1, s = "", i = n + 1, a = false;
      if (e[i] === "?") {
        c(\`Pattern cannot start with "?" at \${i}\`);
        continue;
      }
      for (; i < e.length; ) {
        if (!Re(e[i], false)) {
          c(\`Invalid character '\${e[i]}' at \${i}.\`), a = true;
          break;
        }
        if (e[i] === "\\\\") {
          s += e[i++] + e[i++];
          continue;
        }
        if (e[i] === ")") {
          if (l--, l === 0) {
            i++;
            break;
          }
        } else if (e[i] === "(" && (l++, e[i + 1] !== "?")) {
          c(\`Capturing groups are not allowed at \${i}\`), a = true;
          break;
        }
        s += e[i++];
      }
      if (a)
        continue;
      if (l) {
        c(\`Unbalanced pattern at \${n}\`);
        continue;
      }
      if (!s) {
        c(\`Missing pattern at \${n}\`);
        continue;
      }
      r.push({ type: "REGEX", index: n, value: s }), n = i;
      continue;
    }
    r.push({ type: "CHAR", index: n, value: e[n++] });
  }
  return r.push({ type: "END", index: n, value: "" }), r;
}
__name(v, "v");
function D(e, t = {}) {
  let r = v(e);
  t.delimiter ??= "/#?", t.prefixes ??= "./";
  let n = \`[^\${S(t.delimiter)}]+?\`, o = [], c = 0, l = 0, s = "", i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ __name((h) => {
    if (l < r.length && r[l].type === h)
      return r[l++].value;
  }, "a"), f = /* @__PURE__ */ __name(() => a("OTHER_MODIFIER") ?? a("ASTERISK"), "f"), d = /* @__PURE__ */ __name((h) => {
    let u = a(h);
    if (u !== void 0)
      return u;
    let { type: p, index: A } = r[l];
    throw new TypeError(\`Unexpected \${p} at \${A}, expected \${h}\`);
  }, "d"), T = /* @__PURE__ */ __name(() => {
    let h = "", u;
    for (; u = a("CHAR") ?? a("ESCAPED_CHAR"); )
      h += u;
    return h;
  }, "T"), Se = /* @__PURE__ */ __name((h) => h, "Se"), L = t.encodePart || Se, I = "", U = /* @__PURE__ */ __name((h) => {
    I += h;
  }, "U"), $ = /* @__PURE__ */ __name(() => {
    I.length && (o.push(new R(3, "", "", L(I), "", 3)), I = "");
  }, "$"), V = /* @__PURE__ */ __name((h, u, p, A, Y) => {
    let g = 3;
    switch (Y) {
      case "?":
        g = 1;
        break;
      case "*":
        g = 0;
        break;
      case "+":
        g = 2;
        break;
    }
    if (!u && !p && g === 3) {
      U(h);
      return;
    }
    if ($(), !u && !p) {
      if (!h)
        return;
      o.push(new R(3, "", "", L(h), "", g));
      return;
    }
    let m;
    p ? p === "*" ? m = M : m = p : m = n;
    let O = 2;
    m === n ? (O = 1, m = "") : m === M && (O = 0, m = "");
    let P;
    if (u ? P = u : p && (P = c++), i.has(P))
      throw new TypeError(\`Duplicate name '\${P}'.\`);
    i.add(P), o.push(new R(O, P, L(h), m, L(A), g));
  }, "V");
  for (; l < r.length; ) {
    let h = a("CHAR"), u = a("NAME"), p = a("REGEX");
    if (!u && !p && (p = a("ASTERISK")), u || p) {
      let g = h ?? "";
      t.prefixes.indexOf(g) === -1 && (U(g), g = ""), $();
      let m = f();
      V(g, u, p, "", m);
      continue;
    }
    let A = h ?? a("ESCAPED_CHAR");
    if (A) {
      U(A);
      continue;
    }
    if (a("OPEN")) {
      let g = T(), m = a("NAME"), O = a("REGEX");
      !m && !O && (O = a("ASTERISK"));
      let P = T();
      d("CLOSE");
      let xe = f();
      V(g, m, O, P, xe);
      continue;
    }
    $(), d("END");
  }
  return o;
}
__name(D, "D");
function S(e) {
  return e.replace(/([.+*?^\${}()[\\]|/\\\\])/g, "\\\\$1");
}
__name(S, "S");
function X(e) {
  return e && e.ignoreCase ? "ui" : "u";
}
__name(X, "X");
function Z(e, t, r) {
  return F(D(e, r), t, r);
}
__name(Z, "Z");
function k(e) {
  switch (e) {
    case 0:
      return "*";
    case 1:
      return "?";
    case 2:
      return "+";
    case 3:
      return "";
  }
}
__name(k, "k");
function F(e, t, r = {}) {
  r.delimiter ??= "/#?", r.prefixes ??= "./", r.sensitive ??= false, r.strict ??= false, r.end ??= true, r.start ??= true, r.endsWith = "";
  let n = r.start ? "^" : "";
  for (let s of e) {
    if (s.type === 3) {
      s.modifier === 3 ? n += S(s.value) : n += \`(?:\${S(s.value)})\${k(s.modifier)}\`;
      continue;
    }
    t && t.push(s.name);
    let i = \`[^\${S(r.delimiter)}]+?\`, a = s.value;
    if (s.type === 1 ? a = i : s.type === 0 && (a = M), !s.prefix.length && !s.suffix.length) {
      s.modifier === 3 || s.modifier === 1 ? n += \`(\${a})\${k(s.modifier)}\` : n += \`((?:\${a})\${k(s.modifier)})\`;
      continue;
    }
    if (s.modifier === 3 || s.modifier === 1) {
      n += \`(?:\${S(s.prefix)}(\${a})\${S(s.suffix)})\`, n += k(s.modifier);
      continue;
    }
    n += \`(?:\${S(s.prefix)}\`, n += \`((?:\${a})(?:\`, n += S(s.suffix), n += S(s.prefix), n += \`(?:\${a}))*)\${S(s.suffix)})\`, s.modifier === 0 && (n += "?");
  }
  let o = \`[\${S(r.endsWith)}]|$\`, c = \`[\${S(r.delimiter)}]\`;
  if (r.end)
    return r.strict || (n += \`\${c}?\`), r.endsWith.length ? n += \`(?=\${o})\` : n += "$", new RegExp(n, X(r));
  r.strict || (n += \`(?:\${c}(?=\${o}))?\`);
  let l = false;
  if (e.length) {
    let s = e[e.length - 1];
    s.type === 3 && s.modifier === 3 && (l = r.delimiter.indexOf(s) > -1);
  }
  return l || (n += \`(?=\${c}|\${o})\`), new RegExp(n, X(r));
}
__name(F, "F");
var x = { delimiter: "", prefixes: "", sensitive: true, strict: true };
var B = { delimiter: ".", prefixes: "", sensitive: true, strict: true };
var q = { delimiter: "/", prefixes: "/", sensitive: true, strict: true };
function J(e, t) {
  return e.length ? e[0] === "/" ? true : !t || e.length < 2 ? false : (e[0] == "\\\\" || e[0] == "{") && e[1] == "/" : false;
}
__name(J, "J");
function Q(e, t) {
  return e.startsWith(t) ? e.substring(t.length, e.length) : e;
}
__name(Q, "Q");
function Ee(e, t) {
  return e.endsWith(t) ? e.substr(0, e.length - t.length) : e;
}
__name(Ee, "Ee");
function W(e) {
  return !e || e.length < 2 ? false : e[0] === "[" || (e[0] === "\\\\" || e[0] === "{") && e[1] === "[";
}
__name(W, "W");
var ee = ["ftp", "file", "http", "https", "ws", "wss"];
function N(e) {
  if (!e)
    return true;
  for (let t of ee)
    if (e.test(t))
      return true;
  return false;
}
__name(N, "N");
function te(e, t) {
  if (e = Q(e, "#"), t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.hash = e, r.hash ? r.hash.substring(1, r.hash.length) : "";
}
__name(te, "te");
function re(e, t) {
  if (e = Q(e, "?"), t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.search = e, r.search ? r.search.substring(1, r.search.length) : "";
}
__name(re, "re");
function ne(e, t) {
  return t || e === "" ? e : W(e) ? j(e) : z(e);
}
__name(ne, "ne");
function se(e, t) {
  if (t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.password = e, r.password;
}
__name(se, "se");
function ie(e, t) {
  if (t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.username = e, r.username;
}
__name(ie, "ie");
function ae(e, t, r) {
  if (r || e === "")
    return e;
  if (t && !ee.includes(t))
    return new URL(\`\${t}:\${e}\`).pathname;
  let n = e[0] == "/";
  return e = new URL(n ? e : "/-" + e, "https://example.com").pathname, n || (e = e.substring(2, e.length)), e;
}
__name(ae, "ae");
function oe(e, t, r) {
  return _(t) === e && (e = ""), r || e === "" ? e : K(e);
}
__name(oe, "oe");
function ce(e, t) {
  return e = Ee(e, ":"), t || e === "" ? e : y(e);
}
__name(ce, "ce");
function _(e) {
  switch (e) {
    case "ws":
    case "http":
      return "80";
    case "wws":
    case "https":
      return "443";
    case "ftp":
      return "21";
    default:
      return "";
  }
}
__name(_, "_");
function y(e) {
  if (e === "")
    return e;
  if (/^[-+.A-Za-z0-9]*$/.test(e))
    return e.toLowerCase();
  throw new TypeError(\`Invalid protocol '\${e}'.\`);
}
__name(y, "y");
function le(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.username = e, t.username;
}
__name(le, "le");
function fe(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.password = e, t.password;
}
__name(fe, "fe");
function z(e) {
  if (e === "")
    return e;
  if (/[\\t\\n\\r #%/:<>?@[\\]^\\\\|]/g.test(e))
    throw new TypeError(\`Invalid hostname '\${e}'\`);
  let t = new URL("https://example.com");
  return t.hostname = e, t.hostname;
}
__name(z, "z");
function j(e) {
  if (e === "")
    return e;
  if (/[^0-9a-fA-F[\\]:]/g.test(e))
    throw new TypeError(\`Invalid IPv6 hostname '\${e}'\`);
  return e.toLowerCase();
}
__name(j, "j");
function K(e) {
  if (e === "" || /^[0-9]*$/.test(e) && parseInt(e) <= 65535)
    return e;
  throw new TypeError(\`Invalid port '\${e}'.\`);
}
__name(K, "K");
function he(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.pathname = e[0] !== "/" ? "/-" + e : e, e[0] !== "/" ? t.pathname.substring(2, t.pathname.length) : t.pathname;
}
__name(he, "he");
function ue(e) {
  return e === "" ? e : new URL(\`data:\${e}\`).pathname;
}
__name(ue, "ue");
function de(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.search = e, t.search.substring(1, t.search.length);
}
__name(de, "de");
function pe(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.hash = e, t.hash.substring(1, t.hash.length);
}
__name(pe, "pe");
var _i, _n, _t, _e, _s, _l, _o, _d, _p, _g, _r, r_fn, _R, R_fn, _b, b_fn, _u, u_fn, _m, m_fn, _a2, a_fn, _P, P_fn, _E, E_fn, _S, S_fn, _O, O_fn, _k, k_fn, _x, x_fn, _h, h_fn, _f, f_fn, _T, T_fn, _A, A_fn, _y, y_fn, _w, w_fn, _c, c_fn, _C, C_fn, _a3;
var H = (_a3 = class {
  constructor(t) {
    __privateAdd(this, _r);
    __privateAdd(this, _R);
    __privateAdd(this, _b);
    __privateAdd(this, _u);
    __privateAdd(this, _m);
    __privateAdd(this, _a2);
    __privateAdd(this, _P);
    __privateAdd(this, _E);
    __privateAdd(this, _S);
    __privateAdd(this, _O);
    __privateAdd(this, _k);
    __privateAdd(this, _x);
    __privateAdd(this, _h);
    __privateAdd(this, _f);
    __privateAdd(this, _T);
    __privateAdd(this, _A);
    __privateAdd(this, _y);
    __privateAdd(this, _w);
    __privateAdd(this, _c);
    __privateAdd(this, _C);
    __privateAdd(this, _i, void 0);
    __privateAdd(this, _n, []);
    __privateAdd(this, _t, {});
    __privateAdd(this, _e, 0);
    __privateAdd(this, _s, 1);
    __privateAdd(this, _l, 0);
    __privateAdd(this, _o, 0);
    __privateAdd(this, _d, 0);
    __privateAdd(this, _p, 0);
    __privateAdd(this, _g, false);
    __privateSet(this, _i, t);
  }
  get result() {
    return __privateGet(this, _t);
  }
  parse() {
    for (__privateSet(this, _n, v(__privateGet(this, _i), true)); __privateGet(this, _e) < __privateGet(this, _n).length; __privateSet(this, _e, __privateGet(this, _e) + __privateGet(this, _s))) {
      if (__privateSet(this, _s, 1), __privateGet(this, _n)[__privateGet(this, _e)].type === "END") {
        if (__privateGet(this, _o) === 0) {
          __privateMethod(this, _b, b_fn).call(this), __privateMethod(this, _f, f_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 9, 1) : __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _r, r_fn).call(this, 7, 0);
          continue;
        } else if (__privateGet(this, _o) === 2) {
          __privateMethod(this, _u, u_fn).call(this, 5);
          continue;
        }
        __privateMethod(this, _r, r_fn).call(this, 10, 0);
        break;
      }
      if (__privateGet(this, _d) > 0)
        if (__privateMethod(this, _A, A_fn).call(this))
          __privateSet(this, _d, __privateGet(this, _d) - 1);
        else
          continue;
      if (__privateMethod(this, _T, T_fn).call(this)) {
        __privateSet(this, _d, __privateGet(this, _d) + 1);
        continue;
      }
      switch (__privateGet(this, _o)) {
        case 0:
          __privateMethod(this, _P, P_fn).call(this) && __privateMethod(this, _u, u_fn).call(this, 1);
          break;
        case 1:
          if (__privateMethod(this, _P, P_fn).call(this)) {
            __privateMethod(this, _C, C_fn).call(this);
            let t = 7, r = 1;
            __privateMethod(this, _E, E_fn).call(this) ? (t = 2, r = 3) : __privateGet(this, _g) && (t = 2), __privateMethod(this, _r, r_fn).call(this, t, r);
          }
          break;
        case 2:
          __privateMethod(this, _S, S_fn).call(this) ? __privateMethod(this, _u, u_fn).call(this, 3) : (__privateMethod(this, _x, x_fn).call(this) || __privateMethod(this, _h, h_fn).call(this) || __privateMethod(this, _f, f_fn).call(this)) && __privateMethod(this, _u, u_fn).call(this, 5);
          break;
        case 3:
          __privateMethod(this, _O, O_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 4, 1) : __privateMethod(this, _S, S_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 5, 1);
          break;
        case 4:
          __privateMethod(this, _S, S_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 5, 1);
          break;
        case 5:
          __privateMethod(this, _y, y_fn).call(this) ? __privateSet(this, _p, __privateGet(this, _p) + 1) : __privateMethod(this, _w, w_fn).call(this) && __privateSet(this, _p, __privateGet(this, _p) - 1), __privateMethod(this, _k, k_fn).call(this) && !__privateGet(this, _p) ? __privateMethod(this, _r, r_fn).call(this, 6, 1) : __privateMethod(this, _x, x_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 7, 0) : __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
        case 6:
          __privateMethod(this, _x, x_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 7, 0) : __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
        case 7:
          __privateMethod(this, _h, h_fn).call(this) ? __privateMethod(this, _r, r_fn).call(this, 8, 1) : __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
        case 8:
          __privateMethod(this, _f, f_fn).call(this) && __privateMethod(this, _r, r_fn).call(this, 9, 1);
          break;
        case 9:
          break;
        case 10:
          break;
      }
    }
    __privateGet(this, _t).hostname !== void 0 && __privateGet(this, _t).port === void 0 && (__privateGet(this, _t).port = "");
  }
}, _i = new WeakMap(), _n = new WeakMap(), _t = new WeakMap(), _e = new WeakMap(), _s = new WeakMap(), _l = new WeakMap(), _o = new WeakMap(), _d = new WeakMap(), _p = new WeakMap(), _g = new WeakMap(), _r = new WeakSet(), r_fn = /* @__PURE__ */ __name(function(t, r) {
  switch (__privateGet(this, _o)) {
    case 0:
      break;
    case 1:
      __privateGet(this, _t).protocol = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 2:
      break;
    case 3:
      __privateGet(this, _t).username = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 4:
      __privateGet(this, _t).password = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 5:
      __privateGet(this, _t).hostname = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 6:
      __privateGet(this, _t).port = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 7:
      __privateGet(this, _t).pathname = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 8:
      __privateGet(this, _t).search = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 9:
      __privateGet(this, _t).hash = __privateMethod(this, _c, c_fn).call(this);
      break;
    case 10:
      break;
  }
  __privateGet(this, _o) !== 0 && t !== 10 && ([1, 2, 3, 4].includes(__privateGet(this, _o)) && [6, 7, 8, 9].includes(t) && (__privateGet(this, _t).hostname ??= ""), [1, 2, 3, 4, 5, 6].includes(__privateGet(this, _o)) && [8, 9].includes(t) && (__privateGet(this, _t).pathname ??= __privateGet(this, _g) ? "/" : ""), [1, 2, 3, 4, 5, 6, 7].includes(__privateGet(this, _o)) && t === 9 && (__privateGet(this, _t).search ??= "")), __privateMethod(this, _R, R_fn).call(this, t, r);
}, "#r"), _R = new WeakSet(), R_fn = /* @__PURE__ */ __name(function(t, r) {
  __privateSet(this, _o, t), __privateSet(this, _l, __privateGet(this, _e) + r), __privateSet(this, _e, __privateGet(this, _e) + r), __privateSet(this, _s, 0);
}, "#R"), _b = new WeakSet(), b_fn = /* @__PURE__ */ __name(function() {
  __privateSet(this, _e, __privateGet(this, _l)), __privateSet(this, _s, 0);
}, "#b"), _u = new WeakSet(), u_fn = /* @__PURE__ */ __name(function(t) {
  __privateMethod(this, _b, b_fn).call(this), __privateSet(this, _o, t);
}, "#u"), _m = new WeakSet(), m_fn = /* @__PURE__ */ __name(function(t) {
  return t < 0 && (t = __privateGet(this, _n).length - t), t < __privateGet(this, _n).length ? __privateGet(this, _n)[t] : __privateGet(this, _n)[__privateGet(this, _n).length - 1];
}, "#m"), _a2 = new WeakSet(), a_fn = /* @__PURE__ */ __name(function(t, r) {
  let n = __privateMethod(this, _m, m_fn).call(this, t);
  return n.value === r && (n.type === "CHAR" || n.type === "ESCAPED_CHAR" || n.type === "INVALID_CHAR");
}, "#a"), _P = new WeakSet(), P_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), ":");
}, "#P"), _E = new WeakSet(), E_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e) + 1, "/") && __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e) + 2, "/");
}, "#E"), _S = new WeakSet(), S_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), "@");
}, "#S"), _O = new WeakSet(), O_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), ":");
}, "#O"), _k = new WeakSet(), k_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), ":");
}, "#k"), _x = new WeakSet(), x_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), "/");
}, "#x"), _h = new WeakSet(), h_fn = /* @__PURE__ */ __name(function() {
  if (__privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), "?"))
    return true;
  if (__privateGet(this, _n)[__privateGet(this, _e)].value !== "?")
    return false;
  let t = __privateMethod(this, _m, m_fn).call(this, __privateGet(this, _e) - 1);
  return t.type !== "NAME" && t.type !== "REGEX" && t.type !== "CLOSE" && t.type !== "ASTERISK";
}, "#h"), _f = new WeakSet(), f_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), "#");
}, "#f"), _T = new WeakSet(), T_fn = /* @__PURE__ */ __name(function() {
  return __privateGet(this, _n)[__privateGet(this, _e)].type == "OPEN";
}, "#T"), _A = new WeakSet(), A_fn = /* @__PURE__ */ __name(function() {
  return __privateGet(this, _n)[__privateGet(this, _e)].type == "CLOSE";
}, "#A"), _y = new WeakSet(), y_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), "[");
}, "#y"), _w = new WeakSet(), w_fn = /* @__PURE__ */ __name(function() {
  return __privateMethod(this, _a2, a_fn).call(this, __privateGet(this, _e), "]");
}, "#w"), _c = new WeakSet(), c_fn = /* @__PURE__ */ __name(function() {
  let t = __privateGet(this, _n)[__privateGet(this, _e)], r = __privateMethod(this, _m, m_fn).call(this, __privateGet(this, _l)).index;
  return __privateGet(this, _i).substring(r, t.index);
}, "#c"), _C = new WeakSet(), C_fn = /* @__PURE__ */ __name(function() {
  let t = {};
  Object.assign(t, x), t.encodePart = y;
  let r = Z(__privateMethod(this, _c, c_fn).call(this), void 0, t);
  __privateSet(this, _g, N(r));
}, "#C"), __name(_a3, "H"), _a3);
var G = ["protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"];
var E = "*";
function ge(e, t) {
  if (typeof e != "string")
    throw new TypeError("parameter 1 is not of type 'string'.");
  let r = new URL(e, t);
  return { protocol: r.protocol.substring(0, r.protocol.length - 1), username: r.username, password: r.password, hostname: r.hostname, port: r.port, pathname: r.pathname, search: r.search !== "" ? r.search.substring(1, r.search.length) : void 0, hash: r.hash !== "" ? r.hash.substring(1, r.hash.length) : void 0 };
}
__name(ge, "ge");
function b(e, t) {
  return t ? C(e) : e;
}
__name(b, "b");
function w(e, t, r) {
  let n;
  if (typeof t.baseURL == "string")
    try {
      n = new URL(t.baseURL), t.protocol === void 0 && (e.protocol = b(n.protocol.substring(0, n.protocol.length - 1), r)), !r && t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.username === void 0 && (e.username = b(n.username, r)), !r && t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.username === void 0 && t.password === void 0 && (e.password = b(n.password, r)), t.protocol === void 0 && t.hostname === void 0 && (e.hostname = b(n.hostname, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && (e.port = b(n.port, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && (e.pathname = b(n.pathname, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && t.search === void 0 && (e.search = b(n.search.substring(1, n.search.length), r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && t.search === void 0 && t.hash === void 0 && (e.hash = b(n.hash.substring(1, n.hash.length), r));
    } catch {
      throw new TypeError(\`invalid baseURL '\${t.baseURL}'.\`);
    }
  if (typeof t.protocol == "string" && (e.protocol = ce(t.protocol, r)), typeof t.username == "string" && (e.username = ie(t.username, r)), typeof t.password == "string" && (e.password = se(t.password, r)), typeof t.hostname == "string" && (e.hostname = ne(t.hostname, r)), typeof t.port == "string" && (e.port = oe(t.port, e.protocol, r)), typeof t.pathname == "string") {
    if (e.pathname = t.pathname, n && !J(e.pathname, r)) {
      let o = n.pathname.lastIndexOf("/");
      o >= 0 && (e.pathname = b(n.pathname.substring(0, o + 1), r) + e.pathname);
    }
    e.pathname = ae(e.pathname, e.protocol, r);
  }
  return typeof t.search == "string" && (e.search = re(t.search, r)), typeof t.hash == "string" && (e.hash = te(t.hash, r)), e;
}
__name(w, "w");
function C(e) {
  return e.replace(/([+*?:{}()\\\\])/g, "\\\\$1");
}
__name(C, "C");
function Oe(e) {
  return e.replace(/([.+*?^\${}()[\\]|/\\\\])/g, "\\\\$1");
}
__name(Oe, "Oe");
function ke(e, t) {
  t.delimiter ??= "/#?", t.prefixes ??= "./", t.sensitive ??= false, t.strict ??= false, t.end ??= true, t.start ??= true, t.endsWith = "";
  let r = ".*", n = \`[^\${Oe(t.delimiter)}]+?\`, o = /[$_\\u200C\\u200D\\p{ID_Continue}]/u, c = "";
  for (let l = 0; l < e.length; ++l) {
    let s = e[l];
    if (s.type === 3) {
      if (s.modifier === 3) {
        c += C(s.value);
        continue;
      }
      c += \`{\${C(s.value)}}\${k(s.modifier)}\`;
      continue;
    }
    let i = s.hasCustomName(), a = !!s.suffix.length || !!s.prefix.length && (s.prefix.length !== 1 || !t.prefixes.includes(s.prefix)), f = l > 0 ? e[l - 1] : null, d = l < e.length - 1 ? e[l + 1] : null;
    if (!a && i && s.type === 1 && s.modifier === 3 && d && !d.prefix.length && !d.suffix.length)
      if (d.type === 3) {
        let T = d.value.length > 0 ? d.value[0] : "";
        a = o.test(T);
      } else
        a = !d.hasCustomName();
    if (!a && !s.prefix.length && f && f.type === 3) {
      let T = f.value[f.value.length - 1];
      a = t.prefixes.includes(T);
    }
    a && (c += "{"), c += C(s.prefix), i && (c += \`:\${s.name}\`), s.type === 2 ? c += \`(\${s.value})\` : s.type === 1 ? i || (c += \`(\${n})\`) : s.type === 0 && (!i && (!f || f.type === 3 || f.modifier !== 3 || a || s.prefix !== "") ? c += "*" : c += \`(\${r})\`), s.type === 1 && i && s.suffix.length && o.test(s.suffix[0]) && (c += "\\\\"), c += C(s.suffix), a && (c += "}"), s.modifier !== 3 && (c += k(s.modifier));
  }
  return c;
}
__name(ke, "ke");
var _i2, _n2, _t2, _e2, _s2, _l2, _a4;
var me = (_a4 = class {
  constructor(t = {}, r, n) {
    __privateAdd(this, _i2, void 0);
    __privateAdd(this, _n2, {});
    __privateAdd(this, _t2, {});
    __privateAdd(this, _e2, {});
    __privateAdd(this, _s2, {});
    __privateAdd(this, _l2, false);
    try {
      let o;
      if (typeof r == "string" ? o = r : n = r, typeof t == "string") {
        let i = new H(t);
        if (i.parse(), t = i.result, o === void 0 && typeof t.protocol != "string")
          throw new TypeError("A base URL must be provided for a relative constructor string.");
        t.baseURL = o;
      } else {
        if (!t || typeof t != "object")
          throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");
        if (o)
          throw new TypeError("parameter 1 is not of type 'string'.");
      }
      typeof n > "u" && (n = { ignoreCase: false });
      let c = { ignoreCase: n.ignoreCase === true }, l = { pathname: E, protocol: E, username: E, password: E, hostname: E, port: E, search: E, hash: E };
      __privateSet(this, _i2, w(l, t, true)), _(__privateGet(this, _i2).protocol) === __privateGet(this, _i2).port && (__privateGet(this, _i2).port = "");
      let s;
      for (s of G) {
        if (!(s in __privateGet(this, _i2)))
          continue;
        let i = {}, a = __privateGet(this, _i2)[s];
        switch (__privateGet(this, _t2)[s] = [], s) {
          case "protocol":
            Object.assign(i, x), i.encodePart = y;
            break;
          case "username":
            Object.assign(i, x), i.encodePart = le;
            break;
          case "password":
            Object.assign(i, x), i.encodePart = fe;
            break;
          case "hostname":
            Object.assign(i, B), W(a) ? i.encodePart = j : i.encodePart = z;
            break;
          case "port":
            Object.assign(i, x), i.encodePart = K;
            break;
          case "pathname":
            N(__privateGet(this, _n2).protocol) ? (Object.assign(i, q, c), i.encodePart = he) : (Object.assign(i, x, c), i.encodePart = ue);
            break;
          case "search":
            Object.assign(i, x, c), i.encodePart = de;
            break;
          case "hash":
            Object.assign(i, x, c), i.encodePart = pe;
            break;
        }
        try {
          __privateGet(this, _s2)[s] = D(a, i), __privateGet(this, _n2)[s] = F(__privateGet(this, _s2)[s], __privateGet(this, _t2)[s], i), __privateGet(this, _e2)[s] = ke(__privateGet(this, _s2)[s], i), __privateSet(this, _l2, __privateGet(this, _l2) || __privateGet(this, _s2)[s].some((f) => f.type === 2));
        } catch {
          throw new TypeError(\`invalid \${s} pattern '\${__privateGet(this, _i2)[s]}'.\`);
        }
      }
    } catch (o) {
      throw new TypeError(\`Failed to construct 'URLPattern': \${o.message}\`);
    }
  }
  test(t = {}, r) {
    let n = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof t != "string" && r)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof t > "u")
      return false;
    try {
      typeof t == "object" ? n = w(n, t, false) : n = w(n, ge(t, r), false);
    } catch {
      return false;
    }
    let o;
    for (o of G)
      if (!__privateGet(this, _n2)[o].exec(n[o]))
        return false;
    return true;
  }
  exec(t = {}, r) {
    let n = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof t != "string" && r)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof t > "u")
      return;
    try {
      typeof t == "object" ? n = w(n, t, false) : n = w(n, ge(t, r), false);
    } catch {
      return null;
    }
    let o = {};
    r ? o.inputs = [t, r] : o.inputs = [t];
    let c;
    for (c of G) {
      let l = __privateGet(this, _n2)[c].exec(n[c]);
      if (!l)
        return null;
      let s = {};
      for (let [i, a] of __privateGet(this, _t2)[c].entries())
        if (typeof a == "string" || typeof a == "number") {
          let f = l[i + 1];
          s[a] = f;
        }
      o[c] = { input: n[c] ?? "", groups: s };
    }
    return o;
  }
  static compareComponent(t, r, n) {
    let o = /* @__PURE__ */ __name((i, a) => {
      for (let f of ["type", "modifier", "prefix", "value", "suffix"]) {
        if (i[f] < a[f])
          return -1;
        if (i[f] === a[f])
          continue;
        return 1;
      }
      return 0;
    }, "o"), c = new R(3, "", "", "", "", 3), l = new R(0, "", "", "", "", 3), s = /* @__PURE__ */ __name((i, a) => {
      let f = 0;
      for (; f < Math.min(i.length, a.length); ++f) {
        let d = o(i[f], a[f]);
        if (d)
          return d;
      }
      return i.length === a.length ? 0 : o(i[f] ?? c, a[f] ?? c);
    }, "s");
    return !__privateGet(r, _e2)[t] && !__privateGet(n, _e2)[t] ? 0 : __privateGet(r, _e2)[t] && !__privateGet(n, _e2)[t] ? s(__privateGet(r, _s2)[t], [l]) : !__privateGet(r, _e2)[t] && __privateGet(n, _e2)[t] ? s([l], __privateGet(n, _s2)[t]) : s(__privateGet(r, _s2)[t], __privateGet(n, _s2)[t]);
  }
  get protocol() {
    return __privateGet(this, _e2).protocol;
  }
  get username() {
    return __privateGet(this, _e2).username;
  }
  get password() {
    return __privateGet(this, _e2).password;
  }
  get hostname() {
    return __privateGet(this, _e2).hostname;
  }
  get port() {
    return __privateGet(this, _e2).port;
  }
  get pathname() {
    return __privateGet(this, _e2).pathname;
  }
  get search() {
    return __privateGet(this, _e2).search;
  }
  get hash() {
    return __privateGet(this, _e2).hash;
  }
  get hasRegExpGroups() {
    return __privateGet(this, _l2);
  }
}, _i2 = new WeakMap(), _n2 = new WeakMap(), _t2 = new WeakMap(), _e2 = new WeakMap(), _s2 = new WeakMap(), _l2 = new WeakMap(), __name(_a4, "me"), _a4);

// ../../node_modules/.pnpm/urlpattern-polyfill@10.0.0/node_modules/urlpattern-polyfill/index.js
if (!globalThis.URLPattern) {
  globalThis.URLPattern = me;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  URLPattern
});
`});var Cr=O((Yl,Ir)=>{"use strict";Ir.exports=`"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// <define:process>
var init_define_process = __esm({
  "<define:process>"() {
  }
});

// ../../node_modules/.pnpm/blob-polyfill@7.0.20220408/node_modules/blob-polyfill/Blob.js
var require_Blob = __commonJS({
  "../../node_modules/.pnpm/blob-polyfill@7.0.20220408/node_modules/blob-polyfill/Blob.js"(exports2) {
    "use strict";
    init_define_process();
    (function(global2) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define(["exports"], factory);
        } else if (typeof exports2 === "object" && typeof exports2.nodeName !== "string") {
          factory(exports2);
        } else {
          factory(global2);
        }
      })(function(exports3) {
        "use strict";
        var BlobBuilder = global2.BlobBuilder || global2.WebKitBlobBuilder || global2.MSBlobBuilder || global2.MozBlobBuilder;
        var URL = global2.URL || global2.webkitURL || function(href, a) {
          a = document.createElement("a");
          a.href = href;
          return a;
        };
        var origBlob = global2.Blob;
        var createObjectURL = URL.createObjectURL;
        var revokeObjectURL = URL.revokeObjectURL;
        var strTag = global2.Symbol && global2.Symbol.toStringTag;
        var blobSupported = false;
        var blobSupportsArrayBufferView = false;
        var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
        try {
          blobSupported = new Blob(["\\xE4"]).size === 2;
          blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
        } catch (e) {
        }
        function mapArrayBufferViews(ary) {
          return ary.map(function(chunk) {
            if (chunk.buffer instanceof ArrayBuffer) {
              var buf = chunk.buffer;
              if (chunk.byteLength !== buf.byteLength) {
                var copy = new Uint8Array(chunk.byteLength);
                copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
                buf = copy.buffer;
              }
              return buf;
            }
            return chunk;
          });
        }
        __name(mapArrayBufferViews, "mapArrayBufferViews");
        function BlobBuilderConstructor(ary, options) {
          options = options || {};
          var bb = new BlobBuilder();
          mapArrayBufferViews(ary).forEach(function(part) {
            bb.append(part);
          });
          return options.type ? bb.getBlob(options.type) : bb.getBlob();
        }
        __name(BlobBuilderConstructor, "BlobBuilderConstructor");
        function BlobConstructor(ary, options) {
          return new origBlob(mapArrayBufferViews(ary), options || {});
        }
        __name(BlobConstructor, "BlobConstructor");
        if (global2.Blob) {
          BlobBuilderConstructor.prototype = Blob.prototype;
          BlobConstructor.prototype = Blob.prototype;
        }
        function stringEncode(string) {
          var pos = 0;
          var len = string.length;
          var Arr = global2.Uint8Array || Array;
          var at = 0;
          var tlen = Math.max(32, len + (len >> 1) + 7);
          var target = new Arr(tlen >> 3 << 3);
          while (pos < len) {
            var value = string.charCodeAt(pos++);
            if (value >= 55296 && value <= 56319) {
              if (pos < len) {
                var extra = string.charCodeAt(pos);
                if ((extra & 64512) === 56320) {
                  ++pos;
                  value = ((value & 1023) << 10) + (extra & 1023) + 65536;
                }
              }
              if (value >= 55296 && value <= 56319) {
                continue;
              }
            }
            if (at + 4 > target.length) {
              tlen += 8;
              tlen *= 1 + pos / string.length * 2;
              tlen = tlen >> 3 << 3;
              var update = new Uint8Array(tlen);
              update.set(target);
              target = update;
            }
            if ((value & 4294967168) === 0) {
              target[at++] = value;
              continue;
            } else if ((value & 4294965248) === 0) {
              target[at++] = value >> 6 & 31 | 192;
            } else if ((value & 4294901760) === 0) {
              target[at++] = value >> 12 & 15 | 224;
              target[at++] = value >> 6 & 63 | 128;
            } else if ((value & 4292870144) === 0) {
              target[at++] = value >> 18 & 7 | 240;
              target[at++] = value >> 12 & 63 | 128;
              target[at++] = value >> 6 & 63 | 128;
            } else {
              continue;
            }
            target[at++] = value & 63 | 128;
          }
          return target.slice(0, at);
        }
        __name(stringEncode, "stringEncode");
        function stringDecode(buf) {
          var end = buf.length;
          var res = [];
          var i = 0;
          while (i < end) {
            var firstByte = buf[i];
            var codePoint = null;
            var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
            if (i + bytesPerSequence <= end) {
              var secondByte, thirdByte, fourthByte, tempCodePoint;
              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 128) {
                    codePoint = firstByte;
                  }
                  break;
                case 2:
                  secondByte = buf[i + 1];
                  if ((secondByte & 192) === 128) {
                    tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                    if (tempCodePoint > 127) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 3:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                    tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                    if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 4:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  fourthByte = buf[i + 3];
                  if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                    tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                    if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                      codePoint = tempCodePoint;
                    }
                  }
              }
            }
            if (codePoint === null) {
              codePoint = 65533;
              bytesPerSequence = 1;
            } else if (codePoint > 65535) {
              codePoint -= 65536;
              res.push(codePoint >>> 10 & 1023 | 55296);
              codePoint = 56320 | codePoint & 1023;
            }
            res.push(codePoint);
            i += bytesPerSequence;
          }
          var len = res.length;
          var str = "";
          var j = 0;
          while (j < len) {
            str += String.fromCharCode.apply(String, res.slice(j, j += 4096));
          }
          return str;
        }
        __name(stringDecode, "stringDecode");
        var textEncode = typeof TextEncoder === "function" ? TextEncoder.prototype.encode.bind(new TextEncoder()) : stringEncode;
        var textDecode = typeof TextDecoder === "function" ? TextDecoder.prototype.decode.bind(new TextDecoder()) : stringDecode;
        function FakeBlobBuilder() {
          function bufferClone(buf) {
            var view = new Array(buf.byteLength);
            var array = new Uint8Array(buf);
            var i = view.length;
            while (i--) {
              view[i] = array[i];
            }
            return view;
          }
          __name(bufferClone, "bufferClone");
          function array2base64(input) {
            var byteToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = [];
            for (var i = 0; i < input.length; i += 3) {
              var byte1 = input[i];
              var haveByte2 = i + 1 < input.length;
              var byte2 = haveByte2 ? input[i + 1] : 0;
              var haveByte3 = i + 2 < input.length;
              var byte3 = haveByte3 ? input[i + 2] : 0;
              var outByte1 = byte1 >> 2;
              var outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
              var outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
              var outByte4 = byte3 & 63;
              if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                  outByte3 = 64;
                }
              }
              output.push(
                byteToCharMap[outByte1],
                byteToCharMap[outByte2],
                byteToCharMap[outByte3],
                byteToCharMap[outByte4]
              );
            }
            return output.join("");
          }
          __name(array2base64, "array2base64");
          var create = Object.create || function(a) {
            function c() {
            }
            __name(c, "c");
            c.prototype = a;
            return new c();
          };
          function getObjectTypeName(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          }
          __name(getObjectTypeName, "getObjectTypeName");
          function isPrototypeOf(c, o) {
            return typeof c === "object" && Object.prototype.isPrototypeOf.call(c.prototype, o);
          }
          __name(isPrototypeOf, "isPrototypeOf");
          function isDataView(o) {
            return getObjectTypeName(o) === "DataView" || isPrototypeOf(global2.DataView, o);
          }
          __name(isDataView, "isDataView");
          var arrayBufferClassNames = [
            "Int8Array",
            "Uint8Array",
            "Uint8ClampedArray",
            "Int16Array",
            "Uint16Array",
            "Int32Array",
            "Uint32Array",
            "Float32Array",
            "Float64Array",
            "ArrayBuffer"
          ];
          function includes(a, v) {
            return a.indexOf(v) !== -1;
          }
          __name(includes, "includes");
          function isArrayBuffer(o) {
            return includes(arrayBufferClassNames, getObjectTypeName(o)) || isPrototypeOf(global2.ArrayBuffer, o);
          }
          __name(isArrayBuffer, "isArrayBuffer");
          function concatTypedarrays(chunks) {
            var size = 0;
            var j = chunks.length;
            while (j--) {
              size += chunks[j].length;
            }
            var b = new Uint8Array(size);
            var offset = 0;
            for (var i = 0; i < chunks.length; i++) {
              var chunk = chunks[i];
              b.set(chunk, offset);
              offset += chunk.byteLength || chunk.length;
            }
            return b;
          }
          __name(concatTypedarrays, "concatTypedarrays");
          function Blob3(chunks, opts) {
            chunks = chunks ? chunks.slice() : [];
            opts = opts == null ? {} : opts;
            for (var i = 0, len = chunks.length; i < len; i++) {
              var chunk = chunks[i];
              if (chunk instanceof Blob3) {
                chunks[i] = chunk._buffer;
              } else if (typeof chunk === "string") {
                chunks[i] = textEncode(chunk);
              } else if (isDataView(chunk)) {
                chunks[i] = bufferClone(chunk.buffer);
              } else if (isArrayBuffer(chunk)) {
                chunks[i] = bufferClone(chunk);
              } else {
                chunks[i] = textEncode(String(chunk));
              }
            }
            this._buffer = global2.Uint8Array ? concatTypedarrays(chunks) : [].concat.apply([], chunks);
            this.size = this._buffer.length;
            this.type = opts.type || "";
            if (/[^\\u0020-\\u007E]/.test(this.type)) {
              this.type = "";
            } else {
              this.type = this.type.toLowerCase();
            }
          }
          __name(Blob3, "Blob");
          Blob3.prototype.arrayBuffer = function() {
            return Promise.resolve(this._buffer.buffer || this._buffer);
          };
          Blob3.prototype.text = function() {
            return Promise.resolve(textDecode(this._buffer));
          };
          Blob3.prototype.slice = function(start, end, type) {
            var slice = this._buffer.slice(start || 0, end || this._buffer.length);
            return new Blob3([slice], { type });
          };
          Blob3.prototype.toString = function() {
            return "[object Blob]";
          };
          function File2(chunks, name, opts) {
            opts = opts || {};
            var a = Blob3.call(this, chunks, opts) || this;
            a.name = name.replace(/\\//g, ":");
            a.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : /* @__PURE__ */ new Date();
            a.lastModified = +a.lastModifiedDate;
            return a;
          }
          __name(File2, "File");
          File2.prototype = create(Blob3.prototype);
          File2.prototype.constructor = File2;
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(File2, Blob3);
          } else {
            try {
              File2.__proto__ = Blob3;
            } catch (e) {
            }
          }
          File2.prototype.toString = function() {
            return "[object File]";
          };
          function FileReader2() {
            if (!(this instanceof FileReader2)) {
              throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
            }
            var delegate = document.createDocumentFragment();
            this.addEventListener = delegate.addEventListener;
            this.dispatchEvent = function(evt) {
              var local = this["on" + evt.type];
              if (typeof local === "function")
                local(evt);
              delegate.dispatchEvent(evt);
            };
            this.removeEventListener = delegate.removeEventListener;
          }
          __name(FileReader2, "FileReader");
          function _read(fr, blob2, kind) {
            if (!(blob2 instanceof Blob3)) {
              throw new TypeError("Failed to execute '" + kind + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
            }
            fr.result = "";
            setTimeout(function() {
              this.readyState = FileReader2.LOADING;
              fr.dispatchEvent(new Event("load"));
              fr.dispatchEvent(new Event("loadend"));
            });
          }
          __name(_read, "_read");
          FileReader2.EMPTY = 0;
          FileReader2.LOADING = 1;
          FileReader2.DONE = 2;
          FileReader2.prototype.error = null;
          FileReader2.prototype.onabort = null;
          FileReader2.prototype.onerror = null;
          FileReader2.prototype.onload = null;
          FileReader2.prototype.onloadend = null;
          FileReader2.prototype.onloadstart = null;
          FileReader2.prototype.onprogress = null;
          FileReader2.prototype.readAsDataURL = function(blob2) {
            _read(this, blob2, "readAsDataURL");
            this.result = "data:" + blob2.type + ";base64," + array2base64(blob2._buffer);
          };
          FileReader2.prototype.readAsText = function(blob2) {
            _read(this, blob2, "readAsText");
            this.result = textDecode(blob2._buffer);
          };
          FileReader2.prototype.readAsArrayBuffer = function(blob2) {
            _read(this, blob2, "readAsText");
            this.result = (blob2._buffer.buffer || blob2._buffer).slice();
          };
          FileReader2.prototype.abort = function() {
          };
          URL.createObjectURL = function(blob2) {
            return blob2 instanceof Blob3 ? "data:" + blob2.type + ";base64," + array2base64(blob2._buffer) : createObjectURL.call(URL, blob2);
          };
          URL.revokeObjectURL = function(url) {
            revokeObjectURL && revokeObjectURL.call(URL, url);
          };
          var _send = global2.XMLHttpRequest && global2.XMLHttpRequest.prototype.send;
          if (_send) {
            XMLHttpRequest.prototype.send = function(data) {
              if (data instanceof Blob3) {
                this.setRequestHeader("Content-Type", data.type);
                _send.call(this, textDecode(data._buffer));
              } else {
                _send.call(this, data);
              }
            };
          }
          exports3.Blob = Blob3;
          exports3.File = File2;
          exports3.FileReader = FileReader2;
          exports3.URL = URL;
        }
        __name(FakeBlobBuilder, "FakeBlobBuilder");
        function fixFileAndXHR() {
          var isIE = !!global2.ActiveXObject || "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
          var _send = global2.XMLHttpRequest && global2.XMLHttpRequest.prototype.send;
          if (isIE && _send) {
            XMLHttpRequest.prototype.send = function(data) {
              if (data instanceof Blob) {
                this.setRequestHeader("Content-Type", data.type);
                _send.call(this, data);
              } else {
                _send.call(this, data);
              }
            };
          }
          try {
            new File([], "");
            exports3.File = global2.File;
            exports3.FileReader = global2.FileReader;
          } catch (e) {
            try {
              exports3.File = new Function(
                'class File extends Blob {constructor(chunks, name, opts) {opts = opts || {};super(chunks, opts || {});this.name = name.replace(/\\\\//g, ":");this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();this.lastModified = +this.lastModifiedDate;}};return new File([], ""), File'
              )();
            } catch (e2) {
              exports3.File = function(b, d, c) {
                var blob2 = new Blob(b, c);
                var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : /* @__PURE__ */ new Date();
                blob2.name = d.replace(/\\//g, ":");
                blob2.lastModifiedDate = t;
                blob2.lastModified = +t;
                blob2.toString = function() {
                  return "[object File]";
                };
                if (strTag) {
                  blob2[strTag] = "File";
                }
                return blob2;
              };
            }
          }
        }
        __name(fixFileAndXHR, "fixFileAndXHR");
        if (blobSupported) {
          fixFileAndXHR();
          exports3.Blob = blobSupportsArrayBufferView ? global2.Blob : BlobConstructor;
        } else if (blobBuilderSupported) {
          fixFileAndXHR();
          exports3.Blob = BlobBuilderConstructor;
        } else {
          FakeBlobBuilder();
        }
        if (strTag) {
          if (!exports3.File.prototype[strTag])
            exports3.File.prototype[strTag] = "File";
          if (!exports3.Blob.prototype[strTag])
            exports3.Blob.prototype[strTag] = "Blob";
          if (!exports3.FileReader.prototype[strTag])
            exports3.FileReader.prototype[strTag] = "FileReader";
        }
        var blob = exports3.Blob.prototype;
        var stream;
        try {
          new ReadableStream({ type: "bytes" });
          stream = /* @__PURE__ */ __name(function stream2() {
            var position = 0;
            var blob2 = this;
            return new ReadableStream({
              type: "bytes",
              autoAllocateChunkSize: 524288,
              pull: function(controller) {
                var v = controller.byobRequest.view;
                var chunk = blob2.slice(position, position + v.byteLength);
                return chunk.arrayBuffer().then(function(buffer) {
                  var uint8array = new Uint8Array(buffer);
                  var bytesRead = uint8array.byteLength;
                  position += bytesRead;
                  v.set(uint8array);
                  controller.byobRequest.respond(bytesRead);
                  if (position >= blob2.size)
                    controller.close();
                });
              }
            });
          }, "stream");
        } catch (e) {
          try {
            new ReadableStream({});
            stream = /* @__PURE__ */ __name(function stream2(blob2) {
              var position = 0;
              return new ReadableStream({
                pull: function(controller) {
                  var chunk = blob2.slice(position, position + 524288);
                  return chunk.arrayBuffer().then(function(buffer) {
                    position += buffer.byteLength;
                    var uint8array = new Uint8Array(buffer);
                    controller.enqueue(uint8array);
                    if (position == blob2.size)
                      controller.close();
                  });
                }
              });
            }, "stream");
          } catch (e2) {
            try {
              new Response("").body.getReader().read();
              stream = /* @__PURE__ */ __name(function stream2() {
                return new Response(this).body;
              }, "stream");
            } catch (e3) {
              stream = /* @__PURE__ */ __name(function stream2() {
                throw new Error("Include https://github.com/MattiasBuelens/web-streams-polyfill");
              }, "stream");
            }
          }
        }
        function promisify(obj) {
          return new Promise(function(resolve, reject) {
            obj.onload = obj.onerror = function(evt) {
              obj.onload = obj.onerror = null;
              evt.type === "load" ? resolve(obj.result || obj) : reject(new Error("Failed to read the blob/file"));
            };
          });
        }
        __name(promisify, "promisify");
        if (!blob.arrayBuffer) {
          blob.arrayBuffer = /* @__PURE__ */ __name(function arrayBuffer() {
            var fr = new FileReader();
            fr.readAsArrayBuffer(this);
            return promisify(fr);
          }, "arrayBuffer");
        }
        if (!blob.text) {
          blob.text = /* @__PURE__ */ __name(function text() {
            var fr = new FileReader();
            fr.readAsText(this);
            return promisify(fr);
          }, "text");
        }
        if (!blob.stream) {
          blob.stream = stream;
        }
      });
    })(
      typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || exports2
    );
  }
});

// src/primitives/blob.js
var blob_exports = {};
__export(blob_exports, {
  Blob: () => import_blob_polyfill.Blob
});
module.exports = __toCommonJS(blob_exports);
init_define_process();
var import_blob_polyfill = __toESM(require_Blob());
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Blob
});
`});var fr=O((jl,Br)=>{"use strict";Br.exports=`"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/primitives/structured-clone.js
var structured_clone_exports = {};
__export(structured_clone_exports, {
  structuredClone: () => structuredClone2
});
module.exports = __toCommonJS(structured_clone_exports);

// ../../node_modules/.pnpm/@ungap+structured-clone@1.2.0/node_modules/@ungap/structured-clone/esm/types.js
var VOID = -1;
var PRIMITIVE = 0;
var ARRAY = 1;
var OBJECT = 2;
var DATE = 3;
var REGEXP = 4;
var MAP = 5;
var SET = 6;
var ERROR = 7;
var BIGINT = 8;

// ../../node_modules/.pnpm/@ungap+structured-clone@1.2.0/node_modules/@ungap/structured-clone/esm/deserialize.js
var env = typeof self === "object" ? self : globalThis;
var deserializer = /* @__PURE__ */ __name(($, _) => {
  const as = /* @__PURE__ */ __name((out, index) => {
    $.set(index, out);
    return out;
  }, "as");
  const unpair = /* @__PURE__ */ __name((index) => {
    if ($.has(index))
      return $.get(index);
    const [type, value] = _[index];
    switch (type) {
      case PRIMITIVE:
      case VOID:
        return as(value, index);
      case ARRAY: {
        const arr = as([], index);
        for (const index2 of value)
          arr.push(unpair(index2));
        return arr;
      }
      case OBJECT: {
        const object = as({}, index);
        for (const [key, index2] of value)
          object[unpair(key)] = unpair(index2);
        return object;
      }
      case DATE:
        return as(new Date(value), index);
      case REGEXP: {
        const { source, flags } = value;
        return as(new RegExp(source, flags), index);
      }
      case MAP: {
        const map = as(/* @__PURE__ */ new Map(), index);
        for (const [key, index2] of value)
          map.set(unpair(key), unpair(index2));
        return map;
      }
      case SET: {
        const set = as(/* @__PURE__ */ new Set(), index);
        for (const index2 of value)
          set.add(unpair(index2));
        return set;
      }
      case ERROR: {
        const { name, message } = value;
        return as(new env[name](message), index);
      }
      case BIGINT:
        return as(BigInt(value), index);
      case "BigInt":
        return as(Object(BigInt(value)), index);
    }
    return as(new env[type](value), index);
  }, "unpair");
  return unpair;
}, "deserializer");
var deserialize = /* @__PURE__ */ __name((serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0), "deserialize");

// ../../node_modules/.pnpm/@ungap+structured-clone@1.2.0/node_modules/@ungap/structured-clone/esm/serialize.js
var EMPTY = "";
var { toString } = {};
var { keys } = Object;
var typeOf = /* @__PURE__ */ __name((value) => {
  const type = typeof value;
  if (type !== "object" || !value)
    return [PRIMITIVE, type];
  const asString = toString.call(value).slice(8, -1);
  switch (asString) {
    case "Array":
      return [ARRAY, EMPTY];
    case "Object":
      return [OBJECT, EMPTY];
    case "Date":
      return [DATE, EMPTY];
    case "RegExp":
      return [REGEXP, EMPTY];
    case "Map":
      return [MAP, EMPTY];
    case "Set":
      return [SET, EMPTY];
  }
  if (asString.includes("Array"))
    return [ARRAY, asString];
  if (asString.includes("Error"))
    return [ERROR, asString];
  return [OBJECT, asString];
}, "typeOf");
var shouldSkip = /* @__PURE__ */ __name(([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol"), "shouldSkip");
var serializer = /* @__PURE__ */ __name((strict, json, $, _) => {
  const as = /* @__PURE__ */ __name((out, value) => {
    const index = _.push(out) - 1;
    $.set(value, index);
    return index;
  }, "as");
  const pair = /* @__PURE__ */ __name((value) => {
    if ($.has(value))
      return $.get(value);
    let [TYPE, type] = typeOf(value);
    switch (TYPE) {
      case PRIMITIVE: {
        let entry = value;
        switch (type) {
          case "bigint":
            TYPE = BIGINT;
            entry = value.toString();
            break;
          case "function":
          case "symbol":
            if (strict)
              throw new TypeError("unable to serialize " + type);
            entry = null;
            break;
          case "undefined":
            return as([VOID], value);
        }
        return as([TYPE, entry], value);
      }
      case ARRAY: {
        if (type)
          return as([type, [...value]], value);
        const arr = [];
        const index = as([TYPE, arr], value);
        for (const entry of value)
          arr.push(pair(entry));
        return index;
      }
      case OBJECT: {
        if (type) {
          switch (type) {
            case "BigInt":
              return as([type, value.toString()], value);
            case "Boolean":
            case "Number":
            case "String":
              return as([type, value.valueOf()], value);
          }
        }
        if (json && "toJSON" in value)
          return pair(value.toJSON());
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const key of keys(value)) {
          if (strict || !shouldSkip(typeOf(value[key])))
            entries.push([pair(key), pair(value[key])]);
        }
        return index;
      }
      case DATE:
        return as([TYPE, value.toISOString()], value);
      case REGEXP: {
        const { source, flags } = value;
        return as([TYPE, { source, flags }], value);
      }
      case MAP: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const [key, entry] of value) {
          if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
            entries.push([pair(key), pair(entry)]);
        }
        return index;
      }
      case SET: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const entry of value) {
          if (strict || !shouldSkip(typeOf(entry)))
            entries.push(pair(entry));
        }
        return index;
      }
    }
    const { message } = value;
    return as([TYPE, { name: type, message }], value);
  }, "pair");
  return pair;
}, "serializer");
var serialize = /* @__PURE__ */ __name((value, { json, lossy } = {}) => {
  const _ = [];
  return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
}, "serialize");

// ../../node_modules/.pnpm/@ungap+structured-clone@1.2.0/node_modules/@ungap/structured-clone/esm/index.js
var esm_default = typeof structuredClone === "function" ? (
  /* c8 ignore start */
  (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize(any, options)) : structuredClone(any)
) : (any, options) => deserialize(serialize(any, options));

// src/primitives/structured-clone.js
function structuredClone2(value, options) {
  if (value instanceof ReadableStream) {
    const transform = new TransformStream({});
    value.pipeTo(transform.writable);
    return transform.readable;
  }
  return esm_default(value, options);
}
__name(structuredClone2, "structuredClone");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  structuredClone
});
`});var yr=O((Vl,br)=>{"use strict";br.exports=`"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// <define:process>
var define_process_default;
var init_define_process = __esm({
  "<define:process>"() {
    define_process_default = { env: {}, versions: { node: "16.6.0" } };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/symbols.js
var require_symbols = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/symbols.js"(exports2, module2) {
    "use strict";
    init_define_process();
    module2.exports = {
      kUrl: Symbol("url"),
      kHeaders: Symbol("headers"),
      kSignal: Symbol("signal"),
      kState: Symbol("state"),
      kGuard: Symbol("guard"),
      kRealm: Symbol("realm")
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/symbols.js
var require_symbols2 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/symbols.js"(exports2, module2) {
    "use strict";
    init_define_process();
    module2.exports = {
      kClose: Symbol("close"),
      kDestroy: Symbol("destroy"),
      kDispatch: Symbol("dispatch"),
      kUrl: Symbol("url"),
      kWriting: Symbol("writing"),
      kResuming: Symbol("resuming"),
      kQueue: Symbol("queue"),
      kConnect: Symbol("connect"),
      kConnecting: Symbol("connecting"),
      kHeadersList: Symbol("headers list"),
      kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
      kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
      kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
      kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
      kKeepAlive: Symbol("keep alive"),
      kHeadersTimeout: Symbol("headers timeout"),
      kBodyTimeout: Symbol("body timeout"),
      kServerName: Symbol("server name"),
      kLocalAddress: Symbol("local address"),
      kHost: Symbol("host"),
      kNoRef: Symbol("no ref"),
      kBodyUsed: Symbol("used"),
      kRunning: Symbol("running"),
      kBlocking: Symbol("blocking"),
      kPending: Symbol("pending"),
      kSize: Symbol("size"),
      kBusy: Symbol("busy"),
      kQueued: Symbol("queued"),
      kFree: Symbol("free"),
      kConnected: Symbol("connected"),
      kClosed: Symbol("closed"),
      kNeedDrain: Symbol("need drain"),
      kReset: Symbol("reset"),
      kDestroyed: Symbol.for("nodejs.stream.destroyed"),
      kMaxHeadersSize: Symbol("max headers size"),
      kRunningIdx: Symbol("running index"),
      kPendingIdx: Symbol("pending index"),
      kError: Symbol("error"),
      kClients: Symbol("clients"),
      kClient: Symbol("client"),
      kParser: Symbol("parser"),
      kOnDestroyed: Symbol("destroy callbacks"),
      kPipelining: Symbol("pipelining"),
      kSocket: Symbol("socket"),
      kHostHeader: Symbol("host header"),
      kConnector: Symbol("connector"),
      kStrictContentLength: Symbol("strict content length"),
      kMaxRedirections: Symbol("maxRedirections"),
      kMaxRequests: Symbol("maxRequestsPerClient"),
      kProxy: Symbol("proxy agent options"),
      kCounter: Symbol("socket request counter"),
      kInterceptors: Symbol("dispatch interceptors"),
      kMaxResponseSize: Symbol("max response size")
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/errors.js
var require_errors = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/errors.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var _UndiciError = class _UndiciError extends Error {
      constructor(message) {
        super(message);
        this.name = "UndiciError";
        this.code = "UND_ERR";
      }
    };
    __name(_UndiciError, "UndiciError");
    var UndiciError = _UndiciError;
    var _ConnectTimeoutError = class _ConnectTimeoutError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _ConnectTimeoutError);
        this.name = "ConnectTimeoutError";
        this.message = message || "Connect Timeout Error";
        this.code = "UND_ERR_CONNECT_TIMEOUT";
      }
    };
    __name(_ConnectTimeoutError, "ConnectTimeoutError");
    var ConnectTimeoutError = _ConnectTimeoutError;
    var _HeadersTimeoutError = class _HeadersTimeoutError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _HeadersTimeoutError);
        this.name = "HeadersTimeoutError";
        this.message = message || "Headers Timeout Error";
        this.code = "UND_ERR_HEADERS_TIMEOUT";
      }
    };
    __name(_HeadersTimeoutError, "HeadersTimeoutError");
    var HeadersTimeoutError = _HeadersTimeoutError;
    var _HeadersOverflowError = class _HeadersOverflowError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _HeadersOverflowError);
        this.name = "HeadersOverflowError";
        this.message = message || "Headers Overflow Error";
        this.code = "UND_ERR_HEADERS_OVERFLOW";
      }
    };
    __name(_HeadersOverflowError, "HeadersOverflowError");
    var HeadersOverflowError = _HeadersOverflowError;
    var _BodyTimeoutError = class _BodyTimeoutError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _BodyTimeoutError);
        this.name = "BodyTimeoutError";
        this.message = message || "Body Timeout Error";
        this.code = "UND_ERR_BODY_TIMEOUT";
      }
    };
    __name(_BodyTimeoutError, "BodyTimeoutError");
    var BodyTimeoutError = _BodyTimeoutError;
    var _ResponseStatusCodeError = class _ResponseStatusCodeError extends UndiciError {
      constructor(message, statusCode, headers, body) {
        super(message);
        Error.captureStackTrace(this, _ResponseStatusCodeError);
        this.name = "ResponseStatusCodeError";
        this.message = message || "Response Status Code Error";
        this.code = "UND_ERR_RESPONSE_STATUS_CODE";
        this.body = body;
        this.status = statusCode;
        this.statusCode = statusCode;
        this.headers = headers;
      }
    };
    __name(_ResponseStatusCodeError, "ResponseStatusCodeError");
    var ResponseStatusCodeError = _ResponseStatusCodeError;
    var _InvalidArgumentError = class _InvalidArgumentError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _InvalidArgumentError);
        this.name = "InvalidArgumentError";
        this.message = message || "Invalid Argument Error";
        this.code = "UND_ERR_INVALID_ARG";
      }
    };
    __name(_InvalidArgumentError, "InvalidArgumentError");
    var InvalidArgumentError2 = _InvalidArgumentError;
    var _InvalidReturnValueError = class _InvalidReturnValueError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _InvalidReturnValueError);
        this.name = "InvalidReturnValueError";
        this.message = message || "Invalid Return Value Error";
        this.code = "UND_ERR_INVALID_RETURN_VALUE";
      }
    };
    __name(_InvalidReturnValueError, "InvalidReturnValueError");
    var InvalidReturnValueError = _InvalidReturnValueError;
    var _RequestAbortedError = class _RequestAbortedError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _RequestAbortedError);
        this.name = "AbortError";
        this.message = message || "Request aborted";
        this.code = "UND_ERR_ABORTED";
      }
    };
    __name(_RequestAbortedError, "RequestAbortedError");
    var RequestAbortedError = _RequestAbortedError;
    var _InformationalError = class _InformationalError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _InformationalError);
        this.name = "InformationalError";
        this.message = message || "Request information";
        this.code = "UND_ERR_INFO";
      }
    };
    __name(_InformationalError, "InformationalError");
    var InformationalError = _InformationalError;
    var _RequestContentLengthMismatchError = class _RequestContentLengthMismatchError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _RequestContentLengthMismatchError);
        this.name = "RequestContentLengthMismatchError";
        this.message = message || "Request body length does not match content-length header";
        this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
      }
    };
    __name(_RequestContentLengthMismatchError, "RequestContentLengthMismatchError");
    var RequestContentLengthMismatchError = _RequestContentLengthMismatchError;
    var _ResponseContentLengthMismatchError = class _ResponseContentLengthMismatchError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _ResponseContentLengthMismatchError);
        this.name = "ResponseContentLengthMismatchError";
        this.message = message || "Response body length does not match content-length header";
        this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
      }
    };
    __name(_ResponseContentLengthMismatchError, "ResponseContentLengthMismatchError");
    var ResponseContentLengthMismatchError = _ResponseContentLengthMismatchError;
    var _ClientDestroyedError = class _ClientDestroyedError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _ClientDestroyedError);
        this.name = "ClientDestroyedError";
        this.message = message || "The client is destroyed";
        this.code = "UND_ERR_DESTROYED";
      }
    };
    __name(_ClientDestroyedError, "ClientDestroyedError");
    var ClientDestroyedError = _ClientDestroyedError;
    var _ClientClosedError = class _ClientClosedError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _ClientClosedError);
        this.name = "ClientClosedError";
        this.message = message || "The client is closed";
        this.code = "UND_ERR_CLOSED";
      }
    };
    __name(_ClientClosedError, "ClientClosedError");
    var ClientClosedError = _ClientClosedError;
    var _SocketError = class _SocketError extends UndiciError {
      constructor(message, socket) {
        super(message);
        Error.captureStackTrace(this, _SocketError);
        this.name = "SocketError";
        this.message = message || "Socket error";
        this.code = "UND_ERR_SOCKET";
        this.socket = socket;
      }
    };
    __name(_SocketError, "SocketError");
    var SocketError = _SocketError;
    var _NotSupportedError = class _NotSupportedError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _NotSupportedError);
        this.name = "NotSupportedError";
        this.message = message || "Not supported error";
        this.code = "UND_ERR_NOT_SUPPORTED";
      }
    };
    __name(_NotSupportedError, "NotSupportedError");
    var NotSupportedError = _NotSupportedError;
    var _BalancedPoolMissingUpstreamError = class _BalancedPoolMissingUpstreamError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, NotSupportedError);
        this.name = "MissingUpstreamError";
        this.message = message || "No upstream has been added to the BalancedPool";
        this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
      }
    };
    __name(_BalancedPoolMissingUpstreamError, "BalancedPoolMissingUpstreamError");
    var BalancedPoolMissingUpstreamError = _BalancedPoolMissingUpstreamError;
    var _HTTPParserError = class _HTTPParserError extends Error {
      constructor(message, code, data) {
        super(message);
        Error.captureStackTrace(this, _HTTPParserError);
        this.name = "HTTPParserError";
        this.code = code ? \`HPE_\${code}\` : void 0;
        this.data = data ? data.toString() : void 0;
      }
    };
    __name(_HTTPParserError, "HTTPParserError");
    var HTTPParserError = _HTTPParserError;
    var _ResponseExceededMaxSizeError = class _ResponseExceededMaxSizeError extends UndiciError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _ResponseExceededMaxSizeError);
        this.name = "ResponseExceededMaxSizeError";
        this.message = message || "Response content exceeded max size";
        this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE";
      }
    };
    __name(_ResponseExceededMaxSizeError, "ResponseExceededMaxSizeError");
    var ResponseExceededMaxSizeError = _ResponseExceededMaxSizeError;
    module2.exports = {
      HTTPParserError,
      UndiciError,
      HeadersTimeoutError,
      HeadersOverflowError,
      BodyTimeoutError,
      RequestContentLengthMismatchError,
      ConnectTimeoutError,
      ResponseStatusCodeError,
      InvalidArgumentError: InvalidArgumentError2,
      InvalidReturnValueError,
      RequestAbortedError,
      ClientDestroyedError,
      ClientClosedError,
      InformationalError,
      SocketError,
      NotSupportedError,
      ResponseContentLengthMismatchError,
      BalancedPoolMissingUpstreamError,
      ResponseExceededMaxSizeError
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/util.js
var require_util = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/util.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var assert = require("assert");
    var { kDestroyed, kBodyUsed } = require_symbols2();
    var { IncomingMessage } = require("http");
    var stream = require("stream");
    var net = require("net");
    var { InvalidArgumentError: InvalidArgumentError2 } = require_errors();
    var { Blob: Blob2 } = require("buffer");
    var nodeUtil = require("util");
    var { stringify } = require("querystring");
    var [nodeMajor, nodeMinor] = define_process_default.versions.node.split(".").map((v) => Number(v));
    function nop() {
    }
    __name(nop, "nop");
    function isStream(obj) {
      return obj && typeof obj === "object" && typeof obj.pipe === "function" && typeof obj.on === "function";
    }
    __name(isStream, "isStream");
    function isBlobLike(object) {
      return Blob2 && object instanceof Blob2 || object && typeof object === "object" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
    }
    __name(isBlobLike, "isBlobLike");
    function buildURL(url, queryParams) {
      if (url.includes("?") || url.includes("#")) {
        throw new Error('Query params cannot be passed when url already contains "?" or "#".');
      }
      const stringified = stringify(queryParams);
      if (stringified) {
        url += "?" + stringified;
      }
      return url;
    }
    __name(buildURL, "buildURL");
    function parseURL(url) {
      if (typeof url === "string") {
        url = new URL(url);
        if (!/^https?:/.test(url.origin || url.protocol)) {
          throw new InvalidArgumentError2("Invalid URL protocol: the URL must start with \`http:\` or \`https:\`.");
        }
        return url;
      }
      if (!url || typeof url !== "object") {
        throw new InvalidArgumentError2("Invalid URL: The URL argument must be a non-null object.");
      }
      if (url.port != null && url.port !== "" && !Number.isFinite(parseInt(url.port))) {
        throw new InvalidArgumentError2("Invalid URL: port must be a valid integer or a string representation of an integer.");
      }
      if (url.path != null && typeof url.path !== "string") {
        throw new InvalidArgumentError2("Invalid URL path: the path must be a string or null/undefined.");
      }
      if (url.pathname != null && typeof url.pathname !== "string") {
        throw new InvalidArgumentError2("Invalid URL pathname: the pathname must be a string or null/undefined.");
      }
      if (url.hostname != null && typeof url.hostname !== "string") {
        throw new InvalidArgumentError2("Invalid URL hostname: the hostname must be a string or null/undefined.");
      }
      if (url.origin != null && typeof url.origin !== "string") {
        throw new InvalidArgumentError2("Invalid URL origin: the origin must be a string or null/undefined.");
      }
      if (!/^https?:/.test(url.origin || url.protocol)) {
        throw new InvalidArgumentError2("Invalid URL protocol: the URL must start with \`http:\` or \`https:\`.");
      }
      if (!(url instanceof URL)) {
        const port = url.port != null ? url.port : url.protocol === "https:" ? 443 : 80;
        let origin = url.origin != null ? url.origin : \`\${url.protocol}//\${url.hostname}:\${port}\`;
        let path = url.path != null ? url.path : \`\${url.pathname || ""}\${url.search || ""}\`;
        if (origin.endsWith("/")) {
          origin = origin.substring(0, origin.length - 1);
        }
        if (path && !path.startsWith("/")) {
          path = \`/\${path}\`;
        }
        url = new URL(origin + path);
      }
      return url;
    }
    __name(parseURL, "parseURL");
    function parseOrigin(url) {
      url = parseURL(url);
      if (url.pathname !== "/" || url.search || url.hash) {
        throw new InvalidArgumentError2("invalid url");
      }
      return url;
    }
    __name(parseOrigin, "parseOrigin");
    function getHostname(host) {
      if (host[0] === "[") {
        const idx2 = host.indexOf("]");
        assert(idx2 !== -1);
        return host.substr(1, idx2 - 1);
      }
      const idx = host.indexOf(":");
      if (idx === -1)
        return host;
      return host.substr(0, idx);
    }
    __name(getHostname, "getHostname");
    function getServerName(host) {
      if (!host) {
        return null;
      }
      assert.strictEqual(typeof host, "string");
      const servername = getHostname(host);
      if (net.isIP(servername)) {
        return "";
      }
      return servername;
    }
    __name(getServerName, "getServerName");
    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    __name(deepClone, "deepClone");
    function isAsyncIterable(obj) {
      return !!(obj != null && typeof obj[Symbol.asyncIterator] === "function");
    }
    __name(isAsyncIterable, "isAsyncIterable");
    function isIterable(obj) {
      return !!(obj != null && (typeof obj[Symbol.iterator] === "function" || typeof obj[Symbol.asyncIterator] === "function"));
    }
    __name(isIterable, "isIterable");
    function bodyLength(body) {
      if (body == null) {
        return 0;
      } else if (isStream(body)) {
        const state = body._readableState;
        return state && state.ended === true && Number.isFinite(state.length) ? state.length : null;
      } else if (isBlobLike(body)) {
        return body.size != null ? body.size : null;
      } else if (isBuffer(body)) {
        return body.byteLength;
      }
      return null;
    }
    __name(bodyLength, "bodyLength");
    function isDestroyed(stream2) {
      return !stream2 || !!(stream2.destroyed || stream2[kDestroyed]);
    }
    __name(isDestroyed, "isDestroyed");
    function isReadableAborted(stream2) {
      const state = stream2 && stream2._readableState;
      return isDestroyed(stream2) && state && !state.endEmitted;
    }
    __name(isReadableAborted, "isReadableAborted");
    function destroy(stream2, err) {
      if (!isStream(stream2) || isDestroyed(stream2)) {
        return;
      }
      if (typeof stream2.destroy === "function") {
        if (Object.getPrototypeOf(stream2).constructor === IncomingMessage) {
          stream2.socket = null;
        }
        stream2.destroy(err);
      } else if (err) {
        define_process_default.nextTick((stream3, err2) => {
          stream3.emit("error", err2);
        }, stream2, err);
      }
      if (stream2.destroyed !== true) {
        stream2[kDestroyed] = true;
      }
    }
    __name(destroy, "destroy");
    var KEEPALIVE_TIMEOUT_EXPR = /timeout=(\\d+)/;
    function parseKeepAliveTimeout(val) {
      const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
      return m ? parseInt(m[1], 10) * 1e3 : null;
    }
    __name(parseKeepAliveTimeout, "parseKeepAliveTimeout");
    function parseHeaders(headers, obj = {}) {
      for (let i = 0; i < headers.length; i += 2) {
        const key = headers[i].toString().toLowerCase();
        let val = obj[key];
        if (!val) {
          if (Array.isArray(headers[i + 1])) {
            obj[key] = headers[i + 1];
          } else {
            obj[key] = headers[i + 1].toString("utf8");
          }
        } else {
          if (!Array.isArray(val)) {
            val = [val];
            obj[key] = val;
          }
          val.push(headers[i + 1].toString("utf8"));
        }
      }
      if ("content-length" in obj && "content-disposition" in obj) {
        obj["content-disposition"] = Buffer.from(obj["content-disposition"]).toString("latin1");
      }
      return obj;
    }
    __name(parseHeaders, "parseHeaders");
    function parseRawHeaders(headers) {
      const ret = [];
      let hasContentLength = false;
      let contentDispositionIdx = -1;
      for (let n = 0; n < headers.length; n += 2) {
        const key = headers[n + 0].toString();
        const val = headers[n + 1].toString("utf8");
        if (key.length === 14 && (key === "content-length" || key.toLowerCase() === "content-length")) {
          ret.push(key, val);
          hasContentLength = true;
        } else if (key.length === 19 && (key === "content-disposition" || key.toLowerCase() === "content-disposition")) {
          contentDispositionIdx = ret.push(key, val) - 1;
        } else {
          ret.push(key, val);
        }
      }
      if (hasContentLength && contentDispositionIdx !== -1) {
        ret[contentDispositionIdx] = Buffer.from(ret[contentDispositionIdx]).toString("latin1");
      }
      return ret;
    }
    __name(parseRawHeaders, "parseRawHeaders");
    function isBuffer(buffer) {
      return buffer instanceof Uint8Array || Buffer.isBuffer(buffer);
    }
    __name(isBuffer, "isBuffer");
    function validateHandler(handler, method, upgrade) {
      if (!handler || typeof handler !== "object") {
        throw new InvalidArgumentError2("handler must be an object");
      }
      if (typeof handler.onConnect !== "function") {
        throw new InvalidArgumentError2("invalid onConnect method");
      }
      if (typeof handler.onError !== "function") {
        throw new InvalidArgumentError2("invalid onError method");
      }
      if (typeof handler.onBodySent !== "function" && handler.onBodySent !== void 0) {
        throw new InvalidArgumentError2("invalid onBodySent method");
      }
      if (upgrade || method === "CONNECT") {
        if (typeof handler.onUpgrade !== "function") {
          throw new InvalidArgumentError2("invalid onUpgrade method");
        }
      } else {
        if (typeof handler.onHeaders !== "function") {
          throw new InvalidArgumentError2("invalid onHeaders method");
        }
        if (typeof handler.onData !== "function") {
          throw new InvalidArgumentError2("invalid onData method");
        }
        if (typeof handler.onComplete !== "function") {
          throw new InvalidArgumentError2("invalid onComplete method");
        }
      }
    }
    __name(validateHandler, "validateHandler");
    function isDisturbed(body) {
      return !!(body && (stream.isDisturbed ? stream.isDisturbed(body) || body[kBodyUsed] : body[kBodyUsed] || body.readableDidRead || body._readableState && body._readableState.dataEmitted || isReadableAborted(body)));
    }
    __name(isDisturbed, "isDisturbed");
    function isErrored(body) {
      return !!(body && (stream.isErrored ? stream.isErrored(body) : /state: 'errored'/.test(
        nodeUtil.inspect(body)
      )));
    }
    __name(isErrored, "isErrored");
    function isReadable(body) {
      return !!(body && (stream.isReadable ? stream.isReadable(body) : /state: 'readable'/.test(
        nodeUtil.inspect(body)
      )));
    }
    __name(isReadable, "isReadable");
    function getSocketInfo(socket) {
      return {
        localAddress: socket.localAddress,
        localPort: socket.localPort,
        remoteAddress: socket.remoteAddress,
        remotePort: socket.remotePort,
        remoteFamily: socket.remoteFamily,
        timeout: socket.timeout,
        bytesWritten: socket.bytesWritten,
        bytesRead: socket.bytesRead
      };
    }
    __name(getSocketInfo, "getSocketInfo");
    var ReadableStream;
    function ReadableStreamFrom(iterable) {
      if (!ReadableStream) {
        ReadableStream = require("./streams").ReadableStream;
      }
      if (ReadableStream.from) {
        return ReadableStream.from(iterable);
      }
      let iterator;
      return new ReadableStream(
        {
          async start() {
            iterator = iterable[Symbol.asyncIterator]();
          },
          async pull(controller) {
            const { done, value } = await iterator.next();
            if (done) {
              queueMicrotask(() => {
                controller.close();
              });
            } else {
              const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
              controller.enqueue(new Uint8Array(buf));
            }
            return controller.desiredSize > 0;
          },
          async cancel(reason) {
            await iterator.return();
          }
        },
        0
      );
    }
    __name(ReadableStreamFrom, "ReadableStreamFrom");
    function isFormDataLike(object) {
      return object && typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && object[Symbol.toStringTag] === "FormData";
    }
    __name(isFormDataLike, "isFormDataLike");
    function throwIfAborted(signal) {
      if (!signal) {
        return;
      }
      if (typeof signal.throwIfAborted === "function") {
        signal.throwIfAborted();
      } else {
        if (signal.aborted) {
          const err = new Error("The operation was aborted");
          err.name = "AbortError";
          throw err;
        }
      }
    }
    __name(throwIfAborted, "throwIfAborted");
    var events;
    function addAbortListener(signal, listener) {
      if (typeof Symbol.dispose === "symbol") {
        if (!events) {
          events = require("events");
        }
        if (typeof events.addAbortListener === "function" && "aborted" in signal) {
          return events.addAbortListener(signal, listener);
        }
      }
      if ("addEventListener" in signal) {
        signal.addEventListener("abort", listener, { once: true });
        return () => signal.removeEventListener("abort", listener);
      }
      signal.addListener("abort", listener);
      return () => signal.removeListener("abort", listener);
    }
    __name(addAbortListener, "addAbortListener");
    var hasToWellFormed = !!String.prototype.toWellFormed;
    function toUSVString(val) {
      if (hasToWellFormed) {
        return \`\${val}\`.toWellFormed();
      } else if (nodeUtil.toUSVString) {
        return nodeUtil.toUSVString(val);
      }
      return \`\${val}\`;
    }
    __name(toUSVString, "toUSVString");
    var kEnumerableProperty = /* @__PURE__ */ Object.create(null);
    kEnumerableProperty.enumerable = true;
    module2.exports = {
      kEnumerableProperty,
      nop,
      isDisturbed,
      isErrored,
      isReadable,
      toUSVString,
      isReadableAborted,
      isBlobLike,
      parseOrigin,
      parseURL,
      getServerName,
      isStream,
      isIterable,
      isAsyncIterable,
      isDestroyed,
      parseRawHeaders,
      parseHeaders,
      parseKeepAliveTimeout,
      destroy,
      bodyLength,
      deepClone,
      ReadableStreamFrom,
      isBuffer,
      validateHandler,
      getSocketInfo,
      isFormDataLike,
      buildURL,
      throwIfAborted,
      addAbortListener,
      nodeMajor,
      nodeMinor,
      nodeHasAutoSelectFamily: nodeMajor > 18 || nodeMajor === 18 && nodeMinor >= 13
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/constants.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { MessageChannel, receiveMessageOnPort } = require("worker_threads");
    var corsSafeListedMethods = ["GET", "HEAD", "POST"];
    var nullBodyStatus = [101, 204, 205, 304];
    var redirectStatus = [301, 302, 303, 307, 308];
    var badPorts = [
      "1",
      "7",
      "9",
      "11",
      "13",
      "15",
      "17",
      "19",
      "20",
      "21",
      "22",
      "23",
      "25",
      "37",
      "42",
      "43",
      "53",
      "69",
      "77",
      "79",
      "87",
      "95",
      "101",
      "102",
      "103",
      "104",
      "109",
      "110",
      "111",
      "113",
      "115",
      "117",
      "119",
      "123",
      "135",
      "137",
      "139",
      "143",
      "161",
      "179",
      "389",
      "427",
      "465",
      "512",
      "513",
      "514",
      "515",
      "526",
      "530",
      "531",
      "532",
      "540",
      "548",
      "554",
      "556",
      "563",
      "587",
      "601",
      "636",
      "989",
      "990",
      "993",
      "995",
      "1719",
      "1720",
      "1723",
      "2049",
      "3659",
      "4045",
      "5060",
      "5061",
      "6000",
      "6566",
      "6665",
      "6666",
      "6667",
      "6668",
      "6669",
      "6697",
      "10080"
    ];
    var referrerPolicy = [
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ];
    var requestRedirect = ["follow", "manual", "error"];
    var safeMethods = ["GET", "HEAD", "OPTIONS", "TRACE"];
    var requestMode = ["navigate", "same-origin", "no-cors", "cors"];
    var requestCredentials = ["omit", "same-origin", "include"];
    var requestCache = [
      "default",
      "no-store",
      "reload",
      "no-cache",
      "force-cache",
      "only-if-cached"
    ];
    var requestBodyHeader = [
      "content-encoding",
      "content-language",
      "content-location",
      "content-type",
      // See https://github.com/nodejs/undici/issues/2021
      // 'Content-Length' is a forbidden header name, which is typically
      // removed in the Headers implementation. However, undici doesn't
      // filter out headers, so we add it here.
      "content-length"
    ];
    var requestDuplex = [
      "half"
    ];
    var forbiddenMethods = ["CONNECT", "TRACE", "TRACK"];
    var subresource = [
      "audio",
      "audioworklet",
      "font",
      "image",
      "manifest",
      "paintworklet",
      "script",
      "style",
      "track",
      "video",
      "xslt",
      ""
    ];
    var DOMException = globalThis.DOMException ?? (() => {
      try {
        atob("~");
      } catch (err) {
        return Object.getPrototypeOf(err).constructor;
      }
    })();
    var channel;
    var structuredClone = globalThis.structuredClone ?? // https://github.com/nodejs/node/blob/b27ae24dcc4251bad726d9d84baf678d1f707fed/lib/internal/structured_clone.js
    // structuredClone was added in v17.0.0, but fetch supports v16.8
    /* @__PURE__ */ __name(function structuredClone2(value, options = void 0) {
      if (arguments.length === 0) {
        throw new TypeError("missing argument");
      }
      if (!channel) {
        channel = new MessageChannel();
      }
      channel.port1.unref();
      channel.port2.unref();
      channel.port1.postMessage(value, options?.transfer);
      return receiveMessageOnPort(channel.port2).message;
    }, "structuredClone");
    module2.exports = {
      DOMException,
      structuredClone,
      subresource,
      forbiddenMethods,
      requestBodyHeader,
      referrerPolicy,
      requestRedirect,
      requestMode,
      requestCredentials,
      requestCache,
      redirectStatus,
      corsSafeListedMethods,
      nullBodyStatus,
      safeMethods,
      badPorts,
      requestDuplex
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/global.js
var require_global = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/global.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var globalOrigin = Symbol.for("undici.globalOrigin.1");
    function getGlobalOrigin() {
      return globalThis[globalOrigin];
    }
    __name(getGlobalOrigin, "getGlobalOrigin");
    function setGlobalOrigin(newOrigin) {
      if (newOrigin !== void 0 && typeof newOrigin !== "string" && !(newOrigin instanceof URL)) {
        throw new Error("Invalid base url");
      }
      if (newOrigin === void 0) {
        Object.defineProperty(globalThis, globalOrigin, {
          value: void 0,
          writable: true,
          enumerable: false,
          configurable: false
        });
        return;
      }
      const parsedURL = new URL(newOrigin);
      if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
        throw new TypeError(\`Only http & https urls are allowed, received \${parsedURL.protocol}\`);
      }
      Object.defineProperty(globalThis, globalOrigin, {
        value: parsedURL,
        writable: true,
        enumerable: false,
        configurable: false
      });
    }
    __name(setGlobalOrigin, "setGlobalOrigin");
    module2.exports = {
      getGlobalOrigin,
      setGlobalOrigin
    };
  }
});

// src/patches/util-types.js
var require_util_types = __commonJS({
  "src/patches/util-types.js"(exports2, module2) {
    "use strict";
    init_define_process();
    module2.exports = require("util").types;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/util.js
var require_util2 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/util.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { redirectStatus, badPorts, referrerPolicy: referrerPolicyTokens } = require_constants();
    var { getGlobalOrigin } = require_global();
    var { performance: performance2 } = require("perf_hooks");
    var { isBlobLike, toUSVString, ReadableStreamFrom } = require_util();
    var assert = require("assert");
    var { isUint8Array } = require_util_types();
    var crypto;
    try {
      crypto = require("crypto");
    } catch {
    }
    function responseURL(response) {
      const urlList = response.urlList;
      const length = urlList.length;
      return length === 0 ? null : urlList[length - 1].toString();
    }
    __name(responseURL, "responseURL");
    function responseLocationURL(response, requestFragment) {
      if (!redirectStatus.includes(response.status)) {
        return null;
      }
      let location = response.headersList.get("location");
      if (location !== null && isValidHeaderValue(location)) {
        location = new URL(location, responseURL(response));
      }
      if (location && !location.hash) {
        location.hash = requestFragment;
      }
      return location;
    }
    __name(responseLocationURL, "responseLocationURL");
    function requestCurrentURL(request) {
      return request.urlList[request.urlList.length - 1];
    }
    __name(requestCurrentURL, "requestCurrentURL");
    function requestBadPort(request) {
      const url = requestCurrentURL(request);
      if (urlIsHttpHttpsScheme(url) && badPorts.includes(url.port)) {
        return "blocked";
      }
      return "allowed";
    }
    __name(requestBadPort, "requestBadPort");
    function isErrorLike(object) {
      return object instanceof Error || (object?.constructor?.name === "Error" || object?.constructor?.name === "DOMException");
    }
    __name(isErrorLike, "isErrorLike");
    function isValidReasonPhrase(statusText) {
      for (let i = 0; i < statusText.length; ++i) {
        const c = statusText.charCodeAt(i);
        if (!(c === 9 || // HTAB
        c >= 32 && c <= 126 || // SP / VCHAR
        c >= 128 && c <= 255)) {
          return false;
        }
      }
      return true;
    }
    __name(isValidReasonPhrase, "isValidReasonPhrase");
    function isTokenChar(c) {
      return !(c >= 127 || c <= 32 || c === "(" || c === ")" || c === "<" || c === ">" || c === "@" || c === "," || c === ";" || c === ":" || c === "\\\\" || c === '"' || c === "/" || c === "[" || c === "]" || c === "?" || c === "=" || c === "{" || c === "}");
    }
    __name(isTokenChar, "isTokenChar");
    function isValidHTTPToken(characters) {
      if (!characters || typeof characters !== "string") {
        return false;
      }
      for (let i = 0; i < characters.length; ++i) {
        const c = characters.charCodeAt(i);
        if (c > 127 || !isTokenChar(c)) {
          return false;
        }
      }
      return true;
    }
    __name(isValidHTTPToken, "isValidHTTPToken");
    function isValidHeaderName2(potentialValue) {
      if (potentialValue.length === 0) {
        return false;
      }
      return isValidHTTPToken(potentialValue);
    }
    __name(isValidHeaderName2, "isValidHeaderName");
    function isValidHeaderValue(potentialValue) {
      if (potentialValue.startsWith("	") || potentialValue.startsWith(" ") || potentialValue.endsWith("	") || potentialValue.endsWith(" ")) {
        return false;
      }
      if (potentialValue.includes("\\0") || potentialValue.includes("\\r") || potentialValue.includes("\\n")) {
        return false;
      }
      return true;
    }
    __name(isValidHeaderValue, "isValidHeaderValue");
    function setRequestReferrerPolicyOnRedirect(request, actualResponse) {
      const { headersList } = actualResponse;
      const policyHeader = (headersList.get("referrer-policy") ?? "").split(",");
      let policy = "";
      if (policyHeader.length > 0) {
        for (let i = policyHeader.length; i !== 0; i--) {
          const token = policyHeader[i - 1].trim();
          if (referrerPolicyTokens.includes(token)) {
            policy = token;
            break;
          }
        }
      }
      if (policy !== "") {
        request.referrerPolicy = policy;
      }
    }
    __name(setRequestReferrerPolicyOnRedirect, "setRequestReferrerPolicyOnRedirect");
    function crossOriginResourcePolicyCheck() {
      return "allowed";
    }
    __name(crossOriginResourcePolicyCheck, "crossOriginResourcePolicyCheck");
    function corsCheck() {
      return "success";
    }
    __name(corsCheck, "corsCheck");
    function TAOCheck() {
      return "success";
    }
    __name(TAOCheck, "TAOCheck");
    function appendFetchMetadata(httpRequest) {
      let header = null;
      header = httpRequest.mode;
      httpRequest.headersList.set("sec-fetch-mode", header);
    }
    __name(appendFetchMetadata, "appendFetchMetadata");
    function appendRequestOriginHeader(request) {
      let serializedOrigin = request.origin;
      if (request.responseTainting === "cors" || request.mode === "websocket") {
        if (serializedOrigin) {
          request.headersList.append("origin", serializedOrigin);
        }
      } else if (request.method !== "GET" && request.method !== "HEAD") {
        switch (request.referrerPolicy) {
          case "no-referrer":
            serializedOrigin = null;
            break;
          case "no-referrer-when-downgrade":
          case "strict-origin":
          case "strict-origin-when-cross-origin":
            if (request.origin && urlHasHttpsScheme(request.origin) && !urlHasHttpsScheme(requestCurrentURL(request))) {
              serializedOrigin = null;
            }
            break;
          case "same-origin":
            if (!sameOrigin(request, requestCurrentURL(request))) {
              serializedOrigin = null;
            }
            break;
          default:
        }
        if (serializedOrigin) {
          request.headersList.append("origin", serializedOrigin);
        }
      }
    }
    __name(appendRequestOriginHeader, "appendRequestOriginHeader");
    function coarsenedSharedCurrentTime(crossOriginIsolatedCapability) {
      return performance2.now();
    }
    __name(coarsenedSharedCurrentTime, "coarsenedSharedCurrentTime");
    function createOpaqueTimingInfo(timingInfo) {
      return {
        startTime: timingInfo.startTime ?? 0,
        redirectStartTime: 0,
        redirectEndTime: 0,
        postRedirectStartTime: timingInfo.startTime ?? 0,
        finalServiceWorkerStartTime: 0,
        finalNetworkResponseStartTime: 0,
        finalNetworkRequestStartTime: 0,
        endTime: 0,
        encodedBodySize: 0,
        decodedBodySize: 0,
        finalConnectionTimingInfo: null
      };
    }
    __name(createOpaqueTimingInfo, "createOpaqueTimingInfo");
    function makePolicyContainer() {
      return {
        referrerPolicy: "strict-origin-when-cross-origin"
      };
    }
    __name(makePolicyContainer, "makePolicyContainer");
    function clonePolicyContainer(policyContainer) {
      return {
        referrerPolicy: policyContainer.referrerPolicy
      };
    }
    __name(clonePolicyContainer, "clonePolicyContainer");
    function determineRequestsReferrer(request) {
      const policy = request.referrerPolicy;
      assert(policy);
      let referrerSource = null;
      if (request.referrer === "client") {
        const globalOrigin = getGlobalOrigin();
        if (!globalOrigin || globalOrigin.origin === "null") {
          return "no-referrer";
        }
        referrerSource = new URL(globalOrigin);
      } else if (request.referrer instanceof URL) {
        referrerSource = request.referrer;
      }
      let referrerURL = stripURLForReferrer(referrerSource);
      const referrerOrigin = stripURLForReferrer(referrerSource, true);
      if (referrerURL.toString().length > 4096) {
        referrerURL = referrerOrigin;
      }
      const areSameOrigin = sameOrigin(request, referrerURL);
      const isNonPotentiallyTrustWorthy = isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(request.url);
      switch (policy) {
        case "origin":
          return referrerOrigin != null ? referrerOrigin : stripURLForReferrer(referrerSource, true);
        case "unsafe-url":
          return referrerURL;
        case "same-origin":
          return areSameOrigin ? referrerOrigin : "no-referrer";
        case "origin-when-cross-origin":
          return areSameOrigin ? referrerURL : referrerOrigin;
        case "strict-origin-when-cross-origin": {
          const currentURL = requestCurrentURL(request);
          if (sameOrigin(referrerURL, currentURL)) {
            return referrerURL;
          }
          if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) {
            return "no-referrer";
          }
          return referrerOrigin;
        }
        case "strict-origin":
        case "no-referrer-when-downgrade":
        default:
          return isNonPotentiallyTrustWorthy ? "no-referrer" : referrerOrigin;
      }
    }
    __name(determineRequestsReferrer, "determineRequestsReferrer");
    function stripURLForReferrer(url, originOnly) {
      assert(url instanceof URL);
      if (url.protocol === "file:" || url.protocol === "about:" || url.protocol === "blank:") {
        return "no-referrer";
      }
      url.username = "";
      url.password = "";
      url.hash = "";
      if (originOnly) {
        url.pathname = "";
        url.search = "";
      }
      return url;
    }
    __name(stripURLForReferrer, "stripURLForReferrer");
    function isURLPotentiallyTrustworthy(url) {
      if (!(url instanceof URL)) {
        return false;
      }
      if (url.href === "about:blank" || url.href === "about:srcdoc") {
        return true;
      }
      if (url.protocol === "data:")
        return true;
      if (url.protocol === "file:")
        return true;
      return isOriginPotentiallyTrustworthy(url.origin);
      function isOriginPotentiallyTrustworthy(origin) {
        if (origin == null || origin === "null")
          return false;
        const originAsURL = new URL(origin);
        if (originAsURL.protocol === "https:" || originAsURL.protocol === "wss:") {
          return true;
        }
        if (/^127(?:\\.[0-9]+){0,2}\\.[0-9]+$|^\\[(?:0*:)*?:?0*1\\]$/.test(originAsURL.hostname) || (originAsURL.hostname === "localhost" || originAsURL.hostname.includes("localhost.")) || originAsURL.hostname.endsWith(".localhost")) {
          return true;
        }
        return false;
      }
      __name(isOriginPotentiallyTrustworthy, "isOriginPotentiallyTrustworthy");
    }
    __name(isURLPotentiallyTrustworthy, "isURLPotentiallyTrustworthy");
    function bytesMatch(bytes, metadataList) {
      if (crypto === void 0) {
        return true;
      }
      const parsedMetadata = parseMetadata(metadataList);
      if (parsedMetadata === "no metadata") {
        return true;
      }
      if (parsedMetadata.length === 0) {
        return true;
      }
      const list = parsedMetadata.sort((c, d) => d.algo.localeCompare(c.algo));
      const strongest = list[0].algo;
      const metadata = list.filter((item) => item.algo === strongest);
      for (const item of metadata) {
        const algorithm = item.algo;
        const expectedValue = item.hash;
        const actualValue = crypto.createHash(algorithm).update(bytes).digest("base64");
        if (actualValue === expectedValue) {
          return true;
        }
      }
      return false;
    }
    __name(bytesMatch, "bytesMatch");
    var parseHashWithOptions = /((?<algo>sha256|sha384|sha512)-(?<hash>[A-z0-9+/]{1}.*={0,2}))( +[\\x21-\\x7e]?)?/i;
    function parseMetadata(metadata) {
      const result = [];
      let empty = true;
      const supportedHashes = crypto.getHashes();
      for (const token of metadata.split(" ")) {
        empty = false;
        const parsedToken = parseHashWithOptions.exec(token);
        if (parsedToken === null || parsedToken.groups === void 0) {
          continue;
        }
        const algorithm = parsedToken.groups.algo;
        if (supportedHashes.includes(algorithm.toLowerCase())) {
          result.push(parsedToken.groups);
        }
      }
      if (empty === true) {
        return "no metadata";
      }
      return result;
    }
    __name(parseMetadata, "parseMetadata");
    function tryUpgradeRequestToAPotentiallyTrustworthyURL(request) {
    }
    __name(tryUpgradeRequestToAPotentiallyTrustworthyURL, "tryUpgradeRequestToAPotentiallyTrustworthyURL");
    function sameOrigin(A, B) {
      if (A.origin === B.origin && A.origin === "null") {
        return true;
      }
      if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
        return true;
      }
      return false;
    }
    __name(sameOrigin, "sameOrigin");
    function createDeferredPromise() {
      let res;
      let rej;
      const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      return { promise, resolve: res, reject: rej };
    }
    __name(createDeferredPromise, "createDeferredPromise");
    function isAborted(fetchParams) {
      return fetchParams.controller.state === "aborted";
    }
    __name(isAborted, "isAborted");
    function isCancelled(fetchParams) {
      return fetchParams.controller.state === "aborted" || fetchParams.controller.state === "terminated";
    }
    __name(isCancelled, "isCancelled");
    function normalizeMethod(method) {
      return /^(DELETE|GET|HEAD|OPTIONS|POST|PUT)$/i.test(method) ? method.toUpperCase() : method;
    }
    __name(normalizeMethod, "normalizeMethod");
    function serializeJavascriptValueToJSONString(value) {
      const result = JSON.stringify(value);
      if (result === void 0) {
        throw new TypeError("Value is not JSON serializable");
      }
      assert(typeof result === "string");
      return result;
    }
    __name(serializeJavascriptValueToJSONString, "serializeJavascriptValueToJSONString");
    var esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
    function makeIterator(iterator, name, kind) {
      const object = {
        index: 0,
        kind,
        target: iterator
      };
      const i = {
        next() {
          if (Object.getPrototypeOf(this) !== i) {
            throw new TypeError(
              \`'next' called on an object that does not implement interface \${name} Iterator.\`
            );
          }
          const { index, kind: kind2, target } = object;
          const values = target();
          const len = values.length;
          if (index >= len) {
            return { value: void 0, done: true };
          }
          const pair = values[index];
          object.index = index + 1;
          return iteratorResult(pair, kind2);
        },
        // The class string of an iterator prototype object for a given interface is the
        // result of concatenating the identifier of the interface and the string " Iterator".
        [Symbol.toStringTag]: \`\${name} Iterator\`
      };
      Object.setPrototypeOf(i, esIteratorPrototype);
      return Object.setPrototypeOf({}, i);
    }
    __name(makeIterator, "makeIterator");
    function iteratorResult(pair, kind) {
      let result;
      switch (kind) {
        case "key": {
          result = pair[0];
          break;
        }
        case "value": {
          result = pair[1];
          break;
        }
        case "key+value": {
          result = pair;
          break;
        }
      }
      return { value: result, done: false };
    }
    __name(iteratorResult, "iteratorResult");
    function fullyReadBody(body, processBody, processBodyError) {
      const successSteps = /* @__PURE__ */ __name((bytes) => queueMicrotask(() => processBody(bytes)), "successSteps");
      const errorSteps = /* @__PURE__ */ __name((error) => queueMicrotask(() => processBodyError(error)), "errorSteps");
      let reader;
      try {
        reader = body.stream.getReader();
      } catch (e) {
        errorSteps(e);
        return;
      }
      readAllBytes(reader, successSteps, errorSteps);
    }
    __name(fullyReadBody, "fullyReadBody");
    var ReadableStream = globalThis.ReadableStream;
    function isReadableStreamLike(stream) {
      if (!ReadableStream) {
        ReadableStream = require("./streams").ReadableStream;
      }
      return stream instanceof ReadableStream || stream[Symbol.toStringTag] === "ReadableStream" && typeof stream.tee === "function";
    }
    __name(isReadableStreamLike, "isReadableStreamLike");
    var MAXIMUM_ARGUMENT_LENGTH = 65535;
    function isomorphicDecode(input) {
      if (input.length < MAXIMUM_ARGUMENT_LENGTH) {
        return String.fromCharCode(...input);
      }
      return input.reduce((previous, current) => previous + String.fromCharCode(current), "");
    }
    __name(isomorphicDecode, "isomorphicDecode");
    function readableStreamClose(controller) {
      try {
        controller.close();
      } catch (err) {
        if (!err.message.includes("Controller is already closed")) {
          throw err;
        }
      }
    }
    __name(readableStreamClose, "readableStreamClose");
    function isomorphicEncode(input) {
      for (let i = 0; i < input.length; i++) {
        assert(input.charCodeAt(i) <= 255);
      }
      return input;
    }
    __name(isomorphicEncode, "isomorphicEncode");
    async function readAllBytes(reader, successSteps, failureSteps) {
      const bytes = [];
      let byteLength = 0;
      while (true) {
        let done;
        let chunk;
        try {
          ({ done, value: chunk } = await reader.read());
        } catch (e) {
          failureSteps(e);
          return;
        }
        if (done) {
          successSteps(Buffer.concat(bytes, byteLength));
          return;
        }
        if (!isUint8Array(chunk)) {
          failureSteps(new TypeError("Received non-Uint8Array chunk"));
          return;
        }
        bytes.push(chunk);
        byteLength += chunk.length;
      }
    }
    __name(readAllBytes, "readAllBytes");
    function urlIsLocal(url) {
      assert("protocol" in url);
      const protocol = url.protocol;
      return protocol === "about:" || protocol === "blob:" || protocol === "data:";
    }
    __name(urlIsLocal, "urlIsLocal");
    function urlHasHttpsScheme(url) {
      if (typeof url === "string") {
        return url.startsWith("https:");
      }
      return url.protocol === "https:";
    }
    __name(urlHasHttpsScheme, "urlHasHttpsScheme");
    function urlIsHttpHttpsScheme(url) {
      assert("protocol" in url);
      const protocol = url.protocol;
      return protocol === "http:" || protocol === "https:";
    }
    __name(urlIsHttpHttpsScheme, "urlIsHttpHttpsScheme");
    var hasOwn = Object.hasOwn || ((dict, key) => Object.prototype.hasOwnProperty.call(dict, key));
    module2.exports = {
      isAborted,
      isCancelled,
      createDeferredPromise,
      ReadableStreamFrom,
      toUSVString,
      tryUpgradeRequestToAPotentiallyTrustworthyURL,
      coarsenedSharedCurrentTime,
      determineRequestsReferrer,
      makePolicyContainer,
      clonePolicyContainer,
      appendFetchMetadata,
      appendRequestOriginHeader,
      TAOCheck,
      corsCheck,
      crossOriginResourcePolicyCheck,
      createOpaqueTimingInfo,
      setRequestReferrerPolicyOnRedirect,
      isValidHTTPToken,
      requestBadPort,
      requestCurrentURL,
      responseURL,
      responseLocationURL,
      isBlobLike,
      isURLPotentiallyTrustworthy,
      isValidReasonPhrase,
      sameOrigin,
      normalizeMethod,
      serializeJavascriptValueToJSONString,
      makeIterator,
      isValidHeaderName: isValidHeaderName2,
      isValidHeaderValue,
      hasOwn,
      isErrorLike,
      fullyReadBody,
      bytesMatch,
      isReadableStreamLike,
      readableStreamClose,
      isomorphicEncode,
      isomorphicDecode,
      urlIsLocal,
      urlHasHttpsScheme,
      urlIsHttpHttpsScheme,
      readAllBytes
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/webidl.js
var require_webidl = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/webidl.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { types } = require("util");
    var { hasOwn, toUSVString } = require_util2();
    var webidl = {};
    webidl.converters = {};
    webidl.util = {};
    webidl.errors = {};
    webidl.errors.exception = function(message) {
      return new TypeError(\`\${message.header}: \${message.message}\`);
    };
    webidl.errors.conversionFailed = function(context) {
      const plural = context.types.length === 1 ? "" : " one of";
      const message = \`\${context.argument} could not be converted to\${plural}: \${context.types.join(", ")}.\`;
      return webidl.errors.exception({
        header: context.prefix,
        message
      });
    };
    webidl.errors.invalidArgument = function(context) {
      return webidl.errors.exception({
        header: context.prefix,
        message: \`"\${context.value}" is an invalid \${context.type}.\`
      });
    };
    webidl.brandCheck = function(V, I, opts = void 0) {
      if (opts?.strict !== false && !(V instanceof I)) {
        throw new TypeError("Illegal invocation");
      } else {
        return V?.[Symbol.toStringTag] === I.prototype[Symbol.toStringTag];
      }
    };
    webidl.argumentLengthCheck = function({ length }, min, ctx) {
      if (length < min) {
        throw webidl.errors.exception({
          message: \`\${min} argument\${min !== 1 ? "s" : ""} required, but\${length ? " only" : ""} \${length} found.\`,
          ...ctx
        });
      }
    };
    webidl.illegalConstructor = function() {
      throw webidl.errors.exception({
        header: "TypeError",
        message: "Illegal constructor"
      });
    };
    webidl.util.Type = function(V) {
      switch (typeof V) {
        case "undefined":
          return "Undefined";
        case "boolean":
          return "Boolean";
        case "string":
          return "String";
        case "symbol":
          return "Symbol";
        case "number":
          return "Number";
        case "bigint":
          return "BigInt";
        case "function":
        case "object": {
          if (V === null) {
            return "Null";
          }
          return "Object";
        }
      }
    };
    webidl.util.ConvertToInt = function(V, bitLength, signedness, opts = {}) {
      let upperBound;
      let lowerBound;
      if (bitLength === 64) {
        upperBound = Math.pow(2, 53) - 1;
        if (signedness === "unsigned") {
          lowerBound = 0;
        } else {
          lowerBound = Math.pow(-2, 53) + 1;
        }
      } else if (signedness === "unsigned") {
        lowerBound = 0;
        upperBound = Math.pow(2, bitLength) - 1;
      } else {
        lowerBound = Math.pow(-2, bitLength) - 1;
        upperBound = Math.pow(2, bitLength - 1) - 1;
      }
      let x = Number(V);
      if (x === 0) {
        x = 0;
      }
      if (opts.enforceRange === true) {
        if (Number.isNaN(x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
          throw webidl.errors.exception({
            header: "Integer conversion",
            message: \`Could not convert \${V} to an integer.\`
          });
        }
        x = webidl.util.IntegerPart(x);
        if (x < lowerBound || x > upperBound) {
          throw webidl.errors.exception({
            header: "Integer conversion",
            message: \`Value must be between \${lowerBound}-\${upperBound}, got \${x}.\`
          });
        }
        return x;
      }
      if (!Number.isNaN(x) && opts.clamp === true) {
        x = Math.min(Math.max(x, lowerBound), upperBound);
        if (Math.floor(x) % 2 === 0) {
          x = Math.floor(x);
        } else {
          x = Math.ceil(x);
        }
        return x;
      }
      if (Number.isNaN(x) || x === 0 && Object.is(0, x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
        return 0;
      }
      x = webidl.util.IntegerPart(x);
      x = x % Math.pow(2, bitLength);
      if (signedness === "signed" && x >= Math.pow(2, bitLength) - 1) {
        return x - Math.pow(2, bitLength);
      }
      return x;
    };
    webidl.util.IntegerPart = function(n) {
      const r = Math.floor(Math.abs(n));
      if (n < 0) {
        return -1 * r;
      }
      return r;
    };
    webidl.sequenceConverter = function(converter) {
      return (V) => {
        if (webidl.util.Type(V) !== "Object") {
          throw webidl.errors.exception({
            header: "Sequence",
            message: \`Value of type \${webidl.util.Type(V)} is not an Object.\`
          });
        }
        const method = V?.[Symbol.iterator]?.();
        const seq = [];
        if (method === void 0 || typeof method.next !== "function") {
          throw webidl.errors.exception({
            header: "Sequence",
            message: "Object is not an iterator."
          });
        }
        while (true) {
          const { done, value } = method.next();
          if (done) {
            break;
          }
          seq.push(converter(value));
        }
        return seq;
      };
    };
    webidl.recordConverter = function(keyConverter, valueConverter) {
      return (O) => {
        if (webidl.util.Type(O) !== "Object") {
          throw webidl.errors.exception({
            header: "Record",
            message: \`Value of type \${webidl.util.Type(O)} is not an Object.\`
          });
        }
        const result = {};
        if (!types.isProxy(O)) {
          const keys2 = Object.keys(O);
          for (const key of keys2) {
            const typedKey = keyConverter(key);
            const typedValue = valueConverter(O[key]);
            result[typedKey] = typedValue;
          }
          return result;
        }
        const keys = Reflect.ownKeys(O);
        for (const key of keys) {
          const desc = Reflect.getOwnPropertyDescriptor(O, key);
          if (desc?.enumerable) {
            const typedKey = keyConverter(key);
            const typedValue = valueConverter(O[key]);
            result[typedKey] = typedValue;
          }
        }
        return result;
      };
    };
    webidl.interfaceConverter = function(i) {
      return (V, opts = {}) => {
        if (opts.strict !== false && !(V instanceof i)) {
          throw webidl.errors.exception({
            header: i.name,
            message: \`Expected \${V} to be an instance of \${i.name}.\`
          });
        }
        return V;
      };
    };
    webidl.dictionaryConverter = function(converters) {
      return (dictionary) => {
        const type = webidl.util.Type(dictionary);
        const dict = {};
        if (type === "Null" || type === "Undefined") {
          return dict;
        } else if (type !== "Object") {
          throw webidl.errors.exception({
            header: "Dictionary",
            message: \`Expected \${dictionary} to be one of: Null, Undefined, Object.\`
          });
        }
        for (const options of converters) {
          const { key, defaultValue, required, converter } = options;
          if (required === true) {
            if (!hasOwn(dictionary, key)) {
              throw webidl.errors.exception({
                header: "Dictionary",
                message: \`Missing required key "\${key}".\`
              });
            }
          }
          let value = dictionary[key];
          const hasDefault = hasOwn(options, "defaultValue");
          if (hasDefault && value !== null) {
            value = value ?? defaultValue;
          }
          if (required || hasDefault || value !== void 0) {
            value = converter(value);
            if (options.allowedValues && !options.allowedValues.includes(value)) {
              throw webidl.errors.exception({
                header: "Dictionary",
                message: \`\${value} is not an accepted type. Expected one of \${options.allowedValues.join(", ")}.\`
              });
            }
            dict[key] = value;
          }
        }
        return dict;
      };
    };
    webidl.nullableConverter = function(converter) {
      return (V) => {
        if (V === null) {
          return V;
        }
        return converter(V);
      };
    };
    webidl.converters.DOMString = function(V, opts = {}) {
      if (V === null && opts.legacyNullToEmptyString) {
        return "";
      }
      if (typeof V === "symbol") {
        throw new TypeError("Could not convert argument of type symbol to string.");
      }
      return String(V);
    };
    webidl.converters.ByteString = function(V) {
      const x = webidl.converters.DOMString(V);
      for (let index = 0; index < x.length; index++) {
        const charCode = x.charCodeAt(index);
        if (charCode > 255) {
          throw new TypeError(
            \`Cannot convert argument to a ByteString because the character at index \${index} has a value of \${charCode} which is greater than 255.\`
          );
        }
      }
      return x;
    };
    webidl.converters.USVString = toUSVString;
    webidl.converters.boolean = function(V) {
      const x = Boolean(V);
      return x;
    };
    webidl.converters.any = function(V) {
      return V;
    };
    webidl.converters["long long"] = function(V) {
      const x = webidl.util.ConvertToInt(V, 64, "signed");
      return x;
    };
    webidl.converters["unsigned long long"] = function(V) {
      const x = webidl.util.ConvertToInt(V, 64, "unsigned");
      return x;
    };
    webidl.converters["unsigned long"] = function(V) {
      const x = webidl.util.ConvertToInt(V, 32, "unsigned");
      return x;
    };
    webidl.converters["unsigned short"] = function(V, opts) {
      const x = webidl.util.ConvertToInt(V, 16, "unsigned", opts);
      return x;
    };
    webidl.converters.ArrayBuffer = function(V, opts = {}) {
      if (webidl.util.Type(V) !== "Object" || !types.isAnyArrayBuffer(V)) {
        throw webidl.errors.conversionFailed({
          prefix: \`\${V}\`,
          argument: \`\${V}\`,
          types: ["ArrayBuffer"]
        });
      }
      if (opts.allowShared === false && types.isSharedArrayBuffer(V)) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "SharedArrayBuffer is not allowed."
        });
      }
      return V;
    };
    webidl.converters.TypedArray = function(V, T, opts = {}) {
      if (webidl.util.Type(V) !== "Object" || !types.isTypedArray(V) || V.constructor.name !== T.name) {
        throw webidl.errors.conversionFailed({
          prefix: \`\${T.name}\`,
          argument: \`\${V}\`,
          types: [T.name]
        });
      }
      if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "SharedArrayBuffer is not allowed."
        });
      }
      return V;
    };
    webidl.converters.DataView = function(V, opts = {}) {
      if (webidl.util.Type(V) !== "Object" || !types.isDataView(V)) {
        throw webidl.errors.exception({
          header: "DataView",
          message: "Object is not a DataView."
        });
      }
      if (opts.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "SharedArrayBuffer is not allowed."
        });
      }
      return V;
    };
    webidl.converters.BufferSource = function(V, opts = {}) {
      if (types.isAnyArrayBuffer(V)) {
        return webidl.converters.ArrayBuffer(V, opts);
      }
      if (types.isTypedArray(V)) {
        return webidl.converters.TypedArray(V, V.constructor);
      }
      if (types.isDataView(V)) {
        return webidl.converters.DataView(V, opts);
      }
      throw new TypeError(\`Could not convert \${V} to a BufferSource.\`);
    };
    webidl.converters["sequence<ByteString>"] = webidl.sequenceConverter(
      webidl.converters.ByteString
    );
    webidl.converters["sequence<sequence<ByteString>>"] = webidl.sequenceConverter(
      webidl.converters["sequence<ByteString>"]
    );
    webidl.converters["record<ByteString, ByteString>"] = webidl.recordConverter(
      webidl.converters.ByteString,
      webidl.converters.ByteString
    );
    module2.exports = {
      webidl
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/headers.js
var require_headers = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/headers.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { kHeadersList } = require_symbols2();
    var { kGuard: kGuard2 } = require_symbols();
    var { kEnumerableProperty } = require_util();
    var {
      makeIterator,
      isValidHeaderName: isValidHeaderName2,
      isValidHeaderValue
    } = require_util2();
    var { webidl } = require_webidl();
    var assert = require("assert");
    var kHeadersMap = Symbol("headers map");
    var kHeadersSortedMap = Symbol("headers map sorted");
    function headerValueNormalize(potentialValue) {
      let i = potentialValue.length;
      while (/[\\r\\n\\t ]/.test(potentialValue.charAt(--i)))
        ;
      return potentialValue.slice(0, i + 1).replace(/^[\\r\\n\\t ]+/, "");
    }
    __name(headerValueNormalize, "headerValueNormalize");
    function fill(headers, object) {
      if (Array.isArray(object)) {
        for (const header of object) {
          if (header.length !== 2) {
            throw webidl.errors.exception({
              header: "Headers constructor",
              message: \`expected name/value pair to be length 2, found \${header.length}.\`
            });
          }
          headers.append(header[0], header[1]);
        }
      } else if (typeof object === "object" && object !== null) {
        for (const [key, value] of Object.entries(object)) {
          headers.append(key, value);
        }
      } else {
        throw webidl.errors.conversionFailed({
          prefix: "Headers constructor",
          argument: "Argument 1",
          types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
        });
      }
    }
    __name(fill, "fill");
    var _HeadersList = class _HeadersList {
      /** @type {[string, string][]|null} */
      cookies = null;
      constructor(init) {
        if (init instanceof _HeadersList) {
          this[kHeadersMap] = new Map(init[kHeadersMap]);
          this[kHeadersSortedMap] = init[kHeadersSortedMap];
          this.cookies = init.cookies;
        } else {
          this[kHeadersMap] = new Map(init);
          this[kHeadersSortedMap] = null;
        }
      }
      // https://fetch.spec.whatwg.org/#header-list-contains
      contains(name) {
        name = name.toLowerCase();
        return this[kHeadersMap].has(name);
      }
      clear() {
        this[kHeadersMap].clear();
        this[kHeadersSortedMap] = null;
        this.cookies = null;
      }
      // https://fetch.spec.whatwg.org/#concept-header-list-append
      append(name, value) {
        this[kHeadersSortedMap] = null;
        const lowercaseName = name.toLowerCase();
        const exists = this[kHeadersMap].get(lowercaseName);
        if (exists) {
          const delimiter = lowercaseName === "cookie" ? "; " : ", ";
          this[kHeadersMap].set(lowercaseName, {
            name: exists.name,
            value: \`\${exists.value}\${delimiter}\${value}\`
          });
        } else {
          this[kHeadersMap].set(lowercaseName, { name, value });
        }
        if (lowercaseName === "set-cookie") {
          this.cookies ??= [];
          this.cookies.push(value);
        }
      }
      // https://fetch.spec.whatwg.org/#concept-header-list-set
      set(name, value) {
        this[kHeadersSortedMap] = null;
        const lowercaseName = name.toLowerCase();
        if (lowercaseName === "set-cookie") {
          this.cookies = [value];
        }
        return this[kHeadersMap].set(lowercaseName, { name, value });
      }
      // https://fetch.spec.whatwg.org/#concept-header-list-delete
      delete(name) {
        this[kHeadersSortedMap] = null;
        name = name.toLowerCase();
        if (name === "set-cookie") {
          this.cookies = null;
        }
        return this[kHeadersMap].delete(name);
      }
      // https://fetch.spec.whatwg.org/#concept-header-list-get
      get(name) {
        if (!this.contains(name)) {
          return null;
        }
        return this[kHeadersMap].get(name.toLowerCase())?.value ?? null;
      }
      *[Symbol.iterator]() {
        for (const [name, { value }] of this[kHeadersMap]) {
          yield [name, value];
        }
      }
      get entries() {
        const headers = {};
        if (this[kHeadersMap].size) {
          for (const { name, value } of this[kHeadersMap].values()) {
            headers[name] = value;
          }
        }
        return headers;
      }
    };
    __name(_HeadersList, "HeadersList");
    var HeadersList = _HeadersList;
    var _Headers = class _Headers {
      constructor(init = void 0) {
        this[kHeadersList] = new HeadersList();
        this[kGuard2] = "none";
        if (init !== void 0) {
          init = webidl.converters.HeadersInit(init);
          fill(this, init);
        }
      }
      // https://fetch.spec.whatwg.org/#dom-headers-append
      append(name, value) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 2, { header: "Headers.append" });
        name = webidl.converters.ByteString(name);
        value = webidl.converters.ByteString(value);
        value = headerValueNormalize(value);
        if (!isValidHeaderName2(name)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.append",
            value: name,
            type: "header name"
          });
        } else if (!isValidHeaderValue(value)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.append",
            value,
            type: "header value"
          });
        }
        if (this[kGuard2] === "immutable") {
          throw new TypeError("immutable");
        } else if (this[kGuard2] === "request-no-cors") {
        }
        return this[kHeadersList].append(name, value);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-delete
      delete(name) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 1, { header: "Headers.delete" });
        name = webidl.converters.ByteString(name);
        if (!isValidHeaderName2(name)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.delete",
            value: name,
            type: "header name"
          });
        }
        if (this[kGuard2] === "immutable") {
          throw new TypeError("immutable");
        } else if (this[kGuard2] === "request-no-cors") {
        }
        if (!this[kHeadersList].contains(name)) {
          return;
        }
        return this[kHeadersList].delete(name);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-get
      get(name) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 1, { header: "Headers.get" });
        name = webidl.converters.ByteString(name);
        if (!isValidHeaderName2(name)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.get",
            value: name,
            type: "header name"
          });
        }
        return this[kHeadersList].get(name);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-has
      has(name) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 1, { header: "Headers.has" });
        name = webidl.converters.ByteString(name);
        if (!isValidHeaderName2(name)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.has",
            value: name,
            type: "header name"
          });
        }
        return this[kHeadersList].contains(name);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-set
      set(name, value) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 2, { header: "Headers.set" });
        name = webidl.converters.ByteString(name);
        value = webidl.converters.ByteString(value);
        value = headerValueNormalize(value);
        if (!isValidHeaderName2(name)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.set",
            value: name,
            type: "header name"
          });
        } else if (!isValidHeaderValue(value)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.set",
            value,
            type: "header value"
          });
        }
        if (this[kGuard2] === "immutable") {
          throw new TypeError("immutable");
        } else if (this[kGuard2] === "request-no-cors") {
        }
        return this[kHeadersList].set(name, value);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-getsetcookie
      getSetCookie() {
        webidl.brandCheck(this, _Headers);
        const list = this[kHeadersList].cookies;
        if (list) {
          return [...list];
        }
        return [];
      }
      // https://fetch.spec.whatwg.org/#concept-header-list-sort-and-combine
      get [kHeadersSortedMap]() {
        if (this[kHeadersList][kHeadersSortedMap]) {
          return this[kHeadersList][kHeadersSortedMap];
        }
        const headers = [];
        const names = [...this[kHeadersList]].sort((a, b) => a[0] < b[0] ? -1 : 1);
        const cookies = this[kHeadersList].cookies;
        for (const [name, value] of names) {
          if (name === "set-cookie") {
            for (const value2 of cookies) {
              headers.push([name, value2]);
            }
          } else {
            assert(value !== null);
            headers.push([name, value]);
          }
        }
        this[kHeadersList][kHeadersSortedMap] = headers;
        return headers;
      }
      keys() {
        webidl.brandCheck(this, _Headers);
        return makeIterator(
          () => [...this[kHeadersSortedMap].values()],
          "Headers",
          "key"
        );
      }
      values() {
        webidl.brandCheck(this, _Headers);
        return makeIterator(
          () => [...this[kHeadersSortedMap].values()],
          "Headers",
          "value"
        );
      }
      entries() {
        webidl.brandCheck(this, _Headers);
        return makeIterator(
          () => [...this[kHeadersSortedMap].values()],
          "Headers",
          "key+value"
        );
      }
      /**
       * @param {(value: string, key: string, self: Headers) => void} callbackFn
       * @param {unknown} thisArg
       */
      forEach(callbackFn, thisArg = globalThis) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 1, { header: "Headers.forEach" });
        if (typeof callbackFn !== "function") {
          throw new TypeError(
            "Failed to execute 'forEach' on 'Headers': parameter 1 is not of type 'Function'."
          );
        }
        for (const [key, value] of this) {
          callbackFn.apply(thisArg, [value, key, this]);
        }
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        webidl.brandCheck(this, _Headers);
        return this[kHeadersList];
      }
    };
    __name(_Headers, "Headers");
    var Headers3 = _Headers;
    Headers3.prototype[Symbol.iterator] = Headers3.prototype.entries;
    Object.defineProperties(Headers3.prototype, {
      append: kEnumerableProperty,
      delete: kEnumerableProperty,
      get: kEnumerableProperty,
      has: kEnumerableProperty,
      set: kEnumerableProperty,
      getSetCookie: kEnumerableProperty,
      keys: kEnumerableProperty,
      values: kEnumerableProperty,
      entries: kEnumerableProperty,
      forEach: kEnumerableProperty,
      [Symbol.iterator]: { enumerable: false },
      [Symbol.toStringTag]: {
        value: "Headers",
        configurable: true
      }
    });
    webidl.converters.HeadersInit = function(V) {
      if (webidl.util.Type(V) === "Object") {
        if (V[Symbol.iterator]) {
          return webidl.converters["sequence<sequence<ByteString>>"](V);
        }
        return webidl.converters["record<ByteString, ByteString>"](V);
      }
      throw webidl.errors.conversionFailed({
        prefix: "Headers constructor",
        argument: "Argument 1",
        types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
      });
    };
    module2.exports = {
      fill,
      Headers: Headers3,
      HeadersList
    };
  }
});

// ../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/utils.js"(exports2, module2) {
    "use strict";
    init_define_process();
    function parseContentType(str) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (code !== 47 || i === 0)
            return;
          break;
        }
      }
      if (i === str.length)
        return;
      const type = str.slice(0, i).toLowerCase();
      const subtypeStart = ++i;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (i === subtypeStart)
            return;
          if (parseContentTypeParams(str, i, params) === void 0)
            return;
          break;
        }
      }
      if (i === subtypeStart)
        return;
      const subtype = str.slice(subtypeStart, i).toLowerCase();
      return { type, subtype, params };
    }
    __name(parseContentType, "parseContentType");
    function parseContentTypeParams(str, i, params) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code !== 61)
              return;
            break;
          }
        }
        if (i === str.length)
          return;
        name = str.slice(nameStart, i);
        ++i;
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        if (str.charCodeAt(i) === 34) {
          valueStart = ++i;
          let escaping = false;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 92) {
              if (escaping) {
                valueStart = i;
                escaping = false;
              } else {
                value += str.slice(valueStart, i);
                escaping = true;
              }
              continue;
            }
            if (code === 34) {
              if (escaping) {
                valueStart = i;
                escaping = false;
                continue;
              }
              value += str.slice(valueStart, i);
              break;
            }
            if (escaping) {
              valueStart = i - 1;
              escaping = false;
            }
            if (QDTEXT[code] !== 1)
              return;
          }
          if (i === str.length)
            return;
          ++i;
        } else {
          valueStart = i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (TOKEN[code] !== 1) {
              if (i === valueStart)
                return;
              break;
            }
          }
          value = str.slice(valueStart, i);
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    __name(parseContentTypeParams, "parseContentTypeParams");
    function parseDisposition(str, defDecoder) {
      if (str.length === 0)
        return;
      const params = /* @__PURE__ */ Object.create(null);
      let i = 0;
      for (; i < str.length; ++i) {
        const code = str.charCodeAt(i);
        if (TOKEN[code] !== 1) {
          if (parseDispositionParams(str, i, params, defDecoder) === void 0)
            return;
          break;
        }
      }
      const type = str.slice(0, i).toLowerCase();
      return { type, params };
    }
    __name(parseDisposition, "parseDisposition");
    function parseDispositionParams(str, i, params, defDecoder) {
      while (i < str.length) {
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          break;
        if (str.charCodeAt(i++) !== 59)
          return;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (code !== 32 && code !== 9)
            break;
        }
        if (i === str.length)
          return;
        let name;
        const nameStart = i;
        for (; i < str.length; ++i) {
          const code = str.charCodeAt(i);
          if (TOKEN[code] !== 1) {
            if (code === 61)
              break;
            return;
          }
        }
        if (i === str.length)
          return;
        let value = "";
        let valueStart;
        let charset;
        name = str.slice(nameStart, i);
        if (name.charCodeAt(name.length - 1) === 42) {
          const charsetStart = ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (CHARSET[code] !== 1) {
              if (code !== 39)
                return;
              break;
            }
          }
          if (i === str.length)
            return;
          charset = str.slice(charsetStart, i);
          ++i;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (code === 39)
              break;
          }
          if (i === str.length)
            return;
          ++i;
          if (i === str.length)
            return;
          valueStart = i;
          let encode = 0;
          for (; i < str.length; ++i) {
            const code = str.charCodeAt(i);
            if (EXTENDED_VALUE[code] !== 1) {
              if (code === 37) {
                let hexUpper;
                let hexLower;
                if (i + 2 < str.length && (hexUpper = HEX_VALUES[str.charCodeAt(i + 1)]) !== -1 && (hexLower = HEX_VALUES[str.charCodeAt(i + 2)]) !== -1) {
                  const byteVal = (hexUpper << 4) + hexLower;
                  value += str.slice(valueStart, i);
                  value += String.fromCharCode(byteVal);
                  i += 2;
                  valueStart = i + 1;
                  if (byteVal >= 128)
                    encode = 2;
                  else if (encode === 0)
                    encode = 1;
                  continue;
                }
                return;
              }
              break;
            }
          }
          value += str.slice(valueStart, i);
          value = convertToUTF8(value, charset, encode);
          if (value === void 0)
            return;
        } else {
          ++i;
          if (i === str.length)
            return;
          if (str.charCodeAt(i) === 34) {
            valueStart = ++i;
            let escaping = false;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (code === 92) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                } else {
                  value += str.slice(valueStart, i);
                  escaping = true;
                }
                continue;
              }
              if (code === 34) {
                if (escaping) {
                  valueStart = i;
                  escaping = false;
                  continue;
                }
                value += str.slice(valueStart, i);
                break;
              }
              if (escaping) {
                valueStart = i - 1;
                escaping = false;
              }
              if (QDTEXT[code] !== 1)
                return;
            }
            if (i === str.length)
              return;
            ++i;
          } else {
            valueStart = i;
            for (; i < str.length; ++i) {
              const code = str.charCodeAt(i);
              if (TOKEN[code] !== 1) {
                if (i === valueStart)
                  return;
                break;
              }
            }
            value = str.slice(valueStart, i);
          }
          value = defDecoder(value, 2);
          if (value === void 0)
            return;
        }
        name = name.toLowerCase();
        if (params[name] === void 0)
          params[name] = value;
      }
      return params;
    }
    __name(parseDispositionParams, "parseDispositionParams");
    function getDecoder(charset) {
      let lc;
      while (true) {
        switch (charset) {
          case "utf-8":
          case "utf8":
            return decoders.utf8;
          case "latin1":
          case "ascii":
          case "us-ascii":
          case "iso-8859-1":
          case "iso8859-1":
          case "iso88591":
          case "iso_8859-1":
          case "windows-1252":
          case "iso_8859-1:1987":
          case "cp1252":
          case "x-cp1252":
            return decoders.latin1;
          case "utf16le":
          case "utf-16le":
          case "ucs2":
          case "ucs-2":
            return decoders.utf16le;
          case "base64":
            return decoders.base64;
          default:
            if (lc === void 0) {
              lc = true;
              charset = charset.toLowerCase();
              continue;
            }
            return decoders.other.bind(charset);
        }
      }
    }
    __name(getDecoder, "getDecoder");
    var decoders = {
      utf8: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string") {
          if (hint < 2)
            return data;
          data = Buffer.from(data, "latin1");
        }
        return data.utf8Slice(0, data.length);
      },
      latin1: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          return data;
        return data.latin1Slice(0, data.length);
      },
      utf16le: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.ucs2Slice(0, data.length);
      },
      base64: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        return data.base64Slice(0, data.length);
      },
      other: (data, hint) => {
        if (data.length === 0)
          return "";
        if (typeof data === "string")
          data = Buffer.from(data, "latin1");
        try {
          const decoder = new TextDecoder(exports2);
          return decoder.decode(data);
        } catch {
        }
      }
    };
    function convertToUTF8(data, charset, hint) {
      const decode = getDecoder(charset);
      if (decode)
        return decode(data, hint);
    }
    __name(convertToUTF8, "convertToUTF8");
    function basename(path) {
      if (typeof path !== "string")
        return "";
      for (let i = path.length - 1; i >= 0; --i) {
        switch (path.charCodeAt(i)) {
          case 47:
          case 92:
            path = path.slice(i + 1);
            return path === ".." || path === "." ? "" : path;
        }
      }
      return path === ".." || path === "." ? "" : path;
    }
    __name(basename, "basename");
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var QDTEXT = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    var CHARSET = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var EXTENDED_VALUE = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    };
  }
});

// ../../node_modules/.pnpm/streamsearch@1.1.0/node_modules/streamsearch/lib/sbmh.js
var require_sbmh = __commonJS({
  "../../node_modules/.pnpm/streamsearch@1.1.0/node_modules/streamsearch/lib/sbmh.js"(exports2, module2) {
    "use strict";
    init_define_process();
    function memcmp(buf1, pos1, buf2, pos2, num) {
      for (let i = 0; i < num; ++i) {
        if (buf1[pos1 + i] !== buf2[pos2 + i])
          return false;
      }
      return true;
    }
    __name(memcmp, "memcmp");
    var _SBMH = class _SBMH {
      constructor(needle, cb) {
        if (typeof cb !== "function")
          throw new Error("Missing match callback");
        if (typeof needle === "string")
          needle = Buffer.from(needle);
        else if (!Buffer.isBuffer(needle))
          throw new Error(\`Expected Buffer for needle, got \${typeof needle}\`);
        const needleLen = needle.length;
        this.maxMatches = Infinity;
        this.matches = 0;
        this._cb = cb;
        this._lookbehindSize = 0;
        this._needle = needle;
        this._bufPos = 0;
        this._lookbehind = Buffer.allocUnsafe(needleLen);
        this._occ = [
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen,
          needleLen
        ];
        if (needleLen > 1) {
          for (let i = 0; i < needleLen - 1; ++i)
            this._occ[needle[i]] = needleLen - 1 - i;
        }
      }
      reset() {
        this.matches = 0;
        this._lookbehindSize = 0;
        this._bufPos = 0;
      }
      push(chunk, pos) {
        let result;
        if (!Buffer.isBuffer(chunk))
          chunk = Buffer.from(chunk, "latin1");
        const chunkLen = chunk.length;
        this._bufPos = pos || 0;
        while (result !== chunkLen && this.matches < this.maxMatches)
          result = feed(this, chunk);
        return result;
      }
      destroy() {
        const lbSize = this._lookbehindSize;
        if (lbSize)
          this._cb(false, this._lookbehind, 0, lbSize, false);
        this.reset();
      }
    };
    __name(_SBMH, "SBMH");
    var SBMH = _SBMH;
    function feed(self, data) {
      const len = data.length;
      const needle = self._needle;
      const needleLen = needle.length;
      let pos = -self._lookbehindSize;
      const lastNeedleCharPos = needleLen - 1;
      const lastNeedleChar = needle[lastNeedleCharPos];
      const end = len - needleLen;
      const occ = self._occ;
      const lookbehind = self._lookbehind;
      if (pos < 0) {
        while (pos < 0 && pos <= end) {
          const nextPos = pos + lastNeedleCharPos;
          const ch = nextPos < 0 ? lookbehind[self._lookbehindSize + nextPos] : data[nextPos];
          if (ch === lastNeedleChar && matchNeedle(self, data, pos, lastNeedleCharPos)) {
            self._lookbehindSize = 0;
            ++self.matches;
            if (pos > -self._lookbehindSize)
              self._cb(true, lookbehind, 0, self._lookbehindSize + pos, false);
            else
              self._cb(true, void 0, 0, 0, true);
            return self._bufPos = pos + needleLen;
          }
          pos += occ[ch];
        }
        while (pos < 0 && !matchNeedle(self, data, pos, len - pos))
          ++pos;
        if (pos < 0) {
          const bytesToCutOff = self._lookbehindSize + pos;
          if (bytesToCutOff > 0) {
            self._cb(false, lookbehind, 0, bytesToCutOff, false);
          }
          self._lookbehindSize -= bytesToCutOff;
          lookbehind.copy(lookbehind, 0, bytesToCutOff, self._lookbehindSize);
          lookbehind.set(data, self._lookbehindSize);
          self._lookbehindSize += len;
          self._bufPos = len;
          return len;
        }
        self._cb(false, lookbehind, 0, self._lookbehindSize, false);
        self._lookbehindSize = 0;
      }
      pos += self._bufPos;
      const firstNeedleChar = needle[0];
      while (pos <= end) {
        const ch = data[pos + lastNeedleCharPos];
        if (ch === lastNeedleChar && data[pos] === firstNeedleChar && memcmp(needle, 0, data, pos, lastNeedleCharPos)) {
          ++self.matches;
          if (pos > 0)
            self._cb(true, data, self._bufPos, pos, true);
          else
            self._cb(true, void 0, 0, 0, true);
          return self._bufPos = pos + needleLen;
        }
        pos += occ[ch];
      }
      while (pos < len) {
        if (data[pos] !== firstNeedleChar || !memcmp(data, pos, needle, 0, len - pos)) {
          ++pos;
          continue;
        }
        data.copy(lookbehind, 0, pos, len);
        self._lookbehindSize = len - pos;
        break;
      }
      if (pos > 0)
        self._cb(false, data, self._bufPos, pos < len ? pos : len, true);
      self._bufPos = len;
      return len;
    }
    __name(feed, "feed");
    function matchNeedle(self, data, pos, len) {
      const lb = self._lookbehind;
      const lbSize = self._lookbehindSize;
      const needle = self._needle;
      for (let i = 0; i < len; ++i, ++pos) {
        const ch = pos < 0 ? lb[lbSize + pos] : data[pos];
        if (ch !== needle[i])
          return false;
      }
      return true;
    }
    __name(matchNeedle, "matchNeedle");
    module2.exports = SBMH;
  }
});

// ../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/types/multipart.js
var require_multipart = __commonJS({
  "../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/types/multipart.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { Readable, Writable } = require("stream");
    var StreamSearch = require_sbmh();
    var {
      basename,
      convertToUTF8,
      getDecoder,
      parseContentType,
      parseDisposition
    } = require_utils();
    var BUF_CRLF = Buffer.from("\\r\\n");
    var BUF_CR = Buffer.from("\\r");
    var BUF_DASH = Buffer.from("-");
    function noop() {
    }
    __name(noop, "noop");
    var MAX_HEADER_PAIRS = 2e3;
    var MAX_HEADER_SIZE = 16 * 1024;
    var HPARSER_NAME = 0;
    var HPARSER_PRE_OWS = 1;
    var HPARSER_VALUE = 2;
    var _HeaderParser = class _HeaderParser {
      constructor(cb) {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
        this.cb = cb;
      }
      reset() {
        this.header = /* @__PURE__ */ Object.create(null);
        this.pairCount = 0;
        this.byteCount = 0;
        this.state = HPARSER_NAME;
        this.name = "";
        this.value = "";
        this.crlf = 0;
      }
      push(chunk, pos, end) {
        let start = pos;
        while (pos < end) {
          switch (this.state) {
            case HPARSER_NAME: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (TOKEN[code] !== 1) {
                  if (code !== 58)
                    return -1;
                  this.name += chunk.latin1Slice(start, pos);
                  if (this.name.length === 0)
                    return -1;
                  ++pos;
                  done = true;
                  this.state = HPARSER_PRE_OWS;
                  break;
                }
              }
              if (!done) {
                this.name += chunk.latin1Slice(start, pos);
                break;
              }
            }
            case HPARSER_PRE_OWS: {
              let done = false;
              for (; pos < end; ++pos) {
                if (this.byteCount === MAX_HEADER_SIZE)
                  return -1;
                ++this.byteCount;
                const code = chunk[pos];
                if (code !== 32 && code !== 9) {
                  start = pos;
                  done = true;
                  this.state = HPARSER_VALUE;
                  break;
                }
              }
              if (!done)
                break;
            }
            case HPARSER_VALUE:
              switch (this.crlf) {
                case 0:
                  for (; pos < end; ++pos) {
                    if (this.byteCount === MAX_HEADER_SIZE)
                      return -1;
                    ++this.byteCount;
                    const code = chunk[pos];
                    if (FIELD_VCHAR[code] !== 1) {
                      if (code !== 13)
                        return -1;
                      ++this.crlf;
                      break;
                    }
                  }
                  this.value += chunk.latin1Slice(start, pos++);
                  break;
                case 1:
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  ++this.crlf;
                  break;
                case 2: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  const code = chunk[pos];
                  if (code === 32 || code === 9) {
                    start = pos;
                    this.crlf = 0;
                  } else {
                    if (++this.pairCount < MAX_HEADER_PAIRS) {
                      this.name = this.name.toLowerCase();
                      if (this.header[this.name] === void 0)
                        this.header[this.name] = [this.value];
                      else
                        this.header[this.name].push(this.value);
                    }
                    if (code === 13) {
                      ++this.crlf;
                      ++pos;
                    } else {
                      start = pos;
                      this.crlf = 0;
                      this.state = HPARSER_NAME;
                      this.name = "";
                      this.value = "";
                    }
                  }
                  break;
                }
                case 3: {
                  if (this.byteCount === MAX_HEADER_SIZE)
                    return -1;
                  ++this.byteCount;
                  if (chunk[pos++] !== 10)
                    return -1;
                  const header = this.header;
                  this.reset();
                  this.cb(header);
                  return pos;
                }
              }
              break;
          }
        }
        return pos;
      }
    };
    __name(_HeaderParser, "HeaderParser");
    var HeaderParser = _HeaderParser;
    var _FileStream = class _FileStream extends Readable {
      constructor(opts, owner) {
        super(opts);
        this.truncated = false;
        this._readcb = null;
        this.once("end", () => {
          this._read();
          if (--owner._fileEndsLeft === 0 && owner._finalcb) {
            const cb = owner._finalcb;
            owner._finalcb = null;
            define_process_default.nextTick(cb);
          }
        });
      }
      _read(n) {
        const cb = this._readcb;
        if (cb) {
          this._readcb = null;
          cb();
        }
      }
    };
    __name(_FileStream, "FileStream");
    var FileStream = _FileStream;
    var ignoreData = {
      push: (chunk, pos) => {
      },
      destroy: () => {
      }
    };
    function callAndUnsetCb(self, err) {
      const cb = self._writecb;
      self._writecb = null;
      if (err)
        self.destroy(err);
      else if (cb)
        cb();
    }
    __name(callAndUnsetCb, "callAndUnsetCb");
    function nullDecoder(val, hint) {
      return val;
    }
    __name(nullDecoder, "nullDecoder");
    var _Multipart = class _Multipart extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        if (!cfg.conType.params || typeof cfg.conType.params.boundary !== "string")
          throw new Error("Multipart: Boundary not found");
        const boundary = cfg.conType.params.boundary;
        const paramDecoder = typeof cfg.defParamCharset === "string" && cfg.defParamCharset ? getDecoder(cfg.defParamCharset) : nullDecoder;
        const defCharset = cfg.defCharset || "utf8";
        const preservePath = cfg.preservePath;
        const fileOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.fileHwm === "number" ? cfg.fileHwm : void 0
        };
        const limits = cfg.limits;
        const fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        const fileSizeLimit = limits && typeof limits.fileSize === "number" ? limits.fileSize : Infinity;
        const filesLimit = limits && typeof limits.files === "number" ? limits.files : Infinity;
        const fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        const partsLimit = limits && typeof limits.parts === "number" ? limits.parts : Infinity;
        let parts = -1;
        let fields = 0;
        let files = 0;
        let skipPart = false;
        this._fileEndsLeft = 0;
        this._fileStream = void 0;
        this._complete = false;
        let fileSize = 0;
        let field;
        let fieldSize = 0;
        let partCharset;
        let partEncoding;
        let partType;
        let partName;
        let partTruncated = false;
        let hitFilesLimit = false;
        let hitFieldsLimit = false;
        this._hparser = null;
        const hparser = new HeaderParser((header) => {
          this._hparser = null;
          skipPart = false;
          partType = "text/plain";
          partCharset = defCharset;
          partEncoding = "7bit";
          partName = void 0;
          partTruncated = false;
          let filename;
          if (!header["content-disposition"]) {
            skipPart = true;
            return;
          }
          const disp = parseDisposition(
            header["content-disposition"][0],
            paramDecoder
          );
          if (!disp || disp.type !== "form-data") {
            skipPart = true;
            return;
          }
          if (disp.params) {
            if (disp.params.name)
              partName = disp.params.name;
            if (disp.params["filename*"])
              filename = disp.params["filename*"];
            else if (disp.params.filename)
              filename = disp.params.filename;
            if (filename !== void 0 && !preservePath)
              filename = basename(filename);
          }
          if (header["content-type"]) {
            const conType = parseContentType(header["content-type"][0]);
            if (conType) {
              partType = \`\${conType.type}/\${conType.subtype}\`;
              if (conType.params && typeof conType.params.charset === "string")
                partCharset = conType.params.charset.toLowerCase();
            }
          }
          if (header["content-transfer-encoding"])
            partEncoding = header["content-transfer-encoding"][0].toLowerCase();
          if (partType === "application/octet-stream" || filename !== void 0) {
            if (files === filesLimit) {
              if (!hitFilesLimit) {
                hitFilesLimit = true;
                this.emit("filesLimit");
              }
              skipPart = true;
              return;
            }
            ++files;
            if (this.listenerCount("file") === 0) {
              skipPart = true;
              return;
            }
            fileSize = 0;
            this._fileStream = new FileStream(fileOpts, this);
            ++this._fileEndsLeft;
            this.emit(
              "file",
              partName,
              this._fileStream,
              {
                filename,
                encoding: partEncoding,
                mimeType: partType
              }
            );
          } else {
            if (fields === fieldsLimit) {
              if (!hitFieldsLimit) {
                hitFieldsLimit = true;
                this.emit("fieldsLimit");
              }
              skipPart = true;
              return;
            }
            ++fields;
            if (this.listenerCount("field") === 0) {
              skipPart = true;
              return;
            }
            field = [];
            fieldSize = 0;
          }
        });
        let matchPostBoundary = 0;
        const ssCb = /* @__PURE__ */ __name((isMatch, data, start, end, isDataSafe) => {
          retrydata:
            while (data) {
              if (this._hparser !== null) {
                const ret = this._hparser.push(data, start, end);
                if (ret === -1) {
                  this._hparser = null;
                  hparser.reset();
                  this.emit("error", new Error("Malformed part header"));
                  break;
                }
                start = ret;
              }
              if (start === end)
                break;
              if (matchPostBoundary !== 0) {
                if (matchPostBoundary === 1) {
                  switch (data[start]) {
                    case 45:
                      matchPostBoundary = 2;
                      ++start;
                      break;
                    case 13:
                      matchPostBoundary = 3;
                      ++start;
                      break;
                    default:
                      matchPostBoundary = 0;
                  }
                  if (start === end)
                    return;
                }
                if (matchPostBoundary === 2) {
                  matchPostBoundary = 0;
                  if (data[start] === 45) {
                    this._complete = true;
                    this._bparser = ignoreData;
                    return;
                  }
                  const writecb = this._writecb;
                  this._writecb = noop;
                  ssCb(false, BUF_DASH, 0, 1, false);
                  this._writecb = writecb;
                } else if (matchPostBoundary === 3) {
                  matchPostBoundary = 0;
                  if (data[start] === 10) {
                    ++start;
                    if (parts >= partsLimit)
                      break;
                    this._hparser = hparser;
                    if (start === end)
                      break;
                    continue retrydata;
                  } else {
                    const writecb = this._writecb;
                    this._writecb = noop;
                    ssCb(false, BUF_CR, 0, 1, false);
                    this._writecb = writecb;
                  }
                }
              }
              if (!skipPart) {
                if (this._fileStream) {
                  let chunk;
                  const actualLen = Math.min(end - start, fileSizeLimit - fileSize);
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fileSize += chunk.length;
                  if (fileSize === fileSizeLimit) {
                    if (chunk.length > 0)
                      this._fileStream.push(chunk);
                    this._fileStream.emit("limit");
                    this._fileStream.truncated = true;
                    skipPart = true;
                  } else if (!this._fileStream.push(chunk)) {
                    if (this._writecb)
                      this._fileStream._readcb = this._writecb;
                    this._writecb = null;
                  }
                } else if (field !== void 0) {
                  let chunk;
                  const actualLen = Math.min(
                    end - start,
                    fieldSizeLimit - fieldSize
                  );
                  if (!isDataSafe) {
                    chunk = Buffer.allocUnsafe(actualLen);
                    data.copy(chunk, 0, start, start + actualLen);
                  } else {
                    chunk = data.slice(start, start + actualLen);
                  }
                  fieldSize += actualLen;
                  field.push(chunk);
                  if (fieldSize === fieldSizeLimit) {
                    skipPart = true;
                    partTruncated = true;
                  }
                }
              }
              break;
            }
          if (isMatch) {
            matchPostBoundary = 1;
            if (this._fileStream) {
              this._fileStream.push(null);
              this._fileStream = null;
            } else if (field !== void 0) {
              let data2;
              switch (field.length) {
                case 0:
                  data2 = "";
                  break;
                case 1:
                  data2 = convertToUTF8(field[0], partCharset, 0);
                  break;
                default:
                  data2 = convertToUTF8(
                    Buffer.concat(field, fieldSize),
                    partCharset,
                    0
                  );
              }
              field = void 0;
              fieldSize = 0;
              this.emit(
                "field",
                partName,
                data2,
                {
                  nameTruncated: false,
                  valueTruncated: partTruncated,
                  encoding: partEncoding,
                  mimeType: partType
                }
              );
            }
            if (++parts === partsLimit)
              this.emit("partsLimit");
          }
        }, "ssCb");
        this._bparser = new StreamSearch(\`\\r
--\${boundary}\`, ssCb);
        this._writecb = null;
        this._finalcb = null;
        this.write(BUF_CRLF);
      }
      static detect(conType) {
        return conType.type === "multipart" && conType.subtype === "form-data";
      }
      _write(chunk, enc, cb) {
        this._writecb = cb;
        this._bparser.push(chunk, 0);
        if (this._writecb)
          callAndUnsetCb(this);
      }
      _destroy(err, cb) {
        this._hparser = null;
        this._bparser = ignoreData;
        if (!err)
          err = checkEndState(this);
        const fileStream = this._fileStream;
        if (fileStream) {
          this._fileStream = null;
          fileStream.destroy(err);
        }
        cb(err);
      }
      _final(cb) {
        this._bparser.destroy();
        if (!this._complete)
          return cb(new Error("Unexpected end of form"));
        if (this._fileEndsLeft)
          this._finalcb = finalcb.bind(null, this, cb);
        else
          finalcb(this, cb);
      }
    };
    __name(_Multipart, "Multipart");
    var Multipart = _Multipart;
    function finalcb(self, cb, err) {
      if (err)
        return cb(err);
      err = checkEndState(self);
      cb(err);
    }
    __name(finalcb, "finalcb");
    function checkEndState(self) {
      if (self._hparser)
        return new Error("Malformed part header");
      const fileStream = self._fileStream;
      if (fileStream) {
        self._fileStream = null;
        fileStream.destroy(new Error("Unexpected end of file"));
      }
      if (!self._complete)
        return new Error("Unexpected end of form");
    }
    __name(checkEndState, "checkEndState");
    var TOKEN = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    var FIELD_VCHAR = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ];
    module2.exports = Multipart;
  }
});

// ../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/types/urlencoded.js
var require_urlencoded = __commonJS({
  "../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/types/urlencoded.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { Writable } = require("stream");
    var { getDecoder } = require_utils();
    var _URLEncoded = class _URLEncoded extends Writable {
      constructor(cfg) {
        const streamOpts = {
          autoDestroy: true,
          emitClose: true,
          highWaterMark: typeof cfg.highWaterMark === "number" ? cfg.highWaterMark : void 0
        };
        super(streamOpts);
        let charset = cfg.defCharset || "utf8";
        if (cfg.conType.params && typeof cfg.conType.params.charset === "string")
          charset = cfg.conType.params.charset;
        this.charset = charset;
        const limits = cfg.limits;
        this.fieldSizeLimit = limits && typeof limits.fieldSize === "number" ? limits.fieldSize : 1 * 1024 * 1024;
        this.fieldsLimit = limits && typeof limits.fields === "number" ? limits.fields : Infinity;
        this.fieldNameSizeLimit = limits && typeof limits.fieldNameSize === "number" ? limits.fieldNameSize : 100;
        this._inKey = true;
        this._keyTrunc = false;
        this._valTrunc = false;
        this._bytesKey = 0;
        this._bytesVal = 0;
        this._fields = 0;
        this._key = "";
        this._val = "";
        this._byte = -2;
        this._lastPos = 0;
        this._encode = 0;
        this._decoder = getDecoder(charset);
      }
      static detect(conType) {
        return conType.type === "application" && conType.subtype === "x-www-form-urlencoded";
      }
      _write(chunk, enc, cb) {
        if (this._fields >= this.fieldsLimit)
          return cb();
        let i = 0;
        const len = chunk.length;
        this._lastPos = 0;
        if (this._byte !== -2) {
          i = readPctEnc(this, chunk, i, len);
          if (i === -1)
            return cb(new Error("Malformed urlencoded form"));
          if (i >= len)
            return cb();
          if (this._inKey)
            ++this._bytesKey;
          else
            ++this._bytesVal;
        }
        main:
          while (i < len) {
            if (this._inKey) {
              i = skipKeyBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 61:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    this._inKey = false;
                    continue main;
                  case 38:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._key = this._decoder(this._key, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0) {
                      this.emit(
                        "field",
                        this._key,
                        "",
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: false,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue;
                  case 43:
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._key += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._key += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesKey;
                    i = skipKeyBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesKey;
                i = skipKeyBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._key += chunk.latin1Slice(this._lastPos, i);
            } else {
              i = skipValBytes(this, chunk, i, len);
              while (i < len) {
                switch (chunk[i]) {
                  case 38:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = ++i;
                    this._inKey = true;
                    this._val = this._decoder(this._val, this._encode);
                    this._encode = 0;
                    if (this._bytesKey > 0 || this._bytesVal > 0) {
                      this.emit(
                        "field",
                        this._key,
                        this._val,
                        {
                          nameTruncated: this._keyTrunc,
                          valueTruncated: this._valTrunc,
                          encoding: this.charset,
                          mimeType: "text/plain"
                        }
                      );
                    }
                    this._key = "";
                    this._val = "";
                    this._keyTrunc = false;
                    this._valTrunc = false;
                    this._bytesKey = 0;
                    this._bytesVal = 0;
                    if (++this._fields >= this.fieldsLimit) {
                      this.emit("fieldsLimit");
                      return cb();
                    }
                    continue main;
                  case 43:
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._val += " ";
                    this._lastPos = i + 1;
                    break;
                  case 37:
                    if (this._encode === 0)
                      this._encode = 1;
                    if (this._lastPos < i)
                      this._val += chunk.latin1Slice(this._lastPos, i);
                    this._lastPos = i + 1;
                    this._byte = -1;
                    i = readPctEnc(this, chunk, i + 1, len);
                    if (i === -1)
                      return cb(new Error("Malformed urlencoded form"));
                    if (i >= len)
                      return cb();
                    ++this._bytesVal;
                    i = skipValBytes(this, chunk, i, len);
                    continue;
                }
                ++i;
                ++this._bytesVal;
                i = skipValBytes(this, chunk, i, len);
              }
              if (this._lastPos < i)
                this._val += chunk.latin1Slice(this._lastPos, i);
            }
          }
        cb();
      }
      _final(cb) {
        if (this._byte !== -2)
          return cb(new Error("Malformed urlencoded form"));
        if (!this._inKey || this._bytesKey > 0 || this._bytesVal > 0) {
          if (this._inKey)
            this._key = this._decoder(this._key, this._encode);
          else
            this._val = this._decoder(this._val, this._encode);
          this.emit(
            "field",
            this._key,
            this._val,
            {
              nameTruncated: this._keyTrunc,
              valueTruncated: this._valTrunc,
              encoding: this.charset,
              mimeType: "text/plain"
            }
          );
        }
        cb();
      }
    };
    __name(_URLEncoded, "URLEncoded");
    var URLEncoded = _URLEncoded;
    function readPctEnc(self, chunk, pos, len) {
      if (pos >= len)
        return len;
      if (self._byte === -1) {
        const hexUpper = HEX_VALUES[chunk[pos++]];
        if (hexUpper === -1)
          return -1;
        if (hexUpper >= 8)
          self._encode = 2;
        if (pos < len) {
          const hexLower = HEX_VALUES[chunk[pos++]];
          if (hexLower === -1)
            return -1;
          if (self._inKey)
            self._key += String.fromCharCode((hexUpper << 4) + hexLower);
          else
            self._val += String.fromCharCode((hexUpper << 4) + hexLower);
          self._byte = -2;
          self._lastPos = pos;
        } else {
          self._byte = hexUpper;
        }
      } else {
        const hexLower = HEX_VALUES[chunk[pos++]];
        if (hexLower === -1)
          return -1;
        if (self._inKey)
          self._key += String.fromCharCode((self._byte << 4) + hexLower);
        else
          self._val += String.fromCharCode((self._byte << 4) + hexLower);
        self._byte = -2;
        self._lastPos = pos;
      }
      return pos;
    }
    __name(readPctEnc, "readPctEnc");
    function skipKeyBytes(self, chunk, pos, len) {
      if (self._bytesKey > self.fieldNameSizeLimit) {
        if (!self._keyTrunc) {
          if (self._lastPos < pos)
            self._key += chunk.latin1Slice(self._lastPos, pos - 1);
        }
        self._keyTrunc = true;
        for (; pos < len; ++pos) {
          const code = chunk[pos];
          if (code === 61 || code === 38)
            break;
          ++self._bytesKey;
        }
        self._lastPos = pos;
      }
      return pos;
    }
    __name(skipKeyBytes, "skipKeyBytes");
    function skipValBytes(self, chunk, pos, len) {
      if (self._bytesVal > self.fieldSizeLimit) {
        if (!self._valTrunc) {
          if (self._lastPos < pos)
            self._val += chunk.latin1Slice(self._lastPos, pos - 1);
        }
        self._valTrunc = true;
        for (; pos < len; ++pos) {
          if (chunk[pos] === 38)
            break;
          ++self._bytesVal;
        }
        self._lastPos = pos;
      }
      return pos;
    }
    __name(skipValBytes, "skipValBytes");
    var HEX_VALUES = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      10,
      11,
      12,
      13,
      14,
      15,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    module2.exports = URLEncoded;
  }
});

// ../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/.pnpm/busboy@1.6.0/node_modules/busboy/lib/index.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { parseContentType } = require_utils();
    function getInstance(cfg) {
      const headers = cfg.headers;
      const conType = parseContentType(headers["content-type"]);
      if (!conType)
        throw new Error("Malformed content type");
      for (const type of TYPES) {
        const matched = type.detect(conType);
        if (!matched)
          continue;
        const instanceCfg = {
          limits: cfg.limits,
          headers,
          conType,
          highWaterMark: void 0,
          fileHwm: void 0,
          defCharset: void 0,
          defParamCharset: void 0,
          preservePath: false
        };
        if (cfg.highWaterMark)
          instanceCfg.highWaterMark = cfg.highWaterMark;
        if (cfg.fileHwm)
          instanceCfg.fileHwm = cfg.fileHwm;
        instanceCfg.defCharset = cfg.defCharset;
        instanceCfg.defParamCharset = cfg.defParamCharset;
        instanceCfg.preservePath = cfg.preservePath;
        return new type(instanceCfg);
      }
      throw new Error(\`Unsupported content type: \${headers["content-type"]}\`);
    }
    __name(getInstance, "getInstance");
    var TYPES = [
      require_multipart(),
      require_urlencoded()
    ].filter(function(typemod) {
      return typeof typemod.detect === "function";
    });
    module2.exports = (cfg) => {
      if (typeof cfg !== "object" || cfg === null)
        cfg = {};
      if (typeof cfg.headers !== "object" || cfg.headers === null || typeof cfg.headers["content-type"] !== "string") {
        throw new Error("Missing Content-Type");
      }
      return getInstance(cfg);
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/dataURL.js
var require_dataURL = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/dataURL.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var assert = require("assert");
    var { atob: atob2 } = require("buffer");
    var { isomorphicDecode } = require_util2();
    var encoder = new TextEncoder();
    var HTTP_TOKEN_CODEPOINTS = /^[!#$%&'*+-.^_|~A-Za-z0-9]+$/;
    var HTTP_WHITESPACE_REGEX = /(\\u000A|\\u000D|\\u0009|\\u0020)/;
    var HTTP_QUOTED_STRING_TOKENS = /[\\u0009|\\u0020-\\u007E|\\u0080-\\u00FF]/;
    function dataURLProcessor(dataURL) {
      assert(dataURL.protocol === "data:");
      let input = URLSerializer(dataURL, true);
      input = input.slice(5);
      const position = { position: 0 };
      let mimeType = collectASequenceOfCodePointsFast(
        ",",
        input,
        position
      );
      const mimeTypeLength = mimeType.length;
      mimeType = removeASCIIWhitespace(mimeType, true, true);
      if (position.position >= input.length) {
        return "failure";
      }
      position.position++;
      const encodedBody = input.slice(mimeTypeLength + 1);
      let body = stringPercentDecode(encodedBody);
      if (/;(\\u0020){0,}base64$/i.test(mimeType)) {
        const stringBody = isomorphicDecode(body);
        body = forgivingBase64(stringBody);
        if (body === "failure") {
          return "failure";
        }
        mimeType = mimeType.slice(0, -6);
        mimeType = mimeType.replace(/(\\u0020)+$/, "");
        mimeType = mimeType.slice(0, -1);
      }
      if (mimeType.startsWith(";")) {
        mimeType = "text/plain" + mimeType;
      }
      let mimeTypeRecord = parseMIMEType(mimeType);
      if (mimeTypeRecord === "failure") {
        mimeTypeRecord = parseMIMEType("text/plain;charset=US-ASCII");
      }
      return { mimeType: mimeTypeRecord, body };
    }
    __name(dataURLProcessor, "dataURLProcessor");
    function URLSerializer(url, excludeFragment = false) {
      const href = url.href;
      if (!excludeFragment) {
        return href;
      }
      const hash = href.lastIndexOf("#");
      if (hash === -1) {
        return href;
      }
      return href.slice(0, hash);
    }
    __name(URLSerializer, "URLSerializer");
    function collectASequenceOfCodePoints(condition, input, position) {
      let result = "";
      while (position.position < input.length && condition(input[position.position])) {
        result += input[position.position];
        position.position++;
      }
      return result;
    }
    __name(collectASequenceOfCodePoints, "collectASequenceOfCodePoints");
    function collectASequenceOfCodePointsFast(char, input, position) {
      const idx = input.indexOf(char, position.position);
      const start = position.position;
      if (idx === -1) {
        position.position = input.length;
        return input.slice(start);
      }
      position.position = idx;
      return input.slice(start, position.position);
    }
    __name(collectASequenceOfCodePointsFast, "collectASequenceOfCodePointsFast");
    function stringPercentDecode(input) {
      const bytes = encoder.encode(input);
      return percentDecode(bytes);
    }
    __name(stringPercentDecode, "stringPercentDecode");
    function percentDecode(input) {
      const output = [];
      for (let i = 0; i < input.length; i++) {
        const byte = input[i];
        if (byte !== 37) {
          output.push(byte);
        } else if (byte === 37 && !/^[0-9A-Fa-f]{2}$/i.test(String.fromCharCode(input[i + 1], input[i + 2]))) {
          output.push(37);
        } else {
          const nextTwoBytes = String.fromCharCode(input[i + 1], input[i + 2]);
          const bytePoint = Number.parseInt(nextTwoBytes, 16);
          output.push(bytePoint);
          i += 2;
        }
      }
      return Uint8Array.from(output);
    }
    __name(percentDecode, "percentDecode");
    function parseMIMEType(input) {
      input = removeHTTPWhitespace(input, true, true);
      const position = { position: 0 };
      const type = collectASequenceOfCodePointsFast(
        "/",
        input,
        position
      );
      if (type.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(type)) {
        return "failure";
      }
      if (position.position > input.length) {
        return "failure";
      }
      position.position++;
      let subtype = collectASequenceOfCodePointsFast(
        ";",
        input,
        position
      );
      subtype = removeHTTPWhitespace(subtype, false, true);
      if (subtype.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(subtype)) {
        return "failure";
      }
      const typeLowercase = type.toLowerCase();
      const subtypeLowercase = subtype.toLowerCase();
      const mimeType = {
        type: typeLowercase,
        subtype: subtypeLowercase,
        /** @type {Map<string, string>} */
        parameters: /* @__PURE__ */ new Map(),
        // https://mimesniff.spec.whatwg.org/#mime-type-essence
        essence: \`\${typeLowercase}/\${subtypeLowercase}\`
      };
      while (position.position < input.length) {
        position.position++;
        collectASequenceOfCodePoints(
          // https://fetch.spec.whatwg.org/#http-whitespace
          (char) => HTTP_WHITESPACE_REGEX.test(char),
          input,
          position
        );
        let parameterName = collectASequenceOfCodePoints(
          (char) => char !== ";" && char !== "=",
          input,
          position
        );
        parameterName = parameterName.toLowerCase();
        if (position.position < input.length) {
          if (input[position.position] === ";") {
            continue;
          }
          position.position++;
        }
        if (position.position > input.length) {
          break;
        }
        let parameterValue = null;
        if (input[position.position] === '"') {
          parameterValue = collectAnHTTPQuotedString(input, position, true);
          collectASequenceOfCodePointsFast(
            ";",
            input,
            position
          );
        } else {
          parameterValue = collectASequenceOfCodePointsFast(
            ";",
            input,
            position
          );
          parameterValue = removeHTTPWhitespace(parameterValue, false, true);
          if (parameterValue.length === 0) {
            continue;
          }
        }
        if (parameterName.length !== 0 && HTTP_TOKEN_CODEPOINTS.test(parameterName) && (parameterValue.length === 0 || HTTP_QUOTED_STRING_TOKENS.test(parameterValue)) && !mimeType.parameters.has(parameterName)) {
          mimeType.parameters.set(parameterName, parameterValue);
        }
      }
      return mimeType;
    }
    __name(parseMIMEType, "parseMIMEType");
    function forgivingBase64(data) {
      data = data.replace(/[\\u0009\\u000A\\u000C\\u000D\\u0020]/g, "");
      if (data.length % 4 === 0) {
        data = data.replace(/=?=$/, "");
      }
      if (data.length % 4 === 1) {
        return "failure";
      }
      if (/[^+/0-9A-Za-z]/.test(data)) {
        return "failure";
      }
      const binary = atob2(data);
      const bytes = new Uint8Array(binary.length);
      for (let byte = 0; byte < binary.length; byte++) {
        bytes[byte] = binary.charCodeAt(byte);
      }
      return bytes;
    }
    __name(forgivingBase64, "forgivingBase64");
    function collectAnHTTPQuotedString(input, position, extractValue) {
      const positionStart = position.position;
      let value = "";
      assert(input[position.position] === '"');
      position.position++;
      while (true) {
        value += collectASequenceOfCodePoints(
          (char) => char !== '"' && char !== "\\\\",
          input,
          position
        );
        if (position.position >= input.length) {
          break;
        }
        const quoteOrBackslash = input[position.position];
        position.position++;
        if (quoteOrBackslash === "\\\\") {
          if (position.position >= input.length) {
            value += "\\\\";
            break;
          }
          value += input[position.position];
          position.position++;
        } else {
          assert(quoteOrBackslash === '"');
          break;
        }
      }
      if (extractValue) {
        return value;
      }
      return input.slice(positionStart, position.position);
    }
    __name(collectAnHTTPQuotedString, "collectAnHTTPQuotedString");
    function serializeAMimeType(mimeType) {
      assert(mimeType !== "failure");
      const { parameters, essence } = mimeType;
      let serialization = essence;
      for (let [name, value] of parameters.entries()) {
        serialization += ";";
        serialization += name;
        serialization += "=";
        if (!HTTP_TOKEN_CODEPOINTS.test(value)) {
          value = value.replace(/(\\\\|")/g, "\\\\$1");
          value = '"' + value;
          value += '"';
        }
        serialization += value;
      }
      return serialization;
    }
    __name(serializeAMimeType, "serializeAMimeType");
    function isHTTPWhiteSpace(char) {
      return char === "\\r" || char === "\\n" || char === "	" || char === " ";
    }
    __name(isHTTPWhiteSpace, "isHTTPWhiteSpace");
    function removeHTTPWhitespace(str, leading = true, trailing = true) {
      let lead = 0;
      let trail = str.length - 1;
      if (leading) {
        for (; lead < str.length && isHTTPWhiteSpace(str[lead]); lead++)
          ;
      }
      if (trailing) {
        for (; trail > 0 && isHTTPWhiteSpace(str[trail]); trail--)
          ;
      }
      return str.slice(lead, trail + 1);
    }
    __name(removeHTTPWhitespace, "removeHTTPWhitespace");
    function isASCIIWhitespace(char) {
      return char === "\\r" || char === "\\n" || char === "	" || char === "\\f" || char === " ";
    }
    __name(isASCIIWhitespace, "isASCIIWhitespace");
    function removeASCIIWhitespace(str, leading = true, trailing = true) {
      let lead = 0;
      let trail = str.length - 1;
      if (leading) {
        for (; lead < str.length && isASCIIWhitespace(str[lead]); lead++)
          ;
      }
      if (trailing) {
        for (; trail > 0 && isASCIIWhitespace(str[trail]); trail--)
          ;
      }
      return str.slice(lead, trail + 1);
    }
    __name(removeASCIIWhitespace, "removeASCIIWhitespace");
    module2.exports = {
      dataURLProcessor,
      URLSerializer,
      collectASequenceOfCodePoints,
      collectASequenceOfCodePointsFast,
      stringPercentDecode,
      parseMIMEType,
      collectAnHTTPQuotedString,
      serializeAMimeType
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/file.js
var require_file = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/file.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { Blob: Blob2, File: NativeFile } = require("buffer");
    var { types } = require("util");
    var { kState } = require_symbols();
    var { isBlobLike } = require_util2();
    var { webidl } = require_webidl();
    var { parseMIMEType, serializeAMimeType } = require_dataURL();
    var { kEnumerableProperty } = require_util();
    var _File = class _File extends Blob2 {
      constructor(fileBits, fileName, options = {}) {
        webidl.argumentLengthCheck(arguments, 2, { header: "File constructor" });
        fileBits = webidl.converters["sequence<BlobPart>"](fileBits);
        fileName = webidl.converters.USVString(fileName);
        options = webidl.converters.FilePropertyBag(options);
        const n = fileName;
        let t = options.type;
        let d;
        substep: {
          if (t) {
            t = parseMIMEType(t);
            if (t === "failure") {
              t = "";
              break substep;
            }
            t = serializeAMimeType(t).toLowerCase();
          }
          d = options.lastModified;
        }
        super(processBlobParts(fileBits, options), { type: t });
        this[kState] = {
          name: n,
          lastModified: d,
          type: t
        };
      }
      get name() {
        webidl.brandCheck(this, _File);
        return this[kState].name;
      }
      get lastModified() {
        webidl.brandCheck(this, _File);
        return this[kState].lastModified;
      }
      get type() {
        webidl.brandCheck(this, _File);
        return this[kState].type;
      }
    };
    __name(_File, "File");
    var File2 = _File;
    var _FileLike = class _FileLike {
      constructor(blobLike, fileName, options = {}) {
        const n = fileName;
        const t = options.type;
        const d = options.lastModified ?? Date.now();
        this[kState] = {
          blobLike,
          name: n,
          type: t,
          lastModified: d
        };
      }
      stream(...args) {
        webidl.brandCheck(this, _FileLike);
        return this[kState].blobLike.stream(...args);
      }
      arrayBuffer(...args) {
        webidl.brandCheck(this, _FileLike);
        return this[kState].blobLike.arrayBuffer(...args);
      }
      slice(...args) {
        webidl.brandCheck(this, _FileLike);
        return this[kState].blobLike.slice(...args);
      }
      text(...args) {
        webidl.brandCheck(this, _FileLike);
        return this[kState].blobLike.text(...args);
      }
      get size() {
        webidl.brandCheck(this, _FileLike);
        return this[kState].blobLike.size;
      }
      get type() {
        webidl.brandCheck(this, _FileLike);
        return this[kState].blobLike.type;
      }
      get name() {
        webidl.brandCheck(this, _FileLike);
        return this[kState].name;
      }
      get lastModified() {
        webidl.brandCheck(this, _FileLike);
        return this[kState].lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    };
    __name(_FileLike, "FileLike");
    var FileLike = _FileLike;
    Object.defineProperties(File2.prototype, {
      [Symbol.toStringTag]: {
        value: "File",
        configurable: true
      },
      name: kEnumerableProperty,
      lastModified: kEnumerableProperty
    });
    webidl.converters.Blob = webidl.interfaceConverter(Blob2);
    webidl.converters.BlobPart = function(V, opts) {
      if (webidl.util.Type(V) === "Object") {
        if (isBlobLike(V)) {
          return webidl.converters.Blob(V, { strict: false });
        }
        if (ArrayBuffer.isView(V) || types.isAnyArrayBuffer(V)) {
          return webidl.converters.BufferSource(V, opts);
        }
      }
      return webidl.converters.USVString(V, opts);
    };
    webidl.converters["sequence<BlobPart>"] = webidl.sequenceConverter(
      webidl.converters.BlobPart
    );
    webidl.converters.FilePropertyBag = webidl.dictionaryConverter([
      {
        key: "lastModified",
        converter: webidl.converters["long long"],
        get defaultValue() {
          return Date.now();
        }
      },
      {
        key: "type",
        converter: webidl.converters.DOMString,
        defaultValue: ""
      },
      {
        key: "endings",
        converter: (value) => {
          value = webidl.converters.DOMString(value);
          value = value.toLowerCase();
          if (value !== "native") {
            value = "transparent";
          }
          return value;
        },
        defaultValue: "transparent"
      }
    ]);
    function processBlobParts(parts, options) {
      const bytes = [];
      for (const element of parts) {
        if (typeof element === "string") {
          let s = element;
          if (options.endings === "native") {
            s = convertLineEndingsNative(s);
          }
          bytes.push(new TextEncoder().encode(s));
        } else if (types.isAnyArrayBuffer(element) || types.isTypedArray(element)) {
          if (!element.buffer) {
            bytes.push(new Uint8Array(element));
          } else {
            bytes.push(
              new Uint8Array(element.buffer, element.byteOffset, element.byteLength)
            );
          }
        } else if (isBlobLike(element)) {
          bytes.push(element);
        }
      }
      return bytes;
    }
    __name(processBlobParts, "processBlobParts");
    function convertLineEndingsNative(s) {
      let nativeLineEnding = "\\n";
      if (define_process_default.platform === "win32") {
        nativeLineEnding = "\\r\\n";
      }
      return s.replace(/\\r?\\n/g, nativeLineEnding);
    }
    __name(convertLineEndingsNative, "convertLineEndingsNative");
    function isFileLike(object) {
      return NativeFile && object instanceof NativeFile || object instanceof File2 || object && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && object[Symbol.toStringTag] === "File";
    }
    __name(isFileLike, "isFileLike");
    module2.exports = { File: File2, FileLike, isFileLike };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/formdata.js
var require_formdata = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/formdata.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { isBlobLike, toUSVString, makeIterator } = require_util2();
    var { kState } = require_symbols();
    var { File: UndiciFile, FileLike, isFileLike } = require_file();
    var { webidl } = require_webidl();
    var { Blob: Blob2, File: NativeFile } = require("buffer");
    var File2 = NativeFile ?? UndiciFile;
    var _FormData = class _FormData {
      constructor(form) {
        if (form !== void 0) {
          throw webidl.errors.conversionFailed({
            prefix: "FormData constructor",
            argument: "Argument 1",
            types: ["undefined"]
          });
        }
        this[kState] = [];
      }
      append(name, value, filename = void 0) {
        webidl.brandCheck(this, _FormData);
        webidl.argumentLengthCheck(arguments, 2, { header: "FormData.append" });
        if (arguments.length === 3 && !isBlobLike(value)) {
          throw new TypeError(
            "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
          );
        }
        name = webidl.converters.USVString(name);
        value = isBlobLike(value) ? webidl.converters.Blob(value, { strict: false }) : webidl.converters.USVString(value);
        filename = arguments.length === 3 ? webidl.converters.USVString(filename) : void 0;
        const entry = makeEntry(name, value, filename);
        this[kState].push(entry);
      }
      delete(name) {
        webidl.brandCheck(this, _FormData);
        webidl.argumentLengthCheck(arguments, 1, { header: "FormData.delete" });
        name = webidl.converters.USVString(name);
        this[kState] = this[kState].filter((entry) => entry.name !== name);
      }
      get(name) {
        webidl.brandCheck(this, _FormData);
        webidl.argumentLengthCheck(arguments, 1, { header: "FormData.get" });
        name = webidl.converters.USVString(name);
        const idx = this[kState].findIndex((entry) => entry.name === name);
        if (idx === -1) {
          return null;
        }
        return this[kState][idx].value;
      }
      getAll(name) {
        webidl.brandCheck(this, _FormData);
        webidl.argumentLengthCheck(arguments, 1, { header: "FormData.getAll" });
        name = webidl.converters.USVString(name);
        return this[kState].filter((entry) => entry.name === name).map((entry) => entry.value);
      }
      has(name) {
        webidl.brandCheck(this, _FormData);
        webidl.argumentLengthCheck(arguments, 1, { header: "FormData.has" });
        name = webidl.converters.USVString(name);
        return this[kState].findIndex((entry) => entry.name === name) !== -1;
      }
      set(name, value, filename = void 0) {
        webidl.brandCheck(this, _FormData);
        webidl.argumentLengthCheck(arguments, 2, { header: "FormData.set" });
        if (arguments.length === 3 && !isBlobLike(value)) {
          throw new TypeError(
            "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
          );
        }
        name = webidl.converters.USVString(name);
        value = isBlobLike(value) ? webidl.converters.Blob(value, { strict: false }) : webidl.converters.USVString(value);
        filename = arguments.length === 3 ? toUSVString(filename) : void 0;
        const entry = makeEntry(name, value, filename);
        const idx = this[kState].findIndex((entry2) => entry2.name === name);
        if (idx !== -1) {
          this[kState] = [
            ...this[kState].slice(0, idx),
            entry,
            ...this[kState].slice(idx + 1).filter((entry2) => entry2.name !== name)
          ];
        } else {
          this[kState].push(entry);
        }
      }
      entries() {
        webidl.brandCheck(this, _FormData);
        return makeIterator(
          () => this[kState].map((pair) => [pair.name, pair.value]),
          "FormData",
          "key+value"
        );
      }
      keys() {
        webidl.brandCheck(this, _FormData);
        return makeIterator(
          () => this[kState].map((pair) => [pair.name, pair.value]),
          "FormData",
          "key"
        );
      }
      values() {
        webidl.brandCheck(this, _FormData);
        return makeIterator(
          () => this[kState].map((pair) => [pair.name, pair.value]),
          "FormData",
          "value"
        );
      }
      /**
       * @param {(value: string, key: string, self: FormData) => void} callbackFn
       * @param {unknown} thisArg
       */
      forEach(callbackFn, thisArg = globalThis) {
        webidl.brandCheck(this, _FormData);
        webidl.argumentLengthCheck(arguments, 1, { header: "FormData.forEach" });
        if (typeof callbackFn !== "function") {
          throw new TypeError(
            "Failed to execute 'forEach' on 'FormData': parameter 1 is not of type 'Function'."
          );
        }
        for (const [key, value] of this) {
          callbackFn.apply(thisArg, [value, key, this]);
        }
      }
    };
    __name(_FormData, "FormData");
    var FormData2 = _FormData;
    FormData2.prototype[Symbol.iterator] = FormData2.prototype.entries;
    Object.defineProperties(FormData2.prototype, {
      [Symbol.toStringTag]: {
        value: "FormData",
        configurable: true
      }
    });
    function makeEntry(name, value, filename) {
      name = Buffer.from(name).toString("utf8");
      if (typeof value === "string") {
        value = Buffer.from(value).toString("utf8");
      } else {
        if (!isFileLike(value)) {
          value = value instanceof Blob2 ? new File2([value], "blob", { type: value.type }) : new FileLike(value, "blob", { type: value.type });
        }
        if (filename !== void 0) {
          const options = {
            type: value.type,
            lastModified: value.lastModified
          };
          value = NativeFile && value instanceof NativeFile || value instanceof UndiciFile ? new File2([value], filename, options) : new FileLike(value, filename, options);
        }
      }
      return { name, value };
    }
    __name(makeEntry, "makeEntry");
    module2.exports = { FormData: FormData2 };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/body.js
var require_body = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/body.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var Busboy = require_lib();
    var util = require_util();
    var {
      ReadableStreamFrom,
      isBlobLike,
      isReadableStreamLike,
      readableStreamClose,
      createDeferredPromise,
      fullyReadBody
    } = require_util2();
    var { FormData: FormData2 } = require_formdata();
    var { kState } = require_symbols();
    var { webidl } = require_webidl();
    var { DOMException, structuredClone } = require_constants();
    var { Blob: Blob2, File: NativeFile } = require("buffer");
    var { kBodyUsed } = require_symbols2();
    var assert = require("assert");
    var { isErrored } = require_util();
    var { isUint8Array, isArrayBuffer } = require_util_types();
    var { File: UndiciFile } = require_file();
    var { parseMIMEType, serializeAMimeType } = require_dataURL();
    var ReadableStream = globalThis.ReadableStream;
    var File2 = NativeFile ?? UndiciFile;
    function extractBody(object, keepalive = false) {
      if (!ReadableStream) {
        ReadableStream = require("./streams").ReadableStream;
      }
      let stream = null;
      if (object instanceof ReadableStream) {
        stream = object;
      } else if (isBlobLike(object)) {
        stream = object.stream();
      } else {
        stream = new ReadableStream({
          async pull(controller) {
            controller.enqueue(
              typeof source === "string" ? new TextEncoder().encode(source) : source
            );
            queueMicrotask(() => readableStreamClose(controller));
          },
          start() {
          },
          type: void 0
        });
      }
      assert(isReadableStreamLike(stream));
      let action = null;
      let source = null;
      let length = null;
      let type = null;
      if (typeof object === "string") {
        source = object;
        type = "text/plain;charset=UTF-8";
      } else if (object instanceof URLSearchParams) {
        source = object.toString();
        type = "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isArrayBuffer(object)) {
        source = new Uint8Array(object.slice());
      } else if (ArrayBuffer.isView(object)) {
        source = new Uint8Array(object.buffer.slice(object.byteOffset, object.byteOffset + object.byteLength));
      } else if (util.isFormDataLike(object)) {
        const boundary = \`----formdata-undici-0\${\`\${Math.floor(Math.random() * 1e11)}\`.padStart(11, "0")}\`;
        const prefix = \`--\${boundary}\\r
Content-Disposition: form-data\`;
        const escape = /* @__PURE__ */ __name((str) => str.replace(/\\n/g, "%0A").replace(/\\r/g, "%0D").replace(/"/g, "%22"), "escape");
        const normalizeLinefeeds = /* @__PURE__ */ __name((value) => value.replace(/\\r?\\n|\\r/g, "\\r\\n"), "normalizeLinefeeds");
        const enc = new TextEncoder();
        const blobParts = [];
        const rn = new Uint8Array([13, 10]);
        length = 0;
        let hasUnknownSizeValue = false;
        for (const [name, value] of object) {
          if (typeof value === "string") {
            const chunk2 = enc.encode(prefix + \`; name="\${escape(normalizeLinefeeds(name))}"\\r
\\r
\${normalizeLinefeeds(value)}\\r
\`);
            blobParts.push(chunk2);
            length += chunk2.byteLength;
          } else {
            const chunk2 = enc.encode(\`\${prefix}; name="\${escape(normalizeLinefeeds(name))}"\` + (value.name ? \`; filename="\${escape(value.name)}"\` : "") + \`\\r
Content-Type: \${value.type || "application/octet-stream"}\\r
\\r
\`);
            blobParts.push(chunk2, value, rn);
            if (typeof value.size === "number") {
              length += chunk2.byteLength + value.size + rn.byteLength;
            } else {
              hasUnknownSizeValue = true;
            }
          }
        }
        const chunk = enc.encode(\`--\${boundary}--\`);
        blobParts.push(chunk);
        length += chunk.byteLength;
        if (hasUnknownSizeValue) {
          length = null;
        }
        source = object;
        action = /* @__PURE__ */ __name(async function* () {
          for (const part of blobParts) {
            if (part.stream) {
              yield* part.stream();
            } else {
              yield part;
            }
          }
        }, "action");
        type = "multipart/form-data; boundary=" + boundary;
      } else if (isBlobLike(object)) {
        source = object;
        length = object.size;
        if (object.type) {
          type = object.type;
        }
      } else if (typeof object[Symbol.asyncIterator] === "function") {
        if (keepalive) {
          throw new TypeError("keepalive");
        }
        if (util.isDisturbed(object) || object.locked) {
          throw new TypeError(
            "Response body object should not be disturbed or locked"
          );
        }
        stream = object instanceof ReadableStream ? object : ReadableStreamFrom(object);
      }
      if (typeof source === "string" || util.isBuffer(source)) {
        length = Buffer.byteLength(source);
      }
      if (action != null) {
        let iterator;
        stream = new ReadableStream({
          async start() {
            iterator = action(object)[Symbol.asyncIterator]();
          },
          async pull(controller) {
            const { value, done } = await iterator.next();
            if (done) {
              queueMicrotask(() => {
                controller.close();
              });
            } else {
              if (!isErrored(stream)) {
                controller.enqueue(new Uint8Array(value));
              }
            }
            return controller.desiredSize > 0;
          },
          async cancel(reason) {
            await iterator.return();
          },
          type: void 0
        });
      }
      const body = { stream, source, length };
      return [body, type];
    }
    __name(extractBody, "extractBody");
    function safelyExtractBody(object, keepalive = false) {
      if (!ReadableStream) {
        ReadableStream = require("./streams").ReadableStream;
      }
      if (object instanceof ReadableStream) {
        assert(!util.isDisturbed(object), "The body has already been consumed.");
        assert(!object.locked, "The stream is locked.");
      }
      return extractBody(object, keepalive);
    }
    __name(safelyExtractBody, "safelyExtractBody");
    function cloneBody(body) {
      const [out1, out2] = body.stream.tee();
      const out2Clone = structuredClone(out2, { transfer: [out2] });
      const [, finalClone] = out2Clone.tee();
      body.stream = out1;
      return {
        stream: finalClone,
        length: body.length,
        source: body.source
      };
    }
    __name(cloneBody, "cloneBody");
    async function* consumeBody(body) {
      if (body) {
        if (isUint8Array(body)) {
          yield body;
        } else {
          const stream = body.stream;
          if (util.isDisturbed(stream)) {
            throw new TypeError("The body has already been consumed.");
          }
          if (stream.locked) {
            throw new TypeError("The stream is locked.");
          }
          stream[kBodyUsed] = true;
          yield* stream;
        }
      }
    }
    __name(consumeBody, "consumeBody");
    function throwIfAborted(state) {
      if (state.aborted) {
        throw new DOMException("The operation was aborted.", "AbortError");
      }
    }
    __name(throwIfAborted, "throwIfAborted");
    function bodyMixinMethods(instance) {
      const methods = {
        blob() {
          return specConsumeBody(this, (bytes) => {
            let mimeType = bodyMimeType(this);
            if (mimeType === "failure") {
              mimeType = "";
            } else if (mimeType) {
              mimeType = serializeAMimeType(mimeType);
            }
            return new Blob2([bytes], { type: mimeType });
          }, instance);
        },
        arrayBuffer() {
          return specConsumeBody(this, (bytes) => {
            return new Uint8Array(bytes).buffer;
          }, instance);
        },
        text() {
          return specConsumeBody(this, utf8DecodeBytes, instance);
        },
        json() {
          return specConsumeBody(this, parseJSONFromBytes, instance);
        },
        async formData() {
          webidl.brandCheck(this, instance);
          throwIfAborted(this[kState]);
          const contentType = this.headers.get("Content-Type");
          if (/multipart\\/form-data/.test(contentType)) {
            const headers = {};
            for (const [key, value] of this.headers)
              headers[key.toLowerCase()] = value;
            const responseFormData = new FormData2();
            let busboy;
            try {
              busboy = Busboy({
                headers,
                defParamCharset: "utf8"
              });
            } catch (err) {
              throw new DOMException(\`\${err}\`, "AbortError");
            }
            busboy.on("field", (name, value) => {
              responseFormData.append(name, value);
            });
            busboy.on("file", (name, value, info) => {
              const { filename, encoding, mimeType } = info;
              const chunks = [];
              if (encoding === "base64" || encoding.toLowerCase() === "base64") {
                let base64chunk = "";
                value.on("data", (chunk) => {
                  base64chunk += chunk.toString().replace(/[\\r\\n]/gm, "");
                  const end = base64chunk.length - base64chunk.length % 4;
                  chunks.push(Buffer.from(base64chunk.slice(0, end), "base64"));
                  base64chunk = base64chunk.slice(end);
                });
                value.on("end", () => {
                  chunks.push(Buffer.from(base64chunk, "base64"));
                  responseFormData.append(name, new File2(chunks, filename, { type: mimeType }));
                });
              } else {
                value.on("data", (chunk) => {
                  chunks.push(chunk);
                });
                value.on("end", () => {
                  responseFormData.append(name, new File2(chunks, filename, { type: mimeType }));
                });
              }
            });
            const busboyResolve = new Promise((resolve, reject) => {
              busboy.on("finish", resolve);
              busboy.on("error", (err) => reject(new TypeError(err)));
            });
            if (this.body !== null)
              for await (const chunk of consumeBody(this[kState].body))
                busboy.write(chunk);
            busboy.end();
            await busboyResolve;
            return responseFormData;
          } else if (/application\\/x-www-form-urlencoded/.test(contentType)) {
            let entries;
            try {
              let text = "";
              const textDecoder = new TextDecoder("utf-8", { ignoreBOM: true });
              for await (const chunk of consumeBody(this[kState].body)) {
                if (!isUint8Array(chunk)) {
                  throw new TypeError("Expected Uint8Array chunk");
                }
                text += textDecoder.decode(chunk, { stream: true });
              }
              text += textDecoder.decode();
              entries = new URLSearchParams(text);
            } catch (err) {
              throw Object.assign(new TypeError(), { cause: err });
            }
            const formData = new FormData2();
            for (const [name, value] of entries) {
              formData.append(name, value);
            }
            return formData;
          } else {
            await Promise.resolve();
            throwIfAborted(this[kState]);
            throw webidl.errors.exception({
              header: \`\${instance.name}.formData\`,
              message: "Could not parse content as FormData."
            });
          }
        }
      };
      return methods;
    }
    __name(bodyMixinMethods, "bodyMixinMethods");
    function mixinBody(prototype) {
      Object.assign(prototype.prototype, bodyMixinMethods(prototype));
    }
    __name(mixinBody, "mixinBody");
    async function specConsumeBody(object, convertBytesToJSValue, instance) {
      webidl.brandCheck(object, instance);
      throwIfAborted(object[kState]);
      if (bodyUnusable(object[kState].body)) {
        throw new TypeError("Body is unusable");
      }
      const promise = createDeferredPromise();
      const errorSteps = /* @__PURE__ */ __name((error) => promise.reject(error), "errorSteps");
      const successSteps = /* @__PURE__ */ __name((data) => {
        try {
          promise.resolve(convertBytesToJSValue(data));
        } catch (e) {
          errorSteps(e);
        }
      }, "successSteps");
      if (object[kState].body == null) {
        successSteps(new Uint8Array());
        return promise.promise;
      }
      fullyReadBody(object[kState].body, successSteps, errorSteps);
      return promise.promise;
    }
    __name(specConsumeBody, "specConsumeBody");
    function bodyUnusable(body) {
      return body != null && (body.stream.locked || util.isDisturbed(body.stream));
    }
    __name(bodyUnusable, "bodyUnusable");
    function utf8DecodeBytes(buffer) {
      if (buffer.length === 0) {
        return "";
      }
      if (buffer[0] === 239 && buffer[1] === 187 && buffer[2] === 191) {
        buffer = buffer.subarray(3);
      }
      const output = new TextDecoder().decode(buffer);
      return output;
    }
    __name(utf8DecodeBytes, "utf8DecodeBytes");
    function parseJSONFromBytes(bytes) {
      return JSON.parse(utf8DecodeBytes(bytes));
    }
    __name(parseJSONFromBytes, "parseJSONFromBytes");
    function bodyMimeType(object) {
      const { headersList } = object[kState];
      const contentType = headersList.get("content-type");
      if (contentType === null) {
        return "failure";
      }
      return parseMIMEType(contentType);
    }
    __name(bodyMimeType, "bodyMimeType");
    module2.exports = {
      extractBody,
      safelyExtractBody,
      cloneBody,
      mixinBody
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/response.js
var require_response = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/response.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { Headers: Headers3, HeadersList, fill } = require_headers();
    var { extractBody, cloneBody, mixinBody } = require_body();
    var util = require_util();
    var { kEnumerableProperty } = util;
    var {
      isValidReasonPhrase,
      isCancelled,
      isAborted,
      isBlobLike,
      serializeJavascriptValueToJSONString,
      isErrorLike,
      isomorphicEncode
    } = require_util2();
    var {
      redirectStatus,
      nullBodyStatus,
      DOMException
    } = require_constants();
    var { kState, kHeaders: kHeaders2, kGuard: kGuard2, kRealm } = require_symbols();
    var { webidl } = require_webidl();
    var { FormData: FormData2 } = require_formdata();
    var { getGlobalOrigin } = require_global();
    var { URLSerializer } = require_dataURL();
    var { kHeadersList } = require_symbols2();
    var assert = require("assert");
    var { types } = require("util");
    var ReadableStream = globalThis.ReadableStream || require("./streams").ReadableStream;
    var _Response = class _Response {
      // Creates network error Response.
      static error() {
        const relevantRealm = { settingsObject: {} };
        const responseObject = new _Response();
        responseObject[kState] = makeNetworkError();
        responseObject[kRealm] = relevantRealm;
        responseObject[kHeaders2][kHeadersList] = responseObject[kState].headersList;
        responseObject[kHeaders2][kGuard2] = "immutable";
        responseObject[kHeaders2][kRealm] = relevantRealm;
        return responseObject;
      }
      // https://fetch.spec.whatwg.org/#dom-response-json
      static json(data = void 0, init = {}) {
        webidl.argumentLengthCheck(arguments, 1, { header: "Response.json" });
        if (init !== null) {
          init = webidl.converters.ResponseInit(init);
        }
        const bytes = new TextEncoder("utf-8").encode(
          serializeJavascriptValueToJSONString(data)
        );
        const body = extractBody(bytes);
        const relevantRealm = { settingsObject: {} };
        const responseObject = new _Response();
        responseObject[kRealm] = relevantRealm;
        responseObject[kHeaders2][kGuard2] = "response";
        responseObject[kHeaders2][kRealm] = relevantRealm;
        initializeResponse(responseObject, init, { body: body[0], type: "application/json" });
        return responseObject;
      }
      // Creates a redirect Response that redirects to url with status status.
      static redirect(url, status = 302) {
        const relevantRealm = { settingsObject: {} };
        webidl.argumentLengthCheck(arguments, 1, { header: "Response.redirect" });
        url = webidl.converters.USVString(url);
        status = webidl.converters["unsigned short"](status);
        let parsedURL;
        try {
          parsedURL = new URL(url, getGlobalOrigin());
        } catch (err) {
          throw Object.assign(new TypeError("Failed to parse URL from " + url), {
            cause: err
          });
        }
        if (!redirectStatus.includes(status)) {
          throw new RangeError("Invalid status code " + status);
        }
        const responseObject = new _Response();
        responseObject[kRealm] = relevantRealm;
        responseObject[kHeaders2][kGuard2] = "immutable";
        responseObject[kHeaders2][kRealm] = relevantRealm;
        responseObject[kState].status = status;
        const value = isomorphicEncode(URLSerializer(parsedURL));
        responseObject[kState].headersList.append("location", value);
        return responseObject;
      }
      // https://fetch.spec.whatwg.org/#dom-response
      constructor(body = null, init = {}) {
        if (body !== null) {
          body = webidl.converters.BodyInit(body);
        }
        init = webidl.converters.ResponseInit(init);
        this[kRealm] = { settingsObject: {} };
        this[kState] = makeResponse({});
        this[kHeaders2] = new Headers3();
        this[kHeaders2][kGuard2] = "response";
        this[kHeaders2][kHeadersList] = this[kState].headersList;
        this[kHeaders2][kRealm] = this[kRealm];
        let bodyWithType = null;
        if (body != null) {
          const [extractedBody, type] = extractBody(body);
          bodyWithType = { body: extractedBody, type };
        }
        initializeResponse(this, init, bodyWithType);
      }
      // Returns response\u2019s type, e.g., "cors".
      get type() {
        webidl.brandCheck(this, _Response);
        return this[kState].type;
      }
      // Returns response\u2019s URL, if it has one; otherwise the empty string.
      get url() {
        webidl.brandCheck(this, _Response);
        const urlList = this[kState].urlList;
        const url = urlList[urlList.length - 1] ?? null;
        if (url === null) {
          return "";
        }
        return URLSerializer(url, true);
      }
      // Returns whether response was obtained through a redirect.
      get redirected() {
        webidl.brandCheck(this, _Response);
        return this[kState].urlList.length > 1;
      }
      // Returns response\u2019s status.
      get status() {
        webidl.brandCheck(this, _Response);
        return this[kState].status;
      }
      // Returns whether response\u2019s status is an ok status.
      get ok() {
        webidl.brandCheck(this, _Response);
        return this[kState].status >= 200 && this[kState].status <= 299;
      }
      // Returns response\u2019s status message.
      get statusText() {
        webidl.brandCheck(this, _Response);
        return this[kState].statusText;
      }
      // Returns response\u2019s headers as Headers.
      get headers() {
        webidl.brandCheck(this, _Response);
        return this[kHeaders2];
      }
      get body() {
        webidl.brandCheck(this, _Response);
        return this[kState].body ? this[kState].body.stream : null;
      }
      get bodyUsed() {
        webidl.brandCheck(this, _Response);
        return !!this[kState].body && util.isDisturbed(this[kState].body.stream);
      }
      // Returns a clone of response.
      clone() {
        webidl.brandCheck(this, _Response);
        if (this.bodyUsed || this.body && this.body.locked) {
          throw webidl.errors.exception({
            header: "Response.clone",
            message: "Body has already been consumed."
          });
        }
        const clonedResponse = cloneResponse(this[kState]);
        const clonedResponseObject = new _Response();
        clonedResponseObject[kState] = clonedResponse;
        clonedResponseObject[kRealm] = this[kRealm];
        clonedResponseObject[kHeaders2][kHeadersList] = clonedResponse.headersList;
        clonedResponseObject[kHeaders2][kGuard2] = this[kHeaders2][kGuard2];
        clonedResponseObject[kHeaders2][kRealm] = this[kHeaders2][kRealm];
        return clonedResponseObject;
      }
    };
    __name(_Response, "Response");
    var Response3 = _Response;
    mixinBody(Response3);
    Object.defineProperties(Response3.prototype, {
      type: kEnumerableProperty,
      url: kEnumerableProperty,
      status: kEnumerableProperty,
      ok: kEnumerableProperty,
      redirected: kEnumerableProperty,
      statusText: kEnumerableProperty,
      headers: kEnumerableProperty,
      clone: kEnumerableProperty,
      body: kEnumerableProperty,
      bodyUsed: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "Response",
        configurable: true
      }
    });
    Object.defineProperties(Response3, {
      json: kEnumerableProperty,
      redirect: kEnumerableProperty,
      error: kEnumerableProperty
    });
    function cloneResponse(response) {
      if (response.internalResponse) {
        return filterResponse(
          cloneResponse(response.internalResponse),
          response.type
        );
      }
      const newResponse = makeResponse({ ...response, body: null });
      if (response.body != null) {
        newResponse.body = cloneBody(response.body);
      }
      return newResponse;
    }
    __name(cloneResponse, "cloneResponse");
    function makeResponse(init) {
      return {
        aborted: false,
        rangeRequested: false,
        timingAllowPassed: false,
        requestIncludesCredentials: false,
        type: "default",
        status: 200,
        timingInfo: null,
        cacheState: "",
        statusText: "",
        ...init,
        headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList(),
        urlList: init.urlList ? [...init.urlList] : []
      };
    }
    __name(makeResponse, "makeResponse");
    function makeNetworkError(reason) {
      const isError = isErrorLike(reason);
      return makeResponse({
        type: "error",
        status: 0,
        error: isError ? reason : new Error(reason ? String(reason) : reason),
        aborted: reason && reason.name === "AbortError"
      });
    }
    __name(makeNetworkError, "makeNetworkError");
    function makeFilteredResponse(response, state) {
      state = {
        internalResponse: response,
        ...state
      };
      return new Proxy(response, {
        get(target, p) {
          return p in state ? state[p] : target[p];
        },
        set(target, p, value) {
          assert(!(p in state));
          target[p] = value;
          return true;
        }
      });
    }
    __name(makeFilteredResponse, "makeFilteredResponse");
    function filterResponse(response, type) {
      if (type === "basic") {
        return makeFilteredResponse(response, {
          type: "basic",
          headersList: response.headersList
        });
      } else if (type === "cors") {
        return makeFilteredResponse(response, {
          type: "cors",
          headersList: response.headersList
        });
      } else if (type === "opaque") {
        return makeFilteredResponse(response, {
          type: "opaque",
          urlList: Object.freeze([]),
          status: 0,
          statusText: "",
          body: null
        });
      } else if (type === "opaqueredirect") {
        return makeFilteredResponse(response, {
          type: "opaqueredirect",
          status: 0,
          statusText: "",
          headersList: [],
          body: null
        });
      } else {
        assert(false);
      }
    }
    __name(filterResponse, "filterResponse");
    function makeAppropriateNetworkError(fetchParams) {
      assert(isCancelled(fetchParams));
      return isAborted(fetchParams) ? makeNetworkError(new DOMException("The operation was aborted.", "AbortError")) : makeNetworkError("Request was cancelled.");
    }
    __name(makeAppropriateNetworkError, "makeAppropriateNetworkError");
    function initializeResponse(response, init, body) {
      if (init.status !== null && (init.status < 200 || init.status > 599)) {
        throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
      }
      if ("statusText" in init && init.statusText != null) {
        if (!isValidReasonPhrase(String(init.statusText))) {
          throw new TypeError("Invalid statusText");
        }
      }
      if ("status" in init && init.status != null) {
        response[kState].status = init.status;
      }
      if ("statusText" in init && init.statusText != null) {
        response[kState].statusText = init.statusText;
      }
      if ("headers" in init && init.headers != null) {
        fill(response[kHeaders2], init.headers);
      }
      if (body) {
        if (nullBodyStatus.includes(response.status)) {
          throw webidl.errors.exception({
            header: "Response constructor",
            message: "Invalid response status code " + response.status
          });
        }
        response[kState].body = body.body;
        if (body.type != null && !response[kState].headersList.contains("Content-Type")) {
          response[kState].headersList.append("content-type", body.type);
        }
      }
    }
    __name(initializeResponse, "initializeResponse");
    webidl.converters.ReadableStream = webidl.interfaceConverter(
      ReadableStream
    );
    webidl.converters.FormData = webidl.interfaceConverter(
      FormData2
    );
    webidl.converters.URLSearchParams = webidl.interfaceConverter(
      URLSearchParams
    );
    webidl.converters.XMLHttpRequestBodyInit = function(V) {
      if (typeof V === "string") {
        return webidl.converters.USVString(V);
      }
      if (isBlobLike(V)) {
        return webidl.converters.Blob(V, { strict: false });
      }
      if (types.isAnyArrayBuffer(V) || types.isTypedArray(V) || types.isDataView(V)) {
        return webidl.converters.BufferSource(V);
      }
      if (util.isFormDataLike(V)) {
        return webidl.converters.FormData(V, { strict: false });
      }
      if (V instanceof URLSearchParams) {
        return webidl.converters.URLSearchParams(V);
      }
      return webidl.converters.DOMString(V);
    };
    webidl.converters.BodyInit = function(V) {
      if (V instanceof ReadableStream) {
        return webidl.converters.ReadableStream(V);
      }
      if (V?.[Symbol.asyncIterator]) {
        return V;
      }
      return webidl.converters.XMLHttpRequestBodyInit(V);
    };
    webidl.converters.ResponseInit = webidl.dictionaryConverter([
      {
        key: "status",
        converter: webidl.converters["unsigned short"],
        defaultValue: 200
      },
      {
        key: "statusText",
        converter: webidl.converters.ByteString,
        defaultValue: ""
      },
      {
        key: "headers",
        converter: webidl.converters.HeadersInit
      }
    ]);
    module2.exports = {
      makeNetworkError,
      makeResponse,
      makeAppropriateNetworkError,
      filterResponse,
      Response: Response3,
      cloneResponse
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/compat/dispatcher-weakref.js
var require_dispatcher_weakref = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/compat/dispatcher-weakref.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { kConnected, kSize } = require_symbols2();
    var _CompatWeakRef = class _CompatWeakRef {
      constructor(value) {
        this.value = value;
      }
      deref() {
        return this.value[kConnected] === 0 && this.value[kSize] === 0 ? void 0 : this.value;
      }
    };
    __name(_CompatWeakRef, "CompatWeakRef");
    var CompatWeakRef = _CompatWeakRef;
    var _CompatFinalizer = class _CompatFinalizer {
      constructor(finalizer) {
        this.finalizer = finalizer;
      }
      register(dispatcher, key) {
        dispatcher.on("disconnect", () => {
          if (dispatcher[kConnected] === 0 && dispatcher[kSize] === 0) {
            this.finalizer(key);
          }
        });
      }
    };
    __name(_CompatFinalizer, "CompatFinalizer");
    var CompatFinalizer = _CompatFinalizer;
    module2.exports = function() {
      return {
        WeakRef: global.WeakRef || CompatWeakRef,
        FinalizationRegistry: global.FinalizationRegistry || CompatFinalizer
      };
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/request.js
var require_request = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/request.js"(exports2, module2) {
    "use strict";
    init_define_process();
    global.FinalizationRegistry = function() {
      return { register: function() {
      } };
    };
    var { extractBody, mixinBody, cloneBody } = require_body();
    var { Headers: Headers3, fill: fillHeaders, HeadersList } = require_headers();
    var { FinalizationRegistry } = require_dispatcher_weakref()();
    var util = require_util();
    var {
      isValidHTTPToken,
      sameOrigin,
      normalizeMethod,
      makePolicyContainer
    } = require_util2();
    var {
      forbiddenMethods,
      corsSafeListedMethods,
      referrerPolicy,
      requestRedirect,
      requestMode,
      requestCredentials,
      requestCache,
      requestDuplex
    } = require_constants();
    var { kEnumerableProperty } = util;
    var { kHeaders: kHeaders2, kSignal, kState, kGuard: kGuard2, kRealm } = require_symbols();
    var { webidl } = require_webidl();
    var { getGlobalOrigin } = require_global();
    var { URLSerializer } = require_dataURL();
    var { kHeadersList } = require_symbols2();
    var assert = require("assert");
    var { getMaxListeners, setMaxListeners, getEventListeners, defaultMaxListeners } = require("events");
    var TransformStream = globalThis.TransformStream;
    var kInit = Symbol("init");
    var kAbortController = Symbol("abortController");
    var requestFinalizer = new FinalizationRegistry(({ signal, abort }) => {
      signal.removeEventListener("abort", abort);
    });
    var _Request2 = class _Request2 {
      // https://fetch.spec.whatwg.org/#dom-request
      constructor(input, init = {}) {
        if (input === kInit) {
          return;
        }
        webidl.argumentLengthCheck(arguments, 1, { header: "Request constructor" });
        input = webidl.converters.RequestInfo(input);
        init = webidl.converters.RequestInit(init);
        this[kRealm] = {
          settingsObject: {
            baseUrl: getGlobalOrigin(),
            get origin() {
              return this.baseUrl?.origin;
            },
            policyContainer: makePolicyContainer()
          }
        };
        let request = null;
        let fallbackMode = null;
        const baseUrl = this[kRealm].settingsObject.baseUrl;
        let signal = null;
        if (typeof input === "string") {
          let parsedURL;
          try {
            parsedURL = new URL(input, baseUrl);
          } catch (err) {
            throw new TypeError("Failed to parse URL from " + input, { cause: err });
          }
          if (parsedURL.username || parsedURL.password) {
            throw new TypeError(
              "Request cannot be constructed from a URL that includes credentials: " + input
            );
          }
          request = makeRequest({ urlList: [parsedURL] });
          fallbackMode = "cors";
        } else {
          assert(input instanceof _Request2);
          request = input[kState];
          signal = input[kSignal];
        }
        const origin = this[kRealm].settingsObject.origin;
        let window = "client";
        if (request.window?.constructor?.name === "EnvironmentSettingsObject" && sameOrigin(request.window, origin)) {
          window = request.window;
        }
        if (init.window != null) {
          throw new TypeError(\`'window' option '\${window}' must be null\`);
        }
        if ("window" in init) {
          window = "no-window";
        }
        request = makeRequest({
          // URL request\u2019s URL.
          // undici implementation note: this is set as the first item in request's urlList in makeRequest
          // method request\u2019s method.
          method: request.method,
          // header list A copy of request\u2019s header list.
          // undici implementation note: headersList is cloned in makeRequest
          headersList: request.headersList,
          // unsafe-request flag Set.
          unsafeRequest: request.unsafeRequest,
          // client This\u2019s relevant settings object.
          client: this[kRealm].settingsObject,
          // window window.
          window,
          // priority request\u2019s priority.
          priority: request.priority,
          // origin request\u2019s origin. The propagation of the origin is only significant for navigation requests
          // being handled by a service worker. In this scenario a request can have an origin that is different
          // from the current client.
          origin: request.origin,
          // referrer request\u2019s referrer.
          referrer: request.referrer,
          // referrer policy request\u2019s referrer policy.
          referrerPolicy: request.referrerPolicy,
          // mode request\u2019s mode.
          mode: request.mode,
          // credentials mode request\u2019s credentials mode.
          credentials: request.credentials,
          // cache mode request\u2019s cache mode.
          cache: request.cache,
          // redirect mode request\u2019s redirect mode.
          redirect: request.redirect,
          // integrity metadata request\u2019s integrity metadata.
          integrity: request.integrity,
          // keepalive request\u2019s keepalive.
          keepalive: request.keepalive,
          // reload-navigation flag request\u2019s reload-navigation flag.
          reloadNavigation: request.reloadNavigation,
          // history-navigation flag request\u2019s history-navigation flag.
          historyNavigation: request.historyNavigation,
          // URL list A clone of request\u2019s URL list.
          urlList: [...request.urlList]
        });
        if (Object.keys(init).length > 0) {
          if (request.mode === "navigate") {
            request.mode = "same-origin";
          }
          request.reloadNavigation = false;
          request.historyNavigation = false;
          request.origin = "client";
          request.referrer = "client";
          request.referrerPolicy = "";
          request.url = request.urlList[request.urlList.length - 1];
          request.urlList = [request.url];
        }
        if (init.referrer !== void 0) {
          const referrer = init.referrer;
          if (referrer === "") {
            request.referrer = "no-referrer";
          } else {
            let parsedReferrer;
            try {
              parsedReferrer = new URL(referrer, baseUrl);
            } catch (err) {
              throw new TypeError(\`Referrer "\${referrer}" is not a valid URL.\`, { cause: err });
            }
            if (parsedReferrer.protocol === "about:" && parsedReferrer.hostname === "client" || origin && !sameOrigin(parsedReferrer, this[kRealm].settingsObject.baseUrl)) {
              request.referrer = "client";
            } else {
              request.referrer = parsedReferrer;
            }
          }
        }
        if (init.referrerPolicy !== void 0) {
          request.referrerPolicy = init.referrerPolicy;
        }
        let mode;
        if (init.mode !== void 0) {
          mode = init.mode;
        } else {
          mode = fallbackMode;
        }
        if (mode === "navigate") {
          throw webidl.errors.exception({
            header: "Request constructor",
            message: "invalid request mode navigate."
          });
        }
        if (mode != null) {
          request.mode = mode;
        }
        if (init.credentials !== void 0) {
          request.credentials = init.credentials;
        }
        if (init.cache !== void 0) {
          request.cache = init.cache;
        }
        if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
          throw new TypeError(
            "'only-if-cached' can be set only with 'same-origin' mode"
          );
        }
        if (init.redirect !== void 0) {
          request.redirect = init.redirect;
        }
        if (init.integrity !== void 0 && init.integrity != null) {
          request.integrity = String(init.integrity);
        }
        if (init.keepalive !== void 0) {
          request.keepalive = Boolean(init.keepalive);
        }
        if (init.method !== void 0) {
          let method = init.method;
          if (!isValidHTTPToken(init.method)) {
            throw TypeError(\`'\${init.method}' is not a valid HTTP method.\`);
          }
          if (forbiddenMethods.indexOf(method.toUpperCase()) !== -1) {
            throw TypeError(\`'\${init.method}' HTTP method is unsupported.\`);
          }
          method = normalizeMethod(init.method);
          request.method = method;
        }
        if (init.signal !== void 0) {
          signal = init.signal;
        }
        this[kState] = request;
        const ac = new AbortController();
        this[kSignal] = ac.signal;
        this[kSignal][kRealm] = this[kRealm];
        if (signal != null) {
          if (!signal || typeof signal.aborted !== "boolean" || typeof signal.addEventListener !== "function") {
            throw new TypeError(
              "Failed to construct 'Request': member signal is not of type AbortSignal."
            );
          }
          if (signal.aborted) {
            ac.abort(signal.reason);
          } else {
            this[kAbortController] = ac;
            const acRef = new WeakRef(ac);
            const abort = /* @__PURE__ */ __name(function() {
              const ac2 = acRef.deref();
              if (ac2 !== void 0) {
                ac2.abort(this.reason);
              }
            }, "abort");
            try {
              if (typeof getMaxListeners === "function" && getMaxListeners(signal) === defaultMaxListeners) {
                setMaxListeners(100, signal);
              } else if (getEventListeners(signal, "abort").length >= defaultMaxListeners) {
                setMaxListeners(100, signal);
              }
            } catch {
            }
            util.addAbortListener(signal, abort);
            requestFinalizer.register(ac, { signal, abort });
          }
        }
        this[kHeaders2] = new Headers3();
        this[kHeaders2][kHeadersList] = request.headersList;
        this[kHeaders2][kGuard2] = "request";
        this[kHeaders2][kRealm] = this[kRealm];
        if (mode === "no-cors") {
          if (!corsSafeListedMethods.includes(request.method)) {
            throw new TypeError(
              \`'\${request.method} is unsupported in no-cors mode.\`
            );
          }
          this[kHeaders2][kGuard2] = "request-no-cors";
        }
        if (Object.keys(init).length !== 0) {
          let headers = new Headers3(this[kHeaders2]);
          if (init.headers !== void 0) {
            headers = init.headers;
          }
          this[kHeaders2][kHeadersList].clear();
          if (headers.constructor.name === "Headers") {
            for (const [key, val] of headers) {
              this[kHeaders2].append(key, val);
            }
          } else {
            fillHeaders(this[kHeaders2], headers);
          }
        }
        const inputBody = input instanceof _Request2 ? input[kState].body : null;
        if ((init.body != null || inputBody != null) && (request.method === "GET" || request.method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body.");
        }
        let initBody = null;
        if (init.body != null) {
          const [extractedBody, contentType] = extractBody(
            init.body,
            request.keepalive
          );
          initBody = extractedBody;
          if (contentType && !this[kHeaders2][kHeadersList].contains("content-type")) {
            this[kHeaders2].append("content-type", contentType);
          }
        }
        const inputOrInitBody = initBody ?? inputBody;
        if (inputOrInitBody != null && inputOrInitBody.source == null) {
          if (initBody != null && init.duplex == null) {
            throw new TypeError("RequestInit: duplex option is required when sending a body.");
          }
          if (request.mode !== "same-origin" && request.mode !== "cors") {
            throw new TypeError(
              'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
            );
          }
          request.useCORSPreflightFlag = true;
        }
        let finalBody = inputOrInitBody;
        if (initBody == null && inputBody != null) {
          if (util.isDisturbed(inputBody.stream) || inputBody.stream.locked) {
            throw new TypeError(
              "Cannot construct a Request with a Request object that has already been used."
            );
          }
          if (!TransformStream) {
            TransformStream = require("./streams").TransformStream;
          }
          const identityTransform = new TransformStream();
          inputBody.stream.pipeThrough(identityTransform);
          finalBody = {
            source: inputBody.source,
            length: inputBody.length,
            stream: identityTransform.readable
          };
        }
        this[kState].body = finalBody;
      }
      // Returns request\u2019s HTTP method, which is "GET" by default.
      get method() {
        webidl.brandCheck(this, _Request2);
        return this[kState].method;
      }
      // Returns the URL of request as a string.
      get url() {
        webidl.brandCheck(this, _Request2);
        return URLSerializer(this[kState].url);
      }
      // Returns a Headers object consisting of the headers associated with request.
      // Note that headers added in the network layer by the user agent will not
      // be accounted for in this object, e.g., the "Host" header.
      get headers() {
        webidl.brandCheck(this, _Request2);
        return this[kHeaders2];
      }
      // Returns the kind of resource requested by request, e.g., "document"
      // or "script".
      get destination() {
        webidl.brandCheck(this, _Request2);
        return this[kState].destination;
      }
      // Returns the referrer of request. Its value can be a same-origin URL if
      // explicitly set in init, the empty string to indicate no referrer, and
      // "about:client" when defaulting to the global\u2019s default. This is used
      // during fetching to determine the value of the \`Referer\` header of the
      // request being made.
      get referrer() {
        webidl.brandCheck(this, _Request2);
        if (this[kState].referrer === "no-referrer") {
          return "";
        }
        if (this[kState].referrer === "client") {
          return "about:client";
        }
        return this[kState].referrer.toString();
      }
      // Returns the referrer policy associated with request.
      // This is used during fetching to compute the value of the request\u2019s
      // referrer.
      get referrerPolicy() {
        webidl.brandCheck(this, _Request2);
        return this[kState].referrerPolicy;
      }
      // Returns the mode associated with request, which is a string indicating
      // whether the request will use CORS, or will be restricted to same-origin
      // URLs.
      get mode() {
        webidl.brandCheck(this, _Request2);
        return this[kState].mode;
      }
      // Returns the credentials mode associated with request,
      // which is a string indicating whether credentials will be sent with the
      // request always, never, or only when sent to a same-origin URL.
      get credentials() {
        return this[kState].credentials;
      }
      // Returns the cache mode associated with request,
      // which is a string indicating how the request will
      // interact with the browser\u2019s cache when fetching.
      get cache() {
        webidl.brandCheck(this, _Request2);
        return this[kState].cache;
      }
      // Returns the redirect mode associated with request,
      // which is a string indicating how redirects for the
      // request will be handled during fetching. A request
      // will follow redirects by default.
      get redirect() {
        webidl.brandCheck(this, _Request2);
        return this[kState].redirect;
      }
      // Returns request\u2019s subresource integrity metadata, which is a
      // cryptographic hash of the resource being fetched. Its value
      // consists of multiple hashes separated by whitespace. [SRI]
      get integrity() {
        webidl.brandCheck(this, _Request2);
        return this[kState].integrity;
      }
      // Returns a boolean indicating whether or not request can outlive the
      // global in which it was created.
      get keepalive() {
        webidl.brandCheck(this, _Request2);
        return this[kState].keepalive;
      }
      // Returns a boolean indicating whether or not request is for a reload
      // navigation.
      get isReloadNavigation() {
        webidl.brandCheck(this, _Request2);
        return this[kState].reloadNavigation;
      }
      // Returns a boolean indicating whether or not request is for a history
      // navigation (a.k.a. back-foward navigation).
      get isHistoryNavigation() {
        webidl.brandCheck(this, _Request2);
        return this[kState].historyNavigation;
      }
      // Returns the signal associated with request, which is an AbortSignal
      // object indicating whether or not request has been aborted, and its
      // abort event handler.
      get signal() {
        webidl.brandCheck(this, _Request2);
        return this[kSignal];
      }
      get body() {
        webidl.brandCheck(this, _Request2);
        return this[kState].body ? this[kState].body.stream : null;
      }
      get bodyUsed() {
        webidl.brandCheck(this, _Request2);
        return !!this[kState].body && util.isDisturbed(this[kState].body.stream);
      }
      get duplex() {
        webidl.brandCheck(this, _Request2);
        return "half";
      }
      // Returns a clone of request.
      clone() {
        webidl.brandCheck(this, _Request2);
        if (this.bodyUsed || this.body?.locked) {
          throw new TypeError("unusable");
        }
        const clonedRequest = cloneRequest(this[kState]);
        const clonedRequestObject = new _Request2(kInit);
        clonedRequestObject[kState] = clonedRequest;
        clonedRequestObject[kRealm] = this[kRealm];
        clonedRequestObject[kHeaders2] = new Headers3();
        clonedRequestObject[kHeaders2][kHeadersList] = clonedRequest.headersList;
        clonedRequestObject[kHeaders2][kGuard2] = this[kHeaders2][kGuard2];
        clonedRequestObject[kHeaders2][kRealm] = this[kHeaders2][kRealm];
        const ac = new AbortController();
        if (this.signal.aborted) {
          ac.abort(this.signal.reason);
        } else {
          util.addAbortListener(
            this.signal,
            () => {
              ac.abort(this.signal.reason);
            }
          );
        }
        clonedRequestObject[kSignal] = ac.signal;
        return clonedRequestObject;
      }
    };
    __name(_Request2, "Request");
    var Request2 = _Request2;
    mixinBody(Request2);
    function makeRequest(init) {
      const request = {
        method: "GET",
        localURLsOnly: false,
        unsafeRequest: false,
        body: null,
        client: null,
        reservedClient: null,
        replacesClientId: "",
        window: "client",
        keepalive: false,
        serviceWorkers: "all",
        initiator: "",
        destination: "",
        priority: null,
        origin: "client",
        policyContainer: "client",
        referrer: "client",
        referrerPolicy: "",
        mode: "no-cors",
        useCORSPreflightFlag: false,
        credentials: "same-origin",
        useCredentials: false,
        cache: "default",
        redirect: "follow",
        integrity: "",
        cryptoGraphicsNonceMetadata: "",
        parserMetadata: "",
        reloadNavigation: false,
        historyNavigation: false,
        userActivation: false,
        taintedOrigin: false,
        redirectCount: 0,
        responseTainting: "basic",
        preventNoCacheCacheControlHeaderModification: false,
        done: false,
        timingAllowFailed: false,
        ...init,
        headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList()
      };
      request.url = request.urlList[0];
      return request;
    }
    __name(makeRequest, "makeRequest");
    function cloneRequest(request) {
      const newRequest = makeRequest({ ...request, body: null });
      if (request.body != null) {
        newRequest.body = cloneBody(request.body);
      }
      return newRequest;
    }
    __name(cloneRequest, "cloneRequest");
    Object.defineProperties(Request2.prototype, {
      method: kEnumerableProperty,
      url: kEnumerableProperty,
      headers: kEnumerableProperty,
      redirect: kEnumerableProperty,
      clone: kEnumerableProperty,
      signal: kEnumerableProperty,
      duplex: kEnumerableProperty,
      destination: kEnumerableProperty,
      body: kEnumerableProperty,
      bodyUsed: kEnumerableProperty,
      isHistoryNavigation: kEnumerableProperty,
      isReloadNavigation: kEnumerableProperty,
      keepalive: kEnumerableProperty,
      integrity: kEnumerableProperty,
      cache: kEnumerableProperty,
      credentials: kEnumerableProperty,
      attribute: kEnumerableProperty,
      referrerPolicy: kEnumerableProperty,
      referrer: kEnumerableProperty,
      mode: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "Request",
        configurable: true
      }
    });
    webidl.converters.Request = webidl.interfaceConverter(
      Request2
    );
    webidl.converters.RequestInfo = function(V) {
      if (typeof V === "string") {
        return webidl.converters.USVString(V);
      }
      if (V instanceof Request2) {
        return webidl.converters.Request(V);
      }
      return webidl.converters.USVString(V);
    };
    webidl.converters.AbortSignal = webidl.interfaceConverter(
      AbortSignal
    );
    webidl.converters.RequestInit = webidl.dictionaryConverter([
      {
        key: "method",
        converter: webidl.converters.ByteString
      },
      {
        key: "headers",
        converter: webidl.converters.HeadersInit
      },
      {
        key: "body",
        converter: webidl.nullableConverter(
          webidl.converters.BodyInit
        )
      },
      {
        key: "referrer",
        converter: webidl.converters.USVString
      },
      {
        key: "referrerPolicy",
        converter: webidl.converters.DOMString,
        // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
        allowedValues: referrerPolicy
      },
      {
        key: "mode",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#concept-request-mode
        allowedValues: requestMode
      },
      {
        key: "credentials",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#requestcredentials
        allowedValues: requestCredentials
      },
      {
        key: "cache",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#requestcache
        allowedValues: requestCache
      },
      {
        key: "redirect",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#requestredirect
        allowedValues: requestRedirect
      },
      {
        key: "integrity",
        converter: webidl.converters.DOMString
      },
      {
        key: "keepalive",
        converter: webidl.converters.boolean
      },
      {
        key: "signal",
        converter: webidl.nullableConverter(
          (signal) => webidl.converters.AbortSignal(
            signal,
            { strict: false }
          )
        )
      },
      {
        key: "window",
        converter: webidl.converters.any
      },
      {
        key: "duplex",
        converter: webidl.converters.DOMString,
        allowedValues: requestDuplex
      }
    ]);
    module2.exports = { Request: Request2, makeRequest };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/dispatcher.js
var require_dispatcher = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/dispatcher.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var EventEmitter = require("events");
    var _Dispatcher = class _Dispatcher extends EventEmitter {
      dispatch() {
        throw new Error("not implemented");
      }
      close() {
        throw new Error("not implemented");
      }
      destroy() {
        throw new Error("not implemented");
      }
    };
    __name(_Dispatcher, "Dispatcher");
    var Dispatcher = _Dispatcher;
    module2.exports = Dispatcher;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/dispatcher-base.js
var require_dispatcher_base = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/dispatcher-base.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var Dispatcher = require_dispatcher();
    var {
      ClientDestroyedError,
      ClientClosedError,
      InvalidArgumentError: InvalidArgumentError2
    } = require_errors();
    var { kDestroy, kClose, kDispatch, kInterceptors } = require_symbols2();
    var kDestroyed = Symbol("destroyed");
    var kClosed = Symbol("closed");
    var kOnDestroyed = Symbol("onDestroyed");
    var kOnClosed = Symbol("onClosed");
    var kInterceptedDispatch = Symbol("Intercepted Dispatch");
    var _DispatcherBase = class _DispatcherBase extends Dispatcher {
      constructor() {
        super();
        this[kDestroyed] = false;
        this[kOnDestroyed] = null;
        this[kClosed] = false;
        this[kOnClosed] = [];
      }
      get destroyed() {
        return this[kDestroyed];
      }
      get closed() {
        return this[kClosed];
      }
      get interceptors() {
        return this[kInterceptors];
      }
      set interceptors(newInterceptors) {
        if (newInterceptors) {
          for (let i = newInterceptors.length - 1; i >= 0; i--) {
            const interceptor = this[kInterceptors][i];
            if (typeof interceptor !== "function") {
              throw new InvalidArgumentError2("interceptor must be an function");
            }
          }
        }
        this[kInterceptors] = newInterceptors;
      }
      close(callback) {
        if (callback === void 0) {
          return new Promise((resolve, reject) => {
            this.close((err, data) => {
              return err ? reject(err) : resolve(data);
            });
          });
        }
        if (typeof callback !== "function") {
          throw new InvalidArgumentError2("invalid callback");
        }
        if (this[kDestroyed]) {
          queueMicrotask(() => callback(new ClientDestroyedError(), null));
          return;
        }
        if (this[kClosed]) {
          if (this[kOnClosed]) {
            this[kOnClosed].push(callback);
          } else {
            queueMicrotask(() => callback(null, null));
          }
          return;
        }
        this[kClosed] = true;
        this[kOnClosed].push(callback);
        const onClosed = /* @__PURE__ */ __name(() => {
          const callbacks = this[kOnClosed];
          this[kOnClosed] = null;
          for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](null, null);
          }
        }, "onClosed");
        this[kClose]().then(() => this.destroy()).then(() => {
          queueMicrotask(onClosed);
        });
      }
      destroy(err, callback) {
        if (typeof err === "function") {
          callback = err;
          err = null;
        }
        if (callback === void 0) {
          return new Promise((resolve, reject) => {
            this.destroy(err, (err2, data) => {
              return err2 ? (
                /* istanbul ignore next: should never error */
                reject(err2)
              ) : resolve(data);
            });
          });
        }
        if (typeof callback !== "function") {
          throw new InvalidArgumentError2("invalid callback");
        }
        if (this[kDestroyed]) {
          if (this[kOnDestroyed]) {
            this[kOnDestroyed].push(callback);
          } else {
            queueMicrotask(() => callback(null, null));
          }
          return;
        }
        if (!err) {
          err = new ClientDestroyedError();
        }
        this[kDestroyed] = true;
        this[kOnDestroyed] = this[kOnDestroyed] || [];
        this[kOnDestroyed].push(callback);
        const onDestroyed = /* @__PURE__ */ __name(() => {
          const callbacks = this[kOnDestroyed];
          this[kOnDestroyed] = null;
          for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](null, null);
          }
        }, "onDestroyed");
        this[kDestroy](err).then(() => {
          queueMicrotask(onDestroyed);
        });
      }
      [kInterceptedDispatch](opts, handler) {
        if (!this[kInterceptors] || this[kInterceptors].length === 0) {
          this[kInterceptedDispatch] = this[kDispatch];
          return this[kDispatch](opts, handler);
        }
        let dispatch = this[kDispatch].bind(this);
        for (let i = this[kInterceptors].length - 1; i >= 0; i--) {
          dispatch = this[kInterceptors][i](dispatch);
        }
        this[kInterceptedDispatch] = dispatch;
        return dispatch(opts, handler);
      }
      dispatch(opts, handler) {
        if (!handler || typeof handler !== "object") {
          throw new InvalidArgumentError2("handler must be an object");
        }
        try {
          if (!opts || typeof opts !== "object") {
            throw new InvalidArgumentError2("opts must be an object.");
          }
          if (this[kDestroyed] || this[kOnDestroyed]) {
            throw new ClientDestroyedError();
          }
          if (this[kClosed]) {
            throw new ClientClosedError();
          }
          return this[kInterceptedDispatch](opts, handler);
        } catch (err) {
          if (typeof handler.onError !== "function") {
            throw new InvalidArgumentError2("invalid onError method");
          }
          handler.onError(err);
          return false;
        }
      }
    };
    __name(_DispatcherBase, "DispatcherBase");
    var DispatcherBase = _DispatcherBase;
    module2.exports = DispatcherBase;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/node/fixed-queue.js
var require_fixed_queue = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/node/fixed-queue.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var kSize = 2048;
    var kMask = kSize - 1;
    var _FixedCircularBuffer = class _FixedCircularBuffer {
      constructor() {
        this.bottom = 0;
        this.top = 0;
        this.list = new Array(kSize);
        this.next = null;
      }
      isEmpty() {
        return this.top === this.bottom;
      }
      isFull() {
        return (this.top + 1 & kMask) === this.bottom;
      }
      push(data) {
        this.list[this.top] = data;
        this.top = this.top + 1 & kMask;
      }
      shift() {
        const nextItem = this.list[this.bottom];
        if (nextItem === void 0)
          return null;
        this.list[this.bottom] = void 0;
        this.bottom = this.bottom + 1 & kMask;
        return nextItem;
      }
    };
    __name(_FixedCircularBuffer, "FixedCircularBuffer");
    var FixedCircularBuffer = _FixedCircularBuffer;
    var _a;
    module2.exports = (_a = class {
      constructor() {
        this.head = this.tail = new FixedCircularBuffer();
      }
      isEmpty() {
        return this.head.isEmpty();
      }
      push(data) {
        if (this.head.isFull()) {
          this.head = this.head.next = new FixedCircularBuffer();
        }
        this.head.push(data);
      }
      shift() {
        const tail = this.tail;
        const next = tail.shift();
        if (tail.isEmpty() && tail.next !== null) {
          this.tail = tail.next;
        }
        return next;
      }
    }, __name(_a, "FixedQueue"), _a);
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/pool-stats.js
var require_pool_stats = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/pool-stats.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { kFree, kConnected, kPending, kQueued, kRunning, kSize } = require_symbols2();
    var kPool = Symbol("pool");
    var _PoolStats = class _PoolStats {
      constructor(pool) {
        this[kPool] = pool;
      }
      get connected() {
        return this[kPool][kConnected];
      }
      get free() {
        return this[kPool][kFree];
      }
      get pending() {
        return this[kPool][kPending];
      }
      get queued() {
        return this[kPool][kQueued];
      }
      get running() {
        return this[kPool][kRunning];
      }
      get size() {
        return this[kPool][kSize];
      }
    };
    __name(_PoolStats, "PoolStats");
    var PoolStats = _PoolStats;
    module2.exports = PoolStats;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/pool-base.js
var require_pool_base = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/pool-base.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var DispatcherBase = require_dispatcher_base();
    var FixedQueue = require_fixed_queue();
    var { kConnected, kSize, kRunning, kPending, kQueued, kBusy, kFree, kUrl, kClose, kDestroy, kDispatch } = require_symbols2();
    var PoolStats = require_pool_stats();
    var kClients = Symbol("clients");
    var kNeedDrain = Symbol("needDrain");
    var kQueue = Symbol("queue");
    var kClosedResolve = Symbol("closed resolve");
    var kOnDrain = Symbol("onDrain");
    var kOnConnect = Symbol("onConnect");
    var kOnDisconnect = Symbol("onDisconnect");
    var kOnConnectionError = Symbol("onConnectionError");
    var kGetDispatcher = Symbol("get dispatcher");
    var kAddClient = Symbol("add client");
    var kRemoveClient = Symbol("remove client");
    var kStats = Symbol("stats");
    var _PoolBase = class _PoolBase extends DispatcherBase {
      constructor() {
        super();
        this[kQueue] = new FixedQueue();
        this[kClients] = [];
        this[kQueued] = 0;
        const pool = this;
        this[kOnDrain] = /* @__PURE__ */ __name(function onDrain(origin, targets) {
          const queue = pool[kQueue];
          let needDrain = false;
          while (!needDrain) {
            const item = queue.shift();
            if (!item) {
              break;
            }
            pool[kQueued]--;
            needDrain = !this.dispatch(item.opts, item.handler);
          }
          this[kNeedDrain] = needDrain;
          if (!this[kNeedDrain] && pool[kNeedDrain]) {
            pool[kNeedDrain] = false;
            pool.emit("drain", origin, [pool, ...targets]);
          }
          if (pool[kClosedResolve] && queue.isEmpty()) {
            Promise.all(pool[kClients].map((c) => c.close())).then(pool[kClosedResolve]);
          }
        }, "onDrain");
        this[kOnConnect] = (origin, targets) => {
          pool.emit("connect", origin, [pool, ...targets]);
        };
        this[kOnDisconnect] = (origin, targets, err) => {
          pool.emit("disconnect", origin, [pool, ...targets], err);
        };
        this[kOnConnectionError] = (origin, targets, err) => {
          pool.emit("connectionError", origin, [pool, ...targets], err);
        };
        this[kStats] = new PoolStats(this);
      }
      get [kBusy]() {
        return this[kNeedDrain];
      }
      get [kConnected]() {
        return this[kClients].filter((client) => client[kConnected]).length;
      }
      get [kFree]() {
        return this[kClients].filter((client) => client[kConnected] && !client[kNeedDrain]).length;
      }
      get [kPending]() {
        let ret = this[kQueued];
        for (const { [kPending]: pending } of this[kClients]) {
          ret += pending;
        }
        return ret;
      }
      get [kRunning]() {
        let ret = 0;
        for (const { [kRunning]: running } of this[kClients]) {
          ret += running;
        }
        return ret;
      }
      get [kSize]() {
        let ret = this[kQueued];
        for (const { [kSize]: size } of this[kClients]) {
          ret += size;
        }
        return ret;
      }
      get stats() {
        return this[kStats];
      }
      async [kClose]() {
        if (this[kQueue].isEmpty()) {
          return Promise.all(this[kClients].map((c) => c.close()));
        } else {
          return new Promise((resolve) => {
            this[kClosedResolve] = resolve;
          });
        }
      }
      async [kDestroy](err) {
        while (true) {
          const item = this[kQueue].shift();
          if (!item) {
            break;
          }
          item.handler.onError(err);
        }
        return Promise.all(this[kClients].map((c) => c.destroy(err)));
      }
      [kDispatch](opts, handler) {
        const dispatcher = this[kGetDispatcher]();
        if (!dispatcher) {
          this[kNeedDrain] = true;
          this[kQueue].push({ opts, handler });
          this[kQueued]++;
        } else if (!dispatcher.dispatch(opts, handler)) {
          dispatcher[kNeedDrain] = true;
          this[kNeedDrain] = !this[kGetDispatcher]();
        }
        return !this[kNeedDrain];
      }
      [kAddClient](client) {
        client.on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
        this[kClients].push(client);
        if (this[kNeedDrain]) {
          define_process_default.nextTick(() => {
            if (this[kNeedDrain]) {
              this[kOnDrain](client[kUrl], [this, client]);
            }
          });
        }
        return this;
      }
      [kRemoveClient](client) {
        client.close(() => {
          const idx = this[kClients].indexOf(client);
          if (idx !== -1) {
            this[kClients].splice(idx, 1);
          }
        });
        this[kNeedDrain] = this[kClients].some((dispatcher) => !dispatcher[kNeedDrain] && dispatcher.closed !== true && dispatcher.destroyed !== true);
      }
    };
    __name(_PoolBase, "PoolBase");
    var PoolBase = _PoolBase;
    module2.exports = {
      PoolBase,
      kClients,
      kNeedDrain,
      kAddClient,
      kRemoveClient,
      kGetDispatcher
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/timers.js
var require_timers = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/timers.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var fastNow = Date.now();
    var fastNowTimeout;
    var fastTimers = [];
    function onTimeout() {
      fastNow = Date.now();
      let len = fastTimers.length;
      let idx = 0;
      while (idx < len) {
        const timer = fastTimers[idx];
        if (timer.state === 0) {
          timer.state = fastNow + timer.delay;
        } else if (timer.state > 0 && fastNow >= timer.state) {
          timer.state = -1;
          timer.callback(timer.opaque);
        }
        if (timer.state === -1) {
          timer.state = -2;
          if (idx !== len - 1) {
            fastTimers[idx] = fastTimers.pop();
          } else {
            fastTimers.pop();
          }
          len -= 1;
        } else {
          idx += 1;
        }
      }
      if (fastTimers.length > 0) {
        refreshTimeout();
      }
    }
    __name(onTimeout, "onTimeout");
    function refreshTimeout() {
      if (fastNowTimeout && fastNowTimeout.refresh) {
        fastNowTimeout.refresh();
      } else {
        clearTimeout(fastNowTimeout);
        fastNowTimeout = setTimeout(onTimeout, 1e3);
        if (fastNowTimeout.unref) {
          fastNowTimeout.unref();
        }
      }
    }
    __name(refreshTimeout, "refreshTimeout");
    var _Timeout = class _Timeout {
      constructor(callback, delay, opaque) {
        this.callback = callback;
        this.delay = delay;
        this.opaque = opaque;
        this.state = -2;
        this.refresh();
      }
      refresh() {
        if (this.state === -2) {
          fastTimers.push(this);
          if (!fastNowTimeout || fastTimers.length === 1) {
            refreshTimeout();
          }
        }
        this.state = 0;
      }
      clear() {
        this.state = -1;
      }
    };
    __name(_Timeout, "Timeout");
    var Timeout = _Timeout;
    module2.exports = {
      setTimeout(callback, delay, opaque) {
        return delay < 1e3 ? setTimeout(callback, delay, opaque) : new Timeout(callback, delay, opaque);
      },
      clearTimeout(timeout) {
        if (timeout instanceof Timeout) {
          timeout.clear();
        } else {
          clearTimeout(timeout);
        }
      }
    };
  }
});

// src/patches/undici-core-request.js
var require_undici_core_request = __commonJS({
  "src/patches/undici-core-request.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { InvalidArgumentError: InvalidArgumentError2 } = require_errors();
    var assert = require("assert");
    var util = require_util();
    var tokenRegExp = /^[\\^_\`a-zA-Z\\-0-9!#$%&'*+.|~]+$/;
    var headerCharRegex = /[^\\t\\x20-\\x7e\\x80-\\xff]/;
    var invalidPathRegex = /[^\\u0021-\\u00ff]/;
    var kHandler = Symbol("handler");
    var channels = {};
    var extractBody;
    try {
      const diagnosticsChannel = require("diagnostics_channel");
      channels.create = diagnosticsChannel.channel("undici:request:create");
      channels.bodySent = diagnosticsChannel.channel("undici:request:bodySent");
      channels.headers = diagnosticsChannel.channel("undici:request:headers");
      channels.trailers = diagnosticsChannel.channel("undici:request:trailers");
      channels.error = diagnosticsChannel.channel("undici:request:error");
    } catch {
      channels.create = { hasSubscribers: false };
      channels.bodySent = { hasSubscribers: false };
      channels.headers = { hasSubscribers: false };
      channels.trailers = { hasSubscribers: false };
      channels.error = { hasSubscribers: false };
    }
    var _Request2 = class _Request2 {
      constructor(origin, {
        path,
        method,
        body,
        headers,
        query,
        idempotent,
        blocking,
        upgrade,
        headersTimeout,
        bodyTimeout,
        reset,
        throwOnError
      }, handler) {
        if (typeof path !== "string") {
          throw new InvalidArgumentError2("path must be a string");
        } else if (path[0] !== "/" && !(path.startsWith("http://") || path.startsWith("https://")) && method !== "CONNECT") {
          throw new InvalidArgumentError2(
            "path must be an absolute URL or start with a slash"
          );
        } else if (invalidPathRegex.exec(path) !== null) {
          throw new InvalidArgumentError2("invalid request path");
        }
        if (typeof method !== "string") {
          throw new InvalidArgumentError2("method must be a string");
        } else if (tokenRegExp.exec(method) === null) {
          throw new InvalidArgumentError2("invalid request method");
        }
        if (upgrade && typeof upgrade !== "string") {
          throw new InvalidArgumentError2("upgrade must be a string");
        }
        if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
          throw new InvalidArgumentError2("invalid headersTimeout");
        }
        if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
          throw new InvalidArgumentError2("invalid bodyTimeout");
        }
        if (reset != null && typeof reset !== "boolean") {
          throw new InvalidArgumentError2("invalid reset");
        }
        this.headersTimeout = headersTimeout;
        this.bodyTimeout = bodyTimeout;
        this.throwOnError = throwOnError === true;
        this.method = method;
        if (body == null) {
          this.body = null;
        } else if (util.isStream(body)) {
          this.body = body;
        } else if (util.isBuffer(body)) {
          this.body = body.byteLength ? body : null;
        } else if (ArrayBuffer.isView(body)) {
          this.body = body.buffer.byteLength ? Buffer.from(body.buffer, body.byteOffset, body.byteLength) : null;
        } else if (body instanceof ArrayBuffer) {
          this.body = body.byteLength ? Buffer.from(body) : null;
        } else if (typeof body === "string") {
          this.body = body.length ? Buffer.from(body) : null;
        } else if (util.isFormDataLike(body) || util.isIterable(body) || util.isBlobLike(body)) {
          this.body = body;
        } else {
          throw new InvalidArgumentError2(
            "body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable"
          );
        }
        this.completed = false;
        this.aborted = false;
        this.upgrade = upgrade || null;
        this.path = query ? util.buildURL(path, query) : path;
        this.origin = origin;
        this.idempotent = idempotent == null ? method === "HEAD" || method === "GET" : idempotent;
        this.blocking = blocking == null ? false : blocking;
        this.reset = reset == null ? null : reset;
        this.host = null;
        this.contentLength = null;
        this.contentType = null;
        this.headers = "";
        if (Array.isArray(headers)) {
          if (headers.length % 2 !== 0) {
            throw new InvalidArgumentError2("headers array must be even");
          }
          for (let i = 0; i < headers.length; i += 2) {
            processHeader(this, headers[i], headers[i + 1]);
          }
        } else if (headers && typeof headers === "object") {
          const keys = Object.keys(headers);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            processHeader(this, key, headers[key]);
          }
        } else if (headers != null) {
          throw new InvalidArgumentError2("headers must be an object or an array");
        }
        if (util.isFormDataLike(this.body)) {
          if (util.nodeMajor < 16 || util.nodeMajor === 16 && util.nodeMinor < 8) {
            throw new InvalidArgumentError2(
              "Form-Data bodies are only supported in node v16.8 and newer."
            );
          }
          if (!extractBody) {
            extractBody = require_body().extractBody;
          }
          const [bodyStream, contentType] = extractBody(body);
          if (this.contentType == null) {
            this.contentType = contentType;
            this.headers += \`content-type: \${contentType}\\r
\`;
          }
          this.body = bodyStream.stream;
          this.contentLength = bodyStream.length;
        } else if (util.isBlobLike(body) && this.contentType == null && body.type) {
          this.contentType = body.type;
          this.headers += \`content-type: \${body.type}\\r
\`;
        }
        util.validateHandler(handler, method, upgrade);
        this.servername = util.getServerName(this.host);
        this[kHandler] = handler;
        if (channels.create.hasSubscribers) {
          channels.create.publish({ request: this });
        }
      }
      onBodySent(chunk) {
        if (this[kHandler].onBodySent) {
          try {
            this[kHandler].onBodySent(chunk);
          } catch (err) {
            this.onError(err);
          }
        }
      }
      onRequestSent() {
        if (channels.bodySent.hasSubscribers) {
          channels.bodySent.publish({ request: this });
        }
      }
      onConnect(abort) {
        assert(!this.aborted);
        assert(!this.completed);
        return this[kHandler].onConnect(abort);
      }
      onHeaders(statusCode, headers, resume, statusText) {
        assert(!this.aborted);
        assert(!this.completed);
        if (channels.headers.hasSubscribers) {
          channels.headers.publish({
            request: this,
            response: { statusCode, headers, statusText }
          });
        }
        return this[kHandler].onHeaders(statusCode, headers, resume, statusText);
      }
      onData(chunk) {
        assert(!this.aborted);
        assert(!this.completed);
        return this[kHandler].onData(chunk);
      }
      onUpgrade(statusCode, headers, socket) {
        assert(!this.aborted);
        assert(!this.completed);
        return this[kHandler].onUpgrade(statusCode, headers, socket);
      }
      onComplete(trailers) {
        assert(!this.aborted);
        this.completed = true;
        if (channels.trailers.hasSubscribers) {
          channels.trailers.publish({ request: this, trailers });
        }
        return this[kHandler].onComplete(trailers);
      }
      onError(error) {
        if (channels.error.hasSubscribers) {
          channels.error.publish({ request: this, error });
        }
        if (this.aborted) {
          return;
        }
        this.aborted = true;
        return this[kHandler].onError(error);
      }
      addHeader(key, value) {
        processHeader(this, key, value);
        return this;
      }
    };
    __name(_Request2, "Request");
    var Request2 = _Request2;
    function processHeaderValue(key, val) {
      if (val && typeof val === "object") {
        throw new InvalidArgumentError2(\`invalid \${key} header\`);
      }
      val = val != null ? \`\${val}\` : "";
      if (headerCharRegex.exec(val) !== null) {
        throw new InvalidArgumentError2(\`invalid \${key} header\`);
      }
      return \`\${key}: \${val}\\r
\`;
    }
    __name(processHeaderValue, "processHeaderValue");
    function processHeader(request, key, val) {
      if (val && typeof val === "object" && !Array.isArray(val)) {
        throw new InvalidArgumentError2(\`invalid \${key} header\`);
      } else if (val === void 0) {
        return;
      }
      if (request.host === null && key.length === 4 && key.toLowerCase() === "host") {
        request.host = val;
      } else if (request.contentLength === null && key.length === 14 && key.toLowerCase() === "content-length") {
        request.contentLength = parseInt(val, 10);
        if (!Number.isFinite(request.contentLength)) {
          throw new InvalidArgumentError2("invalid content-length header");
        }
      } else if (request.contentType === null && key.length === 12 && key.toLowerCase() === "content-type") {
        request.contentType = val;
        request.headers += processHeaderValue(key, val);
      } else {
        if (Array.isArray(val)) {
          for (let i = 0; i < val.length; i++) {
            request.headers += processHeaderValue(key, val[i]);
          }
        } else {
          request.headers += processHeaderValue(key, val);
        }
      }
    }
    __name(processHeader, "processHeader");
    module2.exports = Request2;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/connect.js
var require_connect = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/core/connect.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var net = require("net");
    var assert = require("assert");
    var util = require_util();
    var { InvalidArgumentError: InvalidArgumentError2, ConnectTimeoutError } = require_errors();
    var tls;
    var SessionCache;
    var _a, _b;
    if (global.FinalizationRegistry) {
      SessionCache = (_a = class {
        constructor(maxCachedSessions) {
          this._maxCachedSessions = maxCachedSessions;
          this._sessionCache = /* @__PURE__ */ new Map();
          this._sessionRegistry = new global.FinalizationRegistry((key) => {
            if (this._sessionCache.size < this._maxCachedSessions) {
              return;
            }
            const ref = this._sessionCache.get(key);
            if (ref !== void 0 && ref.deref() === void 0) {
              this._sessionCache.delete(key);
            }
          });
        }
        get(sessionKey) {
          const ref = this._sessionCache.get(sessionKey);
          return ref ? ref.deref() : null;
        }
        set(sessionKey, session) {
          if (this._maxCachedSessions === 0) {
            return;
          }
          this._sessionCache.set(sessionKey, new WeakRef(session));
          this._sessionRegistry.register(session, sessionKey);
        }
      }, __name(_a, "WeakSessionCache"), _a);
    } else {
      SessionCache = (_b = class {
        constructor(maxCachedSessions) {
          this._maxCachedSessions = maxCachedSessions;
          this._sessionCache = /* @__PURE__ */ new Map();
        }
        get(sessionKey) {
          return this._sessionCache.get(sessionKey);
        }
        set(sessionKey, session) {
          if (this._maxCachedSessions === 0) {
            return;
          }
          if (this._sessionCache.size >= this._maxCachedSessions) {
            const { value: oldestKey } = this._sessionCache.keys().next();
            this._sessionCache.delete(oldestKey);
          }
          this._sessionCache.set(sessionKey, session);
        }
      }, __name(_b, "SimpleSessionCache"), _b);
    }
    function buildConnector({ maxCachedSessions, socketPath, timeout, ...opts }) {
      if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
        throw new InvalidArgumentError2("maxCachedSessions must be a positive integer or zero");
      }
      const options = { path: socketPath, ...opts };
      const sessionCache = new SessionCache(maxCachedSessions == null ? 100 : maxCachedSessions);
      timeout = timeout == null ? 1e4 : timeout;
      return /* @__PURE__ */ __name(function connect({ hostname, host, protocol, port, servername, localAddress, httpSocket }, callback) {
        let socket;
        if (protocol === "https:") {
          if (!tls) {
            tls = require("tls");
          }
          servername = servername || options.servername || util.getServerName(host) || null;
          const sessionKey = servername || hostname;
          const session = sessionCache.get(sessionKey) || null;
          assert(sessionKey);
          socket = tls.connect({
            highWaterMark: 16384,
            // TLS in node can't have bigger HWM anyway...
            ...options,
            servername,
            session,
            localAddress,
            socket: httpSocket,
            // upgrade socket connection
            port: port || 443,
            host: hostname
          });
          socket.on("session", function(session2) {
            sessionCache.set(sessionKey, session2);
          });
        } else {
          assert(!httpSocket, "httpSocket can only be sent on TLS update");
          socket = net.connect({
            highWaterMark: 64 * 1024,
            // Same as nodejs fs streams.
            ...options,
            localAddress,
            port: port || 80,
            host: hostname
          });
        }
        if (options.keepAlive == null || options.keepAlive) {
          const keepAliveInitialDelay = options.keepAliveInitialDelay === void 0 ? 6e4 : options.keepAliveInitialDelay;
          socket.setKeepAlive(true, keepAliveInitialDelay);
        }
        const cancelTimeout = setupTimeout(() => onConnectTimeout(socket), timeout);
        socket.setNoDelay(true).once(protocol === "https:" ? "secureConnect" : "connect", function() {
          cancelTimeout();
          if (callback) {
            const cb = callback;
            callback = null;
            cb(null, this);
          }
        }).on("error", function(err) {
          cancelTimeout();
          if (callback) {
            const cb = callback;
            callback = null;
            cb(err);
          }
        });
        return socket;
      }, "connect");
    }
    __name(buildConnector, "buildConnector");
    function setupTimeout(onConnectTimeout2, timeout) {
      if (!timeout) {
        return () => {
        };
      }
      let s1 = null;
      let s2 = null;
      const timeoutId = setTimeout(() => {
        s1 = setImmediate(() => {
          if (define_process_default.platform === "win32") {
            s2 = setImmediate(() => onConnectTimeout2());
          } else {
            onConnectTimeout2();
          }
        });
      }, timeout);
      return () => {
        clearTimeout(timeoutId);
        clearImmediate(s1);
        clearImmediate(s2);
      };
    }
    __name(setupTimeout, "setupTimeout");
    function onConnectTimeout(socket) {
      util.destroy(socket, new ConnectTimeoutError());
    }
    __name(onConnectTimeout, "onConnectTimeout");
    module2.exports = buildConnector;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/utils.js"(exports2) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.enumToMap = void 0;
    function enumToMap(obj) {
      const res = {};
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === "number") {
          res[key] = value;
        }
      });
      return res;
    }
    __name(enumToMap, "enumToMap");
    exports2.enumToMap = enumToMap;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/constants.js
var require_constants2 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/constants.js"(exports2) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SPECIAL_HEADERS = exports2.HEADER_STATE = exports2.MINOR = exports2.MAJOR = exports2.CONNECTION_TOKEN_CHARS = exports2.HEADER_CHARS = exports2.TOKEN = exports2.STRICT_TOKEN = exports2.HEX = exports2.URL_CHAR = exports2.STRICT_URL_CHAR = exports2.USERINFO_CHARS = exports2.MARK = exports2.ALPHANUM = exports2.NUM = exports2.HEX_MAP = exports2.NUM_MAP = exports2.ALPHA = exports2.FINISH = exports2.H_METHOD_MAP = exports2.METHOD_MAP = exports2.METHODS_RTSP = exports2.METHODS_ICE = exports2.METHODS_HTTP = exports2.METHODS = exports2.LENIENT_FLAGS = exports2.FLAGS = exports2.TYPE = exports2.ERROR = void 0;
    var utils_1 = require_utils2();
    var ERROR;
    (function(ERROR2) {
      ERROR2[ERROR2["OK"] = 0] = "OK";
      ERROR2[ERROR2["INTERNAL"] = 1] = "INTERNAL";
      ERROR2[ERROR2["STRICT"] = 2] = "STRICT";
      ERROR2[ERROR2["LF_EXPECTED"] = 3] = "LF_EXPECTED";
      ERROR2[ERROR2["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
      ERROR2[ERROR2["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
      ERROR2[ERROR2["INVALID_METHOD"] = 6] = "INVALID_METHOD";
      ERROR2[ERROR2["INVALID_URL"] = 7] = "INVALID_URL";
      ERROR2[ERROR2["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
      ERROR2[ERROR2["INVALID_VERSION"] = 9] = "INVALID_VERSION";
      ERROR2[ERROR2["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
      ERROR2[ERROR2["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
      ERROR2[ERROR2["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
      ERROR2[ERROR2["INVALID_STATUS"] = 13] = "INVALID_STATUS";
      ERROR2[ERROR2["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
      ERROR2[ERROR2["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
      ERROR2[ERROR2["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
      ERROR2[ERROR2["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
      ERROR2[ERROR2["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
      ERROR2[ERROR2["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
      ERROR2[ERROR2["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
      ERROR2[ERROR2["PAUSED"] = 21] = "PAUSED";
      ERROR2[ERROR2["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
      ERROR2[ERROR2["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
      ERROR2[ERROR2["USER"] = 24] = "USER";
    })(ERROR = exports2.ERROR || (exports2.ERROR = {}));
    var TYPE;
    (function(TYPE2) {
      TYPE2[TYPE2["BOTH"] = 0] = "BOTH";
      TYPE2[TYPE2["REQUEST"] = 1] = "REQUEST";
      TYPE2[TYPE2["RESPONSE"] = 2] = "RESPONSE";
    })(TYPE = exports2.TYPE || (exports2.TYPE = {}));
    var FLAGS;
    (function(FLAGS2) {
      FLAGS2[FLAGS2["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
      FLAGS2[FLAGS2["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
      FLAGS2[FLAGS2["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
      FLAGS2[FLAGS2["CHUNKED"] = 8] = "CHUNKED";
      FLAGS2[FLAGS2["UPGRADE"] = 16] = "UPGRADE";
      FLAGS2[FLAGS2["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
      FLAGS2[FLAGS2["SKIPBODY"] = 64] = "SKIPBODY";
      FLAGS2[FLAGS2["TRAILING"] = 128] = "TRAILING";
      FLAGS2[FLAGS2["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
    })(FLAGS = exports2.FLAGS || (exports2.FLAGS = {}));
    var LENIENT_FLAGS;
    (function(LENIENT_FLAGS2) {
      LENIENT_FLAGS2[LENIENT_FLAGS2["HEADERS"] = 1] = "HEADERS";
      LENIENT_FLAGS2[LENIENT_FLAGS2["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
      LENIENT_FLAGS2[LENIENT_FLAGS2["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
    })(LENIENT_FLAGS = exports2.LENIENT_FLAGS || (exports2.LENIENT_FLAGS = {}));
    var METHODS;
    (function(METHODS2) {
      METHODS2[METHODS2["DELETE"] = 0] = "DELETE";
      METHODS2[METHODS2["GET"] = 1] = "GET";
      METHODS2[METHODS2["HEAD"] = 2] = "HEAD";
      METHODS2[METHODS2["POST"] = 3] = "POST";
      METHODS2[METHODS2["PUT"] = 4] = "PUT";
      METHODS2[METHODS2["CONNECT"] = 5] = "CONNECT";
      METHODS2[METHODS2["OPTIONS"] = 6] = "OPTIONS";
      METHODS2[METHODS2["TRACE"] = 7] = "TRACE";
      METHODS2[METHODS2["COPY"] = 8] = "COPY";
      METHODS2[METHODS2["LOCK"] = 9] = "LOCK";
      METHODS2[METHODS2["MKCOL"] = 10] = "MKCOL";
      METHODS2[METHODS2["MOVE"] = 11] = "MOVE";
      METHODS2[METHODS2["PROPFIND"] = 12] = "PROPFIND";
      METHODS2[METHODS2["PROPPATCH"] = 13] = "PROPPATCH";
      METHODS2[METHODS2["SEARCH"] = 14] = "SEARCH";
      METHODS2[METHODS2["UNLOCK"] = 15] = "UNLOCK";
      METHODS2[METHODS2["BIND"] = 16] = "BIND";
      METHODS2[METHODS2["REBIND"] = 17] = "REBIND";
      METHODS2[METHODS2["UNBIND"] = 18] = "UNBIND";
      METHODS2[METHODS2["ACL"] = 19] = "ACL";
      METHODS2[METHODS2["REPORT"] = 20] = "REPORT";
      METHODS2[METHODS2["MKACTIVITY"] = 21] = "MKACTIVITY";
      METHODS2[METHODS2["CHECKOUT"] = 22] = "CHECKOUT";
      METHODS2[METHODS2["MERGE"] = 23] = "MERGE";
      METHODS2[METHODS2["M-SEARCH"] = 24] = "M-SEARCH";
      METHODS2[METHODS2["NOTIFY"] = 25] = "NOTIFY";
      METHODS2[METHODS2["SUBSCRIBE"] = 26] = "SUBSCRIBE";
      METHODS2[METHODS2["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
      METHODS2[METHODS2["PATCH"] = 28] = "PATCH";
      METHODS2[METHODS2["PURGE"] = 29] = "PURGE";
      METHODS2[METHODS2["MKCALENDAR"] = 30] = "MKCALENDAR";
      METHODS2[METHODS2["LINK"] = 31] = "LINK";
      METHODS2[METHODS2["UNLINK"] = 32] = "UNLINK";
      METHODS2[METHODS2["SOURCE"] = 33] = "SOURCE";
      METHODS2[METHODS2["PRI"] = 34] = "PRI";
      METHODS2[METHODS2["DESCRIBE"] = 35] = "DESCRIBE";
      METHODS2[METHODS2["ANNOUNCE"] = 36] = "ANNOUNCE";
      METHODS2[METHODS2["SETUP"] = 37] = "SETUP";
      METHODS2[METHODS2["PLAY"] = 38] = "PLAY";
      METHODS2[METHODS2["PAUSE"] = 39] = "PAUSE";
      METHODS2[METHODS2["TEARDOWN"] = 40] = "TEARDOWN";
      METHODS2[METHODS2["GET_PARAMETER"] = 41] = "GET_PARAMETER";
      METHODS2[METHODS2["SET_PARAMETER"] = 42] = "SET_PARAMETER";
      METHODS2[METHODS2["REDIRECT"] = 43] = "REDIRECT";
      METHODS2[METHODS2["RECORD"] = 44] = "RECORD";
      METHODS2[METHODS2["FLUSH"] = 45] = "FLUSH";
    })(METHODS = exports2.METHODS || (exports2.METHODS = {}));
    exports2.METHODS_HTTP = [
      METHODS.DELETE,
      METHODS.GET,
      METHODS.HEAD,
      METHODS.POST,
      METHODS.PUT,
      METHODS.CONNECT,
      METHODS.OPTIONS,
      METHODS.TRACE,
      METHODS.COPY,
      METHODS.LOCK,
      METHODS.MKCOL,
      METHODS.MOVE,
      METHODS.PROPFIND,
      METHODS.PROPPATCH,
      METHODS.SEARCH,
      METHODS.UNLOCK,
      METHODS.BIND,
      METHODS.REBIND,
      METHODS.UNBIND,
      METHODS.ACL,
      METHODS.REPORT,
      METHODS.MKACTIVITY,
      METHODS.CHECKOUT,
      METHODS.MERGE,
      METHODS["M-SEARCH"],
      METHODS.NOTIFY,
      METHODS.SUBSCRIBE,
      METHODS.UNSUBSCRIBE,
      METHODS.PATCH,
      METHODS.PURGE,
      METHODS.MKCALENDAR,
      METHODS.LINK,
      METHODS.UNLINK,
      METHODS.PRI,
      // TODO(indutny): should we allow it with HTTP?
      METHODS.SOURCE
    ];
    exports2.METHODS_ICE = [
      METHODS.SOURCE
    ];
    exports2.METHODS_RTSP = [
      METHODS.OPTIONS,
      METHODS.DESCRIBE,
      METHODS.ANNOUNCE,
      METHODS.SETUP,
      METHODS.PLAY,
      METHODS.PAUSE,
      METHODS.TEARDOWN,
      METHODS.GET_PARAMETER,
      METHODS.SET_PARAMETER,
      METHODS.REDIRECT,
      METHODS.RECORD,
      METHODS.FLUSH,
      // For AirPlay
      METHODS.GET,
      METHODS.POST
    ];
    exports2.METHOD_MAP = utils_1.enumToMap(METHODS);
    exports2.H_METHOD_MAP = {};
    Object.keys(exports2.METHOD_MAP).forEach((key) => {
      if (/^H/.test(key)) {
        exports2.H_METHOD_MAP[key] = exports2.METHOD_MAP[key];
      }
    });
    var FINISH;
    (function(FINISH2) {
      FINISH2[FINISH2["SAFE"] = 0] = "SAFE";
      FINISH2[FINISH2["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
      FINISH2[FINISH2["UNSAFE"] = 2] = "UNSAFE";
    })(FINISH = exports2.FINISH || (exports2.FINISH = {}));
    exports2.ALPHA = [];
    for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
      exports2.ALPHA.push(String.fromCharCode(i));
      exports2.ALPHA.push(String.fromCharCode(i + 32));
    }
    exports2.NUM_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9
    };
    exports2.HEX_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
    };
    exports2.NUM = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    exports2.ALPHANUM = exports2.ALPHA.concat(exports2.NUM);
    exports2.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
    exports2.USERINFO_CHARS = exports2.ALPHANUM.concat(exports2.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]);
    exports2.STRICT_URL_CHAR = [
      "!",
      '"',
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "@",
      "[",
      "\\\\",
      "]",
      "^",
      "_",
      "\`",
      "{",
      "|",
      "}",
      "~"
    ].concat(exports2.ALPHANUM);
    exports2.URL_CHAR = exports2.STRICT_URL_CHAR.concat(["	", "\\f"]);
    for (let i = 128; i <= 255; i++) {
      exports2.URL_CHAR.push(i);
    }
    exports2.HEX = exports2.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    exports2.STRICT_TOKEN = [
      "!",
      "#",
      "$",
      "%",
      "&",
      "'",
      "*",
      "+",
      "-",
      ".",
      "^",
      "_",
      "\`",
      "|",
      "~"
    ].concat(exports2.ALPHANUM);
    exports2.TOKEN = exports2.STRICT_TOKEN.concat([" "]);
    exports2.HEADER_CHARS = ["	"];
    for (let i = 32; i <= 255; i++) {
      if (i !== 127) {
        exports2.HEADER_CHARS.push(i);
      }
    }
    exports2.CONNECTION_TOKEN_CHARS = exports2.HEADER_CHARS.filter((c) => c !== 44);
    exports2.MAJOR = exports2.NUM_MAP;
    exports2.MINOR = exports2.MAJOR;
    var HEADER_STATE;
    (function(HEADER_STATE2) {
      HEADER_STATE2[HEADER_STATE2["GENERAL"] = 0] = "GENERAL";
      HEADER_STATE2[HEADER_STATE2["CONNECTION"] = 1] = "CONNECTION";
      HEADER_STATE2[HEADER_STATE2["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
      HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
      HEADER_STATE2[HEADER_STATE2["UPGRADE"] = 4] = "UPGRADE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
      HEADER_STATE2[HEADER_STATE2["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
      HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
    })(HEADER_STATE = exports2.HEADER_STATE || (exports2.HEADER_STATE = {}));
    exports2.SPECIAL_HEADERS = {
      "connection": HEADER_STATE.CONNECTION,
      "content-length": HEADER_STATE.CONTENT_LENGTH,
      "proxy-connection": HEADER_STATE.CONNECTION,
      "transfer-encoding": HEADER_STATE.TRANSFER_ENCODING,
      "upgrade": HEADER_STATE.UPGRADE
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/handler/RedirectHandler.js
var require_RedirectHandler = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/handler/RedirectHandler.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var util = require_util();
    var { kBodyUsed } = require_symbols2();
    var assert = require("assert");
    var { InvalidArgumentError: InvalidArgumentError2 } = require_errors();
    var EE = require("events");
    var redirectableStatusCodes = [300, 301, 302, 303, 307, 308];
    var kBody = Symbol("body");
    var _BodyAsyncIterable = class _BodyAsyncIterable {
      constructor(body) {
        this[kBody] = body;
        this[kBodyUsed] = false;
      }
      async *[Symbol.asyncIterator]() {
        assert(!this[kBodyUsed], "disturbed");
        this[kBodyUsed] = true;
        yield* this[kBody];
      }
    };
    __name(_BodyAsyncIterable, "BodyAsyncIterable");
    var BodyAsyncIterable = _BodyAsyncIterable;
    var _RedirectHandler = class _RedirectHandler {
      constructor(dispatch, maxRedirections, opts, handler) {
        if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
          throw new InvalidArgumentError2("maxRedirections must be a positive number");
        }
        util.validateHandler(handler, opts.method, opts.upgrade);
        this.dispatch = dispatch;
        this.location = null;
        this.abort = null;
        this.opts = { ...opts, maxRedirections: 0 };
        this.maxRedirections = maxRedirections;
        this.handler = handler;
        this.history = [];
        if (util.isStream(this.opts.body)) {
          if (util.bodyLength(this.opts.body) === 0) {
            this.opts.body.on("data", function() {
              assert(false);
            });
          }
          if (typeof this.opts.body.readableDidRead !== "boolean") {
            this.opts.body[kBodyUsed] = false;
            EE.prototype.on.call(this.opts.body, "data", function() {
              this[kBodyUsed] = true;
            });
          }
        } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") {
          this.opts.body = new BodyAsyncIterable(this.opts.body);
        } else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && util.isIterable(this.opts.body)) {
          this.opts.body = new BodyAsyncIterable(this.opts.body);
        }
      }
      onConnect(abort) {
        this.abort = abort;
        this.handler.onConnect(abort, { history: this.history });
      }
      onUpgrade(statusCode, headers, socket) {
        this.handler.onUpgrade(statusCode, headers, socket);
      }
      onError(error) {
        this.handler.onError(error);
      }
      onHeaders(statusCode, headers, resume, statusText) {
        this.location = this.history.length >= this.maxRedirections || util.isDisturbed(this.opts.body) ? null : parseLocation(statusCode, headers);
        if (this.opts.origin) {
          this.history.push(new URL(this.opts.path, this.opts.origin));
        }
        if (!this.location) {
          return this.handler.onHeaders(statusCode, headers, resume, statusText);
        }
        const { origin, pathname, search } = util.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
        const path = search ? \`\${pathname}\${search}\` : pathname;
        this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
        this.opts.path = path;
        this.opts.origin = origin;
        this.opts.maxRedirections = 0;
        this.opts.query = null;
        if (statusCode === 303 && this.opts.method !== "HEAD") {
          this.opts.method = "GET";
          this.opts.body = null;
        }
      }
      onData(chunk) {
        if (this.location) {
        } else {
          return this.handler.onData(chunk);
        }
      }
      onComplete(trailers) {
        if (this.location) {
          this.location = null;
          this.abort = null;
          this.dispatch(this.opts, this);
        } else {
          this.handler.onComplete(trailers);
        }
      }
      onBodySent(chunk) {
        if (this.handler.onBodySent) {
          this.handler.onBodySent(chunk);
        }
      }
    };
    __name(_RedirectHandler, "RedirectHandler");
    var RedirectHandler = _RedirectHandler;
    function parseLocation(statusCode, headers) {
      if (redirectableStatusCodes.indexOf(statusCode) === -1) {
        return null;
      }
      for (let i = 0; i < headers.length; i += 2) {
        if (headers[i].toString().toLowerCase() === "location") {
          return headers[i + 1];
        }
      }
    }
    __name(parseLocation, "parseLocation");
    function shouldRemoveHeader(header, removeContent, unknownOrigin) {
      return header.length === 4 && header.toString().toLowerCase() === "host" || removeContent && header.toString().toLowerCase().indexOf("content-") === 0 || unknownOrigin && header.length === 13 && header.toString().toLowerCase() === "authorization" || unknownOrigin && header.length === 6 && header.toString().toLowerCase() === "cookie";
    }
    __name(shouldRemoveHeader, "shouldRemoveHeader");
    function cleanRequestHeaders(headers, removeContent, unknownOrigin) {
      const ret = [];
      if (Array.isArray(headers)) {
        for (let i = 0; i < headers.length; i += 2) {
          if (!shouldRemoveHeader(headers[i], removeContent, unknownOrigin)) {
            ret.push(headers[i], headers[i + 1]);
          }
        }
      } else if (headers && typeof headers === "object") {
        for (const key of Object.keys(headers)) {
          if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) {
            ret.push(key, headers[key]);
          }
        }
      } else {
        assert(headers == null, "headers must be an object or an array");
      }
      return ret;
    }
    __name(cleanRequestHeaders, "cleanRequestHeaders");
    module2.exports = RedirectHandler;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/interceptor/redirectInterceptor.js
var require_redirectInterceptor = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/interceptor/redirectInterceptor.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var RedirectHandler = require_RedirectHandler();
    function createRedirectInterceptor({ maxRedirections: defaultMaxRedirections }) {
      return (dispatch) => {
        return /* @__PURE__ */ __name(function Intercept(opts, handler) {
          const { maxRedirections = defaultMaxRedirections } = opts;
          if (!maxRedirections) {
            return dispatch(opts, handler);
          }
          const redirectHandler = new RedirectHandler(dispatch, maxRedirections, opts, handler);
          opts = { ...opts, maxRedirections: 0 };
          return dispatch(opts, redirectHandler);
        }, "Intercept");
      };
    }
    __name(createRedirectInterceptor, "createRedirectInterceptor");
    module2.exports = createRedirectInterceptor;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/llhttp-wasm.js
var require_llhttp_wasm = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/llhttp-wasm.js"(exports2, module2) {
    "use strict";
    init_define_process();
    module2.exports = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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ADcDACAAQShqQgA3AwAgAEEgakIANwMAIABBEGpCADcDACAAQQhqQgA3AwAgAEHdATYCHEEAC3sBAX8CQCAAKAIMIgMNAAJAIAAoAgRFDQAgACABNgIECwJAIAAgASACEMSAgIAAIgMNACAAKAIMDwsgACADNgIcQQAhAyAAKAIEIgFFDQAgACABIAIgACgCCBGBgICAAAAiAUUNACAAIAI2AhQgACABNgIMIAEhAwsgAwvk8wEDDn8DfgR/I4CAgIAAQRBrIgMkgICAgAAgASEEIAEhBSABIQYgASEHIAEhCCABIQkgASEKIAEhCyABIQwgASENIAEhDiABIQ8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgACgCHCIQQX9qDt0B2gEB2QECAwQFBgcICQoLDA0O2AEPENcBERLWARMUFRYXGBkaG+AB3wEcHR7VAR8gISIjJCXUASYnKCkqKyzTAdIBLS7RAdABLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVG2wFHSElKzwHOAUvNAUzMAU1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4ABgQGCAYMBhAGFAYYBhwGIAYkB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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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FCAAIBA2AgxBACEQDLIBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxNCyAAQdMANgIcIAAgATYCFCAAIBA2AgxBACEQDLEBCyAAKAIEIRAgAEEANgIEAkAgACAQIAEQp4CAgAAiEA0AIAEhAQxRCyAAQeUANgIcIAAgATYCFCAAIBA2AgxBACEQDLABCyAAQQA2AhwgACABNgIUIABBxoqAgAA2AhAgAEEHNgIMQQAhEAyvAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHSADYCHCAAIAE2AhQgACAQNgIMQQAhEAyuAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMSQsgAEHTADYCHCAAIAE2AhQgACAQNgIMQQAhEAytAQsgACgCBCEQIABBADYCBAJAIAAgECABEKeAgIAAIhANACABIQEMTQsgAEHlADYCHCAAIAE2AhQgACAQNgIMQQAhEAysAQsgAEEANgIcIAAgATYCFCAAQdyIgIAANgIQIABBBzYCDEEAIRAMqwELIBBBP0cNASABQQFqIQELQQUhEAyQAQtBACEQIABBADYCHCAAIAE2AhQgAEH9koCAADYCECAAQQc2AgwMqAELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0gA2AhwgACABNgIUIAAgEDYCDEEAIRAMpwELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEILIABB0wA2AhwgACABNgIUIAAgEDYCDEEAIRAMpgELIAAoAgQhECAAQQA2AgQCQCAAIBAgARCngICAACIQDQAgASEBDEYLIABB5QA2AhwgACABNgIUIAAgEDYCDEEAIRAMpQELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0gA2AhwgACAUNgIUIAAgATYCDEEAIRAMpAELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDD8LIABB0wA2AhwgACAUNgIUIAAgATYCDEEAIRAMowELIAAoAgQhASAAQQA2AgQCQCAAIAEgFBCngICAACIBDQAgFCEBDEMLIABB5QA2AhwgACAU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YWdlX2JlZ2luYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlYCBjYWxsYmFjayBlcnJvcgBgb25fc3RhdHVzX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdmVyc2lvbl9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3VybF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21ldGhvZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lYCBjYWxsYmFjayBlcnJvcgBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNlcnZlcgBJbnZhbGlkIGhlYWRlciB2YWx1ZSBjaGFyAEludmFsaWQgaGVhZGVyIGZpZWxkIGNoYXIAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl92ZXJzaW9uAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBIVFRQIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABEdXBsaWNhdGUgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyIGluIHVybCBwYXRoAENvbnRlbnQtTGVuZ3RoIGNhbid0IGJlIHByZXNlbnQgd2l0aCBUcmFuc2Zlci1FbmNvZGluZwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBzaXplAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX3ZhbHVlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgdmFsdWUATWlzc2luZyBleHBlY3RlZCBMRiBhZnRlciBoZWFkZXIgdmFsdWUASW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGVkIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX3Jlc2V0IHBhdXNlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZSBwYXVzZQBvbl9zdGF0dXNfY29tcGxldGUgcGF1c2UAb25fdmVyc2lvbl9jb21wbGV0ZSBwYXVzZQBvbl91cmxfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAb25fbWV0aG9kX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fbmFtZSBwYXVzZQBVbmV4cGVjdGVkIHNwYWNlIGFmdGVyIHN0YXJ0IGxpbmUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fbmFtZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIG5hbWUAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9tZXRob2QARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAFNXSVRDSF9QUk9YWQBVU0VfUFJPWFkATUtBQ1RJVklUWQBVTlBST0NFU1NBQkxFX0VOVElUWQBDT1BZAE1PVkVEX1BFUk1BTkVOVExZAFRPT19FQVJMWQBOT1RJRlkARkFJTEVEX0RFUEVOREVOQ1kAQkFEX0dBVEVXQVkAUExBWQBQVVQAQ0hFQ0tPVVQAR0FURVdBWV9USU1FT1VUAFJFUVVFU1RfVElNRU9VVABORVRXT1JLX0NPTk5FQ1RfVElNRU9VVABDT05ORUNUSU9OX1RJTUVPVVQATE9HSU5fVElNRU9VVABORVRXT1JLX1JFQURfVElNRU9VVABQT1NUAE1JU0RJUkVDVEVEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfTE9BRF9CQUxBTkNFRF9SRVFVRVNUAEJBRF9SRVFVRVNUAEhUVFBfUkVRVUVTVF9TRU5UX1RPX0hUVFBTX1BPUlQAUkVQT1JUAElNX0FfVEVBUE9UAFJFU0VUX0NPTlRFTlQATk9fQ09OVEVOVABQQVJUSUFMX0NPTlRFTlQASFBFX0lOVkFMSURfQ09OU1RBTlQASFBFX0NCX1JFU0VUAEdFVABIUEVfU1RSSUNUAENPTkZMSUNUAFRFTVBPUkFSWV9SRURJUkVDVABQRVJNQU5FTlRfUkVESVJFQ1QAQ09OTkVDVABNVUxUSV9TVEFUVVMASFBFX0lOVkFMSURfU1RBVFVTAFRPT19NQU5ZX1JFUVVFU1RTAEVBUkxZX0hJTlRTAFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TAE9QVElPTlMAU1dJVENISU5HX1BST1RPQ09MUwBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUwBNVUxUSVBMRV9DSE9JQ0VTAElOVEVSTkFMX1NFUlZFUl9FUlJPUgBXRUJfU0VSVkVSX1VOS05PV05fRVJST1IAUkFJTEdVTl9FUlJPUgBJREVOVElUWV9QUk9WSURFUl9BVVRIRU5USUNBVElPTl9FUlJPUgBTU0xfQ0VSVElGSUNBVEVfRVJST1IASU5WQUxJRF9YX0ZPUldBUkRFRF9GT1IAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAFNFRV9PVEhFUgBIUEVfQ0JfQ0hVTktfSEVBREVSAE1LQ0FMRU5EQVIAU0VUVVAAV0VCX1NFUlZFUl9JU19ET1dOAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIRVVSSVNUSUNfRVhQSVJBVElPTgBESVNDT05ORUNURURfT1BFUkFUSU9OAE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OAEhQRV9JTlZBTElEX1ZFUlNJT04ASFBFX0NCX01FU1NBR0VfQkVHSU4AU0lURV9JU19GUk9aRU4ASFBFX0lOVkFMSURfSEVBREVSX1RPS0VOAElOVkFMSURfVE9LRU4ARk9SQklEREVOAEVOSEFOQ0VfWU9VUl9DQUxNAEhQRV9JTlZBTElEX1VSTABCTE9DS0VEX0JZX1BBUkVOVEFMX0NPTlRST0wATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFX1VOT0ZGSUNJQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAFJFVFJZX1dJVEgASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAFVSSV9UT09fTE9ORwBQUk9DRVNTSU5HAE1JU0NFTExBTkVPVVNfUEVSU0lTVEVOVF9XQVJOSU5HAE1JU0NFTExBTkVPVVNfV0FSTklORwBIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBDT05USU5VRQBIUEVfQ0JfU1RBVFVTX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9WRVJTSU9OX0NPTVBMRVRFAEhQRV9DQl9VUkxfQ09NUExFVEUASFBFX0NCX0NIVU5LX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX05BTUVfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUASFBFX0NCX01FVEhPRF9DT01QTEVURQBIUEVfQ0JfSEVBREVSX0ZJRUxEX0NPTVBMRVRFAERFTEVURQBIUEVfSU5WQUxJRF9FT0ZfU1RBVEUASU5WQUxJRF9TU0xfQ0VSVElGSUNBVEUAUEFVU0UATk9fUkVTUE9OU0UAVU5TVVBQT1JURURfTUVESUFfVFlQRQBHT05FAE5PVF9BQ0NFUFRBQkxFAFNFUlZJQ0VfVU5BVkFJTEFCTEUAUkFOR0VfTk9UX1NBVElTRklBQkxFAE9SSUdJTl9JU19VTlJFQUNIQUJMRQBSRVNQT05TRV9JU19TVEFMRQBQVVJHRQBNRVJHRQBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFAFJFUVVFU1RfSEVBREVSX1RPT19MQVJHRQBQQVlMT0FEX1RPT19MQVJHRQBJTlNVRkZJQ0lFTlRfU1RPUkFHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBIUEVfVU5FWFBFQ1RFRF9TUEFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAE5PVF9GT1VORABQUk9QRklORABVTkJJTkQAUkVCSU5EAFVOQVVUSE9SSVpFRABNRVRIT0RfTk9UX0FMTE9XRUQASFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURUQAQUxSRUFEWV9SRVBPUlRFRABBQ0NFUFRFRABOT1RfSU1QTEVNRU5URUQATE9PUF9ERVRFQ1RFRABIUEVfQ1JfRVhQRUNURUQASFBFX0xGX0VYUEVDVEVEAENSRUFURUQASU1fVVNFRABIUEVfUEFVU0VEAFRJTUVPVVRfT0NDVVJFRABQQVlNRU5UX1JFUVVJUkVEAFBSRUNPTkRJVElPTl9SRVFVSVJFRABQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRABORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAExFTkdUSF9SRVFVSVJFRABTU0xfQ0VSVElGSUNBVEVfUkVRVUlSRUQAVVBHUkFERV9SRVFVSVJFRABQQUdFX0VYUElSRUQAUFJFQ09ORElUSU9OX0ZBSUxFRABFWFBFQ1RBVElPTl9GQUlMRUQAUkVWQUxJREFUSU9OX0ZBSUxFRABTU0xfSEFORFNIQUtFX0ZBSUxFRABMT0NLRUQAVFJBTlNGT1JNQVRJT05fQVBQTElFRABOT1RfTU9ESUZJRUQATk9UX0VYVEVOREVEAEJBTkRXSURUSF9MSU1JVF9FWENFRURFRABTSVRFX0lTX09WRVJMT0FERUQASEVBRABFeHBlY3RlZCBIVFRQLwAAXhMAACYTAAAwEAAA8BcAAJ0TAAAVEgAAORcAAPASAAAKEAAAdRIAAK0SAACCEwAATxQAAH8QAACgFQAAIxQAAIkSAACLFAAATRUAANQRAADPFAAAEBgAAMkWAADcFgAAwREAAOAXAAC7FAAAdBQAAHwVAADlFAAACBcAAB8QAABlFQAAoxQAACgVAAACFQAAmRUAACwQAACLGQAATw8AANQOAABqEAAAzhAAAAIXAACJDgAAbhMAABwTAABmFAAAVhcAAMETAADNEwAAbBMAAGgXAABmFwAAXxcAACITAADODwAAaQ4AANgOAABjFgAAyxMAAKoOAAAoFwAAJhcAAMUTAABdFgAA6BEAAGcTAABlEwAA8hYAAHMTAAAdFwAA+RYAAPMRAADPDgAAzhUAAAwSAACzEQAApREAAGEQAAAyFwAAuxMAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIDAgICAgIAAAICAAICAAICAgICAgICAgIABAAAAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAACAAICAgICAAACAgACAgACAgICAgICAgICAAMABAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbG9zZWVlcC1hbGl2ZQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEAAAEBAAEBAAEBAQEBAQEBAQEAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlY3Rpb25lbnQtbGVuZ3Rob25yb3h5LWNvbm5lY3Rpb24AAAAAAAAAAAAAAAAAAAByYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNCg0KU00NCg0KVFRQL0NFL1RTUC8AAAAAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQIAAQMAAAAAAAAAAAAAAAAAAAAAAAAEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAQAAAgAAAAAAAAAAAAAAAAAAAAAAAAMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAIAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOT1VOQ0VFQ0tPVVRORUNURVRFQ1JJQkVMVVNIRVRFQURTRUFSQ0hSR0VDVElWSVRZTEVOREFSVkVPVElGWVBUSU9OU0NIU0VBWVNUQVRDSEdFT1JESVJFQ1RPUlRSQ0hQQVJBTUVURVJVUkNFQlNDUklCRUFSRE9XTkFDRUlORE5LQ0tVQlNDUklCRUhUVFAvQURUUC8=";
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/llhttp_simd-wasm.js
var require_llhttp_simd_wasm = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/llhttp/llhttp_simd-wasm.js"(exports2, module2) {
    "use strict";
    init_define_process();
    module2.exports = "AGFzbQEAAAABMAhgAX8Bf2ADf39/AX9gBH9/f38Bf2AAAGADf39/AGABfwBgAn9/AGAGf39/f39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQACA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAA0ZFAwMEAAAFAAAAAAAABQEFAAUFBQAABgAAAAAGBgYGAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAABAQcAAAUFAwABBAUBcAESEgUDAQACBggBfwFBgNQECwfRBSIGbWVtb3J5AgALX2luaXRpYWxpemUACRlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQAChhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUAQQxsbGh0dHBfYWxsb2MADAZtYWxsb2MARgtsbGh0dHBfZnJlZQANBGZyZWUASA9sbGh0dHBfZ2V0X3R5cGUADhVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADxVsbGh0dHBfZ2V0X2h0dHBfbWlub3IAEBFsbGh0dHBfZ2V0X21ldGhvZAARFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAEhJsbGh0dHBfZ2V0X3VwZ3JhZGUAEwxsbGh0dHBfcmVzZXQAFA5sbGh0dHBfZXhlY3V0ZQAVFGxsaHR0cF9zZXR0aW5nc19pbml0ABYNbGxodHRwX2ZpbmlzaAAXDGxsaHR0cF9wYXVzZQAYDWxsaHR0cF9yZXN1bWUAGRtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGhBsbGh0dHBfZ2V0X2Vycm5vABsXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AHBdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAdFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB4RbGxodHRwX2Vycm5vX25hbWUAHxJsbGh0dHBfbWV0aG9kX25hbWUAIBJs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IAH9CwMAIABBMGogAf0LAwAgAEEgaiAB/QsDACAAQd0BNgIcQQALewEBfwJAIAAoAgwiAw0AAkAgACgCBEUNACAAIAE2AgQLAkAgACABIAIQxICAgAAiAw0AIAAoAgwPCyAAIAM2AhxBACEDIAAoAgQiAUUNACAAIAEgAiAAKAIIEYGAgIAAACIBRQ0AIAAgAjYCFCAAIAE2AgwgASEDCyADC+TzAQMOfwN+BH8jgICAgABBEGsiAySAgICAACABIQQgASEFIAEhBiABIQcgASEIIAEhCSABIQogASELIAEhDCABIQ0gASEOIAEhDwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIcIhBBf2oO3QHaAQHZAQIDBAUGBwgJCgsMDQ7YAQ8Q1wEREtYBExQVFhcYGRob4AHfARwdHtUBHyAhIiMkJdQBJicoKSorLNMB0gEtLtEB0AEvMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUbbAUdISUrPAc4BS80BTMwBTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEB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QAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIBAOxwEAAQID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YWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fdmFsdWVgIGNhbGxiYWNrIGVycm9yAGBvbl9zdGF0dXNfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl92ZXJzaW9uX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdXJsX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWV0aG9kX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX25hbWVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3ZlcnNpb24ASW52YWxpZCBtaW5vciB2ZXJzaW9uAEludmFsaWQgbWFqb3IgdmVyc2lvbgBFeHBlY3RlZCBzcGFjZSBhZnRlciB2ZXJzaW9uAEV4cGVjdGVkIENSTEYgYWZ0ZXIgdmVyc2lvbgBJbnZhbGlkIEhUVFAgdmVyc2lvbgBJbnZhbGlkIGhlYWRlciB0b2tlbgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3VybABJbnZhbGlkIGNoYXJhY3RlcnMgaW4gdXJsAFVuZXhwZWN0ZWQgc3RhcnQgY2hhciBpbiB1cmwARG91YmxlIEAgaW4gdXJsAEVtcHR5IENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhcmFjdGVyIGluIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AgaGVhZGVyIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGUgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZWQgdmFsdWUAUGF1c2VkIGJ5IG9uX2hlYWRlcnNfY29tcGxldGUASW52YWxpZCBFT0Ygc3RhdGUAb25fcmVzZXQgcGF1c2UAb25fY2h1bmtfaGVhZGVyIHBhdXNlAG9uX21lc3NhZ2VfYmVnaW4gcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlIHBhdXNlAG9uX3N0YXR1c19jb21wbGV0ZSBwYXVzZQBvbl92ZXJzaW9uX2NvbXBsZXRlIHBhdXNlAG9uX3VybF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGUgcGF1c2UAb25fbWVzc2FnZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXRob2RfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lIHBhdXNlAFVuZXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgc3RhcnQgbGluZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgbmFtZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX21ldGhvZABFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AAU1dJVENIX1BST1hZAFVTRV9QUk9YWQBNS0FDVElWSVRZAFVOUFJPQ0VTU0FCTEVfRU5USVRZAENPUFkATU9WRURfUEVSTUFORU5UTFkAVE9PX0VBUkxZAE5PVElGWQBGQUlMRURfREVQRU5ERU5DWQBCQURfR0FURVdBWQBQTEFZAFBVVABDSEVDS09VVABHQVRFV0FZX1RJTUVPVVQAUkVRVUVTVF9USU1FT1VUAE5FVFdPUktfQ09OTkVDVF9USU1FT1VUAENPTk5FQ1RJT05fVElNRU9VVABMT0dJTl9USU1FT1VUAE5FVFdPUktfUkVBRF9USU1FT1VUAFBPU1QATUlTRElSRUNURURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9MT0FEX0JBTEFOQ0VEX1JFUVVFU1QAQkFEX1JFUVVFU1QASFRUUF9SRVFVRVNUX1NFTlRfVE9fSFRUUFNfUE9SVABSRVBPUlQASU1fQV9URUFQT1QAUkVTRVRfQ09OVEVOVABOT19DT05URU5UAFBBUlRJQUxfQ09OVEVOVABIUEVfSU5WQUxJRF9DT05TVEFOVABIUEVfQ0JfUkVTRVQAR0VUAEhQRV9TVFJJQ1QAQ09ORkxJQ1QAVEVNUE9SQVJZX1JFRElSRUNUAFBFUk1BTkVOVF9SRURJUkVDVABDT05ORUNUAE1VTFRJX1NUQVRVUwBIUEVfSU5WQUxJRF9TVEFUVVMAVE9PX01BTllfUkVRVUVTVFMARUFSTFlfSElOVFMAVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMAT1BUSU9OUwBTV0lUQ0hJTkdfUFJPVE9DT0xTAFZBUklBTlRfQUxTT19ORUdPVElBVEVTAE1VTFRJUExFX0NIT0lDRVMASU5URVJOQUxfU0VSVkVSX0VSUk9SAFdFQl9TRVJWRVJfVU5LTk9XTl9FUlJPUgBSQUlMR1VOX0VSUk9SAElERU5USVRZX1BST1ZJREVSX0FVVEhFTlRJQ0FUSU9OX0VSUk9SAFNTTF9DRVJUSUZJQ0FURV9FUlJPUgBJTlZBTElEX1hfRk9SV0FSREVEX0ZPUgBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIAU0VFX09USEVSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABXRUJfU0VSVkVSX0lTX0RPV04AVEVBUkRPV04ASFBFX0NMT1NFRF9DT05ORUNUSU9OAEhFVVJJU1RJQ19FWFBJUkFUSU9OAERJU0NPTk5FQ1RFRF9PUEVSQVRJT04ATk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBTSVRFX0lTX0ZST1pFTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASU5WQUxJRF9UT0tFTgBGT1JCSURERU4ARU5IQU5DRV9ZT1VSX0NBTE0ASFBFX0lOVkFMSURfVVJMAEJMT0NLRURfQllfUEFSRU5UQUxfQ09OVFJPTABNS0NPTABBQ0wASFBFX0lOVEVSTkFMAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VfVU5PRkZJQ0lBTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkAUkVUUllfV0lUSABIUEVfSU5WQUxJRF9DT05URU5UX0xFTkdUSABIUEVfVU5FWFBFQ1RFRF9DT05URU5UX0xFTkdUSABGTFVTSABQUk9QUEFUQ0gATS1TRUFSQ0gAVVJJX1RPT19MT05HAFBST0NFU1NJTkcATUlTQ0VMTEFORU9VU19QRVJTSVNURU5UX1dBUk5JTkcATUlTQ0VMTEFORU9VU19XQVJOSU5HAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAENPTlRJTlVFAEhQRV9DQl9TVEFUVVNfQ09NUExFVEUASFBFX0NCX0hFQURFUlNfQ09NUExFVEUASFBFX0NCX1ZFUlNJT05fQ09NUExFVEUASFBFX0NCX1VSTF9DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX0hFQURFUl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fTkFNRV9DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBIUEVfQ0JfTUVUSE9EX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfRklFTERfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBJTlZBTElEX1NTTF9DRVJUSUZJQ0FURQBQQVVTRQBOT19SRVNQT05TRQBVTlNVUFBPUlRFRF9NRURJQV9UWVBFAEdPTkUATk9UX0FDQ0VQVEFCTEUAU0VSVklDRV9VTkFWQUlMQUJMRQBSQU5HRV9OT1RfU0FUSVNGSUFCTEUAT1JJR0lOX0lTX1VOUkVBQ0hBQkxFAFJFU1BPTlNFX0lTX1NUQUxFAFBVUkdFAE1FUkdFAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UAUkVRVUVTVF9IRUFERVJfVE9PX0xBUkdFAFBBWUxPQURfVE9PX0xBUkdFAElOU1VGRklDSUVOVF9TVE9SQUdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAEhQRV9VTkVYUEVDVEVEX1NQQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QATk9UX0ZPVU5EAFBST1BGSU5EAFVOQklORABSRUJJTkQAVU5BVVRIT1JJWkVEAE1FVEhPRF9OT1RfQUxMT1dFRABIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRABBTFJFQURZX1JFUE9SVEVEAEFDQ0VQVEVEAE5PVF9JTVBMRU1FTlRFRABMT09QX0RFVEVDVEVEAEhQRV9DUl9FWFBFQ1RFRABIUEVfTEZfRVhQRUNURUQAQ1JFQVRFRABJTV9VU0VEAEhQRV9QQVVTRUQAVElNRU9VVF9PQ0NVUkVEAFBBWU1FTlRfUkVRVUlSRUQAUFJFQ09ORElUSU9OX1JFUVVJUkVEAFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATEVOR1RIX1JFUVVJUkVEAFNTTF9DRVJUSUZJQ0FURV9SRVFVSVJFRABVUEdSQURFX1JFUVVJUkVEAFBBR0VfRVhQSVJFRABQUkVDT05ESVRJT05fRkFJTEVEAEVYUEVDVEFUSU9OX0ZBSUxFRABSRVZBTElEQVRJT05fRkFJTEVEAFNTTF9IQU5EU0hBS0VfRkFJTEVEAExPQ0tFRABUUkFOU0ZPUk1BVElPTl9BUFBMSUVEAE5PVF9NT0RJRklFRABOT1RfRVhURU5ERUQAQkFORFdJRFRIX0xJTUlUX0VYQ0VFREVEAFNJVEVfSVNfT1ZFUkxPQURFRABIRUFEAEV4cGVjdGVkIEhUVFAvAABeEwAAJhMAADAQAADwFwAAnRMAABUSAAA5FwAA8BIAAAoQAAB1EgAArRIAAIITAABPFAAAfxAAAKAVAAAjFAAAiRIAAIsUAABNFQAA1BEAAM8UAAAQGAAAyRYAANwWAADBEQAA4BcAALsUAAB0FAAAfBUAAOUUAAAIFwAAHxAAAGUVAACjFAAAKBUAAAIVAACZFQAALBAAAIsZAABPDwAA1A4AAGoQAADOEAAAAhcAAIkOAABuEwAAHBMAAGYUAABWFwAAwRMAAM0TAABsEwAAaBcAAGYXAABfFwAAIhMAAM4PAABpDgAA2A4AAGMWAADLEwAAqg4AACgXAAAmFwAAxRMAAF0WAADoEQAAZxMAAGUTAADyFgAAcxMAAB0XAAD5FgAA8xEAAM8OAADOFQAADBIAALMRAAClEQAAYRAAADIXAAC7EwAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAgMCAgICAgAAAgIAAgIAAgICAgICAgICAgAEAAAAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgICAgIAAAICAAICAAICAgICAgICAgIAAwAEAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsb3NlZWVwLWFsaXZlAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQABAQEBAQAAAQEAAQEAAQEBAQEBAQEBAQAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgAAAAAAAAAAAAAAAAAAAHJhbnNmZXItZW5jb2RpbmdwZ3JhZGUNCg0KDQpTTQ0KDQpUVFAvQ0UvVFNQLwAAAAAAAAAAAAAAAAECAAEDAAAAAAAAAAAAAAAAAAAAAAAABAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAABAgABAwAAAAAAAAAAAAAAAAAAAAAAAAQBAQUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAAAAAAAAAABAAACAAAAAAAAAAAAAAAAAAAAAAAAAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAgAAAAACAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw==";
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/client.js
var require_client = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/client.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var assert = require("assert");
    var net = require("net");
    var util = require_util();
    var timers = require_timers();
    var Request2 = require_undici_core_request();
    var DispatcherBase = require_dispatcher_base();
    var {
      RequestContentLengthMismatchError,
      ResponseContentLengthMismatchError,
      InvalidArgumentError: InvalidArgumentError2,
      RequestAbortedError,
      HeadersTimeoutError,
      HeadersOverflowError,
      SocketError,
      InformationalError,
      BodyTimeoutError,
      HTTPParserError,
      ResponseExceededMaxSizeError,
      ClientDestroyedError
    } = require_errors();
    var buildConnector = require_connect();
    var {
      kUrl,
      kReset,
      kServerName,
      kClient,
      kBusy,
      kParser,
      kConnect,
      kBlocking,
      kResuming,
      kRunning,
      kPending,
      kSize,
      kWriting,
      kQueue,
      kConnected,
      kConnecting,
      kNeedDrain,
      kNoRef,
      kKeepAliveDefaultTimeout,
      kHostHeader,
      kPendingIdx,
      kRunningIdx,
      kError,
      kPipelining,
      kSocket,
      kKeepAliveTimeoutValue,
      kMaxHeadersSize,
      kKeepAliveMaxTimeout,
      kKeepAliveTimeoutThreshold,
      kHeadersTimeout,
      kBodyTimeout,
      kStrictContentLength,
      kConnector,
      kMaxRedirections,
      kMaxRequests,
      kCounter,
      kClose,
      kDestroy,
      kDispatch,
      kInterceptors,
      kLocalAddress,
      kMaxResponseSize
    } = require_symbols2();
    var FastBuffer = Buffer[Symbol.species];
    var kClosedResolve = Symbol("kClosedResolve");
    var channels = {};
    try {
      const diagnosticsChannel = require("diagnostics_channel");
      channels.sendHeaders = diagnosticsChannel.channel("undici:client:sendHeaders");
      channels.beforeConnect = diagnosticsChannel.channel("undici:client:beforeConnect");
      channels.connectError = diagnosticsChannel.channel("undici:client:connectError");
      channels.connected = diagnosticsChannel.channel("undici:client:connected");
    } catch {
      channels.sendHeaders = { hasSubscribers: false };
      channels.beforeConnect = { hasSubscribers: false };
      channels.connectError = { hasSubscribers: false };
      channels.connected = { hasSubscribers: false };
    }
    var _Client = class _Client extends DispatcherBase {
      /**
       *
       * @param {string|URL} url
       * @param {import('../types/client').Client.Options} options
       */
      constructor(url, {
        interceptors,
        maxHeaderSize,
        headersTimeout,
        socketTimeout,
        requestTimeout,
        connectTimeout,
        bodyTimeout,
        idleTimeout,
        keepAlive,
        keepAliveTimeout,
        maxKeepAliveTimeout,
        keepAliveMaxTimeout,
        keepAliveTimeoutThreshold,
        socketPath,
        pipelining,
        tls,
        strictContentLength,
        maxCachedSessions,
        maxRedirections,
        connect: connect2,
        maxRequestsPerClient,
        localAddress,
        maxResponseSize,
        autoSelectFamily,
        autoSelectFamilyAttemptTimeout
      } = {}) {
        super();
        if (keepAlive !== void 0) {
          throw new InvalidArgumentError2("unsupported keepAlive, use pipelining=0 instead");
        }
        if (socketTimeout !== void 0) {
          throw new InvalidArgumentError2("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
        }
        if (requestTimeout !== void 0) {
          throw new InvalidArgumentError2("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
        }
        if (idleTimeout !== void 0) {
          throw new InvalidArgumentError2("unsupported idleTimeout, use keepAliveTimeout instead");
        }
        if (maxKeepAliveTimeout !== void 0) {
          throw new InvalidArgumentError2("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
        }
        if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
          throw new InvalidArgumentError2("invalid maxHeaderSize");
        }
        if (socketPath != null && typeof socketPath !== "string") {
          throw new InvalidArgumentError2("invalid socketPath");
        }
        if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
          throw new InvalidArgumentError2("invalid connectTimeout");
        }
        if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
          throw new InvalidArgumentError2("invalid keepAliveTimeout");
        }
        if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
          throw new InvalidArgumentError2("invalid keepAliveMaxTimeout");
        }
        if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
          throw new InvalidArgumentError2("invalid keepAliveTimeoutThreshold");
        }
        if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
          throw new InvalidArgumentError2("headersTimeout must be a positive integer or zero");
        }
        if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
          throw new InvalidArgumentError2("bodyTimeout must be a positive integer or zero");
        }
        if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
          throw new InvalidArgumentError2("connect must be a function or an object");
        }
        if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
          throw new InvalidArgumentError2("maxRedirections must be a positive number");
        }
        if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
          throw new InvalidArgumentError2("maxRequestsPerClient must be a positive number");
        }
        if (localAddress != null && (typeof localAddress !== "string" || net.isIP(localAddress) === 0)) {
          throw new InvalidArgumentError2("localAddress must be valid string IP address");
        }
        if (maxResponseSize != null && (!Number.isInteger(maxResponseSize) || maxResponseSize < -1)) {
          throw new InvalidArgumentError2("maxResponseSize must be a positive number");
        }
        if (autoSelectFamilyAttemptTimeout != null && (!Number.isInteger(autoSelectFamilyAttemptTimeout) || autoSelectFamilyAttemptTimeout < -1)) {
          throw new InvalidArgumentError2("autoSelectFamilyAttemptTimeout must be a positive number");
        }
        if (typeof connect2 !== "function") {
          connect2 = buildConnector({
            ...tls,
            maxCachedSessions,
            socketPath,
            timeout: connectTimeout,
            ...util.nodeHasAutoSelectFamily && autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
            ...connect2
          });
        }
        this[kInterceptors] = interceptors && interceptors.Client && Array.isArray(interceptors.Client) ? interceptors.Client : [createRedirectInterceptor({ maxRedirections })];
        this[kUrl] = util.parseOrigin(url);
        this[kConnector] = connect2;
        this[kSocket] = null;
        this[kPipelining] = pipelining != null ? pipelining : 1;
        this[kMaxHeadersSize] = maxHeaderSize || 16384;
        this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
        this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 6e5 : keepAliveMaxTimeout;
        this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 1e3 : keepAliveTimeoutThreshold;
        this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
        this[kServerName] = null;
        this[kLocalAddress] = localAddress != null ? localAddress : null;
        this[kResuming] = 0;
        this[kNeedDrain] = 0;
        this[kHostHeader] = \`host: \${this[kUrl].hostname}\${this[kUrl].port ? \`:\${this[kUrl].port}\` : ""}\\r
\`;
        this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 3e5;
        this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 3e5;
        this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
        this[kMaxRedirections] = maxRedirections;
        this[kMaxRequests] = maxRequestsPerClient;
        this[kClosedResolve] = null;
        this[kMaxResponseSize] = maxResponseSize > -1 ? maxResponseSize : -1;
        this[kQueue] = [];
        this[kRunningIdx] = 0;
        this[kPendingIdx] = 0;
      }
      get pipelining() {
        return this[kPipelining];
      }
      set pipelining(value) {
        this[kPipelining] = value;
        resume(this, true);
      }
      get [kPending]() {
        return this[kQueue].length - this[kPendingIdx];
      }
      get [kRunning]() {
        return this[kPendingIdx] - this[kRunningIdx];
      }
      get [kSize]() {
        return this[kQueue].length - this[kRunningIdx];
      }
      get [kConnected]() {
        return !!this[kSocket] && !this[kConnecting] && !this[kSocket].destroyed;
      }
      get [kBusy]() {
        const socket = this[kSocket];
        return socket && (socket[kReset] || socket[kWriting] || socket[kBlocking]) || this[kSize] >= (this[kPipelining] || 1) || this[kPending] > 0;
      }
      /* istanbul ignore: only used for test */
      [kConnect](cb) {
        connect(this);
        this.once("connect", cb);
      }
      [kDispatch](opts, handler) {
        const origin = opts.origin || this[kUrl].origin;
        const request = new Request2(origin, opts, handler);
        this[kQueue].push(request);
        if (this[kResuming]) {
        } else if (util.bodyLength(request.body) == null && util.isIterable(request.body)) {
          this[kResuming] = 1;
          define_process_default.nextTick(resume, this);
        } else {
          resume(this, true);
        }
        if (this[kResuming] && this[kNeedDrain] !== 2 && this[kBusy]) {
          this[kNeedDrain] = 2;
        }
        return this[kNeedDrain] < 2;
      }
      async [kClose]() {
        return new Promise((resolve) => {
          if (!this[kSize]) {
            resolve(null);
          } else {
            this[kClosedResolve] = resolve;
          }
        });
      }
      async [kDestroy](err) {
        return new Promise((resolve) => {
          const requests = this[kQueue].splice(this[kPendingIdx]);
          for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            errorRequest(this, request, err);
          }
          const callback = /* @__PURE__ */ __name(() => {
            if (this[kClosedResolve]) {
              this[kClosedResolve]();
              this[kClosedResolve] = null;
            }
            resolve();
          }, "callback");
          if (!this[kSocket]) {
            queueMicrotask(callback);
          } else {
            util.destroy(this[kSocket].on("close", callback), err);
          }
          resume(this);
        });
      }
    };
    __name(_Client, "Client");
    var Client = _Client;
    var constants = require_constants2();
    var createRedirectInterceptor = require_redirectInterceptor();
    var EMPTY_BUF = Buffer.alloc(0);
    async function lazyllhttp() {
      const llhttpWasmData = define_process_default.env.JEST_WORKER_ID ? require_llhttp_wasm() : void 0;
      let mod;
      try {
        mod = await WebAssembly.compile(Buffer.from(require_llhttp_simd_wasm(), "base64"));
      } catch (e) {
        mod = await WebAssembly.compile(Buffer.from(llhttpWasmData || require_llhttp_wasm(), "base64"));
      }
      return await WebAssembly.instantiate(mod, {
        env: {
          /* eslint-disable camelcase */
          wasm_on_url: (p, at, len) => {
            return 0;
          },
          wasm_on_status: (p, at, len) => {
            assert.strictEqual(currentParser.ptr, p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onStatus(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
          },
          wasm_on_message_begin: (p) => {
            assert.strictEqual(currentParser.ptr, p);
            return currentParser.onMessageBegin() || 0;
          },
          wasm_on_header_field: (p, at, len) => {
            assert.strictEqual(currentParser.ptr, p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onHeaderField(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
          },
          wasm_on_header_value: (p, at, len) => {
            assert.strictEqual(currentParser.ptr, p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onHeaderValue(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
          },
          wasm_on_headers_complete: (p, statusCode, upgrade, shouldKeepAlive) => {
            assert.strictEqual(currentParser.ptr, p);
            return currentParser.onHeadersComplete(statusCode, Boolean(upgrade), Boolean(shouldKeepAlive)) || 0;
          },
          wasm_on_body: (p, at, len) => {
            assert.strictEqual(currentParser.ptr, p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onBody(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
          },
          wasm_on_message_complete: (p) => {
            assert.strictEqual(currentParser.ptr, p);
            return currentParser.onMessageComplete() || 0;
          }
          /* eslint-enable camelcase */
        }
      });
    }
    __name(lazyllhttp, "lazyllhttp");
    var llhttpInstance = null;
    var llhttpPromise = lazyllhttp();
    llhttpPromise.catch();
    var currentParser = null;
    var currentBufferRef = null;
    var currentBufferSize = 0;
    var currentBufferPtr = null;
    var TIMEOUT_HEADERS = 1;
    var TIMEOUT_BODY = 2;
    var TIMEOUT_IDLE = 3;
    var _Parser = class _Parser {
      constructor(client, socket, { exports: exports3 }) {
        assert(Number.isFinite(client[kMaxHeadersSize]) && client[kMaxHeadersSize] > 0);
        this.llhttp = exports3;
        this.ptr = this.llhttp.llhttp_alloc(constants.TYPE.RESPONSE);
        this.client = client;
        this.socket = socket;
        this.timeout = null;
        this.timeoutValue = null;
        this.timeoutType = null;
        this.statusCode = null;
        this.statusText = "";
        this.upgrade = false;
        this.headers = [];
        this.headersSize = 0;
        this.headersMaxSize = client[kMaxHeadersSize];
        this.shouldKeepAlive = false;
        this.paused = false;
        this.resume = this.resume.bind(this);
        this.bytesRead = 0;
        this.keepAlive = "";
        this.contentLength = "";
        this.connection = "";
        this.maxResponseSize = client[kMaxResponseSize];
      }
      setTimeout(value, type) {
        this.timeoutType = type;
        if (value !== this.timeoutValue) {
          timers.clearTimeout(this.timeout);
          if (value) {
            this.timeout = timers.setTimeout(onParserTimeout, value, this);
            if (this.timeout.unref) {
              this.timeout.unref();
            }
          } else {
            this.timeout = null;
          }
          this.timeoutValue = value;
        } else if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
      }
      resume() {
        if (this.socket.destroyed || !this.paused) {
          return;
        }
        assert(this.ptr != null);
        assert(currentParser == null);
        this.llhttp.llhttp_resume(this.ptr);
        assert(this.timeoutType === TIMEOUT_BODY);
        if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
        this.paused = false;
        this.execute(this.socket.read() || EMPTY_BUF);
        this.readMore();
      }
      readMore() {
        while (!this.paused && this.ptr) {
          const chunk = this.socket.read();
          if (chunk === null) {
            break;
          }
          this.execute(chunk);
        }
      }
      execute(data) {
        assert(this.ptr != null);
        assert(currentParser == null);
        assert(!this.paused);
        const { socket, llhttp } = this;
        if (data.length > currentBufferSize) {
          if (currentBufferPtr) {
            llhttp.free(currentBufferPtr);
          }
          currentBufferSize = Math.ceil(data.length / 4096) * 4096;
          currentBufferPtr = llhttp.malloc(currentBufferSize);
        }
        new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);
        try {
          let ret;
          try {
            currentBufferRef = data;
            currentParser = this;
            ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
          } catch (err) {
            throw err;
          } finally {
            currentParser = null;
            currentBufferRef = null;
          }
          const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;
          if (ret === constants.ERROR.PAUSED_UPGRADE) {
            this.onUpgrade(data.slice(offset));
          } else if (ret === constants.ERROR.PAUSED) {
            this.paused = true;
            socket.unshift(data.slice(offset));
          } else if (ret !== constants.ERROR.OK) {
            const ptr = llhttp.llhttp_get_error_reason(this.ptr);
            let message = "";
            if (ptr) {
              const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
              message = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(llhttp.memory.buffer, ptr, len).toString() + ")";
            }
            throw new HTTPParserError(message, constants.ERROR[ret], data.slice(offset));
          }
        } catch (err) {
          util.destroy(socket, err);
        }
      }
      destroy() {
        assert(this.ptr != null);
        assert(currentParser == null);
        this.llhttp.llhttp_free(this.ptr);
        this.ptr = null;
        timers.clearTimeout(this.timeout);
        this.timeout = null;
        this.timeoutValue = null;
        this.timeoutType = null;
        this.paused = false;
      }
      onStatus(buf) {
        this.statusText = buf.toString();
      }
      onMessageBegin() {
        const { socket, client } = this;
        if (socket.destroyed) {
          return -1;
        }
        const request = client[kQueue][client[kRunningIdx]];
        if (!request) {
          return -1;
        }
      }
      onHeaderField(buf) {
        const len = this.headers.length;
        if ((len & 1) === 0) {
          this.headers.push(buf);
        } else {
          this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
        }
        this.trackHeader(buf.length);
      }
      onHeaderValue(buf) {
        let len = this.headers.length;
        if ((len & 1) === 1) {
          this.headers.push(buf);
          len += 1;
        } else {
          this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
        }
        const key = this.headers[len - 2];
        if (key.length === 10 && key.toString().toLowerCase() === "keep-alive") {
          this.keepAlive += buf.toString();
        } else if (key.length === 10 && key.toString().toLowerCase() === "connection") {
          this.connection += buf.toString();
        } else if (key.length === 14 && key.toString().toLowerCase() === "content-length") {
          this.contentLength += buf.toString();
        }
        this.trackHeader(buf.length);
      }
      trackHeader(len) {
        this.headersSize += len;
        if (this.headersSize >= this.headersMaxSize) {
          util.destroy(this.socket, new HeadersOverflowError());
        }
      }
      onUpgrade(head) {
        const { upgrade, client, socket, headers, statusCode } = this;
        assert(upgrade);
        const request = client[kQueue][client[kRunningIdx]];
        assert(request);
        assert(!socket.destroyed);
        assert(socket === client[kSocket]);
        assert(!this.paused);
        assert(request.upgrade || request.method === "CONNECT");
        this.statusCode = null;
        this.statusText = "";
        this.shouldKeepAlive = null;
        assert(this.headers.length % 2 === 0);
        this.headers = [];
        this.headersSize = 0;
        socket.unshift(head);
        socket[kParser].destroy();
        socket[kParser] = null;
        socket[kClient] = null;
        socket[kError] = null;
        socket.removeListener("error", onSocketError).removeListener("readable", onSocketReadable).removeListener("end", onSocketEnd).removeListener("close", onSocketClose);
        client[kSocket] = null;
        client[kQueue][client[kRunningIdx]++] = null;
        client.emit("disconnect", client[kUrl], [client], new InformationalError("upgrade"));
        try {
          request.onUpgrade(statusCode, headers, socket);
        } catch (err) {
          util.destroy(socket, err);
        }
        resume(client);
      }
      onHeadersComplete(statusCode, upgrade, shouldKeepAlive) {
        const { client, socket, headers, statusText } = this;
        if (socket.destroyed) {
          return -1;
        }
        const request = client[kQueue][client[kRunningIdx]];
        if (!request) {
          return -1;
        }
        assert(!this.upgrade);
        assert(this.statusCode < 200);
        if (statusCode === 100) {
          util.destroy(socket, new SocketError("bad response", util.getSocketInfo(socket)));
          return -1;
        }
        if (upgrade && !request.upgrade) {
          util.destroy(socket, new SocketError("bad upgrade", util.getSocketInfo(socket)));
          return -1;
        }
        assert.strictEqual(this.timeoutType, TIMEOUT_HEADERS);
        this.statusCode = statusCode;
        this.shouldKeepAlive = shouldKeepAlive || // Override llhttp value which does not allow keepAlive for HEAD.
        request.method === "HEAD" && !socket[kReset] && this.connection.toLowerCase() === "keep-alive";
        if (this.statusCode >= 200) {
          const bodyTimeout = request.bodyTimeout != null ? request.bodyTimeout : client[kBodyTimeout];
          this.setTimeout(bodyTimeout, TIMEOUT_BODY);
        } else if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
        if (request.method === "CONNECT") {
          assert(client[kRunning] === 1);
          this.upgrade = true;
          return 2;
        }
        if (upgrade) {
          assert(client[kRunning] === 1);
          this.upgrade = true;
          return 2;
        }
        assert(this.headers.length % 2 === 0);
        this.headers = [];
        this.headersSize = 0;
        if (this.shouldKeepAlive && client[kPipelining]) {
          const keepAliveTimeout = this.keepAlive ? util.parseKeepAliveTimeout(this.keepAlive) : null;
          if (keepAliveTimeout != null) {
            const timeout = Math.min(
              keepAliveTimeout - client[kKeepAliveTimeoutThreshold],
              client[kKeepAliveMaxTimeout]
            );
            if (timeout <= 0) {
              socket[kReset] = true;
            } else {
              client[kKeepAliveTimeoutValue] = timeout;
            }
          } else {
            client[kKeepAliveTimeoutValue] = client[kKeepAliveDefaultTimeout];
          }
        } else {
          socket[kReset] = true;
        }
        let pause;
        try {
          pause = request.onHeaders(statusCode, headers, this.resume, statusText) === false;
        } catch (err) {
          util.destroy(socket, err);
          return -1;
        }
        if (request.method === "HEAD") {
          return 1;
        }
        if (statusCode < 200) {
          return 1;
        }
        if (socket[kBlocking]) {
          socket[kBlocking] = false;
          resume(client);
        }
        return pause ? constants.ERROR.PAUSED : 0;
      }
      onBody(buf) {
        const { client, socket, statusCode, maxResponseSize } = this;
        if (socket.destroyed) {
          return -1;
        }
        const request = client[kQueue][client[kRunningIdx]];
        assert(request);
        assert.strictEqual(this.timeoutType, TIMEOUT_BODY);
        if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
        assert(statusCode >= 200);
        if (maxResponseSize > -1 && this.bytesRead + buf.length > maxResponseSize) {
          util.destroy(socket, new ResponseExceededMaxSizeError());
          return -1;
        }
        this.bytesRead += buf.length;
        try {
          if (request.onData(buf) === false) {
            return constants.ERROR.PAUSED;
          }
        } catch (err) {
          util.destroy(socket, err);
          return -1;
        }
      }
      onMessageComplete() {
        const { client, socket, statusCode, upgrade, headers, contentLength, bytesRead, shouldKeepAlive } = this;
        if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
          return -1;
        }
        if (upgrade) {
          return;
        }
        const request = client[kQueue][client[kRunningIdx]];
        assert(request);
        assert(statusCode >= 100);
        this.statusCode = null;
        this.statusText = "";
        this.bytesRead = 0;
        this.contentLength = "";
        this.keepAlive = "";
        this.connection = "";
        assert(this.headers.length % 2 === 0);
        this.headers = [];
        this.headersSize = 0;
        if (statusCode < 200) {
          return;
        }
        if (request.method !== "HEAD" && contentLength && bytesRead !== parseInt(contentLength, 10)) {
          util.destroy(socket, new ResponseContentLengthMismatchError());
          return -1;
        }
        try {
          request.onComplete(headers);
        } catch (err) {
          errorRequest(client, request, err);
        }
        client[kQueue][client[kRunningIdx]++] = null;
        if (socket[kWriting]) {
          assert.strictEqual(client[kRunning], 0);
          util.destroy(socket, new InformationalError("reset"));
          return constants.ERROR.PAUSED;
        } else if (!shouldKeepAlive) {
          util.destroy(socket, new InformationalError("reset"));
          return constants.ERROR.PAUSED;
        } else if (socket[kReset] && client[kRunning] === 0) {
          util.destroy(socket, new InformationalError("reset"));
          return constants.ERROR.PAUSED;
        } else if (client[kPipelining] === 1) {
          setImmediate(resume, client);
        } else {
          resume(client);
        }
      }
    };
    __name(_Parser, "Parser");
    var Parser = _Parser;
    function onParserTimeout(parser) {
      const { socket, timeoutType, client } = parser;
      if (timeoutType === TIMEOUT_HEADERS) {
        if (!socket[kWriting] || socket.writableNeedDrain || client[kRunning] > 1) {
          assert(!parser.paused, "cannot be paused while waiting for headers");
          util.destroy(socket, new HeadersTimeoutError());
        }
      } else if (timeoutType === TIMEOUT_BODY) {
        if (!parser.paused) {
          util.destroy(socket, new BodyTimeoutError());
        }
      } else if (timeoutType === TIMEOUT_IDLE) {
        assert(client[kRunning] === 0 && client[kKeepAliveTimeoutValue]);
        util.destroy(socket, new InformationalError("socket idle timeout"));
      }
    }
    __name(onParserTimeout, "onParserTimeout");
    function onSocketReadable() {
      const { [kParser]: parser } = this;
      parser.readMore();
    }
    __name(onSocketReadable, "onSocketReadable");
    function onSocketError(err) {
      const { [kParser]: parser } = this;
      assert(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
      if (err.code === "ECONNRESET" && parser.statusCode && !parser.shouldKeepAlive) {
        parser.onMessageComplete();
        return;
      }
      this[kError] = err;
      onError(this[kClient], err);
    }
    __name(onSocketError, "onSocketError");
    function onError(client, err) {
      if (client[kRunning] === 0 && err.code !== "UND_ERR_INFO" && err.code !== "UND_ERR_SOCKET") {
        assert(client[kPendingIdx] === client[kRunningIdx]);
        const requests = client[kQueue].splice(client[kRunningIdx]);
        for (let i = 0; i < requests.length; i++) {
          const request = requests[i];
          errorRequest(client, request, err);
        }
        assert(client[kSize] === 0);
      }
    }
    __name(onError, "onError");
    function onSocketEnd() {
      const { [kParser]: parser } = this;
      if (parser.statusCode && !parser.shouldKeepAlive) {
        parser.onMessageComplete();
        return;
      }
      util.destroy(this, new SocketError("other side closed", util.getSocketInfo(this)));
    }
    __name(onSocketEnd, "onSocketEnd");
    function onSocketClose() {
      const { [kClient]: client } = this;
      if (!this[kError] && this[kParser].statusCode && !this[kParser].shouldKeepAlive) {
        this[kParser].onMessageComplete();
      }
      this[kParser].destroy();
      this[kParser] = null;
      const err = this[kError] || new SocketError("closed", util.getSocketInfo(this));
      client[kSocket] = null;
      if (client.destroyed) {
        assert(client[kPending] === 0);
        const requests = client[kQueue].splice(client[kRunningIdx]);
        for (let i = 0; i < requests.length; i++) {
          const request = requests[i];
          errorRequest(client, request, err);
        }
      } else if (client[kRunning] > 0 && err.code !== "UND_ERR_INFO") {
        const request = client[kQueue][client[kRunningIdx]];
        client[kQueue][client[kRunningIdx]++] = null;
        errorRequest(client, request, err);
      }
      client[kPendingIdx] = client[kRunningIdx];
      assert(client[kRunning] === 0);
      client.emit("disconnect", client[kUrl], [client], err);
      resume(client);
    }
    __name(onSocketClose, "onSocketClose");
    async function connect(client) {
      assert(!client[kConnecting]);
      assert(!client[kSocket]);
      let { host, hostname, protocol, port } = client[kUrl];
      if (hostname[0] === "[") {
        const idx = hostname.indexOf("]");
        assert(idx !== -1);
        const ip = hostname.substr(1, idx - 1);
        assert(net.isIP(ip));
        hostname = ip;
      }
      client[kConnecting] = true;
      if (channels.beforeConnect.hasSubscribers) {
        channels.beforeConnect.publish({
          connectParams: {
            host,
            hostname,
            protocol,
            port,
            servername: client[kServerName],
            localAddress: client[kLocalAddress]
          },
          connector: client[kConnector]
        });
      }
      try {
        const socket = await new Promise((resolve, reject) => {
          client[kConnector]({
            host,
            hostname,
            protocol,
            port,
            servername: client[kServerName],
            localAddress: client[kLocalAddress]
          }, (err, socket2) => {
            if (err) {
              reject(err);
            } else {
              resolve(socket2);
            }
          });
        });
        if (client.destroyed) {
          util.destroy(socket.on("error", () => {
          }), new ClientDestroyedError());
          return;
        }
        if (!llhttpInstance) {
          llhttpInstance = await llhttpPromise;
          llhttpPromise = null;
        }
        client[kConnecting] = false;
        assert(socket);
        socket[kNoRef] = false;
        socket[kWriting] = false;
        socket[kReset] = false;
        socket[kBlocking] = false;
        socket[kError] = null;
        socket[kParser] = new Parser(client, socket, llhttpInstance);
        socket[kClient] = client;
        socket[kCounter] = 0;
        socket[kMaxRequests] = client[kMaxRequests];
        socket.on("error", onSocketError).on("readable", onSocketReadable).on("end", onSocketEnd).on("close", onSocketClose);
        client[kSocket] = socket;
        if (channels.connected.hasSubscribers) {
          channels.connected.publish({
            connectParams: {
              host,
              hostname,
              protocol,
              port,
              servername: client[kServerName],
              localAddress: client[kLocalAddress]
            },
            connector: client[kConnector],
            socket
          });
        }
        client.emit("connect", client[kUrl], [client]);
      } catch (err) {
        if (client.destroyed) {
          return;
        }
        client[kConnecting] = false;
        if (channels.connectError.hasSubscribers) {
          channels.connectError.publish({
            connectParams: {
              host,
              hostname,
              protocol,
              port,
              servername: client[kServerName],
              localAddress: client[kLocalAddress]
            },
            connector: client[kConnector],
            error: err
          });
        }
        if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
          assert(client[kRunning] === 0);
          while (client[kPending] > 0 && client[kQueue][client[kPendingIdx]].servername === client[kServerName]) {
            const request = client[kQueue][client[kPendingIdx]++];
            errorRequest(client, request, err);
          }
        } else {
          onError(client, err);
        }
        client.emit("connectionError", client[kUrl], [client], err);
      }
      resume(client);
    }
    __name(connect, "connect");
    function emitDrain(client) {
      client[kNeedDrain] = 0;
      client.emit("drain", client[kUrl], [client]);
    }
    __name(emitDrain, "emitDrain");
    function resume(client, sync) {
      if (client[kResuming] === 2) {
        return;
      }
      client[kResuming] = 2;
      _resume(client, sync);
      client[kResuming] = 0;
      if (client[kRunningIdx] > 256) {
        client[kQueue].splice(0, client[kRunningIdx]);
        client[kPendingIdx] -= client[kRunningIdx];
        client[kRunningIdx] = 0;
      }
    }
    __name(resume, "resume");
    function _resume(client, sync) {
      while (true) {
        if (client.destroyed) {
          assert(client[kPending] === 0);
          return;
        }
        if (client[kClosedResolve] && !client[kSize]) {
          client[kClosedResolve]();
          client[kClosedResolve] = null;
          return;
        }
        const socket = client[kSocket];
        if (socket && !socket.destroyed) {
          if (client[kSize] === 0) {
            if (!socket[kNoRef] && socket.unref) {
              socket.unref();
              socket[kNoRef] = true;
            }
          } else if (socket[kNoRef] && socket.ref) {
            socket.ref();
            socket[kNoRef] = false;
          }
          if (client[kSize] === 0) {
            if (socket[kParser].timeoutType !== TIMEOUT_IDLE) {
              socket[kParser].setTimeout(client[kKeepAliveTimeoutValue], TIMEOUT_IDLE);
            }
          } else if (client[kRunning] > 0 && socket[kParser].statusCode < 200) {
            if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
              const request2 = client[kQueue][client[kRunningIdx]];
              const headersTimeout = request2.headersTimeout != null ? request2.headersTimeout : client[kHeadersTimeout];
              socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
            }
          }
        }
        if (client[kBusy]) {
          client[kNeedDrain] = 2;
        } else if (client[kNeedDrain] === 2) {
          if (sync) {
            client[kNeedDrain] = 1;
            define_process_default.nextTick(emitDrain, client);
          } else {
            emitDrain(client);
          }
          continue;
        }
        if (client[kPending] === 0) {
          return;
        }
        if (client[kRunning] >= (client[kPipelining] || 1)) {
          return;
        }
        const request = client[kQueue][client[kPendingIdx]];
        if (client[kUrl].protocol === "https:" && client[kServerName] !== request.servername) {
          if (client[kRunning] > 0) {
            return;
          }
          client[kServerName] = request.servername;
          if (socket && socket.servername !== request.servername) {
            util.destroy(socket, new InformationalError("servername changed"));
            return;
          }
        }
        if (client[kConnecting]) {
          return;
        }
        if (!socket) {
          connect(client);
          return;
        }
        if (socket.destroyed || socket[kWriting] || socket[kReset] || socket[kBlocking]) {
          return;
        }
        if (client[kRunning] > 0 && !request.idempotent) {
          return;
        }
        if (client[kRunning] > 0 && (request.upgrade || request.method === "CONNECT")) {
          return;
        }
        if (util.isStream(request.body) && util.bodyLength(request.body) === 0) {
          request.body.on(
            "data",
            /* istanbul ignore next */
            function() {
              assert(false);
            }
          ).on("error", function(err) {
            errorRequest(client, request, err);
          }).on("end", function() {
            util.destroy(this);
          });
          request.body = null;
        }
        if (client[kRunning] > 0 && (util.isStream(request.body) || util.isAsyncIterable(request.body))) {
          return;
        }
        if (!request.aborted && write(client, request)) {
          client[kPendingIdx]++;
        } else {
          client[kQueue].splice(client[kPendingIdx], 1);
        }
      }
    }
    __name(_resume, "_resume");
    function write(client, request) {
      const { body, method, path, host, upgrade, headers, blocking, reset } = request;
      const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
      if (body && typeof body.read === "function") {
        body.read(0);
      }
      let contentLength = util.bodyLength(body);
      if (contentLength === null) {
        contentLength = request.contentLength;
      }
      if (contentLength === 0 && !expectsPayload) {
        contentLength = null;
      }
      if (request.contentLength !== null && request.contentLength !== contentLength) {
        if (client[kStrictContentLength]) {
          errorRequest(client, request, new RequestContentLengthMismatchError());
          return false;
        }
        define_process_default.emitWarning(new RequestContentLengthMismatchError());
      }
      const socket = client[kSocket];
      try {
        request.onConnect((err) => {
          if (request.aborted || request.completed) {
            return;
          }
          errorRequest(client, request, err || new RequestAbortedError());
          util.destroy(socket, new InformationalError("aborted"));
        });
      } catch (err) {
        errorRequest(client, request, err);
      }
      if (request.aborted) {
        return false;
      }
      if (method === "HEAD") {
        socket[kReset] = true;
      }
      if (upgrade || method === "CONNECT") {
        socket[kReset] = true;
      }
      if (reset != null) {
        socket[kReset] = reset;
      }
      if (client[kMaxRequests] && socket[kCounter]++ >= client[kMaxRequests]) {
        socket[kReset] = true;
      }
      if (blocking) {
        socket[kBlocking] = true;
      }
      let header = \`\${method} \${path} HTTP/1.1\\r
\`;
      if (typeof host === "string") {
        header += \`host: \${host}\\r
\`;
      } else {
        header += client[kHostHeader];
      }
      if (upgrade) {
        header += \`connection: upgrade\\r
upgrade: \${upgrade}\\r
\`;
      } else if (client[kPipelining] && !socket[kReset]) {
        header += "connection: keep-alive\\r\\n";
      } else {
        header += "connection: close\\r\\n";
      }
      if (headers) {
        header += headers;
      }
      if (channels.sendHeaders.hasSubscribers) {
        channels.sendHeaders.publish({ request, headers: header, socket });
      }
      if (!body) {
        if (contentLength === 0) {
          socket.write(\`\${header}content-length: 0\\r
\\r
\`, "latin1");
        } else {
          assert(contentLength === null, "no body must not have content length");
          socket.write(\`\${header}\\r
\`, "latin1");
        }
        request.onRequestSent();
      } else if (util.isBuffer(body)) {
        assert(contentLength === body.byteLength, "buffer body must have content length");
        socket.cork();
        socket.write(\`\${header}content-length: \${contentLength}\\r
\\r
\`, "latin1");
        socket.write(body);
        socket.uncork();
        request.onBodySent(body);
        request.onRequestSent();
        if (!expectsPayload) {
          socket[kReset] = true;
        }
      } else if (util.isBlobLike(body)) {
        if (typeof body.stream === "function") {
          writeIterable({ body: body.stream(), client, request, socket, contentLength, header, expectsPayload });
        } else {
          writeBlob({ body, client, request, socket, contentLength, header, expectsPayload });
        }
      } else if (util.isStream(body)) {
        writeStream({ body, client, request, socket, contentLength, header, expectsPayload });
      } else if (util.isIterable(body)) {
        writeIterable({ body, client, request, socket, contentLength, header, expectsPayload });
      } else {
        assert(false);
      }
      return true;
    }
    __name(write, "write");
    function writeStream({ body, client, request, socket, contentLength, header, expectsPayload }) {
      assert(contentLength !== 0 || client[kRunning] === 0, "stream body cannot be pipelined");
      let finished = false;
      const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header });
      const onData = /* @__PURE__ */ __name(function(chunk) {
        if (finished) {
          return;
        }
        try {
          if (!writer.write(chunk) && this.pause) {
            this.pause();
          }
        } catch (err) {
          util.destroy(this, err);
        }
      }, "onData");
      const onDrain = /* @__PURE__ */ __name(function() {
        if (finished) {
          return;
        }
        if (body.resume) {
          body.resume();
        }
      }, "onDrain");
      const onAbort = /* @__PURE__ */ __name(function() {
        onFinished(new RequestAbortedError());
      }, "onAbort");
      const onFinished = /* @__PURE__ */ __name(function(err) {
        if (finished) {
          return;
        }
        finished = true;
        assert(socket.destroyed || socket[kWriting] && client[kRunning] <= 1);
        socket.off("drain", onDrain).off("error", onFinished);
        body.removeListener("data", onData).removeListener("end", onFinished).removeListener("error", onFinished).removeListener("close", onAbort);
        if (!err) {
          try {
            writer.end();
          } catch (er) {
            err = er;
          }
        }
        writer.destroy(err);
        if (err && (err.code !== "UND_ERR_INFO" || err.message !== "reset")) {
          util.destroy(body, err);
        } else {
          util.destroy(body);
        }
      }, "onFinished");
      body.on("data", onData).on("end", onFinished).on("error", onFinished).on("close", onAbort);
      if (body.resume) {
        body.resume();
      }
      socket.on("drain", onDrain).on("error", onFinished);
    }
    __name(writeStream, "writeStream");
    async function writeBlob({ body, client, request, socket, contentLength, header, expectsPayload }) {
      assert(contentLength === body.size, "blob body must have content length");
      try {
        if (contentLength != null && contentLength !== body.size) {
          throw new RequestContentLengthMismatchError();
        }
        const buffer = Buffer.from(await body.arrayBuffer());
        socket.cork();
        socket.write(\`\${header}content-length: \${contentLength}\\r
\\r
\`, "latin1");
        socket.write(buffer);
        socket.uncork();
        request.onBodySent(buffer);
        request.onRequestSent();
        if (!expectsPayload) {
          socket[kReset] = true;
        }
        resume(client);
      } catch (err) {
        util.destroy(socket, err);
      }
    }
    __name(writeBlob, "writeBlob");
    async function writeIterable({ body, client, request, socket, contentLength, header, expectsPayload }) {
      assert(contentLength !== 0 || client[kRunning] === 0, "iterator body cannot be pipelined");
      let callback = null;
      function onDrain() {
        if (callback) {
          const cb = callback;
          callback = null;
          cb();
        }
      }
      __name(onDrain, "onDrain");
      const waitForDrain = /* @__PURE__ */ __name(() => new Promise((resolve, reject) => {
        assert(callback === null);
        if (socket[kError]) {
          reject(socket[kError]);
        } else {
          callback = resolve;
        }
      }), "waitForDrain");
      socket.on("close", onDrain).on("drain", onDrain);
      const writer = new AsyncWriter({ socket, request, contentLength, client, expectsPayload, header });
      try {
        for await (const chunk of body) {
          if (socket[kError]) {
            throw socket[kError];
          }
          if (!writer.write(chunk)) {
            await waitForDrain();
          }
        }
        writer.end();
      } catch (err) {
        writer.destroy(err);
      } finally {
        socket.off("close", onDrain).off("drain", onDrain);
      }
    }
    __name(writeIterable, "writeIterable");
    var _AsyncWriter = class _AsyncWriter {
      constructor({ socket, request, contentLength, client, expectsPayload, header }) {
        this.socket = socket;
        this.request = request;
        this.contentLength = contentLength;
        this.client = client;
        this.bytesWritten = 0;
        this.expectsPayload = expectsPayload;
        this.header = header;
        socket[kWriting] = true;
      }
      write(chunk) {
        const { socket, request, contentLength, client, bytesWritten, expectsPayload, header } = this;
        if (socket[kError]) {
          throw socket[kError];
        }
        if (socket.destroyed) {
          return false;
        }
        const len = Buffer.byteLength(chunk);
        if (!len) {
          return true;
        }
        if (contentLength !== null && bytesWritten + len > contentLength) {
          if (client[kStrictContentLength]) {
            throw new RequestContentLengthMismatchError();
          }
          define_process_default.emitWarning(new RequestContentLengthMismatchError());
        }
        socket.cork();
        if (bytesWritten === 0) {
          if (!expectsPayload) {
            socket[kReset] = true;
          }
          if (contentLength === null) {
            socket.write(\`\${header}transfer-encoding: chunked\\r
\`, "latin1");
          } else {
            socket.write(\`\${header}content-length: \${contentLength}\\r
\\r
\`, "latin1");
          }
        }
        if (contentLength === null) {
          socket.write(\`\\r
\${len.toString(16)}\\r
\`, "latin1");
        }
        this.bytesWritten += len;
        const ret = socket.write(chunk);
        socket.uncork();
        request.onBodySent(chunk);
        if (!ret) {
          if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
            if (socket[kParser].timeout.refresh) {
              socket[kParser].timeout.refresh();
            }
          }
        }
        return ret;
      }
      end() {
        const { socket, contentLength, client, bytesWritten, expectsPayload, header, request } = this;
        request.onRequestSent();
        socket[kWriting] = false;
        if (socket[kError]) {
          throw socket[kError];
        }
        if (socket.destroyed) {
          return;
        }
        if (bytesWritten === 0) {
          if (expectsPayload) {
            socket.write(\`\${header}content-length: 0\\r
\\r
\`, "latin1");
          } else {
            socket.write(\`\${header}\\r
\`, "latin1");
          }
        } else if (contentLength === null) {
          socket.write("\\r\\n0\\r\\n\\r\\n", "latin1");
        }
        if (contentLength !== null && bytesWritten !== contentLength) {
          if (client[kStrictContentLength]) {
            throw new RequestContentLengthMismatchError();
          } else {
            define_process_default.emitWarning(new RequestContentLengthMismatchError());
          }
        }
        if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
          if (socket[kParser].timeout.refresh) {
            socket[kParser].timeout.refresh();
          }
        }
        resume(client);
      }
      destroy(err) {
        const { socket, client } = this;
        socket[kWriting] = false;
        if (err) {
          assert(client[kRunning] <= 1, "pipeline should only contain this request");
          util.destroy(socket, err);
        }
      }
    };
    __name(_AsyncWriter, "AsyncWriter");
    var AsyncWriter = _AsyncWriter;
    function errorRequest(client, request, err) {
      try {
        request.onError(err);
        assert(request.aborted);
      } catch (err2) {
        client.emit("error", err2);
      }
    }
    __name(errorRequest, "errorRequest");
    module2.exports = Client;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/pool.js
var require_pool = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/pool.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var {
      PoolBase,
      kClients,
      kNeedDrain,
      kAddClient,
      kGetDispatcher
    } = require_pool_base();
    var Client = require_client();
    var {
      InvalidArgumentError: InvalidArgumentError2
    } = require_errors();
    var util = require_util();
    var { kUrl, kInterceptors } = require_symbols2();
    var buildConnector = require_connect();
    var kOptions = Symbol("options");
    var kConnections = Symbol("connections");
    var kFactory = Symbol("factory");
    function defaultFactory(origin, opts) {
      return new Client(origin, opts);
    }
    __name(defaultFactory, "defaultFactory");
    var _Pool = class _Pool extends PoolBase {
      constructor(origin, {
        connections,
        factory = defaultFactory,
        connect,
        connectTimeout,
        tls,
        maxCachedSessions,
        socketPath,
        autoSelectFamily,
        autoSelectFamilyAttemptTimeout,
        ...options
      } = {}) {
        super();
        if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
          throw new InvalidArgumentError2("invalid connections");
        }
        if (typeof factory !== "function") {
          throw new InvalidArgumentError2("factory must be a function.");
        }
        if (connect != null && typeof connect !== "function" && typeof connect !== "object") {
          throw new InvalidArgumentError2("connect must be a function or an object");
        }
        if (typeof connect !== "function") {
          connect = buildConnector({
            ...tls,
            maxCachedSessions,
            socketPath,
            timeout: connectTimeout == null ? 1e4 : connectTimeout,
            ...util.nodeHasAutoSelectFamily && autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
            ...connect
          });
        }
        this[kInterceptors] = options.interceptors && options.interceptors.Pool && Array.isArray(options.interceptors.Pool) ? options.interceptors.Pool : [];
        this[kConnections] = connections || null;
        this[kUrl] = util.parseOrigin(origin);
        this[kOptions] = { ...util.deepClone(options), connect };
        this[kOptions].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
        this[kFactory] = factory;
      }
      [kGetDispatcher]() {
        let dispatcher = this[kClients].find((dispatcher2) => !dispatcher2[kNeedDrain]);
        if (dispatcher) {
          return dispatcher;
        }
        if (!this[kConnections] || this[kClients].length < this[kConnections]) {
          dispatcher = this[kFactory](this[kUrl], this[kOptions]);
          this[kAddClient](dispatcher);
        }
        return dispatcher;
      }
    };
    __name(_Pool, "Pool");
    var Pool = _Pool;
    module2.exports = Pool;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/agent.js
var require_agent = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/agent.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { InvalidArgumentError: InvalidArgumentError2 } = require_errors();
    var { kClients, kRunning, kClose, kDestroy, kDispatch, kInterceptors } = require_symbols2();
    var DispatcherBase = require_dispatcher_base();
    var Pool = require_pool();
    var Client = require_client();
    var util = require_util();
    var createRedirectInterceptor = require_redirectInterceptor();
    var { WeakRef: WeakRef2, FinalizationRegistry } = require_dispatcher_weakref()();
    var kOnConnect = Symbol("onConnect");
    var kOnDisconnect = Symbol("onDisconnect");
    var kOnConnectionError = Symbol("onConnectionError");
    var kMaxRedirections = Symbol("maxRedirections");
    var kOnDrain = Symbol("onDrain");
    var kFactory = Symbol("factory");
    var kFinalizer = Symbol("finalizer");
    var kOptions = Symbol("options");
    function defaultFactory(origin, opts) {
      return opts && opts.connections === 1 ? new Client(origin, opts) : new Pool(origin, opts);
    }
    __name(defaultFactory, "defaultFactory");
    var _Agent = class _Agent extends DispatcherBase {
      constructor({ factory = defaultFactory, maxRedirections = 0, connect, ...options } = {}) {
        super();
        if (typeof factory !== "function") {
          throw new InvalidArgumentError2("factory must be a function.");
        }
        if (connect != null && typeof connect !== "function" && typeof connect !== "object") {
          throw new InvalidArgumentError2("connect must be a function or an object");
        }
        if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
          throw new InvalidArgumentError2("maxRedirections must be a positive number");
        }
        if (connect && typeof connect !== "function") {
          connect = { ...connect };
        }
        this[kInterceptors] = options.interceptors && options.interceptors.Agent && Array.isArray(options.interceptors.Agent) ? options.interceptors.Agent : [createRedirectInterceptor({ maxRedirections })];
        this[kOptions] = { ...util.deepClone(options), connect };
        this[kOptions].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
        this[kMaxRedirections] = maxRedirections;
        this[kFactory] = factory;
        this[kClients] = /* @__PURE__ */ new Map();
        this[kFinalizer] = new FinalizationRegistry(
          /* istanbul ignore next: gc is undeterministic */
          (key) => {
            const ref = this[kClients].get(key);
            if (ref !== void 0 && ref.deref() === void 0) {
              this[kClients].delete(key);
            }
          }
        );
        const agent = this;
        this[kOnDrain] = (origin, targets) => {
          agent.emit("drain", origin, [agent, ...targets]);
        };
        this[kOnConnect] = (origin, targets) => {
          agent.emit("connect", origin, [agent, ...targets]);
        };
        this[kOnDisconnect] = (origin, targets, err) => {
          agent.emit("disconnect", origin, [agent, ...targets], err);
        };
        this[kOnConnectionError] = (origin, targets, err) => {
          agent.emit("connectionError", origin, [agent, ...targets], err);
        };
      }
      get [kRunning]() {
        let ret = 0;
        for (const ref of this[kClients].values()) {
          const client = ref.deref();
          if (client) {
            ret += client[kRunning];
          }
        }
        return ret;
      }
      [kDispatch](opts, handler) {
        let key;
        if (opts.origin && (typeof opts.origin === "string" || opts.origin instanceof URL)) {
          key = String(opts.origin);
        } else {
          throw new InvalidArgumentError2("opts.origin must be a non-empty string or URL.");
        }
        const ref = this[kClients].get(key);
        let dispatcher = ref ? ref.deref() : null;
        if (!dispatcher) {
          dispatcher = this[kFactory](opts.origin, this[kOptions]).on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
          this[kClients].set(key, new WeakRef2(dispatcher));
          this[kFinalizer].register(dispatcher, key);
        }
        return dispatcher.dispatch(opts, handler);
      }
      async [kClose]() {
        const closePromises = [];
        for (const ref of this[kClients].values()) {
          const client = ref.deref();
          if (client) {
            closePromises.push(client.close());
          }
        }
        await Promise.all(closePromises);
      }
      async [kDestroy](err) {
        const destroyPromises = [];
        for (const ref of this[kClients].values()) {
          const client = ref.deref();
          if (client) {
            destroyPromises.push(client.destroy(err));
          }
        }
        await Promise.all(destroyPromises);
      }
    };
    __name(_Agent, "Agent");
    var Agent2 = _Agent;
    module2.exports = Agent2;
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/global.js
var require_global2 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/global.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var globalDispatcher2 = Symbol.for("undici.globalDispatcher.1");
    var { InvalidArgumentError: InvalidArgumentError2 } = require_errors();
    var Agent2 = require_agent();
    if (getGlobalDispatcher2() === void 0) {
      setGlobalDispatcher2(new Agent2());
    }
    function setGlobalDispatcher2(agent) {
      if (!agent || typeof agent.dispatch !== "function") {
        throw new InvalidArgumentError2("Argument agent must implement Agent");
      }
      Object.defineProperty(globalThis, globalDispatcher2, {
        value: agent,
        writable: true,
        enumerable: false,
        configurable: false
      });
    }
    __name(setGlobalDispatcher2, "setGlobalDispatcher");
    function getGlobalDispatcher2() {
      return globalThis[globalDispatcher2];
    }
    __name(getGlobalDispatcher2, "getGlobalDispatcher");
    module2.exports = {
      setGlobalDispatcher: setGlobalDispatcher2,
      getGlobalDispatcher: getGlobalDispatcher2
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/index.js
var require_fetch = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/fetch/index.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var {
      Response: Response3,
      makeNetworkError,
      makeAppropriateNetworkError,
      filterResponse,
      makeResponse
    } = require_response();
    var { Headers: Headers3 } = require_headers();
    var { Request: Request2, makeRequest } = require_request();
    var zlib = require("zlib");
    var {
      bytesMatch,
      makePolicyContainer,
      clonePolicyContainer,
      requestBadPort,
      TAOCheck,
      appendRequestOriginHeader,
      responseLocationURL,
      requestCurrentURL,
      setRequestReferrerPolicyOnRedirect,
      tryUpgradeRequestToAPotentiallyTrustworthyURL,
      createOpaqueTimingInfo,
      appendFetchMetadata,
      corsCheck,
      crossOriginResourcePolicyCheck,
      determineRequestsReferrer,
      coarsenedSharedCurrentTime,
      createDeferredPromise,
      isBlobLike,
      sameOrigin,
      isCancelled,
      isAborted,
      isErrorLike,
      fullyReadBody,
      readableStreamClose,
      isomorphicEncode,
      urlIsLocal,
      urlIsHttpHttpsScheme,
      urlHasHttpsScheme
    } = require_util2();
    var { kState, kHeaders: kHeaders2, kGuard: kGuard2, kRealm } = require_symbols();
    var assert = require("assert");
    var { safelyExtractBody } = require_body();
    var {
      redirectStatus,
      nullBodyStatus,
      safeMethods,
      requestBodyHeader,
      subresource,
      DOMException
    } = require_constants();
    var { kHeadersList } = require_symbols2();
    var EE = require("events");
    var { Readable, pipeline } = require("stream");
    var { addAbortListener, isErrored, isReadable, nodeMajor, nodeMinor } = require_util();
    var { dataURLProcessor, serializeAMimeType } = require_dataURL();
    var { TransformStream } = require("./streams");
    var { getGlobalDispatcher: getGlobalDispatcher2 } = require_global2();
    var { webidl } = require_webidl();
    var { STATUS_CODES } = require("http");
    var resolveObjectURL;
    var ReadableStream = globalThis.ReadableStream;
    var _Fetch = class _Fetch extends EE {
      constructor(dispatcher) {
        super();
        this.dispatcher = dispatcher;
        this.connection = null;
        this.dump = false;
        this.state = "ongoing";
        this.setMaxListeners(21);
      }
      terminate(reason) {
        if (this.state !== "ongoing") {
          return;
        }
        this.state = "terminated";
        this.connection?.destroy(reason);
        this.emit("terminated", reason);
      }
      // https://fetch.spec.whatwg.org/#fetch-controller-abort
      abort(error) {
        if (this.state !== "ongoing") {
          return;
        }
        this.state = "aborted";
        if (!error) {
          error = new DOMException("The operation was aborted.", "AbortError");
        }
        this.serializedAbortReason = error;
        this.connection?.destroy(error);
        this.emit("terminated", error);
      }
    };
    __name(_Fetch, "Fetch");
    var Fetch = _Fetch;
    async function fetch2(input, init = {}) {
      webidl.argumentLengthCheck(arguments, 1, { header: "globalThis.fetch" });
      const p = createDeferredPromise();
      let requestObject;
      try {
        requestObject = new Request2(input, init);
      } catch (e) {
        p.reject(e);
        return p.promise;
      }
      const request = requestObject[kState];
      if (requestObject.signal.aborted) {
        abortFetch(p, request, null, requestObject.signal.reason);
        return p.promise;
      }
      const globalObject = request.client.globalObject;
      if (globalObject?.constructor?.name === "ServiceWorkerGlobalScope") {
        request.serviceWorkers = "none";
      }
      let responseObject = null;
      const relevantRealm = null;
      let locallyAborted = false;
      let controller = null;
      addAbortListener(
        requestObject.signal,
        () => {
          locallyAborted = true;
          assert(controller != null);
          controller.abort(requestObject.signal.reason);
          abortFetch(p, request, responseObject, requestObject.signal.reason);
        }
      );
      const handleFetchDone = /* @__PURE__ */ __name((response) => finalizeAndReportTiming(response, "fetch"), "handleFetchDone");
      const processResponse = /* @__PURE__ */ __name((response) => {
        if (locallyAborted) {
          return;
        }
        if (response.aborted) {
          abortFetch(p, request, responseObject, controller.serializedAbortReason);
          return;
        }
        if (response.type === "error") {
          p.reject(
            Object.assign(new TypeError("fetch failed"), { cause: response.error })
          );
          return;
        }
        responseObject = new Response3();
        responseObject[kState] = response;
        responseObject[kRealm] = relevantRealm;
        responseObject[kHeaders2][kHeadersList] = response.headersList;
        responseObject[kHeaders2][kGuard2] = "immutable";
        responseObject[kHeaders2][kRealm] = relevantRealm;
        p.resolve(responseObject);
      }, "processResponse");
      controller = fetching({
        request,
        processResponseEndOfBody: handleFetchDone,
        processResponse,
        dispatcher: init.dispatcher ?? getGlobalDispatcher2()
        // undici
      });
      return p.promise;
    }
    __name(fetch2, "fetch");
    function finalizeAndReportTiming(response, initiatorType = "other") {
      if (response.type === "error" && response.aborted) {
        return;
      }
      if (!response.urlList?.length) {
        return;
      }
      const originalURL = response.urlList[0];
      let timingInfo = response.timingInfo;
      let cacheState = response.cacheState;
      if (!urlIsHttpHttpsScheme(originalURL)) {
        return;
      }
      if (timingInfo === null) {
        return;
      }
      if (!timingInfo.timingAllowPassed) {
        timingInfo = createOpaqueTimingInfo({
          startTime: timingInfo.startTime
        });
        cacheState = "";
      }
      timingInfo.endTime = coarsenedSharedCurrentTime();
      response.timingInfo = timingInfo;
      markResourceTiming(
        timingInfo,
        originalURL,
        initiatorType,
        globalThis,
        cacheState
      );
    }
    __name(finalizeAndReportTiming, "finalizeAndReportTiming");
    function markResourceTiming(timingInfo, originalURL, initiatorType, globalThis2, cacheState) {
      if (nodeMajor > 18 || nodeMajor === 18 && nodeMinor >= 2) {
        performance.markResourceTiming(timingInfo, originalURL.href, initiatorType, globalThis2, cacheState);
      }
    }
    __name(markResourceTiming, "markResourceTiming");
    function abortFetch(p, request, responseObject, error) {
      if (!error) {
        error = new DOMException("The operation was aborted.", "AbortError");
      }
      p.reject(error);
      if (request.body != null && isReadable(request.body?.stream)) {
        request.body.stream.cancel(error).catch((err) => {
          if (err.code === "ERR_INVALID_STATE") {
            return;
          }
          throw err;
        });
      }
      if (responseObject == null) {
        return;
      }
      const response = responseObject[kState];
      if (response.body != null && isReadable(response.body?.stream)) {
        response.body.stream.cancel(error).catch((err) => {
          if (err.code === "ERR_INVALID_STATE") {
            return;
          }
          throw err;
        });
      }
    }
    __name(abortFetch, "abortFetch");
    function fetching({
      request,
      processRequestBodyChunkLength,
      processRequestEndOfBody,
      processResponse,
      processResponseEndOfBody,
      processResponseConsumeBody,
      useParallelQueue = false,
      dispatcher
      // undici
    }) {
      let taskDestination = null;
      let crossOriginIsolatedCapability = false;
      if (request.client != null) {
        taskDestination = request.client.globalObject;
        crossOriginIsolatedCapability = request.client.crossOriginIsolatedCapability;
      }
      const currenTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
      const timingInfo = createOpaqueTimingInfo({
        startTime: currenTime
      });
      const fetchParams = {
        controller: new Fetch(dispatcher),
        request,
        timingInfo,
        processRequestBodyChunkLength,
        processRequestEndOfBody,
        processResponse,
        processResponseConsumeBody,
        processResponseEndOfBody,
        taskDestination,
        crossOriginIsolatedCapability
      };
      assert(!request.body || request.body.stream);
      if (request.window === "client") {
        request.window = request.client?.globalObject?.constructor?.name === "Window" ? request.client : "no-window";
      }
      if (request.origin === "client") {
        request.origin = request.client?.origin;
      }
      if (request.policyContainer === "client") {
        if (request.client != null) {
          request.policyContainer = clonePolicyContainer(
            request.client.policyContainer
          );
        } else {
          request.policyContainer = makePolicyContainer();
        }
      }
      if (!request.headersList.contains("accept")) {
        const value = "*/*";
        request.headersList.append("accept", value);
      }
      if (!request.headersList.contains("accept-language")) {
        request.headersList.append("accept-language", "*");
      }
      if (request.priority === null) {
      }
      if (subresource.includes(request.destination)) {
      }
      mainFetch(fetchParams).catch((err) => {
        fetchParams.controller.terminate(err);
      });
      return fetchParams.controller;
    }
    __name(fetching, "fetching");
    async function mainFetch(fetchParams, recursive = false) {
      const request = fetchParams.request;
      let response = null;
      if (request.localURLsOnly && !urlIsLocal(requestCurrentURL(request))) {
        response = makeNetworkError("local URLs only");
      }
      tryUpgradeRequestToAPotentiallyTrustworthyURL(request);
      if (requestBadPort(request) === "blocked") {
        response = makeNetworkError("bad port");
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = request.policyContainer.referrerPolicy;
      }
      if (request.referrer !== "no-referrer") {
        request.referrer = determineRequestsReferrer(request);
      }
      if (response === null) {
        response = await (async () => {
          const currentURL = requestCurrentURL(request);
          if (
            // - request\u2019s current URL\u2019s origin is same origin with request\u2019s origin,
            //   and request\u2019s response tainting is "basic"
            sameOrigin(currentURL, request.url) && request.responseTainting === "basic" || // request\u2019s current URL\u2019s scheme is "data"
            currentURL.protocol === "data:" || // - request\u2019s mode is "navigate" or "websocket"
            (request.mode === "navigate" || request.mode === "websocket")
          ) {
            request.responseTainting = "basic";
            return await schemeFetch(fetchParams);
          }
          if (request.mode === "same-origin") {
            return makeNetworkError('request mode cannot be "same-origin"');
          }
          if (request.mode === "no-cors") {
            if (request.redirect !== "follow") {
              return makeNetworkError(
                'redirect mode cannot be "follow" for "no-cors" request'
              );
            }
            request.responseTainting = "opaque";
            return await schemeFetch(fetchParams);
          }
          if (!urlIsHttpHttpsScheme(requestCurrentURL(request))) {
            return makeNetworkError("URL scheme must be a HTTP(S) scheme");
          }
          request.responseTainting = "cors";
          return await httpFetch(fetchParams);
        })();
      }
      if (recursive) {
        return response;
      }
      if (response.status !== 0 && !response.internalResponse) {
        if (request.responseTainting === "cors") {
        }
        if (request.responseTainting === "basic") {
          response = filterResponse(response, "basic");
        } else if (request.responseTainting === "cors") {
          response = filterResponse(response, "cors");
        } else if (request.responseTainting === "opaque") {
          response = filterResponse(response, "opaque");
        } else {
          assert(false);
        }
      }
      let internalResponse = response.status === 0 ? response : response.internalResponse;
      if (internalResponse.urlList.length === 0) {
        internalResponse.urlList.push(...request.urlList);
      }
      if (!request.timingAllowFailed) {
        response.timingAllowPassed = true;
      }
      if (response.type === "opaque" && internalResponse.status === 206 && internalResponse.rangeRequested && !request.headers.contains("range")) {
        response = internalResponse = makeNetworkError();
      }
      if (response.status !== 0 && (request.method === "HEAD" || request.method === "CONNECT" || nullBodyStatus.includes(internalResponse.status))) {
        internalResponse.body = null;
        fetchParams.controller.dump = true;
      }
      if (request.integrity) {
        const processBodyError = /* @__PURE__ */ __name((reason) => fetchFinale(fetchParams, makeNetworkError(reason)), "processBodyError");
        if (request.responseTainting === "opaque" || response.body == null) {
          processBodyError(response.error);
          return;
        }
        const processBody = /* @__PURE__ */ __name((bytes) => {
          if (!bytesMatch(bytes, request.integrity)) {
            processBodyError("integrity mismatch");
            return;
          }
          response.body = safelyExtractBody(bytes)[0];
          fetchFinale(fetchParams, response);
        }, "processBody");
        await fullyReadBody(response.body, processBody, processBodyError);
      } else {
        fetchFinale(fetchParams, response);
      }
    }
    __name(mainFetch, "mainFetch");
    async function schemeFetch(fetchParams) {
      if (isCancelled(fetchParams) && fetchParams.request.redirectCount === 0) {
        return makeAppropriateNetworkError(fetchParams);
      }
      const { request } = fetchParams;
      const { protocol: scheme } = requestCurrentURL(request);
      switch (scheme) {
        case "about:": {
          return makeNetworkError("about scheme is not supported");
        }
        case "blob:": {
          if (!resolveObjectURL) {
            resolveObjectURL = require("buffer").resolveObjectURL;
          }
          const blobURLEntry = requestCurrentURL(request);
          if (blobURLEntry.search.length !== 0) {
            return makeNetworkError("NetworkError when attempting to fetch resource.");
          }
          const blobURLEntryObject = resolveObjectURL(blobURLEntry.toString());
          if (request.method !== "GET" || !isBlobLike(blobURLEntryObject)) {
            return makeNetworkError("invalid method");
          }
          const bodyWithType = safelyExtractBody(blobURLEntryObject);
          const body = bodyWithType[0];
          const length = isomorphicEncode(\`\${body.length}\`);
          const type = bodyWithType[1] ?? "";
          const response = makeResponse({
            statusText: "OK",
            headersList: [
              ["content-length", { name: "Content-Length", value: length }],
              ["content-type", { name: "Content-Type", value: type }]
            ]
          });
          response.body = body;
          return response;
        }
        case "data:": {
          const currentURL = requestCurrentURL(request);
          const dataURLStruct = dataURLProcessor(currentURL);
          if (dataURLStruct === "failure") {
            return makeNetworkError("failed to fetch the data URL");
          }
          const mimeType = serializeAMimeType(dataURLStruct.mimeType);
          return makeResponse({
            statusText: "OK",
            headersList: [
              ["content-type", { name: "Content-Type", value: mimeType }]
            ],
            body: safelyExtractBody(dataURLStruct.body)[0]
          });
        }
        case "file:": {
          return makeNetworkError("not implemented... yet...");
        }
        case "http:":
        case "https:": {
          return await httpFetch(fetchParams).catch((err) => makeNetworkError(err));
        }
        default: {
          return makeNetworkError("unknown scheme");
        }
      }
    }
    __name(schemeFetch, "schemeFetch");
    function finalizeResponse(fetchParams, response) {
      fetchParams.request.done = true;
      if (fetchParams.processResponseDone != null) {
        queueMicrotask(() => fetchParams.processResponseDone(response));
      }
    }
    __name(finalizeResponse, "finalizeResponse");
    async function fetchFinale(fetchParams, response) {
      if (response.type === "error") {
        response.urlList = [fetchParams.request.urlList[0]];
        response.timingInfo = createOpaqueTimingInfo({
          startTime: fetchParams.timingInfo.startTime
        });
      }
      const processResponseEndOfBody = /* @__PURE__ */ __name(() => {
        fetchParams.request.done = true;
        if (fetchParams.processResponseEndOfBody != null) {
          queueMicrotask(() => fetchParams.processResponseEndOfBody(response));
        }
      }, "processResponseEndOfBody");
      if (fetchParams.processResponse != null) {
        queueMicrotask(() => fetchParams.processResponse(response));
      }
      if (response.body == null) {
        processResponseEndOfBody();
      } else {
        const identityTransformAlgorithm = /* @__PURE__ */ __name((chunk, controller) => {
          controller.enqueue(chunk);
        }, "identityTransformAlgorithm");
        const transformStream = new TransformStream({
          start() {
          },
          transform: identityTransformAlgorithm,
          flush: processResponseEndOfBody
        }, {
          size() {
            return 1;
          }
        }, {
          size() {
            return 1;
          }
        });
        response.body = { stream: response.body.stream.pipeThrough(transformStream) };
      }
      if (fetchParams.processResponseConsumeBody != null) {
        const processBody = /* @__PURE__ */ __name((nullOrBytes) => fetchParams.processResponseConsumeBody(response, nullOrBytes), "processBody");
        const processBodyError = /* @__PURE__ */ __name((failure) => fetchParams.processResponseConsumeBody(response, failure), "processBodyError");
        if (response.body == null) {
          queueMicrotask(() => processBody(null));
        } else {
          await fullyReadBody(response.body, processBody, processBodyError);
        }
      }
    }
    __name(fetchFinale, "fetchFinale");
    async function httpFetch(fetchParams) {
      const request = fetchParams.request;
      let response = null;
      let actualResponse = null;
      const timingInfo = fetchParams.timingInfo;
      if (request.serviceWorkers === "all") {
      }
      if (response === null) {
        if (request.redirect === "follow") {
          request.serviceWorkers = "none";
        }
        actualResponse = response = await httpNetworkOrCacheFetch(fetchParams);
        if (request.responseTainting === "cors" && corsCheck(request, response) === "failure") {
          return makeNetworkError("cors failure");
        }
        if (TAOCheck(request, response) === "failure") {
          request.timingAllowFailed = true;
        }
      }
      if ((request.responseTainting === "opaque" || response.type === "opaque") && crossOriginResourcePolicyCheck(
        request.origin,
        request.client,
        request.destination,
        actualResponse
      ) === "blocked") {
        return makeNetworkError("blocked");
      }
      if (redirectStatus.includes(actualResponse.status)) {
        if (request.redirect !== "manual") {
          fetchParams.controller.connection.destroy();
        }
        if (request.redirect === "error") {
          response = makeNetworkError("unexpected redirect");
        } else if (request.redirect === "manual") {
          response = actualResponse;
        } else if (request.redirect === "follow") {
          response = await httpRedirectFetch(fetchParams, response);
        } else {
          assert(false);
        }
      }
      response.timingInfo = timingInfo;
      return response;
    }
    __name(httpFetch, "httpFetch");
    async function httpRedirectFetch(fetchParams, response) {
      const request = fetchParams.request;
      const actualResponse = response.internalResponse ? response.internalResponse : response;
      let locationURL;
      try {
        locationURL = responseLocationURL(
          actualResponse,
          requestCurrentURL(request).hash
        );
        if (locationURL == null) {
          return response;
        }
      } catch (err) {
        return makeNetworkError(err);
      }
      if (!urlIsHttpHttpsScheme(locationURL)) {
        return makeNetworkError("URL scheme must be a HTTP(S) scheme");
      }
      if (request.redirectCount === 20) {
        return makeNetworkError("redirect count exceeded");
      }
      request.redirectCount += 1;
      if (request.mode === "cors" && (locationURL.username || locationURL.password) && !sameOrigin(request, locationURL)) {
        return makeNetworkError('cross origin not allowed for request mode "cors"');
      }
      if (request.responseTainting === "cors" && (locationURL.username || locationURL.password)) {
        return makeNetworkError(
          'URL cannot contain credentials for request mode "cors"'
        );
      }
      if (actualResponse.status !== 303 && request.body != null && request.body.source == null) {
        return makeNetworkError();
      }
      if ([301, 302].includes(actualResponse.status) && request.method === "POST" || actualResponse.status === 303 && !["GET", "HEAD"].includes(request.method)) {
        request.method = "GET";
        request.body = null;
        for (const headerName of requestBodyHeader) {
          request.headersList.delete(headerName);
        }
      }
      if (!sameOrigin(requestCurrentURL(request), locationURL)) {
        request.headersList.delete("authorization");
      }
      if (request.body != null) {
        assert(request.body.source != null);
        request.body = safelyExtractBody(request.body.source)[0];
      }
      const timingInfo = fetchParams.timingInfo;
      timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
      if (timingInfo.redirectStartTime === 0) {
        timingInfo.redirectStartTime = timingInfo.startTime;
      }
      request.urlList.push(locationURL);
      setRequestReferrerPolicyOnRedirect(request, actualResponse);
      return mainFetch(fetchParams, true);
    }
    __name(httpRedirectFetch, "httpRedirectFetch");
    async function httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch = false, isNewConnectionFetch = false) {
      const request = fetchParams.request;
      let httpFetchParams = null;
      let httpRequest = null;
      let response = null;
      const httpCache = null;
      const revalidatingFlag = false;
      if (request.window === "no-window" && request.redirect === "error") {
        httpFetchParams = fetchParams;
        httpRequest = request;
      } else {
        httpRequest = makeRequest(request);
        httpFetchParams = { ...fetchParams };
        httpFetchParams.request = httpRequest;
      }
      const includeCredentials = request.credentials === "include" || request.credentials === "same-origin" && request.responseTainting === "basic";
      const contentLength = httpRequest.body ? httpRequest.body.length : null;
      let contentLengthHeaderValue = null;
      if (httpRequest.body == null && ["POST", "PUT"].includes(httpRequest.method)) {
        contentLengthHeaderValue = "0";
      }
      if (contentLength != null) {
        contentLengthHeaderValue = isomorphicEncode(\`\${contentLength}\`);
      }
      if (contentLengthHeaderValue != null) {
        httpRequest.headersList.append("content-length", contentLengthHeaderValue);
      }
      if (contentLength != null && httpRequest.keepalive) {
      }
      if (httpRequest.referrer instanceof URL) {
        httpRequest.headersList.append("referer", isomorphicEncode(httpRequest.referrer.href));
      }
      appendRequestOriginHeader(httpRequest);
      appendFetchMetadata(httpRequest);
      if (!httpRequest.headersList.contains("user-agent")) {
        httpRequest.headersList.append("user-agent", "undici");
      }
      if (httpRequest.cache === "default" && (httpRequest.headersList.contains("if-modified-since") || httpRequest.headersList.contains("if-none-match") || httpRequest.headersList.contains("if-unmodified-since") || httpRequest.headersList.contains("if-match") || httpRequest.headersList.contains("if-range"))) {
        httpRequest.cache = "no-store";
      }
      if (httpRequest.cache === "no-cache" && !httpRequest.preventNoCacheCacheControlHeaderModification && !httpRequest.headersList.contains("cache-control")) {
        httpRequest.headersList.append("cache-control", "max-age=0");
      }
      if (httpRequest.cache === "no-store" || httpRequest.cache === "reload") {
        if (!httpRequest.headersList.contains("pragma")) {
          httpRequest.headersList.append("pragma", "no-cache");
        }
        if (!httpRequest.headersList.contains("cache-control")) {
          httpRequest.headersList.append("cache-control", "no-cache");
        }
      }
      if (httpRequest.headersList.contains("range")) {
        httpRequest.headersList.append("accept-encoding", "identity");
      }
      if (!httpRequest.headersList.contains("accept-encoding")) {
        if (urlHasHttpsScheme(requestCurrentURL(httpRequest))) {
          httpRequest.headersList.append("accept-encoding", "br, gzip, deflate");
        } else {
          httpRequest.headersList.append("accept-encoding", "gzip, deflate");
        }
      }
      if (includeCredentials) {
      }
      if (httpCache == null) {
        httpRequest.cache = "no-store";
      }
      if (httpRequest.mode !== "no-store" && httpRequest.mode !== "reload") {
      }
      if (response == null) {
        if (httpRequest.mode === "only-if-cached") {
          return makeNetworkError("only if cached");
        }
        const forwardResponse = await httpNetworkFetch(
          httpFetchParams,
          includeCredentials,
          isNewConnectionFetch
        );
        if (!safeMethods.includes(httpRequest.method) && forwardResponse.status >= 200 && forwardResponse.status <= 399) {
        }
        if (revalidatingFlag && forwardResponse.status === 304) {
        }
        if (response == null) {
          response = forwardResponse;
        }
      }
      response.urlList = [...httpRequest.urlList];
      if (httpRequest.headersList.contains("range")) {
        response.rangeRequested = true;
      }
      response.requestIncludesCredentials = includeCredentials;
      if (response.status === 407) {
        if (request.window === "no-window") {
          return makeNetworkError();
        }
        if (isCancelled(fetchParams)) {
          return makeAppropriateNetworkError(fetchParams);
        }
        return makeNetworkError("proxy authentication required");
      }
      if (
        // response\u2019s status is 421
        response.status === 421 && // isNewConnectionFetch is false
        !isNewConnectionFetch && // request\u2019s body is null, or request\u2019s body is non-null and request\u2019s body\u2019s source is non-null
        (request.body == null || request.body.source != null)
      ) {
        if (isCancelled(fetchParams)) {
          return makeAppropriateNetworkError(fetchParams);
        }
        fetchParams.controller.connection.destroy();
        response = await httpNetworkOrCacheFetch(
          fetchParams,
          isAuthenticationFetch,
          true
        );
      }
      if (isAuthenticationFetch) {
      }
      return response;
    }
    __name(httpNetworkOrCacheFetch, "httpNetworkOrCacheFetch");
    async function httpNetworkFetch(fetchParams, includeCredentials = false, forceNewConnection = false) {
      assert(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);
      fetchParams.controller.connection = {
        abort: null,
        destroyed: false,
        destroy(err) {
          if (!this.destroyed) {
            this.destroyed = true;
            this.abort?.(err ?? new DOMException("The operation was aborted.", "AbortError"));
          }
        }
      };
      const request = fetchParams.request;
      let response = null;
      const timingInfo = fetchParams.timingInfo;
      const httpCache = null;
      if (httpCache == null) {
        request.cache = "no-store";
      }
      const newConnection = forceNewConnection ? "yes" : "no";
      if (request.mode === "websocket") {
      } else {
      }
      let requestBody = null;
      if (request.body == null && fetchParams.processRequestEndOfBody) {
        queueMicrotask(() => fetchParams.processRequestEndOfBody());
      } else if (request.body != null) {
        const processBodyChunk = /* @__PURE__ */ __name(async function* (bytes) {
          if (isCancelled(fetchParams)) {
            return;
          }
          yield bytes;
          fetchParams.processRequestBodyChunkLength?.(bytes.byteLength);
        }, "processBodyChunk");
        const processEndOfBody = /* @__PURE__ */ __name(() => {
          if (isCancelled(fetchParams)) {
            return;
          }
          if (fetchParams.processRequestEndOfBody) {
            fetchParams.processRequestEndOfBody();
          }
        }, "processEndOfBody");
        const processBodyError = /* @__PURE__ */ __name((e) => {
          if (isCancelled(fetchParams)) {
            return;
          }
          if (e.name === "AbortError") {
            fetchParams.controller.abort();
          } else {
            fetchParams.controller.terminate(e);
          }
        }, "processBodyError");
        requestBody = async function* () {
          try {
            for await (const bytes of request.body.stream) {
              yield* processBodyChunk(bytes);
            }
            processEndOfBody();
          } catch (err) {
            processBodyError(err);
          }
        }();
      }
      try {
        const { body, status, statusText, headersList, socket } = await dispatch({ body: requestBody });
        if (socket) {
          response = makeResponse({ status, statusText, headersList, socket });
        } else {
          const iterator = body[Symbol.asyncIterator]();
          fetchParams.controller.next = () => iterator.next();
          response = makeResponse({ status, statusText, headersList });
        }
      } catch (err) {
        if (err.name === "AbortError") {
          fetchParams.controller.connection.destroy();
          return makeAppropriateNetworkError(fetchParams);
        }
        return makeNetworkError(err);
      }
      const pullAlgorithm = /* @__PURE__ */ __name(() => {
        fetchParams.controller.resume();
      }, "pullAlgorithm");
      const cancelAlgorithm = /* @__PURE__ */ __name((reason) => {
        fetchParams.controller.abort(reason);
      }, "cancelAlgorithm");
      if (!ReadableStream) {
        ReadableStream = require("./streams").ReadableStream;
      }
      const stream = new ReadableStream(
        {
          async start(controller) {
            fetchParams.controller.controller = controller;
          },
          async pull(controller) {
            await pullAlgorithm(controller);
          },
          async cancel(reason) {
            await cancelAlgorithm(reason);
          }
        },
        {
          highWaterMark: 0,
          size() {
            return 1;
          }
        }
      );
      response.body = { stream };
      fetchParams.controller.on("terminated", onAborted);
      fetchParams.controller.resume = async () => {
        while (true) {
          let bytes;
          let isFailure;
          try {
            const { done, value } = await fetchParams.controller.next();
            if (isAborted(fetchParams)) {
              break;
            }
            bytes = done ? void 0 : value;
          } catch (err) {
            if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
              bytes = void 0;
            } else {
              bytes = err;
              isFailure = true;
            }
          }
          if (bytes === void 0) {
            readableStreamClose(fetchParams.controller.controller);
            finalizeResponse(fetchParams, response);
            return;
          }
          timingInfo.decodedBodySize += bytes?.byteLength ?? 0;
          if (isFailure) {
            fetchParams.controller.terminate(bytes);
            return;
          }
          fetchParams.controller.controller.enqueue(new Uint8Array(bytes));
          if (isErrored(stream)) {
            fetchParams.controller.terminate();
            return;
          }
          if (!fetchParams.controller.controller.desiredSize) {
            return;
          }
        }
      };
      function onAborted(reason) {
        if (isAborted(fetchParams)) {
          response.aborted = true;
          if (isReadable(stream)) {
            fetchParams.controller.controller.error(
              fetchParams.controller.serializedAbortReason
            );
          }
        } else {
          if (isReadable(stream)) {
            fetchParams.controller.controller.error(new TypeError("terminated", {
              cause: isErrorLike(reason) ? reason : void 0
            }));
          }
        }
        fetchParams.controller.connection.destroy();
      }
      __name(onAborted, "onAborted");
      return response;
      async function dispatch({ body }) {
        const url = requestCurrentURL(request);
        const agent = fetchParams.controller.dispatcher;
        return new Promise((resolve, reject) => agent.dispatch(
          {
            path: url.pathname + url.search,
            origin: url.origin,
            method: request.method,
            body: fetchParams.controller.dispatcher.isMockActive ? request.body && request.body.source : body,
            headers: request.headersList.entries,
            maxRedirections: 0,
            upgrade: request.mode === "websocket" ? "websocket" : void 0
          },
          {
            body: null,
            abort: null,
            onConnect(abort) {
              const { connection } = fetchParams.controller;
              if (connection.destroyed) {
                abort(new DOMException("The operation was aborted.", "AbortError"));
              } else {
                fetchParams.controller.on("terminated", abort);
                this.abort = connection.abort = abort;
              }
            },
            onHeaders(status, headersList, resume, statusText) {
              if (status < 200) {
                return;
              }
              let codings = [];
              let location = "";
              const headers = new Headers3();
              for (let n = 0; n < headersList.length; n += 2) {
                const key = headersList[n + 0].toString("latin1");
                const val = headersList[n + 1].toString("latin1");
                if (key.toLowerCase() === "content-encoding") {
                  codings = val.toLowerCase().split(",").map((x) => x.trim()).reverse();
                } else if (key.toLowerCase() === "location") {
                  location = val;
                }
                headers.append(key, val);
              }
              this.body = new Readable({ read: resume });
              const decoders = [];
              const willFollow = request.redirect === "follow" && location && redirectStatus.includes(status);
              if (request.method !== "HEAD" && request.method !== "CONNECT" && !nullBodyStatus.includes(status) && !willFollow) {
                for (const coding of codings) {
                  if (coding === "x-gzip" || coding === "gzip") {
                    decoders.push(zlib.createGunzip({
                      // Be less strict when decoding compressed responses, since sometimes
                      // servers send slightly invalid responses that are still accepted
                      // by common browsers.
                      // Always using Z_SYNC_FLUSH is what cURL does.
                      flush: zlib.constants.Z_SYNC_FLUSH,
                      finishFlush: zlib.constants.Z_SYNC_FLUSH
                    }));
                  } else if (coding === "deflate") {
                    decoders.push(zlib.createInflate());
                  } else if (coding === "br") {
                    decoders.push(zlib.createBrotliDecompress());
                  } else {
                    decoders.length = 0;
                    break;
                  }
                }
              }
              resolve({
                status,
                statusText,
                headersList: headers[kHeadersList],
                body: decoders.length ? pipeline(this.body, ...decoders, () => {
                }) : this.body.on("error", () => {
                })
              });
              return true;
            },
            onData(chunk) {
              if (fetchParams.controller.dump) {
                return;
              }
              const bytes = chunk;
              timingInfo.encodedBodySize += bytes.byteLength;
              return this.body.push(bytes);
            },
            onComplete() {
              if (this.abort) {
                fetchParams.controller.off("terminated", this.abort);
              }
              fetchParams.controller.ended = true;
              this.body.push(null);
            },
            onError(error) {
              if (this.abort) {
                fetchParams.controller.off("terminated", this.abort);
              }
              this.body?.destroy(error);
              fetchParams.controller.terminate(error);
              reject(error);
            },
            onUpgrade(status, headersList, socket) {
              if (status !== 101) {
                return;
              }
              const headers = new Headers3();
              for (let n = 0; n < headersList.length; n += 2) {
                const key = headersList[n + 0].toString("latin1");
                const val = headersList[n + 1].toString("latin1");
                headers.append(key, val);
              }
              resolve({
                status,
                statusText: STATUS_CODES[status],
                headersList: headers[kHeadersList],
                socket
              });
              return true;
            }
          }
        ));
      }
      __name(dispatch, "dispatch");
    }
    __name(httpNetworkFetch, "httpNetworkFetch");
    module2.exports = {
      fetch: fetch2,
      Fetch,
      fetching,
      finalizeAndReportTiming
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/constants.js
var require_constants3 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/constants.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var uid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    var staticPropertyDescriptors = {
      enumerable: true,
      writable: false,
      configurable: false
    };
    var states = {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3
    };
    var opcodes = {
      CONTINUATION: 0,
      TEXT: 1,
      BINARY: 2,
      CLOSE: 8,
      PING: 9,
      PONG: 10
    };
    var maxUnsigned16Bit = 2 ** 16 - 1;
    var parserStates = {
      INFO: 0,
      PAYLOADLENGTH_16: 2,
      PAYLOADLENGTH_64: 3,
      READ_DATA: 4
    };
    var emptyBuffer = Buffer.allocUnsafe(0);
    module2.exports = {
      uid,
      staticPropertyDescriptors,
      states,
      opcodes,
      maxUnsigned16Bit,
      parserStates,
      emptyBuffer
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/symbols.js
var require_symbols3 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/symbols.js"(exports2, module2) {
    "use strict";
    init_define_process();
    module2.exports = {
      kWebSocketURL: Symbol("url"),
      kReadyState: Symbol("ready state"),
      kController: Symbol("controller"),
      kResponse: Symbol("response"),
      kBinaryType: Symbol("binary type"),
      kSentClose: Symbol("sent close"),
      kReceivedClose: Symbol("received close"),
      kByteParser: Symbol("byte parser")
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/events.js
var require_events = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/events.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { webidl } = require_webidl();
    var { kEnumerableProperty } = require_util();
    var { MessagePort } = require("worker_threads");
    var _eventInit;
    var _MessageEvent = class _MessageEvent extends Event {
      constructor(type, eventInitDict = {}) {
        webidl.argumentLengthCheck(arguments, 1, { header: "MessageEvent constructor" });
        type = webidl.converters.DOMString(type);
        eventInitDict = webidl.converters.MessageEventInit(eventInitDict);
        super(type, eventInitDict);
        __privateAdd(this, _eventInit, void 0);
        __privateSet(this, _eventInit, eventInitDict);
      }
      get data() {
        webidl.brandCheck(this, _MessageEvent);
        return __privateGet(this, _eventInit).data;
      }
      get origin() {
        webidl.brandCheck(this, _MessageEvent);
        return __privateGet(this, _eventInit).origin;
      }
      get lastEventId() {
        webidl.brandCheck(this, _MessageEvent);
        return __privateGet(this, _eventInit).lastEventId;
      }
      get source() {
        webidl.brandCheck(this, _MessageEvent);
        return __privateGet(this, _eventInit).source;
      }
      get ports() {
        webidl.brandCheck(this, _MessageEvent);
        if (!Object.isFrozen(__privateGet(this, _eventInit).ports)) {
          Object.freeze(__privateGet(this, _eventInit).ports);
        }
        return __privateGet(this, _eventInit).ports;
      }
      initMessageEvent(type, bubbles = false, cancelable = false, data = null, origin = "", lastEventId = "", source = null, ports = []) {
        webidl.brandCheck(this, _MessageEvent);
        webidl.argumentLengthCheck(arguments, 1, { header: "MessageEvent.initMessageEvent" });
        return new _MessageEvent(type, {
          bubbles,
          cancelable,
          data,
          origin,
          lastEventId,
          source,
          ports
        });
      }
    };
    _eventInit = new WeakMap();
    __name(_MessageEvent, "MessageEvent");
    var MessageEvent = _MessageEvent;
    var _eventInit2;
    var _CloseEvent = class _CloseEvent extends Event {
      constructor(type, eventInitDict = {}) {
        webidl.argumentLengthCheck(arguments, 1, { header: "CloseEvent constructor" });
        type = webidl.converters.DOMString(type);
        eventInitDict = webidl.converters.CloseEventInit(eventInitDict);
        super(type, eventInitDict);
        __privateAdd(this, _eventInit2, void 0);
        __privateSet(this, _eventInit2, eventInitDict);
      }
      get wasClean() {
        webidl.brandCheck(this, _CloseEvent);
        return __privateGet(this, _eventInit2).wasClean;
      }
      get code() {
        webidl.brandCheck(this, _CloseEvent);
        return __privateGet(this, _eventInit2).code;
      }
      get reason() {
        webidl.brandCheck(this, _CloseEvent);
        return __privateGet(this, _eventInit2).reason;
      }
    };
    _eventInit2 = new WeakMap();
    __name(_CloseEvent, "CloseEvent");
    var CloseEvent = _CloseEvent;
    var _eventInit3;
    var _ErrorEvent = class _ErrorEvent extends Event {
      constructor(type, eventInitDict) {
        webidl.argumentLengthCheck(arguments, 1, { header: "ErrorEvent constructor" });
        super(type, eventInitDict);
        __privateAdd(this, _eventInit3, void 0);
        type = webidl.converters.DOMString(type);
        eventInitDict = webidl.converters.ErrorEventInit(eventInitDict ?? {});
        __privateSet(this, _eventInit3, eventInitDict);
      }
      get message() {
        webidl.brandCheck(this, _ErrorEvent);
        return __privateGet(this, _eventInit3).message;
      }
      get filename() {
        webidl.brandCheck(this, _ErrorEvent);
        return __privateGet(this, _eventInit3).filename;
      }
      get lineno() {
        webidl.brandCheck(this, _ErrorEvent);
        return __privateGet(this, _eventInit3).lineno;
      }
      get colno() {
        webidl.brandCheck(this, _ErrorEvent);
        return __privateGet(this, _eventInit3).colno;
      }
      get error() {
        webidl.brandCheck(this, _ErrorEvent);
        return __privateGet(this, _eventInit3).error;
      }
    };
    _eventInit3 = new WeakMap();
    __name(_ErrorEvent, "ErrorEvent");
    var ErrorEvent = _ErrorEvent;
    Object.defineProperties(MessageEvent.prototype, {
      [Symbol.toStringTag]: {
        value: "MessageEvent",
        configurable: true
      },
      data: kEnumerableProperty,
      origin: kEnumerableProperty,
      lastEventId: kEnumerableProperty,
      source: kEnumerableProperty,
      ports: kEnumerableProperty,
      initMessageEvent: kEnumerableProperty
    });
    Object.defineProperties(CloseEvent.prototype, {
      [Symbol.toStringTag]: {
        value: "CloseEvent",
        configurable: true
      },
      reason: kEnumerableProperty,
      code: kEnumerableProperty,
      wasClean: kEnumerableProperty
    });
    Object.defineProperties(ErrorEvent.prototype, {
      [Symbol.toStringTag]: {
        value: "ErrorEvent",
        configurable: true
      },
      message: kEnumerableProperty,
      filename: kEnumerableProperty,
      lineno: kEnumerableProperty,
      colno: kEnumerableProperty,
      error: kEnumerableProperty
    });
    webidl.converters.MessagePort = webidl.interfaceConverter(MessagePort);
    webidl.converters["sequence<MessagePort>"] = webidl.sequenceConverter(
      webidl.converters.MessagePort
    );
    var eventInit = [
      {
        key: "bubbles",
        converter: webidl.converters.boolean,
        defaultValue: false
      },
      {
        key: "cancelable",
        converter: webidl.converters.boolean,
        defaultValue: false
      },
      {
        key: "composed",
        converter: webidl.converters.boolean,
        defaultValue: false
      }
    ];
    webidl.converters.MessageEventInit = webidl.dictionaryConverter([
      ...eventInit,
      {
        key: "data",
        converter: webidl.converters.any,
        defaultValue: null
      },
      {
        key: "origin",
        converter: webidl.converters.USVString,
        defaultValue: ""
      },
      {
        key: "lastEventId",
        converter: webidl.converters.DOMString,
        defaultValue: ""
      },
      {
        key: "source",
        // Node doesn't implement WindowProxy or ServiceWorker, so the only
        // valid value for source is a MessagePort.
        converter: webidl.nullableConverter(webidl.converters.MessagePort),
        defaultValue: null
      },
      {
        key: "ports",
        converter: webidl.converters["sequence<MessagePort>"],
        get defaultValue() {
          return [];
        }
      }
    ]);
    webidl.converters.CloseEventInit = webidl.dictionaryConverter([
      ...eventInit,
      {
        key: "wasClean",
        converter: webidl.converters.boolean,
        defaultValue: false
      },
      {
        key: "code",
        converter: webidl.converters["unsigned short"],
        defaultValue: 0
      },
      {
        key: "reason",
        converter: webidl.converters.USVString,
        defaultValue: ""
      }
    ]);
    webidl.converters.ErrorEventInit = webidl.dictionaryConverter([
      ...eventInit,
      {
        key: "message",
        converter: webidl.converters.DOMString,
        defaultValue: ""
      },
      {
        key: "filename",
        converter: webidl.converters.USVString,
        defaultValue: ""
      },
      {
        key: "lineno",
        converter: webidl.converters["unsigned long"],
        defaultValue: 0
      },
      {
        key: "colno",
        converter: webidl.converters["unsigned long"],
        defaultValue: 0
      },
      {
        key: "error",
        converter: webidl.converters.any
      }
    ]);
    module2.exports = {
      MessageEvent,
      CloseEvent,
      ErrorEvent
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/util.js
var require_util3 = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/util.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { kReadyState, kController, kResponse, kBinaryType, kWebSocketURL } = require_symbols3();
    var { states, opcodes } = require_constants3();
    var { MessageEvent, ErrorEvent } = require_events();
    function isEstablished(ws) {
      return ws[kReadyState] === states.OPEN;
    }
    __name(isEstablished, "isEstablished");
    function isClosing(ws) {
      return ws[kReadyState] === states.CLOSING;
    }
    __name(isClosing, "isClosing");
    function isClosed(ws) {
      return ws[kReadyState] === states.CLOSED;
    }
    __name(isClosed, "isClosed");
    function fireEvent(e, target, eventConstructor = Event, eventInitDict) {
      const event = new eventConstructor(e, eventInitDict);
      target.dispatchEvent(event);
    }
    __name(fireEvent, "fireEvent");
    function websocketMessageReceived(ws, type, data) {
      if (ws[kReadyState] !== states.OPEN) {
        return;
      }
      let dataForEvent;
      if (type === opcodes.TEXT) {
        try {
          dataForEvent = new TextDecoder("utf-8", { fatal: true }).decode(data);
        } catch {
          failWebsocketConnection(ws, "Received invalid UTF-8 in text frame.");
          return;
        }
      } else if (type === opcodes.BINARY) {
        if (ws[kBinaryType] === "blob") {
          dataForEvent = new Blob([data]);
        } else {
          dataForEvent = new Uint8Array(data).buffer;
        }
      }
      fireEvent("message", ws, MessageEvent, {
        origin: ws[kWebSocketURL].origin,
        data: dataForEvent
      });
    }
    __name(websocketMessageReceived, "websocketMessageReceived");
    function isValidSubprotocol(protocol) {
      if (protocol.length === 0) {
        return false;
      }
      for (const char of protocol) {
        const code = char.charCodeAt(0);
        if (code < 33 || code > 126 || char === "(" || char === ")" || char === "<" || char === ">" || char === "@" || char === "," || char === ";" || char === ":" || char === "\\\\" || char === '"' || char === "/" || char === "[" || char === "]" || char === "?" || char === "=" || char === "{" || char === "}" || code === 32 || // SP
        code === 9) {
          return false;
        }
      }
      return true;
    }
    __name(isValidSubprotocol, "isValidSubprotocol");
    function isValidStatusCode(code) {
      if (code >= 1e3 && code < 1015) {
        return code !== 1004 && // reserved
        code !== 1005 && // "MUST NOT be set as a status code"
        code !== 1006;
      }
      return code >= 3e3 && code <= 4999;
    }
    __name(isValidStatusCode, "isValidStatusCode");
    function failWebsocketConnection(ws, reason) {
      const { [kController]: controller, [kResponse]: response } = ws;
      controller.abort();
      if (response?.socket && !response.socket.destroyed) {
        response.socket.destroy();
      }
      if (reason) {
        fireEvent("error", ws, ErrorEvent, {
          error: new Error(reason)
        });
      }
    }
    __name(failWebsocketConnection, "failWebsocketConnection");
    module2.exports = {
      isEstablished,
      isClosing,
      isClosed,
      fireEvent,
      isValidSubprotocol,
      isValidStatusCode,
      failWebsocketConnection,
      websocketMessageReceived
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/connection.js
var require_connection = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/connection.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { randomBytes, createHash } = require("crypto");
    var diagnosticsChannel = require("diagnostics_channel");
    var { uid, states } = require_constants3();
    var {
      kReadyState,
      kSentClose,
      kByteParser,
      kReceivedClose
    } = require_symbols3();
    var { fireEvent, failWebsocketConnection } = require_util3();
    var { CloseEvent } = require_events();
    var { makeRequest } = require_request();
    var { fetching } = require_fetch();
    var { Headers: Headers3 } = require_headers();
    var { getGlobalDispatcher: getGlobalDispatcher2 } = require_global2();
    var { kHeadersList } = require_symbols2();
    var channels = {};
    channels.open = diagnosticsChannel.channel("undici:websocket:open");
    channels.close = diagnosticsChannel.channel("undici:websocket:close");
    channels.socketError = diagnosticsChannel.channel("undici:websocket:socket_error");
    function establishWebSocketConnection(url, protocols, ws, onEstablish, options) {
      const requestURL = url;
      requestURL.protocol = url.protocol === "ws:" ? "http:" : "https:";
      const request = makeRequest({
        urlList: [requestURL],
        serviceWorkers: "none",
        referrer: "no-referrer",
        mode: "websocket",
        credentials: "include",
        cache: "no-store",
        redirect: "error"
      });
      if (options.headers) {
        const headersList = new Headers3(options.headers)[kHeadersList];
        request.headersList = headersList;
      }
      const keyValue = randomBytes(16).toString("base64");
      request.headersList.append("sec-websocket-key", keyValue);
      request.headersList.append("sec-websocket-version", "13");
      for (const protocol of protocols) {
        request.headersList.append("sec-websocket-protocol", protocol);
      }
      const permessageDeflate = "";
      const controller = fetching({
        request,
        useParallelQueue: true,
        dispatcher: options.dispatcher ?? getGlobalDispatcher2(),
        processResponse(response) {
          if (response.type === "error" || response.status !== 101) {
            failWebsocketConnection(ws, "Received network error or non-101 status code.");
            return;
          }
          if (protocols.length !== 0 && !response.headersList.get("Sec-WebSocket-Protocol")) {
            failWebsocketConnection(ws, "Server did not respond with sent protocols.");
            return;
          }
          if (response.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
            failWebsocketConnection(ws, 'Server did not set Upgrade header to "websocket".');
            return;
          }
          if (response.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
            failWebsocketConnection(ws, 'Server did not set Connection header to "upgrade".');
            return;
          }
          const secWSAccept = response.headersList.get("Sec-WebSocket-Accept");
          const digest = createHash("sha1").update(keyValue + uid).digest("base64");
          if (secWSAccept !== digest) {
            failWebsocketConnection(ws, "Incorrect hash received in Sec-WebSocket-Accept header.");
            return;
          }
          const secExtension = response.headersList.get("Sec-WebSocket-Extensions");
          if (secExtension !== null && secExtension !== permessageDeflate) {
            failWebsocketConnection(ws, "Received different permessage-deflate than the one set.");
            return;
          }
          const secProtocol = response.headersList.get("Sec-WebSocket-Protocol");
          if (secProtocol !== null && secProtocol !== request.headersList.get("Sec-WebSocket-Protocol")) {
            failWebsocketConnection(ws, "Protocol was not set in the opening handshake.");
            return;
          }
          response.socket.on("data", onSocketData);
          response.socket.on("close", onSocketClose);
          response.socket.on("error", onSocketError);
          if (channels.open.hasSubscribers) {
            channels.open.publish({
              address: response.socket.address(),
              protocol: secProtocol,
              extensions: secExtension
            });
          }
          onEstablish(response);
        }
      });
      return controller;
    }
    __name(establishWebSocketConnection, "establishWebSocketConnection");
    function onSocketData(chunk) {
      if (!this.ws[kByteParser].write(chunk)) {
        this.pause();
      }
    }
    __name(onSocketData, "onSocketData");
    function onSocketClose() {
      const { ws } = this;
      const wasClean = ws[kSentClose] && ws[kReceivedClose];
      let code = 1005;
      let reason = "";
      const result = ws[kByteParser].closingInfo;
      if (result) {
        code = result.code ?? 1005;
        reason = result.reason;
      } else if (!ws[kSentClose]) {
        code = 1006;
      }
      ws[kReadyState] = states.CLOSED;
      fireEvent("close", ws, CloseEvent, {
        wasClean,
        code,
        reason
      });
      if (channels.close.hasSubscribers) {
        channels.close.publish({
          websocket: ws,
          code,
          reason
        });
      }
    }
    __name(onSocketClose, "onSocketClose");
    function onSocketError(error) {
      const { ws } = this;
      ws[kReadyState] = states.CLOSING;
      if (channels.socketError.hasSubscribers) {
        channels.socketError.publish(error);
      }
      this.destroy();
    }
    __name(onSocketError, "onSocketError");
    module2.exports = {
      establishWebSocketConnection
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/frame.js
var require_frame = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/frame.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { randomBytes } = require("crypto");
    var { maxUnsigned16Bit } = require_constants3();
    var _WebsocketFrameSend = class _WebsocketFrameSend {
      /**
       * @param {Buffer|undefined} data
       */
      constructor(data) {
        this.frameData = data;
        this.maskKey = randomBytes(4);
      }
      createFrame(opcode) {
        const bodyLength = this.frameData?.byteLength ?? 0;
        let payloadLength = bodyLength;
        let offset = 6;
        if (bodyLength > maxUnsigned16Bit) {
          offset += 8;
          payloadLength = 127;
        } else if (bodyLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const buffer = Buffer.allocUnsafe(bodyLength + offset);
        buffer[0] = buffer[1] = 0;
        buffer[0] |= 128;
        buffer[0] = (buffer[0] & 240) + opcode;
        buffer[offset - 4] = this.maskKey[0];
        buffer[offset - 3] = this.maskKey[1];
        buffer[offset - 2] = this.maskKey[2];
        buffer[offset - 1] = this.maskKey[3];
        buffer[1] = payloadLength;
        if (payloadLength === 126) {
          buffer.writeUInt16BE(bodyLength, 2);
        } else if (payloadLength === 127) {
          buffer[2] = buffer[3] = 0;
          buffer.writeUIntBE(bodyLength, 4, 6);
        }
        buffer[1] |= 128;
        for (let i = 0; i < bodyLength; i++) {
          buffer[offset + i] = this.frameData[i] ^ this.maskKey[i % 4];
        }
        return buffer;
      }
    };
    __name(_WebsocketFrameSend, "WebsocketFrameSend");
    var WebsocketFrameSend = _WebsocketFrameSend;
    module2.exports = {
      WebsocketFrameSend
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/receiver.js
var require_receiver = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/receiver.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { Writable } = require("stream");
    var diagnosticsChannel = require("diagnostics_channel");
    var { parserStates, opcodes, states, emptyBuffer } = require_constants3();
    var { kReadyState, kSentClose, kResponse, kReceivedClose } = require_symbols3();
    var { isValidStatusCode, failWebsocketConnection, websocketMessageReceived } = require_util3();
    var { WebsocketFrameSend } = require_frame();
    var channels = {};
    channels.ping = diagnosticsChannel.channel("undici:websocket:ping");
    channels.pong = diagnosticsChannel.channel("undici:websocket:pong");
    var _buffers, _byteOffset, _state, _info, _fragments;
    var _ByteParser = class _ByteParser extends Writable {
      constructor(ws) {
        super();
        __privateAdd(this, _buffers, []);
        __privateAdd(this, _byteOffset, 0);
        __privateAdd(this, _state, parserStates.INFO);
        __privateAdd(this, _info, {});
        __privateAdd(this, _fragments, []);
        this.ws = ws;
      }
      /**
       * @param {Buffer} chunk
       * @param {() => void} callback
       */
      _write(chunk, _, callback) {
        __privateGet(this, _buffers).push(chunk);
        __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) + chunk.length);
        this.run(callback);
      }
      /**
       * Runs whenever a new chunk is received.
       * Callback is called whenever there are no more chunks buffering,
       * or not enough bytes are buffered to parse.
       */
      run(callback) {
        while (true) {
          if (__privateGet(this, _state) === parserStates.INFO) {
            if (__privateGet(this, _byteOffset) < 2) {
              return callback();
            }
            const buffer = this.consume(2);
            __privateGet(this, _info).fin = (buffer[0] & 128) !== 0;
            __privateGet(this, _info).opcode = buffer[0] & 15;
            __privateGet(this, _info).originalOpcode ??= __privateGet(this, _info).opcode;
            __privateGet(this, _info).fragmented = !__privateGet(this, _info).fin && __privateGet(this, _info).opcode !== opcodes.CONTINUATION;
            if (__privateGet(this, _info).fragmented && __privateGet(this, _info).opcode !== opcodes.BINARY && __privateGet(this, _info).opcode !== opcodes.TEXT) {
              failWebsocketConnection(this.ws, "Invalid frame type was fragmented.");
              return;
            }
            const payloadLength = buffer[1] & 127;
            if (payloadLength <= 125) {
              __privateGet(this, _info).payloadLength = payloadLength;
              __privateSet(this, _state, parserStates.READ_DATA);
            } else if (payloadLength === 126) {
              __privateSet(this, _state, parserStates.PAYLOADLENGTH_16);
            } else if (payloadLength === 127) {
              __privateSet(this, _state, parserStates.PAYLOADLENGTH_64);
            }
            if (__privateGet(this, _info).fragmented && payloadLength > 125) {
              failWebsocketConnection(this.ws, "Fragmented frame exceeded 125 bytes.");
              return;
            } else if ((__privateGet(this, _info).opcode === opcodes.PING || __privateGet(this, _info).opcode === opcodes.PONG || __privateGet(this, _info).opcode === opcodes.CLOSE) && payloadLength > 125) {
              failWebsocketConnection(this.ws, "Payload length for control frame exceeded 125 bytes.");
              return;
            } else if (__privateGet(this, _info).opcode === opcodes.CLOSE) {
              if (payloadLength === 1) {
                failWebsocketConnection(this.ws, "Received close frame with a 1-byte body.");
                return;
              }
              const body = this.consume(payloadLength);
              __privateGet(this, _info).closeInfo = this.parseCloseBody(false, body);
              if (!this.ws[kSentClose]) {
                const body2 = Buffer.allocUnsafe(2);
                body2.writeUInt16BE(__privateGet(this, _info).closeInfo.code, 0);
                const closeFrame = new WebsocketFrameSend(body2);
                this.ws[kResponse].socket.write(
                  closeFrame.createFrame(opcodes.CLOSE),
                  (err) => {
                    if (!err) {
                      this.ws[kSentClose] = true;
                    }
                  }
                );
              }
              this.ws[kReadyState] = states.CLOSING;
              this.ws[kReceivedClose] = true;
              this.end();
              return;
            } else if (__privateGet(this, _info).opcode === opcodes.PING) {
              const body = this.consume(payloadLength);
              if (!this.ws[kReceivedClose]) {
                const frame = new WebsocketFrameSend(body);
                this.ws[kResponse].socket.write(frame.createFrame(opcodes.PONG));
                if (channels.ping.hasSubscribers) {
                  channels.ping.publish({
                    payload: body
                  });
                }
              }
              __privateSet(this, _state, parserStates.INFO);
              if (__privateGet(this, _byteOffset) > 0) {
                continue;
              } else {
                callback();
                return;
              }
            } else if (__privateGet(this, _info).opcode === opcodes.PONG) {
              const body = this.consume(payloadLength);
              if (channels.pong.hasSubscribers) {
                channels.pong.publish({
                  payload: body
                });
              }
              if (__privateGet(this, _byteOffset) > 0) {
                continue;
              } else {
                callback();
                return;
              }
            }
          } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_16) {
            if (__privateGet(this, _byteOffset) < 2) {
              return callback();
            }
            const buffer = this.consume(2);
            __privateGet(this, _info).payloadLength = buffer.readUInt16BE(0);
            __privateSet(this, _state, parserStates.READ_DATA);
          } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_64) {
            if (__privateGet(this, _byteOffset) < 8) {
              return callback();
            }
            const buffer = this.consume(8);
            const upper = buffer.readUInt32BE(0);
            if (upper > 2 ** 31 - 1) {
              failWebsocketConnection(this.ws, "Received payload length > 2^31 bytes.");
              return;
            }
            const lower = buffer.readUInt32BE(4);
            __privateGet(this, _info).payloadLength = (upper << 8) + lower;
            __privateSet(this, _state, parserStates.READ_DATA);
          } else if (__privateGet(this, _state) === parserStates.READ_DATA) {
            if (__privateGet(this, _byteOffset) < __privateGet(this, _info).payloadLength) {
              return callback();
            } else if (__privateGet(this, _byteOffset) >= __privateGet(this, _info).payloadLength) {
              const body = this.consume(__privateGet(this, _info).payloadLength);
              __privateGet(this, _fragments).push(body);
              if (!__privateGet(this, _info).fragmented || __privateGet(this, _info).fin && __privateGet(this, _info).opcode === opcodes.CONTINUATION) {
                const fullMessage = Buffer.concat(__privateGet(this, _fragments));
                websocketMessageReceived(this.ws, __privateGet(this, _info).originalOpcode, fullMessage);
                __privateSet(this, _info, {});
                __privateGet(this, _fragments).length = 0;
              }
              __privateSet(this, _state, parserStates.INFO);
            }
          }
          if (__privateGet(this, _byteOffset) > 0) {
            continue;
          } else {
            callback();
            break;
          }
        }
      }
      /**
       * Take n bytes from the buffered Buffers
       * @param {number} n
       * @returns {Buffer|null}
       */
      consume(n) {
        if (n > __privateGet(this, _byteOffset)) {
          return null;
        } else if (n === 0) {
          return emptyBuffer;
        }
        if (__privateGet(this, _buffers)[0].length === n) {
          __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - __privateGet(this, _buffers)[0].length);
          return __privateGet(this, _buffers).shift();
        }
        const buffer = Buffer.allocUnsafe(n);
        let offset = 0;
        while (offset !== n) {
          const next = __privateGet(this, _buffers)[0];
          const { length } = next;
          if (length + offset === n) {
            buffer.set(__privateGet(this, _buffers).shift(), offset);
            break;
          } else if (length + offset > n) {
            buffer.set(next.subarray(0, n - offset), offset);
            __privateGet(this, _buffers)[0] = next.subarray(n - offset);
            break;
          } else {
            buffer.set(__privateGet(this, _buffers).shift(), offset);
            offset += next.length;
          }
        }
        __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - n);
        return buffer;
      }
      parseCloseBody(onlyCode, data) {
        let code;
        if (data.length >= 2) {
          code = data.readUInt16BE(0);
        }
        if (onlyCode) {
          if (!isValidStatusCode(code)) {
            return null;
          }
          return { code };
        }
        let reason = data.subarray(2);
        if (reason[0] === 239 && reason[1] === 187 && reason[2] === 191) {
          reason = reason.subarray(3);
        }
        if (code !== void 0 && !isValidStatusCode(code)) {
          return null;
        }
        try {
          reason = new TextDecoder("utf-8", { fatal: true }).decode(reason);
        } catch {
          return null;
        }
        return { code, reason };
      }
      get closingInfo() {
        return __privateGet(this, _info).closeInfo;
      }
    };
    _buffers = new WeakMap();
    _byteOffset = new WeakMap();
    _state = new WeakMap();
    _info = new WeakMap();
    _fragments = new WeakMap();
    __name(_ByteParser, "ByteParser");
    var ByteParser = _ByteParser;
    module2.exports = {
      ByteParser
    };
  }
});

// ../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/websocket.js
var require_websocket = __commonJS({
  "../../node_modules/.pnpm/undici@5.23.0/node_modules/undici/lib/websocket/websocket.js"(exports2, module2) {
    "use strict";
    init_define_process();
    var { webidl } = require_webidl();
    var { DOMException } = require_constants();
    var { URLSerializer } = require_dataURL();
    var { staticPropertyDescriptors, states, opcodes, emptyBuffer } = require_constants3();
    var {
      kWebSocketURL,
      kReadyState,
      kController,
      kBinaryType,
      kResponse,
      kSentClose,
      kByteParser
    } = require_symbols3();
    var { isEstablished, isClosing, isValidSubprotocol, failWebsocketConnection, fireEvent } = require_util3();
    var { establishWebSocketConnection } = require_connection();
    var { WebsocketFrameSend } = require_frame();
    var { ByteParser } = require_receiver();
    var { kEnumerableProperty, isBlobLike } = require_util();
    var { getGlobalDispatcher: getGlobalDispatcher2 } = require_global2();
    var { types } = require("util");
    var experimentalWarned = false;
    var _events, _bufferedAmount, _protocol, _extensions, _onConnectionEstablished, onConnectionEstablished_fn;
    var _WebSocket = class _WebSocket extends EventTarget {
      /**
       * @param {string} url
       * @param {string|string[]} protocols
       */
      constructor(url, protocols = []) {
        super();
        /**
         * @see https://websockets.spec.whatwg.org/#feedback-from-the-protocol
         */
        __privateAdd(this, _onConnectionEstablished);
        __privateAdd(this, _events, {
          open: null,
          error: null,
          close: null,
          message: null
        });
        __privateAdd(this, _bufferedAmount, 0);
        __privateAdd(this, _protocol, "");
        __privateAdd(this, _extensions, "");
        webidl.argumentLengthCheck(arguments, 1, { header: "WebSocket constructor" });
        if (!experimentalWarned) {
          experimentalWarned = true;
          define_process_default.emitWarning("WebSockets are experimental, expect them to change at any time.", {
            code: "UNDICI-WS"
          });
        }
        const options = webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"](protocols);
        url = webidl.converters.USVString(url);
        protocols = options.protocols;
        let urlRecord;
        try {
          urlRecord = new URL(url);
        } catch (e) {
          throw new DOMException(e, "SyntaxError");
        }
        if (urlRecord.protocol !== "ws:" && urlRecord.protocol !== "wss:") {
          throw new DOMException(
            \`Expected a ws: or wss: protocol, got \${urlRecord.protocol}\`,
            "SyntaxError"
          );
        }
        if (urlRecord.hash) {
          throw new DOMException("Got fragment", "SyntaxError");
        }
        if (typeof protocols === "string") {
          protocols = [protocols];
        }
        if (protocols.length !== new Set(protocols.map((p) => p.toLowerCase())).size) {
          throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
        }
        if (protocols.length > 0 && !protocols.every((p) => isValidSubprotocol(p))) {
          throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
        }
        this[kWebSocketURL] = urlRecord;
        this[kController] = establishWebSocketConnection(
          urlRecord,
          protocols,
          this,
          (response) => __privateMethod(this, _onConnectionEstablished, onConnectionEstablished_fn).call(this, response),
          options
        );
        this[kReadyState] = _WebSocket.CONNECTING;
        this[kBinaryType] = "blob";
      }
      /**
       * @see https://websockets.spec.whatwg.org/#dom-websocket-close
       * @param {number|undefined} code
       * @param {string|undefined} reason
       */
      close(code = void 0, reason = void 0) {
        webidl.brandCheck(this, _WebSocket);
        if (code !== void 0) {
          code = webidl.converters["unsigned short"](code, { clamp: true });
        }
        if (reason !== void 0) {
          reason = webidl.converters.USVString(reason);
        }
        if (code !== void 0) {
          if (code !== 1e3 && (code < 3e3 || code > 4999)) {
            throw new DOMException("invalid code", "InvalidAccessError");
          }
        }
        let reasonByteLength = 0;
        if (reason !== void 0) {
          reasonByteLength = Buffer.byteLength(reason);
          if (reasonByteLength > 123) {
            throw new DOMException(
              \`Reason must be less than 123 bytes; received \${reasonByteLength}\`,
              "SyntaxError"
            );
          }
        }
        if (this[kReadyState] === _WebSocket.CLOSING || this[kReadyState] === _WebSocket.CLOSED) {
        } else if (!isEstablished(this)) {
          failWebsocketConnection(this, "Connection was closed before it was established.");
          this[kReadyState] = _WebSocket.CLOSING;
        } else if (!isClosing(this)) {
          const frame = new WebsocketFrameSend();
          if (code !== void 0 && reason === void 0) {
            frame.frameData = Buffer.allocUnsafe(2);
            frame.frameData.writeUInt16BE(code, 0);
          } else if (code !== void 0 && reason !== void 0) {
            frame.frameData = Buffer.allocUnsafe(2 + reasonByteLength);
            frame.frameData.writeUInt16BE(code, 0);
            frame.frameData.write(reason, 2, "utf-8");
          } else {
            frame.frameData = emptyBuffer;
          }
          const socket = this[kResponse].socket;
          socket.write(frame.createFrame(opcodes.CLOSE), (err) => {
            if (!err) {
              this[kSentClose] = true;
            }
          });
          this[kReadyState] = states.CLOSING;
        } else {
          this[kReadyState] = _WebSocket.CLOSING;
        }
      }
      /**
       * @see https://websockets.spec.whatwg.org/#dom-websocket-send
       * @param {NodeJS.TypedArray|ArrayBuffer|Blob|string} data
       */
      send(data) {
        webidl.brandCheck(this, _WebSocket);
        webidl.argumentLengthCheck(arguments, 1, { header: "WebSocket.send" });
        data = webidl.converters.WebSocketSendData(data);
        if (this[kReadyState] === _WebSocket.CONNECTING) {
          throw new DOMException("Sent before connected.", "InvalidStateError");
        }
        if (!isEstablished(this) || isClosing(this)) {
          return;
        }
        const socket = this[kResponse].socket;
        if (typeof data === "string") {
          const value = Buffer.from(data);
          const frame = new WebsocketFrameSend(value);
          const buffer = frame.createFrame(opcodes.TEXT);
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
          socket.write(buffer, () => {
            __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
          });
        } else if (types.isArrayBuffer(data)) {
          const value = Buffer.from(data);
          const frame = new WebsocketFrameSend(value);
          const buffer = frame.createFrame(opcodes.BINARY);
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
          socket.write(buffer, () => {
            __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
          });
        } else if (ArrayBuffer.isView(data)) {
          const ab = Buffer.from(data, data.byteOffset, data.byteLength);
          const frame = new WebsocketFrameSend(ab);
          const buffer = frame.createFrame(opcodes.BINARY);
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + ab.byteLength);
          socket.write(buffer, () => {
            __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - ab.byteLength);
          });
        } else if (isBlobLike(data)) {
          const frame = new WebsocketFrameSend();
          data.arrayBuffer().then((ab) => {
            const value = Buffer.from(ab);
            frame.frameData = value;
            const buffer = frame.createFrame(opcodes.BINARY);
            __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + value.byteLength);
            socket.write(buffer, () => {
              __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - value.byteLength);
            });
          });
        }
      }
      get readyState() {
        webidl.brandCheck(this, _WebSocket);
        return this[kReadyState];
      }
      get bufferedAmount() {
        webidl.brandCheck(this, _WebSocket);
        return __privateGet(this, _bufferedAmount);
      }
      get url() {
        webidl.brandCheck(this, _WebSocket);
        return URLSerializer(this[kWebSocketURL]);
      }
      get extensions() {
        webidl.brandCheck(this, _WebSocket);
        return __privateGet(this, _extensions);
      }
      get protocol() {
        webidl.brandCheck(this, _WebSocket);
        return __privateGet(this, _protocol);
      }
      get onopen() {
        webidl.brandCheck(this, _WebSocket);
        return __privateGet(this, _events).open;
      }
      set onopen(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (__privateGet(this, _events).open) {
          this.removeEventListener("open", __privateGet(this, _events).open);
        }
        if (typeof fn === "function") {
          __privateGet(this, _events).open = fn;
          this.addEventListener("open", fn);
        } else {
          __privateGet(this, _events).open = null;
        }
      }
      get onerror() {
        webidl.brandCheck(this, _WebSocket);
        return __privateGet(this, _events).error;
      }
      set onerror(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (__privateGet(this, _events).error) {
          this.removeEventListener("error", __privateGet(this, _events).error);
        }
        if (typeof fn === "function") {
          __privateGet(this, _events).error = fn;
          this.addEventListener("error", fn);
        } else {
          __privateGet(this, _events).error = null;
        }
      }
      get onclose() {
        webidl.brandCheck(this, _WebSocket);
        return __privateGet(this, _events).close;
      }
      set onclose(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (__privateGet(this, _events).close) {
          this.removeEventListener("close", __privateGet(this, _events).close);
        }
        if (typeof fn === "function") {
          __privateGet(this, _events).close = fn;
          this.addEventListener("close", fn);
        } else {
          __privateGet(this, _events).close = null;
        }
      }
      get onmessage() {
        webidl.brandCheck(this, _WebSocket);
        return __privateGet(this, _events).message;
      }
      set onmessage(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (__privateGet(this, _events).message) {
          this.removeEventListener("message", __privateGet(this, _events).message);
        }
        if (typeof fn === "function") {
          __privateGet(this, _events).message = fn;
          this.addEventListener("message", fn);
        } else {
          __privateGet(this, _events).message = null;
        }
      }
      get binaryType() {
        webidl.brandCheck(this, _WebSocket);
        return this[kBinaryType];
      }
      set binaryType(type) {
        webidl.brandCheck(this, _WebSocket);
        if (type !== "blob" && type !== "arraybuffer") {
          this[kBinaryType] = "blob";
        } else {
          this[kBinaryType] = type;
        }
      }
    };
    _events = new WeakMap();
    _bufferedAmount = new WeakMap();
    _protocol = new WeakMap();
    _extensions = new WeakMap();
    _onConnectionEstablished = new WeakSet();
    onConnectionEstablished_fn = /* @__PURE__ */ __name(function(response) {
      this[kResponse] = response;
      const parser = new ByteParser(this);
      parser.on("drain", /* @__PURE__ */ __name(function onParserDrain() {
        this.ws[kResponse].socket.resume();
      }, "onParserDrain"));
      response.socket.ws = this;
      this[kByteParser] = parser;
      this[kReadyState] = states.OPEN;
      const extensions = response.headersList.get("sec-websocket-extensions");
      if (extensions !== null) {
        __privateSet(this, _extensions, extensions);
      }
      const protocol = response.headersList.get("sec-websocket-protocol");
      if (protocol !== null) {
        __privateSet(this, _protocol, protocol);
      }
      fireEvent("open", this);
    }, "#onConnectionEstablished");
    __name(_WebSocket, "WebSocket");
    var WebSocket2 = _WebSocket;
    WebSocket2.CONNECTING = WebSocket2.prototype.CONNECTING = states.CONNECTING;
    WebSocket2.OPEN = WebSocket2.prototype.OPEN = states.OPEN;
    WebSocket2.CLOSING = WebSocket2.prototype.CLOSING = states.CLOSING;
    WebSocket2.CLOSED = WebSocket2.prototype.CLOSED = states.CLOSED;
    Object.defineProperties(WebSocket2.prototype, {
      CONNECTING: staticPropertyDescriptors,
      OPEN: staticPropertyDescriptors,
      CLOSING: staticPropertyDescriptors,
      CLOSED: staticPropertyDescriptors,
      url: kEnumerableProperty,
      readyState: kEnumerableProperty,
      bufferedAmount: kEnumerableProperty,
      onopen: kEnumerableProperty,
      onerror: kEnumerableProperty,
      onclose: kEnumerableProperty,
      close: kEnumerableProperty,
      onmessage: kEnumerableProperty,
      binaryType: kEnumerableProperty,
      send: kEnumerableProperty,
      extensions: kEnumerableProperty,
      protocol: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "WebSocket",
        writable: false,
        enumerable: false,
        configurable: true
      }
    });
    Object.defineProperties(WebSocket2, {
      CONNECTING: staticPropertyDescriptors,
      OPEN: staticPropertyDescriptors,
      CLOSING: staticPropertyDescriptors,
      CLOSED: staticPropertyDescriptors
    });
    webidl.converters["sequence<DOMString>"] = webidl.sequenceConverter(
      webidl.converters.DOMString
    );
    webidl.converters["DOMString or sequence<DOMString>"] = function(V) {
      if (webidl.util.Type(V) === "Object" && Symbol.iterator in V) {
        return webidl.converters["sequence<DOMString>"](V);
      }
      return webidl.converters.DOMString(V);
    };
    webidl.converters.WebSocketInit = webidl.dictionaryConverter([
      {
        key: "protocols",
        converter: webidl.converters["DOMString or sequence<DOMString>"],
        get defaultValue() {
          return [];
        }
      },
      {
        key: "dispatcher",
        converter: (V) => V,
        get defaultValue() {
          return getGlobalDispatcher2();
        }
      },
      {
        key: "headers",
        converter: webidl.nullableConverter(webidl.converters.HeadersInit)
      }
    ]);
    webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(V) {
      if (webidl.util.Type(V) === "Object" && !(Symbol.iterator in V)) {
        return webidl.converters.WebSocketInit(V);
      }
      return { protocols: webidl.converters["DOMString or sequence<DOMString>"](V) };
    };
    webidl.converters.WebSocketSendData = function(V) {
      if (webidl.util.Type(V) === "Object") {
        if (isBlobLike(V)) {
          return webidl.converters.Blob(V, { strict: false });
        }
        if (ArrayBuffer.isView(V) || types.isAnyArrayBuffer(V)) {
          return webidl.converters.BufferSource(V);
        }
      }
      return webidl.converters.USVString(V);
    };
    module2.exports = {
      WebSocket: WebSocket2
    };
  }
});

// src/primitives/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  File: () => import_file.File,
  FormData: () => import_formdata.FormData,
  Headers: () => Headers2,
  Request: () => Request,
  Response: () => Response2,
  WebSocket: () => import_websocket.WebSocket,
  fetch: () => fetch,
  getGlobalDispatcher: () => getGlobalDispatcher,
  setGlobalDispatcher: () => setGlobalDispatcher
});
module.exports = __toCommonJS(fetch_exports);
init_define_process();
var FetchSymbols = __toESM(require_symbols());
var HeadersModule = __toESM(require_headers());
var ResponseModule = __toESM(require_response());
var UtilModule = __toESM(require_util2());
var WebIDLModule = __toESM(require_webidl());
var import_request = __toESM(require_request());
var import_fetch = __toESM(require_fetch());
var import_agent = __toESM(require_agent());
var import_formdata = __toESM(require_formdata());
var import_file = __toESM(require_file());
var import_websocket = __toESM(require_websocket());
define_process_default.nextTick = setImmediate;
define_process_default.emitWarning = () => {
};
var _Request = class _Request extends import_request.Request {
  constructor(input, init) {
    super(input, addDuplexToInit(init));
  }
};
__name(_Request, "Request");
var Request = _Request;
var __entries = HeadersModule.Headers.prototype.entries;
HeadersModule.Headers.prototype.entries = function* () {
  let sentSetCookie = false;
  for (const [key, value] of __entries.call(this)) {
    if (key === "set-cookie") {
      if (sentSetCookie) {
        continue;
      }
      sentSetCookie = true;
      const cookies = this.getSetCookie();
      yield [key, cookies.join(", ")];
    } else {
      yield [key, value];
    }
  }
};
HeadersModule.Headers[Symbol.iterator] = () => {
  return HeadersModule.Headers.prototype.entries();
};
HeadersModule.Headers.prototype.values = function* () {
  for (const [, value] of __entries.call(this)) {
    yield value;
  }
};
HeadersModule.Headers.prototype.getAll = function(name) {
  const _name = normalizeAndValidateHeaderName(name, "Headers.getAll");
  if (_name !== "set-cookie") {
    throw new Error(\`getAll can only be used with 'set-cookie'\`);
  }
  return this.getSetCookie();
};
var __error = ResponseModule.Response.error;
ResponseModule.Response.error = function(...args) {
  const response = __error.call(this, ...args);
  response[FetchSymbols.kHeaders][FetchSymbols.kGuard] = "response";
  return response;
};
function normalizeAndValidateHeaderName(potentialName, errorPrefix) {
  const normalizedName = potentialName.toLowerCase();
  if (UtilModule.isValidHeaderName(normalizedName)) {
    return normalizedName;
  }
  WebIDLModule.errors.invalidArgument({
    prefix: errorPrefix,
    value: normalizedName,
    type: "header name"
  });
}
__name(normalizeAndValidateHeaderName, "normalizeAndValidateHeaderName");
var globalDispatcher = new import_agent.default();
function getGlobalDispatcher() {
  return globalDispatcher;
}
__name(getGlobalDispatcher, "getGlobalDispatcher");
function setGlobalDispatcher(agent) {
  if (!agent || typeof agent.dispatch !== "function") {
    throw new InvalidArgumentError("Argument agent must implement Agent");
  }
  globalDispatcher = agent;
}
__name(setGlobalDispatcher, "setGlobalDispatcher");
function addDuplexToInit(init) {
  return typeof init === "undefined" || typeof init === "object" && init.duplex === void 0 ? { duplex: "half", ...init } : init;
}
__name(addDuplexToInit, "addDuplexToInit");
async function fetch(info, init) {
  init = addDuplexToInit(init);
  const res = await import_fetch.fetch.call(getGlobalDispatcher(), info, init);
  const response = new Response2(res.body, res);
  Object.defineProperty(response, "url", { value: res.url });
  return response;
}
__name(fetch, "fetch");
var Headers2 = HeadersModule.Headers;
var Response2 = ResponseModule.Response;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  File,
  FormData,
  Headers,
  Request,
  Response,
  WebSocket,
  fetch,
  getGlobalDispatcher,
  setGlobalDispatcher
});
`});var Rr=O((Wl,_r)=>{"use strict";_r.exports=`"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/primitives/crypto.js
var crypto_exports = {};
__export(crypto_exports, {
  Crypto: () => Crypto,
  CryptoKey: () => CryptoKey,
  SubtleCrypto: () => SubtleCrypto,
  crypto: () => crypto
});
module.exports = __toCommonJS(crypto_exports);
var import_node_crypto = require("crypto");
var { Crypto, CryptoKey } = import_node_crypto.webcrypto;
function SubtleCrypto() {
  if (!(this instanceof SubtleCrypto))
    return new SubtleCrypto();
  throw TypeError("Illegal constructor");
}
__name(SubtleCrypto, "SubtleCrypto");
var crypto = new Crypto();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Crypto,
  CryptoKey,
  SubtleCrypto,
  crypto
});
`});var kr=O((exports,module)=>{"use strict";var __create=Object.create,__defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropNames=Object.getOwnPropertyNames,__getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty,__name=(t,n)=>__defProp(t,"name",{value:n,configurable:!0}),__export=(t,n)=>{for(var r in n)__defProp(t,r,{get:n[r],enumerable:!0})},__copyProps=(t,n,r,A)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of __getOwnPropNames(n))!__hasOwnProp.call(t,o)&&o!==r&&__defProp(t,o,{get:()=>n[o],enumerable:!(A=__getOwnPropDesc(n,o))||A.enumerable});return t},__toESM=(t,n,r)=>(r=t!=null?__create(__getProtoOf(t)):{},__copyProps(n||!t||!t.__esModule?__defProp(r,"default",{value:t,enumerable:!0}):r,t)),__toCommonJS=t=>__copyProps(__defProp({},"__esModule",{value:!0}),t),load_exports={};__export(load_exports,{load:()=>load});module.exports=__toCommonJS(load_exports);var import_module=__toESM(rn("module")),import_crypto=__toESM(rn("crypto")),import_web=rn("stream/web");function requireWithFakeGlobalScope(params){let getModuleCode=`(function(module,exports,require,globalThis,${Object.keys(params.scopedContext).join(",")}) {${params.sourceCode}
})`,module={exports:{},loaded:!1,id:params.id},moduleRequire=(import_module.default.createRequire||import_module.default.createRequireFromPath)(__filename);function throwingRequire(t){if(t.startsWith("./")){let n=t.replace(/^\.\//,"");if(!params.cache||!params.cache.has(n))throw new Error(`Cannot find module '${n}'`);return params.cache.get(n).exports}return moduleRequire(t)}return __name(throwingRequire,"throwingRequire"),throwingRequire.resolve=moduleRequire.resolve.bind(moduleRequire),eval(getModuleCode)(module,module.exports,throwingRequire,params.context,...Object.values(params.scopedContext)),module.exports}__name(requireWithFakeGlobalScope,"requireWithFakeGlobalScope");function load(t={}){let n={};assign(n,{TextDecoder,TextEncoder,TextEncoderStream:import_web.TextEncoderStream,TextDecoderStream:import_web.TextDecoderStream,atob,btoa,performance});let r=requireWithFakeGlobalScope({context:n,id:"console.js",sourceCode:lr(),scopedContext:t});assign(n,{console:r.console});let A=requireWithFakeGlobalScope({context:n,id:"timers.js",sourceCode:ur(),scopedContext:t});assign(n,{setTimeout:A.setTimeout,setInterval:A.setInterval});let o=requireWithFakeGlobalScope({context:n,id:"events.js",sourceCode:pr(),scopedContext:t});assign(n,{Event,EventTarget,FetchEvent:o.FetchEvent,PromiseRejectionEvent:o.PromiseRejectionEvent});let s={ReadableStream:import_web.ReadableStream,ReadableStreamBYOBReader:import_web.ReadableStreamBYOBReader,ReadableStreamDefaultReader:import_web.ReadableStreamDefaultReader,TransformStream:import_web.TransformStream,WritableStream:import_web.WritableStream,WritableStreamDefaultWriter:import_web.WritableStreamDefaultWriter};assign(n,s);let a=requireWithFakeGlobalScope({context:n,id:"abort-controller.js",sourceCode:Er(),scopedContext:{...t}});assign(n,{AbortController:a.AbortController,AbortSignal:a.AbortSignal,DOMException:a.DOMException});let l=requireWithFakeGlobalScope({context:n,id:"url.js",sourceCode:Qr(),scopedContext:{...t}});assign(n,{URL,URLSearchParams,URLPattern:l.URLPattern});let c=(()=>{if(typeof t.Blob=="function")return{Blob:t.Blob};if(typeof Blob=="function")return{Blob};let y={...s,...t},_={...y,Blob:void 0};return Object.setPrototypeOf(_,globalThis),y.global=_,requireWithFakeGlobalScope({context:n,id:"blob.js",sourceCode:Cr(),scopedContext:y})})();assign(n,{Blob:c.Blob});let p=requireWithFakeGlobalScope({id:"structured-clone.js",context:n,sourceCode:fr(),scopedContext:{...s,...t}});assign(n,{structuredClone:p.structuredClone});let I=requireWithFakeGlobalScope({context:n,id:"fetch.js",sourceCode:yr(),cache:new Map([["abort-controller",{exports:a}],["streams",{exports:s}]]),scopedContext:{global:{...t},...t,...l,...a,...o,...s,structuredClone:n.structuredClone}});assign(n,{fetch:I.fetch,File:I.File,FormData:I.FormData,Headers:I.Headers,Request:I.Request,Response:I.Response,WebSocket:I.WebSocket});let C=getCrypto(n,t);return assign(n,{crypto:C.crypto,Crypto:C.Crypto,CryptoKey:C.CryptoKey,SubtleCrypto:C.SubtleCrypto}),n}__name(load,"load");function getCrypto(t,n){if(typeof SubtleCrypto<"u"||n.SubtleCrypto)return{crypto:n.crypto||globalThis.crypto,Crypto:n.Crypto||globalThis.Crypto,CryptoKey:n.CryptoKey||globalThis.CryptoKey,SubtleCrypto:n.SubtleCrypto||globalThis.SubtleCrypto};if(import_crypto.default.webcrypto){let r=import_crypto.default.webcrypto;return{crypto:r,Crypto:r.constructor,CryptoKey:r.CryptoKey,SubtleCrypto:r.subtle.constructor}}return requireWithFakeGlobalScope({context:t,id:"crypto.js",sourceCode:Rr(),scopedContext:{...n}})}__name(getCrypto,"getCrypto");function assign(t,n){Object.assign(t,n)}__name(assign,"assign")});var Sr=O((zl,wr)=>{"use strict";var Es=kr();wr.exports=(0,Es.load)({WeakRef:global.WeakRef})});var M=class{constructor(n={}){this.options=n}statusCode(){return this.options.status??200}status(n){return this.options.status=n,this}header(n,r){return this.options.headers=Ce(this.options.headers,{[n]:r}),this}headers(n){return this.options.headers=Ce(this.options.headers,n),this}statusText(n){return this.options.statusText=n,this}static json(...n){return new te(...n)}static multipartFormData(...n){return new Ie(...n)}static custom(...n){return new re(...n)}},te=class extends M{constructor(r,A={}){super(A);this.data=r;this.options.headers=Ce(this.options.headers,{"Content-Type":"application/json"})}serializeToResponse(r){return new Response(JSON.stringify(r.parse(this.data)),this.options)}},re=class extends M{constructor(r,A,o={}){super(o);this.data=r;this.contentType=A;this.options.headers=Ce(this.options.headers,{"Content-Type":A})}serializeToResponse(r){return new Response(r.parse(this.data),this.options)}};var Ie=class extends M{constructor(r,A={}){super(A);this.data=r;this.options.headers=Ce(this.options.headers,{"Content-Type":"multipart/form-data"})}serializeToResponse(r){let A=new FormData;for(let[o,s]of Object.entries(r.parse(this.data)))A.append(o,s instanceof Blob?s:String(s));return new Response(A,this.options)}};function zn(t,n){return Object.assign(t,n)}function Ce(t,n){return new Headers(Object.fromEntries([...t instanceof Headers?t:new Headers(t??void 0).entries()??[],...n instanceof Headers?n:new Headers(n??void 0).entries()??[]]))}import{z as Ne}from"zod";var Kn=t=>t.path.join(".")===""?t.message:t.message==="Required"?`\`${t.path.join(".")}\` is required`:`${t.message} for "${t.path.join(".")}"`,An=t=>{let n;if(t.issues.length===1){let r=t.issues[0];n=Kn(r)}else{let r=[];for(let A of t.issues)r.push(Kn(A));n=`${t.issues.length} Zod validation issues: `+r.join(", ")}return n+=`. Full Zod error: ${JSON.stringify(t.issues,null,2)}`,n};var H=class extends Error{constructor(r,A=500){super(r);this.message=r;this.status=A;this.name=this.constructor.name}_isHttpException=!0},Ae=class extends H{constructor(n){super(`only ${n.join(",")} accepted`,405)}},v=class extends H{constructor(n){super(n,404)}},W=class extends H{constructor(n){super(n,400)}},Be=class extends W{},oe=class extends W{},$=class extends W{},se=class extends W{constructor(n){super(An(n))}},Te=class extends H{constructor(n){super(An(n),500)}};var Zn=t=>async(n,r,A)=>{if(!t.includes(n.method))throw new Ae(t);return await A(n,r)};import{z as Wr,ZodError as zr,ZodFirstPartyTypeKind as J}from"zod";var Kr=(t,n)=>{if(!t)return n;let r=n;for(;r instanceof Wr.ZodEffects;)r=r._def.schema;return r},$n=t=>{let n=[J.ZodOptional,J.ZodDefault,J.ZodEffects];for(;n.includes(t._def.typeName);){if(t._def.typeName===J.ZodOptional||t._def.typeName===J.ZodDefault){t=t._def.innerType;continue}if(t._def.typeName===J.ZodEffects){t=t._def.schema;continue}}return t._def},et=t=>{let n=t._def.typeName===J.ZodEffects,r=Kr(n,t);if(r._def.typeName===J.ZodObject)return r},on=t=>$n(t).typeName===J.ZodArray,Zr=t=>$n(t).typeName===J.ZodBoolean,Xn=(t,n,r)=>{let A=Object.assign({},n),o=et(t);if(o)for(let[s,a]of Object.entries(o.shape)){if(on(a)){let l=n[s];typeof l=="string"&&r.includes("comma")&&(A[s]=l.split(","));let c=n[`${s}[]`];if(typeof c=="string"&&r.includes("brackets")){let p=c;A[s]=p.split(",")}Array.isArray(c)&&r.includes("brackets")&&(A[s]=c);continue}if(Zr(a)){let l=n[s];typeof l=="string"&&(A[s]=l==="true")}}return t.parse(A)},Xr=(t,n,r)=>{let A=new URL(t,"http://dummy.com"),o=new Set,s=et(n);if(s)for(let a of A.searchParams.keys()){for(let[c,p]of Object.entries(s.shape))if(on(p)&&a===`${c}[]`&&!r.includes("brackets"))throw new Be(`Bracket syntax not supported for query param "${c}"`);let l=s.shape[a];if(l&&on(l)&&o.has(a)&&!r.includes("repeat"))throw new Be(`Repeated parameters not supported for duplicate query param "${a}"`);o.add(a)}},$r=async(t,n)=>{let{supportedArrayFormats:r}=t;if(t.formData&&t.jsonBody||t.formData&&t.commonParams)throw new Error("Cannot use formData with jsonBody or commonParams");if((n.method==="POST"||n.method==="PATCH")&&(t.jsonBody||t.commonParams)&&!n.headers.get("content-type")?.includes("application/json"))throw new oe(`${n.method} requests must have Content-Type header with "application/json"`);if(t.urlEncodedFormData&&n.method!=="GET"&&!n.headers.get("content-type")?.includes("application/x-www-form-urlencoded"))throw new oe('Must have Content-Type header with "application/x-www-form-urlencoded"');if(t.formData&&(n.method==="POST"||n.method==="PATCH")&&!n.headers.get("content-type")?.includes("multipart/form-data"))throw new oe(`${n.method} requests must have Content-Type header with "multipart/form-data"`);let A=Object.fromEntries(new URL(n.url).searchParams.entries()),o;if(t.jsonBody||t.commonParams)try{o=await n.clone().json()}catch{if(!t.jsonBody?.isOptional())throw new $("Error while parsing JSON body")}let s;if(t.formData)try{s=await n.clone().formData(),s=Object.fromEntries(s.entries())}catch{if(!t.formData?.isOptional())throw new $("Error while parsing form data")}let a;if(t.urlEncodedFormData)try{let l=new URLSearchParams(await n.clone().text());a=Object.fromEntries(l.entries())}catch{if(!t.urlEncodedFormData?.isOptional())throw new $("Error while parsing url encoded form data")}try{let l={...A,...typeof o=="object"?o:{}},c=!["GET","DELETE","HEAD"].includes(n.method);if(t.formData&&c&&(n.multiPartFormData=t.formData?.parse(s)),t.jsonBody&&c&&(n.jsonBody=t.jsonBody?.parse(o)),t.urlEncodedFormData&&c&&(n.urlEncodedFormData=t.urlEncodedFormData?.parse(a)),t.routeParams&&"routeParams"in n&&(n.routeParams=t.routeParams?.parse(n.routeParams)),t.queryParams){if(!n.url)throw new Error("req.url is undefined");Xr(n.url,t.queryParams,r),n.query=Xn(t.queryParams,A,r)}t.commonParams&&(n.commonParams=Xn(t.commonParams,l,r))}catch(l){throw l instanceof W?l:l instanceof zr?new se(l):new $("Error while parsing input")}},nt=t=>async(n,r,A)=>(await $r(t,n),await A(n,r));var tt=async(t,n,r)=>{try{return await r(t,n)}catch(A){let o=n.logger??console;return"_isHttpException"in A?o.warn("Caught unhandled HTTP exception thrown by EdgeSpec provided middleware. Consider adding createWithDefaultExceptionHandling middleware to your global or route spec."):o.warn("Caught unknown unhandled exception; consider adding a exception handling middleware to your global or route spec."),o.error(A),new Response(null,{status:500})}};var eA=({globalSpec:t,routeSpec:n},r)=>(r._globalSpec=t,r._routeSpec=n,{routeFn:r,routeSpec:n}),Me=t=>n=>r=>(Array.isArray(n)?n:[n]).map(A=>eA({globalSpec:t,routeSpec:A},async(o,s)=>{let a=t.onMultipleAuthMiddlewareFailures??A.onMultipleAuthMiddlewareFailures,l=new Set(A.auth==null||A.auth==="none"?[]:Array.isArray(A.auth)?A.auth:[A.auth]),c=Object.entries(t.authMiddleware).filter(([p,I])=>l.has(p)).map(([p,I])=>I);return await sn([...typeof _injectedEdgeSpecMiddleware<"u"?_injectedEdgeSpecMiddleware:[],...t.passErrors?[]:[tt],rt(t,A,!1),...t.beforeAuthMiddleware??[],tA(c,a),...t.afterAuthMiddleware??[],...A.middleware??[],Zn(A.methods),nt({supportedArrayFormats:t.supportedArrayFormats??["brackets","comma","repeat"],commonParams:A.commonParams,formData:A.multiPartFormData,jsonBody:A.jsonBody,queryParams:A.queryParams,routeParams:A.routeParams,urlEncodedFormData:A.urlEncodedFormData}),rt(t,A)],r,o,s)}));function rt(t,n,r=!1){return async(A,o,s)=>{let a=await s(A,o),l=a instanceof M?a.statusCode():a.status,c=l>=200&&l<300;try{return nA(c&&!r&&(t.shouldValidateResponses??!0),n,a)}catch(p){throw new Te(p)}}}async function sn(t,n,r,A){return await t.reduceRight((o,s)=>async(a,l)=>await s(a,l,o),async(o,s)=>n(o,s))(r,A)}function nA(t,n,r){if(!t)return"serializeToResponse"in r?r.serializeToResponse(Ne.any()):r;if(r instanceof M){if(r instanceof te)return r.serializeToResponse(n.jsonResponse??Ne.any());if(r instanceof Ie)return r.serializeToResponse(n.multipartFormDataResponse??Ne.any());if(r instanceof re)return r.serializeToResponse(Ne.any())}if("serializeToResponse"in r)throw new Error("Unknown Response type");return r}function tA(t,n){return async(r,A,o)=>{if(t.length===0)return await o(r,A);let s=[],a=!0;for(let l of t)try{return await l(r,A,async(...c)=>(a=!1,await o(...c)))}catch(c){if(a){s.push(c);continue}else throw c}throw n&&a&&n(s),s[s.length-1]}}var rA={json:M.json,multipartFormData:M.multipartFormData,custom:M.custom},an=()=>({...rA});function Fe(t,n={}){return async r=>{let{routeMatcher:A,routeMapWithHandlers:o,handle404:s=()=>new Response("Not found",{status:404})}=t,{removePathnamePrefix:a,automaticallyRemovePathnamePrefix:l=!0}=n,c=new URL(r.url).pathname;if(a){if(l)throw new Error("automaticallyRemovePathnamePrefix and removePathnamePrefix cannot both be specified");c=c.replace(a,"")}else if(r.routeParams){let _=r.routeParams,S=Object.values(_).filter(T=>Array.isArray(T));if(S.length===0)throw new Error("No wildcard route parameters found");if(S.length>1)throw new Error("Only one wildcard route parameter is supported");c=`/${S[0].join("/")}`}let{matchedRoute:p,routeParams:I}=A(c)??{},C=p&&o[p],y=zn(r,{edgeSpec:t,routeParams:I??{}});return C?await sn(n.middleware??[],async(_,S)=>{let N;for(let T of C.filter(U=>U.routeSpec.methods.includes(_.method)))try{return await T.routeFn(_,S)}catch(U){if(U instanceof se||U instanceof Ae||U instanceof H&&U.status===501){N=U;continue}throw U}throw N},y,an()):await s(y,an())}}import{z as fe}from"zod";var Ws=fe.object({rootDirectory:fe.string().optional(),tsconfigPath:fe.string().optional(),routesDirectory:fe.string().optional(),platform:fe.enum(["node","wintercg-minimal"]).default("wintercg-minimal").optional()}).strict();import{z as ir}from"zod";import{getRouteMatcher as AA}from"next-route-matcher";function At(t){let n={routeMatcher:AA(Object.keys(t)),routeMapWithHandlers:t,makeRequest:async(r,A)=>await Fe(n,A)(r)};return n}import cn from"kleur";var ot=({coloredLogs:t=!0,logWhen:n=A=>A>=500,includeStackTraceInResponse:r=!0}={})=>async(A,o,s)=>{try{return await s(A,o)}catch(a){let l;if("_isHttpException"in a?l=Response.json({message:a.message,stack:r?a.stack:void 0},{status:a.status}):l=Response.json({message:"Internal server error",stack:r?a.stack:void 0},{status:500}),n(l.status,a)){let c=o.logger??console;cn.enabled=t;let{pathname:p}=new URL(A.url),I=l.status>=500?cn.bgRed(`${p} threw an error`):cn.bgYellow(`${p} threw an error`);c.error(`${I}: ${a instanceof Error?a.stack:a.toString()}`)}return l}};import Le from"zod";import{getRouteMatcher as oA}from"next-route-matcher";var ln=t=>`${t}_id`,sA=t=>`${t}s`,iA=t=>t instanceof Le.ZodObject?t.shape:t instanceof Le.ZodEffects?t.innerType().shape:{},hn=t=>typeof t=="function"?t():t;var dn=class t{constructor(n,r,A){this.spec=n;this.models=r;this.modelName=A}trigger_fns=[];triggers={change:(...n)=>{this.trigger_fns.forEach(r=>r.change?.(...n))}};registerTrigger(n){return this.trigger_fns.push(n),n}unregisterTrigger(n){this.trigger_fns=this.trigger_fns.filter(r=>r!==n)}createNewInstance(n){return new t(this.spec,n,this.modelName)}_type;_store={};get store(){return Object.fromEntries(Object.entries(this._store).map(([r,A])=>[r,{...A,...Object.fromEntries(this.spec.hasOne?.map(o=>[o,()=>this.models[o].select().where(s=>s[this.models[o].spec.primaryKey]===A[ln(o)]).executeTakeFirstOrThrow()])??[]),...Object.fromEntries(Object.entries(this.models).filter(([o,s])=>s.spec.hasOne?.includes(this.modelName)).map(([o,s])=>[sA(o),()=>s.select().where(a=>a[ln(this.modelName)]===r).execute()]))}]))}get(n){return this.store[n]}getOrThrow(n,r){let A=this.get(n);if(!A)throw r?hn(r):new Error("No result found");return A}select(){return new Ue(this)}update(){return new Ue(this)}insert(){return new un(this)}delete(){return this.select().delete()}},Ue=class{constructor(n){this.root=n}whereRules=[];where(n){return this.whereRules.push(n),this}updates=[];set(n){return this.updates.push(typeof n=="function"?n:()=>n),this}delete_mode=!1;delete(){return this.delete_mode=!0,this}execute(){let n=()=>Object.values(this.root.store).filter(r=>this.whereRules.every(A=>A(r)));if(this.updates.length>0||this.delete_mode)for(let r of n()){let A=r[this.root.spec.primaryKey],o=this.root._store[A]??null,s=null;if(this.updates.length>0){let a={};for(let l of this.updates)a={...a,...l(r)};if(this.root.spec.primaryKey in a)throw new Error("Cannot update primary key");this.root._store[A]={...this.root._store[A],...a},s=this.root._store[A]}else this.delete_mode&&delete this.root._store[A];(s||o)&&this.root.triggers.change?.({model:this.root.modelName,store:this.root,new_val:s,old_val:o})}return n()}executeTakeFirst(){return this.updates.length>0?this.execute()[0]:Object.values(this.root.store).find(n=>this.whereRules.every(r=>r(n)))}executeTakeFirstOrThrow(n){let r=this.executeTakeFirst();if(!r)throw n?hn(n):new Error("No result(s) found");return r}},un=class{constructor(n){this.root=n}changes=[];on_conflict;get spec(){return this.root.spec}get store(){return this.root.store}get primaryKey(){return this.spec.primaryKey}values(n){let r=Array.isArray(n)?n:[n];return this.changes.push(...r.map(A=>this.spec.schema.and(Le.object(Object.fromEntries(this.spec.hasOne?.map(o=>{let s=this.root.models[o].spec;return[ln(o),iA(s.schema)?.[s.primaryKey]??Le.string()]})??[]))).parse(A))),this}onAllConflictMerge=()=>(this.on_conflict="mergeall",this);onAllConflictDoNothing=()=>(this.on_conflict="donothing",this);execute(){let n=null,r=null;for(let A of this.changes)if(this.root._store[A[this.primaryKey]]){if(this.on_conflict==="mergeall")n??=this.root._store[A[this.primaryKey]],r={...this.root._store[A[this.primaryKey]],...A},this.root._store[A[this.primaryKey]]=r;else if(this.on_conflict!=="donothing")throw new Error("Duplicate primary key!")}else n??=this.root._store[A[this.primaryKey]],r=A,this.root._store[A[this.primaryKey]]=A;return(r||n)&&this.root.triggers.change?.({model:this.root.modelName,store:this.root,new_val:r,old_val:n}),this.changes.map(A=>this.store[A[this.primaryKey]])}executeTakeFirst(){return this.execute()[0]}executeTakeFirstOrThrow(n){let r=this.executeTakeFirst();if(!r)throw n?hn(n):new Error("No result!");return r}};var aA=t=>{let n={};return Object.assign(n,Object.fromEntries(Object.entries(t).map(([r,A])=>[r,new dn(A,n,r)]))),n};function st(t){let{models:n,globalSpec:r}=t,A=()=>{let a=aA(n);for(let[c,p]of Object.entries(t.triggers??{}))a[c].registerTrigger(p);return{store:a,middleware:async(c,p,I)=>(p.store=a,await I(c,p))}},o=async(a,l,c)=>{if(!l.store)throw new Error("Store not supplied");return await c(a,l)},s=Me({...r,beforeAuthMiddleware:[...r.beforeAuthMiddleware??[],o]});return new pn(s,{},A,{cleanup:async()=>{},integrationSpec:t})}var gn=class extends H{constructor(n="Not Implemented"){super(n,501)}},cA=()=>{throw new gn("Not Implemented")},pn=class{constructor(n,r,A,o){this.createWithRouteFn=n;this.routeMap=r;this.createStoreBundle=A;this.options=o}implementRoute(n,r,A){return this.routeMap={...this.routeMap,[n]:[...this.routeMap[n]??[],{...A?{routeFn:this.createWithRouteFn(r)(A)[0].routeFn}:{routeFn:cA},routeSpec:r}]},this}build(){let n={routeMatcher:oA(Object.keys(this.routeMap)),routeMapWithHandlers:this.routeMap,makeRequest:async(r,A)=>await Fe(n,A)(r)};return{edgeSpecRouteBundle:n,_globalSpec:{}}}};import{z as u}from"zod";var lA=u.object({subscriptionId:u.string().describe("The subscription ID.").readonly().optional(),availabilityZone:u.string().describe("The availabilityZone.").readonly().optional()}).describe("Information about shared availability zone."),dA=u.object({locationPlacementId:u.string().describe("The subscription location placement ID. The ID indicates which regions are visible for a subscription. For example, a subscription with a location placement Id of Public_2014-09-01 has access to Azure public regions.").readonly().optional(),quotaId:u.string().describe("The subscription quota ID.").readonly().optional(),spendingLimit:u.enum(["On","Off","CurrentPeriodOff"]).describe("The subscription spending limit.").readonly().optional()}).describe("Subscription policies."),uA=u.object({availabilityZone:u.string().describe("The availabilityZone.").readonly().optional(),peers:u.array(lA).describe("Details of shared availability zone.").optional()}).describe("List of availability zones shared by the subscriptions."),gA=u.object({name:u.string().describe("Operation name: {provider}/{resource}/{operation}").optional(),display:u.any().describe("The object that represents the operation.").optional()}).describe("Microsoft.Resources operation"),pA=u.object({message:u.string().describe("Description of the error.").optional(),code:u.string().describe("Code of the error.").optional()}).describe("Error description and code explaining why resource name is invalid."),hA=u.object({id:u.string().describe("The fully qualified ID of the tenant. For example, /tenants/00000000-0000-0000-0000-000000000000.").readonly().optional(),tenantId:u.string().describe("The tenant ID. For example, 00000000-0000-0000-0000-000000000000.").readonly().optional()}).describe("Tenant Id information."),be=u.object({id:u.string().describe("The fully qualified ID for the subscription. For example, /subscriptions/00000000-0000-0000-0000-000000000000.").readonly().optional(),subscriptionId:u.string().describe("The subscription ID.").readonly().optional(),displayName:u.string().describe("The subscription display name.").readonly().optional(),state:u.enum(["Enabled","Warned","PastDue","Disabled","Deleted"]).describe("The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted.").readonly().optional(),subscriptionPolicies:dA.optional(),authorizationSource:u.string().describe("The authorization source of the request. Valid values are one or more combinations of Legacy, RoleBased, Bypassed, Direct and Management. For example, 'Legacy, RoleBased'.").optional()}).describe("Subscription information."),EA=u.object({id:u.string().describe("The fully qualified ID of the location. For example, /subscriptions/00000000-0000-0000-0000-000000000000/locations/westus.").readonly().optional(),subscriptionId:u.string().describe("The subscription ID.").readonly().optional(),name:u.string().describe("The location name.").readonly().optional(),displayName:u.string().describe("The display name of the location.").readonly().optional(),latitude:u.string().describe("The latitude of the location.").readonly().optional(),longitude:u.string().describe("The longitude of the location.").readonly().optional()}).describe("Location information."),mA=u.object({subscriptionId:u.string().describe("The subscription ID.").readonly().optional(),location:u.string().describe("the location of the subscription.").optional(),availabilityZonePeers:u.array(uA).describe("The Availability Zones shared by the subscriptions.").optional()}).describe("Result of the Check zone peers operation."),QA=u.object({location:u.string().describe("The Microsoft location.").optional(),subscriptionIds:u.array(u.string()).describe("The peer Microsoft Azure subscription ID.").optional()}).describe("Check zone peers request parameters."),IA=u.object({value:u.array(gA).describe("List of Microsoft.Resources operations.").optional(),nextLink:u.string().describe("URL to get the next set of operation list results if there are any.").optional()}).describe("Result of the request to list Microsoft.Resources operations. It contains a list of operations and a URL link to get the next set of results."),Ci=u.object({error:pA.optional()}).describe("Error response."),CA=u.object({name:u.string().describe("Name of Resource").optional(),type:u.string().describe("Type of Resource").optional(),status:u.enum(["Allowed","Reserved"]).describe("Is the resource name Allowed or Reserved").optional()}).describe("Resource Name valid if not a reserved word, does not contain a reserved word and does not start with a reserved word"),BA=u.object({name:u.string().describe("Name of the resource"),type:u.string().describe("The type of the resource")}).describe("Name and Type of the Resource"),fA=u.object({value:u.array(hA).describe("An array of tenants.").optional(),nextLink:u.string().describe("The URL to use for getting the next set of results.")}).describe("Tenant Ids information."),bA=u.object({value:u.array(be).describe("An array of subscriptions.").optional(),nextLink:u.string().describe("The URL to get the next set of results.")}).describe("Subscription list operation response."),yA=u.object({value:u.array(EA).describe("An array of locations.").optional()}).describe("Location list operation response."),it={"/providers/Microsoft.Resources/operations":[{methods:["GET"],queryParams:u.object({"api-version":u.string().describe("The API version to use for the operation.")}),routeParams:u.object({}),jsonResponse:IA.describe("OK. The request has succeeded.")}],"/subscriptions/[subscriptionId]/locations":[{methods:["GET"],queryParams:u.object({"api-version":u.string().describe("The API version to use for the operation.")}),routeParams:u.object({subscriptionId:u.string().describe("The ID of the target subscription.")}),jsonResponse:yA.describe("OK - Returns an array of locations.")}],"/subscriptions/[subscriptionId]":[{methods:["GET"],queryParams:u.object({"api-version":u.string().describe("The API version to use for the operation.")}),routeParams:u.object({subscriptionId:u.string().describe("The ID of the target subscription.")}),jsonResponse:be.describe("OK - Returns information about the subscription.")}],"/subscriptions":[{methods:["GET"],queryParams:u.object({"api-version":u.string().describe("The API version to use for the operation.")}),routeParams:u.object({}),jsonResponse:bA.describe("OK - Returns an array of subscriptions.")}],"/tenants":[{methods:["GET"],queryParams:u.object({"api-version":u.string().describe("The API version to use for the operation.")}),routeParams:u.object({}),jsonResponse:fA.describe("OK - Returns an array of tenants.")}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/checkZonePeers/":[{methods:["POST"],queryParams:u.object({"api-version":u.string().describe("The API version to use for the operation.")}),routeParams:u.object({subscriptionId:u.string().describe("The ID of the target subscription.")}),jsonBody:QA.describe("Parameters for checking zone peers."),jsonResponse:mA.describe("OK - Returns information about the logical availability zone mapping between subscriptions.")}],"/providers/Microsoft.Resources/checkResourceName":[{methods:["POST"],queryParams:u.object({"api-version":u.string().describe("The API version to use for the operation.")}),routeParams:u.object({}),jsonBody:BA.describe("Resource object with values for resource name and resource type"),jsonResponse:CA.describe("OK - Returns status as allowed or not.")}]};import{z as _A}from"zod";var at=_A.string().transform(t=>{let n=t.match(/^Bearer\s+(.+)$/);if(n)return n[1];throw new Error("Invalid Bearer token format")});import{z as e}from"zod";import{z as g}from"zod";var RA=g.object({keyIdentifier:g.string().describe("Key vault uri to access the encryption key.").optional(),identity:g.string().describe("The client ID of the identity which will be used to access key vault.").optional()}),kA=g.object({name:g.string().describe('The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action"').readonly().optional(),isDataAction:g.boolean().describe('Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for ARM/control-plane operations.').readonly().optional(),display:g.object({provider:g.string().describe('The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute".').readonly().optional(),resource:g.string().describe('The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections".').readonly().optional(),operation:g.string().describe('The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine".').readonly().optional(),description:g.string().describe("The short, localized friendly description of the operation; suitable for tool tips and detailed views.").readonly().optional()}).describe("Localized display information for this particular operation.").optional(),origin:g.enum(["user","system","user,system"]).describe('The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system"').readonly().optional(),actionType:g.literal("Internal").describe('Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs.').readonly().optional()}).describe("Details of a REST API operation, returned from the Resource Provider Operations API"),wA=g.object({type:g.string().describe("The additional info type.").readonly().optional(),info:g.record(g.any()).describe("The additional info.").readonly().optional()}).describe("The resource management error additional info."),SA=g.object({name:g.string().describe("A user defined name of the 3rd Party Artifact that is being procured."),publisher:g.string().describe("The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic"),product:g.string().describe("The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. "),promotionCode:g.string().describe("A publisher provided promotion code as provisioned in Data Market for the said product/artifact.").optional(),version:g.string().describe("The version of the desired product/artifact.").optional()}).describe("Plan for the resource."),vA=g.object({name:g.string().describe("The name of the SKU. Ex - P3. It is typically a letter+number code"),tier:g.enum(["Free","Basic","Standard","Premium"]).describe("This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT.").optional(),size:g.string().describe("The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. ").optional(),family:g.string().describe("If the service has different generations of hardware, for the same SKU, then that can be captured here.").optional(),capacity:g.number().int().describe("If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted.").optional()}).describe("The resource model definition representing SKU"),DA=g.object({principalId:g.string().describe("The principal ID of resource identity.").readonly().optional(),tenantId:g.string().describe("The tenant ID of resource.").readonly().optional(),type:g.literal("SystemAssigned").describe("The identity type.").optional()}).describe("Identity for the resource."),En=g.object({id:g.string().describe("Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}").readonly().optional(),name:g.string().describe("The name of the resource").readonly().optional(),type:g.string().describe('The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"').readonly().optional()}).describe("Common fields that are returned in the response for all Azure Resource Manager resources"),_i=g.object({status:g.enum(["enabled","disabled"]).describe("Indicates whether or not the encryption is enabled for container registry.").optional(),keyVaultProperties:RA.optional()}).describe("Configuration of key for data encryption"),Ri=g.object({createdBy:g.string().describe("The identity that created the resource.").optional(),createdByType:g.enum(["User","Application","ManagedIdentity","Key"]).describe("The type of identity that created the resource.").optional(),createdAt:g.string().datetime({offset:!0}).describe("The timestamp of resource creation (UTC).").optional(),lastModifiedBy:g.string().describe("The identity that last modified the resource.").optional(),lastModifiedByType:g.enum(["User","Application","ManagedIdentity","Key"]).describe("The type of identity that last modified the resource.").optional(),lastModifiedAt:g.string().datetime({offset:!0}).describe("The timestamp of resource last modification (UTC)").optional()}).describe("Metadata pertaining to creation and last modification of the resource.").readonly(),ki=g.object({name:g.string().max(256).describe("A canonical name for the geographic or physical location."),city:g.string().describe("The city or locality where the resource is located.").optional(),district:g.string().describe("The district, state, or province where the resource is located.").optional(),countryOrRegion:g.string().describe("The country or region where the resource is located").optional()}).describe("Metadata pertaining to the geographic location of the resource."),wi=g.object({value:g.array(kA).describe("List of operations supported by the resource provider").readonly().optional(),nextLink:g.string().describe("URL to get the next set of operation list results (if there are any).").readonly().optional()}).describe("A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results."),ie=g.object({code:g.string().describe("The error code.").readonly().optional(),message:g.string().describe("The error message.").readonly().optional(),target:g.string().describe("The error target.").readonly().optional(),details:g.array(g.any()).describe("The error details.").readonly().optional(),additionalInfo:g.array(wA).describe("The error additional info.").readonly().optional()}).describe("Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.)"),Si=g.object({id:g.string().describe("Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}").readonly().optional(),name:g.string().describe("The name of the resource").readonly().optional(),type:g.string().describe('The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"').readonly().optional(),location:g.string().describe("The geo-location where the resource lives").optional(),managedBy:g.string().describe("The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource.").optional(),kind:g.string().regex(new RegExp("^[-\\w\\._,\\(\\)]+$")).describe("Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value.").optional(),etag:g.string().describe("The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. ").readonly().optional(),tags:g.record(g.string()).describe("Resource tags.").optional(),identity:DA.optional(),sku:vA.optional(),plan:SA.optional()}).describe("The resource model definition containing the full set of allowed properties for a resource. Except properties bag, there cannot be a top level property outside of this set."),vi=g.record(g.any()).and(En).describe("The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location"),Di=g.object({tags:g.record(g.string()).describe("Resource tags.").optional(),location:g.string().describe("The geo-location where the resource lives")}).and(En).describe("The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location'"),Ti=g.object({etag:g.string().describe("Resource Etag.").readonly().optional()}).and(En).describe("The resource model definition for an Azure Resource Manager resource with an etag.");import{z as d}from"zod";import{z as P}from"zod";var TA=P.enum(["None","SystemAssigned"]).describe("Type of managed service identity (either system assigned, or none)."),NA=P.object({principalId:P.string().uuid().describe("The principal ID of the assigned identity.").readonly().optional(),clientId:P.string().uuid().describe("The client ID of the assigned identity.").readonly().optional()}).describe("User assigned identity properties"),MA=P.enum(["None","SystemAssigned","UserAssigned","SystemAssigned,UserAssigned"]).describe("Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed)."),Fi=P.object({principalId:P.string().uuid().describe("The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.").readonly().optional(),tenantId:P.string().uuid().describe("The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.").readonly().optional(),type:TA}).describe("Managed service identity (either system assigned, or none)"),ct=P.object({principalId:P.string().uuid().describe("The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.").readonly().optional(),tenantId:P.string().uuid().describe("The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.").readonly().optional(),type:MA,userAssignedIdentities:P.record(NA).describe("The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests.").optional()}).describe("Managed service identity (system assigned and/or user assigned identities)");var FA=d.object({createdBy:d.string().describe("The identity that created the resource.").optional(),createdByType:d.enum(["User","Application","ManagedIdentity","Key"]).describe("The type of identity that created the resource.").optional(),createdAt:d.string().datetime({offset:!0}).describe("The timestamp of resource creation (UTC).").optional(),lastModifiedBy:d.string().describe("The identity that last modified the resource.").optional(),lastModifiedByType:d.enum(["User","Application","ManagedIdentity","Key"]).describe("The type of identity that last modified the resource.").optional(),lastModifiedAt:d.string().datetime({offset:!0}).describe("The timestamp of resource last modification (UTC)").optional()}).describe("Metadata pertaining to creation and last modification of the resource.").readonly(),mn=d.object({type:d.string().describe("The additional info type.").readonly().optional(),info:d.record(d.any()).describe("The additional info.").readonly().optional()}).describe("The resource management error additional info."),Qn=d.object({id:d.string().describe('Fully qualified resource ID for the resource. E.g. "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}"').readonly().optional(),name:d.string().describe("The name of the resource").readonly().optional(),type:d.string().describe('The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"').readonly().optional(),systemData:FA.optional()}).describe("Common fields that are returned in the response for all Azure Resource Manager resources"),LA=d.enum(["Free","Basic","Standard","Premium"]).describe("This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT."),UA=d.object({keyIdentifier:d.string().describe("Key vault uri to access the encryption key.").optional(),identity:d.string().describe("The client ID of the identity which will be used to access key vault.").optional()}),Pe=d.object({code:d.string().describe("The error code.").readonly().optional(),message:d.string().describe("The error message.").readonly().optional(),target:d.string().describe("The error target.").readonly().optional(),details:d.array(d.any()).describe("The error details.").readonly().optional(),additionalInfo:d.array(mn).describe("The error additional info.").readonly().optional()}).describe("The error detail."),PA=d.object({name:d.string().describe('The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action"').readonly().optional(),isDataAction:d.boolean().describe('Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for ARM/control-plane operations.').readonly().optional(),display:d.object({provider:d.string().describe('The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute".').readonly().optional(),resource:d.string().describe('The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections".').readonly().optional(),operation:d.string().describe('The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine".').readonly().optional(),description:d.string().describe("The short, localized friendly description of the operation; suitable for tool tips and detailed views.").readonly().optional()}).describe("Localized display information for this particular operation.").optional(),origin:d.enum(["user","system","user,system"]).describe('The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system"').readonly().optional(),actionType:d.literal("Internal").describe('Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs.').readonly().optional()}).describe("Details of a REST API operation, returned from the Resource Provider Operations API"),xA=d.object({tags:d.record(d.string()).describe("Resource tags.").optional(),location:d.string().describe("The geo-location where the resource lives")}).and(Qn).describe("The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location'"),qA=d.object({name:d.string().describe("A user defined name of the 3rd Party Artifact that is being procured."),publisher:d.string().describe("The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic"),product:d.string().describe("The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. "),promotionCode:d.string().describe("A publisher provided promotion code as provisioned in Data Market for the said product/artifact.").optional(),version:d.string().describe("The version of the desired product/artifact.").optional()}).describe("Plan for the resource."),GA=d.object({name:d.string().describe("The name of the SKU. E.g. P3. It is typically a letter+number code"),tier:LA.optional(),size:d.string().describe("The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. ").optional(),family:d.string().describe("If the service has different generations of hardware, for the same SKU, then that can be captured here.").optional(),capacity:d.number().int().describe("If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted.").optional()}).describe("The resource model definition representing SKU"),xi=d.object({nameAvailable:d.boolean().describe("Indicates if the resource name is available.").optional(),reason:d.enum(["Invalid","AlreadyExists"]).describe("The reason why the given name is not available.").optional(),message:d.string().describe("Detailed reason why the given name is available.").optional()}).describe("The check availability result."),qi=d.object({name:d.string().describe("The name of the resource for which availability needs to be checked.").optional(),type:d.string().describe("The resource type.").optional()}).describe("The check availability request body."),Gi=d.object({status:d.enum(["enabled","disabled"]).describe("Indicates whether or not the encryption is enabled for container registry.").optional(),keyVaultProperties:UA.optional()}).describe("Configuration of key for data encryption"),Oi=d.object({name:d.string().max(256).describe("A canonical name for the geographic or physical location."),city:d.string().describe("The city or locality where the resource is located.").optional(),district:d.string().describe("The district, state, or province where the resource is located.").optional(),countryOrRegion:d.string().describe("The country or region where the resource is located").optional()}).describe("Metadata pertaining to the geographic location of the resource."),Hi=d.object({id:d.string().describe("Fully qualified ID for the async operation.").optional(),resourceId:d.string().describe("Fully qualified ID of the resource against which the original async operation was started.").readonly().optional(),name:d.string().describe("Name of the async operation.").optional(),status:d.string().describe("Operation status."),percentComplete:d.number().gte(0).lte(100).describe("Percent of the operation that is complete.").optional(),startTime:d.string().datetime({offset:!0}).describe("The start time of the operation.").optional(),endTime:d.string().datetime({offset:!0}).describe("The end time of the operation.").optional(),operations:d.array(d.any()).describe("The operations list.").optional(),error:Pe.optional()}).describe("The current status of an async operation."),Ji=d.object({value:d.array(PA).describe("List of operations supported by the resource provider").readonly().optional(),nextLink:d.string().url().describe("URL to get the next set of operation list results (if there are any).").readonly().optional()}).describe("A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results."),Yi=d.object({error:Pe.optional()}).describe("Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.)."),ji=d.object({managedBy:d.string().describe("The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource.").optional(),kind:d.string().regex(new RegExp("^[-\\w\\._,\\(\\)]+$")).describe("Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value.").optional(),etag:d.string().describe("The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. ").readonly().optional(),identity:ct.optional(),sku:GA.optional(),plan:qA.optional()}).and(xA).describe("The resource model definition containing the full set of allowed properties for a resource. Except properties bag, there cannot be a top level property outside of this set."),Vi=d.record(d.any()).and(Qn).describe("The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location"),Wi=d.object({etag:d.string().describe("Resource Etag.").readonly().optional()}).and(Qn).describe("The resource model definition for an Azure Resource Manager resource with an etag.");var It=e.object({type:e.enum(["NotSpecified","Any","String","Object","Array","Integer","Number","Boolean"]).describe("The type of the token that the alias path is referring to.").readonly().optional(),attributes:e.enum(["None","Modifiable"]).describe("The attributes of the token that the alias path is referring to.").readonly().optional()}),Ct=e.object({phrase:e.string().describe("The alias pattern phrase.").optional(),variable:e.string().describe("The alias pattern variable.").optional(),type:e.enum(["NotSpecified","Extract"]).describe("The type of alias pattern").optional()}).describe("The type of the pattern for an alias path."),OA=e.object({path:e.string().describe("The path of an alias.").optional(),apiVersions:e.array(e.string()).describe("The API versions.").optional(),pattern:Ct.optional(),metadata:It.optional()}).describe("The type of the paths for alias."),HA=e.object({profileVersion:e.string().describe("The profile version.").readonly().optional(),apiVersion:e.string().describe("The API version.").readonly().optional()}),JA=e.object({location:e.string().describe("The location of the zone mapping.").optional(),zones:e.array(e.string()).optional()}),YA=e.object({name:e.string().describe("The alias name.").optional(),paths:e.array(OA).describe("The paths for an alias.").optional(),type:e.enum(["NotSpecified","PlainText","Mask"]).describe("The type of the alias.").optional(),defaultPath:e.string().describe("The default path for an alias.").optional(),defaultPattern:Ct.optional(),defaultMetadata:It.optional()}).describe("The alias type. "),jA=e.object({location:e.string().describe("The azure location.").optional(),type:e.string().describe("The extended location type.").optional(),extendedLocations:e.array(e.string()).describe("The extended locations for the azure location.").optional()}).describe("The provider extended location. "),VA=e.object({id:e.string().describe("Azure Key Vault resource id.")}).describe("Azure Key Vault reference."),WA=e.object({type:e.literal("EdgeZone").describe("The extended location type.").optional(),name:e.string().describe("The extended location name.").optional()}).describe("Resource extended location."),zA=e.object({id:e.string().describe("The ID of the dependency.").optional(),resourceType:e.string().describe("The dependency resource type.").optional(),resourceName:e.string().describe("The dependency resource name.").optional()}).describe("Deployment dependency information."),Bt=e.object({resourceType:e.string().describe("The resource type.").optional(),locations:e.array(e.string()).describe("The collection of locations where this resource type can be created.").optional(),locationMappings:e.array(jA).describe("The location mappings that are supported by this resource type.").optional(),aliases:e.array(YA).describe("The aliases that are supported by this resource type.").optional(),apiVersions:e.array(e.string()).describe("The API version.").optional(),defaultApiVersion:e.string().describe("The default API version.").readonly().optional(),zoneMappings:e.array(JA).optional(),apiProfiles:e.array(HA).describe("The API profiles for the resource provider.").readonly().optional(),capabilities:e.string().describe("The additional capabilities offered by this resource type.").optional(),properties:e.record(e.string().describe("The additional properties. ")).describe("The properties.").optional()}).describe("Resource type managed by the resource provider."),KA=e.object({keyVault:VA,secretName:e.string().describe("Azure Key Vault secret name."),secretVersion:e.string().describe("Azure Key Vault secret version.").optional()}).describe("Azure Key Vault parameter reference."),ZA=e.object({actions:e.array(e.string()).describe("Allowed actions.").optional(),notActions:e.array(e.string()).describe("Denied actions.").optional(),dataActions:e.array(e.string()).describe("Allowed Data actions.").optional(),notDataActions:e.array(e.string()).describe("Denied Data actions.").optional()}).describe("Role definition permissions.").readonly(),XA=e.object({path:e.string().describe("The path of the property."),propertyChangeType:e.enum(["Create","Delete","Modify","Array","NoEffect"]).describe("The type of property change."),before:e.record(e.any()).describe("The value of the property before the deployment is executed.").optional(),after:e.record(e.any()).describe("The value of the property after the deployment is executed.").optional(),children:e.array(e.any()).describe("Nested property changes.").optional()}).describe("The predicted change to the resource property."),lt=e.object({content:e.record(e.any()).describe("HTTP message content.").optional()}).describe("HTTP message."),$A=e.object({id:e.string().describe("The ID of the resource.").optional(),resourceName:e.string().describe("The name of the resource.").optional(),resourceType:e.string().describe("The type of the resource.").optional()}).describe("Target resource."),eo=e.object({status:e.string().describe("Status of the deployment operation.").optional(),error:ie.optional()}).describe("Operation status message object."),ft=e.object({type:e.string().describe("Type of count.").optional(),value:e.number().int().describe("Value of count.").optional()}).describe("Tag count."),no=e.object({id:e.string().describe("Resource ID").readonly().optional(),name:e.string().describe("Resource name").readonly().optional(),type:e.string().describe("Resource type").readonly().optional(),location:e.string().describe("Resource location").optional(),extendedLocation:WA.optional(),tags:e.record(e.string()).describe("Resource tags").optional()}).describe("Specified resource."),to=e.object({principalId:e.string().describe("The principal ID of resource identity.").readonly().optional(),tenantId:e.string().describe("The tenant ID of resource.").readonly().optional(),type:e.enum(["SystemAssigned","UserAssigned","SystemAssigned, UserAssigned","None"]).describe("The identity type.").optional(),userAssignedIdentities:e.record(e.object({principalId:e.string().describe("The principal id of user assigned identity.").readonly().optional(),clientId:e.string().describe("The client id of user assigned identity.").readonly().optional()})).describe("The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.").optional()}).describe("Identity for the resource."),ro=e.object({name:e.string().describe("The SKU name.").optional(),tier:e.string().describe("The SKU tier.").optional(),size:e.string().describe("The SKU size.").optional(),family:e.string().describe("The SKU family.").optional(),model:e.string().describe("The SKU model.").optional(),capacity:e.number().int().describe("The SKU capacity.").optional()}).describe("SKU for the resource."),Ao=e.object({name:e.string().describe("The plan ID.").optional(),publisher:e.string().describe("The publisher ID.").optional(),product:e.string().describe("The offer ID.").optional(),promotionCode:e.string().describe("The promotion code.").optional(),version:e.string().describe("The plan's version.").optional()}).describe("Plan for the resource."),bt=e.object({level:e.enum(["Warning","Info","Error"]).describe("Denotes the additional response level.").readonly(),code:e.string().describe("The error code.").readonly(),message:e.string().describe("The error message.").readonly(),target:e.string().describe("The error target.").readonly().optional(),additionalInfo:e.array(mn).describe("The error additional info.").readonly().optional()}),dt=e.object({id:e.string().describe("The fully qualified resource Id.").readonly().optional()}).describe("The resource Id model."),oo=e.object({provisioningState:e.string().describe("The state of the provisioning for the on error deployment.").readonly().optional(),type:e.enum(["LastSuccessful","SpecificDeployment"]).describe("The deployment on error behavior type. Possible values are LastSuccessful and SpecificDeployment.").optional(),deploymentName:e.string().describe("The deployment to be used on error case.").optional()}).describe("Deployment on error behavior with additional details."),yt=e.object({detailLevel:e.string().describe("Specifies the type of information to log for debugging. The permitted values are none, requestContent, responseContent, or both requestContent and responseContent separated by a comma. The default is none. When setting this value, carefully consider the type of information you are passing in during deployment. By logging information about the request or response, you could potentially expose sensitive data that is retrieved through the deployment operations.").optional()}).describe("The debug setting."),_t=e.object({uri:e.string().describe("The URI of the parameters file."),contentVersion:e.string().describe("If included, must match the ContentVersion in the template.").optional()}).describe("Entity representing the reference to the deployment parameters."),Rt=e.object({uri:e.string().describe("The URI of the template to deploy. Use either the uri or id property, but not both.").optional(),id:e.string().describe("The resource id of a Template Spec. Use either the id or uri property, but not both.").optional(),relativePath:e.string().describe("The relativePath property can be used to deploy a linked template at a location relative to the parent. If the parent template was linked with a TemplateSpec, this will reference an artifact in the TemplateSpec.  If the parent was linked with a URI, the child deployment will be a combination of the parent and relativePath URIs").optional(),contentVersion:e.string().describe("If included, must match the ContentVersion in the template.").optional(),queryString:e.string().describe("The query string (for example, a SAS token) to be used with the templateLink URI.").optional()}).describe("Entity representing the reference to the template."),so=e.object({dependsOn:e.array(zA).describe("The list of dependencies.").optional(),id:e.string().describe("The ID of the dependency.").optional(),resourceType:e.string().describe("The dependency resource type.").optional(),resourceName:e.string().describe("The dependency resource name.").optional()}).describe("Deployment dependency information."),le=e.object({id:e.string().describe("The provider ID.").readonly().optional(),namespace:e.string().describe("The namespace of the resource provider.").optional(),registrationState:e.string().describe("The registration state of the resource provider.").readonly().optional(),registrationPolicy:e.string().describe("The registration policy of the resource provider.").readonly().optional(),resourceTypes:e.array(Bt).describe("The collection of provider resource types.").readonly().optional(),providerAuthorizationConsentState:e.enum(["NotSpecified","Required","NotRequired","Consented"]).describe("The provider authorization consent state.").optional()}).describe("Resource provider information."),io=e.object({scope:e.enum(["NotSpecified","Outer","Inner"]).describe("The scope to be used for evaluation of parameters, variables and functions in a nested template.").optional()}).describe("Specifies whether template expressions are evaluated within the scope of the parent template or nested template."),ao=e.object({type:e.enum(["LastSuccessful","SpecificDeployment"]).describe("The deployment on error behavior type. Possible values are LastSuccessful and SpecificDeployment.").optional(),deploymentName:e.string().describe("The deployment to be used on error case.").optional()}).describe("Deployment on error behavior."),co=e.object({value:e.any().describe("Input value to the parameter .").optional(),reference:KA.optional()}).describe("Deployment parameter for the template."),ut=e.object({id:e.string().describe("The role definition ID.").optional(),name:e.string().describe("The role definition name.").optional(),isServiceRole:e.boolean().describe("If this is a service role.").optional(),permissions:e.array(ZA).describe("Role definition permissions.").optional(),scopes:e.array(e.string()).describe("Role definition assignable scopes.").optional()}).describe("Role definition properties."),gt=e.object({resourceId:e.string().describe("Resource ID"),changeType:e.enum(["Create","Delete","Ignore","Deploy","NoChange","Modify","Unsupported"]).describe("Type of change that will be made to the resource when the deployment is executed."),unsupportedReason:e.string().describe("The explanation about why the resource is unsupported by What-If.").optional(),before:e.record(e.any()).describe("The snapshot of the resource before the deployment is executed.").optional(),after:e.record(e.any()).describe("The predicted snapshot of the resource after the deployment is executed.").optional(),delta:e.array(XA).describe("The predicted changes to resource properties.").optional()}).describe("Information about a single resource change predicted by What-If operation."),lo=e.object({provisioningOperation:e.enum(["NotSpecified","Create","Delete","Waiting","AzureAsyncOperationWaiting","ResourceCacheWaiting","Action","Read","EvaluateDeploymentOutput","DeploymentCleanup"]).describe("The name of the current provisioning operation.").readonly().optional(),provisioningState:e.string().describe("The state of the provisioning.").readonly().optional(),timestamp:e.string().datetime({offset:!0}).describe("The date and time of the operation.").readonly().optional(),duration:e.string().describe("The duration of the operation.").readonly().optional(),serviceRequestId:e.string().describe("Deployment operation service request id.").readonly().optional(),statusCode:e.string().describe("Operation status code from the resource provider. This property may not be set if a response has not yet been received.").readonly().optional(),statusMessage:eo.optional(),targetResource:$A.optional(),request:lt.optional(),response:lt.optional()}).describe("Deployment operation properties."),In=e.object({id:e.string().describe("The tag value ID.").readonly().optional(),tagValue:e.string().describe("The tag value.").optional(),count:ft.optional()}).describe("Tag information."),kt=e.object({provisioningState:e.string().describe("The provisioning state. ").readonly().optional()}).describe("The resource group properties."),F=e.object({plan:Ao.optional(),properties:e.record(e.any()).describe("The resource properties.").optional(),kind:e.string().regex(new RegExp("^[-\\w\\._,\\(\\)]+$")).describe("The kind of the resource.").optional(),managedBy:e.string().describe("ID of the resource that manages this resource.").optional(),sku:ro.optional(),identity:to.optional()}).and(no).describe("Resource information."),uo=e.object({provisioningState:e.enum(["NotSpecified","Accepted","Running","Ready","Creating","Created","Deleting","Deleted","Canceled","Failed","Succeeded","Updating"]).describe("Denotes the state of provisioning.").readonly().optional(),correlationId:e.string().describe("The correlation ID of the deployment.").readonly().optional(),timestamp:e.string().datetime({offset:!0}).describe("The timestamp of the template deployment.").readonly().optional(),duration:e.string().describe("The duration of the template deployment.").readonly().optional(),outputs:e.record(e.any()).describe("Key/value pairs that represent deployment output.").readonly().optional(),providers:e.array(le).describe("The list of resource providers needed for the deployment.").readonly().optional(),dependencies:e.array(so).describe("The list of deployment dependencies.").readonly().optional(),templateLink:Rt.optional(),parameters:e.record(e.any()).describe("Deployment parameters. ").readonly().optional(),parametersLink:_t.optional(),mode:e.enum(["Incremental","Complete"]).describe("The deployment mode. Possible values are Incremental and Complete.").readonly().optional(),debugSetting:yt.optional(),onErrorDeployment:oo.optional(),templateHash:e.string().describe("The hash produced for the template.").readonly().optional(),outputResources:e.array(dt).describe("Array of provisioned resources.").readonly().optional(),validatedResources:e.array(dt).describe("Array of validated resources.").readonly().optional(),error:ie.optional(),diagnostics:e.array(bt).describe("Contains diagnostic information collected during validation process.").readonly().optional()}).describe("Deployment properties with additional details."),Bn=e.object({template:e.record(e.any()).describe("The template content. You use this element when you want to pass the template syntax directly in the request rather than link to an existing template. It can be a JObject or well-formed JSON string. Use either the templateLink property or the template property, but not both.").optional(),templateLink:Rt.optional(),parameters:e.record(co).describe("Name and value pairs that define the deployment parameters for the template. You use this element when you want to provide the parameter values directly in the request rather than link to an existing parameter file. Use either the parametersLink property or the parameters property, but not both. It can be a JObject or a well formed JSON string.").optional(),parametersLink:_t.optional(),mode:e.enum(["Incremental","Complete"]).describe("The mode that is used to deploy resources. This value can be either Incremental or Complete. In Incremental mode, resources are deployed without deleting existing resources that are not included in the template. In Complete mode, resources are deployed and existing resources in the resource group that are not included in the template are deleted. Be careful when using Complete mode as you may unintentionally delete resources."),debugSetting:yt.optional(),onErrorDeployment:ao.optional(),expressionEvaluationOptions:io.optional()}).describe("Deployment properties."),go=e.object({resultFormat:e.enum(["ResourceIdOnly","FullResourcePayloads"]).describe("The format of the What-If results").optional()}).describe("Deployment What-If operation settings."),po=e.object({consentToAuthorization:e.boolean().describe("A value indicating whether authorization is consented or not.").optional()}).describe("The provider consent."),ho=e.object({applicationId:e.string().describe("The application id.").optional(),roleDefinition:ut.optional(),managedByRoleDefinition:ut.optional(),providerAuthorizationConsentState:e.enum(["NotSpecified","Required","NotRequired","Consented"]).describe("The provider authorization consent state.").optional()}).describe("The provider permission"),wt=e.object({tags:e.record(e.string().describe("The tag value.")).optional()}).describe("A dictionary of name and value pairs."),Eo=e.object({changes:e.array(gt).describe("List of resource changes predicted by What-If operation.").optional(),potentialChanges:e.array(gt).describe("List of resource changes predicted by What-If operation.").optional(),diagnostics:e.array(bt).describe("List of resource diagnostics detected by What-If operation.").readonly().optional()}).describe("Deployment operation properties."),mo=e.object({name:e.string().describe("Operation name: {provider}/{resource}/{operation}").optional(),display:e.any().describe("The object that represents the operation.").optional()}).describe("Microsoft.Resources operation"),ce=e.object({id:e.string().describe("Full deployment operation ID.").readonly().optional(),operationId:e.string().describe("Deployment operation ID.").readonly().optional(),properties:lo.optional()}).describe("Deployment operation information."),Cn=e.object({id:e.string().describe("The tag name ID.").readonly().optional(),tagName:e.string().describe("The tag name.").optional(),count:ft.optional(),values:e.array(In).describe("The list of tag values.").optional()}).describe("Tag details."),z=e.object({id:e.string().describe("The ID of the resource group.").readonly().optional(),name:e.string().describe("The name of the resource group.").readonly().optional(),type:e.string().describe("The type of the resource group.").readonly().optional(),properties:kt.optional(),location:e.string().describe("The location of the resource group. It cannot be changed after the resource group has been created. It must be one of the supported Azure locations."),managedBy:e.string().describe("The ID of the resource that manages this resource group.").optional(),tags:e.record(e.string().describe("The additional properties. ")).describe("The tags attached to the resource group.").optional()}).describe("Resource group information."),Qo=e.object({createdTime:e.string().datetime({offset:!0}).describe("The created time of the resource. This is only present if requested via the $expand query parameter.").readonly().optional(),changedTime:e.string().datetime({offset:!0}).describe("The changed time of the resource. This is only present if requested via the $expand query parameter.").readonly().optional(),provisioningState:e.string().describe("The provisioning state of the resource. This is only present if requested via the $expand query parameter.").readonly().optional()}).and(F).describe("Resource information."),k=e.object({id:e.string().describe("The ID of the deployment.").readonly().optional(),name:e.string().describe("The name of the deployment.").readonly().optional(),type:e.string().describe("The type of the deployment.").readonly().optional(),location:e.string().describe("the location of the deployment.").optional(),properties:uo.optional(),tags:e.record(e.string()).describe("Deployment tags").optional()}).describe("Deployment information."),St=e.object({whatIfSettings:go.optional()}).and(Bn).describe("Deployment What-if properties."),Io=e.object({thirdPartyProviderConsent:po.optional()}).describe("The provider registration definition."),Co=e.object({value:e.array(ho).describe("An array of provider permissions.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of provider permissions."),xe=e.object({id:e.string().describe("The ID of the tags wrapper resource.").readonly().optional(),name:e.string().describe("The name of the tags wrapper resource.").readonly().optional(),type:e.string().describe("The type of the tags wrapper resource.").readonly().optional(),properties:wt}).describe("Wrapper resource for tags API requests and responses."),Bo=e.object({operation:e.enum(["Replace","Merge","Delete"]).describe("The operation type for the patch API.").optional(),properties:wt.optional()}).describe("Wrapper resource for tags patch API request only."),qe=e.object({status:e.string().describe("Status of the What-If operation.").optional(),properties:Eo.optional(),error:ie.optional()}).describe("Result of the What-If operation. Contains a list of predicted changes and a URL link to get to the next set of results."),fo=e.object({minifiedTemplate:e.string().describe("The minified template string.").optional(),templateHash:e.string().describe("The template hash.").optional()}).describe("Result of the request to calculate template hash. It contains a string of minified template and its hash."),bo=e.object({value:e.array(mo).describe("List of Microsoft.Resources operations.").optional(),nextLink:e.string().describe("URL to get the next set of operation list results if there are any.").optional()}).describe("Result of the request to list Microsoft.Resources operations. It contains a list of operations and a URL link to get the next set of results."),yo=e.object({template:e.record(e.any()).describe("The template content. Used if outputFormat is empty or set to 'Json'.").optional(),output:e.string().describe("The formatted export content. Used if outputFormat is set to 'Bicep'.").optional(),error:ie.optional()}).describe("Resource group export result."),$i=e.object({id:e.string().describe("Resource ID").optional()}).describe("Sub-resource."),ea=e.object({publisher:e.string().describe("Operation description.").optional(),provider:e.string().describe("Operation provider.").optional(),resource:e.string().describe("Operation resource.").optional(),operation:e.string().describe("Resource provider operation.").optional(),description:e.string().describe("Operation description.").optional()}).describe("Resource provider operation's display properties."),ye=e.object({value:e.array(ce).describe("An array of deployment operations.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of deployment operations."),_o=e.object({value:e.array(Cn).describe("An array of tags.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of subscription tags."),Ro=e.object({resources:e.array(e.string()).describe("The IDs of the resources to filter the export by. To export all resources, supply an array with single entry '*'.").optional(),options:e.string().describe("The export template options. A CSV-formatted list containing zero or more of the following: 'IncludeParameterDefaultValue', 'IncludeComments', 'SkipResourceNameParameterization', 'SkipAllParameterization'").optional(),outputFormat:e.enum(["Json","Bicep"]).describe("The output format for the exported resources.").optional()}).describe("Export resource group template request parameters."),pt=e.object({resources:e.array(e.string()).describe("The IDs of the resources.").optional(),targetResourceGroup:e.string().describe("The target resource group.").optional()}).describe("Parameters of move resources."),ko=e.object({value:e.array(z).describe("An array of resource groups.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of resource groups."),wo=e.object({name:e.string().describe("The name of the resource group.").optional(),properties:kt.optional(),managedBy:e.string().describe("The ID of the resource that manages this resource group.").optional(),tags:e.record(e.string().describe("The additional properties. ")).describe("The tags attached to the resource group.").optional()}).describe("Resource group information."),ht=e.object({value:e.array(Qo).describe("An array of resources.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of resource groups."),So=e.object({value:e.array(Bt).describe("An array of resource types.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of resource types of a resource provider."),Et=e.object({value:e.array(le).describe("An array of resource providers.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of resource providers."),_e=e.object({value:e.array(k).describe("An array of deployments.").optional(),nextLink:e.string().describe("The URL to use for getting the next set of results.").readonly().optional()}).describe("List of deployments."),na=e.object({error:Pe.optional()}).describe("The template deployment validation detected failures."),ta=e.object({error:ie.optional()}).describe("An error response for a resource management request."),mt=e.object({location:e.string().describe("The location to store the deployment data."),properties:St}).describe("Deployment What-if operation parameters."),Qt=e.object({location:e.string().describe("The location to store the deployment data.").optional(),properties:St}).describe("Deployment What-if operation parameters."),Re=e.object({template:e.record(e.any()).describe("The template content.").optional()}).describe("The deployment export result. "),Ge=e.object({location:e.string().describe("The location to store the deployment data."),properties:Bn,tags:e.record(e.string()).describe("Deployment tags").optional()}).describe("Deployment operation parameters."),ae=e.object({location:e.string().describe("The location to store the deployment data.").optional(),properties:Bn,tags:e.record(e.string()).describe("Deployment tags").optional()}).describe("Deployment operation parameters."),ra=e.object({tagName:e.string().describe("The tag name.").optional(),tagValue:e.string().describe("The tag value.").optional()}).describe("Resource group filter."),Aa=e.object({resourceType:e.string().describe("The resource type.").optional(),tagname:e.string().describe("The tag name.").optional(),tagvalue:e.string().describe("The tag value.").optional()}).describe("Resource filter."),oa=e.object({provisioningState:e.string().describe("The provisioning state.").optional()}).describe("Deployment filter."),ke={"/providers/Microsoft.Resources/operations":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({}),jsonResponse:bo.describe("OK. The request has succeeded.")}],"/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:ae.describe("Additional parameters supplied to the operation."),jsonResponse:e.union([k.describe("OK - Returns information about the deployment, including provisioning status."),k.describe("Created - Returns information about the deployment, including provisioning status.")])},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")}),jsonResponse:k.describe("OK - Returns information about the deployment, including provisioning status.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")})},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({})}],"/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({})}],"/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:ae.describe("Parameters to validate."),jsonResponse:k.describe("The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.")}],"/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({}),jsonResponse:Re.describe("OK - Returns the template.")}],"/[scope]/providers/Microsoft.Resources/deployments/":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'."),$top:e.coerce.number().int().optional().describe("The number of results to get. If null is passed, returns all deployments."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope.")}),jsonResponse:_e.describe("OK - Returns an array of deployments.")}],"/providers/Microsoft.Resources/deployments/[deploymentName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:Ge.describe("Additional parameters supplied to the operation."),jsonResponse:e.union([k.describe("OK - Returns information about the deployment, including provisioning status."),k.describe("Created - Returns information about the deployment, including provisioning status.")])},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonResponse:k.describe("OK - Returns information about the deployment, including provisioning status.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")})},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({})}],"/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({})}],"/providers/Microsoft.Resources/deployments/[deploymentName]/validate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:Ge.describe("Parameters to validate."),jsonResponse:k.describe("The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.")}],"/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:mt.describe("Parameters to validate."),jsonResponse:qe.describe("OK - Returns What-If operation status")}],"/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({}),jsonResponse:Re.describe("OK - Returns the template.")}],"/providers/Microsoft.Resources/deployments/":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'."),$top:e.coerce.number().int().optional().describe("The number of results to get. If null is passed, returns all deployments."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({}),jsonResponse:_e.describe("OK - Returns an array of deployments.")}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:Ge.describe("Additional parameters supplied to the operation."),jsonResponse:e.union([k.describe("OK - Returns information about the deployment, including provisioning status."),k.describe("Created - Returns information about the deployment, including provisioning status.")])},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonResponse:k.describe("OK - Returns information about the deployment, including provisioning status.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")})},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({})}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({})}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:Ge.describe("Parameters to validate."),jsonResponse:k.describe("The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.")}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:mt.describe("Parameters to validate."),jsonResponse:qe.describe("OK - Returns What-If operation status")}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonBody:e.object({}),jsonResponse:Re.describe("OK - Returns the template.")}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'."),$top:e.coerce.number().int().optional().describe("The number of results to get. If null is passed, returns all deployments."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID.")}),jsonResponse:_e.describe("OK - Returns an array of deployments.")}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:ae.describe("Additional parameters supplied to the operation."),jsonResponse:e.union([k.describe("OK - Returns information about the deployment, including provisioning status."),k.describe("Created - Returns information about the deployment, including provisioning status.")])},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:k.describe("OK - Returns information about the deployment, including provisioning status.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")})},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:ae.describe("Parameters to validate."),jsonResponse:k.describe("The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.")}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:Qt.describe("Parameters to What If."),jsonResponse:qe.describe("OK - Returns What-If operation status")}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({}),jsonResponse:Re.describe("OK - Returns the template.")}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'."),$top:e.coerce.number().int().optional().describe("The number of results to get. If null is passed, returns all deployments."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:_e.describe("OK - Returns an array of deployments.")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group to deploy the resources to. The name is case insensitive. The resource group must already exist."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:ae.describe("Additional parameters supplied to the operation."),jsonResponse:e.union([k.describe("OK - Returns information about the deployment, including provisioning status."),k.describe("Created - Returns information about the deployment, including provisioning status.")])},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:k.describe("OK - Returns information about the deployment, including provisioning status.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group with the deployment to check. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")})},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group with the deployment to delete. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/cancel":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/validate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group the template will be deployed to. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:ae.describe("Parameters to validate."),jsonResponse:k.describe("The template deployment validation succeeded. Please inspect 'warnings' property since some resources might have been skipped from validation.")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/whatIf":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group the template will be deployed to. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:Qt.describe("Parameters to validate."),jsonResponse:qe.describe("OK - Returns What-If operation status")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/[deploymentName]/exportTemplate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({}),jsonResponse:Re.describe("OK - Returns the template.")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/Microsoft.Resources/deployments/":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation. For example, you can use $filter=provisioningState eq '{state}'."),$top:e.coerce.number().int().optional().describe("The number of results to get. If null is passed, returns all deployments."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group with the deployments to get. The name is case insensitive."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:_e.describe("OK - Returns an array of deployments.")}],"/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/unregister":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceProviderNamespace:e.string().describe("The namespace of the resource provider to unregister."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({}),jsonResponse:le.describe("OK - Returns information about the resource provider.")}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/[resourceProviderNamespace]/register":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceProviderNamespace:e.string().describe("The namespace of the resource provider to register."),groupId:e.string().describe("The management group ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/providerPermissions":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceProviderNamespace:e.string().describe("The namespace of the resource provider."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:Co.describe("OK - Returns information on the provider permissions.")}],"/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/register":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceProviderNamespace:e.string().describe("The namespace of the resource provider to register."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:Io.describe("The third party consent for S2S."),jsonResponse:le.describe("OK - Returns information about the resource provider.")}],"/subscriptions/[subscriptionId]/providers":[{methods:["GET"],queryParams:e.object({$expand:e.string().optional().describe("The properties to include in the results. For example, use &$expand=metadata in the query string to retrieve resource provider metadata. To include property aliases in response, use $expand=resourceTypes/aliases."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:Et.describe("OK - Returns an array of resource providers.")}],"/providers":[{methods:["GET"],queryParams:e.object({$expand:e.string().optional().describe("The properties to include in the results. For example, use &$expand=metadata in the query string to retrieve resource provider metadata. To include property aliases in response, use $expand=resourceTypes/aliases."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({}),jsonResponse:Et.describe("OK - Returns an array of resource providers.")}],"/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]":[{methods:["GET"],queryParams:e.object({$expand:e.string().optional().describe("The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceProviderNamespace:e.string().describe("The namespace of the resource provider."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:le.describe("OK - Returns information about the resource provider.")}],"/subscriptions/[subscriptionId]/providers/[resourceProviderNamespace]/resourceTypes":[{methods:["GET"],queryParams:e.object({$expand:e.string().optional().describe("The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceProviderNamespace:e.string().describe("The namespace of the resource provider."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:So.describe("OK - Returns resource types information for the resource provider.")}],"/providers/[resourceProviderNamespace]":[{methods:["GET"],queryParams:e.object({$expand:e.string().optional().describe("The $expand query parameter. For example, to include property aliases in response, use $expand=resourceTypes/aliases."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceProviderNamespace:e.string().describe("The namespace of the resource provider.")}),jsonResponse:le.describe("OK - Returns information about the resource provider.")}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/resources":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation.<br><br>The properties you can use for eq (equals) or ne (not equals) are: location, resourceType, name, resourceGroup, identity, identity/principalId, plan, plan/publisher, plan/product, plan/name, plan/version, and plan/promotionCode.<br><br>For example, to filter by a resource type, use: $filter=resourceType eq 'Microsoft.Network/virtualNetworks'<br><br>You can use substringof(value, property) in the filter. The properties you can use for substring are: name and resourceGroup.<br><br>For example, to get all resources with 'demo' anywhere in the name, use: $filter=substringof('demo', name)<br><br>You can link more than one substringof together by adding and/or operators.<br><br>You can filter by tag names and values. For example, to filter for a tag name and value, use $filter=tagName eq 'tag1' and tagValue eq 'Value1'. When you filter by a tag name and value, the tags for each resource are not returned in the results.<br><br>You can use some properties together when filtering. The combinations you can use are: substringof and/or resourceType, plan and plan/publisher and plan/name, identity and identity/principalId."),$expand:e.string().optional().describe("Comma-separated list of additional properties to be included in the response. Valid values include `createdTime`, `changedTime` and `provisioningState`. For example, `$expand=createdTime,changedTime`."),$top:e.coerce.number().int().optional().describe("The number of results to return. If null is passed, returns all resources."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The resource group with the resources to get."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:ht.describe("OK - Returns an array of resources")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group to create or update. Can include alphanumeric, underscore, parentheses, hyphen, period (except at end), and Unicode characters that match the allowed characters."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:z.describe("Parameters supplied to the create or update a resource group."),jsonResponse:e.union([z.describe("OK - Returns information about the new resource group."),z.describe("Created - Returns information about the new resource group.")])},{methods:["PATCH"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group to update. The name is case insensitive."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:wo.describe("Parameters supplied to update a resource group."),jsonResponse:z.describe("OK - Returns information about the resource group.")},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group to get. The name is case insensitive."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:z.describe("OK - Returns information about the resource group.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group to check. The name is case insensitive."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")})},{methods:["DELETE"],queryParams:e.object({forceDeletionTypes:e.string().optional().describe("The resource types you want to force delete. Currently, only the following is supported: forceDeletionTypes=Microsoft.Compute/virtualMachines,Microsoft.Compute/virtualMachineScaleSets"),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group to delete. The name is case insensitive."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/exportTemplate":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({subscriptionId:e.string().describe("The ID of the target subscription."),resourceGroupName:e.string().describe("The name of the resource group. The name is case insensitive.")}),jsonBody:Ro.describe("Parameters for exporting the template."),jsonResponse:yo.describe("OK - Returns the result of the export.")}],"/subscriptions/[subscriptionId]/resourcegroups":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation.<br><br>You can filter by tag names and values. For example, to filter for a tag name and value, use $filter=tagName eq 'tag1' and tagValue eq 'Value1'"),$top:e.coerce.number().int().optional().describe("The number of results to return. If null is passed, returns all resource groups."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:ko.describe("OK - Returns an array of resource groups.")}],"/subscriptions/[subscriptionId]/resourceGroups/[sourceResourceGroupName]/moveResources":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({sourceResourceGroupName:e.string().describe("The name of the resource group from the source subscription containing the resources to be moved."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:pt.describe("Parameters for moving resources.")}],"/subscriptions/[subscriptionId]/resourceGroups/[sourceResourceGroupName]/validateMoveResources":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({sourceResourceGroupName:e.string().describe("The name of the resource group from the source subscription containing the resources to be validated for move."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:pt.describe("Parameters for moving resources.")}],"/subscriptions/[subscriptionId]/resources":[{methods:["GET"],queryParams:e.object({$filter:e.string().optional().describe("The filter to apply on the operation.<br><br>Filter comparison operators include `eq` (equals) and `ne` (not equals) and may be used with the following properties: `location`, `resourceType`, `name`, `resourceGroup`, `identity`, `identity/principalId`, `plan`, `plan/publisher`, `plan/product`, `plan/name`, `plan/version`, and `plan/promotionCode`.<br><br>For example, to filter by a resource type, use `$filter=resourceType eq 'Microsoft.Network/virtualNetworks'`<br><br><br>`substringof(value, property)` can  be used to filter for substrings of the following currently-supported properties: `name` and `resourceGroup`<br><br>For example, to get all resources with 'demo' anywhere in the resource name, use `$filter=substringof('demo', name)`<br><br>Multiple substring operations can also be combined using `and`/`or` operators.<br><br>Note that any truncated number of results queried via `$top` may also not be compatible when using a filter.<br><br><br>Resources can be filtered by tag names and values. For example, to filter for a tag name and value, use `$filter=tagName eq 'tag1' and tagValue eq 'Value1'`. Note that when resources are filtered by tag name and value, <b>the original tags for each resource will not be returned in the results.</b> Any list of additional properties queried via `$expand` may also not be compatible when filtering by tag names/values. <br><br>For tag names only, resources can be filtered by prefix using the following syntax: `$filter=startswith(tagName, 'depart')`. This query will return all resources with a tag name prefixed by the phrase `depart` (i.e.`department`, `departureDate`, `departureTime`, etc.)<br><br><br>Note that some properties can be combined when filtering resources, which include the following: `substringof() and/or resourceType`, `plan and plan/publisher and plan/name`, and `identity and identity/principalId`."),$expand:e.string().optional().describe("Comma-separated list of additional properties to be included in the response. Valid values include `createdTime`, `changedTime` and `provisioningState`. For example, `$expand=createdTime,changedTime`."),$top:e.coerce.number().int().optional().describe("The number of recommendations per page if a paged version of this API is being used."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:ht.describe("OK - Returns an array of resources.")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/providers/[resourceProviderNamespace]/[parentResourcePath]/[resourceType]/[resourceName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group for the resource. The name is case insensitive."),resourceProviderNamespace:e.string().describe("The namespace of the resource provider."),parentResourcePath:e.string().describe("The parent resource identity."),resourceType:e.string().describe("The resource type of the resource to create."),resourceName:e.string().describe("The name of the resource to create."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:F.describe("Parameters for creating or updating the resource."),jsonResponse:e.union([F.describe("OK - Returns information about the resource."),F.describe("Created - Returns information about the resource.")])},{methods:["PATCH"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group for the resource. The name is case insensitive."),resourceProviderNamespace:e.string().describe("The namespace of the resource provider."),parentResourcePath:e.string().describe("The parent resource identity."),resourceType:e.string().describe("The resource type of the resource to update."),resourceName:e.string().describe("The name of the resource to update."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:F.describe("Parameters for updating the resource."),jsonResponse:F.describe("OK - Returns information about the resource.")},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group containing the resource to get. The name is case insensitive."),resourceProviderNamespace:e.string().describe("The namespace of the resource provider."),parentResourcePath:e.string().describe("The parent resource identity."),resourceType:e.string().describe("The resource type of the resource."),resourceName:e.string().describe("The name of the resource to get."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:F.describe("OK - Returns information about the resource.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group containing the resource to check. The name is case insensitive."),resourceProviderNamespace:e.string().describe("The resource provider of the resource to check."),parentResourcePath:e.string().describe("The parent resource identity."),resourceType:e.string().describe("The resource type."),resourceName:e.string().describe("The name of the resource to check whether it exists."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")})},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group that contains the resource to delete. The name is case insensitive."),resourceProviderNamespace:e.string().describe("The namespace of the resource provider."),parentResourcePath:e.string().describe("The parent resource identity."),resourceType:e.string().describe("The resource type."),resourceName:e.string().describe("The name of the resource to delete."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/[resourceId]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceId:e.string().describe("The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}")}),jsonBody:F.describe("Create or update resource parameters."),jsonResponse:e.union([F.describe("OK - Returns information about the resource."),F.describe("Created - Returns information about the resource.")])},{methods:["PATCH"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceId:e.string().describe("The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}")}),jsonBody:F.describe("Update resource parameters."),jsonResponse:F.describe("OK - Returns information about the resource.")},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceId:e.string().describe("The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}")}),jsonResponse:F.describe("OK - Returns information about the resource.")},{methods:["HEAD"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceId:e.string().describe("The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}")})},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for the operation.")}),routeParams:e.object({resourceId:e.string().describe("The fully qualified ID of the resource, including the resource name and resource type. Use the format, /subscriptions/{guid}/resourceGroups/{resource-group-name}/{resource-provider-namespace}/{resource-type}/{resource-name}")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/tagNames/[tagName]/tagValues/[tagValue]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({tagName:e.string().describe("The name of the tag."),tagValue:e.string().describe("The value of the tag to create."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({}),jsonResponse:e.union([In.describe("Predefined tag value already exists. Returns information about the predefined tag value."),In.describe("Predefined tag value successfully created. Returns information about the predefined tag value.")])},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({tagName:e.string().describe("The name of the tag."),tagValue:e.string().describe("The value of the tag to delete."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/tagNames/[tagName]":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({tagName:e.string().describe("The name of the tag to create."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({}),jsonResponse:e.union([Cn.describe("Predefined tag name already exists. Returns information about the predefined tag name."),Cn.describe("Predefined tag name successfully created. Returns information about the predefined tag name.")])},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({tagName:e.string().describe("The name of the tag."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonBody:e.object({})}],"/subscriptions/[subscriptionId]/tagNames":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:_o.describe("OK - Returns an array of tag names and values.")}],"/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment."),operationId:e.string().describe("The ID of the operation to get.")}),jsonResponse:ce.describe("OK - Returns information about the deployment operation.")}],"/[scope]/providers/Microsoft.Resources/deployments/[deploymentName]/operations":[{methods:["GET"],queryParams:e.object({$top:e.coerce.number().int().optional().describe("The number of results to return."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope."),deploymentName:e.string().describe("The name of the deployment.")}),jsonResponse:ye.describe("OK - Return an array of deployment operations.")}],"/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),operationId:e.string().describe("The ID of the operation to get.")}),jsonResponse:ce.describe("OK - Returns information about the deployment operation.")}],"/providers/Microsoft.Resources/deployments/[deploymentName]/operations":[{methods:["GET"],queryParams:e.object({$top:e.coerce.number().int().optional().describe("The number of results to return."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment.")}),jsonResponse:ye.describe("OK - Return an array of deployment operations.")}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment."),operationId:e.string().describe("The ID of the operation to get.")}),jsonResponse:ce.describe("OK - Returns information about the deployment operation.")}],"/providers/Microsoft.Management/managementGroups/[groupId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations":[{methods:["GET"],queryParams:e.object({$top:e.coerce.number().int().optional().describe("The number of results to return."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({groupId:e.string().describe("The management group ID."),deploymentName:e.string().describe("The name of the deployment.")}),jsonResponse:ye.describe("OK - Return an array of deployment operations.")}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations/[operationId]":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),operationId:e.string().describe("The ID of the operation to get."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:ce.describe("OK - Returns information about the deployment operation.")}],"/subscriptions/[subscriptionId]/providers/Microsoft.Resources/deployments/[deploymentName]/operations":[{methods:["GET"],queryParams:e.object({$top:e.coerce.number().int().optional().describe("The number of results to return."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:ye.describe("OK - Return an array of deployment operations.")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/deployments/[deploymentName]/operations/[operationId]":[{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),operationId:e.string().describe("The ID of the operation to get."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:ce.describe("OK - Returns information about the deployment operation.")}],"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]/deployments/[deploymentName]/operations":[{methods:["GET"],queryParams:e.object({$top:e.coerce.number().int().optional().describe("The number of results to return."),"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({resourceGroupName:e.string().describe("The name of the resource group. The name is case insensitive."),deploymentName:e.string().describe("The name of the deployment."),subscriptionId:e.string().describe("The Microsoft Azure subscription ID.")}),jsonResponse:ye.describe("OK - Return an array of deployment operations.")}],"/providers/Microsoft.Resources/calculateTemplateHash":[{methods:["POST"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({}),jsonBody:e.record(e.any()).describe("The template provided to calculate hash."),jsonResponse:fo.describe("OK - Returns the hash.")}],"/[scope]/providers/Microsoft.Resources/tags/default":[{methods:["PUT"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope.")}),jsonBody:xe,jsonResponse:xe.describe("Tags updated successfully. Returns tags from the specified object.")},{methods:["PATCH"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope.")}),jsonBody:Bo,jsonResponse:xe.describe("Tags updated successfully. Returns tags from the specified object.")},{methods:["GET"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope.")}),jsonResponse:xe.describe("Returns tags from the specified object.")},{methods:["DELETE"],queryParams:e.object({"api-version":e.string().describe("The API version to use for this operation.")}),routeParams:e.object({scope:e.string().describe("The resource scope.")}),jsonBody:e.object({})}]};import{z as i}from"zod";import{z as f}from"zod";var vo=f.object({type:f.string().describe("The additional info type.").readonly().optional(),info:f.record(f.any()).describe("The additional info.").readonly().optional()}).describe("The resource management error additional info."),fn=f.object({id:f.string().describe("Resource Id").readonly().optional(),name:f.string().describe("Resource name").readonly().optional(),type:f.string().describe("Resource type").readonly().optional()}).describe("The Resource definition for other than namespace."),Y=f.object({createdBy:f.string().describe("The identity that created the resource.").optional(),createdByType:f.enum(["User","Application","ManagedIdentity","Key"]).describe("The type of identity that created the resource.").optional(),createdAt:f.string().datetime({offset:!0}).describe("The timestamp of resource creation (UTC).").optional(),lastModifiedBy:f.string().describe("The identity that last modified the resource.").optional(),lastModifiedByType:f.enum(["User","Application","ManagedIdentity","Key"]).describe("The type of identity that last modified the resource.").optional(),lastModifiedAt:f.string().datetime({offset:!0}).describe("The type of identity that last modified the resource.").optional()}).describe("Metadata pertaining to creation and last modification of the resource.").readonly(),aa=f.object({error:f.object({code:f.string().describe("The error code.").readonly().optional(),message:f.string().describe("The error message.").readonly().optional(),target:f.string().describe("The error target.").readonly().optional(),details:f.array(f.any()).describe("The error details.").readonly().optional(),additionalInfo:f.array(vo).describe("The error additional info.").readonly().optional()}).describe("The error object.").optional()}).describe("The resource management error response."),de=f.object({activeMessageCount:f.number().int().describe("Number of active messages in the queue, topic, or subscription.").readonly().optional(),deadLetterMessageCount:f.number().int().describe("Number of messages that are dead lettered.").readonly().optional(),scheduledMessageCount:f.number().int().describe("Number of scheduled messages.").readonly().optional(),transferMessageCount:f.number().int().describe("Number of messages transferred to another queue, topic, or subscription.").readonly().optional(),transferDeadLetterMessageCount:f.number().int().describe("Number of messages transferred into dead letters.").readonly().optional()}).describe("Message Count Details."),K=f.enum(["Active","Disabled","Restoring","SendDisabled","ReceiveDisabled","Creating","Deleting","Renaming","Unknown"]).describe("Entity status."),vt=f.object({location:f.string().describe("The Geo-location where the resource lives"),tags:f.record(f.string()).describe("Resource tags").optional()}).and(fn).describe("The Resource definition.");import{z as we}from"zod";var Z=we.object({id:we.string().describe("Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}").readonly().optional(),name:we.string().describe("The name of the resource").readonly().optional(),type:we.string().describe('The type of the resource. E.g. "Microsoft.EventHub/Namespaces" or "Microsoft.EventHub/Namespaces/EventHubs"').readonly().optional(),location:we.string().describe("The geo-location where the resource lives").readonly().optional()}).describe("Common fields that are returned in the response for all Azure Resource Manager resources");var Do=i.object({status:i.enum(["Pending","Approved","Rejected","Disconnected"]).describe("Status of the connection.").optional(),description:i.string().describe("Description of the connection state.").optional()}).describe("ConnectionState information."),To=i.object({id:i.string().describe("The ARM identifier for Private Endpoint.").optional()}).describe("PrivateEndpoint information."),No=i.object({userAssignedIdentity:i.string().describe("ARM ID of user Identity selected for encryption").optional()}),Mo=i.object({privateEndpoint:To.optional(),privateLinkServiceConnectionState:Do.optional(),provisioningState:i.enum(["Creating","Updating","Deleting","Succeeded","Canceled","Failed"]).describe("Provisioning state of the Private Endpoint Connection.").optional()}).describe("Properties of the private endpoint connection resource."),Fo=i.object({keyName:i.string().describe("Name of the Key from KeyVault").optional(),keyVaultUri:i.string().describe("Uri of KeyVault").optional(),keyVersion:i.string().describe("Version of KeyVault").optional(),identity:No.optional()}).describe("Properties to configure keyVault Properties"),X=i.object({properties:Mo.optional(),systemData:Y.optional()}).and(Z).describe("Properties of the PrivateEndpointConnection."),Tt=i.object({keyVaultProperties:i.array(Fo).describe("Properties of KeyVault").optional(),keySource:i.literal("Microsoft.KeyVault").describe("Enumerates the possible value of keySource for Encryption").default("Microsoft.KeyVault"),requireInfrastructureEncryption:i.boolean().describe("Enable Infrastructure Encryption (Double Encryption)").optional()}).describe("Properties to configure Encryption"),Lo=i.object({principalId:i.string().describe("Principal Id of user assigned identity").readonly().optional(),clientId:i.string().describe("Client Id of user assigned identity").readonly().optional()}).describe("Recognized Dictionary value."),Uo=i.object({groupId:i.string().optional(),requiredMembers:i.array(i.string()).describe("Required Members").optional(),requiredZoneNames:i.array(i.string()).describe("Required Zone Names").optional()}).describe("Properties of PrivateLinkResource"),Po=i.object({provisioningState:i.string().describe("Provisioning state of the namespace.").readonly().optional(),status:i.string().describe("Status of the namespace.").readonly().optional(),createdAt:i.string().datetime({offset:!0}).describe("The time the namespace was created").readonly().optional(),updatedAt:i.string().datetime({offset:!0}).describe("The time the namespace was updated.").readonly().optional(),serviceBusEndpoint:i.string().describe("Endpoint you can use to perform Service Bus operations.").readonly().optional(),metricId:i.string().describe("Identifier for Azure Insights metrics").readonly().optional(),zoneRedundant:i.boolean().describe("Enabling this property creates a Premium Service Bus Namespace in regions supported availability zones.").optional(),encryption:Tt.optional(),privateEndpointConnections:i.array(X).describe("List of private endpoint connections.").optional(),disableLocalAuth:i.boolean().describe("This property disables SAS authentication for the Service Bus namespace.").optional(),alternateName:i.string().describe("Alternate name for namespace").optional()}).describe("Properties of the namespace."),Nt=i.object({principalId:i.string().describe("ObjectId from the KeyVault").readonly().optional(),tenantId:i.string().describe("TenantId from the KeyVault").readonly().optional(),type:i.enum(["SystemAssigned","UserAssigned","SystemAssigned, UserAssigned","None"]).describe("Type of managed service identity.").optional(),userAssignedIdentities:i.record(Lo).describe("Properties for User Assigned Identities").optional()}).describe("Properties to configure User Assigned Identities for Bring your Own Keys"),Mt=i.object({name:i.enum(["Basic","Standard","Premium"]).describe("Name of this SKU."),tier:i.enum(["Basic","Standard","Premium"]).describe("The billing tier of this particular SKU.").optional(),capacity:i.number().int().describe("The specified messaging units for the tier. For Premium tier, capacity are 1,2 and 4.").optional()}).describe("SKU of the namespace."),xo=i.object({properties:Uo.optional(),id:i.string().describe("Fully qualified identifier of the resource.").optional(),name:i.string().describe("Name of the resource").optional(),type:i.string().describe("Type of the resource").optional()}).describe("Information of the private link resource."),qo=i.object({location:i.string().describe("Resource location").optional(),tags:i.record(i.string()).describe("Resource tags").optional()}).and(fn).describe("The Resource definition."),Go=i.object({provisioningState:i.string().describe("Provisioning state of the namespace.").readonly().optional(),status:i.string().describe("Status of the namespace.").readonly().optional(),createdAt:i.string().datetime({offset:!0}).describe("The time the namespace was created").readonly().optional(),updatedAt:i.string().datetime({offset:!0}).describe("The time the namespace was updated.").readonly().optional(),serviceBusEndpoint:i.string().describe("Endpoint you can use to perform Service Bus operations.").readonly().optional(),metricId:i.string().describe("Identifier for Azure Insights metrics").readonly().optional(),encryption:Tt.optional(),privateEndpointConnections:i.array(X).describe("List of private endpoint connections.").optional(),disableLocalAuth:i.boolean().describe("This property disables SAS authentication for the Service Bus namespace.").optional(),alternateName:i.string().describe("Alternate name for namespace").optional()}).describe("Properties of the namespace."),j=i.object({sku:Mt.optional(),identity:Nt.optional(),systemData:Y.optional(),properties:Po.optional()}).and(vt).describe("Description of a namespace resource."),Oo=i.object({value:i.array(xo).describe("A collection of private link resources").optional(),nextLink:i.string().describe("A link for the next page of private link resources.").optional()}).describe("Result of the List private link resources operation."),Ho=i.object({value:i.array(X).describe("A collection of private endpoint connection resources.").optional(),nextLink:i.string().describe("A link for the next page of private endpoint connection resources.").optional()}).describe("Result of the list of all private endpoint connections operation."),Jo=i.object({sku:Mt.optional(),properties:Go.optional(),identity:Nt.optional()}).and(qo).describe("Description of a namespace resource."),Dt=i.object({value:i.array(j).describe("Result of the List Namespace operation.").optional(),nextLink:i.string().describe("Link to the next set of results. Not empty if Value contains incomplete list of Namespaces.").optional()}).describe("The response of the List Namespace operation."),Ft={"/subscriptions/[subscriptionId]/providers/Microsoft.ServiceBus/namespaces":[{methods:["GET"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:Dt.describe("Namespaces successfully returned.")}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces":[{methods:["GET"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:Dt.describe("Namespaces successfully returned.")}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]":[{methods:["PUT"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name."),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:j.describe("Parameters supplied to create a namespace resource."),jsonResponse:i.union([j.describe("Namespace created successfully."),j.describe("Namespace create request accepted.")])},{methods:["PATCH"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:Jo.describe("Parameters supplied to update a namespace resource."),jsonResponse:i.union([j.describe("Namespace updated successfully."),j.describe("Namespace update request accepted.")])},{methods:["GET"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:j.describe("Namespace successfully returned.")},{methods:["DELETE"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:i.object({})}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/privateEndpointConnections":[{methods:["GET"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:Ho.describe("PrivateEndpointConnections successfully returned.")}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/privateEndpointConnections/[privateEndpointConnectionName]":[{methods:["PUT"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call."),resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),privateEndpointConnectionName:i.string().describe("The PrivateEndpointConnection name")}),jsonBody:X.describe("Parameters supplied to update Status of PrivateEndPoint Connection to namespace resource."),jsonResponse:i.union([X.describe("Status of PrivateEndPoint Connection Created successfully."),X.describe("Request to update Status of PrivateEndPoint Connection accepted."),X.describe("Request to update Status of PrivateEndPoint Connection accepted.")])},{methods:["GET"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),privateEndpointConnectionName:i.string().describe("The PrivateEndpointConnection name"),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:X.describe("Description of Private Endpoint Connection returned successfully.")},{methods:["DELETE"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call."),privateEndpointConnectionName:i.string().describe("The PrivateEndpointConnection name")}),jsonBody:i.object({})}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/privateLinkResources":[{methods:["GET"],queryParams:i.object({"api-version":i.string().describe("Client API version.")}),routeParams:i.object({resourceGroupName:i.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:i.string().describe("The namespace name"),subscriptionId:i.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:Oo.describe("Private Link resource List")}]};import{z as E}from"zod";var x=E.object({countDetails:de.optional(),createdAt:E.string().datetime({offset:!0}).describe("The exact time the message was created.").readonly().optional(),updatedAt:E.string().datetime({offset:!0}).describe("The exact time the message was updated.").readonly().optional(),accessedAt:E.string().datetime({offset:!0}).describe("Last time a message was sent, or the last time there was a receive request to this queue.").readonly().optional(),sizeInBytes:E.number().int().describe("The size of the queue, in bytes.").readonly().optional(),messageCount:E.number().int().describe("The number of messages in the queue.").readonly().optional(),lockDuration:E.string().duration().describe("ISO 8601 timespan duration of a peek-lock; that is, the amount of time that the message is locked for other receivers. The maximum value for LockDuration is 5 minutes; the default value is 1 minute.").optional(),maxSizeInMegabytes:E.number().int().describe("The maximum size of the queue in megabytes, which is the size of memory allocated for the queue. Default is 1024.").optional(),maxMessageSizeInKilobytes:E.number().int().describe("Maximum size (in KB) of the message payload that can be accepted by the queue. This property is only used in Premium today and default is 1024.").optional(),requiresDuplicateDetection:E.boolean().describe("A value indicating if this queue requires duplicate detection.").optional(),requiresSession:E.boolean().describe("A value that indicates whether the queue supports the concept of sessions.").optional(),defaultMessageTimeToLive:E.string().duration().describe("ISO 8601 default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.").optional(),deadLetteringOnMessageExpiration:E.boolean().describe("A value that indicates whether this queue has dead letter support when a message expires.").optional(),duplicateDetectionHistoryTimeWindow:E.string().duration().describe("ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.").optional(),maxDeliveryCount:E.number().int().describe("The maximum delivery count. A message is automatically deadlettered after this number of deliveries. default value is 10.").optional(),status:K.optional(),enableBatchedOperations:E.boolean().describe("Value that indicates whether server-side batched operations are enabled.").optional(),autoDeleteOnIdle:E.string().duration().describe("ISO 8061 timeSpan idle interval after which the queue is automatically deleted. The minimum duration is 5 minutes.").optional(),enablePartitioning:E.boolean().describe("A value that indicates whether the queue is to be partitioned across multiple message brokers.").optional(),enableExpress:E.boolean().describe("A value that indicates whether Express Entities are enabled. An express queue holds a message in memory temporarily before writing it to persistent storage.").optional(),forwardTo:E.string().describe("Queue/Topic name to forward the messages").optional(),forwardDeadLetteredMessagesTo:E.string().describe("Queue/Topic name to forward the Dead Letter message").optional()}).describe("The Queue Properties definition."),ue=E.object({properties:x.optional(),systemData:Y.optional()}).and(Z).describe("Description of queue Resource."),Yo=E.object({value:E.array(ue).describe("Result of the List Queues operation.").optional(),nextLink:E.string().describe("Link to the next set of results. Not empty if Value contains incomplete list of queues.").optional()}).describe("The response to the List Queues operation."),bn={"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues":[{methods:["GET"],queryParams:E.object({"api-version":E.string().describe("Client API version."),$skip:E.coerce.number().int().optional().describe("Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls."),$top:E.coerce.number().int().optional().describe("May be used to limit the number of results to the most recent N usageDetails.")}),routeParams:E.object({resourceGroupName:E.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:E.string().describe("The namespace name"),subscriptionId:E.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:Yo.describe("Queues successfully returned.")}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues/[queueName]":[{methods:["PUT"],queryParams:E.object({"api-version":E.string().describe("Client API version.")}),routeParams:E.object({resourceGroupName:E.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:E.string().describe("The namespace name"),queueName:E.string().describe("The queue name."),subscriptionId:E.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:ue.describe("Parameters supplied to create or update a queue resource."),jsonResponse:ue.describe("Queue successfully created.")},{methods:["GET"],queryParams:E.object({"api-version":E.string().describe("Client API version.")}),routeParams:E.object({resourceGroupName:E.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:E.string().describe("The namespace name"),queueName:E.string().describe("The queue name."),subscriptionId:E.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:ue.describe("Queue description successfully returned.")},{methods:["DELETE"],queryParams:E.object({"api-version":E.string().describe("Client API version.")}),routeParams:E.object({resourceGroupName:E.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:E.string().describe("The namespace name"),queueName:E.string().describe("The queue name."),subscriptionId:E.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:E.object({})}]};import{z as L}from"zod";import{Temporal as nn}from"@js-temporal/polyfill";import{z as jo}from"zod";var Vo=setTimeout(function(){},0).constructor,Oe=jo.instanceof(Vo).transform(t=>t);import Lt from"rhea";var Wo=t=>!!(typeof t.body=="object"&&t.body&&"content"in t.body);var Se=t=>Buffer.isBuffer(t)?Lt.message.decode(t):t;var yn=t=>{let n=Se(t);if(Wo(n)){let{typecode:r}=n;if(n.body.typecode===117)if(n.body.multiple)try{return n.body.content.map(Se)}catch{return[n]}else try{return[Se(n.body.content)]}catch{return[n]}else throw new Error(`Unsupported typecode ${r}`)}else return[n]};var _n=t=>Lt.message.encode(t);import{promisify as zo}from"node:util";import Ko from"rhea";var Rn=`
-----BEGIN CERTIFICATE-----
MIIDfzCCAmegAwIBAgIEGwGErjANBgkqhkiG9w0BAQsFADBbMScwJQYDVQQDDB5SZWdlcnkgU2Vs
Zi1TaWduZWQgQ2VydGlmaWNhdGUxIzAhBgNVBAoMGlJlZ2VyeSwgaHR0cHM6Ly9yZWdlcnkuY29t
MQswCQYDVQQGEwJVQTAgFw0yNDA4MjMwMDAwMDBaGA8yMTI0MDgyMzAwNTAxOVowQTENMAsGA1UE
AwwEdGVzdDEjMCEGA1UECgwaUmVnZXJ5LCBodHRwczovL3JlZ2VyeS5jb20xCzAJBgNVBAYTAlVB
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9vHYbSZfFE6Cbgf0vwp5raxQYA+oQban
V/rwHweKUWYfcNyqc4pbDWcCG6qfpcIn4DeeNeGsR9dL26TVuJqQf8UP9K7+UkrBTFupv2I47pWz
+TFh5A71Z3vjBycZRAZ6HLKnIPWPinsC0qlv2x+VlDGujro5JeU5p8fQW2a2Sdbi80rM7J1qNxlf
ajA1FCiiRVbs1TvkPtj5N2BAGcDFCnD99to2++TSzXk5PflwliUnZRWo1jb55rN9+j3BCtqPYjV2
mkFpCOkK3cX8RADFfOg8R/GuYRHxXbIjaWCDPKyr76ExTGjm76qfRvoWJqEtMgTLAfkdl4ntVyuW
BR/TBQIDAQABo2MwYTAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjAdBgNVHQ4EFgQU
78b032SnKNcyz8GRKi5JOqEtZ78wHwYDVR0jBBgwFoAU78b032SnKNcyz8GRKi5JOqEtZ78wDQYJ
KoZIhvcNAQELBQADggEBADBLDjnKu38vgQ+jaqS1hcTiv4Qcp+WJnytXhgoJyUTh9RUCm9RPT0dV
eyml+OKj/GJzyFAF/4cCpEIvixyxLC97NpQfm1aR7el3jccrku+bo8WOjzxn2lVGf29NJ+QL5kBj
O511ragZj54OMtPo1ZENl5hTaN1WvAC/aCT+c0VPsURZsbDU1ODqohjrWP4kkCBL/JI3kKSjBIqP
Gy22da9o3r/xSfjAD9HQAFHuutEWT0rCeyCtCf7Zg355n9QiD33TVHu+ehcJEQ4NLbMmVFqDhvkz
VkSnrT6C9q6OjvJvJ1f3yg6zmq0zmXOBZSp81pf6HneOxzCD623NQRuOZLA=
-----END CERTIFICATE-----
`.trim(),kn=`
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA9vHYbSZfFE6Cbgf0vwp5raxQYA+oQbanV/rwHweKUWYfcNyq
c4pbDWcCG6qfpcIn4DeeNeGsR9dL26TVuJqQf8UP9K7+UkrBTFupv2I47pWz+TFh
5A71Z3vjBycZRAZ6HLKnIPWPinsC0qlv2x+VlDGujro5JeU5p8fQW2a2Sdbi80rM
7J1qNxlfajA1FCiiRVbs1TvkPtj5N2BAGcDFCnD99to2++TSzXk5PflwliUnZRWo
1jb55rN9+j3BCtqPYjV2mkFpCOkK3cX8RADFfOg8R/GuYRHxXbIjaWCDPKyr76Ex
TGjm76qfRvoWJqEtMgTLAfkdl4ntVyuWBR/TBQIDAQABAoIBABojR5HoB5TN6YrN
b0egS3hJPpmoVpocA/LxReS25tpOSaInzSfdG12cC1JT2UGRfyiBoo6X9CUHggk9
1XxMaeKIQHPY6OTbckHLivhNpHKGaG4GHtMljS6Wo5VQe2FioR6z/zIjI74X3pjf
I86I9YthxdToG5/p9xQN930RLla6wYErF0qkRuAv+H0jx72YI4yJHZCOqywjt2y3
Qa9PkSR8ANj2G1g8Kq5IKncP3Mok8r54I/7mJwilp7irRZj24cHRDys6Bmz9QIDx
GPS+2QthxwOLzWqnOx7pb+HiND+/vJwk1Y9bjLF3IyvuO39wCyQanftFH6dBvOG2
H+P2v7ECgYEA/PkCXG/Fzrx9gvKCCI430w6fMxMuOf9jz6zd+/nt517KrrLiioqW
WgLAT7iUIB/P799jKNUW7hpnC4YhJT/qDNREhh2spzHLmJAa8csWM26J3x/5QqkW
qXLyc11IfwfH4UEX5OhB3FCGrPj5ORn8UmZKKroMeDv9V1MTeu1+w9ECgYEA+eZe
h0lK8/NUlQZYQShdEIwjH9b9ANMZiyN2tZX+OxpB6CePxmk5VBUn6bmRMx9iqeJj
XjUQN2Peh91pL4OokKBYVDiFdFlFotzymBKttCN3YUlpurl2J6XKNDXUfnloffX+
15k+0MqHQwEDmzbJrs8YpbqE+UPqZKOdhcDerPUCgYAdYOHIUGa9gqBk47r8OV/8
T9dnPBQDQkiaJq5FBBp/4z9QmI+8nSmm3GjvGTWCoY8pgVznsg+OqVxMN1CEHe8V
fFVU6f9SD3NgjWPDrt0uLekvE2yENFTgauwDP9MahZHN9BxNRjfX2TY6wlNXMVBf
VWfJnH+0OutKB+jcPtaY8QKBgCvaxqn9Lb8j66r/YwuENtjJjvxucRXs9eWaAqIZ
QXVDxV8lWjDalGnyEIAOxbFwB5OCnCeTLlZaG1pCe8wP0cwXp4iYJqtlYzgSiCwx
0vPy6WdUR86x709D4/lHnRPY4IKCYgeZ6BEiCZyzl9tsQPaBd3TWB7Hqvj6NC/7F
+w3lAoGBANEjfIo36UkPx+SGB6CulkKA9dCmNLQ2M3dOHBUuId04vn/YHrUJxH/w
DdZqRg9IkpehFG8eUW6taG/UmIe4JObWrUBfEH4kv3VaV5tT41q/76LcEnS0USVi
dS/vQnmDWJw3sB3m2r/iE1P8Avr+XlaLBGRARq5K+l09vb4fOjFK
-----END RSA PRIVATE KEY-----
`.trim();var He=class{container;server;opts;get logger(){return this.opts.logger}set logger(n){this.opts.logger=n}generateUUID(){return this.container.generate_uuid()}async onConnectionOpen(n){}async onConnectionClose(n){}constructor(n={}){this.opts={...n,port:n.port??5671,tls:n.tls??!0},this.container=Ko.create_container({max_frame_size:512}),this.container.on("message",async r=>{this.logger?.trace({receiver:r.receiver.name},"Received AMQP message"),await this.onMessage(r)}),this.container.on("sender_open",async r=>{this.logger?.trace("AMQP Sender Open"),await this.onSenderOpen(r)}),this.container.on("sender_close",async r=>{this.logger?.trace("AMQP Sender Closed"),await this.onSenderClose(r)}),this.container.on("receiver_open",async r=>{this.logger?.trace("AMQP Receiver Open"),await this.onReceiverOpen(r)}),this.container.on("receiver_close",async r=>{this.logger?.trace("AMQP Receiver Closed"),await this.onReceiverClose(r)}),this.container.on("connection_open",async r=>{this.logger?.trace("AMQP Receiver Open"),await this.onConnectionOpen(r)}),this.container.on("connection_close",async r=>{this.logger?.trace("AMQP Receiver Closed"),await this.onConnectionClose(r)})}async open(){if(this.server)return;this.logger?.info("Launching AMQP broker...");let n=this.container.listen({port:this.opts.port,...this.opts.tls?{transport:"tls",cert:Rn,key:kn}:{}});this.server=n,await new Promise((r,A)=>{n.addListener("listening",()=>{this.logger?.info(`AMQP Broker listening on port ${this.opts.port}`),r()}),n.addListener("error",o=>{A(o)})}).finally(()=>{n.removeAllListeners("listening")})}async close(){this.logger?.info("Shutting down AMQP broker..."),await this.opts.cleanup?.();try{this.server&&await zo(this.server.close.bind(this.server))(),this.logger?.info("AMQP broker closed")}finally{this.server?.removeAllListeners(),this.container.removeAllListeners()}}set port(n){if(this.server)throw new Error("Cannot set port while server is running");this.opts.port=n}get port(){return this.opts.port}};import $t from"rhea";import V from"rhea";import{Temporal as Mn}from"@js-temporal/polyfill";import{Constants as b}from"@azure/core-amqp";import qn from"long";import ve from"long";import{z as ge}from"zod";var q=ge.union([ge.number().transform(t=>ve.fromNumber(t)),ge.number().array().transform(t=>ve.fromBytesBE(t)),ge.instanceof(Buffer).transform(t=>ve.fromBytesBE(t))]),Ut=ge.instanceof(ve).transform(t=>t.getHighBits()?t.toBytesBE():t.toNumber()),wn=ge.instanceof(ve).transform(t=>t.getHighBits()?Buffer.from(t.toBytesBE()):t.toNumber());import{z as Sn}from"zod";var Pt=Sn.union([Sn.string().uuid(),Sn.instanceof(Buffer).transform(t=>{let n=Buffer.alloc(16);return t.copy(n),[n.subarray(0,4),n.subarray(4,6),n.subarray(6,8),n.subarray(8,10),n.subarray(10,16)].map(r=>r.toString("hex")).join("-")})]);var w={debug:{operations:{setSequenceNumber:"x-localsandbox-set-sequence-number"}},messageState:{active:0,deferred:1,scheduled:2},deadLetterReason:"DeadLetterReason",deadLetterDescription:"DeadLetterErrorDescription",deadLetterSubqueue:"$DeadLetterQueue",subscriptionsSubqueue:"Subscriptions",errors:{messageExpired:{reason:"TTLExpiredException",description:"The message expired and was dead lettered."},maxDeliveryCountExceeded:{reason:"MaxDeliveryCountExceeded",description:"Message could not be consumed after 2 delivery attempts."}}};var xt=(...t)=>{let[n,,r]=t,A=()=>(r?.error({...typeof n=="object"?n:{queueId:n}},"Could not find queue or subscription"),new Error("Queue or subscription not found")),o=Zo(...t);if(!o)throw A();return o},Zo=(t,n,r)=>{if(typeof t=="string"||t.subscription_id){let A=Tn(typeof t=="string"?t:{...t,topic_name:t.queue_or_topic_name,subscription_name:t.subscription_name},n,r);if(A)return A}return Gt(t,n,r)},vn=(...t)=>{let[n,,r]=t,A=()=>(r?.error({...typeof n=="object"?n:{queueId:n}},"Could not find queue or subscription"),new Error("Queue or subscription not found")),o=Xo(...t);if(!o)throw A();return o},Xo=(t,n,r)=>{if(typeof t=="string"||"queue_name"in t){let A=Dn(t,n,r);if(A)return A}if(typeof t=="string"||"subscription_name"in t){let A=Tn(t,n,r);if(A)return A}},qt=(...t)=>{let[n,,r]=t,A=()=>(r?.error({...typeof n=="object"?n:{queueId:n}},"Could not find queue or topic"),new Error("Queue not found")),o=Gt(...t);if(!o)throw A();return o},Gt=(t,n,r)=>{if(typeof t=="string"||"queue_name"in t||"queue_or_topic_name"in t){let A=Dn(typeof t=="object"?"queue_name"in t?t:{...t,queue_name:t.queue_or_topic_name}:t,n,r);if(A)return A}if(typeof t=="string"||"topic_name"in t||"queue_or_topic_name"in t){let A=Ht(typeof t=="object"?"topic_name"in t?t:{...t,topic_name:t.queue_or_topic_name}:t,n,r);if(A)return A}},Je=(t,n,r)=>{let A=()=>(r?.error({...typeof t=="object"?t:{queueId:t}},"Could not find queue"),new Error("Queue not found")),o=Dn(t,n,r);if(!o)throw A();return o},Dn=(t,n,r)=>{if(typeof t=="string"){let c=n.sb_queue.get(t);return c?{...c,_model:"sb_queue"}:void 0}let{namespace_name:A,queue_name:o,resource_group_name:s,subscription_id:a}=t,l=n.sb_queue.select().where(c=>c.name===o).where(c=>c.sb_namespace().name===A).where(c=>c.sb_namespace().resource_group().name===s).where(c=>c.sb_namespace().resource_group().subscription().subscriptionId===a).executeTakeFirst();return l?{...l,_model:"sb_queue"}:void 0},Ot=(t,n,r)=>{let A=()=>(r?.error({...typeof t=="object"?t:{queueId:t}},"Could not find topic"),new Error(`Topic not found: ${typeof t=="object"?t.topic_name:t}`)),o=Ht(t,n,r);if(!o)throw A();return o},Ht=(t,n,r)=>{if(typeof t=="string"){let c=n.sb_topic.get(t);return c?{...c,_model:"sb_topic"}:void 0}let{namespace_name:A,topic_name:o,resource_group_name:s,subscription_id:a}=t,l=n.sb_topic.select().where(c=>c.name===o).where(c=>c.sb_namespace().name===A).where(c=>c.sb_namespace().resource_group().name===s).where(c=>c.sb_namespace().resource_group().subscription().subscriptionId===a).executeTakeFirst();return l?{...l,_model:"sb_topic"}:void 0},Jt=(t,n,r)=>{let A=()=>(r?.error({...typeof t=="object"?t:{queueId:t}},"Could not find subscription"),new Error(`Susbcription not found: ${typeof t=="object"?t.subscription_name:t}`)),o=Tn(t,n,r);if(!o)throw A();return o},Tn=(t,n,r)=>{if(typeof t=="string"){let p=n.sb_subscription.get(t);return p?{...p,_model:"sb_subscription"}:void 0}let{namespace_name:A,topic_name:o,subscription_name:s,resource_group_name:a,subscription_id:l}=t,c=n.sb_subscription.select().where(p=>p.name===s).where(p=>p.sb_topic().name===o).where(p=>p.sb_topic().sb_namespace().name===A).where(p=>p.sb_topic().sb_namespace().resource_group().name===a).where(p=>p.sb_topic().sb_namespace().resource_group().subscription().subscriptionId===l).executeTakeFirst();return c?{...c,_model:"sb_subscription"}:void 0};function Ye(t){let n=t._model==="sb_queue"||t._model==="sb_topic"?t.sb_namespace():t.sb_topic().sb_namespace(),r=n.resource_group(),A=r.subscription(),o={namespace_name:n.name,resource_group_name:r.name,subscription_id:A.subscriptionId};switch(t._model){case"sb_queue":return{...o,queue_name:t.name};case"sb_topic":return{...o,topic_name:t.name};case"sb_subscription":return{...o,subscription_name:t.name,topic_name:t.sb_topic().name}}}var Nn=t=>"queue_name"in t,$o=t=>"topic_name"in t&&"subscription_name"in t,Yt=t=>"topic_name"in t&&!("subscription_name"in t),jt=t=>"queue_or_topic_name"in t;var pe=t=>Nn(t)||$o(t);import{PriorityQueue as Wt}from"@datastructures-js/priority-queue";import{ErrorNameConditionMapper as Vt}from"@azure/core-amqp";var ee=class extends Error{constructor(r,A,o){super(o);this.condition=A;this.description=o;this.name=r}get amqpError(){return{condition:this.condition,description:this.description}}},je=class extends ee{constructor(r){super("SessionLockedError",Vt.SessionCannotBeLockedError,`The requested session '${r}' cannot be accepted. It may be locked by another receiver.`);this.session_id=r}},Ve=class extends ee{constructor(){super("SessionRequiredError",Vt.InvalidOperationError,"The SessionId was not set on a message, and it cannot be sent to the entity. Entities that have session support enabled can only receive messages that have the SessionId set to a valid value.")}};var We=class{constructor(n){this.sendMessage=n}scheduled_messages={};get messages(){return Object.values(this.scheduled_messages).map(({message:n})=>n)}scheduleMessage(n,r){let A=q.parse(n.message_annotations[b.sequenceNumber]).toString();return n.message_annotations[b.messageState]=w.messageState.scheduled,this.scheduled_messages[A]={timeout:setTimeout(()=>{delete this.scheduled_messages[A],this.sendMessage(n)},r.getTime()-Date.now()),message:n},n}cancelMessage(n){let r=this.scheduled_messages[n.toString()];return r?(clearTimeout(r.timeout),!0):!1}close(){Object.values(this.scheduled_messages).forEach(({timeout:n})=>{clearTimeout(n)})}},Fn=class{constructor(n){this.logger=n}_deliveries={};get deliveries(){return Object.values(this._deliveries)}get length(){return Object.keys(this._deliveries).length}deliveryKey(n){return Pt.parse(n.tag)}get(n){return this._deliveries[this.deliveryKey(n)]}store(n,r){let A=this.deliveryKey(n);this._deliveries[A]!=null&&this.logger?.warn({key:A,delivery_id:n.id},"Stored delivery overwrote another, this should never happen!!"),this._deliveries[A]=r}finish(n){let r=this._deliveries[this.deliveryKey(n)];return r||this.logger?.warn({delivery_id:n.id},"Tried to finish delivery that does not exist, this should never happen!!"),delete this._deliveries[this.deliveryKey(n)],r}},De=class{constructor(n=new qn(1)){this.initial_sequence_number=n;this.next_sequence_number=this.initial_sequence_number}next_sequence_number;allocateNextSequenceNumber(){let n=this.next_sequence_number;return this.next_sequence_number=this.next_sequence_number.add(1),n}bindToMessage(n,r=!1){return n.message_annotations??={},r?n.message_annotations[b.sequenceNumber]=wn.parse(this.allocateNextSequenceNumber()):n.message_annotations[b.sequenceNumber]??=wn.parse(this.allocateNextSequenceNumber()),n}};function zt(t,n){return q.parse(t.message.message_annotations[b.sequenceNumber]).compare(q.parse(n.message.message_annotations[b.sequenceNumber]))}var Ln=class{_consumers={};_consumer_by_session={};get values(){return Object.values(this._consumers)}get(n){return this._consumers[n.name]}add(n){let r=n.session_id;if(r&&this._consumer_by_session[r])throw new je(r);this._consumers[n.sender.name]={...n,session_id:r},r&&(this._consumer_by_session[r]=n)}remove(n){let r=this._consumers[n.name];r?.session_id&&delete this._consumer_by_session[r.session_id],delete this._consumers[n.name]}},ze=class{constructor(n,r,A,o,s,a=new De){this.store=n;this.queue_or_subscription_id=r;this.logger=A;this.consumer_balancer=o;this.parent=s;this.sequence_number_factory=a}_messages=new Wt(zt);_session_messages={};deferred_messages=new Map;locked_messages=new Map;message_scheduler=new We(n=>{this.enqueue(n),this.tryFlush()});message_expiration_timeouts={};consumers=new Ln;num_messages_transferred_to_dlq=0;pushMessage(n){n.message_annotations[b.enqueuedTime]=new Date,n.message_annotations[b.messageState]??=w.messageState.active;let r=n.group_id;r?(this._session_messages[r]??=new Wt(zt),this._session_messages[r].enqueue({message:n,scheduled_at:n.message_annotations[b.enqueuedTime]})):this._messages.enqueue({message:n,scheduled_at:n.message_annotations[b.enqueuedTime]})}enqueue(...n){n.forEach(r=>{this.pushMessage(r)})}enqueueFront(...n){n.forEach(r=>{this.pushMessage(r)})}sessionQueue(n){return n?this._session_messages[n]:this._messages}peek(n){try{return this.sessionQueue(n)?.front()}catch{return}}dequeue(n){try{return this.sessionQueue(n)?.dequeue()}catch{return}}refreshIdleTimeout(){this.queue.autoDeleteTimeout?.refresh()}propagateAccess(){switch(this.logger?.debug({queue_or_subscription_id:this.queue_or_subscription_id,queue_type:this.queue_type},"Propagating access..."),this.queue_type){case"sb_queue":this.store.sb_queue.update().where(n=>n.id===this.queue_or_subscription_id).set(n=>({properties:{...n.properties,accessedAt:new Date().toISOString()}})).executeTakeFirstOrThrow();break;case"sb_subscription":this.store.sb_subscription.update().where(n=>n.id===this.queue_or_subscription_id).set(n=>({properties:{...n.properties,accessedAt:new Date().toISOString()}})).executeTakeFirstOrThrow()}}tryDeadletterMessage(n,r,A){let o=this.queue;if(this.logger?.debug({reason:r,description:A,message:n.message_id,sequence_number:n.message_annotations[b.sequenceNumber]},"Deadlettering message"),o.properties.forwardDeadLetteredMessagesTo===o.name)throw new Error("Cannot dead-letter to self");let s=Ye(o);if(n.message_annotations[b.deadLetterReason]=r,n.message_annotations[b.deadLetterDescription]=A,o.properties.forwardDeadLetteredMessagesTo){n.message_annotations[b.deadLetterSource]=o._model==="sb_queue"?o.name:`${o.sb_topic().name}/${w.subscriptionsSubqueue}/${o.name}`,o._model==="sb_subscription"&&(n.message_annotations[b.enqueueSequenceNumber]=n.message_annotations[b.sequenceNumber],delete n.message_annotations[b.sequenceNumber]);let a={namespace_name:s.namespace_name,resource_group_name:s.resource_group_name,subscription_id:s.subscription_id,queue_or_topic_name:o.properties.forwardDeadLetteredMessagesTo,subqueue:void 0};this.logger?.debug({dlq_id:a},"Forwarding deadlettered message"),this.consumer_balancer.sendMessagesToQueue(a,n)}else this.logger?.debug("Forwarding deadlettered message to DLQ subqueue"),this.parent.get("deadletter").scheduleMessages(n)}listNonExpiredMessages(n){return[...this._messages.toArray().map(({message:r})=>r),...Object.values(this._session_messages).flatMap(r=>r.toArray()).map(({message:r})=>r),...n.include_locked?[...this.locked_messages.values()].map(({message:r})=>r):[],...this.deferred_messages.values(),...this.message_scheduler.messages].filter(r=>!r.absolute_expiry_time||new Date(r.absolute_expiry_time)>new Date).filter(r=>n.group_id===void 0||r.group_id===(n.group_id??void 0))}scheduleMessagesInFront(...n){this.enqueueFront(...n),this.tryFlush()}finishDelivery(n,r){n.current_delivery.finish(r),n.current_delivery.length===0&&n.schedule_for_deletion&&(this.logger?.debug({sender:n.sender.name},"Deleting consumer since all deliveries are completed"),this.consumers.remove(n.sender)),this.refreshIdleTimeout()}tryFlush(){let n=Mn.Duration.from(this.queue.properties.lockDuration).total("milliseconds");this.logger?.debug({messages:this._messages.size()},"Flushing messages"),this.refreshIdleTimeout(),this.propagateAccess();let r={},A;for(;A=this.consumers.values.find(({sender:o,session_id:s})=>o.sendable()&&o.is_open()&&o.is_remote_open()&&o.has_credit()&&this.peek(s)&&(r[o.name]===void 0||r[o.name]>0));){let o=this.dequeue(A.session_id);r[A.sender.name]??=A.sender.credit;let{message:s}=o;if(s.absolute_expiry_time&&new Date(s.absolute_expiry_time)<=new Date){this.logger?.debug({message_id:s.message_id,ttl:s.ttl,absolute_expiry_time:s.absolute_expiry_time,queue:this.queue_or_subscription_id},"Preventing message from sending due to expiration");continue}let a=A;this.locked_messages.set(s.message_id,{message:s,lock_duration_ms:n,timeout:setTimeout(()=>{this.logger?.debug({delivery_id:l.id,consumer:a.sender.name,message_id:s.message_id},"Unlocking message due to lock timeout!"),this.finishDelivery(a,l),this.locked_messages.delete(s.message_id),this.scheduleMessagesInFront(s)},n)}),s.message_annotations[b.lockedUntil]=+new Date().getTime()+n;let l=A.sender.send(s);r[A.sender.name]--,s.delivery_count??=0,s.delivery_count+=1,this.logger?.debug({delivery_id:l.id,consumer:A.sender.name,delivery_tag:Buffer.from(l.tag).length,sender_credit:r[A.sender.name]},"Sent message"),A.current_delivery.store(l,{delivery:l,message:s})}}scheduleMessages(...n){let r=n.map(c=>this.sequence_number_factory.bindToMessage(c)),A=[],o=this.queue;if(!!o.properties.requiresSession&&r.some(c=>!c.group_id))throw new Ve;let a=o._model==="sb_queue"?"requiresDuplicateDetection"in o.properties&&!!o.properties.requiresDuplicateDetection:!!o.sb_topic().properties.requiresDuplicateDetection,l=Mn.Duration.from(o._model==="sb_queue"?o.properties.duplicateDetectionHistoryTimeWindow:o.sb_topic().properties.duplicateDetectionHistoryTimeWindow).total("milliseconds");for(let c of r){if(a&&[...this._messages.toArray(),...Object.values(this._session_messages).flatMap(y=>y.toArray())].filter(({scheduled_at:y})=>Date.now()-y.getTime()<=l).some(({message:y})=>y.message_id===c.message_id))continue;let p=o.properties.defaultMessageTimeToLive??(o._model==="sb_subscription"?o.sb_topic().properties.defaultMessageTimeToLive:void 0)??"P10675199DT2H48M5.4775807S",I=Mn.Duration.from(p).total("milliseconds");if(!c.absolute_expiry_time){let y=new Date((c.creation_time?new Date(c.creation_time).getTime():Date.now())+I);c.absolute_expiry_time=y}let C=c.message_annotations?.[b.scheduledEnqueueTime];if(c.absolute_expiry_time&&(this.message_expiration_timeouts[c.message_id]=setTimeout(()=>{delete this.message_expiration_timeouts[c.message_id],this.queue.properties.deadLetteringOnMessageExpiration&&this.tryDeadletterMessage({...c,ttl:void 0,absolute_expiry_time:void 0,application_properties:{...c.application_properties,[w.deadLetterReason]:w.errors.messageExpired.reason,[w.deadLetterDescription]:w.errors.messageExpired.description}})},Math.max(0,new Date(c.absolute_expiry_time).getTime()-Date.now()))),this.queue_type==="sb_queue"){if(C&&!(C instanceof Date))throw new Error(`Expected ${b.scheduledEnqueueTime} to be parsed as JS Date instance`);C&&C.getTime()>Date.now()?this.message_scheduler.scheduleMessage(c,C):A.push(c)}else A.push(c)}return this.logger?.debug({requiresDuplicateDetection:a,duplicateDetectionMs:l,messages:r.length,queue:this.queue_or_subscription_id,messages_for_immediate_delivery:A.length},"Scheduling messages"),this.enqueue(...A),this.tryFlush(),r}consumeDeferredMessage(n){let r=this.deferred_messages.get(n.toString());return this.deferred_messages.delete(n.toString()),r}get messageCount(){return this.listNonExpiredMessages({include_locked:!0}).length}get messageCountDetails(){let n=this.listNonExpiredMessages({include_locked:!0});return{activeMessageCount:n.length,scheduledMessageCount:n.filter(r=>r.message_annotations?.[b.scheduledEnqueueTime]!=null&&!this.locked_messages.has(r.message_id)).length,transferDeadLetterMessageCount:this.num_messages_transferred_to_dlq,deadLetterMessageCount:0,transferMessageCount:0}}peekMessages(n,r){this.refreshIdleTimeout();let A=this.listNonExpiredMessages({include_locked:!1,group_id:r??null}).sort((o,s)=>q.parse(s.message_annotations[b.sequenceNumber]).toNumber()-q.parse(o.message_annotations[b.sequenceNumber]).toNumber());return A.slice(A.length-n,A.length).reverse()}cancelScheduledMessage(n){return this.refreshIdleTimeout(),this.message_scheduler.cancelMessage(n)}renewLock(n,r){let A=this.consumers.get(n);if(!A){this.logger?.error({sender:n.name,consumer_ids:Object.keys(this.consumers)},"Could not find consumer for lock renewal");return}let o=A.current_delivery.get(r);if(!o){this.logger?.error({sender:n.name,tags:Object.keys(A.current_delivery._deliveries)},"Could not find delivery for lock renewal");return}let s=this.locked_messages.get(o.message.message_id);if(!s){this.logger?.error({sender:n.name},"Could not find locked message for lock renewal");return}this.refreshIdleTimeout();let a=+Date.now()+s.lock_duration_ms;return s.message.message_annotations[b.lockedUntil]=new Date(a),s.timeout.refresh(),a}updateConsumerDisposition(n,r,A,o){let s=this.consumers.get(n);if(!s){this.logger?.error({sender:n.name,consumer_ids:Object.keys(this.consumers)},"Could not find consumer for disposition update");return}let a=s.current_delivery.get(r);if(!a){this.logger?.error({sender:n.name,tags:Object.keys(s.current_delivery._deliveries)},"Could not find delivery for disposition update");return}let{delivery:l,message:c}=a;switch(A){case"completed":s.sender.rcv_settle_mode===1&&l.update(!0),this.locked_messages.delete(c.message_id),this.finishDelivery(s,l),this.tryFlush();break;case"abandoned":{if(this.finishDelivery(s,l),this.locked_messages.delete(c.message_id),s.sender.rcv_settle_mode===1&&l.update(!0),l.remote_state?.undeliverable_here){c.message_annotations[b.messageState]=w.messageState.deferred,this.deferred_messages.set(q.parse(c.message_annotations[b.sequenceNumber]).toString(),c);return}let p=this.queue.properties.maxDeliveryCount;(c.delivery_count??1)>=p?(c.application_properties??={},c.application_properties[w.deadLetterReason]=w.errors.maxDeliveryCountExceeded.reason,c.application_properties[w.deadLetterDescription]=w.errors.maxDeliveryCountExceeded.description,this.tryDeadletterMessage(c)):this.scheduleMessagesInFront(c)}break;case"suspended":case"rejected":{let p=l.remote_state?.error;(p?.condition===b.deadLetterName||o?.deadLetterReason||o?.deadLetterDescription)&&(c.application_properties??={},c.application_properties[w.deadLetterReason]=o?.deadLetterReason??p.info.DeadLetterReason,c.application_properties[w.deadLetterDescription]=o?.deadLetterDescription??p.info.DeadLetterErrorDescription),this.finishDelivery(s,l),this.locked_messages.delete(c.message_id),this.tryDeadletterMessage(c),l.update(!0)}break}return this.refreshIdleTimeout(),c}addConsumer(n){let r=n.source.filter?.[b.sessionFilterName];this.logger?.debug({sender:n.name,queue_id:this.queue_or_subscription_id,sessionId:r,properties:n.properties},"Registering sender");let A={[V.SenderEvents.senderOpen]:o=>{this.logger?.trace({sender:o.sender.name},"sender is open")},[V.SenderEvents.sendable]:o=>{this.logger?.debug("sender is sendable"),this.tryFlush()},[V.SenderEvents.senderDraining]:o=>{this.logger?.debug("sender is draining"),this.tryFlush(),o.sender.set_drained(!0)},[V.SenderEvents.senderClose]:o=>{this.logger?.debug("sender is closed"),this.removeConsumer(o.sender)},[V.SenderEvents.senderFlow]:o=>{this.logger?.debug("sender in flow")},[V.SenderEvents.accepted]:o=>{this.logger?.debug("sender accepted message"),this.updateConsumerDisposition(o.sender,o.delivery,"completed")},[V.SenderEvents.released]:o=>{this.logger?.debug({undeliverable_here:o.delivery.remote_state?.undeliverable_here,message_annotations:o.delivery.remote_state?.message_annotations},"sender released message"),this.updateConsumerDisposition(o.sender,o.delivery,"abandoned")},[V.SenderEvents.settled]:o=>{this.logger?.debug("sender settled")},[V.SenderEvents.rejected]:o=>{this.logger?.debug(Object.keys(o),"sender rejected message"),this.updateConsumerDisposition(o.sender,o.delivery,"rejected")}};this.consumers.add({sender:n,listeners:A,current_delivery:new Fn(this.logger),schedule_for_deletion:!1,session_id:r}),n.set_source({...n.source,filter:{[b.sessionFilterName]:r}}),n.local.attach.properties={"com.microsoft:locked-until-utc":Ut.parse(qn.fromNumber(Date.now()+9999999999999).mul(1e4).add(621355968e9))},Object.entries(A).forEach(o=>n.addListener(...o)),this.propagateAccess()}removeConsumer(n){this.logger?.debug({sender:n.name},"Removing sender");let r=this.consumers.get(n);if(!r){this.logger?.warn({sender:n.name},"Could not find consumer");return}Object.entries(r.listeners).forEach(A=>A[1]&&r.sender.removeListener(...A)),r.current_delivery.length===0?(this.logger?.debug({sender:r.sender.name},"Removing consumer from queue"),this.consumers.remove(n)):(this.logger?.debug({sender:r.sender.name},"Scheduling consumer to be removed from queue"),r.schedule_for_deletion=!0)}removeConsumers(n){for(let r of Object.values(this.consumers.values))n(r.sender)&&this.removeConsumer(r.sender)}close(){this.logger?.debug("Closing message sequence"),this.message_scheduler.close(),Object.values(this.message_expiration_timeouts).forEach(clearTimeout),Object.values(this.locked_messages).forEach(({timeout:n})=>{clearTimeout(n)})}},Un=class extends ze{queue_type="sb_queue";get queue(){return Je(this.queue_or_subscription_id,this.store,this.logger)}},Pn=class extends ze{queue_type="sb_subscription";get queue(){return Jt(this.queue_or_subscription_id,this.store,this.logger)}},Ke=class{constructor(n,r,A,o){this.store=n;this.queue_id=r;this.logger=A;this.consumer_balancer=o;this.queue=this.createMessageSequence(),this.queue_deadletter=this.createMessageSequence()}sequence_number_factory=new De;queue;queue_deadletter;get(n){return n==="deadletter"?this.queue_deadletter:this.queue}removeConsumers(...n){this.queue.removeConsumers(...n),this.queue_deadletter.removeConsumers(...n)}close(){this.queue_deadletter.close(),this.queue.close()}},Ze=class extends Ke{createMessageSequence(){return new Un(this.store,this.queue_id,this.logger,this.consumer_balancer,this,this.sequence_number_factory)}},xn=class extends Ke{createMessageSequence(){return new Pn(this.store,this.queue_id,this.logger,this.consumer_balancer,this,this.sequence_number_factory)}closeListeners=[];onClose(n){this.closeListeners.push(n)}close(){this.closeListeners.forEach(n=>{n()}),this.closeListeners=[],super.close()}},Xe=class{constructor(n,r,A,o){this.store=n;this.topic_id=r;this.logger=A;this.consumer_balancer=o;this.subscription_trigger_fn=n.sb_subscription.registerTrigger({change:s=>{(!s.old_val||!s.new_val)&&this.refreshSubscriptions()}}),this.refreshSubscriptions()}get topic(){return Ot(this.topic_id,this.store,this.logger)}subscription_trigger_fn;sequence_number_factory=new De(new qn(1));message_scheduler=new We(n=>{this.logger?.debug({message_id:n.message_id,num_subscriptions:this.subscriptions.length},"Enqueueing scheduled message"),this.enqueue(n,!0),this.propagateAccess()});refreshSubscriptions(){let n=this.topic.sb_subscriptions(),r=new Set(this.subscriptions.map(o=>o.queue_id)),A=new Set(n.map(o=>o.id));for(let o of n)r.has(o.id)||this.registerSubscription(new xn(this.store,o.id,this.logger,this.consumer_balancer));for(let o of[...this.subscriptions])A.has(o.queue_id)||o.close()}subscriptions=[];registerSubscription(n){n.onClose(()=>this.subscriptions=this.subscriptions.filter(r=>r!==n)),this.subscriptions.push(n)}propagateAccess(){this.logger?.debug({topic_id:this.topic_id},"Propagating access..."),this.store.sb_topic.update().where(n=>n.id===this.topic_id).set(n=>({properties:{...n.properties,accessedAt:new Date().toISOString()}})).executeTakeFirstOrThrow()}get messageCountDetails(){return{scheduledMessageCount:this.message_scheduler.messages.length,activeMessageCount:0,transferDeadLetterMessageCount:0,deadLetterMessageCount:0,transferMessageCount:0}}enqueue(n,r=!1){let A=this.sequence_number_factory.bindToMessage(n,r);return A.message_annotations[b.enqueueSequenceNumber]=A.message_annotations[b.sequenceNumber],delete A.message_annotations[b.sequenceNumber],this.logger?.debug({message_id:A.message_id,num_subscriptions:this.subscriptions.length,message_annotations:A.message_annotations},"Enqueueing message to subscriptions"),this.subscriptions.flatMap(o=>o.get(void 0).scheduleMessages(structuredClone(A)))}scheduleMessages(...n){return this.propagateAccess(),n.flatMap(r=>{let A=this.sequence_number_factory.bindToMessage(r),o=r.message_annotations?.[b.scheduledEnqueueTime];return o&&o.getTime()>Date.now()?[this.message_scheduler.scheduleMessage(A,o)]:this.enqueue(A)})}close(){this.store.sb_subscription.unregisterTrigger(this.subscription_trigger_fn)}getSubscription(n){return this.propagateAccess(),this.subscriptions.find(r=>r.queue_id===n)}onSubscriptionChange(){this.refreshSubscriptions()}cancelScheduledMessage(n){return this.message_scheduler.cancelMessage(n)}};import{Constants as es}from"@azure/core-amqp";var $e=class{constructor(n,r){this.store=n;this.logger=r}_queues={};_topics={};_subscriptions={};messageSourceMessageCount(n){let r=this.getMessageSourceFromStoreOrThrow(n);return this.getOrCreateMessageSource(r,void 0).messageCount+this.getOrCreateMessageSource(r,"deadletter").messageCount}messageDestinationMessageCountDetails(n){return this.getOrCreateMessageDestination(this.getMessageDestinationFromStoreOrThrow(n)).messageCountDetails}messageSourceMessageCountDetails(n){return this.getOrCreateMessageSource(this.getMessageSourceFromStoreOrThrow(n),typeof n=="object"?n.subqueue:void 0).messageCountDetails}removeConsumers(n){Object.values(this._queues).forEach(r=>{r.removeConsumers(n)})}renewLock(n,...r){let A=this.getMessageSourceFromStoreOrThrow(n);return this.getOrCreateMessageSource(A,n.subqueue).renewLock(...r)}updateConsumerDisposition(n,...r){let A=this.getMessageSourceFromStoreOrThrow(n);this.getOrCreateMessageSource(A,n.subqueue).updateConsumerDisposition(...r)}add(n,r){let A=vn(n,this.store,this.logger);this.getOrCreateMessageSource(A,n.subqueue).addConsumer(r)}peekMessageFromQueue(n,r,A){let o=this.getMessageSourceFromStoreOrThrow(n);return this.getOrCreateMessageSource(o,n.subqueue).peekMessages(r,A)}consumeDeferredMessages(n,...r){let A=this.getMessageSourceFromStoreOrThrow(n),o=this.getOrCreateMessageSource(A,n.subqueue);return r.map(s=>o.consumeDeferredMessage(s)).filter(s=>!!s)}sendMessagesToQueue(n,...r){let A=this.getMessageDestinationFromStoreOrThrow(n),o=r.map(l=>(l.delivery_count??=0,l)),a=this.getOrCreateMessageDestination(A).scheduleMessages(...o).map(l=>l.message_annotations[es.sequenceNumber]);return this.logger?.debug({sequence_numbers:a},"assigned sequence numbers"),a}cancelScheduledMessage(n,r){return Yt(n)||jt(n)?this.getOrCreateMessageDestination(this.getMessageDestinationFromStoreOrThrow(n)).cancelScheduledMessage(r):this.getOrCreateMessageSource(this.getMessageSourceFromStoreOrThrow(n),n.subqueue).cancelScheduledMessage(r)}remove(n){this.removeSenderFromAll(n)}setSequenceNumber(n,r){this.getOrCreateQueue(this.getQueueFromStoreOrThrow(n).id,void 0).parent.sequence_number_factory.next_sequence_number=r}getOrCreateMessageDestination(n){switch(n._model){case"sb_queue":return this.getOrCreateQueue(n.id,void 0);case"sb_topic":return this.getOrCreateTopic(n.id)}}getOrCreateMessageSource(n,r){switch(n._model){case"sb_queue":return this.getOrCreateQueue(n.id,r);case"sb_subscription":return this.getOrCreateSubscription(n.id,n.sb_topic_id,r)}}getOrCreateQueue(n,r){if(this._queues[n])return this._queues[n].get(r);{let A=new Ze(this.store,n,this.logger,this);return this._queues[n]=A,A.get(r)}}getOrCreateSubscription(n,r,A){let s=this.getOrCreateTopic(r).getSubscription(n);if(!s)throw this.logger?.error({subscriptionId:n,topicId:r},"Could not find subscription"),new Error("Could not find subscription");return s.get(A)}getOrCreateTopic(n){if(this._topics[n])return this._topics[n];{let r=new Xe(this.store,n,this.logger,this);return this._topics[n]=r,r}}delete(n){let r=this._queues[n];r&&(r.close(),delete this._queues[n])}removeSenderFromAll(n){Object.values(this._queues).forEach(r=>{r.removeConsumers(A=>A.name===n.name)})}close(){Object.keys(this._queues).forEach(this.delete.bind(this))}getMessageDestinationFromStoreOrThrow(n){return qt(n,this.store,this.logger)}getMessageSourceFromStoreOrThrow(n){return vn(n,this.store,this.logger)}getQueueFromStoreOrThrow(n){return Je(n,this.store,this.logger)}};import{Constants as Q}from"@azure/core-amqp";import{Deque as rs}from"@datastructures-js/deque";import{z as B}from"zod";var Kt=t=>Buffer.from([t[3]??0,t[2]??0,t[1]??0,t[0]??0,t[5]??0,t[4]??0,t[7]??0,t[6]??0,t[8]??0,t[9]??0,t[10]??0,t[11]??0,t[12]??0,t[13]??0,t[14]??0,t[15]??0]);import{z as G}from"zod";import{Constants as ns}from"@azure/core-amqp";var Zt=[G.string().max(0),G.string(),G.string(),G.string(),G.string()],ts=G.union([G.tuple([...Zt]),G.tuple([...Zt,G.literal(w.subscriptionsSubqueue),G.string()])]).transform(([,t,n,r,A,o,s])=>({subscription_id:t,resource_group_name:n,namespace_name:r,queue_or_topic_name:A,...o==="Subscriptions"&&s?{subscription_name:s}:{}})),Xt=t=>{let n=t.pathname.split("/"),r=G.enum([ns.management]).safeParse(n.at(-1));r.success&&n.pop();let A=G.literal(w.deadLetterSubqueue).transform(()=>"deadletter").safeParse(n.at(-1));return A.success&&n.pop(),{...ts.parse(n),...A.success?{subqueue:A.data}:{},...r.success?{internal:r.data}:{}}};var he=class t extends He{constructor(r,A){super(A);this.store=r;this.consumer_balancer=new $e(this.store,this.logger)}connection_handshakes={};link_queue=new WeakMap;completeHandshake(r,A){this.connection_handshakes[r.container_id]??=new rs,this.connection_handshakes[r.container_id].pushFront(A)}consumeHandshake(r){let A=this.connection_handshakes[r.container_id]?.popBack();return this.connection_handshakes[r.container_id]?.size()===0&&delete this.connection_handshakes[r.container_id],A}cbs_senders={};session_id_map=new WeakMap;async onMessage({message:r,delivery:A,receiver:o,connection:s}){let a=r.application_properties?.operation;try{let l=(p,I)=>p.send({correlation_id:r.message_id,body:I,application_properties:{[Q.statusCode]:200}}),c=(p,I,C,y)=>p.send({correlation_id:r.message_id,body:{},application_properties:{[Q.statusCode]:I,[Q.errorCondition]:y,[Q.statusDescription]:C}});if(r.reply_to&&a===Q.operationPutToken){let p=this.cbs_senders[r.reply_to];if(!p)throw this.logger?.error({reply_to:r.reply_to},"Could not reply to queue consumer"),new Error("Could not reply to queue consumer");let I=r.application_properties?.name;if(!I)throw this.logger?.error("No connection string"),new Error("No connection string");let C;try{C=new URL(I)}catch(qr){throw this.logger?.error({err:qr},"Failed to parse sb connection string"),new Error("Failed to parse sb connection string")}this.logger?.debug({sb_connection_string:I},"Parsing connection string..");let{namespace_name:y,queue_or_topic_name:_,resource_group_name:S,subscription_id:N,subqueue:T,subscription_name:U}=Xt(C),ne=xt({resource_group_name:S,namespace_name:y,subscription_id:N,queue_or_topic_name:_,subscription_name:U},this.store,this.logger);if(T==="deadletter"&&ne.properties&&"forwardDeadLetteredMessagesTo"in ne.properties&&ne.properties.forwardDeadLetteredMessagesTo!=null){A.reject(),c(p,400,"Cannot create a message receiver on an entity with auto-forwarding enabled.");return}let Vn=Ye(ne);this.completeHandshake(s,{...Vn,subqueue:T}),this.logger?.info({queueId:Vn,sb_connection_string:I},"Handshake initialized"),A.accept(),l(p,"Accepted")}else if(a){let p=B.instanceof(Buffer).transform(_=>Kt(_)).or(B.string().uuid()),I=B.discriminatedUnion("operation",[B.object({operation:B.literal(Q.operations.scheduleMessage),body:B.object({messages:B.array(B.object({message:B.instanceof(Buffer),[Q.messageIdMapKey]:B.string()}))})}),B.object({operation:B.literal(Q.operations.cancelScheduledMessage),body:B.object({[Q.sequenceNumbers]:q.array()})}),B.object({operation:B.literal(Q.operations.peekMessage),body:B.object({[Q.fromSequenceNumber]:q,[Q.messageCount]:B.number(),[Q.sessionIdMapKey]:B.string().optional()})}),B.object({operation:B.literal(Q.operations.receiveBySequenceNumber),body:B.object({[Q.sequenceNumbers]:q.array(),[Q.receiverSettleMode]:B.number().int()})}),B.object({operation:B.literal(Q.operations.updateDisposition),associatedLinkName:B.string(),body:B.object({[Q.lockTokens]:p.array(),[Q.dispositionStatus]:B.enum(["completed","abandoned","suspended"]),[Q.deadLetterReason]:B.string().optional(),[Q.deadLetterDescription]:B.string().optional()})}),B.object({operation:B.literal(Q.operations.renewLock),associatedLinkName:B.string(),body:B.object({[Q.lockTokens]:p.array()})}),B.object({operation:B.literal(Q.operations.renewSessionLock),body:B.object({[Q.sessionIdMapKey]:B.string()})}),B.object({operation:B.literal(w.debug.operations.setSequenceNumber),body:B.object({[Q.sequenceNumber]:q})})]).safeParse({operation:a,associatedLinkName:r.application_properties?.[Q.associatedLinkName],body:r.body});if(!I.success){this.logger?.warn({err:I.error.format()},`Failed to parse message operation "${a}"`);return}let C=this.link_queue.get(o);if(!C)throw this.logger?.error("Could not find queue for receiver, did the handshake go through?"),new Error("Could not find queue for receiver, did the handshake go through?");if(I.data.operation===w.debug.operations.setSequenceNumber){let _=I.data.body[Q.sequenceNumber];if(!Nn(C))throw new Error("Cannot set sequence number on non-queue (unimplemented)");this.logger?.info(`Setting broker sequence number to ${_.toString()}`),this.consumer_balancer.setSequenceNumber(C,_),A.accept();return}if(!r.reply_to)throw this.logger?.error({receiver:o.name,operation:a},"Expected message to have reply_to"),new Error("Expected message to have reply_to");let y=this.cbs_senders[r.reply_to];if(!y)throw this.logger?.error({reply_to:r.reply_to},"Could not reply to queue consumer"),new Error("Could not reply to queue consumer");switch(this.logger?.debug({reply_to:r.reply_to,queue:C,properties:r.application_properties,receiver:o.name},`Performing operation ${I.data.operation}...`),I.data.operation){case Q.operations.scheduleMessage:{let _=this.consumer_balancer.sendMessagesToQueue(C,...I.data.body.messages.flatMap(({message:S,"message-id":N})=>yn(S).map(T=>(T.message_id??=N??$t.generate_uuid(),T))));A.accept(),l(y,{[Q.sequenceNumbers]:_})}break;case Q.operations.cancelScheduledMessage:{let _=I.data.body[Q.sequenceNumbers];for(let S of _)this.consumer_balancer.cancelScheduledMessage({...C,subqueue:void 0},S)||this.logger?.warn(`Tried to schedule sequence ${S.toString()} which was not found!`);A.accept(),l(y)}break;case Q.operations.peekMessage:{let{[Q.sessionIdMapKey]:_,[Q.messageCount]:S}=I.data.body;if(!pe(C)){l(y,{messages:[]});return}let N=this.consumer_balancer.peekMessageFromQueue(C,S,_);A.accept(),l(y,{messages:N.map(T=>({message:_n(T)}))})}break;case Q.operations.receiveBySequenceNumber:{if(!pe(C))throw new Error("Cannot send message to destination");let{[Q.sequenceNumbers]:_,[Q.receiverSettleMode]:S}=I.data.body;l(y,{messages:this.consumer_balancer.consumeDeferredMessages(C,..._).map(N=>({message:_n(N)}))}),S===1&&(A.accept(),A.update(!0))}break;case Q.operations.updateDisposition:{if(!pe(C))throw new Error("Cannot send message to destination");let{body:{[Q.lockTokens]:_,[Q.dispositionStatus]:S,[Q.deadLetterReason]:N,[Q.deadLetterDescription]:T},associatedLinkName:U}=I.data;_.forEach(ne=>{this.consumer_balancer.updateConsumerDisposition(C,{name:U},{tag:ne},S,{deadLetterReason:N,deadLetterDescription:T})}),l(y,{})}break;case Q.operations.renewLock:{if(!pe(C))throw new Error("Cannot send message to destination");let{body:{[Q.lockTokens]:_},associatedLinkName:S}=I.data,N=_.map(T=>this.consumer_balancer.renewLock(C,{name:S},{tag:T})).filter(T=>!!T);l(y,{expirations:N})}break;case Q.operations.renewSessionLock:l(y,{expiration:Date.now()+9999999999999}),A.accept(),A.update(!0);break;default:this.logger?.error({message:r},`Unhandled operation ${a}`);break}}else{let p=this.link_queue.get(o);if(!p)throw this.logger?.error("Could not find queue for receiver, did the handshake go through?"),new Error("Could not find queue for receiver, did the handshake go through?");let I=Se(r),C=yn(I);this.logger?.debug({receiver:o.name,queue:p,num_messages:C.length},"delivering message batch"),this.consumer_balancer.sendMessagesToQueue(p,...C.map(y=>(y.message_id??=$t.generate_uuid(),y))),A.accept()}}catch(l){if(l instanceof ee){A.reject(l.amqpError);return}this.logger?.error({err:l},"Unexpected error on message"),A.reject({description:l.message})}}async onReceiverOpen({receiver:r}){this.logger?.debug({receiver:r.name},"receiver opened");let A=this.consumeHandshake(r.connection);A&&this.link_queue.set(r,A)}async onReceiverClose({receiver:r}){this.link_queue.delete(r)}async onSenderOpen({sender:r}){this.logger?.debug({sender:r.name,properties:r.properties},"sender opened");try{let A=this.consumeHandshake(r.connection);if(!A)this.cbs_senders[r.name]=r;else{if(!pe(A)){this.logger?.error({queue:A},"Tried to connect receiver to message destination");return}this.consumer_balancer.add(A,r)}}catch(A){if(A instanceof ee){r.close(A.amqpError);return}this.logger?.error({sender:r.name,err:A},"Error adding consumer")}}async onSenderClose({sender:r}){this.link_queue.delete(r),this.logger?.debug({sender:r.name},"sender closed"),r.name in this.cbs_senders?delete this.cbs_senders[r.name]:this.consumer_balancer.remove(r)}async onConnectionClose({connection:r}){this.consumer_balancer.removeConsumers(A=>A.connection===r)}messageSourceMessageCount(...r){return this.consumer_balancer.messageSourceMessageCount(...r)}messageSourceMessageCountDetails(...r){return this.consumer_balancer.messageSourceMessageCountDetails(...r)}messageDestinationMessageCountDetails(...r){return this.consumer_balancer.messageDestinationMessageCountDetails(...r)}async close(){this.consumer_balancer.close(),await super.close()}consumer_balancer;get middleware(){return t.middleware(this)}static middleware(r){return async(A,o,s)=>(r?o.azure_service_bus_broker??=r:o.azure_service_bus_broker||o.logger?.warn("Azure Service Bus broker not present in request context!"),await s(A,o))}};var er=t=>async(n,r,A)=>(r.logger=t,await A(n,r)),nr=async(t,n,r)=>{if(!n.logger)throw new Error("Could not find logger in API route context!");return await r(t,n)};import{z as h}from"zod";var As=h.object({clientId:h.string().describe("Indicates the Client ID of the application that created the client-affine subscription.").optional(),isDurable:h.boolean().describe("For client-affine subscriptions, this value indicates whether the subscription is durable or not.").optional(),isShared:h.boolean().describe("For client-affine subscriptions, this value indicates whether the subscription is shared or not.").optional()}).describe("Properties specific to client affine subscriptions."),Gn=h.object({messageCount:h.number().int().describe("Number of messages.").readonly().optional(),createdAt:h.string().datetime({offset:!0}).describe("Exact time the message was created.").readonly().optional(),accessedAt:h.string().datetime({offset:!0}).describe("Last time there was a receive request to this subscription.").readonly().optional(),updatedAt:h.string().datetime({offset:!0}).describe("The exact time the message was updated.").readonly().optional(),countDetails:de.optional(),lockDuration:h.string().duration().describe("ISO 8061 lock duration timespan for the subscription. The default value is 1 minute.").optional(),requiresSession:h.boolean().describe("Value indicating if a subscription supports the concept of sessions.").optional(),defaultMessageTimeToLive:h.string().duration().describe("ISO 8061 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.").optional(),deadLetteringOnFilterEvaluationExceptions:h.boolean().describe("Value that indicates whether a subscription has dead letter support on filter evaluation exceptions.").optional(),deadLetteringOnMessageExpiration:h.boolean().describe("Value that indicates whether a subscription has dead letter support when a message expires.").optional(),duplicateDetectionHistoryTimeWindow:h.string().duration().describe("ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.").optional(),maxDeliveryCount:h.number().int().describe("Number of maximum deliveries.").optional(),status:K.optional(),enableBatchedOperations:h.boolean().describe("Value that indicates whether server-side batched operations are enabled.").optional(),autoDeleteOnIdle:h.string().duration().describe("ISO 8061 timeSpan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.").optional(),forwardTo:h.string().describe("Queue/Topic name to forward the messages").optional(),forwardDeadLetteredMessagesTo:h.string().describe("Queue/Topic name to forward the Dead Letter message").optional(),isClientAffine:h.boolean().describe("Value that indicates whether the subscription has an affinity to the client id.").optional(),clientAffineProperties:As.optional()}).describe("Description of Subscription Resource."),Ee=h.object({properties:Gn.optional(),systemData:Y.optional()}).and(Z).describe("Description of subscription resource."),os=h.object({value:h.array(Ee).describe("Result of the List Subscriptions operation.").optional(),nextLink:h.string().describe("Link to the next set of results. Not empty if Value contains incomplete list of subscriptions.").optional()}).describe("The response to the List Subscriptions operation."),On={"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions":[{methods:["GET"],queryParams:h.object({"api-version":h.string().describe("Client API version."),$skip:h.coerce.number().int().optional().describe("Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls."),$top:h.coerce.number().int().optional().describe("May be used to limit the number of results to the most recent N usageDetails.")}),routeParams:h.object({resourceGroupName:h.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:h.string().describe("The namespace name"),topicName:h.string().describe("The topic name."),subscriptionId:h.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:os.describe("Successfully retrieved list of subscriptions.")}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions/[subscriptionName]":[{methods:["PUT"],queryParams:h.object({"api-version":h.string().describe("Client API version.")}),routeParams:h.object({resourceGroupName:h.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:h.string().describe("The namespace name"),topicName:h.string().describe("The topic name."),subscriptionName:h.string().describe("The subscription name."),subscriptionId:h.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:Ee.describe("Parameters supplied to create a subscription resource."),jsonResponse:Ee.describe("Subscription create request accepted.")},{methods:["GET"],queryParams:h.object({"api-version":h.string().describe("Client API version.")}),routeParams:h.object({resourceGroupName:h.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:h.string().describe("The namespace name"),topicName:h.string().describe("The topic name."),subscriptionName:h.string().describe("The subscription name."),subscriptionId:h.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:Ee.describe("Successfully retrieved subscription description.")},{methods:["DELETE"],queryParams:h.object({"api-version":h.string().describe("Client API version.")}),routeParams:h.object({resourceGroupName:h.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:h.string().describe("The namespace name"),topicName:h.string().describe("The topic name."),subscriptionName:h.string().describe("The subscription name."),subscriptionId:h.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:h.object({})}]};import{z as m}from"zod";var en=m.object({sizeInBytes:m.number().int().describe("Size of the topic, in bytes.").readonly().optional(),createdAt:m.string().datetime({offset:!0}).describe("Exact time the message was created.").readonly().optional(),updatedAt:m.string().datetime({offset:!0}).describe("The exact time the message was updated.").readonly().optional(),accessedAt:m.string().datetime({offset:!0}).describe("Last time the message was sent, or a request was received, for this topic.").readonly().optional(),subscriptionCount:m.number().int().describe("Number of subscriptions.").readonly().optional(),countDetails:de.optional(),defaultMessageTimeToLive:m.string().duration().describe("ISO 8601 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.").optional(),maxSizeInMegabytes:m.number().int().describe("Maximum size of the topic in megabytes, which is the size of the memory allocated for the topic. Default is 1024.").optional(),maxMessageSizeInKilobytes:m.number().int().describe("Maximum size (in KB) of the message payload that can be accepted by the topic. This property is only used in Premium today and default is 1024.").optional(),requiresDuplicateDetection:m.boolean().describe("Value indicating if this topic requires duplicate detection.").optional(),duplicateDetectionHistoryTimeWindow:m.string().duration().describe("ISO8601 timespan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.").optional(),enableBatchedOperations:m.boolean().describe("Value that indicates whether server-side batched operations are enabled.").optional(),status:K.optional(),supportOrdering:m.boolean().describe("Value that indicates whether the topic supports ordering.").optional(),autoDeleteOnIdle:m.string().duration().describe("ISO 8601 timespan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.").optional(),enablePartitioning:m.boolean().describe("Value that indicates whether the topic to be partitioned across multiple message brokers is enabled.").optional(),enableExpress:m.boolean().describe("Value that indicates whether Express Entities are enabled. An express topic holds a message in memory temporarily before writing it to persistent storage.").optional()}).describe("The Topic Properties definition."),me=m.object({properties:en.optional(),systemData:Y.optional()}).and(Z).describe("Description of topic resource."),ss=m.object({value:m.array(me).describe("Result of the List Topics operation.").optional(),nextLink:m.string().describe("Link to the next set of results. Not empty if Value contains incomplete list of topics.").optional()}).describe("The response to the List Topics operation."),Hn={"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics":[{methods:["GET"],queryParams:m.object({"api-version":m.string().describe("Client API version."),$skip:m.coerce.number().int().optional().describe("Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls."),$top:m.coerce.number().int().optional().describe("May be used to limit the number of results to the most recent N usageDetails.")}),routeParams:m.object({resourceGroupName:m.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:m.string().describe("The namespace name"),subscriptionId:m.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:ss.describe("Successfully retrieved list of topics.")}],"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]":[{methods:["PUT"],queryParams:m.object({"api-version":m.string().describe("Client API version.")}),routeParams:m.object({resourceGroupName:m.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:m.string().describe("The namespace name"),topicName:m.string().describe("The topic name."),subscriptionId:m.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:me.describe("Parameters supplied to create a topic resource."),jsonResponse:me.describe("Topic successfully created.")},{methods:["GET"],queryParams:m.object({"api-version":m.string().describe("Client API version.")}),routeParams:m.object({resourceGroupName:m.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:m.string().describe("The namespace name"),topicName:m.string().describe("The topic name."),subscriptionId:m.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonResponse:me.describe("Topic description successfully retrieved.")},{methods:["DELETE"],queryParams:m.object({"api-version":m.string().describe("Client API version.")}),routeParams:m.object({resourceGroupName:m.string().describe("Name of the Resource group within the Azure subscription."),namespaceName:m.string().describe("The namespace name"),topicName:m.string().describe("The topic name."),subscriptionId:m.string().describe("Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.")}),jsonBody:m.object({})}]};var is="LocalSandbox Test Subscription",as="https://localsandbox.io",cs=async(t,n,r)=>{let A=at.safeParse(t.headers.get("Authorization")).data;if(!A)return new Response("Unauthorized",{status:401});let o=n.store.subscription.insert().values({subscriptionId:A,displayName:is,authorizationSource:as,state:"Enabled"}).onAllConflictDoNothing().executeTakeFirstOrThrow();return n.subscription=o,await r(t,n)},tr={maxSizeInMegabytes:!0,requiresDuplicateDetection:!0,enablePartitioning:!0,enableExpress:!0,maxMessageSizeInKilobytes:!0},rr={maxSizeInMegabytes:x.shape.maxSizeInMegabytes.default(1024),requiresDuplicateDetection:x.shape.requiresDuplicateDetection.default(!1),enablePartitioning:x.shape.enablePartitioning.default(!1),enableExpress:x.shape.enableExpress.default(!1),maxMessageSizeInKilobytes:x.shape.maxMessageSizeInKilobytes.default(256)},Ar={maxDeliveryCount:!0,lockDuration:!0,requiresSession:!0,deadLetteringOnMessageExpiration:!0,duplicateDetectionHistoryTimeWindow:!0},or={maxDeliveryCount:x.shape.maxDeliveryCount.default(10),lockDuration:L.string().duration().optional().default("PT1M").refine(t=>nn.Duration.from(t).total({unit:"minute"})<=5,"Lock duration cannot exceed 5 minutes"),requiresSession:x.shape.requiresSession.default(!1),deadLetteringOnMessageExpiration:x.shape.deadLetteringOnMessageExpiration.default(!1),duplicateDetectionHistoryTimeWindow:x.shape.duplicateDetectionHistoryTimeWindow.default("PT10M")},Jn={defaultMessageTimeToLive:!0,duplicateDetectionHistoryTimeWindow:!0,autoDeleteOnIdle:!0,status:!0},Yn={defaultMessageTimeToLive:L.string().duration().optional(),duplicateDetectionHistoryTimeWindow:L.string().duration().optional().default(nn.Duration.from({minutes:10}).toString()),autoDeleteOnIdle:L.string().duration().optional().refine(t=>!t||(process.env.LOCALSANDBOX_NO_ENFORCE_SB_AUTO_DELETE_IDLE_MINIMUM?!0:nn.Duration.from(t).total({unit:"minute"})>5),"autoDeleteOnIdle cannot be less than 5 minutes"),status:K.optional().default("Active")},R=st({globalSpec:{authMiddleware:{},afterAuthMiddleware:[cs,he.middleware(),nr],passErrors:!0},triggers:{sb_queue:{change(t){if(t.new_val?.autoDeleteTimeout&&t.new_val.autoDeleteTimeout.refresh(),t.new_val?.properties.autoDeleteOnIdle!==t.old_val?.properties.autoDeleteOnIdle){let n;t.new_val?.properties.autoDeleteOnIdle&&(clearTimeout(t.new_val.autoDeleteTimeout),n=setTimeout(()=>{t.store.delete().where(r=>r.id===t.new_val?.id).execute()},nn.Duration.from(t.new_val?.properties.autoDeleteOnIdle).total("milliseconds"))),t.store.update().where(r=>r.id===(t.new_val?.id??t.old_val?.id)).set({autoDeleteTimeout:n}).execute()}}}},models:{subscription:{primaryKey:"subscriptionId",schema:be.omit({id:!0,subscriptionPolicies:!0}).required().extend(be.pick({id:!0,subscriptionPolicies:!0}).partial().shape).transform(t=>({...t,id:t.id??`/subscriptions/${t.subscriptionId}`}))},resource_group:{primaryKey:"id",schema:z.omit({id:!0}).extend({id:L.string()}),hasOne:["subscription"]},sb_namespace:{primaryKey:"id",schema:j.and(L.object({id:L.string()})),hasOne:["resource_group"]},sb_topic:{primaryKey:"id",schema:me.and(L.object({properties:en.omit({...Jn,...tr,supportOrdering:!0}).extend({...Yn,...rr,supportOrdering:en.shape.supportOrdering.default(!0)}).default({}),autoDeleteTimeout:Oe.optional(),id:L.string()})),hasOne:["sb_namespace"]},sb_subscription:{primaryKey:"id",schema:Ee.and(L.object({properties:Gn.omit({...Jn,...Ar}).extend({...Yn,...or}).default({}),autoDeleteTimeout:Oe.optional(),id:L.string()})),hasOne:["sb_topic"]},sb_queue:{primaryKey:"id",schema:ue.and(L.object({properties:x.omit({...Jn,...Ar,...tr}).extend({...Yn,...or,...rr}).default({}),autoDeleteTimeout:Oe.optional(),id:L.string()})),hasOne:["sb_namespace"]}}});var D=(t,n,r)=>[n,t[n].find(A=>A.methods.includes(r))];R.implementRoute(...D(ke,"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]","PUT"),async(t,n)=>{let r=t.jsonBody;if(r.name&&r.name!==t.routeParams.resourceGroupName)throw new Error("Invalid name");let A=n.store.resource_group.insert().values({...r,id:`${n.subscription.id}/resourceGroups/${t.routeParams.resourceGroupName}`,name:r.name??t.routeParams.resourceGroupName,subscription_id:n.subscription.subscriptionId}).onAllConflictMerge().executeTakeFirstOrThrow();return n.json(A)});R.implementRoute(...D(ke,"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]","PATCH"),async(t,n)=>{let r=t.jsonBody;if(r.name&&r.name!==t.routeParams.resourceGroupName)throw new Error("Invalid name");let A=n.store.resource_group.update().where(o=>n.subscription.subscriptionId===o.subscription().subscriptionId).where(o=>o.subscription().subscriptionId===t.routeParams.subscriptionId).where(o=>o.name===t.routeParams.resourceGroupName).set(r).executeTakeFirstOrThrow();return n.json(A)});R.implementRoute(...D(ke,"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]","GET"),async(t,n)=>{let r=n.store.resource_group.select().where(A=>n.subscription.subscriptionId===A.subscription().subscriptionId).where(A=>A.subscription().subscriptionId===t.routeParams.subscriptionId).where(A=>A.name===t.routeParams.resourceGroupName).executeTakeFirstOrThrow(()=>new v("Could not find resource group"));return n.json(r)});R.implementRoute(...D(ke,"/subscriptions/[subscriptionId]/resourcegroups/[resourceGroupName]","HEAD"),async(t,n)=>(n.store.resource_group.select().where(r=>n.subscription.subscriptionId===r.subscription().subscriptionId).where(r=>r.subscription().subscriptionId===t.routeParams.subscriptionId).where(r=>r.name===t.routeParams.resourceGroupName).executeTakeFirstOrThrow(()=>new v("Could not find subscription")),new Response(null,{status:204})));R.implementRoute(...D(it,"/subscriptions","GET"),async(t,n)=>n.json({value:[n.subscription],nextLink:""}));R.implementRoute(...D(Ft,"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]","PUT"),async(t,n)=>{let r=t.jsonBody,A=n.store.resource_group.select().where(s=>n.subscription.subscriptionId===s.subscription().subscriptionId).where(s=>s.subscription().subscriptionId===t.routeParams.subscriptionId).where(s=>s.name===t.routeParams.resourceGroupName).executeTakeFirstOrThrow(()=>new v("Could not find resource group")),o=n.store.sb_namespace.insert().values({...r,id:`${A.id}/providers/Microsoft.ServiceBus/namespaces/${t.routeParams.namespaceName}`,location:A.location,name:t.routeParams.namespaceName,resource_group_id:A.id}).onAllConflictMerge().executeTakeFirstOrThrow();return n.json(o)});R.implementRoute(...D(bn,"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues/[queueName]","PUT"),async(t,n)=>{let r=t.jsonBody,A=n.store.sb_namespace.select().where(s=>s.resource_group().subscription().subscriptionId===n.subscription.subscriptionId).where(s=>s.resource_group().subscription().subscriptionId===t.routeParams.subscriptionId).where(s=>s.resource_group().name===t.routeParams.resourceGroupName).where(s=>s.name===t.routeParams.namespaceName).executeTakeFirstOrThrow(()=>new v("Namespace not found")),o=n.store.sb_queue.insert().values({...r,id:`${A.id}/queues/${t.routeParams.queueName}`,location:A.location,sb_namespace_id:A.id,name:t.routeParams.queueName,type:"Microsoft.ServiceBus/namespaces/queues",properties:{...r.properties,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),accessedAt:new Date(-62135568422e3).toISOString()}}).onAllConflictMerge().executeTakeFirstOrThrow();return n.json(o)});R.implementRoute(...D(bn,"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/queues/[queueName]","GET"),async(t,n)=>{let r=n.store.sb_namespace.select().where(a=>a.resource_group().subscription().subscriptionId===n.subscription.subscriptionId).where(a=>a.resource_group().subscription().subscriptionId===t.routeParams.subscriptionId).where(a=>a.resource_group().name===t.routeParams.resourceGroupName).where(a=>a.name===t.routeParams.namespaceName).executeTakeFirstOrThrow(()=>new v("Namespace not found")),A=n.store.sb_queue.select().where(a=>a.sb_namespace().id===r.id).where(a=>a.name===t.routeParams.queueName).executeTakeFirstOrThrow(()=>new v("Queue not found")),o=n.azure_service_bus_broker?.messageSourceMessageCount(A.id),s=n.azure_service_bus_broker?.messageSourceMessageCountDetails(A.id);return n.json({...A,properties:{...A.properties,defaultMessageTimeToLive:A.properties.defaultMessageTimeToLive??"P10675199DT2H48M5.4775807S",messageCount:o,countDetails:s,sizeInBytes:0,enableBatchedOperations:!0}})});R.implementRoute(...D(Hn,"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]","PUT"),async(t,n)=>{let r=t.jsonBody,A=n.store.sb_namespace.select().where(s=>s.resource_group().subscription().subscriptionId===n.subscription.subscriptionId).where(s=>s.resource_group().subscription().subscriptionId===t.routeParams.subscriptionId).where(s=>s.resource_group().name===t.routeParams.resourceGroupName).where(s=>s.name===t.routeParams.namespaceName).executeTakeFirstOrThrow(()=>new v("Namespace not found")),o=n.store.sb_topic.insert().values({...r,id:`${A.id}/topics/${t.routeParams.topicName}`,location:A.location,sb_namespace_id:A.id,name:t.routeParams.topicName,type:"Microsoft.ServiceBus/namespaces/topics",properties:{...r.properties,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),accessedAt:new Date("0001-01-01T00:00:00.000Z").toISOString()}}).onAllConflictMerge().executeTakeFirstOrThrow();return n.json(o)});R.implementRoute(...D(Hn,"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]","GET"),async(t,n)=>{let r=n.store.sb_namespace.select().where(s=>s.resource_group().subscription().subscriptionId===n.subscription.subscriptionId).where(s=>s.resource_group().subscription().subscriptionId===t.routeParams.subscriptionId).where(s=>s.resource_group().name===t.routeParams.resourceGroupName).where(s=>s.name===t.routeParams.namespaceName).executeTakeFirstOrThrow(()=>new v("Namespace not found")),A=n.store.sb_topic.select().where(s=>s.sb_namespace().id===r.id).where(s=>s.name===t.routeParams.topicName).executeTakeFirstOrThrow(()=>new v("Queue not found")),o=n.azure_service_bus_broker?.messageDestinationMessageCountDetails(A.id);return n.json({...A,properties:{...A.properties,defaultMessageTimeToLive:A.properties.defaultMessageTimeToLive??"P10675199DT2H48M5.4775807S",countDetails:o,enableBatchedOperations:!0,sizeInBytes:0,subscriptionCount:A.sb_subscriptions().length}})});R.implementRoute(...D(On,"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions/[subscriptionName]","PUT"),async(t,n)=>{let r=t.jsonBody,A=n.store.sb_topic.select().where(s=>s.sb_namespace().resource_group().subscription().subscriptionId===n.subscription.subscriptionId).where(s=>s.sb_namespace().resource_group().subscription().subscriptionId===t.routeParams.subscriptionId).where(s=>s.sb_namespace().resource_group().name===t.routeParams.resourceGroupName).where(s=>s.sb_namespace().name===t.routeParams.namespaceName).where(s=>s.name===t.routeParams.topicName).executeTakeFirstOrThrow(()=>new v("Topic not found")),o=n.store.sb_subscription.insert().values({...r,id:`${A.id}/subscriptions/${t.routeParams.subscriptionName}`,location:A.location,sb_topic_id:A.id,name:t.routeParams.subscriptionName,type:"Microsoft.ServiceBus/namespaces/topics/subscriptions",properties:{...r.properties,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),accessedAt:new Date().toISOString()}}).onAllConflictMerge().executeTakeFirstOrThrow();return n.json(o)});R.implementRoute(...D(On,"/subscriptions/[subscriptionId]/resourceGroups/[resourceGroupName]/providers/Microsoft.ServiceBus/namespaces/[namespaceName]/topics/[topicName]/subscriptions/[subscriptionName]","GET"),async(t,n)=>{let r=n.store.sb_topic.select().where(a=>a.sb_namespace().resource_group().subscription().subscriptionId===n.subscription.subscriptionId).where(a=>a.sb_namespace().resource_group().subscription().subscriptionId===t.routeParams.subscriptionId).where(a=>a.sb_namespace().resource_group().name===t.routeParams.resourceGroupName).where(a=>a.sb_namespace().name===t.routeParams.namespaceName).where(a=>a.name===t.routeParams.topicName).executeTakeFirstOrThrow(()=>new v("Topic not found")),A=n.store.sb_subscription.select().where(a=>a.sb_topic().id===r.id).where(a=>a.name===t.routeParams.subscriptionName).executeTakeFirstOrThrow(()=>new v("Queue not found")),o=n.azure_service_bus_broker?.messageSourceMessageCount(A.id),s=n.azure_service_bus_broker?.messageSourceMessageCountDetails(A.id);return n.json({...A,properties:{...A.properties,defaultMessageTimeToLive:A.properties.defaultMessageTimeToLive??"P10675199DT2H48M5.4775807S",messageCount:o,countDetails:s,deadLetteringOnFilterEvaluationExceptions:!1,enableBatchedOperations:!0,isClientAffine:!1}})});var sr=t=>{let{broker:n,store_bundle:r}=t,A=R.build();return async(o,s)=>await A.edgeSpecRouteBundle.makeRequest(o,{...s,middleware:[n.middleware,r.middleware,...s?.middleware??[]]})};import{PassThrough as gs}from"stream";import ls from"pino";import ds from"pino-pretty";var{default:us}=ls,Qe=({app:t,stream:n,level:r="info"}={})=>{let o=ds({colorize:!0,colorizeObjects:!0,errorLikeObjectKeys:["err","error"],ignore:"pid,hostname",sync:!0,destination:n});return us({name:t,level:r},o)};var jn=t=>{let n=new gs,r=Qe({stream:n,level:"debug",app:t});return n.on("data",A=>{console.log(A.toString().slice(0,-1))}),{logger:r,cleanup:async()=>{n.destroy(),n.removeAllListeners()}}};var ps=async(t,n,r)=>{let{logger:A,cleanup:o}=jn("api");A.debug({url:t.url,method:t.method,body:await t.clone().text()},"Got API Request"),n.logger=A;let s=await r(t,n);return await o(),s},hs=Me({authMiddleware:{},beforeAuthMiddleware:[ps,ot()]}),ar=(t={})=>{let{amqp_logger:n}=t;n??=jn("amqp");let r=R.createStoreBundle(),A=new he(r.store,{logger:n.logger,cleanup:n.cleanup,tls:!1}),o=sr({broker:A,store_bundle:r}),s={"/azure/[...params]":hs({methods:["DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT"],routeParams:ir.object({params:ir.string().array()})})(async(l,c)=>await o(l,{middleware:[er(c.logger.child({}))]}))},a=A;return{bundle:At(s),amqp_server:a}};import Is from"node:http";var vr=Vr(Sr(),1);import{buildToNodeHandler as ms}from"@edge-runtime/node-utils";var Qs={...vr.default,Uint8Array},Dr=t=>ms(Qs,t);var Tr=(t,{port:n,middleware:r=[]})=>Dr({defaultOrigin:`http://localhost${n?`:${n}`:""}`})(async o=>await t.makeRequest(o,{middleware:r})),Nr=async(t,n)=>{let r=Is.createServer(Tr(t,n)),{port:A}=n;return await new Promise((o,s)=>{r.on("error",s),r.listen(A,o)}),r};var Mr=async(t,n)=>await Nr(t,{port:n});import{z as tn}from"zod";var od=7329,sd=5672,Cs=tn.object({LOG_LEVEL:tn.string().default("info"),LOCALSANDBOX_PORT:tn.coerce.number().default(7329),LOCALSANDBOX_AMQP_PORT:tn.coerce.number().default(5672)}),Fr=(t={})=>Cs.parse({...process.env,...t});import Lr from"detect-port";var Ur=async({env:t,logger:n})=>(n??=console,await Lr(t.LOCALSANDBOX_PORT)!==t.LOCALSANDBOX_PORT?(n.error(`Port ${t.LOCALSANDBOX_PORT} is already in use`),!1):await Lr(t.LOCALSANDBOX_AMQP_PORT)!==t.LOCALSANDBOX_AMQP_PORT?(n.error(`Port ${t.LOCALSANDBOX_AMQP_PORT} is already in use`),!1):!0);function Pr(t){return Bs(t)&&t instanceof Error&&(typeof t.errno=="number"||typeof t.errno>"u")&&typeof t.code=="string"&&(typeof t.path=="string"||typeof t.path>"u")&&(typeof t.syscall=="string"||typeof t.syscall>"u")}function xr(t){return t.code==="EADDRINUSE"&&"port"in t}function Bs(t){return typeof t=="object"&&t!==null}var md=async({env:t=Fr()}={})=>{let n=[];try{let r=Qe({level:t.LOG_LEVEL});if(!await Ur({env:t,logger:r})){process.exitCode=1;return}process.on("uncaughtException",function(l){r.error("Uncaught exception",{err:l,stack:l.stack,name:l.name})}),process.on("unhandledRejection",(l,c)=>{r.error("Unhandled Rejection at: Promise",{promise:c,reason:l})});let A=Qe({level:t.LOG_LEVEL,app:"amqp"});r.info("Starting API server...");let{amqp_server:o,bundle:s}=ar({amqp_logger:{logger:A}}),a=await Mr(s,t.LOCALSANDBOX_PORT);n.push(()=>{r.info("Closing api server..."),a.close(),r.info("API server closed")}),r.info(`API listening on port ${t.LOCALSANDBOX_PORT}`),o.port=t.LOCALSANDBOX_AMQP_PORT,await o.open(),n.push(async()=>{await o.close()}),await new Promise((l,c)=>{let p=!1,I=async()=>{if(!p){p=!0;try{r.info("Shutting down gracefully...");for(let C of n)await C();n=[],r.info("Graceful shutdown completed successfully."),setTimeout(()=>{r.error("Graceful shutdown took too long. Exiting."),process.exit(1)},1e3).unref(),l()}catch(C){c(C)}}};process.on("SIGINT",async()=>{r.info("Received signal SIGINT"),process.exitCode=1,await I()})})}catch(r){process.exitCode=1;let A=Qe();if(Pr(r)){xr(r)&&A.error(`Port ${r.port} is already in use. Please use a different port.`);return}A.error({err:r},"Error starting server")}finally{for(let r of n)await r()}};export{od as a,sd as b,Fr as c,Ur as d,md as e};
