"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _ = require(`lodash`);

const _require = require(`../redux`),
      emitter = _require.emitter,
      store = _require.store;

const apiRunnerNode = require(`../utils/api-runner-node`);

const _require2 = require(`../redux/actions`),
      boundActionCreators = _require2.boundActionCreators;

const deletePage = boundActionCreators.deletePage,
      deleteComponentsDependencies = boundActionCreators.deleteComponentsDependencies;
let pagesDirty = false;
let graphql;
emitter.on(`CREATE_NODE`, action => {
  if (action.payload.internal.type !== `SitePage`) {
    pagesDirty = true;
  }
});
emitter.on(`DELETE_NODE`, action => {
  if (action.payload.internal.type !== `SitePage`) {
    pagesDirty = true;
  }
});
emitter.on(`API_RUNNING_QUEUE_EMPTY`, () => {
  if (pagesDirty) {
    runCreatePages();
  }
});

const runCreatePages =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* () {
    pagesDirty = false;
    const plugins = store.getState().plugins; // Test which plugins implement createPagesStatefully so we can
    // ignore their pages.

    const statefulPlugins = plugins.filter(p => {
      try {
        const gatsbyNode = require(`${p.resolve}/gatsby-node`);

        if (gatsbyNode.createPagesStatefully) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }).map(p => p.id);
    const timestamp = new Date().toJSON();
    yield apiRunnerNode(`createPages`, {
      graphql,
      traceId: `createPages`,
      waitForCascadingActions: true
    }); // Delete pages that weren't updated when running createPages.

    Array.from(store.getState().pages.values()).forEach(page => {
      if (!_.includes(statefulPlugins, page.pluginCreatorId) && page.updatedAt < timestamp) {
        deleteComponentsDependencies([page.path]);
        deletePage(page);
      }
    });
    emitter.emit(`CREATE_PAGE_END`);
  });

  return function runCreatePages() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = graphqlRunner => {
  graphql = graphqlRunner;
};
//# sourceMappingURL=page-hot-reloader.js.map