'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _perfectionist = require('perfectionist');

var _perfectionist2 = _interopRequireDefault(_perfectionist);

var _registerConfigAsDependency = require('./lib/registerConfigAsDependency');

var _registerConfigAsDependency2 = _interopRequireDefault(_registerConfigAsDependency);

var _processTailwindFeatures = require('./processTailwindFeatures');

var _processTailwindFeatures2 = _interopRequireDefault(_processTailwindFeatures);

var _mergeConfigWithDefaults = require('./util/mergeConfigWithDefaults');

var _mergeConfigWithDefaults2 = _interopRequireDefault(_mergeConfigWithDefaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const plugin = _postcss2.default.plugin('tailwind', config => {
  const plugins = [];

  if (!_lodash2.default.isUndefined(config) && !_lodash2.default.isObject(config)) {
    plugins.push((0, _registerConfigAsDependency2.default)(_path2.default.resolve(config)));
  }

  const getConfig = () => {
    if (_lodash2.default.isUndefined(config)) {
      return require('../defaultConfig')();
    }

    if (!_lodash2.default.isObject(config)) {
      delete require.cache[require.resolve(_path2.default.resolve(config))];
    }

    return (0, _mergeConfigWithDefaults2.default)(_lodash2.default.isObject(config) ? config : require(_path2.default.resolve(config)), require('../defaultConfig')());
  };

  return (0, _postcss2.default)([...plugins, (0, _processTailwindFeatures2.default)(getConfig), (0, _perfectionist2.default)({
    cascade: true,
    colorShorthand: true,
    indentSize: 2,
    maxSelectorLength: 1,
    maxValueLength: false,
    trimLeadingZero: true,
    trimTrailingZeros: true,
    zeroLengthNoUnit: false
  })]);
});

plugin.defaultConfig = function () {
  // prettier-ignore
  throw new Error("`require('tailwindcss').defaultConfig()` is no longer a function, access it instead as `require('tailwindcss/defaultConfig')()`.");
};

module.exports = plugin;