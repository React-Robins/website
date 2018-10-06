'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config, pluginUtilities) {
  const utilities = (0, _generateModules2.default)(_utilityModules2.default, config.modules, config);

  if (config.options.important) {
    utilities.walkDecls(decl => decl.important = true);
  }

  const tailwindUtilityTree = _postcss2.default.root({
    nodes: utilities.nodes
  });

  (0, _prefixTree2.default)(tailwindUtilityTree, config.options.prefix);

  return [...tailwindUtilityTree.nodes, ...pluginUtilities];
};

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _utilityModules = require('../utilityModules');

var _utilityModules2 = _interopRequireDefault(_utilityModules);

var _prefixTree = require('../util/prefixTree');

var _prefixTree2 = _interopRequireDefault(_prefixTree);

var _generateModules = require('../util/generateModules');

var _generateModules2 = _interopRequireDefault(_generateModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }