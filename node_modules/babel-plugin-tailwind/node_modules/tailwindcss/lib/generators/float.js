'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _lodash2.default.concat((0, _defineClasses2.default)({
    'float-right': { float: 'right' },
    'float-left': { float: 'left' },
    'float-none': { float: 'none' }
  }), _postcss2.default.parse(`
      .clearfix:after {
        content: "";
        display: table;
        clear: both;
      }
    `).nodes);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }