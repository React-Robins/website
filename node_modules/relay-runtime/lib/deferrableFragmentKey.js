/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule deferrableFragmentKey
 * 
 * @format
 */

'use strict';

function deferrableFragmentKey(dataID, fragmentName, variables) {
  var variablesString = Object.keys(variables).reduce(function (acc, key) {
    return '' + acc + (acc ? ',' : '') + key + ':' + variables[key];
  }, '');
  return 'dataID:' + dataID + ',fragment:' + fragmentName + ',variables:' + variablesString;
}

module.exports = deferrableFragmentKey;