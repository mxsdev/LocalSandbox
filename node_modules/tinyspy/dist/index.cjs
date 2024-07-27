"use strict";
var h = Object.defineProperty;
var C = Object.getOwnPropertyDescriptor;
var M = Object.getOwnPropertyNames;
var E = Object.prototype.hasOwnProperty;
var G = (e, t) => {
  for (var r in t)
    h(e, r, { get: t[r], enumerable: !0 });
}, F = (e, t, r, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of M(t))
      !E.call(e, n) && n !== r && h(e, n, { get: () => t[n], enumerable: !(s = C(t, n)) || s.enumerable });
  return e;
};
var j = (e) => F(h({}, "__esModule", { value: !0 }), e);

// src/index.ts
var $ = {};
G($, {
  createInternalSpy: () => R,
  getInternalState: () => m,
  internalSpyOn: () => P,
  restoreAll: () => _,
  spies: () => c,
  spy: () => V,
  spyOn: () => L
});
module.exports = j($);

// src/utils.ts
function x(e, t) {
  if (!e)
    throw new Error(t);
}
function y(e, t) {
  return typeof t === e;
}
function k(e) {
  return e instanceof Promise;
}
function f(e, t, r) {
  Object.defineProperty(e, t, r);
}
function p(e, t, r) {
  Object.defineProperty(e, t, { value: r });
}

// src/constants.ts
var u = Symbol.for("tinyspy:spy");

// src/internal.ts
var c = /* @__PURE__ */ new Set(), D = (e) => {
  e.called = !1, e.callCount = 0, e.calls = [], e.results = [], e.resolves = [], e.next = [];
}, q = (e) => (f(e, u, { value: { reset: () => D(e[u]) } }), e[u]), m = (e) => e[u] || q(e);
function R(e) {
  x(
    y("function", e) || y("undefined", e),
    "cannot spy on a non-function value"
  );
  let t = function(...s) {
    let n = m(t);
    n.called = !0, n.callCount++, n.calls.push(s);
    let S = n.next.shift();
    if (S) {
      n.results.push(S);
      let [o, l] = S;
      if (o === "ok")
        return l;
      throw l;
    }
    let i, d = "ok", a = n.results.length;
    if (n.impl)
      try {
        new.target ? i = Reflect.construct(n.impl, s, new.target) : i = n.impl.apply(this, s), d = "ok";
      } catch (o) {
        throw i = o, d = "error", n.results.push([d, o]), o;
      }
    let g = [d, i];
    return k(i) && i.then(
      (o) => n.resolves[a] = ["ok", o],
      (o) => n.resolves[a] = ["error", o]
    ), n.results.push(g), i;
  };
  p(t, "_isMockFunction", !0), p(t, "length", e ? e.length : 0), p(t, "name", e && e.name || "spy");
  let r = m(t);
  return r.reset(), r.impl = e, t;
}
function T(e) {
  let t = m(e);
  f(e, "returns", {
    get: () => t.results.map(([, r]) => r)
  }), [
    "called",
    "callCount",
    "results",
    "resolves",
    "calls",
    "reset",
    "impl"
  ].forEach(
    (r) => f(e, r, { get: () => t[r], set: (s) => t[r] = s })
  ), p(e, "nextError", (r) => (t.next.push(["error", r]), t)), p(e, "nextResult", (r) => (t.next.push(["ok", r]), t));
}

// src/spy.ts
function V(e) {
  let t = R(e);
  return T(t), t;
}

// src/spyOn.ts
var O = (e, t) => Object.getOwnPropertyDescriptor(e, t), b = (e, t) => {
  t != null && typeof t == "function" && t.prototype != null && Object.setPrototypeOf(e.prototype, t.prototype);
};
function P(e, t, r) {
  x(
    !y("undefined", e),
    "spyOn could not find an object to spy upon"
  ), x(
    y("object", e) || y("function", e),
    "cannot spyOn on a primitive value"
  );
  let [s, n] = (() => {
    if (!y("object", t))
      return [t, "value"];
    if ("getter" in t && "setter" in t)
      throw new Error("cannot spy on both getter and setter");
    if ("getter" in t)
      return [t.getter, "get"];
    if ("setter" in t)
      return [t.setter, "set"];
    throw new Error("specify getter or setter to spy on");
  })(), S = O(e, s), i = Object.getPrototypeOf(e), d = i && O(i, s), a = S || d;
  x(
    a || s in e,
    `${String(s)} does not exist`
  );
  let g = !1;
  n === "value" && a && !a.value && a.get && (n = "get", g = !0, r = a.get());
  let o;
  a ? o = a[n] : n !== "value" ? o = () => e[s] : o = e[s], r || (r = o);
  let l = R(r);
  n === "value" && b(l, o);
  let w = (A) => {
    let { value: z, ...v } = a || {
      configurable: !0,
      writable: !0
    };
    n !== "value" && delete v.writable, v[n] = A, f(e, s, v);
  }, K = () => a ? f(e, s, a) : w(o), I = l[u];
  return p(I, "restore", K), p(I, "getOriginal", () => g ? o() : o), p(I, "willCall", (A) => (I.impl = A, l)), w(
    g ? () => (b(l, r), l) : l
  ), c.add(l), l;
}
function L(e, t, r) {
  let s = P(e, t, r);
  return T(s), ["restore", "getOriginal", "willCall"].forEach((n) => {
    p(s, n, s[u][n]);
  }), s;
}

// src/restoreAll.ts
function _() {
  for (let e of c)
    e.restore();
  c.clear();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createInternalSpy,
  getInternalState,
  internalSpyOn,
  restoreAll,
  spies,
  spy,
  spyOn
});
