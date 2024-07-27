"use strict";
var A = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var J = Object.getOwnPropertyNames;
var U = Object.prototype.hasOwnProperty;
var W = (n, s, t) => s in n ? A(n, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[s] = t;
var X = (n, s) => {
  for (var t in s)
    A(n, t, { get: s[t], enumerable: !0 });
}, Z = (n, s, t, e) => {
  if (s && typeof s == "object" || typeof s == "function")
    for (let r of J(s))
      !U.call(n, r) && r !== t && A(n, r, { get: () => s[r], enumerable: !(e = G(s, r)) || e.enumerable });
  return n;
};
var tt = (n) => Z(A({}, "__esModule", { value: !0 }), n);
var i = (n, s, t) => (W(n, typeof s != "symbol" ? s + "" : s, t), t), S = (n, s, t) => {
  if (!s.has(n))
    throw TypeError("Cannot " + t);
};
var v = (n, s, t) => (S(n, s, "read from private field"), t ? t.call(n) : s.get(n)), O = (n, s, t) => {
  if (s.has(n))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(n) : s.set(n, t);
}, d = (n, s, t, e) => (S(n, s, "write to private field"), e ? e.call(n, t) : s.set(n, t), t), B = (n, s, t, e) => ({
  set _(r) {
    d(n, s, r, t);
  },
  get _() {
    return v(n, s, e);
  }
});

// src/index.ts
var at = {};
X(at, {
  Bench: () => k,
  Task: () => w,
  default: () => ot,
  hrtimeNow: () => z,
  now: () => F
});
module.exports = tt(at);

// node_modules/.pnpm/yocto-queue@1.0.0/node_modules/yocto-queue/index.js
var P = class {
  constructor(s) {
    i(this, "value");
    i(this, "next");
    this.value = s;
  }
}, f, b, y, L = class {
  constructor() {
    O(this, f, void 0);
    O(this, b, void 0);
    O(this, y, void 0);
    this.clear();
  }
  enqueue(s) {
    let t = new P(s);
    v(this, f) ? (v(this, b).next = t, d(this, b, t)) : (d(this, f, t), d(this, b, t)), B(this, y)._++;
  }
  dequeue() {
    let s = v(this, f);
    if (!!s)
      return d(this, f, v(this, f).next), B(this, y)._--, s.value;
  }
  clear() {
    d(this, f, void 0), d(this, b, void 0), d(this, y, 0);
  }
  get size() {
    return v(this, y);
  }
  *[Symbol.iterator]() {
    let s = v(this, f);
    for (; s; )
      yield s.value, s = s.next;
  }
};
f = new WeakMap(), b = new WeakMap(), y = new WeakMap();

// node_modules/.pnpm/p-limit@4.0.0/node_modules/p-limit/index.js
function g(n) {
  if (!((Number.isInteger(n) || n === Number.POSITIVE_INFINITY) && n > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  let s = new L(), t = 0, e = () => {
    t--, s.size > 0 && s.dequeue()();
  }, r = async (c, m, h) => {
    t++;
    let p = (async () => c(...h))();
    m(p);
    try {
      await p;
    } catch (x) {
    }
    e();
  }, o = (c, m, h) => {
    s.enqueue(r.bind(void 0, c, m, h)), (async () => (await Promise.resolve(), t < n && s.size > 0 && s.dequeue()()))();
  }, u = (c, ...m) => new Promise((h) => {
    o(c, h, m);
  });
  return Object.defineProperties(u, {
    activeCount: {
      get: () => t
    },
    pendingCount: {
      get: () => s.size
    },
    clearQueue: {
      value: () => {
        s.clear();
      }
    }
  }), u;
}

// src/event.ts
function a(n, s = null) {
  let t = new Event(n);
  return s && Object.defineProperty(t, "task", {
    value: s,
    enumerable: !0,
    writable: !1,
    configurable: !1
  }), t;
}

// src/constants.ts
var et = {
  1: 12.71,
  2: 4.303,
  3: 3.182,
  4: 2.776,
  5: 2.571,
  6: 2.447,
  7: 2.365,
  8: 2.306,
  9: 2.262,
  10: 2.228,
  11: 2.201,
  12: 2.179,
  13: 2.16,
  14: 2.145,
  15: 2.131,
  16: 2.12,
  17: 2.11,
  18: 2.101,
  19: 2.093,
  20: 2.086,
  21: 2.08,
  22: 2.074,
  23: 2.069,
  24: 2.064,
  25: 2.06,
  26: 2.056,
  27: 2.052,
  28: 2.048,
  29: 2.045,
  30: 2.042,
  31: 2.0399,
  32: 2.0378,
  33: 2.0357,
  34: 2.0336,
  35: 2.0315,
  36: 2.0294,
  37: 2.0273,
  38: 2.0252,
  39: 2.0231,
  40: 2.021,
  41: 2.0198,
  42: 2.0186,
  43: 2.0174,
  44: 2.0162,
  45: 2.015,
  46: 2.0138,
  47: 2.0126,
  48: 2.0114,
  49: 2.0102,
  50: 2.009,
  51: 2.0081,
  52: 2.0072,
  53: 2.0063,
  54: 2.0054,
  55: 2.0045,
  56: 2.0036,
  57: 2.0027,
  58: 2.0018,
  59: 2.0009,
  60: 2,
  61: 1.9995,
  62: 1.999,
  63: 1.9985,
  64: 1.998,
  65: 1.9975,
  66: 1.997,
  67: 1.9965,
  68: 1.996,
  69: 1.9955,
  70: 1.995,
  71: 1.9945,
  72: 1.994,
  73: 1.9935,
  74: 1.993,
  75: 1.9925,
  76: 1.992,
  77: 1.9915,
  78: 1.991,
  79: 1.9905,
  80: 1.99,
  81: 1.9897,
  82: 1.9894,
  83: 1.9891,
  84: 1.9888,
  85: 1.9885,
  86: 1.9882,
  87: 1.9879,
  88: 1.9876,
  89: 1.9873,
  90: 1.987,
  91: 1.9867,
  92: 1.9864,
  93: 1.9861,
  94: 1.9858,
  95: 1.9855,
  96: 1.9852,
  97: 1.9849,
  98: 1.9846,
  99: 1.9843,
  100: 1.984,
  101: 1.9838,
  102: 1.9836,
  103: 1.9834,
  104: 1.9832,
  105: 1.983,
  106: 1.9828,
  107: 1.9826,
  108: 1.9824,
  109: 1.9822,
  110: 1.982,
  111: 1.9818,
  112: 1.9816,
  113: 1.9814,
  114: 1.9812,
  115: 1.9819,
  116: 1.9808,
  117: 1.9806,
  118: 1.9804,
  119: 1.9802,
  120: 1.98,
  infinity: 1.96
}, R = et;

// src/utils.ts
var st = (n) => n / 1e6, z = () => st(Number(process.hrtime.bigint())), F = () => performance.now();
function nt(n) {
  return n !== null && typeof n == "object" && typeof n.then == "function";
}
var j = (n, s) => n.reduce((e, r) => e + (r - s) ** 2, 0) / (n.length - 1) || 0, rt = (async () => {
}).constructor, it = (n) => n.constructor === rt, H = async (n) => {
  if (it(n.fn))
    return !0;
  try {
    if (n.opts.beforeEach != null)
      try {
        await n.opts.beforeEach.call(n);
      } catch (e) {
      }
    let s = n.fn(), t = nt(s);
    if (t)
      try {
        await s;
      } catch (e) {
      }
    if (n.opts.afterEach != null)
      try {
        await n.opts.afterEach.call(n);
      } catch (e) {
      }
    return t;
  } catch (s) {
    return !1;
  }
};

// src/task.ts
var w = class extends EventTarget {
  constructor(t, e, r, o = {}) {
    super();
    i(this, "bench");
    i(this, "name");
    i(this, "fn");
    i(this, "runs", 0);
    i(this, "result");
    i(this, "opts");
    this.bench = t, this.name = e, this.fn = r, this.opts = o;
  }
  async loop(t, e) {
    var x;
    let r = this.bench.concurrency === "task", { threshold: o } = this.bench, u = 0, c = [];
    if (this.opts.beforeAll != null)
      try {
        await this.opts.beforeAll.call(this);
      } catch (l) {
        return { error: l };
      }
    let m = await H(this), h = async () => {
      this.opts.beforeEach != null && await this.opts.beforeEach.call(this);
      let l = 0;
      if (m) {
        let E = this.bench.now();
        await this.fn.call(this), l = this.bench.now() - E;
      } else {
        let E = this.bench.now();
        this.fn.call(this), l = this.bench.now() - E;
      }
      c.push(l), u += l, this.opts.afterEach != null && await this.opts.afterEach.call(this);
    }, p = g(o);
    try {
      let l = [];
      for (; (u < t || c.length + p.activeCount + p.pendingCount < e) && !((x = this.bench.signal) != null && x.aborted); )
        r ? l.push(p(h)) : await h();
      l.length && await Promise.all(l);
    } catch (l) {
      return { error: l };
    }
    if (this.opts.afterAll != null)
      try {
        await this.opts.afterAll.call(this);
      } catch (l) {
        return { error: l };
      }
    return { samples: c };
  }
  async run() {
    var r, o;
    if ((r = this.result) != null && r.error)
      return this;
    this.dispatchEvent(a("start", this)), await this.bench.setup(this, "run");
    let { samples: t, error: e } = await this.loop(this.bench.time, this.bench.iterations);
    if (this.bench.teardown(this, "run"), t) {
      let u = t.reduce((M, N) => M + N, 0);
      this.runs = t.length, t.sort((M, N) => M - N);
      let c = u / this.runs, m = 1e3 / c, h = t.length, p = h - 1, x = t[0], l = t[p], E = u / t.length || 0, I = j(t, E), _ = Math.sqrt(I), K = _ / Math.sqrt(h), C = R[String(Math.round(p) || 1)] || R.infinity, q = K * C, V = q / E * 100, Q = t[Math.ceil(h * 0.75) - 1], Y = t[Math.ceil(h * 0.99) - 1], $ = t[Math.ceil(h * 0.995) - 1], D = t[Math.ceil(h * 0.999) - 1];
      if ((o = this.bench.signal) != null && o.aborted)
        return this;
      this.setResult({
        totalTime: u,
        min: x,
        max: l,
        hz: m,
        period: c,
        samples: t,
        mean: E,
        variance: I,
        sd: _,
        sem: K,
        df: p,
        critical: C,
        moe: q,
        rme: V,
        p75: Q,
        p99: Y,
        p995: $,
        p999: D
      });
    }
    if (e) {
      if (this.setResult({ error: e }), this.bench.throws)
        throw e;
      this.dispatchEvent(a("error", this)), this.bench.dispatchEvent(a("error", this));
    }
    return this.dispatchEvent(a("cycle", this)), this.bench.dispatchEvent(a("cycle", this)), this.dispatchEvent(a("complete", this)), this;
  }
  async warmup() {
    var e;
    if ((e = this.result) != null && e.error)
      return;
    this.dispatchEvent(a("warmup", this)), await this.bench.setup(this, "warmup");
    let { error: t } = await this.loop(this.bench.warmupTime, this.bench.warmupIterations);
    if (this.bench.teardown(this, "warmup"), t && (this.setResult({ error: t }), this.bench.throws))
      throw t;
  }
  addEventListener(t, e, r) {
    super.addEventListener(t, e, r);
  }
  removeEventListener(t, e, r) {
    super.removeEventListener(t, e, r);
  }
  setResult(t) {
    this.result = { ...this.result, ...t }, Object.freeze(this.result);
  }
  reset() {
    this.dispatchEvent(a("reset", this)), this.runs = 0, this.result = void 0;
  }
};

// src/bench.ts
var k = class extends EventTarget {
  constructor(t = {}) {
    var e, r, o, u, c, m, h, p;
    super();
    i(this, "_tasks", /* @__PURE__ */ new Map());
    i(this, "_todos", /* @__PURE__ */ new Map());
    i(this, "concurrency", null);
    i(this, "threshold", 1 / 0);
    i(this, "signal");
    i(this, "throws");
    i(this, "warmupTime", 100);
    i(this, "warmupIterations", 5);
    i(this, "time", 500);
    i(this, "iterations", 10);
    i(this, "now", F);
    i(this, "setup");
    i(this, "teardown");
    this.now = (e = t.now) != null ? e : this.now, this.warmupTime = (r = t.warmupTime) != null ? r : this.warmupTime, this.warmupIterations = (o = t.warmupIterations) != null ? o : this.warmupIterations, this.time = (u = t.time) != null ? u : this.time, this.iterations = (c = t.iterations) != null ? c : this.iterations, this.signal = t.signal, this.throws = (m = t.throws) != null ? m : !1, this.setup = (h = t.setup) != null ? h : () => {
    }, this.teardown = (p = t.teardown) != null ? p : () => {
    }, this.signal && this.signal.addEventListener(
      "abort",
      () => {
        this.dispatchEvent(a("abort"));
      },
      { once: !0 }
    );
  }
  runTask(t) {
    var e;
    return (e = this.signal) != null && e.aborted ? t : t.run();
  }
  async run() {
    if (this.concurrency === "bench")
      return this.runConcurrently(this.threshold, this.concurrency);
    this.dispatchEvent(a("start"));
    let t = [];
    for (let e of [...this._tasks.values()])
      t.push(await this.runTask(e));
    return this.dispatchEvent(a("complete")), t;
  }
  async runConcurrently(t = 1 / 0, e = "bench") {
    if (this.threshold = t, this.concurrency = e, e === "task")
      return this.run();
    this.dispatchEvent(a("start"));
    let r = g(t), o = [];
    for (let c of [...this._tasks.values()])
      o.push(r(() => this.runTask(c)));
    let u = await Promise.all(o);
    return this.dispatchEvent(a("complete")), u;
  }
  async warmup() {
    if (this.concurrency === "bench") {
      await this.warmupConcurrently(this.threshold, this.concurrency);
      return;
    }
    this.dispatchEvent(a("warmup"));
    for (let [, t] of this._tasks)
      await t.warmup();
  }
  async warmupConcurrently(t = 1 / 0, e = "bench") {
    if (this.threshold = t, this.concurrency = e, e === "task") {
      await this.warmup();
      return;
    }
    this.dispatchEvent(a("warmup"));
    let r = g(t), o = [];
    for (let [, u] of this._tasks)
      o.push(r(() => u.warmup()));
    await Promise.all(o);
  }
  reset() {
    this.dispatchEvent(a("reset")), this._tasks.forEach((t) => {
      t.reset();
    });
  }
  add(t, e, r = {}) {
    let o = new w(this, t, e, r);
    return this._tasks.set(t, o), this.dispatchEvent(a("add", o)), this;
  }
  todo(t, e = () => {
  }, r = {}) {
    let o = new w(this, t, e, r);
    return this._todos.set(t, o), this.dispatchEvent(a("todo", o)), this;
  }
  remove(t) {
    let e = this.getTask(t);
    return e && (this.dispatchEvent(a("remove", e)), this._tasks.delete(t)), this;
  }
  addEventListener(t, e, r) {
    super.addEventListener(t, e, r);
  }
  removeEventListener(t, e, r) {
    super.removeEventListener(t, e, r);
  }
  table(t) {
    return this.tasks.map((e) => {
      if (e.result) {
        if (e.result.error)
          throw e.result.error;
        return (t == null ? void 0 : t(e)) || {
          "Task Name": e.name,
          "ops/sec": e.result.error ? "NaN" : parseInt(e.result.hz.toString(), 10).toLocaleString(),
          "Average Time (ns)": e.result.error ? "NaN" : e.result.mean * 1e3 * 1e3,
          Margin: e.result.error ? "NaN" : `\xB1${e.result.rme.toFixed(2)}%`,
          Samples: e.result.error ? "NaN" : e.result.samples.length
        };
      }
      return null;
    });
  }
  get results() {
    return [...this._tasks.values()].map((t) => t.result);
  }
  get tasks() {
    return [...this._tasks.values()];
  }
  get todos() {
    return [...this._todos.values()];
  }
  getTask(t) {
    return this._tasks.get(t);
  }
};

// src/index.ts
var ot = k;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bench,
  Task,
  hrtimeNow,
  now
});
