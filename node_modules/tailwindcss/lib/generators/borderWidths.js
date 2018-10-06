'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineBorderWidthUtilities(borderWidths) {
  const generators = [(width, modifier) => (0, _defineClasses2.default)({
    [`border${modifier}`]: {
      'border-width': `${width}`
    }
  }), (width, modifier) => (0, _defineClasses2.default)({
    [`border-t${modifier}`]: {
      'border-top-width': `${width}`
    },
    [`border-r${modifier}`]: {
      'border-right-width': `${width}`
    },
    [`border-b${modifier}`]: {
      'border-bottom-width': `${width}`
    },
    [`border-l${modifier}`]: {
      'border-left-width': `${width}`
    }
  })];

  return _lodash2.default.flatMap(generators, generator => {
    return _lodash2.default.flatMap(borderWidths, (width, modifier) => {
      return generator(width, modifier === 'default' ? '' : `-${modifier}`);
    });
  });
}

module.exports = function ({ borderWidths }) {
  return defineBorderWidthUtilities(borderWidths);
};