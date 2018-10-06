'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (modules, moduleOptions, generatorOptions = {}) {
  modules.forEach(module => {
    if (!_lodash2.default.has(moduleOptions, module.name)) {
      throw new Error(`Module \`${module.name}\` is missing from moduleOptions.`);
    }
  });

  return _postcss2.default.root({
    nodes: (0, _lodash2.default)(modules).reject(module => moduleOptions[module.name] === false).flatMap(module => (0, _wrapWithVariants2.default)(module.generator(generatorOptions), moduleOptions[module.name])).value()
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _wrapWithVariants = require('../util/wrapWithVariants');

var _wrapWithVariants2 = _interopRequireDefault(_wrapWithVariants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }