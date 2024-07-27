// src/utils.ts
function d(e, t) {
  if (!e)
    throw new Error(t);
}
function y(e, t) {
  return typeof t === e;
}
function w(e) {
  return e instanceof Promise;
}
function f(e, t, n) {
  Object.defineProperty(e, t, n);
}
function p(e, t, n) {
  Object.defineProperty(e, t, { value: n });
}

// src/constants.ts
var u = Symbol.for("tinyspy:spy");

// src/internal.ts
var x = /* @__PURE__ */ new Set(), P = (e) => {
  e.called = !1, e.callCount = 0, e.calls = [], e.results = [], e.resolves = [], e.next = [];
}, K = (e) => (f(e, u, { value: { reset: () => P(e[u]) } }), e[u]), I = (e) => e[u] || K(e);
function g(e) {
  d(
    y("function", e) || y("undefined", e),
    "cannot spy on a non-function value"
  );
  let t = function(...s) {
    let r = I(t);
    r.called = !0, r.callCount++, r.calls.push(s);
    let R = r.next.shift();
    if (R) {
      r.results.push(R);
      let [o, l] = R;
      if (o === "ok")
        return l;
      throw l;
    }
    let i, c = "ok", a = r.results.length;
    if (r.impl)
      try {
        new.target ? i = Reflect.construct(r.impl, s, new.target) : i = r.impl.apply(this, s), c = "ok";
      } catch (o) {
        throw i = o, c = "error", r.results.push([c, o]), o;
      }
    let S = [c, i];
    return w(i) && i.then(
      (o) => r.resolves[a] = ["ok", o],
      (o) => r.resolves[a] = ["error", o]
    ), r.results.push(S), i;
  };
  p(t, "_isMockFunction", !0), p(t, "length", e ? e.length : 0), p(t, "name", e && e.name || "spy");
  let n = I(t);
  return n.reset(), n.impl = e, t;
}
function T(e) {
  let t = I(e);
  f(e, "returns", {
    get: () => t.results.map(([, n]) => n)
  }), [
    "called",
    "callCount",
    "results",
    "resolves",
    "calls",
    "reset",
    "impl"
  ].forEach(
    (n) => f(e, n, { get: () => t[n], set: (s) => t[n] = s })
  ), p(e, "nextError", (n) => (t.next.push(["error", n]), t)), p(e, "nextResult", (n) => (t.next.push(["ok", n]), t));
}

// src/spy.ts
function L(e) {
  let t = g(e);
  return T(t), t;
}

// src/spyOn.ts
var k = (e, t) => Object.getOwnPropertyDescriptor(e, t), O = (e, t) => {
  t != null && typeof t == "function" && t.prototype != null && Object.setPrototypeOf(e.prototype, t.prototype);
};
function C(e, t, n) {
  d(
    !y("undefined", e),
    "spyOn could not find an object to spy upon"
  ), d(
    y("object", e) || y("function", e),
    "cannot spyOn on a primitive value"
  );
  let [s, r] = (() => {
    if (!y("object", t))
      return [t, "value"];
    if ("getter" in t && "setter" in t)
      throw new Error("cannot spy on both getter and setter");
    if ("getter" in t)
      return [t.getter, "get"];
    if ("setter" in t)
      return [t.setter, "set"];
    throw new Error("specify getter or setter to spy on");
  })(), R = k(e, s), i = Object.getPrototypeOf(e), c = i && k(i, s), a = R || c;
  d(
    a || s in e,
    `${String(s)} does not exist`
  );
  let S = !1;
  r === "value" && a && !a.value && a.get && (r = "get", S = !0, n = a.get());
  let o;
  a ? o = a[r] : r !== "value" ? o = () => e[s] : o = e[s], n || (n = o);
  let l = g(n);
  r === "value" && O(l, o);
  let h = (A) => {
    let { value: M, ...v } = a || {
      configurable: !0,
      writable: !0
    };
    r !== "value" && delete v.writable, v[r] = A, f(e, s, v);
  }, b = () => a ? f(e, s, a) : h(o), m = l[u];
  return p(m, "restore", b), p(m, "getOriginal", () => S ? o() : o), p(m, "willCall", (A) => (m.impl = A, l)), h(
    S ? () => (O(l, n), l) : l
  ), x.add(l), l;
}
function Q(e, t, n) {
  let s = C(e, t, n);
  return T(s), ["restore", "getOriginal", "willCall"].forEach((r) => {
    p(s, r, s[u][r]);
  }), s;
}

// src/restoreAll.ts
function X() {
  for (let e of x)
    e.restore();
  x.clear();
}
export {
  g as createInternalSpy,
  I as getInternalState,
  C as internalSpyOn,
  X as restoreAll,
  x as spies,
  L as spy,
  Q as spyOn
};
