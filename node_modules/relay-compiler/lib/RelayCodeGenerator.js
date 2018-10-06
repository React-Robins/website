/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayCodeGenerator
 * 
 * @format
 */

'use strict';

var _require = require('relay-runtime'),
    getStorageKey = _require.getStorageKey;
// TODO T21875029 ../../relay-runtime/util/stableCopy


var _require2 = require('graphql'),
    GraphQLList = _require2.GraphQLList;

var _require3 = require('./GraphQLCompilerPublic'),
    IRVisitor = _require3.IRVisitor,
    SchemaUtils = _require3.SchemaUtils;

// TODO T21875029 ../../relay-runtime/util/RelayConcreteNode


var getRawType = SchemaUtils.getRawType,
    isAbstractType = SchemaUtils.isAbstractType,
    getNullableType = SchemaUtils.getNullableType;


/**
 * @public
 *
 * Converts a GraphQLIR node into a plain JS object representation that can be
 * used at runtime.
 */
function generate(node) {
  require('fbjs/lib/invariant')(['Batch', 'Fragment'].indexOf(node.kind) >= 0, 'RelayCodeGenerator: Unknown AST kind `%s`. Source: %s.', node.kind, getErrorMessage(node));
  return IRVisitor.visit(node, RelayCodeGenVisitor);
}

