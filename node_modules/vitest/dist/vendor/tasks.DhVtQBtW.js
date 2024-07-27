import { getNames, getTests } from '@vitest/runner/utils';
import '@vitest/utils';

function hasFailedSnapshot(suite) {
  return getTests(suite).some((s) => {
    var _a, _b;
    return (_b = (_a = s.result) == null ? void 0 : _a.errors) == null ? void 0 : _b.some(
      (e) => typeof (e == null ? void 0 : e.message) === "string" && e.message.match(/Snapshot .* mismatched/)
    );
  });
}
function getFullName(task, separator = " > ") {
  return getNames(task).join(separator);
}
function getTestName(task, separator = " > ") {
  return getNames(task).slice(1).join(separator);
}

export { getFullName as a, getTestName as g, hasFailedSnapshot as h };
