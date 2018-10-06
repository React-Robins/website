'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (prefix, selector) {
  const getPrefix = typeof prefix === 'function' ? prefix : () => prefix;

  return (0, _postcssSelectorParser2.default)(selectors => {
    selectors.walkClasses(classSelector => {
      classSelector.value = `${getPrefix('.' + classSelector.value)}${classSelector.value}`;
    });
  }).processSync(selector);
};

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }