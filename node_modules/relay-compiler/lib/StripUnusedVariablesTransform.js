/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StripUnusedVariablesTransform
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * A transform that removes variables from root queries that aren't referenced
 * by the query itself.
 */
function stripUnusedVariablesTransform(context) {
  var fragmentToVariables = new Map();
  var fragmentToFragmentSpreads = new Map();
  var rootToVariables = new Map();
  var rootToFragmentSpreads = new Map();
  context.forEachDocument(function (document) {
    var fragmentVariables = void 0;
    var fragmentFragmentSpreads = void 0;
    var rootVariables = void 0;
    var rootFragmentSpreads = void 0;
    require('./GraphQLIRVisitor').visit(document, {
      Root: {
        enter: function enter(root) {
          rootVariables = new Set();
          rootToVariables.set(root.name, rootVariables);
          rootFragmentSpreads = new Set();
          rootToFragmentSpreads.set(root.name, rootFragmentSpreads);
        },
        leave: function leave(root) {
          rootVariables = null;
          rootFragmentSpreads = null;
        }
      },
      Fragment: {
        enter: function enter(fragment) {
          fragmentVariables = new Set();
          fragmentToVariables.set(fragment.name, fragmentVariables);
          fragmentFragmentSpreads = new Set();
          fragmentToFragmentSpreads.set(fragment.name, fragmentFragmentSpreads);
        },
        leave: function leave(fragment) {
          fragmentVariables = null;
          fragmentFragmentSpreads = null;
        }
      },
      Variable: function Variable(variable) {
        fragmentVariables && fragmentVariables.add(variable.variableName);
        rootVariables && rootVariables.add(variable.variableName);
      },
      FragmentSpread: function FragmentSpread(spread) {
        fragmentFragmentSpreads && fragmentFragmentSpreads.add(spread.name);
        rootFragmentSpreads && rootFragmentSpreads.add(spread.name);
      }
    });
  });
  var variablesMemo = new Map();
  rootToVariables.forEach(function (variables, root) {
    Array.from(require('./nullthrowsOSS')(rootToFragmentSpreads.get(root), 'root ' + root + ' wasn\'t found in StripUnusedVariablesTransform')).forEach(function (spread) {
      return into(variables, allVariablesReferencedInFragment(variablesMemo, spread, fragmentToVariables, fragmentToFragmentSpreads));
    });
  });
  return require('./GraphQLIRTransformer').transform(context, {
    Root: function Root(root) {
      return transformRoot(context, root, require('./nullthrowsOSS')(rootToVariables.get(root.name), 'root ' + root.name + ' wasn\'t found in StripUnusedVariablesTransform'));
    },
    // Include fragments, but do not traverse into them.
    Fragment: function Fragment(id) {
      return id;
    }
  });
}

function allVariablesReferencedInFragment(variablesMemo, fragment, fragmentToVariables, fragmentToFragmentSpreads) {
  var variables = variablesMemo.get(fragment);
  if (!variables) {
    var directVariables = require('./nullthrowsOSS')(fragmentToVariables.get(fragment), 'fragment ' + fragment + ' wasn\'t found in StripUnusedVariablesTransform');
    variables = Array.from(require('./nullthrowsOSS')(fragmentToFragmentSpreads.get(fragment), 'fragment ' + fragment + ' wasn\'t found in StripUnusedVariablesTransform')).reduce(function (allVariables, fragmentSpread) {
      return into(allVariables, allVariablesReferencedInFragment(variablesMemo, fragmentSpread, fragmentToVariables, fragmentToFragmentSpreads));
    }, directVariables);
    variablesMemo.set(fragment, variables);
  }
  return variables;
}

function transformRoot(context, root, variables) {
  return (0, _extends3['default'])({}, root, {
    argumentDefinitions: root.argumentDefinitions.filter(function (arg) {
      return variables.has(arg.name);
    })
  });
}

// Returns the union of setA and setB. Modifies setA!
function into(setA, setB) {
  setB.forEach(function (item) {
    return setA.add(item);
  });
  return setA;
}

module.exports = {
  transform: stripUnusedVariablesTransform
};