'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (className, properties) {
  const decls = _lodash2.default.map(properties, (value, property) => {
    return _postcss2.default.decl({
      prop: `${property}`,
      value: `${value}`
    });
  });

  return _postcss2.default.rule({
    selector: `.${(0, _escapeClassName2.default)(className)}`
  }).append(decls);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _escapeClassName = require('./escapeClassName');

var _escapeClassName2 = _interopRequireDefault(_escapeClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }