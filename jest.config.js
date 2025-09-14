const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  "testEnvironment": "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coverageReporters: ['json-summary', "clover", "json", "lcov", "text"],
  verbose: true,
  reporters: [['github-actions', {silent: false}], 'summary', 'jest-junit', 'default'],
};
