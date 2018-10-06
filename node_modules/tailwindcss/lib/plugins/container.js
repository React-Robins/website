'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractMinWidths(breakpoints) {
  return _lodash2.default.flatMap(breakpoints, breakpoints => {
    if (_lodash2.default.isString(breakpoints)) {
      breakpoints = { min: breakpoints };
    }

    if (!_lodash2.default.isArray(breakpoints)) {
      breakpoints = [breakpoints];
    }

    return (0, _lodash2.default)(breakpoints).filter(breakpoint => {
      return _lodash2.default.has(breakpoint, 'min') || _lodash2.default.has(breakpoint, 'min-width');
    }).map(breakpoint => {
      return _lodash2.default.get(breakpoint, 'min-width', breakpoint.min);
    }).value();
  });
} /* eslint-disable no-shadow */


module.exports = function (options) {
  return function ({ addComponents, config }) {
    const screens = _lodash2.default.get(options, 'screens', config('screens'));

    const minWidths = extractMinWidths(screens);

    const atRules = _lodash2.default.map(minWidths, minWidth => {
      return {
        [`@media (min-width: ${minWidth})`]: {
          '.container': {
            'max-width': minWidth
          }
        }
      };
    });

    addComponents([{
      '.container': Object.assign({ width: '100%' }, _lodash2.default.get(options, 'center', false) ? { marginRight: 'auto', marginLeft: 'auto' } : {}, _lodash2.default.has(options, 'padding') ? { paddingRight: options.padding, paddingLeft: options.padding } : {})
    }, ...atRules]);
  };
};