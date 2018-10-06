'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ({ negativeMargin }) {
  return _lodash2.default.flatten([defineNegativeMargin(negativeMargin)]);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineNegativeMargin(negativeMargin) {
  const generators = [(size, modifier) => (0, _defineClasses2.default)({
    [`-m-${modifier}`]: { margin: `${size}` }
  }), (size, modifier) => (0, _defineClasses2.default)({
    [`-my-${modifier}`]: { 'margin-top': `${size}`, 'margin-bottom': `${size}` },
    [`-mx-${modifier}`]: { 'margin-left': `${size}`, 'margin-right': `${size}` }
  }), (size, modifier) => (0, _defineClasses2.default)({
    [`-mt-${modifier}`]: { 'margin-top': `${size}` },
    [`-mr-${modifier}`]: { 'margin-right': `${size}` },
    [`-mb-${modifier}`]: { 'margin-bottom': `${size}` },
    [`-ml-${modifier}`]: { 'margin-left': `${size}` }
  })];

  return _lodash2.default.flatMap(generators, generator => {
    return _lodash2.default.flatMap(negativeMargin, (size, modifier) => {
      return generator(`${size}` === '0' ? `${size}` : `-${size}`, modifier);
    });
  });
}