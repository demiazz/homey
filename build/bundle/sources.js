const { readFileSync } = require("fs");
const { relative, resolve } = require("path");
const walkSync = require("klaw-sync");

const sourceRoot = resolve(__dirname, "../../src");

const sources = walkSync(sourceRoot, { nodir: true }).reduce((result, file) => {
  const absolutePath = file.path;
  const relativePath = relative(sourceRoot, absolutePath);

  result[relativePath] = readFileSync(absolutePath).toString();

  return result;
}, {});

module.exports = Object.freeze(sources);
