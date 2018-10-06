'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processors = exports.rules = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphql = require('graphql');

var _lodash = require('lodash');

var _graphqlConfig = require('graphql-config');

var _rules = require('./rules');

var customRules = _interopRequireWildcard(_rules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var allGraphQLValidatorNames = _graphql.specifiedRules.map(function (rule) {
  return rule.name;
});

// Map of env name to list of rule names.
var envGraphQLValidatorNames = {
  apollo: (0, _lodash.without)(allGraphQLValidatorNames, 'KnownFragmentNames', 'NoUnusedFragments'),
  lokka: (0, _lodash.without)(allGraphQLValidatorNames, 'KnownFragmentNames', 'NoUnusedFragments'),
  relay: (0, _lodash.without)(allGraphQLValidatorNames, 'KnownDirectives', 'KnownFragmentNames', 'NoUndefinedVariables', 'NoUnusedFragments', 'ProvidedNonNullArguments', 'ScalarLeafs'),
  literal: (0, _lodash.without)(allGraphQLValidatorNames, 'KnownFragmentNames', 'NoUnusedFragments')
};

var internalTag = 'ESLintPluginGraphQLFile';
var gqlFiles = ['gql', 'graphql'];

var defaultRuleProperties = {
  env: {
    enum: ['lokka', 'relay', 'apollo', 'literal']
  },
  schemaJson: {
    type: 'object'
  },
  schemaJsonFilepath: {
    type: 'string'
  },
  schemaString: {
    type: 'string'
  },
  tagName: {
    type: 'string',
    pattern: '^[$_a-zA-Z$_][a-zA-Z0-9$_]+(\\.[a-zA-Z0-9$_]+)?$'
  },
  projectName: {
    type: 'string'
  }
};

function createRule(context, optionParser) {
  var tagNames = new Set();
  var tagRules = [];
  var options = context.options.length === 0 ? [{}] : context.options;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var optionGroup = _step.value;

      var _optionParser = optionParser(optionGroup),
          schema = _optionParser.schema,
          env = _optionParser.env,
          tagName = _optionParser.tagName,
          validators = _optionParser.validators;

      var boundValidators = validators.map(function (v) {
        return function (ctx) {
          return v(ctx, optionGroup);
        };
      });
      if (tagNames.has(tagName)) {
        throw new Error('Multiple options for GraphQL tag ' + tagName);
      }
      tagNames.add(tagName);
      tagRules.push({ schema: schema, env: env, tagName: tagName, validators: boundValidators });
    };

    for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    TaggedTemplateExpression: function TaggedTemplateExpression(node) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tagRules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref2 = _step2.value;
          var schema = _ref2.schema,
              env = _ref2.env,
              tagName = _ref2.tagName,
              validators = _ref2.validators;

          if (templateExpressionMatchesTag(tagName, node)) {
            return handleTemplateTag(node, context, schema, env, validators);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  };
}

// schemaJson, schemaJsonFilepath, schemaString and projectName are mutually exclusive:
var schemaPropsExclusiveness = {
  oneOf: [{
    required: ['schemaJson'],
    not: { required: ['schemaString', 'schemaJsonFilepath', 'projectName'] }
  }, {
    required: ['schemaJsonFilepath'],
    not: { required: ['schemaJson', 'schemaString', 'projectName'] }
  }, {
    required: ['schemaString'],
    not: { required: ['schemaJson', 'schemaJsonFilepath', 'projectName'] }
  }, {
    not: {
      anyOf: [{ required: ['schemaString'] }, { required: ['schemaJson'] }, { required: ['schemaJsonFilepath'] }]
    }
  }]
};

var rules = exports.rules = {
  'template-strings': {
    meta: {
      schema: {
        type: 'array',
        items: _extends({
          additionalProperties: false,
          properties: _extends({}, defaultRuleProperties, {
            validators: {
              oneOf: [{
                type: 'array',
                uniqueItems: true,
                items: {
                  enum: allGraphQLValidatorNames
                }
              }, {
                enum: ['all']
              }]
            }
          })
        }, schemaPropsExclusiveness)
      }
    },
    create: function create(context) {
      return createRule(context, function (optionGroup) {
        return parseOptions(optionGroup, context);
      });
    }
  },
  'named-operations': {
    meta: {
      schema: {
        type: 'array',
        items: _extends({
          additionalProperties: false,
          properties: _extends({}, defaultRuleProperties)
        }, schemaPropsExclusiveness)
      }
    },
    create: function create(context) {
      return createRule(context, function (optionGroup) {
        return parseOptions(_extends({
          validators: ['OperationsMustHaveNames']
        }, optionGroup), context);
      });
    }
  },
  'required-fields': {
    meta: {
      schema: {
        type: 'array',
        minItems: 1,
        items: _extends({
          additionalProperties: false,
          properties: _extends({}, defaultRuleProperties, {
            requiredFields: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }),
          required: ['requiredFields']
        }, schemaPropsExclusiveness)
      }
    },
    create: function create(context) {
      return createRule(context, function (optionGroup) {
        return parseOptions(_extends({
          validators: ['RequiredFields'],
          options: { requiredFields: optionGroup.requiredFields }
        }, optionGroup), context);
      });
    }
  },
  'capitalized-type-name': {
    meta: {
      schema: {
        type: 'array',
        items: _extends({
          additionalProperties: false,
          properties: _extends({}, defaultRuleProperties)
        }, schemaPropsExclusiveness)
      }
    },
    create: function create(context) {
      return createRule(context, function (optionGroup) {
        return parseOptions(_extends({
          validators: ['typeNamesShouldBeCapitalized']
        }, optionGroup), context);
      });
    }
  },
  'no-deprecated-fields': {
    meta: {
      schema: {
        type: 'array',
        items: _extends({
          additionalProperties: false,
          properties: _extends({}, defaultRuleProperties)
        }, schemaPropsExclusiveness)
      }
    },
    create: function create(context) {
      return createRule(context, function (optionGroup) {
        return parseOptions(_extends({
          validators: ['noDeprecatedFields']
        }, optionGroup), context);
      });
    }
  }
};

var schemaCache = {};

function parseOptions(optionGroup, context) {
  var cacheHit = schemaCache[JSON.stringify(optionGroup)];
  if (cacheHit) {
    return cacheHit;
  }
  var schemaJson = optionGroup.schemaJson,
      schemaJsonFilepath = optionGroup.schemaJsonFilepath,
      schemaString = optionGroup.schemaString,
      env = optionGroup.env,
      projectName = optionGroup.projectName,
      tagNameOption = optionGroup.tagName,
      validatorNamesOption = optionGroup.validators;

  // Validate and unpack schema

  var schema = void 0;
  if (schemaJson) {
    schema = initSchema(schemaJson);
  } else if (schemaJsonFilepath) {
    schema = initSchemaFromFile(schemaJsonFilepath);
  } else if (schemaString) {
    schema = initSchemaFromString(schemaString);
  } else {
    try {
      var config = (0, _graphqlConfig.getGraphQLConfig)(_path2.default.dirname(context.getFilename()));
      var projectConfig = void 0;
      if (projectName) {
        projectConfig = config.getProjects()[projectName];
        if (!projectConfig) {
          throw new Error('Project with name "' + projectName + '" not found in ' + config.configPath + '.');
        }
      } else {
        projectConfig = config.getConfigForFile(context.getFilename());
      }
      schema = projectConfig.getSchema();
    } catch (e) {
      if (e instanceof _graphqlConfig.ConfigNotFoundError) {
        throw new Error('Must provide .graphqlconfig file or pass in `schemaJson` option ' + 'with schema object or `schemaJsonFilepath` with absolute path to the json file.');
      }
      throw e;
    }
  }

  // Validate env
  if (env && env !== 'lokka' && env !== 'relay' && env !== 'apollo' && env !== 'literal') {
    throw new Error('Invalid option for env, only `apollo`, `lokka`, `relay`, and `literal` supported.');
  }

  // Validate tagName and set default
  var tagName = void 0;
  if (tagNameOption) {
    tagName = tagNameOption;
  } else if (env === 'relay') {
    tagName = 'Relay.QL';
  } else if (env === 'literal') {
    tagName = internalTag;
  } else {
    tagName = 'gql';
  }

  // The validator list may be:
  //    The string 'all' to use all rules.
  //    An array of rule names.
  //    null/undefined to use the default rule set of the environment, or all rules.
  var validatorNames = void 0;
  if (validatorNamesOption === 'all') {
    validatorNames = allGraphQLValidatorNames;
  } else if (validatorNamesOption) {
    validatorNames = validatorNamesOption;
  } else {
    validatorNames = envGraphQLValidatorNames[env] || allGraphQLValidatorNames;
  }

  var validators = validatorNames.map(function (name) {
    if (name in customRules) {
      return customRules[name];
    } else {
      return require('graphql/validation/rules/' + name)[name];
    }
  });
  var results = { schema: schema, env: env, tagName: tagName, validators: validators };
  schemaCache[JSON.stringify(optionGroup)] = results;
  return results;
}

function initSchema(json) {
  var unpackedSchemaJson = json.data ? json.data : json;
  if (!unpackedSchemaJson.__schema) {
    throw new Error('Please pass a valid GraphQL introspection query result.');
  }
  return (0, _graphql.buildClientSchema)(unpackedSchemaJson);
}

function initSchemaFromFile(jsonFile) {
  return initSchema(JSON.parse(_fs2.default.readFileSync(jsonFile, 'utf8')));
}

function initSchemaFromString(source) {
  return (0, _graphql.buildSchema)(source);
}

function templateExpressionMatchesTag(tagName, node) {
  var tagNameSegments = tagName.split('.').length;
  if (tagNameSegments === 1) {
    // Check for single identifier, like 'gql'
    if (node.tag.type !== 'Identifier' || node.tag.name !== tagName) {
      return false;
    }
  } else if (tagNameSegments === 2) {
    // Check for dotted identifier, like 'Relay.QL'
    if (node.tag.type !== 'MemberExpression' || node.tag.object.name + '.' + node.tag.property.name !== tagName) {
      return false;
    }
  } else {
    // We don't currently support 3 segments so ignore
    return false;
  }
  return true;
}

function handleTemplateTag(node, context, schema, env, validators) {
  var text = void 0;
  try {
    text = replaceExpressions(node.quasi, context, env);
  } catch (e) {
    if (e.message !== 'Invalid interpolation') {
      console.log(e);
    }
    return;
  }

  // Re-implement syntax sugar for fragment names, which is technically not valid
  // graphql
  if ((env === 'lokka' || env === 'relay') && /fragment\s+on/.test(text)) {
    text = text.replace('fragment', 'fragment _');
  }

  var ast = void 0;

  try {
    ast = (0, _graphql.parse)(text);
  } catch (error) {
    context.report({
      node: node,
      message: error.message.split('\n')[0],
      loc: locFrom(node, error)
    });
    return;
  }

  var validationErrors = schema ? (0, _graphql.validate)(schema, ast, validators) : [];
  if (validationErrors && validationErrors.length > 0) {
    context.report({
      node: node,
      message: validationErrors[0].message,
      loc: locFrom(node, validationErrors[0])
    });
    return;
  }
}

function locFrom(node, error) {
  if (!error.locations || !error.locations.length) {
    return;
  }
  var location = error.locations[0];

  var line = void 0;
  var column = void 0;
  if (location.line === 1 && node.tag.name !== internalTag) {
    line = node.loc.start.line;
    column = node.tag.loc.end.column + location.column;
  } else {
    line = node.loc.start.line + location.line - 1;
    column = location.column - 1;
  }

  return {
    line: line,
    column: column
  };
}

function replaceExpressions(node, context, env) {
  var chunks = [];

  node.quasis.forEach(function (element, i) {
    var chunk = element.value.cooked;
    var value = node.expressions[i];

    chunks.push(chunk);

    if (!env || env === 'apollo') {
      // In Apollo, interpolation is only valid outside top-level structures like `query` or `mutation`.
      // We'll check to make sure there's an equivalent set of opening and closing brackets, otherwise
      // we're attempting to do an invalid interpolation.
      if (chunk.split('{').length - 1 !== chunk.split('}').length - 1) {
        context.report({
          node: value,
          message: 'Invalid interpolation - fragment interpolation must occur outside of the brackets.'
        });
        throw new Error('Invalid interpolation');
      }
    }

    if (!element.tail) {
      // Preserve location of errors by replacing with exactly the same length
      var nameLength = value.end - value.start;

      if (env === 'relay' && /:\s*$/.test(chunk)) {
        // The chunk before this one had a colon at the end, so this
        // is a variable

        // Add 2 for brackets in the interpolation
        var placeholder = strWithLen(nameLength + 2);
        chunks.push('$' + placeholder);
      } else if (env === 'lokka' && /\.\.\.\s*$/.test(chunk)) {
        // This is Lokka-style fragment interpolation where you actually type the '...' yourself
        var _placeholder = strWithLen(nameLength + 3);
        chunks.push(_placeholder);
      } else if (env === 'relay') {
        // This is Relay-style fragment interpolation where you don't type '...'
        // Ellipsis cancels out extra characters
        var _placeholder2 = strWithLen(nameLength);
        chunks.push('...' + _placeholder2);
      } else if (!env || env === 'apollo') {
        // In Apollo, fragment interpolation is only valid outside of brackets
        // Since we don't know what we'd interpolate here (that occurs at runtime),
        // we're not going to do anything with this interpolation.
      } else {
        // Invalid interpolation
        context.report({
          node: value,
          message: 'Invalid interpolation - not a valid fragment or variable.'
        });
        throw new Error('Invalid interpolation');
      }
    }
  });

  return chunks.join('');
}

function strWithLen(len) {
  // from http://stackoverflow.com/questions/14343844/create-a-string-of-variable-length-filled-with-a-repeated-character
  return new Array(len + 1).join('x');
}

var gqlProcessor = {
  preprocess: function preprocess(text) {
    // Wrap the text in backticks and prepend the internal tag. First the text
    // must be escaped, because of the three sequences that have special
    // meaning in JavaScript template literals, and could change the meaning of
    // the text or cause syntax errors.
    // https://tc39.github.io/ecma262/#prod-TemplateCharacter
    //
    // - "`" would end the template literal.
    // - "\" would start an escape sequence.
    // - "${" would start an interpolation.
    var escaped = text.replace(/[`\\]|\$\{/g, '\\$&');
    return [internalTag + '`' + escaped + '`'];
  },
  postprocess: function postprocess(messages) {
    // only report graphql-errors
    return (0, _lodash.flatten)(messages).filter(function (message) {
      return (0, _lodash.includes)((0, _lodash.keys)(rules).map(function (key) {
        return 'graphql/' + key;
      }), message.ruleId);
    });
  }
};

var processors = exports.processors = (0, _lodash.reduce)(gqlFiles, function (result, value) {
  return _extends({}, result, _defineProperty({}, '.' + value, gqlProcessor));
}, {});

exports.default = {
  rules: rules,
  processors: processors
};