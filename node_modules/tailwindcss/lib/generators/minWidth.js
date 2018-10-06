'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return _lodash2.default.flatten([defineMinWidths(config.minWidth)]);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClass = require('../util/defineClass');

var _defineClass2 = _interopRequireDefault(_defineClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineMinWidths(widths) {
  return _lodash2.default.map(widths, (size, modifer) => {
    return (0, _defineClass2.default)(`min-w-${modifer}`, {
      'min-width': `${size}`
    });
  });
}