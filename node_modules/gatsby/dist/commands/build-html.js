"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const webpack = require(`webpack`);

const fs = require(`fs`);

const debug = require(`debug`)(`gatsby:html`);

const webpackConfig = require(`../utils/webpack.config`);

const _require = require(`../redux`),
      store = _require.store;

const _require2 = require(`gatsby-cli/lib/reporter/errors`),
      createErrorFromString = _require2.createErrorFromString;

const renderHTMLQueue = require(`../utils/html-renderer-queue`);

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program, activity) {
    const directory = program.directory;
    debug(`generating static HTML`); // Reduce pages objects to an array of paths.

    const pages = Array.from(store.getState().pages.values(), page => page.path); // Static site generation.

    const compilerConfig = yield webpackConfig(program, directory, `build-html`, null);
    return new Promise((resolve, reject) => {
      webpack(compilerConfig).run((e, stats) => {
        if (e) {
          return reject(e);
        }

        const outputFile = `${directory}/public/render-page.js`;

        if (stats.hasErrors()) {
          let webpackErrors = stats.toJson().errors.filter(Boolean);
          return reject(webpackErrors.length ? createErrorFromString(webpackErrors[0], `${outputFile}.map`) : new Error(`There was an issue while building the site: ` + `\n\n${stats.toString()}`));
        }

        return renderHTMLQueue(outputFile, pages, activity).then(() => {
          // Remove the temp JS bundle file built for the static-site-generator-plugin
          try {
            fs.unlinkSync(outputFile);
            fs.unlinkSync(`${outputFile}.map`);
          } catch (e) {// This function will fail on Windows with no further consequences.
          }

          return resolve(null, stats);
        }).catch(e => {
          reject(createErrorFromString(e.stack, `${outputFile}.map`));
        });
      });
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=build-html.js.map