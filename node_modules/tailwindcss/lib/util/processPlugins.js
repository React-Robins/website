'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  const pluginComponents = [];
  const pluginUtilities = [];
  const pluginVariantGenerators = {};

  config.plugins.forEach(plugin => {
    plugin({
      config: (path, defaultValue) => _lodash2.default.get(config, path, defaultValue),
      e: _escapeClassName2.default,
      prefix: selector => {
        return (0, _prefixSelector2.default)(config.options.prefix, selector);
      },
      addUtilities: (utilities, options) => {
        const defaultOptions = { variants: [], respectPrefix: true, respectImportant: true };

        options = Array.isArray(options) ? Object.assign({}, defaultOptions, { variants: options }) : _lodash2.default.defaults(options, defaultOptions);

        const styles = _postcss2.default.root({ nodes: parseStyles(utilities) });

        styles.walkRules(rule => {
          if (options.respectPrefix) {
            rule.selector = (0, _prefixSelector2.default)(config.options.prefix, rule.selector);
          }

          if (options.respectImportant && _lodash2.default.get(config, 'options.important')) {
            rule.walkDecls(decl => decl.important = true);
          }
        });

        pluginUtilities.push((0, _wrapWithVariants2.default)(styles.nodes, options.variants));
      },
      addComponents: (components, options) => {
        options = Object.assign({ respectPrefix: true }, options);

        const styles = _postcss2.default.root({ nodes: parseStyles(components) });

        styles.walkRules(rule => {
          if (options.respectPrefix) {
            rule.selector = (0, _prefixSelector2.default)(config.options.prefix, rule.selector);
          }
        });

        pluginComponents.push(...styles.nodes);
      },
      addVariant: (name, generator) => {
        pluginVariantGenerators[name] = (0, _generateVariantFunction2.default)(generator);
      }
    });
  });

  return {
    components: pluginComponents,
    utilities: pluginUtilities,
    variantGenerators: pluginVariantGenerators
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _node = require('postcss/lib/node');

var _node2 = _interopRequireDefault(_node);

var _escapeClassName = require('../util/escapeClassName');

var _escapeClassName2 = _interopRequireDefault(_escapeClassName);

var _generateVariantFunction = require('../util/generateVariantFunction');

var _generateVariantFunction2 = _interopRequireDefault(_generateVariantFunction);

var _parseObjectStyles = require('../util/parseObjectStyles');

var _parseObjectStyles2 = _interopRequireDefault(_parseObjectStyles);

var _prefixSelector = require('../util/prefixSelector');

var _prefixSelector2 = _interopRequireDefault(_prefixSelector);

var _wrapWithVariants = require('../util/wrapWithVariants');

var _wrapWithVariants2 = _interopRequireDefault(_wrapWithVariants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles]);
  }

  return _lodash2.default.flatMap(styles, style => style instanceof _node2.default ? style : (0, _parseObjectStyles2.default)(style));
}