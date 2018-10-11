/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelaySkipHandleFieldTransform
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLCompilerPublic'),
    CompilerContext = _require.CompilerContext,
    IRTransformer = _require.IRTransformer;

/**
 * A transform that removes field `handles`. Intended for use when e.g.
 * printing queries to send to a GraphQL server.
 */
function relaySkipHandleFieldTransform(context) {
  return IRTransformer.transform(context, {
    LinkedField: visitField,
    ScalarField: visitField
  });
}

function visitField(field) {
  var transformedNode = this.traverse(field);
  if (transformedNode.handles) {
    return (0, _extends3['default'])({}, transformedNode, {
      handles: null
    });
  }
  return transformedNode;
}

module.exports = {
  transform: relaySkipHandleFieldTransform
};