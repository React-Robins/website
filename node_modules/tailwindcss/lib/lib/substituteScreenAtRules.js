'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return function (css) {
    css.walkAtRules('screen', atRule => {
      const screen = atRule.params;

      if (!_lodash2.default.has(config.screens, screen)) {
        throw atRule.error(`No \`${screen}\` screen found.`);
      }

      atRule.name = 'media';
      atRule.params = (0, _buildMediaQuery2.default)(config.screens[screen]);
    });
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _buildMediaQuery = require('../util/buildMediaQuery');

var _buildMediaQuery2 = _interopRequireDefault(_buildMediaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }