'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseObjectStyles;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssNested = require('postcss-nested');

var _postcssNested2 = _interopRequireDefault(_postcssNested);

var _postcssJs = require('postcss-js');

var _postcssJs2 = _interopRequireDefault(_postcssJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseObjectStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseObjectStyles([styles]);
  }

  return _lodash2.default.flatMap(styles, style => (0, _postcss2.default)([_postcssNested2.default]).process(style, { parser: _postcssJs2.default }).root.nodes);
}