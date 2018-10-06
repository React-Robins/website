'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return _lodash2.default.flatten([defineMinHeights(config.minHeight)]);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClass = require('../util/defineClass');

var _defineClass2 = _interopRequireDefault(_defineClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineMinHeights(heights) {
  return _lodash2.default.map(heights, (size, modifer) => {
    return (0, _defineClass2.default)(`min-h-${modifer}`, {
      'min-height': `${size}`
    });
  });
}