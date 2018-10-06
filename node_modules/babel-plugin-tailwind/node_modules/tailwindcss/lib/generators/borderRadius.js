'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineBorderRadiusUtilities(borderRadiuses) {
  const generators = [(radius, modifier) => (0, _defineClasses2.default)({
    [`rounded${modifier}`]: {
      'border-radius': `${radius}`
    }
  }), (radius, modifier) => (0, _defineClasses2.default)({
    [`rounded-t${modifier}`]: {
      'border-top-left-radius': `${radius}`,
      'border-top-right-radius': `${radius}`
    },
    [`rounded-r${modifier}`]: {
      'border-top-right-radius': `${radius}`,
      'border-bottom-right-radius': `${radius}`
    },
    [`rounded-b${modifier}`]: {
      'border-bottom-right-radius': `${radius}`,
      'border-bottom-left-radius': `${radius}`
    },
    [`rounded-l${modifier}`]: {
      'border-top-left-radius': `${radius}`,
      'border-bottom-left-radius': `${radius}`
    }
  }), (radius, modifier) => (0, _defineClasses2.default)({
    [`rounded-tl${modifier}`]: {
      'border-top-left-radius': `${radius}`
    },
    [`rounded-tr${modifier}`]: {
      'border-top-right-radius': `${radius}`
    },
    [`rounded-br${modifier}`]: {
      'border-bottom-right-radius': `${radius}`
    },
    [`rounded-bl${modifier}`]: {
      'border-bottom-left-radius': `${radius}`
    }
  })];

  return _lodash2.default.flatMap(generators, generator => {
    return _lodash2.default.flatMap(borderRadiuses, (radius, modifier) => {
      return generator(radius, modifier === 'default' ? '' : `-${modifier}`);
    });
  });
}

module.exports = function ({ borderRadius }) {
  return defineBorderRadiusUtilities(borderRadius);
};