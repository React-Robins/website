/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule GraphQLCompilerContext
 * @format
 */

'use strict';

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./GraphQLCompilerUserError'),
    createUserError = _require.createUserError;

var _require2 = require('immutable'),
    ImmutableOrderedMap = _require2.OrderedMap;

/**
 * An immutable representation of a corpus of documents being compiled together.
 * For each document, the context stores the IR and any validation errors.
 */
var GraphQLCompilerContext = function () {
  function GraphQLCompilerContext(serverSchema, clientSchema) {
    (0, _classCallCheck3['default'])(this, GraphQLCompilerContext);

    this._isMutable = false;
    this._documents = new ImmutableOrderedMap();
    this._withTransform = new WeakMap();
    this.serverSchema = serverSchema;
    // If a separate client schema doesn't exist, use the server schema.
    this.clientSchema = clientSchema || serverSchema;
  }

  /**
   * Returns the documents for the context in the order they were added.
   */


  GraphQLCompilerContext.prototype.documents = function documents() {
    return this._documents.toArray();
  };

  GraphQLCompilerContext.prototype.forEachDocument = function forEachDocument(fn) {
    this._documents.forEach(fn);
  };

  GraphQLCompilerContext.prototype.replace = function replace(node) {
    return this._update(this._documents.update(node.name, function (existing) {
      require('fbjs/lib/invariant')(existing, 'GraphQLCompilerContext: Expected to replace existing node %s, but' + 'one was not found in the context.', node.name);
      return node;
    }));
  };

  GraphQLCompilerContext.prototype.add = function add(node) {
    return this._update(this._documents.update(node.name, function (existing) {
      require('fbjs/lib/invariant')(!existing, 'GraphQLCompilerContext: Duplicate document named `%s`. GraphQL ' + 'fragments and roots must have unique names.', node.name);
      return node;
    }));
  };

  GraphQLCompilerContext.prototype.addAll = function addAll(nodes) {
    return this.withMutations(function (mutable) {
      return nodes.reduce(function (ctx, definition) {
        return ctx.add(definition);
      }, mutable);
    });
  };

  /**
   * Apply a list of compiler transforms and return a new compiler context.
   */


  GraphQLCompilerContext.prototype.applyTransforms = function applyTransforms(transforms, reporter) {
    var _this = this;

    return require('./GraphQLCompilerProfiler').run('applyTransforms', function () {
      return transforms.reduce(function (ctx, transform) {
        return ctx.applyTransform(transform, reporter);
      }, _this);
    });
  };

  /**
   * Applies a transform to this context, returning a new context.
   *
   * This is memoized such that applying the same sequence of transforms will
   * not result in duplicated work.
   */


  GraphQLCompilerContext.prototype.applyTransform = function applyTransform(transform, reporter) {
    var transformed = this._withTransform.get(transform);
    if (!transformed) {
      var start = process.hrtime();
      transformed = require('./GraphQLCompilerProfiler').instrument(transform)(this);
      var delta = process.hrtime(start);
      var deltaMs = Math.round((delta[0] * 1e9 + delta[1]) / 1e6);
      reporter && reporter.reportTime(transform.name, deltaMs);
      this._withTransform.set(transform, transformed);
    }
    return transformed;
  };

  GraphQLCompilerContext.prototype.get = function get(name) {
    return this._documents.get(name);
  };

  GraphQLCompilerContext.prototype.getFragment = function getFragment(name) {
    var node = this._get(name);
    if (node.kind !== 'Fragment') {
      var childModule = name.substring(0, name.lastIndexOf('_'));
      throw createUserError('GraphQLCompilerContext: Cannot find fragment `%s`.' + ' Please make sure the fragment exists in `%s`.', name, childModule);
    }
    return node;
  };

  GraphQLCompilerContext.prototype.getRoot = function getRoot(name) {
    var node = this._get(name);
    require('fbjs/lib/invariant')(node.kind === 'Root', 'GraphQLCompilerContext: Expected `%s` to be a root, got `%s`.', name, node.kind);
    return node;
  };

  GraphQLCompilerContext.prototype.remove = function remove(name) {
    return this._update(this._documents['delete'](name));
  };

  GraphQLCompilerContext.prototype.withMutations = function withMutations(fn) {
    var mutableCopy = this._update(this._documents.asMutable());
    mutableCopy._isMutable = true;
    var result = fn(mutableCopy);
    result._isMutable = false;
    result._documents = result._documents.asImmutable();
    return this._documents === result._documents ? this : result;
  };

  GraphQLCompilerContext.prototype._get = function _get(name) {
    var document = this._documents.get(name);
    require('fbjs/lib/invariant')(document, 'GraphQLCompilerContext: Unknown document `%s`.', name);
    return document;
  };

  GraphQLCompilerContext.prototype._update = function _update(documents) {
    var context = this._isMutable ? this : new GraphQLCompilerContext(this.serverSchema, this.clientSchema);
    context._documents = documents;
    return context;
  };

  return GraphQLCompilerContext;
}();

module.exports = GraphQLCompilerContext;