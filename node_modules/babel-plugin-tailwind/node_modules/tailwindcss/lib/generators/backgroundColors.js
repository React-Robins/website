'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ({ backgroundColors }) {
  return _lodash2.default.map(backgroundColors, (color, className) => {
    return (0, _defineClass2.default)(`bg-${className}`, {
      'background-color': color
    });
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClass = require('../util/defineClass');

var _defineClass2 = _interopRequireDefault(_defineClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }