/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayModernEnvironment
 * 
 * @format
 */

'use strict';

var _classCallCheck3 = _interopRequireDefault(require('babel-runtime/helpers/classCallCheck'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _require = require('./RelayModernOperationSelector'),
    createOperationSelector = _require.createOperationSelector;

var RelayModernEnvironment = function () {
  function RelayModernEnvironment(config) {
    var _this = this;

    (0, _classCallCheck3['default'])(this, RelayModernEnvironment);
    this._deferrableSelections = new Set();

    this.configName = config.configName;
    var handlerProvider = config.handlerProvider ? config.handlerProvider : require('./RelayDefaultHandlerProvider');
    this._network = config.network;
    this._publishQueue = new (require('./RelayPublishQueue'))(config.store, handlerProvider);
    this._store = config.store;
    this.unstable_internal = require('./RelayCore');

    this.__setNet = function (newNet) {
      return _this._network = newNet;
    };

    // Register this Relay Environment with Relay DevTools if it exists.
    // Note: this must always be the last step in the constructor.
    var _global = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : undefined;
    var devToolsHook = _global && _global.__RELAY_DEVTOOLS_HOOK__;
    if (devToolsHook) {
      devToolsHook.registerEnvironment(this);
    }
  }

  RelayModernEnvironment.prototype.getStore = function getStore() {
    return this._store;
  };

  RelayModernEnvironment.prototype.getNetwork = function getNetwork() {
    return this._network;
  };

  RelayModernEnvironment.prototype.applyUpdate = function applyUpdate(optimisticUpdate) {
    var _this2 = this;

    var dispose = function dispose() {
      _this2._publishQueue.revertUpdate(optimisticUpdate);
      _this2._publishQueue.run();
    };
    this._publishQueue.applyUpdate(optimisticUpdate);
    this._publishQueue.run();
    return { dispose: dispose };
  };

  RelayModernEnvironment.prototype.revertUpdate = function revertUpdate(update) {
    this._publishQueue.revertUpdate(update);
    this._publishQueue.run();
  };

  RelayModernEnvironment.prototype.replaceUpdate = function replaceUpdate(update, newUpdate) {
    this._publishQueue.revertUpdate(update);
    this._publishQueue.applyUpdate(newUpdate);
    this._publishQueue.run();
  };

  RelayModernEnvironment.prototype.applyMutation = function applyMutation(_ref) {
    var operation = _ref.operation,
        optimisticResponse = _ref.optimisticResponse,
        optimisticUpdater = _ref.optimisticUpdater;

    return this.applyUpdate({
      operation: operation,
      selectorStoreUpdater: optimisticUpdater,
      response: optimisticResponse || null
    });
  };

  RelayModernEnvironment.prototype.check = function check(readSelector) {
    return this._store.check(readSelector);
  };

  RelayModernEnvironment.prototype.commitPayload = function commitPayload(operationSelector, payload) {
    // Do not handle stripped nulls when commiting a payload
    var relayPayload = require('./normalizeRelayPayload')(operationSelector.root, payload);
    this._publishQueue.commitPayload(operationSelector, relayPayload);
    this._publishQueue.run();
  };

  RelayModernEnvironment.prototype.commitUpdate = function commitUpdate(updater) {
    this._publishQueue.commitUpdate(updater);
    this._publishQueue.run();
  };

  RelayModernEnvironment.prototype.lookup = function lookup(readSelector) {
    return this._store.lookup(readSelector);
  };

  RelayModernEnvironment.prototype.subscribe = function subscribe(snapshot, callback) {
    return this._store.subscribe(snapshot, callback);
  };

  RelayModernEnvironment.prototype.retain = function retain(selector) {
    return this._store.retain(selector);
  };

  RelayModernEnvironment.prototype.isSelectorLoading = function isSelectorLoading(selector) {
    var key = require('./deferrableFragmentKey')(selector.dataID, selector.node.name, selector.variables);
    return this._deferrableSelections.has(key);
  };
  /**
   * Returns an Observable of ExecutePayload resulting from executing the
   * provided Query or Subscription operation, each result of which is then
   * normalized and committed to the publish queue.
   *
   * Note: Observables are lazy, so calling this method will do nothing until
   * the result is subscribed to: environment.execute({...}).subscribe({...}).
   */


  RelayModernEnvironment.prototype.execute = function execute(_ref2) {
    var _this3 = this;

    var operation = _ref2.operation,
        cacheConfig = _ref2.cacheConfig,
        updater = _ref2.updater;

    var optimisticResponse = void 0;
    return this._network.execute(operation.node, operation.variables, cacheConfig || {})['do']({
      next: function next(executePayload) {
        var responsePayload = require('./normalizePayload')(executePayload);
        var source = responsePayload.source,
            fieldPayloads = responsePayload.fieldPayloads,
            deferrableSelections = responsePayload.deferrableSelections;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (deferrableSelections || new Set())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var selectionKey = _step.value;

            _this3._deferrableSelections.add(selectionKey);
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

        if (executePayload.isOptimistic) {
          require('fbjs/lib/invariant')(optimisticResponse == null, 'environment.execute: only support one optimistic respnose per ' + 'execute.');
          optimisticResponse = {
            source: source,
            fieldPayloads: fieldPayloads
          };
          _this3._publishQueue.applyUpdate(optimisticResponse);
          _this3._publishQueue.run();
        } else {
          if (optimisticResponse) {
            _this3._publishQueue.revertUpdate(optimisticResponse);
            optimisticResponse = undefined;
          }
          var writeSelector = createOperationSelector(operation.node, executePayload.variables, executePayload.operation);
          if (executePayload.operation.kind === 'DeferrableOperation') {
            var fragmentKey = require('./deferrableFragmentKey')(executePayload.variables[executePayload.operation.rootFieldVariable], executePayload.operation.fragmentName, executePayload.variables);
            _this3._deferrableSelections['delete'](fragmentKey);
          }
          _this3._publishQueue.commitPayload(writeSelector, responsePayload, updater);
          _this3._publishQueue.run();
        }
      }
    })['finally'](function () {
      if (optimisticResponse) {
        _this3._publishQueue.revertUpdate(optimisticResponse);
        optimisticResponse = undefined;
        _this3._publishQueue.run();
      }
    });
  };

  /**
   * Returns an Observable of ExecutePayload resulting from executing the
   * provided Mutation operation, the result of which is then normalized and
   * committed to the publish queue along with an optional optimistic response
   * or updater.
   *
   * Note: Observables are lazy, so calling this method will do nothing until
   * the result is subscribed to:
   * environment.executeMutation({...}).subscribe({...}).
   */


  RelayModernEnvironment.prototype.executeMutation = function executeMutation(_ref3) {
    var _this4 = this;

    var operation = _ref3.operation,
        optimisticResponse = _ref3.optimisticResponse,
        optimisticUpdater = _ref3.optimisticUpdater,
        updater = _ref3.updater,
        uploadables = _ref3.uploadables;

    var optimisticUpdate = void 0;
    if (optimisticResponse || optimisticUpdater) {
      optimisticUpdate = {
        operation: operation,
        selectorStoreUpdater: optimisticUpdater,
        response: optimisticResponse || null
      };
    }

    return this._network.execute(operation.node, operation.variables, { force: true }, uploadables)['do']({
      start: function start() {
        if (optimisticUpdate) {
          _this4._publishQueue.applyUpdate(optimisticUpdate);
          _this4._publishQueue.run();
        }
      },
      next: function next(payload) {
        if (optimisticUpdate) {
          _this4._publishQueue.revertUpdate(optimisticUpdate);
          optimisticUpdate = undefined;
        }
        _this4._publishQueue.commitPayload(operation, require('./normalizePayload')(payload), updater);
        _this4._publishQueue.run();
      },
      error: function (_error) {
        function error(_x) {
          return _error.apply(this, arguments);
        }

        error.toString = function () {
          return _error.toString();
        };

        return error;
      }(function (error) {
        if (optimisticUpdate) {
          _this4._publishQueue.revertUpdate(optimisticUpdate);
          optimisticUpdate = undefined;
          _this4._publishQueue.run();
        }
      }),
      unsubscribe: function unsubscribe() {
        if (optimisticUpdate) {
          _this4._publishQueue.revertUpdate(optimisticUpdate);
          optimisticUpdate = undefined;
          _this4._publishQueue.run();
        }
      }
    });
  };

  /**
   * @deprecated Use Environment.execute().subscribe()
   */


  RelayModernEnvironment.prototype.sendQuery = function sendQuery(_ref4) {
    var cacheConfig = _ref4.cacheConfig,
        onCompleted = _ref4.onCompleted,
        onError = _ref4.onError,
        onNext = _ref4.onNext,
        operation = _ref4.operation;

    require('fbjs/lib/warning')(false, 'environment.sendQuery() is deprecated. Update to the latest ' + 'version of react-relay, and use environment.execute().');
    return this.execute({ operation: operation, cacheConfig: cacheConfig }).subscribeLegacy({
      onNext: onNext,
      onError: onError,
      onCompleted: onCompleted
    });
  };

  /**
   * @deprecated Use Environment.execute().subscribe()
   */


  RelayModernEnvironment.prototype.streamQuery = function streamQuery(_ref5) {
    var cacheConfig = _ref5.cacheConfig,
        onCompleted = _ref5.onCompleted,
        onError = _ref5.onError,
        onNext = _ref5.onNext,
        operation = _ref5.operation;

    require('fbjs/lib/warning')(false, 'environment.streamQuery() is deprecated. Update to the latest ' + 'version of react-relay, and use environment.execute().');
    return this.execute({ operation: operation, cacheConfig: cacheConfig }).subscribeLegacy({
      onNext: onNext,
      onError: onError,
      onCompleted: onCompleted
    });
  };

  /**
   * @deprecated Use Environment.executeMutation().subscribe()
   */


  RelayModernEnvironment.prototype.sendMutation = function sendMutation(_ref6) {
    var onCompleted = _ref6.onCompleted,
        onError = _ref6.onError,
        operation = _ref6.operation,
        optimisticResponse = _ref6.optimisticResponse,
        optimisticUpdater = _ref6.optimisticUpdater,
        updater = _ref6.updater,
        uploadables = _ref6.uploadables;

    require('fbjs/lib/warning')(false, 'environment.sendMutation() is deprecated. Update to the latest ' + 'version of react-relay, and use environment.executeMutation().');
    return this.executeMutation({
      operation: operation,
      optimisticResponse: optimisticResponse,
      optimisticUpdater: optimisticUpdater,
      updater: updater,
      uploadables: uploadables
    }).subscribeLegacy({
      // NOTE: sendMutation has a non-standard use of onCompleted() by passing
      // it a value. When switching to use executeMutation(), the next()
      // Observer should be used to preserve behavior.
      onNext: function onNext(payload) {
        onCompleted && onCompleted(payload.response.errors);
      },
      onError: onError,
      onCompleted: onCompleted
    });
  };

  /**
   * @deprecated Use Environment.execute().subscribe()
   */


  RelayModernEnvironment.prototype.sendSubscription = function sendSubscription(_ref7) {
    var onCompleted = _ref7.onCompleted,
        onNext = _ref7.onNext,
        onError = _ref7.onError,
        operation = _ref7.operation,
        updater = _ref7.updater;

    require('fbjs/lib/warning')(false, 'environment.sendSubscription() is deprecated. Update to the latest ' + 'version of react-relay, and use environment.execute().');
    return this.execute({
      operation: operation,
      updater: updater,
      cacheConfig: { force: true }
    }).subscribeLegacy({ onNext: onNext, onError: onError, onCompleted: onCompleted });
  };

  RelayModernEnvironment.prototype.checkSelectorAndUpdateStore = function checkSelectorAndUpdateStore(selector, handlers) {
    var target = new (require('./RelayInMemoryRecordSource'))();
    var result = require('./RelayDataLoader').check(this._store.getSource(), target, selector, handlers);
    if (target.size() > 0) {
      this._publishQueue.commitSource(target);
      this._publishQueue.run();
    }
    return result;
  };

  return RelayModernEnvironment;
}();

// Add a sigil for detection by `isRelayModernEnvironment()` to avoid a
// realm-specific instanceof check, and to aid in module tree-shaking to
// avoid requiring all of RelayRuntime just to detect its environment.


RelayModernEnvironment.prototype['@@RelayModernEnvironment'] = true;

module.exports = RelayModernEnvironment;