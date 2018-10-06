/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayModernOperationSelector
 * 
 * @format
 */

'use strict';

var _require = require('./RelayConcreteVariables'),
    getOperationVariables = _require.getOperationVariables;

var _require2 = require('./RelayStoreUtils'),
    ROOT_ID = _require2.ROOT_ID;

/**
 * Creates an instance of the `OperationSelector` type defined in
 * `RelayStoreTypes` given an operation and some variables. The input variables
 * are filtered to exclude variables that do not match defined arguments on the
 * operation, and default values are populated for null values.
 */
function createOperationSelector(request, variables, operationFromBatch) {
  var operation = operationFromBatch || (request.kind === require('./RelayConcreteNode').BATCH_REQUEST ? request.requests[0].operation : request.operation);

  var operationVariables = getOperationVariables(operation, variables);
  var dataID = ROOT_ID;
  return {
    fragment: {
      dataID: dataID,
      node: request.fragment,
      variables: operationVariables
    },
    node: request,
    root: {
      dataID: dataID,
      node: operation,
      variables: operationVariables
    },
    variables: operationVariables
  };
}

module.exports = {
  createOperationSelector: createOperationSelector
};