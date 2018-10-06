/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ConvertToExecuteFunction
 * 
 * @format
 */

'use strict';

/**
 * Converts a FetchFunction into an ExecuteFunction for use by RelayNetwork.
 */
function convertFetch(fn) {
  return function fetch(request, variables, cacheConfig, uploadables) {
    var result = fn(request, variables, cacheConfig, uploadables);
    // Note: We allow FetchFunction to directly return Error to indicate
    // a failure to fetch. To avoid handling this special case throughout the
    // Relay codebase, it is explicitly handled here.
    if (result instanceof Error) {
      return require('./RelayObservable').create(function (sink) {
        return sink.error(result);
      });
    }
    return require('./RelayObservable').from(result).map(function (value) {
      return convertToExecutePayload(request, variables, value);
    });
  };
}

/**
 * Converts a SubscribeFunction into an ExecuteFunction for use by RelayNetwork.
 */
function convertSubscribe(fn) {
  return function subscribe(operation, variables, cacheConfig) {
    return require('./RelayObservable').fromLegacy(function (observer) {
      return fn(operation, variables, cacheConfig, observer);
    }).map(function (value) {
      return convertToExecutePayload(operation, variables, value);
    });
  };
}

/**
 * Given a value which might be a plain GraphQLResponse, coerce to always return
 * an ExecutePayload. A GraphQLResponse may be returned directly from older or
 * simpler Relay Network implementations.
 */
function convertToExecutePayload(request, variables, value) {
  if (!value.data && !value.errors && value.response) {
    if (!value.operation) {
      require('fbjs/lib/warning')(false, 'ConvertToExecuteFunction: execute payload contains response but ' + 'is missing operation.');
      return createExecutePayload(request, variables, value.response);
    }
    return value;
  }
  return createExecutePayload(request, variables, value);
}

function createExecutePayload(request, variables, response) {
  if (request.kind === require('./RelayConcreteNode').BATCH_REQUEST) {
    throw new Error('ConvertToExecuteFunction: Batch request must return ExecutePayload.');
  }
  return { operation: request.operation, variables: variables, response: response };
}

module.exports = {
  convertFetch: convertFetch,
  convertSubscribe: convertSubscribe
};