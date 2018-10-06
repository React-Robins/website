'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMediaQuery;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildMediaQuery(screens) {
  if (_lodash2.default.isString(screens)) {
    screens = { min: screens };
  }

  if (!_lodash2.default.isArray(screens)) {
    screens = [screens];
  }

  return (0, _lodash2.default)(screens).map(screen => {
    if (_lodash2.default.has(screen, 'raw')) {
      return screen.raw;
    }

    return (0, _lodash2.default)(screen).map((value, feature) => {
      feature = _lodash2.default.get({
        min: 'min-width',
        max: 'max-width'
      }, feature, feature);
      return `(${feature}: ${value})`;
    }).join(' and ');
  }).join(', ');
}