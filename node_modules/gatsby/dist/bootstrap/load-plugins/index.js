"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _ = require(`lodash`);

const _require = require(`../../redux`),
      store = _require.store;

const nodeAPIs = require(`../../utils/api-node-docs`);

const browserAPIs = require(`../../utils/api-browser-docs`);

const ssrAPIs = require(`../../../cache-dir/api-ssr-docs`);

const loadPlugins = require(`./load`);

const _require2 = require(`./validate`),
      collatePluginAPIs = _require2.collatePluginAPIs,
      handleBadExports = _require2.handleBadExports,
      handleMultipleReplaceRenderers = _require2.handleMultipleReplaceRenderers;

const apis = {
  node: _.keys(nodeAPIs),
  browser: _.keys(browserAPIs),
  ssr: _.keys(ssrAPIs) // Create a "flattened" array of plugins with all subplugins
  // brought to the top-level. This simplifies running gatsby-* files
  // for subplugins.

};

const flattenPlugins = plugins => {
  const flattened = [];

  const extractPlugins = plugin => {
    plugin.pluginOptions.plugins.forEach(subPlugin => {
      flattened.push(subPlugin);
      extractPlugins(subPlugin);
    });
  };

  plugins.forEach(plugin => {
    flattened.push(plugin);
    extractPlugins(plugin);
  });
  return flattened;
};

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (config = {}) {
    // Collate internal plugins, site config plugins, site default plugins
    const plugins = loadPlugins(config); // Create a flattened array of the plugins

    let flattenedPlugins = flattenPlugins(plugins); // Work out which plugins use which APIs, including those which are not
    // valid Gatsby APIs, aka 'badExports'

    const x = collatePluginAPIs({
      apis,
      flattenedPlugins
    });
    flattenedPlugins = x.flattenedPlugins;
    const apiToPlugins = x.apiToPlugins;
    const badExports = x.badExports; // Show errors for any non-Gatsby APIs exported from plugins

    const isBad = handleBadExports({
      apis,
      badExports
    });
    if (isBad && process.env.NODE_ENV === `production`) process.exit(1); // TODO: change to panicOnBuild
    // Show errors when ReplaceRenderer has been implemented multiple times

    flattenedPlugins = handleMultipleReplaceRenderers({
      apiToPlugins,
      flattenedPlugins
    }); // If we get this far, everything looks good. Update the store

    store.dispatch({
      type: `SET_SITE_FLATTENED_PLUGINS`,
      payload: flattenedPlugins
    });
    store.dispatch({
      type: `SET_SITE_API_TO_PLUGINS`,
      payload: apiToPlugins
    }); // TODO: Is this used? plugins and flattenedPlugins may be out of sync

    store.dispatch({
      type: `SET_SITE_PLUGINS`,
      payload: plugins
    });
    return flattenedPlugins;
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map