import { Writable } from 'node:stream';
import { Console } from 'node:console';
import { relative } from 'node:path';
import { getSafeTimers } from '@vitest/utils';
import c from 'tinyrainbow';
import { R as RealDate } from '../vendor/date.W2xKR2qe.js';
import 'pathe';
import '@vitest/runner/utils';
import { g as getWorkerState } from '../vendor/global.7bFbnyXl.js';
import '../vendor/env.2ltrQNq0.js';
import 'std-env';

const UNKNOWN_TEST_ID = "__vitest__unknown_test__";
function getTaskIdByStack(root) {
  var _a, _b;
  const stack = (_a = new Error("STACK_TRACE_ERROR").stack) == null ? void 0 : _a.split("\n");
  if (!stack) {
    return UNKNOWN_TEST_ID;
  }
  const index = stack.findIndex((line2) => line2.includes("at Console.value"));
  const line = index === -1 ? null : stack[index + 2];
  if (!line) {
    return UNKNOWN_TEST_ID;
  }
  const filepath = (_b = line.match(/at\s(.*)\s?/)) == null ? void 0 : _b[1];
  if (filepath) {
    return relative(root, filepath);
  }
  return UNKNOWN_TEST_ID;
}
function createCustomConsole(defaultState) {
  const stdoutBuffer = /* @__PURE__ */ new Map();
  const stderrBuffer = /* @__PURE__ */ new Map();
  const timers = /* @__PURE__ */ new Map();
  const { setTimeout, clearTimeout } = getSafeTimers();
  const state = () => defaultState || getWorkerState();
  function schedule(taskId) {
    const timer = timers.get(taskId);
    const { stdoutTime, stderrTime } = timer;
    clearTimeout(timer.timer);
    timer.timer = setTimeout(() => {
      if (stderrTime < stdoutTime) {
        sendStderr(taskId);
        sendStdout(taskId);
      } else {
        sendStdout(taskId);
        sendStderr(taskId);
      }
    });
  }
  function sendStdout(taskId) {
    sendBuffer("stdout", taskId);
  }
  function sendStderr(taskId) {
    sendBuffer("stderr", taskId);
  }
  function sendBuffer(type, taskId) {
    const buffers = type === "stdout" ? stdoutBuffer : stderrBuffer;
    const buffer = buffers.get(taskId);
    if (!buffer) {
      return;
    }
    if (state().config.printConsoleTrace) {
      buffer.forEach(([buffer2, origin]) => {
        sendLog(type, taskId, String(buffer2), buffer2.length, origin);
      });
    } else {
      const content = buffer.map((i) => String(i[0])).join("");
      sendLog(type, taskId, content, buffer.length);
    }
    const timer = timers.get(taskId);
    buffers.set(taskId, []);
    if (type === "stderr") {
      timer.stderrTime = 0;
    } else {
      timer.stdoutTime = 0;
    }
  }
  function sendLog(type, taskId, content, size, origin) {
    const timer = timers.get(taskId);
    const time = type === "stderr" ? timer.stderrTime : timer.stdoutTime;
    state().rpc.onUserConsoleLog({
      type,
      content: content || "<empty line>",
      taskId,
      time: time || RealDate.now(),
      size,
      origin
    });
  }
  const stdout = new Writable({
    write(data, encoding, callback) {
      var _a, _b, _c, _d;
      const s = state();
      const id = ((_a = s == null ? void 0 : s.current) == null ? void 0 : _a.id) || ((_c = (_b = s == null ? void 0 : s.current) == null ? void 0 : _b.suite) == null ? void 0 : _c.id) || ((_d = s.current) == null ? void 0 : _d.file.id) || getTaskIdByStack(s.config.root);
      let timer = timers.get(id);
      if (timer) {
        timer.stdoutTime = timer.stdoutTime || RealDate.now();
      } else {
        timer = {
          stdoutTime: RealDate.now(),
          stderrTime: RealDate.now(),
          timer: 0
        };
        timers.set(id, timer);
      }
      let buffer = stdoutBuffer.get(id);
      if (!buffer) {
        buffer = [];
        stdoutBuffer.set(id, buffer);
      }
      if (state().config.printConsoleTrace) {
        const limit = Error.stackTraceLimit;
        Error.stackTraceLimit = limit + 6;
        const stack = new Error("STACK_TRACE").stack;
        const trace = stack == null ? void 0 : stack.split("\n").slice(7).join("\n");
        Error.stackTraceLimit = limit;
        buffer.push([data, trace]);
      } else {
        buffer.push([data, void 0]);
      }
      schedule(id);
      callback();
    }
  });
  const stderr = new Writable({
    write(data, encoding, callback) {
      var _a, _b, _c, _d, _e;
      const s = state();
      const id = ((_a = s == null ? void 0 : s.current) == null ? void 0 : _a.id) || ((_c = (_b = s == null ? void 0 : s.current) == null ? void 0 : _b.suite) == null ? void 0 : _c.id) || ((_d = s.current) == null ? void 0 : _d.file.id) || getTaskIdByStack(s.config.root);
      let timer = timers.get(id);
      if (timer) {
        timer.stderrTime = timer.stderrTime || RealDate.now();
      } else {
        timer = {
          stderrTime: RealDate.now(),
          stdoutTime: RealDate.now(),
          timer: 0
        };
        timers.set(id, timer);
      }
      let buffer = stderrBuffer.get(id);
      if (!buffer) {
        buffer = [];
        stderrBuffer.set(id, buffer);
      }
      if (state().config.printConsoleTrace) {
        const limit = Error.stackTraceLimit;
        Error.stackTraceLimit = limit + 6;
        const stack = (_e = new Error("STACK_TRACE").stack) == null ? void 0 : _e.split("\n");
        Error.stackTraceLimit = limit;
        const isTrace = stack == null ? void 0 : stack.some(
          (line) => line.includes("at Console.trace")
        );
        if (isTrace) {
          buffer.push([data, void 0]);
        } else {
          const trace = stack == null ? void 0 : stack.slice(7).join("\n");
          Error.stackTraceLimit = limit;
          buffer.push([data, trace]);
        }
      } else {
        buffer.push([data, void 0]);
      }
      schedule(id);
      callback();
    }
  });
  return new Console({
    stdout,
    stderr,
    colorMode: c.isColorSupported,
    groupIndentation: 2
  });
}

export { UNKNOWN_TEST_ID, createCustomConsole };
