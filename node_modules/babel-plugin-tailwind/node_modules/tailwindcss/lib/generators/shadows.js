'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ({ shadows }) {
  return _lodash2.default.map(shadows, (shadow, modifier) => {
    return (0, _defineClass2.default)(modifier === 'default' ? 'shadow' : `shadow-${modifier}`, {
      'box-shadow': shadow
    });
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClass = require('../util/defineClass');

var _defineClass2 = _interopRequireDefault(_defineClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }