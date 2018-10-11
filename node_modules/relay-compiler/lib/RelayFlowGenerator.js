/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayFlowGenerator
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./RelayFlowBabelFactories'),
    anyTypeAlias = _require.anyTypeAlias,
    exactObjectTypeAnnotation = _require.exactObjectTypeAnnotation,
    exportType = _require.exportType,
    importTypes = _require.importTypes,
    intersectionTypeAnnotation = _require.intersectionTypeAnnotation,
    lineComments = _require.lineComments,
    readOnlyArrayOfType = _require.readOnlyArrayOfType,
    readOnlyObjectTypeProperty = _require.readOnlyObjectTypeProperty,
    stringLiteralTypeAnnotation = _require.stringLiteralTypeAnnotation,
    unionTypeAnnotation = _require.unionTypeAnnotation;

var _require2 = require('./RelayFlowTypeTransformers'),
    transformScalarType = _require2.transformScalarType,
    transformInputType = _require2.transformInputType;

var _require3 = require('graphql'),
    GraphQLNonNull = _require3.GraphQLNonNull;

var _require4 = require('./GraphQLCompilerPublic'),
    FlattenTransform = _require4.FlattenTransform,
    IRVisitor = _require4.IRVisitor,
    Profiler = _require4.Profiler,
    SchemaUtils = _require4.SchemaUtils;

var isAbstractType = SchemaUtils.isAbstractType;


function generate(node, options) {
  var ast = IRVisitor.visit(node, createVisitor(options));
  return require('./PatchedBabelGenerator').generate(ast);
}

function makeProp(_ref, state, concreteType) {
  var key = _ref.key,
      schemaName = _ref.schemaName,
      value = _ref.value,
      conditional = _ref.conditional,
      nodeType = _ref.nodeType,
      nodeSelections = _ref.nodeSelections;

  if (nodeType) {
    value = transformScalarType(nodeType, state, selectionsToBabel([Array.from(require('fbjs/lib/nullthrows')(nodeSelections).values())], state));
  }
  if (schemaName === '__typename' && concreteType) {
    value = stringLiteralTypeAnnotation(concreteType);
  }
  var typeProperty = readOnlyObjectTypeProperty(key, value);
  if (conditional) {
    typeProperty.optional = true;
  }
  return typeProperty;
}

var isTypenameSelection = function isTypenameSelection(selection) {
  return selection.schemaName === '__typename';
};
var hasTypenameSelection = function hasTypenameSelection(selections) {
  return selections.some(isTypenameSelection);
};
var onlySelectsTypename = function onlySelectsTypename(selections) {
  return selections.every(isTypenameSelection);
};

function selectionsToBabel(selections, state, refTypeName) {
  var baseFields = new Map();
  var byConcreteType = {};

  flattenArray(selections).forEach(function (selection) {
    var concreteType = selection.concreteType;

    if (concreteType) {
      byConcreteType[concreteType] = byConcreteType[concreteType] || [];
      byConcreteType[concreteType].push(selection);
    } else {
      var previousSel = baseFields.get(selection.key);

      baseFields.set(selection.key, previousSel ? mergeSelection(selection, previousSel) : selection);
    }
  });

  var types = [];

  if (Object.keys(byConcreteType).length && onlySelectsTypename(Array.from(baseFields.values())) && (hasTypenameSelection(Array.from(baseFields.values())) || Object.keys(byConcreteType).every(function (type) {
    return hasTypenameSelection(byConcreteType[type]);
  }))) {
    var _loop = function _loop(_concreteType) {
      types.push(groupRefs([].concat((0, _toConsumableArray3['default'])(Array.from(baseFields.values())), (0, _toConsumableArray3['default'])(byConcreteType[_concreteType]))).map(function (selection) {
        return makeProp(selection, state, _concreteType);
      }));
    };

    for (var _concreteType in byConcreteType) {
      _loop(_concreteType);
    }
    // It might be some other type then the listed concrete types. Ideally, we
    // would set the type to diff(string, set of listed concrete types), but
    // this doesn't exist in Flow at the time.
    var otherProp = readOnlyObjectTypeProperty('__typename', stringLiteralTypeAnnotation('%other'));
    otherProp.leadingComments = lineComments("This will never be '%other', but we need some", 'value in case none of the concrete values match.');
    types.push([otherProp]);
  } else {
    var selectionMap = selectionsToMap(Array.from(baseFields.values()));
    for (var _concreteType2 in byConcreteType) {
      selectionMap = mergeSelections(selectionMap, selectionsToMap(byConcreteType[_concreteType2].map(function (sel) {
        return (0, _extends3['default'])({}, sel, {
          conditional: true
        });
      })));
    }
    var selectionMapValues = groupRefs(Array.from(selectionMap.values())).map(function (sel) {
      return isTypenameSelection(sel) && sel.concreteType ? makeProp((0, _extends3['default'])({}, sel, { conditional: false }), state, sel.concreteType) : makeProp(sel, state);
    });
    types.push(selectionMapValues);
  }

  return unionTypeAnnotation(types.map(function (props) {
    if (refTypeName) {
      props.push(readOnlyObjectTypeProperty('$refType', require('babel-types').identifier(refTypeName)));
    }
    return exactObjectTypeAnnotation(props);
  }));
}

function mergeSelection(a, b) {
  if (!a) {
    return (0, _extends3['default'])({}, b, {
      conditional: true
    });
  }
  return (0, _extends3['default'])({}, a, {
    nodeSelections: a.nodeSelections ? mergeSelections(a.nodeSelections, require('fbjs/lib/nullthrows')(b.nodeSelections)) : null,
    conditional: a.conditional && b.conditional
  });
}

function mergeSelections(a, b) {
  var merged = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = a.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          _key = _step$value[0],
          _value = _step$value[1];

      merged.set(_key, _value);
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = b.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _step2.value,
          _key2 = _step2$value[0],
          _value2 = _step2$value[1];

      merged.set(_key2, mergeSelection(a.get(_key2), _value2));
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

  return merged;
}

function isPlural(node) {
  return Boolean(node.metadata && node.metadata.plural);
}

function createVisitor(options) {
  var state = {
    customScalars: options.customScalars,
    enumsHasteModule: options.enumsHasteModule,
    existingFragmentNames: options.existingFragmentNames,
    generatedFragments: new Set(),
    inputFieldWhiteList: options.inputFieldWhiteList,
    relayRuntimeModule: options.relayRuntimeModule,
    usedEnums: {},
    usedFragments: new Set(),
    useHaste: options.useHaste
  };

  return {
    leave: {
      Root: function Root(node) {
        var inputVariablesType = generateInputVariablesType(node, state);
        var responseType = exportType(node.name + 'Response', selectionsToBabel(node.selections, state));
        return require('babel-types').program([].concat((0, _toConsumableArray3['default'])(getFragmentImports(state)), (0, _toConsumableArray3['default'])(getEnumDefinitions(state)), [inputVariablesType, responseType]));
      },
      Fragment: function Fragment(node) {
        var selections = flattenArray(node.selections);
        var numConecreteSelections = selections.filter(function (s) {
          return s.concreteType;
        }).length;
        selections = selections.map(function (selection) {
          if (numConecreteSelections <= 1 && isTypenameSelection(selection) && !isAbstractType(node.type)) {
            return [(0, _extends3['default'])({}, selection, {
              concreteType: node.type.toString()
            })];
          }
          return [selection];
        });
        state.generatedFragments.add(node.name);
        var refTypeName = getRefTypeName(node.name);
        var refType = require('babel-types').expressionStatement(require('babel-types').identifier('declare export opaque type ' + refTypeName + ': FragmentReference'));
        var baseType = selectionsToBabel(selections, state, refTypeName);
        var type = isPlural(node) ? readOnlyArrayOfType(baseType) : baseType;
        return require('babel-types').program([].concat((0, _toConsumableArray3['default'])(getFragmentImports(state)), (0, _toConsumableArray3['default'])(getEnumDefinitions(state)), [importTypes(['FragmentReference'], state.relayRuntimeModule), refType, exportType(node.name, type)]));
      },
      InlineFragment: function InlineFragment(node) {
        var typeCondition = node.typeCondition;
        return flattenArray(node.selections).map(function (typeSelection) {
          return isAbstractType(typeCondition) ? (0, _extends3['default'])({}, typeSelection, {
            conditional: true
          }) : (0, _extends3['default'])({}, typeSelection, {
            concreteType: typeCondition.toString()
          });
        });
      },
      Condition: function Condition(node) {
        return flattenArray(node.selections).map(function (selection) {
          return (0, _extends3['default'])({}, selection, {
            conditional: true
          });
        });
      },
      ScalarField: function ScalarField(node) {
        return [{
          key: node.alias || node.name,
          schemaName: node.name,
          value: transformScalarType(node.type, state)
        }];
      },
      LinkedField: function LinkedField(node) {
        return [{
          key: node.alias || node.name,
          schemaName: node.name,
          nodeType: node.type,
          nodeSelections: selectionsToMap(flattenArray(node.selections))
        }];
      },
      FragmentSpread: function FragmentSpread(node) {
        state.usedFragments.add(node.name);
        return [{
          key: '__fragments_' + node.name,
          ref: node.name
        }];
      }
    }
  };
}

function selectionsToMap(selections) {
  var map = new Map();
  selections.forEach(function (selection) {
    var previousSel = map.get(selection.key);
    map.set(selection.key, previousSel ? mergeSelection(previousSel, selection) : selection);
  });
  return map;
}

function flattenArray(arrayOfArrays) {
  var result = [];
  arrayOfArrays.forEach(function (array) {
    return result.push.apply(result, (0, _toConsumableArray3['default'])(array));
  });
  return result;
}

function generateInputVariablesType(node, state) {
  return exportType(node.name + 'Variables', exactObjectTypeAnnotation(node.argumentDefinitions.map(function (arg) {
    var property = require('babel-types').objectTypeProperty(require('babel-types').identifier(arg.name), transformInputType(arg.type, state));
    if (!(arg.type instanceof GraphQLNonNull)) {
      property.optional = true;
    }
    return property;
  })));
}

function groupRefs(props) {
  var result = [];
  var refs = [];
  props.forEach(function (prop) {
    if (prop.ref) {
      refs.push(prop.ref);
    } else {
      result.push(prop);
    }
  });
  if (refs.length > 0) {
    var _value3 = intersectionTypeAnnotation(refs.map(function (ref) {
      return require('babel-types').identifier(getRefTypeName(ref));
    }));
    result.push({
      key: '$fragmentRefs',
      conditional: false,
      value: _value3
    });
  }
  return result;
}

function getFragmentImports(state) {
  var imports = [];
  if (state.usedFragments.size > 0) {
    var _usedFragments = Array.from(state.usedFragments).sort();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _usedFragments[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var usedFragment = _step3.value;

        var refTypeName = getRefTypeName(usedFragment);
        if (!state.generatedFragments.has(usedFragment)) {
          if (state.useHaste && state.existingFragmentNames.has(usedFragment)) {
            // TODO(T22653277) support non-haste environments when importing
            // fragments
            imports.push(importTypes([refTypeName], usedFragment + '.graphql'));
          } else {
            imports.push(anyTypeAlias(refTypeName));
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
  }
  return imports;
}

function getEnumDefinitions(_ref2) {
  var enumsHasteModule = _ref2.enumsHasteModule,
      usedEnums = _ref2.usedEnums;

  var enumNames = Object.keys(usedEnums).sort();
  if (enumNames.length === 0) {
    return [];
  }
  if (enumsHasteModule) {
    return [importTypes(enumNames, enumsHasteModule)];
  }
  return enumNames.map(function (name) {
    var values = usedEnums[name].getValues().map(function (_ref3) {
      var value = _ref3.value;
      return value;
    });
    values.sort();
    values.push('%future added value');
    return exportType(name, require('babel-types').unionTypeAnnotation(values.map(function (value) {
      return stringLiteralTypeAnnotation(value);
    })));
  });
}

function getRefTypeName(name) {
  return name + '$ref';
}

var FLOW_TRANSFORMS = [require('./RelayRelayDirectiveTransform').transform, require('./RelayMaskTransform').transform, FlattenTransform.transformWithOptions({})];

module.exports = {
  generate: Profiler.instrument(generate, 'RelayFlowGenerator.generate'),
  flowTransforms: FLOW_TRANSFORMS
};