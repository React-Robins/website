/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayFlowTypeTransformers
 * 
 * @format
 */

'use strict';

var _require = require('./RelayFlowBabelFactories'),
    readOnlyArrayOfType = _require.readOnlyArrayOfType;

var _require2 = require('graphql'),
    GraphQLEnumType = _require2.GraphQLEnumType,
    GraphQLInputType = _require2.GraphQLInputType,
    GraphQLInputObjectType = _require2.GraphQLInputObjectType,
    GraphQLInterfaceType = _require2.GraphQLInterfaceType,
    GraphQLList = _require2.GraphQLList,
    GraphQLNonNull = _require2.GraphQLNonNull,
    GraphQLObjectType = _require2.GraphQLObjectType,
    GraphQLScalarType = _require2.GraphQLScalarType,
    GraphQLType = _require2.GraphQLType,
    GraphQLUnionType = _require2.GraphQLUnionType;

function transformScalarType(type, state, objectProps) {
  if (type instanceof GraphQLNonNull) {
    return transformNonNullableScalarType(type.ofType, state, objectProps);
  } else {
    return require('babel-types').nullableTypeAnnotation(transformNonNullableScalarType(type, state, objectProps));
  }
}

function transformNonNullableScalarType(type, state, objectProps) {
  if (type instanceof GraphQLList) {
    return readOnlyArrayOfType(transformScalarType(type.ofType, state, objectProps));
  } else if (type instanceof GraphQLObjectType || type instanceof GraphQLUnionType || type instanceof GraphQLInterfaceType) {
    return objectProps;
  } else if (type instanceof GraphQLScalarType) {
    return transformGraphQLScalarType(type, state);
  } else if (type instanceof GraphQLEnumType) {
    return transformGraphQLEnumType(type, state);
  } else {
    throw new Error('Could not convert from GraphQL type ' + type.toString());
  }
}

function transformGraphQLScalarType(type, state) {
  switch (state.customScalars[type.name] || type.name) {
    case 'ID':
    case 'String':
    case 'Url':
      return require('babel-types').stringTypeAnnotation();
    case 'Float':
    case 'Int':
      return require('babel-types').numberTypeAnnotation();
    case 'Boolean':
      return require('babel-types').booleanTypeAnnotation();
    default:
      return require('babel-types').anyTypeAnnotation();
  }
}

function transformGraphQLEnumType(type, state) {
  state.usedEnums[type.name] = type;
  return require('babel-types').genericTypeAnnotation(require('babel-types').identifier(type.name));
}

function transformInputType(type, state) {
  if (type instanceof GraphQLNonNull) {
    return transformNonNullableInputType(type.ofType, state);
  } else {
    return require('babel-types').nullableTypeAnnotation(transformNonNullableInputType(type, state));
  }
}

function transformNonNullableInputType(type, state) {
  if (type instanceof GraphQLList) {
    return readOnlyArrayOfType(transformInputType(type.ofType, state));
  } else if (type instanceof GraphQLScalarType) {
    return transformGraphQLScalarType(type, state);
  } else if (type instanceof GraphQLEnumType) {
    return transformGraphQLEnumType(type, state);
  } else if (type instanceof GraphQLInputObjectType) {
    var fields = type.getFields();
    var props = Object.keys(fields).map(function (key) {
      return fields[key];
    }).filter(function (field) {
      return state.inputFieldWhiteList.indexOf(field.name) < 0;
    }).map(function (field) {
      var property = require('babel-types').objectTypeProperty(require('babel-types').identifier(field.name), transformInputType(field.type, state));
      if (!(field.type instanceof GraphQLNonNull)) {
        property.optional = true;
      }
      return property;
    });
    return require('babel-types').objectTypeAnnotation(props);
  } else {
    throw new Error('Could not convert from GraphQL type ' + type.toString());
  }
}

module.exports = {
  transformInputType: transformInputType,
  transformScalarType: transformScalarType
};