/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayFlowBabelFactories
 * 
 * @format
 */

'use strict';

/**
 * type NAME = any;
 */
function anyTypeAlias(name) {
  return require('babel-types').typeAlias(require('babel-types').identifier(name), null, require('babel-types').anyTypeAnnotation());
}

/**
 * {|
 *   PROPS
 * |}
 */
function exactObjectTypeAnnotation(props) {
  var typeAnnotation = require('babel-types').objectTypeAnnotation(props);
  typeAnnotation.exact = true;
  return typeAnnotation;
}

/**
 * export type NAME = TYPE
 */
function exportType(name, type) {
  return require('babel-types').exportNamedDeclaration(require('babel-types').typeAlias(require('babel-types').identifier(name), null, type), [], null);
}

/**
 * import type {NAMES[0], NAMES[1], ...} from 'MODULE';
 */
function importTypes(names, module) {
  var importDeclaration = require('babel-types').importDeclaration(names.map(function (name) {
    return require('babel-types').importSpecifier(require('babel-types').identifier(name), require('babel-types').identifier(name));
  }), require('babel-types').stringLiteral(module));
  importDeclaration.importKind = 'type';
  return importDeclaration;
}

/**
 * Create an intersection type if needed.
 *
 * TYPES[0] & TYPES[1] & ...
 */
function intersectionTypeAnnotation(types) {
  require('fbjs/lib/invariant')(types.length > 0, 'RelayFlowBabelFactories: cannot create an intersection of 0 types');
  return types.length === 1 ? types[0] : require('babel-types').intersectionTypeAnnotation(types);
}

function lineComments() {
  for (var _len = arguments.length, lines = Array(_len), _key = 0; _key < _len; _key++) {
    lines[_key] = arguments[_key];
  }

  return lines.map(function (line) {
    return { type: 'CommentLine', value: ' ' + line };
  });
}

/**
 * $ReadOnlyArray<TYPE>
 */
function readOnlyArrayOfType(thing) {
  return require('babel-types').genericTypeAnnotation(require('babel-types').identifier('$ReadOnlyArray'), require('babel-types').typeParameterInstantiation([thing]));
}

/**
 * +KEY: VALUE
 */
function readOnlyObjectTypeProperty(key, value) {
  var prop = require('babel-types').objectTypeProperty(require('babel-types').identifier(key), value);
  prop.variance = 'plus';
  return prop;
}

function stringLiteralTypeAnnotation(value) {
  var annotation = require('babel-types').stringLiteralTypeAnnotation();
  annotation.value = value;
  return annotation;
}

/**
 * Create a union type if needed.
 *
 * TYPES[0] | TYPES[1] | ...
 */
function unionTypeAnnotation(types) {
  require('fbjs/lib/invariant')(types.length > 0, 'RelayFlowBabelFactories: cannot create a union of 0 types');
  return types.length === 1 ? types[0] : require('babel-types').unionTypeAnnotation(types);
}

module.exports = {
  anyTypeAlias: anyTypeAlias,
  exactObjectTypeAnnotation: exactObjectTypeAnnotation,
  exportType: exportType,
  importTypes: importTypes,
  intersectionTypeAnnotation: intersectionTypeAnnotation,
  lineComments: lineComments,
  readOnlyArrayOfType: readOnlyArrayOfType,
  readOnlyObjectTypeProperty: readOnlyObjectTypeProperty,
  stringLiteralTypeAnnotation: stringLiteralTypeAnnotation,
  unionTypeAnnotation: unionTypeAnnotation
};