var RelayCodeGenVisitor = {
  leave: {
    Batch: function Batch(node) {
      require('fbjs/lib/invariant')(node.requests.length !== 0, 'Batch must contain Requests.');
      if (isSingleRequest(node)) {
        var request = node.requests[0];
        return {
          kind: 'Request',
          operationKind: request.root.operation,
          name: node.name,
          id: request.id,
          text: request.text,
          metadata: node.metadata,
          fragment: node.fragment,
          operation: {
            kind: 'Operation',
            name: request.root.name,
            argumentDefinitions: request.root.argumentDefinitions,
            selections: flattenArray(request.root.selections)
          }
        };
      } else {
        return {
          kind: 'BatchRequest',
          operationKind: node.requests[0].root.operation,
          name: node.name,
          metadata: node.metadata,
          fragment: node.fragment,
          requests: node.requests.map(function (request) {
            var isDeferrableFragment = request.metadata && request.metadata.deferrable;
            var operation = isDeferrableFragment ? {
              kind: 'DeferrableOperation',
              name: request.root.name,
              argumentDefinitions: request.root.argumentDefinitions,
              selections: flattenArray(request.root.selections),
              fragmentName: request.metadata.fragmentName,
              rootFieldVariable: request.metadata.rootFieldVariable
            } : {
              kind: 'Operation',
              name: request.root.name,
              argumentDefinitions: request.root.argumentDefinitions,
              selections: flattenArray(request.root.selections)
            };

            return {
              name: request.name,
              id: request.id,
              text: request.text,
              argumentDependencies: request.argumentDependencies.map(function (dependency) {
                return {
                  name: dependency.argumentName,
                  fromRequestName: dependency.fromName,
                  fromRequestPath: dependency.fromPath,
                  ifList: dependency.ifList,
                  ifNull: dependency.ifNull,
                  maxRecurse: dependency.maxRecurse
                };
              }),
              operation: operation
            };
          })
        };
      }
    },
    Fragment: function Fragment(node) {
      return {
        kind: 'Fragment',
        name: node.name,
        type: node.type.toString(),
        metadata: node.metadata || null,
        argumentDefinitions: node.argumentDefinitions,
        selections: flattenArray(node.selections)
      };
    },
    LocalArgumentDefinition: function LocalArgumentDefinition(node) {
      return {
        kind: 'LocalArgument',
        name: node.name,
        type: node.type.toString(),
        defaultValue: node.defaultValue
      };
    },
    RootArgumentDefinition: function RootArgumentDefinition(node) {
      return {
        kind: 'RootArgument',
        name: node.name,
        type: node.type ? node.type.toString() : null
      };
    },
    Condition: function Condition(node, key, parent, ancestors) {
      require('fbjs/lib/invariant')(node.condition.kind === 'Variable', 'RelayCodeGenerator: Expected static `Condition` node to be ' + 'pruned or inlined. Source: %s.', getErrorMessage(ancestors[0]));
      return {
        kind: 'Condition',
        passingValue: node.passingValue,
        condition: node.condition.variableName,
        selections: flattenArray(node.selections)
      };
    },
    FragmentSpread: function FragmentSpread(node) {
      return {
        kind: 'FragmentSpread',
        name: node.name,
        args: valuesOrNull(sortByName(node.args))
      };
    },
    DeferrableFragmentSpread: function DeferrableFragmentSpread(node) {
      return {
        kind: 'DeferrableFragmentSpread',
        name: node.name,
        args: node.args,
        rootFieldVariable: node.rootFieldVariable,
        storageKey: node.storageKey
      };
    },
    InlineFragment: function InlineFragment(node) {
      return {
        kind: 'InlineFragment',
        type: node.typeCondition.toString(),
        selections: flattenArray(node.selections)
      };
    },
    LinkedField: function LinkedField(node) {
      // Note: it is important that the arguments of this field be sorted to
      // ensure stable generation of storage keys for equivalent arguments
      // which may have originally appeared in different orders across an app.
      var handles = node.handles && node.handles.map(function (handle) {
        return {
          kind: 'LinkedHandle',
          alias: node.alias,
          name: node.name,
          args: valuesOrNull(sortByName(node.args)),
          handle: handle.name,
          key: handle.key,
          filters: handle.filters
        };
      }) || [];
      var type = getRawType(node.type);
      var field = {
        kind: 'LinkedField',
        alias: node.alias,
        name: node.name,
        storageKey: null,
        args: valuesOrNull(sortByName(node.args)),
        concreteType: !isAbstractType(type) ? type.toString() : null,
        plural: isPlural(node.type),
        selections: flattenArray(node.selections)
      };
      // Precompute storageKey if possible
      field.storageKey = getStaticStorageKey(field);
      return [field].concat(handles);
    },
    ScalarField: function ScalarField(node) {
      // Note: it is important that the arguments of this field be sorted to
      // ensure stable generation of storage keys for equivalent arguments
      // which may have originally appeared in different orders across an app.
      var handles = node.handles && node.handles.map(function (handle) {
        return {
          kind: 'ScalarHandle',
          alias: node.alias,
          name: node.name,
          args: valuesOrNull(sortByName(node.args)),
          handle: handle.name,
          key: handle.key,
          filters: handle.filters
        };
      }) || [];
      var field = {
        kind: 'ScalarField',
        alias: node.alias,
        name: node.name,
        args: valuesOrNull(sortByName(node.args)),
        selections: valuesOrUndefined(flattenArray(node.selections)),
        storageKey: null
      };
      // Precompute storageKey if possible
      field.storageKey = getStaticStorageKey(field);
      return [field].concat(handles);
    },
    Variable: function Variable(node, key, parent) {
      return {
        kind: 'Variable',
        name: parent.name,
        variableName: node.variableName,
        type: parent.type ? parent.type.toString() : null
      };
    },
    Literal: function Literal(node, key, parent) {
      return {
        kind: 'Literal',
        name: parent.name,
        value: require('./stableCopy')(node.value),
        type: parent.type ? parent.type.toString() : null
      };
    },
    Argument: function Argument(node, key, parent, ancestors) {
      require('fbjs/lib/invariant')(['Variable', 'Literal'].indexOf(node.value.kind) >= 0, 'RelayCodeGenerator: Complex argument values (Lists or ' + 'InputObjects with nested variables) are not supported, argument ' + '`%s` had value `%s`. Source: %s.', node.name, JSON.stringify(node.value, null, 2), getErrorMessage(ancestors[0]));
      return node.value.value !== null ? node.value : null;
    }
  }
};

function isSingleRequest(batch) {
  return batch.requests.length === 1 && batch.requests[0].argumentDependencies.length === 0;
}

function isPlural(type) {
  return getNullableType(type) instanceof GraphQLList;
}

function valuesOrUndefined(array) {
  return !array || array.length === 0 ? undefined : array;
}

function valuesOrNull(array) {
  return !array || array.length === 0 ? null : array;
}

function flattenArray(array) {
  return array ? Array.prototype.concat.apply([], array) : [];
}

function sortByName(array) {
  return array instanceof Array ? array.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }) : array;
}

function getErrorMessage(node) {
  return 'document ' + node.name;
}

/**
 * Pre-computes storage key if possible and advantageous. Storage keys are
 * generated for fields with supplied arguments that are all statically known
 * (ie. literals, no variables) at build time.
 */
function getStaticStorageKey(field) {
  if (!field.args || field.args.length === 0 || field.args.some(function (arg) {
    return arg.kind !== 'Literal';
  })) {
    return null;
  }
  return getStorageKey(field, {});
}

module.exports = { generate: generate };