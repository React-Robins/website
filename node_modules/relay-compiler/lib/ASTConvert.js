/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ASTConvert
 * 
 * @format
 */

'use strict';

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLSchemaUtils'),
    isExecutableDefinitionAST = _require.isExecutableDefinitionAST,
    isSchemaDefinitionAST = _require.isSchemaDefinitionAST;

var _require2 = require('graphql'),
    extendSchema = _require2.extendSchema,
    parse = _require2.parse,
    visit = _require2.visit;

function convertASTDocuments(schema, documents, validationRules, transform) {
  return require('./GraphQLCompilerProfiler').run('ASTConvert.convertASTDocuments', function () {
    var definitions = definitionsFromDocuments(documents);

    var astDefinitions = [];
    documents.forEach(function (doc) {
      doc.definitions.forEach(function (definition) {
        if (isExecutableDefinitionAST(definition)) {
          astDefinitions.push(definition);
        }
      });
    });

    return convertASTDefinitions(schema, definitions, validationRules, transform);
  });
}

function convertASTDocumentsWithBase(schema, baseDocuments, documents, validationRules, transform) {
  return require('./GraphQLCompilerProfiler').run('ASTConvert.convertASTDocumentsWithBase', function () {
    var baseDefinitions = definitionsFromDocuments(baseDocuments);
    var definitions = definitionsFromDocuments(documents);

    var requiredDefinitions = new Map();
    var baseMap = new Map();
    baseDefinitions.forEach(function (definition) {
      if (isExecutableDefinitionAST(definition)) {
        var definitionName = definition.name && definition.name.value;
        // If there's no name, no reason to put in the map
        if (definitionName) {
          if (baseMap.has(definitionName)) {
            throw new Error('Duplicate definition of \'' + definitionName + '\'.');
          }
          baseMap.set(definitionName, definition);
        }
      }
    });

    var definitionsToVisit = [];
    definitions.forEach(function (definition) {
      if (isExecutableDefinitionAST(definition)) {
        definitionsToVisit.push(definition);
      }
    });
    while (definitionsToVisit.length > 0) {
      var _definition = definitionsToVisit.pop();
      var name = _definition.name && _definition.name.value;
      if (!name) {
        continue;
      }
      if (requiredDefinitions.has(name)) {
        if (requiredDefinitions.get(name) !== _definition) {
          throw new Error('Duplicate definition of \'' + name + '\'.');
        }
        continue;
      }
      requiredDefinitions.set(name, _definition);
      visit(_definition, {
        FragmentSpread: function FragmentSpread(spread) {
          var baseDefinition = baseMap.get(spread.name.value);
          if (baseDefinition) {
            // We only need to add those definitions not already included
            // in definitions
            definitionsToVisit.push(baseDefinition);
          }
        }
      });
    }

    var definitionsToConvert = [];
    requiredDefinitions.forEach(function (definition) {
      return definitionsToConvert.push(definition);
    });
    return convertASTDefinitions(schema, definitionsToConvert, validationRules, transform);
  });
}

function convertASTDefinitions(schema, definitions, validationRules, transform) {
  var operationDefinitions = [];
  definitions.forEach(function (definition) {
    if (isExecutableDefinitionAST(definition)) {
      operationDefinitions.push(definition);
    }
  });

  var validationAST = {
    kind: 'Document',
    // DocumentNode doesn't accept that a node of type
    // FragmentDefinitionNode | OperationDefinitionNode is a DefinitionNode
    definitions: operationDefinitions
  };
  // Will throw an error if there are validation issues
  require('./GraphQLValidator').validate(validationAST, schema, validationRules);
  return operationDefinitions.map(function (definition) {
    return transform(schema, definition);
  });
}

function definitionsFromDocuments(documents) {
  var definitions = [];
  documents.forEach(function (doc) {
    doc.definitions.forEach(function (definition) {
      return definitions.push(definition);
    });
  });
  return definitions;
}

function transformASTSchema(schema, schemaExtensions) {
  return require('./GraphQLCompilerProfiler').run('ASTConvert.transformASTSchema', function () {
    return schemaExtensions.length > 0 ? extendSchema(schema, parse(schemaExtensions.join('\n'))) : schema;
  });
}

function extendASTSchema(baseSchema, documents) {
  return require('./GraphQLCompilerProfiler').run('ASTConvert.extendASTSchema', function () {
    // Should be TypeSystemDefinitionNode
    var schemaExtensions = [];
    documents.forEach(function (doc) {
      schemaExtensions.push.apply(schemaExtensions, (0, _toConsumableArray3['default'])(doc.definitions.filter(isSchemaDefinitionAST)));
    });

    if (schemaExtensions.length <= 0) {
      return baseSchema;
    }

    // TODO T24511737 figure out if this is dangerous
    return extendSchema(baseSchema, {
      kind: 'Document',
      definitions: schemaExtensions
    }, { assumeValid: true });
  });
}

module.exports = {
  convertASTDocuments: convertASTDocuments,
  convertASTDocumentsWithBase: convertASTDocumentsWithBase,
  extendASTSchema: extendASTSchema,
  transformASTSchema: transformASTSchema
};