'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (css, prefix) {
  css.walkRules(rule => {
    rule.selectors = rule.selectors.map(selector => (0, _prefixSelector2.default)(prefix, selector));
  });

  return css;
};

var _prefixSelector = require('./prefixSelector');

var _prefixSelector2 = _interopRequireDefault(_prefixSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }