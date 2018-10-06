/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule RelayGenerateIDFieldTransform
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./RelayTransformUtils'),
    hasUnaliasedSelection = _require.hasUnaliasedSelection;

var _require2 = require('graphql'),
    assertAbstractType = _require2.assertAbstractType,
    assertCompositeType = _require2.assertCompositeType,
    assertLeafType = _require2.assertLeafType;

var _require3 = require('./GraphQLCompilerPublic'),
    CompilerContext = _require3.CompilerContext,
    SchemaUtils = _require3.SchemaUtils,
    IRTransformer = _require3.IRTransformer;

var canHaveSelections = SchemaUtils.canHaveSelections,
    getRawType = SchemaUtils.getRawType,
    hasID = SchemaUtils.hasID,
    implementsInterface = SchemaUtils.implementsInterface,
    isAbstractType = SchemaUtils.isAbstractType,
    mayImplement = SchemaUtils.mayImplement;


var ID = 'id';
var ID_TYPE = 'ID';
var NODE_TYPE = 'Node';

/**
 * A transform that adds an `id` field on any type that has an id field but
 * where there is no unaliased `id` selection.
 */
function relayGenerateIDFieldTransform(context) {
  var idType = assertLeafType(context.serverSchema.getType(ID_TYPE));
  var idField = {
    kind: 'ScalarField',
    alias: null,
    args: [],
    directives: [],
    handles: null,
    metadata: null,
    name: ID,
    type: idType
  };
  var state = {
    idField: idField
  };
  return IRTransformer.transform(context, {
    LinkedField: visitLinkedField
  }, function () {
    return state;
  });
}

function visitLinkedField(field, state) {
  var transformedNode = this.traverse(field, state);

  // If the field already has an unaliased `id` field, do nothing
  if (hasUnaliasedSelection(field, ID)) {
    return transformedNode;
  }

  var context = this.getContext();
  var schema = context.serverSchema;
  var unmodifiedType = assertCompositeType(getRawType(field.type));

  // If the field type has an `id` subfield add an `id` selection
  if (canHaveSelections(unmodifiedType) && hasID(schema, unmodifiedType)) {
    return (0, _extends3['default'])({}, transformedNode, {
      selections: [].concat((0, _toConsumableArray3['default'])(transformedNode.selections), [state.idField])
    });
  }

  // If the field type is abstract, then generate a `... on Node { id }`
  // fragment if *any* concrete type implements Node. Then generate a
  // `... on PossibleType { id }` for every concrete type that does *not*
  // implement `Node`
  if (isAbstractType(unmodifiedType)) {
    var selections = [].concat((0, _toConsumableArray3['default'])(transformedNode.selections));
    if (mayImplement(schema, unmodifiedType, NODE_TYPE)) {
      var nodeType = assertCompositeType(schema.getType(NODE_TYPE));
      selections.push(buildIDFragment(nodeType, state.idField));
    }
    var abstractType = assertAbstractType(unmodifiedType);
    schema.getPossibleTypes(abstractType).forEach(function (possibleType) {
      if (!implementsInterface(possibleType, NODE_TYPE) && hasID(schema, possibleType)) {
        selections.push(buildIDFragment(possibleType, state.idField));
      }
    });
    return (0, _extends3['default'])({}, transformedNode, {
      selections: selections
    });
  }

  return transformedNode;
}

/**
 * @internal
 *
 * Returns IR for `... on FRAGMENT_TYPE { id }`
 */
function buildIDFragment(fragmentType, idField) {
  return {
    kind: 'InlineFragment',
    directives: [],
    metadata: null,
    typeCondition: fragmentType,
    selections: [idField]
  };
}

module.exports = {
  transform: relayGenerateIDFieldTransform
};