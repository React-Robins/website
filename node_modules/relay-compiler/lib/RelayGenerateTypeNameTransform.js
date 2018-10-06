/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule RelayGenerateTypeNameTransform
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./RelayTransformUtils'),
    hasUnaliasedSelection = _require.hasUnaliasedSelection;

var _require2 = require('graphql'),
    assertLeafType = _require2.assertLeafType;

var _require3 = require('./GraphQLCompilerPublic'),
    CompilerContext = _require3.CompilerContext,
    IRTransformer = _require3.IRTransformer,
    SchemaUtils = _require3.SchemaUtils;

var isAbstractType = SchemaUtils.isAbstractType;


var TYPENAME_KEY = '__typename';
var STRING_TYPE = 'String';

/**
 * A transform that adds `__typename` field on any `LinkedField` of a union or
 * interface type where there is no unaliased `__typename` selection.
 */
function relayGenerateTypeNameTransform(context) {
  var stringType = assertLeafType(context.serverSchema.getType(STRING_TYPE));
  var typenameField = {
    kind: 'ScalarField',
    alias: null,
    args: [],
    directives: [],
    handles: null,
    metadata: null,
    name: TYPENAME_KEY,
    type: stringType
  };
  var state = {
    typenameField: typenameField
  };
  return IRTransformer.transform(context, {
    LinkedField: visitLinkedField
  }, function () {
    return state;
  });
}

function visitLinkedField(field, state) {
  var transformedNode = this.traverse(field, state);
  if (isAbstractType(transformedNode.type) && !hasUnaliasedSelection(transformedNode, TYPENAME_KEY)) {
    return (0, _extends3['default'])({}, transformedNode, {
      selections: [state.typenameField].concat((0, _toConsumableArray3['default'])(transformedNode.selections))
    });
  }
  return transformedNode;
}

module.exports = {
  transform: relayGenerateTypeNameTransform
};