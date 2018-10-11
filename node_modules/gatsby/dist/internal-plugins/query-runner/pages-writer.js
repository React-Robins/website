"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = require("../../utils/path");

const _ = require(`lodash`);

const fs = require(`fs-extra`);

const crypto = require(`crypto`);

const _require = require(`../../redux/`),
      store = _require.store,
      emitter = _require.emitter;

let lastHash = null; // Write out pages information.

const writePages =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* () {
    bootstrapFinished = true;

    let _store$getState = store.getState(),
        program = _store$getState.program,
        jsonDataPaths = _store$getState.jsonDataPaths,
        pages = _store$getState.pages;

    pages = [...pages.values()];
    const pagesComponentDependencies = {}; // Write out pages.json

    let pagesData = [];
    pages.forEach(({
      path,
      matchPath,
      componentChunkName,
      jsonName
    }) => {
      const pageComponentsChunkNames = {
        componentChunkName
      };

      if (program._[0] === `develop`) {
        pagesComponentDependencies[path] = pageComponentsChunkNames;
      }

      pagesData.push(Object.assign({}, pageComponentsChunkNames, {
        jsonName,
        path,
        matchPath
      }));
    });
    pagesData = _(pagesData) // Ensure pages keep the same sorting through builds
    // and sort pages with matchPath to end so explicit routes
    // will match before general.
    .sortBy(p => `${p.matchPath ? 1 : 0}${p.path}`).value();
    const newHash = crypto.createHash(`md5`).update(JSON.stringify(pagesComponentDependencies)).digest(`hex`);

    if (newHash === lastHash) {
      // components didn't change - no need to rewrite pages.json
      return Promise.resolve();
    }

    lastHash = newHash; // Get list of components, and json files.

    let components = [];
    pages.forEach(p => {
      components.push({
        componentChunkName: p.componentChunkName,
        component: p.component
      });
    });
    components = _.uniqBy(components, c => c.componentChunkName); // Create file with sync requires of components/json files.

    let syncRequires = `// prefer default export if available
const preferDefault = m => m && m.default || m
\n\n`;
    syncRequires += `exports.components = {\n${components.map(c => `  "${c.componentChunkName}": preferDefault(require("${(0, _path.joinPath)(c.component)}"))`).join(`,\n`)}
}\n\n`; // Create file with async requires of components/json files.

    let asyncRequires = `// prefer default export if available
const preferDefault = m => m && m.default || m
\n`;
    asyncRequires += `exports.components = {\n${components.map(c => `  "${c.componentChunkName}": () => import("${(0, _path.joinPath)(c.component)}" /* webpackChunkName: "${c.componentChunkName}" */)`).join(`,\n`)}
}\n\n`;
    asyncRequires += `exports.data = () => import("${(0, _path.joinPath)(program.directory, `.cache`, `data.json`)}")\n\n`;

    const writeAndMove = (file, data) => {
      const destination = (0, _path.joinPath)(program.directory, `.cache`, file);
      const tmp = `${destination}.${Date.now()}`;
      return fs.writeFile(tmp, data).then(() => fs.move(tmp, destination, {
        overwrite: true
      }));
    };

    const result = yield Promise.all([writeAndMove(`pages.json`, JSON.stringify(pagesData, null, 4)), writeAndMove(`sync-requires.js`, syncRequires), writeAndMove(`async-requires.js`, asyncRequires), writeAndMove(`data.json`, JSON.stringify({
      pages: pagesData,
      // Sort dataPaths by keys to ensure keeping the same
      // sorting through builds
      dataPaths: _(jsonDataPaths).toPairs().sortBy(0).fromPairs().value()
    }))]);
    return result;
  });

  return function writePages() {
    return _ref.apply(this, arguments);
  };
}();

exports.writePages = writePages;

const resetLastHash = () => {
  lastHash = null;
};

exports.resetLastHash = resetLastHash;
let bootstrapFinished = false;
let oldPages;

const debouncedWritePages = _.debounce(() => {
  // Don't write pages again until bootstrap has finished.
  if (bootstrapFinished && !_.isEqual(oldPages, store.getState().pages)) {
    writePages();
    oldPages = store.getState().pages;
  }
}, 500, {
  leading: true
});

emitter.on(`CREATE_PAGE`, () => {
  // Ignore CREATE_PAGE until bootstrap is finished
  // as this is called many many times during bootstrap and
  // we can ignore them until CREATE_PAGE_END is called.
  //
  // After bootstrap, we need to listen for this as stateful page
  // creators e.g. the plugin "gatsby-plugin-page-creator"
  // calls createPage directly so CREATE_PAGE_END won't get fired.
  if (bootstrapFinished) {
    debouncedWritePages();
  }
});
emitter.on(`CREATE_PAGE_END`, () => {
  debouncedWritePages();
});
emitter.on(`DELETE_PAGE`, () => {
  debouncedWritePages();
});
emitter.on(`DELETE_PAGE_BY_PATH`, () => {
  debouncedWritePages();
});
//# sourceMappingURL=pages-writer.js.map