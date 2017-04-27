const { readdirSync, readFileSync } = require("fs");

const sources = readdirSync("src").reduce((result, file) => {
  result[file] = readFileSync(`src/${file}`).toString();

  return result;
}, {});

module.exports = Object.freeze(sources);
