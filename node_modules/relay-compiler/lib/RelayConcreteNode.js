/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayConcreteNode
 * 
 * @format
 */

'use strict';

/**
 * Represents a common GraphQL request with `text` (or persisted `id`) can be
 * used to execute it, an `operation` containing information to normalize the
 * results, and a `fragment` derived from that operation to read the response
 * data (masking data from child fragments).
 */

/**
 * An experimental wrapper around many operations to request in a batched
 * network request. The composed indivual GraphQL requests should be submitted
 * as a single networked request, e.g. in the case of deferred nodes or
 * for streaming connections that are represented as distinct compiled concrete
 * operations but are still conceptually tied to one source operation.
 *
 * Individual requests within the batch may contain data describing their
 * dependencies on other requests or themselves.
 */
var RelayConcreteNode = {
  BATCH_REQUEST: 'BatchRequest',
  CONDITION: 'Condition',
  DEFERRABLE_FRAGMENT_SPREAD: 'DeferrableFragmentSpread',
  DEFERRABLE_OPERATION: 'DeferrableOperation',
  FRAGMENT: 'Fragment',
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_FRAGMENT: 'InlineFragment',
  LINKED_FIELD: 'LinkedField',
  LINKED_HANDLE: 'LinkedHandle',
  LITERAL: 'Literal',
  LOCAL_ARGUMENT: 'LocalArgument',
  OPERATION: 'Operation',
  ROOT_ARGUMENT: 'RootArgument',
  REQUEST: 'Request',
  SCALAR_FIELD: 'ScalarField',
  SCALAR_HANDLE: 'ScalarHandle',
  VARIABLE: 'Variable'
};
/**
 * Represents a single operation used to processing and normalize runtime
 * request results.
 */

/**
 * Argument in the provided operation to be derived via the results of
 * other requests in the batch.
 */


module.exports = RelayConcreteNode;