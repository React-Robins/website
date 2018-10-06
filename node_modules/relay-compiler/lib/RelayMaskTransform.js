/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * All rights reserved.
 *
 * @providesModule RelayMaskTransform
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLCompilerPublic'),
    CompilerContext = _require.CompilerContext,
    IRTransformer = _require.IRTransformer,
    isEquivalentType = _require.isEquivalentType;

/**
 * A transform that inlines fragment spreads with the @relay(mask: false)
 * directive.
 */
function relayMaskTransform(context) {
  return IRTransformer.transform(context, {
    FragmentSpread: visitFragmentSpread,
    Fragment: visitFragment
  }, function () {
    return {
      hoistedArgDefs: new Map()
    };
  });
}

function visitFragment(fragment, state) {
  var result = this.traverse(fragment, state);
  if (state.hoistedArgDefs.length === 0) {
    return result;
  }
  var existingArgDefs = new Map();
  result.argumentDefinitions.forEach(function (argDef) {
    existingArgDefs.set(argDef.name, argDef);
  });
  var combinedArgDefs = result.argumentDefinitions.slice(); // Copy array
  state.hoistedArgDefs.forEach(function (hoistedArgDef, argName) {
    var existingArgDef = existingArgDefs.get(argName);
    if (existingArgDef) {
      require('fbjs/lib/invariant')(areSameArgumentDefinitions(existingArgDef, hoistedArgDef.argDef), 'RelayMaskTransform: Cannot unmask fragment spread `%s` because ' + 'argument `%s` has been declared in `%s` and they are not the same.', hoistedArgDef.source, argName, fragment.name);
      return;
    }
    combinedArgDefs.push(hoistedArgDef.argDef);
  });
  return (0, _extends3['default'])({}, result, {
    argumentDefinitions: combinedArgDefs
  });
}

function visitFragmentSpread(fragmentSpread, state) {
  if (!isUnmaskedSpread(fragmentSpread)) {
    return fragmentSpread;
  }
  require('fbjs/lib/invariant')(fragmentSpread.args.length === 0, 'RelayMaskTransform: Cannot unmask fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', fragmentSpread.name);
  var fragment = this.getContext().getFragment(fragmentSpread.name);
  var result = {
    kind: 'InlineFragment',
    directives: fragmentSpread.directives,
    metadata: fragmentSpread.metadata,
    selections: fragment.selections,
    typeCondition: fragment.type
  };

  require('fbjs/lib/invariant')(!fragment.argumentDefinitions.find(function (argDef) {
    return argDef.kind === 'LocalArgumentDefinition';
  }), 'RelayMaskTransform: Cannot unmask fragment spread `%s` because it has local ' + 'argument definition.', fragmentSpread.name);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fragment.argumentDefinitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _argDef = _step.value;

      var hoistedArgDef = state.hoistedArgDefs.get(_argDef.name);
      if (hoistedArgDef) {
        require('fbjs/lib/invariant')(areSameArgumentDefinitions(_argDef, hoistedArgDef.argDef), 'RelayMaskTransform: Cannot unmask fragment spread `%s` because ' + 'argument `%s` has been declared in `%s` and they are not the same.', hoistedArgDef.source, _argDef.name, fragmentSpread.name);
        continue;
      }
      state.hoistedArgDefs.set(_argDef.name, {
        argDef: _argDef,
        source: fragmentSpread.name
      });
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

  return this.traverse(result, state);
}

function isUnmaskedSpread(spread) {
  return Boolean(spread.metadata && spread.metadata.mask === false);
}

function areSameArgumentDefinitions(argDef1, argDef2) {
  return argDef1.kind === argDef2.kind && argDef1.name === argDef2.name && isEquivalentType(argDef1.type, argDef2.type) &&
  // Only LocalArgumentDefinition defines defaultValue
  argDef1.defaultValue === argDef2.defaultValue;
}

module.exports = {
  transform: relayMaskTransform
};