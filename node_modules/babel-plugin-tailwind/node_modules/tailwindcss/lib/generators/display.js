'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return (0, _defineClasses2.default)({
    block: {
      display: 'block'
    },
    'inline-block': {
      display: 'inline-block'
    },
    inline: {
      display: 'inline'
    },
    table: {
      display: 'table'
    },
    'table-row': {
      display: 'table-row'
    },
    'table-cell': {
      display: 'table-cell'
    },
    hidden: {
      display: 'none'
    }
  });
};

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }