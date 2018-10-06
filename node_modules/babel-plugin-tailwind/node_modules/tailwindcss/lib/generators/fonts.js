'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ({ fonts }) {
  return _lodash2.default.map(fonts, (families, font) => {
    if (_lodash2.default.isArray(families)) {
      families = families.join(', ');
    }

    return (0, _defineClass2.default)(`font-${font}`, {
      'font-family': `${families}`
    });
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClass = require('../util/defineClass');

var _defineClass2 = _interopRequireDefault(_defineClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }