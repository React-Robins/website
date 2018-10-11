/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayRelayDirectiveTransform
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLCompilerPublic'),
    CompilerContext = _require.CompilerContext,
    IRTransformer = _require.IRTransformer,
    getLiteralArgumentValues = _require.getLiteralArgumentValues;

var RELAY = 'relay';
var SCHEMA_EXTENSION = 'directive @relay(\n  # Marks this fragment spread as being deferrable such that it loads after\n  # other portions of the view.\n  deferrable: Boolean,\n\n  # Marks a connection field as containing nodes without \'id\' fields.\n  # This is used to silence the warning when diffing connections.\n  isConnectionWithoutNodeID: Boolean,\n\n  # Marks a fragment as intended for pattern matching (as opposed to fetching).\n  # Used in Classic only.\n  pattern: Boolean,\n\n  # Marks a fragment as being backed by a GraphQLList.\n  plural: Boolean,\n\n  # Marks a fragment spread which should be unmasked if provided false\n  mask: Boolean = true,\n\n  # Selectively pass variables down into a fragment. Only used in Classic.\n  variables: [String!],\n) on FRAGMENT_DEFINITION | FRAGMENT_SPREAD | INLINE_FRAGMENT | FIELD';

/**
 * A transform that extracts `@relay(plural: Boolean)` directives and converts
 * them to metadata that can be accessed at runtime.
 */
function relayRelayDirectiveTransform(context) {
  return IRTransformer.transform(context, {
    Fragment: visitRelayMetadata(fragmentMetadata),
    FragmentSpread: visitRelayMetadata(fragmentSpreadMetadata)
  });
}

function visitRelayMetadata(metadataFn) {
  return function (node) {
    var relayDirective = node.directives.find(function (_ref) {
      var name = _ref.name;
      return name === RELAY;
    });
    if (!relayDirective) {
      return this.traverse(node);
    }
    var argValues = getLiteralArgumentValues(relayDirective.args);
    var metadata = metadataFn(argValues);
    return this.traverse((0, _extends3['default'])({}, node, {
      directives: node.directives.filter(function (directive) {
        return directive !== relayDirective;
      }),
      metadata: (0, _extends3['default'])({}, node.metadata || {}, metadata)
    }));
  };
}

function fragmentMetadata(_ref2) {
  var plural = _ref2.plural;

  require('fbjs/lib/invariant')(plural === undefined || typeof plural === 'boolean', 'RelayRelayDirectiveTransform: Expected the "plural" argument to @relay ' + 'to be a boolean literal if specified.');
  return { plural: plural };
}

function fragmentSpreadMetadata(_ref3) {
  var mask = _ref3.mask,
      deferrable = _ref3.deferrable;

  require('fbjs/lib/invariant')(mask === undefined || typeof mask === 'boolean', 'RelayRelayDirectiveTransform: Expected the "mask" argument to @relay ' + 'to be a boolean literal if specified.');
  require('fbjs/lib/invariant')(deferrable === undefined || typeof deferrable === 'boolean', 'RelayRelayDirectiveTransform: Expected the "deferrable" argument to ' + '@relay to be a boolean literal if specified.');
  require('fbjs/lib/invariant')(!(deferrable === true && mask === false), 'RelayRelayDirectiveTransform: Cannot unmask a deferrable fragment spread.');
  return { mask: mask, deferrable: deferrable };
}

module.exports = {
  RELAY: RELAY,
  SCHEMA_EXTENSION: SCHEMA_EXTENSION,
  transform: relayRelayDirectiveTransform
};