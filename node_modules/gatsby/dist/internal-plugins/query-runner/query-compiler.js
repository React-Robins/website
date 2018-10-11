"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = compile;
exports.Runner = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _graphql = require("graphql");

var _relayCompiler = require("relay-compiler");

var _RelayParser = _interopRequireDefault(require("relay-compiler/lib/RelayParser"));

var _ASTConvert = _interopRequireDefault(require("relay-compiler/lib/ASTConvert"));

var _GraphQLCompilerContext = _interopRequireDefault(require("relay-compiler/lib/GraphQLCompilerContext"));

var _filterContextForNode = _interopRequireDefault(require("relay-compiler/lib/filterContextForNode"));

var _redux = require("../../redux");

var _fileParser = _interopRequireDefault(require("./file-parser"));

var _GraphQLIRPrinter = _interopRequireDefault(require("relay-compiler/lib/GraphQLIRPrinter"));

var _graphqlErrors = require("./graphql-errors");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

const normalize = require(`normalize-path`);

const _ = require(`lodash`);

const printTransforms = _relayCompiler.IRTransforms.printTransforms;

const _require = require(`graphql`),
      ValuesOfCorrectTypeRule = _require.ValuesOfCorrectTypeRule,
      VariablesDefaultValueAllowedRule = _require.VariablesDefaultValueAllowedRule,
      FragmentsOnCompositeTypesRule = _require.FragmentsOnCompositeTypesRule,
      KnownTypeNamesRule = _require.KnownTypeNamesRule,
      LoneAnonymousOperationRule = _require.LoneAnonymousOperationRule,
      PossibleFragmentSpreadsRule = _require.PossibleFragmentSpreadsRule,
      ScalarLeafsRule = _require.ScalarLeafsRule,
      VariablesAreInputTypesRule = _require.VariablesAreInputTypesRule,
      VariablesInAllowedPositionRule = _require.VariablesInAllowedPositionRule;

const validationRules = [ValuesOfCorrectTypeRule, VariablesDefaultValueAllowedRule, FragmentsOnCompositeTypesRule, KnownTypeNamesRule, LoneAnonymousOperationRule, PossibleFragmentSpreadsRule, ScalarLeafsRule, VariablesAreInputTypesRule, VariablesInAllowedPositionRule];

class Runner {
  constructor(baseDir, fragmentsDir, schema) {
    (0, _defineProperty2.default)(this, "baseDir", void 0);
    (0, _defineProperty2.default)(this, "schema", void 0);
    (0, _defineProperty2.default)(this, "fragmentsDir", void 0);
    this.baseDir = baseDir;
    this.fragmentsDir = fragmentsDir;
    this.schema = schema;
  }

  reportError(message) {
    if (process.env.NODE_ENV === `production`) {
      _reporter.default.panic(`${_reporter.default.format.red(`GraphQL Error`)} ${message}`);
    } else {
      _reporter.default.log(`${_reporter.default.format.red(`GraphQL Error`)} ${message}`);
    }
  }

  compileAll() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let nodes = yield _this.parseEverything();
      return yield _this.write(nodes);
    })();
  }

  parseEverything() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      // FIXME: this should all use gatsby's configuration to determine parsable
      // files (and how to parse them)
      let files = _glob.default.sync(`${_this2.fragmentsDir}/**/*.+(t|j)s?(x)`, {
        nodir: true
      });

      files = files.concat(_glob.default.sync(`${_this2.baseDir}/**/*.+(t|j)s?(x)`, {
        nodir: true
      }));
      files = files.filter(d => !d.match(/\.d\.ts$/));
      files = files.map(normalize); // Ensure all page components added as they're not necessarily in the
      // pages directory e.g. a plugin could add a page component.  Plugins
      // *should* copy their components (if they add a query) to .cache so that
      // our babel plugin to remove the query on building is active (we don't
      // run babel on code in node_modules). Otherwise the component will throw
      // an error in the browser of "graphql is not defined".

      files = files.concat(Array.from(_redux.store.getState().components.keys(), c => normalize(c)));
      files = _.uniq(files);
      let parser = new _fileParser.default();
      return yield parser.parseFiles(files);
    })();
  }

  write(nodes) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const compiledNodes = new Map();
      const namePathMap = new Map();
      const nameDefMap = new Map();
      const documents = [];

      for (var _iterator = nodes.entries(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        let _ref2 = _ref,
            filePath = _ref2[0],
            doc = _ref2[1];
        let errors = (0, _graphql.validate)(_this3.schema, doc, validationRules);

        if (errors && errors.length) {
          _this3.reportError((0, _graphqlErrors.graphqlValidationError)(errors, filePath));

          return compiledNodes;
        }

        documents.push(doc);
        doc.definitions.forEach(def => {
          const name = def.name.value;
          namePathMap.set(name, filePath);
          nameDefMap.set(name, def);
        });
      }

      let compilerContext = new _GraphQLCompilerContext.default(_this3.schema);

      try {
        compilerContext = compilerContext.addAll(_ASTConvert.default.convertASTDocuments(_this3.schema, documents, validationRules, _RelayParser.default.transform.bind(_RelayParser.default)));
      } catch (error) {
        _this3.reportError((0, _graphqlErrors.graphqlError)(namePathMap, nameDefMap, error));

        return compiledNodes;
      } // relay-compiler v1.5.0 added "StripUnusedVariablesTransform" to
      // printTransforms. Unfortunately it currently doesn't detect variables
      // in input objects widely used in gatsby, and therefore removing
      // variable declaration from queries.
      // As a temporary workaround remove that transform by slicing printTransforms.


      const printContext = printTransforms.slice(0, -1).reduce((ctx, transform) => transform(ctx, _this3.schema), compilerContext);
      compilerContext.documents().forEach(node => {
        if (node.kind !== `Root`) return;
        const name = node.name;
        let filePath = namePathMap.get(name) || ``;

        if (compiledNodes.has(filePath)) {
          let otherNode = compiledNodes.get(filePath);

          _this3.reportError((0, _graphqlErrors.multipleRootQueriesError)(filePath, nameDefMap.get(name), otherNode && nameDefMap.get(otherNode.name)));

          return;
        }

        let text = (0, _filterContextForNode.default)(printContext.getRoot(name), printContext).documents().map(_GraphQLIRPrinter.default.print).join(`\n`);
        const query = {
          name,
          text,
          originalText: nameDefMap.get(name).text,
          path: filePath,
          isStaticQuery: nameDefMap.get(name).isStaticQuery,
          hash: nameDefMap.get(name).hash
        };

        if (query.isStaticQuery) {
          query.jsonName = `sq--` + _.kebabCase(`${_path.default.relative(_redux.store.getState().program.directory, filePath)}`);
        }

        compiledNodes.set(filePath, query);
      });
      return compiledNodes;
    })();
  }

}

exports.Runner = Runner;

function compile() {
  return _compile.apply(this, arguments);
}

function _compile() {
  _compile = (0, _asyncToGenerator2.default)(function* () {
    const _store$getState = _redux.store.getState(),
          program = _store$getState.program,
          schema = _store$getState.schema;

    const runner = new Runner(`${program.directory}/src`, `${program.directory}/.cache/fragments`, schema);
    const queries = yield runner.compileAll();
    return queries;
  });
  return _compile.apply(this, arguments);
}
//# sourceMappingURL=query-compiler.js.map