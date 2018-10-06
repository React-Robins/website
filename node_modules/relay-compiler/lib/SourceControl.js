/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function execFile(cmd, args) {
  return new Promise(function (resolve, reject) {
    require('child_process').execFile(cmd, args, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * An abstraction over the source control system to make it injectable.
 */


var SourceControlMercurial = {
  addRemove: (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (added, removed) {
      // NOTE: Not using `hg addremove` as that has a bug when deleting a file
      // that was just added, but not yet committed: T10711513
      if (added.length > 0) {
        yield execFile('hg', ['add'].concat((0, _toConsumableArray3['default'])(added)));
      }
      if (removed.length > 0) {
        yield execFile('hg', ['forget'].concat((0, _toConsumableArray3['default'])(removed)));
      }
    });

    function addRemove(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return addRemove;
  })()
};

module.exports = {
  SourceControlMercurial: SourceControlMercurial
};