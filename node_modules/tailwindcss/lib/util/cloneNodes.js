'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneNodes;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneNodes(nodes) {
  return _lodash2.default.map(nodes, node => node.clone());
}