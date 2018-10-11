"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const Promise = require(`bluebird`);

const glob = require(`glob`);

const _ = require(`lodash`);

const tracer = require(`opentracing`).globalTracer();

const reporter = require(`gatsby-cli/lib/reporter`);

const cache = require(`./cache`);

const apiList = require(`./api-node-docs`);

const createNodeId = require(`./create-node-id`); // Bind action creators per plugin so we can auto-add
// metadata to actions they create.


const boundPluginActionCreators = {};

const doubleBind = (boundActionCreators, api, plugin, actionOptions) => {
  const traceId = actionOptions.traceId;

  if (boundPluginActionCreators[plugin.name + api + traceId]) {
    return boundPluginActionCreators[plugin.name + api + traceId];
  } else {
    const keys = Object.keys(boundActionCreators);
    const doubleBoundActionCreators = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const boundActionCreator = boundActionCreators[key];

      if (typeof boundActionCreator === `function`) {
        doubleBoundActionCreators[key] = (...args) => {
          // Let action callers override who the plugin is. Shouldn't be
          // used that often.
          if (args.length === 1) {
            boundActionCreator(args[0], plugin, actionOptions);
          } else if (args.length === 2) {
            boundActionCreator(args[0], args[1], actionOptions);
          }
        };
      }
    }

    boundPluginActionCreators[plugin.name + api + traceId] = doubleBoundActionCreators;
    return doubleBoundActionCreators;
  }
};

const initAPICallTracing = parentSpan => {
  const startSpan = (spanName, spanArgs = {}) => {
    const defaultSpanArgs = {
      childOf: parentSpan
    };
    return tracer.startSpan(spanName, _.merge(defaultSpanArgs, spanArgs));
  };

  return {
    tracer,
    parentSpan,
    startSpan
  };
};

const runAPI = (plugin, api, args) => {
  const gatsbyNode = require(`${plugin.resolve}/gatsby-node`);

  if (gatsbyNode[api]) {
    const parentSpan = args && args.parentSpan;
    const spanOptions = parentSpan ? {
      childOf: parentSpan
    } : {};
    const pluginSpan = tracer.startSpan(`run-plugin`, spanOptions);
    pluginSpan.setTag(`api`, api);
    pluginSpan.setTag(`plugin`, plugin.name);
    let pathPrefix = ``;

    const _require = require(`../redux`),
          store = _require.store,
          emitter = _require.emitter,
          loadNodeContent = _require.loadNodeContent,
          getNodes = _require.getNodes,
          getNode = _require.getNode,
          hasNodeChanged = _require.hasNodeChanged,
          getNodeAndSavePathDependency = _require.getNodeAndSavePathDependency;

    const _require2 = require(`../redux/actions`),
          boundActionCreators = _require2.boundActionCreators;

    const doubleBoundActionCreators = doubleBind(boundActionCreators, api, plugin, Object.assign({}, args, {
      parentSpan: pluginSpan
    }));

    if (store.getState().program.prefixPaths) {
      pathPrefix = store.getState().config.pathPrefix;
    }

    const namespacedCreateNodeId = id => createNodeId(id, plugin.name);

    const tracing = initAPICallTracing(pluginSpan);
    const apiCallArgs = [Object.assign({}, args, {
      pathPrefix,
      boundActionCreators: doubleBoundActionCreators,
      actions: doubleBoundActionCreators,
      loadNodeContent,
      store,
      emitter,
      getNodes,
      getNode,
      hasNodeChanged,
      reporter,
      getNodeAndSavePathDependency,
      cache,
      createNodeId: namespacedCreateNodeId,
      tracing
    }), plugin.pluginOptions]; // If the plugin is using a callback use that otherwise
    // expect a Promise to be returned.

    if (gatsbyNode[api].length === 3) {
      return Promise.fromCallback(callback => {
        const cb = (err, val) => {
          pluginSpan.finish();
          callback(err, val);
        };

        gatsbyNode[api](...apiCallArgs, cb);
      });
    } else {
      const result = gatsbyNode[api](...apiCallArgs);
      pluginSpan.finish();
      return Promise.resolve(result);
    }
  }

  return null;
};

let filteredPlugins;

const hasAPIFile = plugin => glob.sync(`${plugin.resolve}/gatsby-node*`)[0];

