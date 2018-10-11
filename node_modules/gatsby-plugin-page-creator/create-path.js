"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _parseFilepath = _interopRequireDefault(require("parse-filepath"));

var _path = _interopRequireDefault(require("path"));

var _slash = _interopRequireDefault(require("slash"));

module.exports = function (basePath, filePath) {
  var relativePath = _path.default.posix.relative((0, _slash.default)(basePath), (0, _slash.default)(filePath));

  var _parsePath = (0, _parseFilepath.default)(relativePath),
      dirname = _parsePath.dirname,
      name = _parsePath.name;

  var parsedName = name === "index" ? "" : name;
  return _path.default.posix.join("/", dirname, parsedName, "/");
};