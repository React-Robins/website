'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return (0, _defineClasses2.default)({
    italic: { 'font-style': 'italic' },
    roman: { 'font-style': 'normal' },

    uppercase: { 'text-transform': 'uppercase' },
    lowercase: { 'text-transform': 'lowercase' },
    capitalize: { 'text-transform': 'capitalize' },
    'normal-case': { 'text-transform': 'none' },

    underline: { 'text-decoration': 'underline' },
    'line-through': { 'text-decoration': 'line-through' },
    'no-underline': { 'text-decoration': 'none' },

    antialiased: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
    },
    'subpixel-antialiased': {
      '-webkit-font-smoothing': 'auto',
      '-moz-osx-font-smoothing': 'auto'
    }
  });
};

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }