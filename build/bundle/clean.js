const { rmdirSync, unlinkSync } = require("fs");
const { extname, join, relative, resolve } = require("path");
const walkSync = require("klaw-sync");

const packageRoot = resolve(__dirname, "../../");
const sourceRoot = resolve(packageRoot, "src");

function filterJavascript(file) {
  return extname(file.path) === ".js";
}

function getTargetFiles() {
  const files = walkSync(sourceRoot, { nodir: true, filter: filterJavascript });

  return files.reduce((result, file) => {
    const relativePath = relative(sourceRoot, file.path);
    const buildPath = join(packageRoot, relativePath);

    result.push(buildPath);
    result.push(`${buildPath}.flow`);

    return result;
  }, []);
}

function getTargetDirectories() {
  return walkSync(sourceRoot, { nofile: true }).map(dir => {
    const relativePath = relative(sourceRoot, dir.path);

    return join(packageRoot, relativePath);
  });
}

getTargetFiles().map(unlinkSync);
getTargetDirectories().map(rmdirSync);
