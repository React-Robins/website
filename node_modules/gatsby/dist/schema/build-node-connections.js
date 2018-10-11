"use strict";

const _ = require(`lodash`);

const _require = require(`graphql-skip-limit`),
      connectionArgs = _require.connectionArgs,
      connectionDefinitions = _require.connectionDefinitions;

const _require2 = require(`graphql`),
      GraphQLInputObjectType = _require2.GraphQLInputObjectType;

const _require3 = require(`./infer-graphql-input-fields`),
      inferInputObjectStructureFromNodes = _require3.inferInputObjectStructureFromNodes;

const _require4 = require(`./infer-graphql-input-fields-from-fields`),
      inferInputObjectStructureFromFields = _require4.inferInputObjectStructureFromFields;

const createSortField = require(`./create-sort-field`);

const buildConnectionFields = require(`./build-connection-fields`);

const _require5 = require(`../redux`),
      getNodes = _require5.getNodes;

module.exports = types => {
  const connections = {};

  _.each(types, (type
  /* , fieldName*/
  ) => {
    // Don't create a connection for the Site node since there can only be one
    // of them.
    if (type.name === `Site`) {
      return;
    }

    const nodes = type.nodes;
    const typeName = `${type.name}Connection`;

    const _connectionDefinition = connectionDefinitions({
      nodeType: type.nodeObjectType,
      connectionFields: () => buildConnectionFields(type)
    }),
          typeConnection = _connectionDefinition.connectionType;

    const inferredInputFieldsFromNodes = inferInputObjectStructureFromNodes({
      nodes,
      typeName
    });
    const inferredInputFieldsFromPlugins = inferInputObjectStructureFromFields({
      fields: type.fieldsFromPlugins,
      typeName
    });

    const filterFields = _.merge({}, inferredInputFieldsFromNodes.inferredFields, inferredInputFieldsFromPlugins.inferredFields);

    const sortNames = inferredInputFieldsFromNodes.sort.concat(inferredInputFieldsFromPlugins.sort);
    const sort = createSortField(typeName, sortNames);
    connections[_.camelCase(`all ${type.name}`)] = {
      type: typeConnection,
      description: `Connection to all ${type.name} nodes`,
      args: Object.assign({}, connectionArgs, {
        sort,
        filter: {
          type: new GraphQLInputObjectType({
            name: _.camelCase(`filter ${type.name}`),
            description: `Filter connection on its fields`,
            fields: () => filterFields
          })
        }
      }),

      resolve(object, resolveArgs, b, {
        rootValue
      }) {
        let path;

        if (typeof rootValue !== `undefined`) {
          path = rootValue.path;
        }

        const runSift = require(`./run-sift`);

        const latestNodes = _.filter(getNodes(), n => n.internal.type === type.name);

        return runSift({
          args: resolveArgs,
          nodes: latestNodes,
          connection: true,
          path,
          typeName: typeName,
          type: type.node.type
        });
      }

    };
  });

  return connections;
};
//# sourceMappingURL=build-node-connections.js.map