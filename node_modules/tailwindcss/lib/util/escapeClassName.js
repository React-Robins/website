'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escapeClassName;

var _css = require('css.escape');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escapeClassName(className) {
  return (0, _css2.default)(className);
}