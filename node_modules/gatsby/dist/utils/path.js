"use strict";

exports.__esModule = true;
exports.joinPath = joinPath;
exports.withBasePath = withBasePath;

const path = require(`path`);

const os = require(`os`);

function joinPath(...paths) {
  const joinedPath = path.join(...paths);

  if (os.platform() === `win32`) {
    return joinedPath.replace(/\\/g, `\\\\`);
  } else {
    return joinedPath;
  }
}

function withBasePath(basePath) {
  return (...paths) => joinPath(basePath, ...paths);
}
//# sourceMappingURL=path.js.map