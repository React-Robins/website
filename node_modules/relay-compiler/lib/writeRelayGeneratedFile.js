/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule writeRelayGeneratedFile
 * 
 * @format
 */

'use strict';

// TODO T21875029 ../../relay-runtime/util/RelayConcreteNode

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

let writeRelayGeneratedFile = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (codegenDir, generatedNode, formatModule, flowText, _persistQuery, platform, relayRuntimeModule, sourceHash) {
    // Copy to const so Flow can refine.
    var persistQuery = _persistQuery;
    var moduleName = generatedNode.name + '.graphql';
    var platformName = platform ? moduleName + '.' + platform : moduleName;
    var filename = platformName + '.js';
    var flowTypeName = generatedNode.kind === require('./RelayConcreteNode').FRAGMENT ? 'ConcreteFragment' : generatedNode.kind === require('./RelayConcreteNode').REQUEST ? 'ConcreteRequest' : generatedNode.kind === require('./RelayConcreteNode').BATCH_REQUEST ? 'ConcreteBatchRequest' : 'empty';
    var devOnlyProperties = {};

    var docText = void 0;
    if (generatedNode.kind === require('./RelayConcreteNode').REQUEST) {
      docText = generatedNode.text;
    } else if (generatedNode.kind === require('./RelayConcreteNode').BATCH_REQUEST) {
      docText = generatedNode.requests.map(function (request) {
        return request.text;
      }).join('\n\n');
    }

    var hash = null;
    if (generatedNode.kind === require('./RelayConcreteNode').REQUEST || generatedNode.kind === require('./RelayConcreteNode').BATCH_REQUEST) {
      var oldHash = Profiler.run('RelayFileWriter:compareHash', function () {
        var oldContent = codegenDir.read(filename);
        // Hash the concrete node including the query text.
        var hasher = require('crypto').createHash('md5');
        hasher.update('cache-breaker-6');
        hasher.update(JSON.stringify(generatedNode));
        if (flowText) {
          hasher.update(flowText);
        }
        if (persistQuery) {
          hasher.update('persisted');
        }
        hash = hasher.digest('hex');
        return extractHash(oldContent);
      });
      if (hash === oldHash) {
        codegenDir.markUnchanged(filename);
        return null;
      }
      if (codegenDir.onlyValidate) {
        codegenDir.markUpdated(filename);
        return null;
      }
      if (persistQuery) {
        switch (generatedNode.kind) {
          case require('./RelayConcreteNode').REQUEST:
            devOnlyProperties.text = generatedNode.text;
            generatedNode = (0, _extends3['default'])({}, generatedNode, {
              text: null,
              id: yield persistQuery(require('fbjs/lib/nullthrows')(generatedNode.text))
            });
            break;
          case require('./RelayConcreteNode').BATCH_REQUEST:
            devOnlyProperties.requests = generatedNode.requests.map(function (request) {
              return {
                text: request.text
              };
            });
            generatedNode = (0, _extends3['default'])({}, generatedNode, {
              requests: yield Promise.all(generatedNode.requests.map((() => {
                var _ref2 = (0, _asyncToGenerator3.default)(function* (request) {
                  return (0, _extends3['default'])({}, request, {
                    text: null,
                    id: yield persistQuery(require('fbjs/lib/nullthrows')(request.text))
                  });
                });

                return function (_x9) {
                  return _ref2.apply(this, arguments);
                };
              })()))
            });
            break;
          case require('./RelayConcreteNode').FRAGMENT:
            // Do not persist fragments.
            break;
          default:
            generatedNode.kind;
        }
      }
    }

    var devOnlyAssignments = require('./deepMergeAssignments')('node', devOnlyProperties);

    var moduleText = formatModule({
      moduleName: moduleName,
      documentType: flowTypeName,
      docText: docText,
      flowText: flowText,
      hash: hash ? '@relayHash ' + hash : null,
      concreteText: require('./dedupeJSONStringify')(generatedNode),
      devOnlyAssignments: devOnlyAssignments,
      relayRuntimeModule: relayRuntimeModule,
      sourceHash: sourceHash
    });

    codegenDir.writeFile(filename, moduleText);
    return generatedNode;
  });

  return function writeRelayGeneratedFile(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
})();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLCompilerPublic'),
    Profiler = _require.Profiler;

// TODO T21875029 ../../relay-runtime/util/RelayConcreteNode


/**
 * Generate a module for the given document name/text.
 */


function extractHash(text) {
  if (!text) {
    return null;
  }
  if (/<<<<<|>>>>>/.test(text)) {
    // looks like a merge conflict
    return null;
  }
  var match = text.match(/@relayHash (\w{32})\b/m);
  return match && match[1];
}

module.exports = writeRelayGeneratedFile;