/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule InlineFragmentsTransform
 * 
 * @format
 */

'use strict';

var STATE = {};

/**
 * A transform that inlines all fragments and removes them.
 */
function inlineFragmentsTransform(context) {
  return require('./GraphQLIRTransformer').transform(context, {
    Fragment: visitFragment,
    FragmentSpread: visitFragmentSpread
  }, function () {
    return STATE;
  });
}

function visitFragment(fragment, state) {
  return null;
}

function visitFragmentSpread(fragmentSpread, state) {
  require('fbjs/lib/invariant')(fragmentSpread.args.length === 0, 'InlineFragmentsTransform: Cannot flatten fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', fragmentSpread.name);
  var fragment = this.getContext().getFragment(fragmentSpread.name);
  var result = {
    kind: 'InlineFragment',
    directives: fragmentSpread.directives,
    metadata: fragmentSpread.metadata,
    selections: fragment.selections,
    typeCondition: fragment.type
  };

  return this.traverse(result, state);
}

module.exports = {
  transform: inlineFragmentsTransform
};