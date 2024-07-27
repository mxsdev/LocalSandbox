import { relative } from 'pathe';
import { m as mm } from './vendor/index.BMmMjLIQ.js';
import './vendor/_commonjsHelpers.BFTU3MAI.js';
import 'util';
import 'path';

const THRESHOLD_KEYS = [
  "lines",
  "functions",
  "statements",
  "branches"
];
const GLOBAL_THRESHOLDS_KEY = "global";
class BaseCoverageProvider {
  /**
   * Check if current coverage is above configured thresholds and bump the thresholds if needed
   */
  updateThresholds({
    thresholds: allThresholds,
    perFile,
    configurationFile,
    onUpdate
  }) {
    let updatedThresholds = false;
    const config = resolveConfig(configurationFile);
    assertConfigurationModule(config);
    for (const { coverageMap, thresholds, name } of allThresholds) {
      const summaries = perFile ? coverageMap.files().map(
        (file) => coverageMap.fileCoverageFor(file).toSummary()
      ) : [coverageMap.getCoverageSummary()];
      const thresholdsToUpdate = [];
      for (const key of THRESHOLD_KEYS) {
        const threshold = thresholds[key] ?? 100;
        const actual = Math.min(
          ...summaries.map((summary) => summary[key].pct)
        );
        if (actual > threshold) {
          thresholdsToUpdate.push([key, actual]);
        }
      }
      if (thresholdsToUpdate.length === 0) {
        continue;
      }
      updatedThresholds = true;
      for (const [threshold, newValue] of thresholdsToUpdate) {
        if (name === GLOBAL_THRESHOLDS_KEY) {
          config.test.coverage.thresholds[threshold] = newValue;
        } else {
          const glob = config.test.coverage.thresholds[name];
          glob[threshold] = newValue;
        }
      }
    }
    if (updatedThresholds) {
      console.log(
        "Updating thresholds to configuration file. You may want to push with updated coverage thresholds."
      );
      onUpdate();
    }
  }
  /**
   * Check collected coverage against configured thresholds. Sets exit code to 1 when thresholds not reached.
   */
  checkThresholds({
    thresholds: allThresholds,
    perFile,
    onError
  }) {
    for (const { coverageMap, thresholds, name } of allThresholds) {
      if (thresholds.branches === void 0 && thresholds.functions === void 0 && thresholds.lines === void 0 && thresholds.statements === void 0) {
        continue;
      }
      const summaries = perFile ? coverageMap.files().map((file) => ({
        file,
        summary: coverageMap.fileCoverageFor(file).toSummary()
      })) : [
        {
          file: null,
          summary: coverageMap.getCoverageSummary()
        }
      ];
      for (const { summary, file } of summaries) {
        for (const thresholdKey of [
          "lines",
          "functions",
          "statements",
          "branches"
        ]) {
          const threshold = thresholds[thresholdKey];
          if (threshold !== void 0) {
            const coverage = summary.data[thresholdKey].pct;
            if (coverage < threshold) {
              process.exitCode = 1;
              let errorMessage = `ERROR: Coverage for ${thresholdKey} (${coverage}%) does not meet ${name === GLOBAL_THRESHOLDS_KEY ? name : `"${name}"`} threshold (${threshold}%)`;
              if (perFile && file) {
                errorMessage += ` for ${relative("./", file).replace(
                  /\\/g,
                  "/"
                )}`;
              }
              onError(errorMessage);
            }
          }
        }
      }
    }
  }
  /**
   * Constructs collected coverage and users' threshold options into separate sets
   * where each threshold set holds their own coverage maps. Threshold set is either
   * for specific files defined by glob pattern or global for all other files.
   */
  resolveThresholds({
    coverageMap,
    thresholds,
    createCoverageMap,
    root
  }) {
    const resolvedThresholds = [];
    const files = coverageMap.files();
    const globalCoverageMap = createCoverageMap();
    for (const key of Object.keys(
      thresholds
    )) {
      if (key === "perFile" || key === "autoUpdate" || key === "100" || THRESHOLD_KEYS.includes(key)) {
        continue;
      }
      const glob = key;
      const globThresholds = resolveGlobThresholds(thresholds[glob]);
      const globCoverageMap = createCoverageMap();
      const matchingFiles = files.filter(
        (file) => mm.isMatch(relative(root, file), glob)
      );
      for (const file of matchingFiles) {
        const fileCoverage = coverageMap.fileCoverageFor(file);
        globCoverageMap.addFileCoverage(fileCoverage);
      }
      resolvedThresholds.push({
        name: glob,
        coverageMap: globCoverageMap,
        thresholds: globThresholds
      });
    }
    for (const file of files) {
      const fileCoverage = coverageMap.fileCoverageFor(file);
      globalCoverageMap.addFileCoverage(fileCoverage);
    }
    resolvedThresholds.unshift({
      name: GLOBAL_THRESHOLDS_KEY,
      coverageMap: globalCoverageMap,
      thresholds: {
        branches: thresholds.branches,
        functions: thresholds.functions,
        lines: thresholds.lines,
        statements: thresholds.statements
      }
    });
    return resolvedThresholds;
  }
  /**
   * Resolve reporters from various configuration options
   */
  resolveReporters(configReporters) {
    if (!Array.isArray(configReporters)) {
      return [[configReporters, {}]];
    }
    const resolvedReporters = [];
    for (const reporter of configReporters) {
      if (Array.isArray(reporter)) {
        resolvedReporters.push([reporter[0], reporter[1] || {}]);
      } else {
        resolvedReporters.push([reporter, {}]);
      }
    }
    return resolvedReporters;
  }
  hasTerminalReporter(reporters) {
    return reporters.some(
      ([reporter]) => reporter === "text" || reporter === "text-summary" || reporter === "text-lcov" || reporter === "teamcity"
    );
  }
  toSlices(array, size) {
    return array.reduce((chunks, item) => {
      const index = Math.max(0, chunks.length - 1);
      const lastChunk = chunks[index] || [];
      chunks[index] = lastChunk;
      if (lastChunk.length >= size) {
        chunks.push([item]);
      } else {
        lastChunk.push(item);
      }
      return chunks;
    }, []);
  }
}
function resolveGlobThresholds(thresholds) {
  if (!thresholds || typeof thresholds !== "object") {
    return {};
  }
  if (100 in thresholds && thresholds[100] === true) {
    return {
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100
    };
  }
  return {
    lines: "lines" in thresholds && typeof thresholds.lines === "number" ? thresholds.lines : void 0,
    branches: "branches" in thresholds && typeof thresholds.branches === "number" ? thresholds.branches : void 0,
    functions: "functions" in thresholds && typeof thresholds.functions === "number" ? thresholds.functions : void 0,
    statements: "statements" in thresholds && typeof thresholds.statements === "number" ? thresholds.statements : void 0
  };
}
function assertConfigurationModule(config) {
  try {
    if (typeof config.test.coverage.thresholds !== "object") {
      throw new TypeError(
        "Expected config.test.coverage.thresholds to be an object"
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Unable to parse thresholds from configuration file: ${message}`
    );
  }
}
function resolveConfig(configModule) {
  const mod = configModule.exports.default;
  try {
    if (mod.$type === "object") {
      return mod;
    }
    let config = resolveDefineConfig(mod);
    if (config) {
      return config;
    }
    if (mod.$type === "function-call" && mod.$callee === "mergeConfig") {
      config = resolveMergeConfig(mod);
      if (config) {
        return config;
      }
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
  throw new Error(
    "Failed to update coverage thresholds. Configuration file is too complex."
  );
}
function resolveDefineConfig(mod) {
  if (mod.$type === "function-call" && mod.$callee === "defineConfig") {
    if (mod.$args[0].$type === "object") {
      return mod.$args[0];
    }
    if (mod.$args[0].$type === "arrow-function-expression") {
      if (mod.$args[0].$body.$type === "object") {
        return mod.$args[0].$body;
      }
      const config = resolveMergeConfig(mod.$args[0].$body);
      if (config) {
        return config;
      }
    }
  }
}
function resolveMergeConfig(mod) {
  if (mod.$type === "function-call" && mod.$callee === "mergeConfig") {
    for (const arg of mod.$args) {
      const config = resolveDefineConfig(arg);
      if (config) {
        return config;
      }
    }
  }
}

export { BaseCoverageProvider };
