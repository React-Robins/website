"use strict";

const _ = require(`lodash`);

const _require = require(`graphql`),
      GraphQLInt = _require.GraphQLInt,
      GraphQLList = _require.GraphQLList,
      GraphQLString = _require.GraphQLString,
      GraphQLEnumType = _require.GraphQLEnumType;

const _require2 = require(`graphql-skip-limit`),
      connectionArgs = _require2.connectionArgs,
      connectionDefinitions = _require2.connectionDefinitions,
      connectionFromArray = _require2.connectionFromArray;

const _require3 = require(`./data-tree-utils`),
      buildFieldEnumValues = _require3.buildFieldEnumValues;

module.exports = type => {
  const enumValues = buildFieldEnumValues({
    nodes: type.nodes,
    typeName: type.name
  });

  const _connectionDefinition = connectionDefinitions({
    name: _.camelCase(`${type.name} groupConnection`),
    nodeType: type.nodeObjectType,
    connectionFields: () => {
      return {
        field: {
          type: GraphQLString
        },
        fieldValue: {
          type: GraphQLString
        },
        totalCount: {
          type: GraphQLInt
        }
      };
    }
  }),
        groupConnection = _connectionDefinition.connectionType;

  return {
    totalCount: {
      type: GraphQLInt
    },
    distinct: {
      type: new GraphQLList(GraphQLString),
      args: {
        field: {
          type: new GraphQLEnumType({
            name: _.camelCase(`${type.name} distinct enum`),
            values: enumValues
          })
        }
      },

      resolve(connection, args) {
        let fieldName = args.field;

        if (_.includes(args.field, `___`)) {
          fieldName = args.field.replace(/___/g, `.`);
        }

        const fields = connection.edges.map(edge => _.get(edge.node, fieldName));
        return _.sortBy(_.filter(_.uniq(_.flatten(fields)), _.identity));
      }

    },
    group: {
      type: new GraphQLList(groupConnection),
      args: Object.assign({}, connectionArgs, {
        field: {
          type: new GraphQLEnumType({
            name: _.camelCase(`${type.name} group enum`),
            values: enumValues
          })
        }
      }),

      resolve(connection, args) {
        const fieldName = args.field.replace(/___/g, `.`);
        const connectionNodes = connection.edges.map(edge => edge.node);
        let groups = {}; // Do a custom grouping for arrays (w/ a group per array value)
        // Find the first node with this field and check if it's an array.

        if (_.isArray(_.get(_.find(connectionNodes, fieldName), fieldName))) {
          const values = _.uniq(_.reduce(connectionNodes, (vals, n) => {
            if (_.has(n, fieldName)) {
              return vals.concat(_.get(n, fieldName));
            } else {
              return vals;
            }
          }, []));

          values.forEach(val => {
            groups[val] = _.filter(connectionNodes, n => _.includes(_.get(n, fieldName), val));
          });
        } else {
          groups = _.groupBy(connectionNodes, fieldName);
        }

        const groupConnections = []; // Do default sort by fieldValue

        const sortedFieldValues = _.sortBy(_.keys(groups));

        _.each(sortedFieldValues, fieldValue => {
          const groupNodes = groups[fieldValue];
          const groupConn = connectionFromArray(groupNodes, args);
          groupConn.totalCount = groupNodes.length;
          groupConn.field = fieldName;
          groupConn.fieldValue = fieldValue;
          groupConnections.push(groupConn);
        });

        return groupConnections;
      }

    }
  };
};
//# sourceMappingURL=build-connection-fields.js.map