/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayDeferrableFragmentTransform
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('graphql'),
    doTypesOverlap = _require.doTypesOverlap,
    getNamedType = _require.getNamedType,
    isInputType = _require.isInputType,
    GraphQLInterfaceType = _require.GraphQLInterfaceType,
    GraphQLList = _require.GraphQLList,
    GraphQLInputType = _require.GraphQLInputType;

var _require2 = require('./GraphQLCompilerPublic'),
    IRTransformer = _require2.IRTransformer,
    IRVisitor = _require2.IRVisitor;

var DEFERRABLE_ARGUMENT_NAME = 'deferrableID';

/**
 * Deferrable fragment spreads are transformed into a series of individual
 * dependent operation requests, expected to be executed as part of a batch
 * operation.
 *
 * To achieve this transform, two steps are performed:
 *
 *   1) `transformOperations` is responsible for identifying which fragments
 *      are deferrable and creating new root operations for them, as well as
 *      creating the "dependent request" associations between them.
 *
 *   2) `transformSpreads` is responsible for replacing deferrable fragment
 *      spreads with an `id` field. This step should only apply to the "query"
 *      compiler phase, so that the request sent to the GraphQL server does not
 *      contain the deferrable fragment and in its place has the information
 *      necessary to later fulfill that fragment.
 *
 */
function transformOperations(context) {
  // First, in an initial pass over all definitions, collect the path to each
  // fragment spread from within a fragment or operation, as well as the set of
  var spreadUsesWithin = new Map();
  var deferrableFragments = new Set();
  context.forEachDocument(function (document) {
    var pathParts = [];
    var spreadUses = [];
    spreadUsesWithin.set(document, spreadUses);
    IRVisitor.visit(document, {
      LinkedField: {
        enter: function enter(field) {
          var pathPart = field.alias || field.name;
          var fieldType = field.type;
          while (fieldType.ofType) {
            if (fieldType instanceof GraphQLList) {
              pathPart += '[*]';
            }
            fieldType = fieldType.ofType;
          }
          pathParts.push(pathPart);
        },
        leave: function leave() {
          pathParts.pop();
        }
      },
      FragmentSpread: function FragmentSpread(spread) {
        spreadUses.push({ spread: spread, path: pathParts.join('.') });
        if (isDeferrable(spread)) {
          deferrableFragments.add(context.getFragment(spread.name));
        }
      }
    });
  });

  // If no fragments have been deferrable, then no transformation is necessary.
  if (deferrableFragments.size === 0) {
    return context;
  }

  // Next, transform any existing root operations to include references to
  // their dependent requests.
  var transformedContext = IRTransformer.transform(context, {
    Root: function Root(root) {
      var dependentRequests = createDependentRequests(context, spreadUsesWithin, root);
      // If this operation contains deferrable spreads, then it will have
      // additional dependent requests.
      return dependentRequests.length === 0 ? root : (0, _extends3['default'])({}, root, {
        dependentRequests: [].concat((0, _toConsumableArray3['default'])(root.dependentRequests), dependentRequests)
      });
    }
  });

  // Finally, add new operations representing each deferrable fragment.
  var deferrableOperations = Array.from(deferrableFragments).map(function (fragment) {
    // Create the deferrable operation.
    var deferrableOperation = createDeferrableOperation(context, fragment);

    // Include the deferrable operation along with the necessary
    // additional variable definitions and dependent requests.
    var argumentDefinitions = createArgumentDefinitions(context, spreadUsesWithin,
    // variablesWithin,
    fragment);
    var dependentRequests = createDependentRequests(context, spreadUsesWithin, fragment);
    var completeDeferrableOperation = (0, _extends3['default'])({}, deferrableOperation, {
      argumentDefinitions: [].concat((0, _toConsumableArray3['default'])(deferrableOperation.argumentDefinitions), argumentDefinitions),
      dependentRequests: [].concat((0, _toConsumableArray3['default'])(deferrableOperation.dependentRequests), dependentRequests)
    });
    return completeDeferrableOperation;
  });

  return transformedContext.addAll(deferrableOperations);
}

/**
 * The second step of the Deferrable transform, replacing deferrable spreads
 * with deferrable refetch references which correspond to the dependent requests
 */
