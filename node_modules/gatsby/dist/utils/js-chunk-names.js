"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _lodash = _interopRequireDefault(require("lodash"));

const path = require(`path`);

const kebabHash = require(`kebab-hash`);

const _require = require(`../redux`),
      store = _require.store;

const generatePathChunkName = path => {
  const name = path === `/` ? `index` : kebabHash(path);
  return `path---${name}`;
};

const generateComponentChunkName = componentPath => {
  const program = store.getState().program;
  let directory = `/`;

  if (program && program.directory) {
    directory = program.directory;
  }

  const name = path.relative(directory, componentPath);
  return `component---${_lodash.default.kebabCase(name)}`;
};

exports.generatePathChunkName = generatePathChunkName;
exports.generateComponentChunkName = generateComponentChunkName;
//# sourceMappingURL=js-chunk-names.js.map