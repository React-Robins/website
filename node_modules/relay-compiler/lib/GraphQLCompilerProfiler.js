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

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The compiler profiler builds a "call graph" of high level operations as a
 * means of tracking time spent over the course of running the compiler.
 */

var enabled = false;
var traces = [{
  ph: 'M',
  pid: 0,
  tid: 0,
  name: 'process_name',
  args: { name: 'relay-compiler' }
}, {
  ph: 'M',
  pid: 0,
  tid: 0,
  name: 'thread_name',
  args: { name: 'relay-compiler' }
}];
var stack = [];

function enable() {
  enabled = true;
}

function getTraces() {
  return traces;
}

/**
 * Run the provided function as part of a stack profile.
 */
function run(name, fn) {
  return instrument(fn, name)();
}

/**
 * Run the provided async function as part context in a stack profile.
 * See instrumentAsyncContext() for limitations and usage notes.
 */
function asyncContext(name, fn) {
  return instrumentAsyncContext(fn, name)();
}

/**
 * Wait for the provided async operation as an async profile.
 */
function waitFor(name, fn) {
  return instrumentWait(fn, name)();
}

/**
 * Return a new instrumented sync function to be part of a stack profile.
 *
 * This instruments synchronous functions to be displayed in a stack
 * visualization. To instrument async functions, see instrumentAsyncContext()
 * and instrumentWait().
 */
function instrument(fn, name) {
  if (!enabled) {
    return fn;
  }
  var profileName = name || fn.displayName || fn.name;
  var instrumented = function instrumented() {
    var traceId = start(profileName);
    try {
      return fn.apply(this, arguments);
    } finally {
      end(traceId);
    }
  };
  instrumented.displayName = profileName;
  return instrumented;
}

/**
 * Return a new instrumented async function which provides context for a stack.
 *
 * Because the resulting profiling information will be incorporated into a
 * stack visualization, the instrumented function must represent a distinct
 * region of time which does not overlap with any other async context.
 *
 * In other words, functions instrumented with instrumentAsyncContext must not
 * run in parallel via Promise.all().
 *
 * To instrument functions which will run in parallel, use instrumentWait().
 */
function instrumentAsyncContext(fn, name) {
  if (!enabled) {
    return fn;
  }
  var profileName = name || fn.displayName || fn.name;
  var instrumented = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* () {
      var traceId = start(profileName);
      try {
        return yield fn.apply(this, arguments);
      } finally {
        end(traceId);
      }
    });

    function instrumented() {
      return _ref.apply(this, arguments);
    }

    return instrumented;
  })();
  instrumented.displayName = profileName;
  return instrumented;
}

/**
 * Return a new instrumented function which performs an awaited async operation.
 *
 * The instrumented function is not included in the overall run time of the
 * compiler, instead it captures the time waiting on some asynchronous external
 * resource such as network or filesystem which are often run in parallel.
 */
function instrumentWait(fn, name) {
  if (!enabled) {
    return fn;
  }
  var profileName = name || fn.displayName || fn.name;
  var instrumented = (() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* () {
      var traceId = startWait(profileName);
      try {
        return yield fn.apply(this, arguments);
      } finally {
        end(traceId);
      }
    });

    function instrumented() {
      return _ref2.apply(this, arguments);
    }

    return instrumented;
  })();
  instrumented.displayName = profileName;
  return instrumented;
}

var T_ZERO = process.hrtime();

// Return a Uint32 of microtime duration since program start.
function microtime() {
  var hrtime = process.hrtime(T_ZERO);
  // eslint-disable-next-line no-bitwise
  return 0 | hrtime[0] * 1e6 + Math.round(hrtime[1] / 1e3);
}

/**
 * Start a stack profile with a particular name, returns an ID to pass to end().
 *
 * Other profiles may start before this one ends, which will be represented as
 * nested operations, however all nested operations must end before this ends.
 *
 * In particular, be careful to end after errors.
 */
function start(name) {
  var beginTrace = {
    ph: 'B',
    name: name,
    pid: 0,
    tid: 0,
    ts: microtime()
  };
  traces.push(beginTrace);
  stack.push(beginTrace);
  return traces.length - 1;
}

var asyncID = 0;

/**
 * Start an async wait profile with a particular name, returns an ID to pass
 * to end().
 *
 * Other profiles may start before this one ends, which will be represented as
 * nested operations, however all nested operations must end before this ends.
 *
 * In particular, be careful to end after errors.
 */
function startWait(name) {
  traces.push({
    ph: 'b',
    name: name,
    cat: 'wait',
    id: asyncID++,
    pid: 0,
    tid: 0,
    ts: microtime()
  });
  return traces.length - 1;
}

function end(traceIdx) {
  var trace = traces[traceIdx];

  if (trace.ph === 'b') {
    traces.push({
      ph: 'e',
      cat: trace.cat,
      name: trace.name,
      id: trace.id,
      pid: trace.pid,
      tid: trace.tid,
      ts: microtime()
    });
    return;
  }

  require('fbjs/lib/invariant')(trace.ph === 'B', 'Begin trace phase');
  require('fbjs/lib/invariant')(stack.pop() === trace, 'GraphQLCompilerProfiler: The profile trace %s ended before nested traces. ' + 'If it is async, try using Profile.waitFor or Profile.profileWait.', trace.name);

  var prevTrace = traces[traces.length - 1];

  if (trace === prevTrace) {
    traces[traceIdx] = {
      ph: 'X',
      name: trace.name,
      pid: trace.pid,
      tid: trace.tid,
      ts: trace.ts,
      dur: microtime() - trace.ts
    };
    return;
  }

  traces.push({
    ph: 'E',
    name: trace.name,
    pid: trace.pid,
    tid: trace.tid,
    ts: microtime()
  });
}

module.exports = {
  enable: enable,
  getTraces: getTraces,
  run: run,
  asyncContext: asyncContext,
  waitFor: waitFor,
  instrument: instrument,
  instrumentAsyncContext: instrumentAsyncContext,
  instrumentWait: instrumentWait,
  start: start,
  startWait: startWait,
  end: end
};