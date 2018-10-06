'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return (0, _defineClasses2.default)({
    'resize-none': { resize: 'none' },
    'resize-y': { resize: 'vertical' },
    'resize-x': { resize: 'horizontal' },
    resize: { resize: 'both' }
  });
};

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }