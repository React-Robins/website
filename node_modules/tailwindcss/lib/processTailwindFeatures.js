'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (getConfig) {
  return function (css) {
    const config = getConfig();
    const processedPlugins = (0, _processPlugins2.default)(config);
    const utilities = (0, _generateUtilities2.default)(config, processedPlugins.utilities);

    return (0, _postcss2.default)([(0, _substituteTailwindAtRules2.default)(config, processedPlugins, utilities), (0, _evaluateTailwindFunctions2.default)(config), (0, _substituteVariantsAtRules2.default)(config, processedPlugins), (0, _substituteResponsiveAtRules2.default)(config), (0, _substituteScreenAtRules2.default)(config), (0, _substituteClassApplyAtRules2.default)(config, utilities)]).process(css, { from: _lodash2.default.get(css, 'source.input.file') });
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _substituteTailwindAtRules = require('./lib/substituteTailwindAtRules');

var _substituteTailwindAtRules2 = _interopRequireDefault(_substituteTailwindAtRules);

var _evaluateTailwindFunctions = require('./lib/evaluateTailwindFunctions');

var _evaluateTailwindFunctions2 = _interopRequireDefault(_evaluateTailwindFunctions);

var _substituteVariantsAtRules = require('./lib/substituteVariantsAtRules');

var _substituteVariantsAtRules2 = _interopRequireDefault(_substituteVariantsAtRules);

var _substituteResponsiveAtRules = require('./lib/substituteResponsiveAtRules');

var _substituteResponsiveAtRules2 = _interopRequireDefault(_substituteResponsiveAtRules);

var _substituteScreenAtRules = require('./lib/substituteScreenAtRules');

var _substituteScreenAtRules2 = _interopRequireDefault(_substituteScreenAtRules);

var _substituteClassApplyAtRules = require('./lib/substituteClassApplyAtRules');

var _substituteClassApplyAtRules2 = _interopRequireDefault(_substituteClassApplyAtRules);

var _generateUtilities = require('./util/generateUtilities');

var _generateUtilities2 = _interopRequireDefault(_generateUtilities);

var _processPlugins = require('./util/processPlugins');

var _processPlugins2 = _interopRequireDefault(_processPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }