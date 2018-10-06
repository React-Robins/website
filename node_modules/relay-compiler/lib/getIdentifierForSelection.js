/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule getIdentifierForSelection
 * @format
 */

'use strict';

var _require = require('./GraphQLIRPrinter'),
    printArguments = _require.printArguments,
    printDirectives = _require.printDirectives;

/**
 * Generates an identifier that is unique to a given selection: the alias for
 * fields, the type for inline fragments, and a summary of the condition
 * variable and passing value for conditions.
 */
function getIdentifierForSelection(node) {
  if (node.kind === 'LinkedField' || node.kind === 'ScalarField') {
    return node.directives.length === 0 ? node.alias || node.name : (node.alias || node.name) + printDirectives(node.directives);
  } else if (node.kind === 'FragmentSpread' || node.kind === 'DeferrableFragmentSpread') {
    return node.args.length === 0 ? '...' + node.name : '...' + node.name + printArguments(node.args);
  } else if (node.kind === 'InlineFragment') {
    return 'I:' + node.typeCondition.name;
  } else if (node.kind === 'Condition') {
    return 'C:' + (node.condition.kind === 'Variable' ? '$' + node.condition.variableName : String(node.condition.value)) + String(node.passingValue);
  } else {
    require('fbjs/lib/invariant')(false, 'getIdentifierForSelection: Unexpected kind `%s`.', node.kind);
  }
}

module.exports = getIdentifierForSelection;