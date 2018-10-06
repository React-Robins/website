'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = focusable;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _cloneNodes = require('./cloneNodes');

var _cloneNodes2 = _interopRequireDefault(_cloneNodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function focusable(rules) {
  return _postcss2.default.atRule({
    name: 'focusable'
  }).append((0, _cloneNodes2.default)(rules));
}