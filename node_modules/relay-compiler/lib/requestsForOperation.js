/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLCompilerPublic'),
    filterContextForNode = _require.filterContextForNode,
    Printer = _require.Printer;

function requestsForOperation(printContext, codeGenContext, initialRootName) {
  var operationToRequestName = new Map();
  return requestsInto([], {
    operationName: initialRootName,
    argumentDependencies: []
  });
  function requestsInto(requests, dependent) {
    var name = dependent.operationName;
    // Create a unique name for this request.
    var num = 0;
    var requestName = void 0;
    do {
      requestName = name + (++num > 1 ? num : '');
    } while (requests.some(function (request) {
      return request.name === requestName;
    }));
    operationToRequestName.set(name, requestName);
    // Collect the dependent arguments for this request.
    var codeGenRoot = codeGenContext.getRoot(name);
    var argumentDependencies = dependent.argumentDependencies;
    var dependentRequests = codeGenRoot.dependentRequests;
    var rerunDependency = dependentRequests.find(function (next) {
      return next.operationName === dependent.operationName;
    });
    if (rerunDependency) {
      dependentRequests = dependentRequests.filter(function (next) {
        return next !== rerunDependency;
      });
      argumentDependencies = argumentDependencies.concat(rerunDependency.argumentDependencies);
    }
    // Create a request for this operation.
    requests.push({
      kind: 'Request',
      name: requestName,
      id: null,
      text: printOperation(printContext, name),
      argumentDependencies: argumentDependencies.map(function (argDep) {
        return (0, _extends3['default'])({}, argDep, {
          fromName: operationToRequestName.get(argDep.fromName)
        });
      }),
      root: codeGenRoot,
      metadata: dependent.metadata || undefined
    });
    // Collect any requests that were dependent on this one as well.
    return dependentRequests.reduce(requestsInto, requests);
  }
}

function printOperation(printContext, name) {
  var printableRoot = printContext.getRoot(name);
  return filterContextForNode(printableRoot, printContext).documents().map(Printer.print).join('\n');
}

module.exports = requestsForOperation;