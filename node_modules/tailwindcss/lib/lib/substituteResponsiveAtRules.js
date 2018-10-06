'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return function (css) {
    const screens = config.screens;
    const separator = config.options.separator;
    const responsiveRules = [];
    let finalRules = [];

    css.walkAtRules('responsive', atRule => {
      const nodes = atRule.nodes;
      responsiveRules.push(...(0, _cloneNodes2.default)(nodes));
      atRule.before(nodes);
      atRule.remove();
    });

    _lodash2.default.keys(screens).forEach(screen => {
      const mediaQuery = _postcss2.default.atRule({
        name: 'media',
        params: (0, _buildMediaQuery2.default)(screens[screen])
      });

      mediaQuery.append(responsiveRules.map(rule => {
        const cloned = rule.clone();
        cloned.selectors = _lodash2.default.map(rule.selectors, selector => (0, _buildSelectorVariant2.default)(selector, screen, separator, message => {
          throw rule.error(message);
        }));
        return cloned;
      }));

      finalRules.push(mediaQuery);
    });

    const hasScreenRules = finalRules.some(i => i.nodes.length !== 0);

    if (!hasScreenRules) {
      return;
    }

    let includesScreensExplicitly = false;

    css.walkAtRules('tailwind', atRule => {
      if (atRule.params === 'screens') {
        atRule.replaceWith(finalRules);
        includesScreensExplicitly = true;
      }
    });

    if (!includesScreensExplicitly) {
      css.append(finalRules);
      return;
    }
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _cloneNodes = require('../util/cloneNodes');

var _cloneNodes2 = _interopRequireDefault(_cloneNodes);

var _buildMediaQuery = require('../util/buildMediaQuery');

var _buildMediaQuery2 = _interopRequireDefault(_buildMediaQuery);

var _buildSelectorVariant = require('../util/buildSelectorVariant');

var _buildSelectorVariant2 = _interopRequireDefault(_buildSelectorVariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }