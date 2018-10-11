'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationsMustHaveNames = OperationsMustHaveNames;
exports.RequiredFields = RequiredFields;
exports.typeNamesShouldBeCapitalized = typeNamesShouldBeCapitalized;
exports.noDeprecatedFields = noDeprecatedFields;

var _graphql = require('graphql');

function OperationsMustHaveNames(context) {
  return {
    OperationDefinition: function OperationDefinition(node) {
      if (!node.name) {
        context.reportError(new _graphql.GraphQLError("All operations must be named", [node]));
      }
    }
  };
}

function getFieldWasRequestedOnNode(node, field) {
  var recursing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return node.selectionSet.selections.some(function (n) {
    // If it's an inline fragment, we need to look deeper
    if (n.kind === 'InlineFragment' && !recursing) {
      return getFieldWasRequestedOnNode(n, field, true);
    }
    if (n.kind === 'FragmentSpread') {
      // We don't know if the field was requested in this case, so default to not erroring.
      return true;
    }
    return n.name.value === field;
  });
}

function RequiredFields(context, options) {
  return {
    Field: function Field(node) {
      var def = context.getFieldDef();
      if (!def) {
        return;
      }
      var requiredFields = options.requiredFields;

      requiredFields.forEach(function (field) {
        var fieldAvaliableOnType = def.type && def.type._fields && def.type._fields[field];

        function recursivelyCheckOnType(ofType, field) {
          return ofType._fields && ofType._fields[field] || ofType.ofType && recursivelyCheckOnType(ofType.ofType, field);
        }

        var fieldAvaliableOnOfType = false;
        if (def.type && def.type.ofType) {
          fieldAvaliableOnOfType = recursivelyCheckOnType(def.type.ofType, field);
        }
        if (fieldAvaliableOnType || fieldAvaliableOnOfType) {
          var fieldWasRequested = getFieldWasRequestedOnNode(node, field);
          if (!fieldWasRequested) {
            context.reportError(new _graphql.GraphQLError('\'' + field + '\' field required on \'' + node.name.value + '\'', [node]));
          }
        }
      });
    }
  };
}

function typeNamesShouldBeCapitalized(context) {
  return {
    NamedType: function NamedType(node) {
      var typeName = node.name.value;
      if (typeName[0] == typeName[0].toLowerCase()) {
        context.reportError(new _graphql.GraphQLError("All type names should start with a capital letter", [node]));
      }
    }
  };
}

// Mostly taken from https://github.com/graphql/graphql-js/blob/063148de039b02670a760b8d3dfaf2a04a467169/src/utilities/findDeprecatedUsages.js
// See explanation in [#93](https://github.com/apollographql/eslint-plugin-graphql/pull/93)
function noDeprecatedFields(context) {
  return {
    Field: function Field(node) {
      var fieldDef = context.getFieldDef();
      if (fieldDef && fieldDef.isDeprecated) {
        var parentType = context.getParentType();
        if (parentType) {
          var reason = fieldDef.deprecationReason;
          context.reportError(new _graphql.GraphQLError('The field ' + parentType.name + '.' + fieldDef.name + ' is deprecated.' + (reason ? ' ' + reason : ''), [node]));
        }
      }
    },
    EnumValue: function EnumValue(node) {
      // context is of type ValidationContext which doesn't export getEnumValue.
      // Bypass the public API to grab that information directly from _typeInfo.
      var enumVal = context._typeInfo.getEnumValue();
      if (enumVal && enumVal.isDeprecated) {
        var type = (0, _graphql.getNamedType)(context.getInputType());
        if (type) {
          var reason = enumVal.deprecationReason;
          context.reportError(new _graphql.GraphQLError('The enum value ' + type.name + '.' + enumVal.name + ' is deprecated.' + (reason ? ' ' + reason : ''), [node]));
        }
      }
    }
  };
}