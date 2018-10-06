'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  return (0, _postcssFunctions2.default)({
    functions: {
      config: (path, defaultValue) => {
        return _lodash2.default.get(config, _lodash2.default.trim(path, `'"`), defaultValue);
      }
    }
  });
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcssFunctions = require('postcss-functions');

var _postcssFunctions2 = _interopRequireDefault(_postcssFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }