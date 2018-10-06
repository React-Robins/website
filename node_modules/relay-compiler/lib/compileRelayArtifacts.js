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

var _toConsumableArray3 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLCompilerPublic'),
    Profiler = _require.Profiler;

// TODO T21875029 relay-runtime


/**
 * Transforms the provided compiler context
 *
 * compileRelayArtifacts generates artifacts for Relay's runtime as a result of
 * applying a series of transforms. Each kind of artifact is dependent on
 * transforms being applied in the following order:
 *
 *   - Fragment Readers: commonTransforms, fragmentTransforms
 *   - Operation Writers: commonTransforms, queryTransforms, codegenTransforms
 *   - GraphQL Text: commonTransforms, queryTransforms, printTransforms
 *
 * The order of the transforms applied for each artifact below is important.
 * CompilerContext will memoize applying each transform, so while
 * `commonTransforms` appears in each artifacts' application, it will not result
 * in repeated work as long as the order remains consistent across each context.
 */
function compileRelayArtifacts(context, transforms, reporter) {
  return Profiler.run('GraphQLCompiler.compile', function () {
    // The fragment is used for reading data from the normalized store.
    var fragmentContext = context.applyTransforms([].concat((0, _toConsumableArray3['default'])(transforms.commonTransforms), (0, _toConsumableArray3['default'])(transforms.fragmentTransforms)), reporter);

    // The unflattened query is used for printing, since flattening creates an
    // invalid query.
    var printContext = context.applyTransforms([].concat((0, _toConsumableArray3['default'])(transforms.commonTransforms), (0, _toConsumableArray3['default'])(transforms.queryTransforms), (0, _toConsumableArray3['default'])(transforms.printTransforms)), reporter);

    // The flattened query is used for codegen in order to reduce the number of
    // duplicate fields that must be processed during response normalization.
    var codeGenContext = context.applyTransforms([].concat((0, _toConsumableArray3['default'])(transforms.commonTransforms), (0, _toConsumableArray3['default'])(transforms.queryTransforms), (0, _toConsumableArray3['default'])(transforms.codegenTransforms)), reporter);

    return fragmentContext.documents().map(function (node) {
      return require('./RelayCodeGenerator').generate(node.kind === 'Fragment' ? node : {
        kind: 'Batch',
        metadata: codeGenContext.getRoot(node.name).metadata || {},
        name: node.name,
        fragment: {
          kind: 'Fragment',
          argumentDefinitions: node.argumentDefinitions,
          directives: node.directives,
          metadata: null,
          name: node.name,
          selections: node.selections,
          type: node.type
        },
        requests: require('./requestsForOperation')(printContext, codeGenContext, node.name)
      });
    });
  });
}

module.exports = compileRelayArtifacts;