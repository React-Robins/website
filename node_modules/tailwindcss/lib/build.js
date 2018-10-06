'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _cleanCss = require('clean-css');

var _cleanCss2 = _interopRequireDefault(_cleanCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildDistFile(filename) {
  return new Promise((resolve, reject) => {
    console.log(`Processing ./${filename}.css...`);

    _fs2.default.readFile(`./${filename}.css`, (err, css) => {
      if (err) throw err;

      return (0, _postcss2.default)([(0, _2.default)(), require('autoprefixer')]).process(css, {
        from: `./${filename}.css`,
        to: `./dist/${filename}.css`,
        map: { inline: false }
      }).then(result => {
        _fs2.default.writeFileSync(`./dist/${filename}.css`, result.css);
        if (result.map) {
          _fs2.default.writeFileSync(`./dist/${filename}.css.map`, result.map);
        }
        return result;
      }).then(result => {
        const minified = new _cleanCss2.default().minify(result.css);
        _fs2.default.writeFileSync(`./dist/${filename}.min.css`, minified.styles);
      }).then(resolve).catch(error => {
        console.log(error);
        reject();
      });
    });
  });
}

console.info('Building Tailwind!');

Promise.all([buildDistFile('preflight'), buildDistFile('components'), buildDistFile('utilities'), buildDistFile('tailwind')]).then(() => {
  console.log('Finished Building Tailwind!');
});