const { writeFileSync } = require("fs");
const { dirname } = require("path");
const { sync: makeDirectory } = require("mkdirp");
const { transform } = require("./babel");
const banner = require("./banner");
const { prettify } = require("./prettify");
const sources = require("./sources");

function build() {
  Object.keys(sources).forEach(file => {
    const dest = `${file}`;
    const code = transform(sources[file], "commonjs");
    const prettified = prettify(code).replace(/\/\* @flow \*\/\n/, "");
    const bannered = `${banner.base}${prettified}`;

    makeDirectory(dirname(dest));

    writeFileSync(dest, bannered);
  });
}

module.exports = build;