let apisRunningById = new Map();
let apisRunningByTraceId = new Map();
let waitingForCasacadeToFinish = [];

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (api, args = {}, pluginSource) {
    return new Promise(resolve => {
      const parentSpan = args.parentSpan;
      const apiSpanArgs = parentSpan ? {
        childOf: parentSpan
      } : {};
      const apiSpan = tracer.startSpan(`run-api`, apiSpanArgs);
      apiSpan.setTag(`api`, api);

      _.forEach(args.traceTags, (value, key) => {
        apiSpan.setTag(key, value);
      }); // Check that the API is documented.


      if (!apiList[api]) {
        reporter.error(`api: "${api}" is not a valid Gatsby api`);
        process.exit();
      }

      const _require3 = require(`../redux`),
            store = _require3.store;

      const plugins = store.getState().flattenedPlugins; // Get the list of plugins that implement gatsby-node

      if (!filteredPlugins) {
        filteredPlugins = plugins.filter(plugin => hasAPIFile(plugin));
      } // Break infinite loops.
      // Sometimes a plugin will implement an API and call an
      // action which will trigger the same API being called.
      // "onCreatePage" is the only example right now.
      // In these cases, we should avoid calling the originating plugin
      // again.


      let noSourcePluginPlugins = filteredPlugins;

      if (pluginSource) {
        noSourcePluginPlugins = filteredPlugins.filter(p => p.name !== pluginSource);
      }

      const apiRunInstance = {
        api,
        args,
        pluginSource,
        resolve,
        span: apiSpan,
        startTime: new Date().toJSON(),
        traceId: args.traceId // Generate IDs for api runs. Most IDs we generate from the args
        // but some API calls can have very large argument objects so we
        // have special ways of generating IDs for those to avoid stringifying
        // large objects.

      };
      let id;

      if (api === `setFieldsOnGraphQLNodeType`) {
        id = `${api}${apiRunInstance.startTime}${args.type.name}${args.traceId}`;
      } else if (api === `onCreateNode`) {
        id = `${api}${apiRunInstance.startTime}${args.node.internal.contentDigest}${args.traceId}`;
      } else if (api === `preprocessSource`) {
        id = `${api}${apiRunInstance.startTime}${args.filename}${args.traceId}`;
      } else if (api === `onCreatePage`) {
        id = `${api}${apiRunInstance.startTime}${args.page.path}${args.traceId}`;
      } else {
        id = `${api}|${apiRunInstance.startTime}|${apiRunInstance.traceId}|${JSON.stringify(args)}`;
      }

      apiRunInstance.id = id;

      if (args.waitForCascadingActions) {
        waitingForCasacadeToFinish.push(apiRunInstance);
      }

      apisRunningById.set(apiRunInstance.id, apiRunInstance);

      if (apisRunningByTraceId.has(apiRunInstance.traceId)) {
        const currentCount = apisRunningByTraceId.get(apiRunInstance.traceId);
        apisRunningByTraceId.set(apiRunInstance.traceId, currentCount + 1);
      } else {
        apisRunningByTraceId.set(apiRunInstance.traceId, 1);
      }

      let pluginName = null;
      Promise.mapSeries(noSourcePluginPlugins, plugin => {
        if (plugin.name === `default-site-plugin`) {
          pluginName = `gatsby-node.js`;
        } else {
          pluginName = `Plugin ${plugin.name}`;
        }

        return Promise.resolve(runAPI(plugin, api, Object.assign({}, args, {
          parentSpan: apiSpan
        })));
      }).catch(err => {
        if (err) {
          if (process.env.NODE_ENV === `production`) {
            return reporter.panic(`${pluginName} returned an error`, err);
          }

          return reporter.error(`${pluginName} returned an error`, err);
        }

        return null;
      }).then(results => {
        // Remove runner instance
        apisRunningById.delete(apiRunInstance.id);
        const currentCount = apisRunningByTraceId.get(apiRunInstance.traceId);
        apisRunningByTraceId.set(apiRunInstance.traceId, currentCount - 1);

        if (apisRunningById.size === 0) {
          const _require4 = require(`../redux`),
                emitter = _require4.emitter;

          emitter.emit(`API_RUNNING_QUEUE_EMPTY`);
        } // Filter empty results


        apiRunInstance.results = results.filter(result => !_.isEmpty(result)); // Filter out empty responses and return if the
        // api caller isn't waiting for cascading actions to finish.

        if (!args.waitForCascadingActions) {
          apiSpan.finish();
          resolve(apiRunInstance.results);
        } // Check if any of our waiters are done.


        waitingForCasacadeToFinish = waitingForCasacadeToFinish.filter(instance => {
          // If none of its trace IDs are running, it's done.
          const apisByTraceIdCount = apisRunningByTraceId.get(instance.traceId);

          if (apisByTraceIdCount === 0) {
            instance.span.finish();
            instance.resolve(instance.results);
            return false;
          } else {
            return true;
          }
        });
        return;
      });
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=api-runner-node.js.map