'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configFile) {
  if (!_fs2.default.existsSync(configFile)) {
    throw new Error(`Specified Tailwind config file "${configFile}" doesn't exist.`);
  }

  return function (css, opts) {
    opts.messages.push({
      type: 'dependency',
      file: configFile,
      parent: css.source.input.file
    });
  };
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }