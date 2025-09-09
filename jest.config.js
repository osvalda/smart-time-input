const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  verbose: true,
  reporters: [['github-actions', {silent: false}], 'summary'],
};
