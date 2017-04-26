const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonJS = require("rollup-plugin-commonjs");

module.exports = {
  basePath: "../../",

  frameworks: ["jasmine"],

  files: [
    {
      pattern: "build/jasmine/setup.js",
      watched: process.env.CI !== "true"
    },
    {
      pattern: "build/jasmine/fixtures.js",
      watched: process.env.CI !== "true"
    },
    {
      pattern: "src/index.js",
      watched: process.env.CI !== "true",
      included: false
    },
    {
      pattern: "spec/**/*.spec.js",
      watched: process.env.CI !== "true"
    }
  ],

  preprocessors: {
    "build/jasmine/setup.js": ["rollup"],
    "build/jasmine/fixtures.js": ["rollup"],
    "spec/**/*.spec.js": ["rollup"]
  },

  rollupPreprocessor: {
    format: "iife",
    sourceMap: "inline",
    plugins: [
      babel({
        presets: [["es2015", { modules: false }]],
        plugins: ["transform-flow-strip-types", "external-helpers"]
      }),
      commonJS(),
      nodeResolve()
    ],
    cache: false
  },

  plugins: ["karma-jasmine", "karma-rollup-plugin", "karma-spec-reporter"],

  reporters: ["spec"]
};