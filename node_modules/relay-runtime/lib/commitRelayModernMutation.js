/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule commitRelayModernMutation
 * 
 * @format
 */

'use strict';

/**
 * Higher-level helper function to execute a mutation against a specific
 * environment.
 */
function commitRelayModernMutation(
/* $FlowFixMe(>=0.55.0 site=www) This comment suppresses an error found when
 * Flow v0.55 was deployed. To see the error delete this comment and run
 * Flow. */
environment, config) {
  require('fbjs/lib/invariant')(require('./isRelayModernEnvironment')(environment), 'commitRelayModernMutation: expect `environment` to be an instance of ' + '`RelayModernEnvironment`.');
  var _environment$unstable = environment.unstable_internal,
      createOperationSelector = _environment$unstable.createOperationSelector,
      getRequest = _environment$unstable.getRequest;

  var mutation = getRequest(config.mutation);
  if (mutation.operationKind !== 'mutation') {
    throw new Error('commitRelayModernMutation: Expected mutation operation');
  }
  var optimisticResponse = config.optimisticResponse,
      optimisticUpdater = config.optimisticUpdater,
      updater = config.updater;
  var configs = config.configs,
      onError = config.onError,
      variables = config.variables,
      uploadables = config.uploadables;

  var operation = createOperationSelector(mutation, variables);
  // TODO: remove this check after we fix flow.
  if (typeof optimisticResponse === 'function') {
    optimisticResponse = optimisticResponse();
    require('fbjs/lib/warning')(false, 'commitRelayModernMutation: Expected `optimisticResponse` to be an object, ' + 'received a function.');
  }
  if (optimisticResponse && mutation.fragment.selections && mutation.fragment.selections.length === 1 && mutation.fragment.selections[0].kind === 'LinkedField') {
    var mutationRoot = mutation.fragment.selections[0].name;
    require('fbjs/lib/warning')(optimisticResponse[mutationRoot], 'commitRelayModernMutation: Expected `optimisticResponse` to be wrapped ' + 'in mutation name `%s`', mutationRoot);
  }
  if (configs) {
    var _RelayDeclarativeMuta = require('./RelayDeclarativeMutationConfig').convert(configs, mutation, optimisticUpdater, updater);

    optimisticUpdater = _RelayDeclarativeMuta.optimisticUpdater;
    updater = _RelayDeclarativeMuta.updater;
  }
  return environment.executeMutation({
    operation: operation,
    optimisticResponse: optimisticResponse,
    optimisticUpdater: optimisticUpdater,
    updater: updater,
    uploadables: uploadables
  }).subscribeLegacy({
    onNext: function onNext(payload) {
      // NOTE: commitRelayModernMutation has a non-standard use of
      // onCompleted() by calling it on every next value. It may be called
      // multiple times if a network request produces multiple responses.
      var onCompleted = config.onCompleted;

      if (onCompleted) {
        var snapshot = environment.lookup(operation.fragment);
        onCompleted(snapshot.data, payload.response.errors);
      }
    },
    onError: onError
  });
}

module.exports = commitRelayModernMutation;