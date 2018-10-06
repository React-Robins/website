'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ({ zIndex }) {
  return _lodash2.default.map(zIndex, (value, modifier) => {
    return (0, _defineClass2.default)(`z-${modifier}`, {
      'z-index': value
    });
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClass = require('../util/defineClass');

var _defineClass2 = _interopRequireDefault(_defineClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }