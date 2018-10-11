"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const fs = require(`fs`);

const webpack = require(`webpack`);

const _require = require(`gatsby-cli/lib/reporter/errors`),
      createErrorFromString = _require.createErrorFromString;

const debug = require(`debug`)(`gatsby:html`);

const webpackConfig = require(`../utils/webpack.config`);

const renderHTMLQueue = require(`../utils/html-renderer-queue`);

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program) {
    const directory = program.directory;
    debug(`generating static HTML`); // Static site generation.

    const compilerConfig = yield webpackConfig(program, directory, `develop-html`, null);
    return new Promise((resolve, reject) => {
      webpack(compilerConfig).run((e, stats) => {
        if (e) {
          return reject(e);
        }

        const outputFile = `${directory}/public/render-page.js`;

        if (stats.hasErrors()) {
          let webpackErrors = stats.toJson().errors;
          console.log(`here`, webpackErrors[0]);
          return reject(createErrorFromString(webpackErrors[0], `${outputFile}.map`));
        }

        return renderHTMLQueue(outputFile, [`/`]).then(() => {
          // Remove the temp JS bundle file built for the static-site-generator-plugin
          try {
            fs.unlinkSync(outputFile);
          } catch (e) {// This function will fail on Windows with no further consequences.
          }

          return resolve(null, stats);
        });
      });
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=develop-html.js.map