function transformSpreads(context) {
  // Next, transform the definitions:
  //  - Replacing deferrable spreads with refetch references.
  //  - Adding dependent requests to operations.
  return IRTransformer.transform(context, {
    FragmentSpread: function FragmentSpread(spread) {
      if (!isDeferrable(spread)) {
        return spread;
      }
      // If this spread is deferrable, replace it with a refetch reference.
      // The deferrable reference is definitionally not a FragmentSpread,
      // though the transformer expects functions to return the same type.
      return createDeferrableReference(context, spread);
    }
  });
}

// True if the FragmentSpread is marked as deferrable.
function isDeferrable(spread) {
  return Boolean(spread.metadata && spread.metadata.deferrable);
}

// Given a fragment, return the variable definitions necessary for all
// variables used across deeply within.
function createArgumentDefinitions(context, spreadUsesWithin, fragment) {
  // Collect all recursively included definitions from the root.
  var includedFragments = new Set([fragment]);
  var nodesToVisit = [fragment];
  while (nodesToVisit.length !== 0) {
    var spreadUses = require('fbjs/lib/nullthrows')(spreadUsesWithin.get(nodesToVisit.pop()));
    for (var i = 0; i < spreadUses.length; i++) {
      var includedFragment = context.getFragment(spreadUses[i].spread.name);
      if (!includedFragments.has(includedFragment)) {
        includedFragments.add(includedFragment);
        nodesToVisit.push(includedFragment);
      }
    }
  }

  // Then get all variables used in all included fragments to determine
  // additional variable definitions, ensuring one definition per variable.
  var variableDefinitions = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = includedFragments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _includedFragment = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _includedFragment.argumentDefinitions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var argumentDefinition = _step2.value;

          if (!variableDefinitions.has(argumentDefinition.name)) {
            variableDefinitions.set(argumentDefinition.name, {
              kind: 'LocalArgumentDefinition',
              metadata: argumentDefinition.metadata,
              name: argumentDefinition.name,
              type: argumentDefinition.type,
              defaultValue: argumentDefinition.kind === 'LocalArgumentDefinition' ? argumentDefinition.defaultValue : undefined
            });
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Array.from(variableDefinitions.values());
}

// Given a fragment or node, return the set of dependent requests to fulfill.
// Defines the relationship between deferrable reference selections (above) and
// the deferrable operations dependent on them (below).
function createDependentRequests(context, spreadUsesWithin, from) {
  var spreadUses = getDeferrableSpreadUses(context, spreadUsesWithin, from);
  return spreadUses.map(function (_ref) {
    var spread = _ref.spread,
        path = _ref.path;
    return {
      operationName: spread.name + '_Deferrable',
      metadata: {
        deferrable: true,
        fragmentName: spread.name,
        rootFieldVariable: DEFERRABLE_ARGUMENT_NAME
      },
      argumentDependencies: [{
        kind: 'ArgumentDependency',
        argumentName: DEFERRABLE_ARGUMENT_NAME,
        fromName: from.name,
        fromPath: path + '.' + deferrableAlias(spread.name),
        ifList: 'each',
        ifNull: 'skip'
      }]
    };
  });
}

// A utility function which collects the paths to deferrable spreads from
// a given starting Root or Fragment definition. Used above to determine the
// dependent requests from an operation.
var memoizedDeferrableSpreadUses = new WeakMap();
function getDeferrableSpreadUses(context, spreadUsesWithin, node) {
  var deferrableSpreadUses = memoizedDeferrableSpreadUses.get(node);
  if (!deferrableSpreadUses) {
    deferrableSpreadUses = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = require('fbjs/lib/nullthrows')(spreadUsesWithin.get(node))[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var spreadUse = _step3.value;

        if (isDeferrable(spreadUse.spread)) {
          deferrableSpreadUses.push(spreadUse);
        } else {
          var nestedSpreadUses = getDeferrableSpreadUses(context, spreadUsesWithin, context.getFragment(spreadUse.spread.name));
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = nestedSpreadUses[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var nestedSpreadUse = _step4.value;

              deferrableSpreadUses.push({
                spread: nestedSpreadUse.spread,
                path: spreadUse.path + '.' + nestedSpreadUse.path
              });
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                _iterator4['return']();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    memoizedDeferrableSpreadUses.set(node, deferrableSpreadUses);
  }
  return deferrableSpreadUses;
}

// Utility function for creating a deferrable reference selection from a
// deferrable fragment spread. This selection will be depended upon by another
// operation in a batch request to fulfill the deferrable fragment.
function createDeferrableReference(context, spread) {
  var schema = context.clientSchema;
  var nodeType = getNodeType(schema);
  var idType = getIdType(schema);
  var fragmentType = context.getFragment(spread.name).type;
  require('fbjs/lib/invariant')(doTypesOverlap(schema, fragmentType, nodeType), 'RelayDeferrableFragmentsTransform: Cannot defer %s since objects of ' + 'type %s can never also be of type Node.', spread.name, fragmentType);
  require('fbjs/lib/invariant')(spread.args.length === 0, 'RelayDeferrableFragmentsTransform: Cannot defer %s with arguments.', spread.name);
  // The deferrable fragment spread is replaced with two nested inline
  // fragments. The outer of which ensures the type condition of the original
  // fragment applies, while the inner specfically conditions on Node, so
  // id may be safely queried. This is a conservative application known to
  // always be safe, however the "FlattenTransform" may remove these if they
  // are unnecessary.
  //
  // The metadata and directives of the deferrable fragment spread are
  // transferred to the deferrable id field.
  return {
    kind: 'InlineFragment',
    metadata: null,
    typeCondition: fragmentType,
    directives: [],
    selections: [{
      kind: 'InlineFragment',
      metadata: null,
      typeCondition: nodeType,
      directives: [],
      selections: [deferrableFragmentSpread(spread, idType)]
    }]
  };
}

// Utility function for creating an operation from a deferrable fragment.
function createDeferrableOperation(context, fragment) {
  var schema = context.clientSchema;
  var queryType = schema.getQueryType();
  require('fbjs/lib/invariant')(queryType, 'RelayDeferrableFragmentTransform: "Query" must be a defined type');
  var nodeField = queryType.getFields().node;
  require('fbjs/lib/invariant')(nodeField, 'RelayDeferrableFragmentTransform: "Query" must define the field "node"');
  var idArg = nodeField.args.find(function (arg) {
    return arg.name === 'id';
  });
  require('fbjs/lib/invariant')(idArg && isInputType(idArg.type), 'RelayDeferrableFragmentTransform: "node" field must define the argument "id"');
  var idType = idArg.type;
  return {
    kind: 'Root',
    operation: 'query',
    metadata: { deferred: true },
    name: fragment.name + '_Deferrable',
    dependentRequests: [],
    argumentDefinitions: [{
      kind: 'LocalArgumentDefinition',
      metadata: null,
      name: DEFERRABLE_ARGUMENT_NAME,
      defaultValue: null,
      type: idType
    }],
    directives: [],
    selections: [{
      kind: 'LinkedField',
      name: 'node',
      alias: null,
      args: [{
        kind: 'Argument',
        name: 'id',
        metadata: null,
        value: {
          kind: 'Variable',
          variableName: DEFERRABLE_ARGUMENT_NAME,
          metadata: null,
          type: idType
        },
        type: idType
      }],
      directives: [],
      metadata: null,
      handles: null,
      selections: [{
        kind: 'FragmentSpread',
        args: [],
        name: fragment.name,
        metadata: null,
        directives: []
      }],
      type: nodeField.type
    }],
    type: queryType
  };
}

function deferrableAlias(name) {
  return name + '_' + DEFERRABLE_ARGUMENT_NAME;
}

function deferrableFragmentSpread(spread, idType) {
  return {
    kind: 'DeferrableFragmentSpread',
    name: spread.name,
    directives: [],
    fragmentArgs: spread.args,
    args: [{
      kind: 'Argument',
      name: DEFERRABLE_ARGUMENT_NAME,
      metadata: null,
      value: {
        kind: 'Variable',
        variableName: DEFERRABLE_ARGUMENT_NAME,
        metadata: null,
        type: idType
      },
      type: idType
    }],
    rootFieldVariable: DEFERRABLE_ARGUMENT_NAME,
    storageKey: 'id',
    alias: deferrableAlias(spread.name)
  };
}

function getNodeType(schema) {
  var nodeType = schema.getType('Node');
  require('fbjs/lib/invariant')(nodeType instanceof GraphQLInterfaceType, 'RelayDeferrableFragmentTransform: Schema must define the interface "Node".');
  return nodeType;
}

function getIdType(schema) {
  var nodeType = getNodeType(schema);
  var idField = nodeType.getFields().id;
  require('fbjs/lib/invariant')(idField, 'RelayDeferrableFragmentTransform: "Node" must define the field "id"');
  var idType = getNamedType(idField.type);
  require('fbjs/lib/invariant')(isInputType(idType), 'RelayDeferrableFragmentTransform: "Node" must define the scalar field "id"');
  return idType;
}

module.exports = {
  transformOperations: transformOperations,
  transformSpreads: transformSpreads
};