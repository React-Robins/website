'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return (0, _defineClasses2.default)({
    'whitespace-normal': { 'white-space': 'normal' },
    'whitespace-no-wrap': { 'white-space': 'nowrap' },
    'whitespace-pre': { 'white-space': 'pre' },
    'whitespace-pre-line': { 'white-space': 'pre-line' },
    'whitespace-pre-wrap': { 'white-space': 'pre-wrap' },

    'break-words': { 'word-wrap': 'break-word' },
    'break-normal': { 'word-wrap': 'normal' },

    truncate: {
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    }
  });
};

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }