'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config, { components: pluginComponents }, generatedUtilities) {
  return function (css) {
    css.walkAtRules('tailwind', atRule => {
      if (atRule.params === 'preflight') {
        const preflightTree = _postcss2.default.parse(_fs2.default.readFileSync(`${__dirname}/../../css/preflight.css`, 'utf8'));

        atRule.before(updateSource(preflightTree, atRule.source));
        atRule.remove();
      }

      if (atRule.params === 'components') {
        atRule.before(updateSource(pluginComponents, atRule.source));
        atRule.remove();
      }

      if (atRule.params === 'utilities') {
        atRule.before(updateSource(generatedUtilities, atRule.source));
        atRule.remove();
      }
    });
  };
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateSource(nodes, source) {
  return _lodash2.default.tap(Array.isArray(nodes) ? _postcss2.default.root({ nodes }) : nodes, tree => {
    tree.walk(node => node.source = source);
  });
}