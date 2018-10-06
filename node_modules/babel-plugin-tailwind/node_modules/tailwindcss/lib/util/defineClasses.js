'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defineClasses;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _defineClass = require('./defineClass');

var _defineClass2 = _interopRequireDefault(_defineClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defineClasses(classes) {
  return _lodash2.default.map(classes, (properties, className) => {
    return (0, _defineClass2.default)(className, properties);
  });
}