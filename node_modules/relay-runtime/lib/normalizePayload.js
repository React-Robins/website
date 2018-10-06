/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule normalizePayload
 * 
 * @format
 */

'use strict';

var _require = require('./RelayStoreUtils'),
    ROOT_ID = _require.ROOT_ID;

function normalizePayload(payload) {
  var operation = payload.operation,
      variables = payload.variables,
      response = payload.response;
  var data = response.data,
      errors = response.errors;

  if (data != null) {
    return require('./normalizeRelayPayload')({
      dataID: ROOT_ID,
      node: operation,
      variables: variables
    }, data, errors, { handleStrippedNulls: true });
  }
  var error = require('./RelayError').create('RelayNetwork', 'No data returned for operation `%s`, got error(s):\n%s\n\nSee the error ' + '`source` property for more information.', operation.name, errors ? errors.map(function (_ref) {
    var message = _ref.message;
    return message;
  }).join('\n') : '(No errors)');
  error.source = { errors: errors, operation: operation, variables: variables };
  throw error;
}

module.exports = normalizePayload;