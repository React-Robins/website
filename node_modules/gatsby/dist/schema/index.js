"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _ = require(`lodash`);

const _require = require(`graphql`),
      GraphQLSchema = _require.GraphQLSchema,
      GraphQLObjectType = _require.GraphQLObjectType;

const _require2 = require(`graphql-tools`),
      mergeSchemas = _require2.mergeSchemas;

const buildNodeTypes = require(`./build-node-types`);

const buildNodeConnections = require(`./build-node-connections`);

const _require3 = require(`../redux`),
      store = _require3.store;

const invariant = require(`invariant`);

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    parentSpan
  }) {
    const typesGQL = yield buildNodeTypes({
      parentSpan
    });
    const connections = buildNodeConnections(_.values(typesGQL)); // Pull off just the graphql node from each type object.

    const nodes = _.mapValues(typesGQL, `node`);

    invariant(!_.isEmpty(nodes), `There are no available GQL nodes`);
    invariant(!_.isEmpty(connections), `There are no available GQL connections`);
    const thirdPartySchemas = store.getState().thirdPartySchemas || [];
    const gatsbySchema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: `RootQueryType`,
        fields: Object.assign({}, connections, nodes)
      })
    });
    const schema = mergeSchemas({
      schemas: [gatsbySchema, ...thirdPartySchemas]
    });
    store.dispatch({
      type: `SET_SCHEMA`,
      payload: schema
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map