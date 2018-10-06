'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildSelectorVariant;

var _escapeClassName = require('./escapeClassName');

var _escapeClassName2 = _interopRequireDefault(_escapeClassName);

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _tap = require('lodash/tap');

var _tap2 = _interopRequireDefault(_tap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildSelectorVariant(selector, variantName, separator, onError = () => {}) {
  return (0, _postcssSelectorParser2.default)(selectors => {
    (0, _tap2.default)(selectors.first.filter(({ type }) => type === 'class').pop(), classSelector => {
      if (classSelector === undefined) {
        onError('Variant cannot be generated because selector contains no classes.');
        return;
      }

      classSelector.value = `${variantName}${(0, _escapeClassName2.default)(separator)}${classSelector.value}`;
    });
  }).processSync(selector);
}