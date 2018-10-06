'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ({ padding }) {
  return _lodash2.default.flatten([definePadding(padding)]);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function definePadding(padding) {
  const generators = [(size, modifier) => (0, _defineClasses2.default)({
    [`p-${modifier}`]: { padding: `${size}` }
  }), (size, modifier) => (0, _defineClasses2.default)({
    [`py-${modifier}`]: { 'padding-top': `${size}`, 'padding-bottom': `${size}` },
    [`px-${modifier}`]: { 'padding-left': `${size}`, 'padding-right': `${size}` }
  }), (size, modifier) => (0, _defineClasses2.default)({
    [`pt-${modifier}`]: { 'padding-top': `${size}` },
    [`pr-${modifier}`]: { 'padding-right': `${size}` },
    [`pb-${modifier}`]: { 'padding-bottom': `${size}` },
    [`pl-${modifier}`]: { 'padding-left': `${size}` }
  })];

  return _lodash2.default.flatMap(generators, generator => {
    return _lodash2.default.flatMap(padding, generator);
  });
}