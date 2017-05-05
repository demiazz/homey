const { writeFileSync } = require("fs");
const { dirname } = require("path");
const { sync: makeDirectory } = require("mkdirp");
const banner = require("./banner");
const { prettify } = require("./prettify");
const sources = require("./sources");

function build() {
  Object.keys(sources).forEach(file => {
    const dest = `lib/${file}.flow`;
    const code = prettify(sources[file])
      .replace(/\/\* @flow \*\/\n/, "")
      .replace(/\/\* eslint[^*]* \*\/\n/, "");
    const bannered = `${banner.flow}${code}`;

    makeDirectory(dirname(dest));

    writeFileSync(dest, bannered);
  });
}

module.exports = build;
