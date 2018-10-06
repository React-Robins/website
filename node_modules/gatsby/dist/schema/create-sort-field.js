"use strict";

const _require = require(`graphql`),
      GraphQLInputObjectType = _require.GraphQLInputObjectType,
      GraphQLList = _require.GraphQLList,
      GraphQLEnumType = _require.GraphQLEnumType,
      GraphQLNonNull = _require.GraphQLNonNull;

const _ = require(`lodash`);

const createKey = require(`./create-key`); // builds an input field for sorting, given an array of names to sort on


module.exports = function createSortField(typeName, fieldNames) {
  const enumValues = {};
  fieldNames.forEach(field => {
    enumValues[createKey(field)] = {
      value: field
    };
  });
  const SortByType = new GraphQLEnumType({
    name: `${typeName}SortByFieldsEnum`,
    values: enumValues
  });
  return {
    type: new GraphQLInputObjectType({
      name: _.camelCase(`${typeName} sort`),
      fields: {
        fields: {
          name: _.camelCase(`${typeName} sortFields`),
          type: new GraphQLNonNull(new GraphQLList(SortByType))
        },
        order: {
          name: _.camelCase(`${typeName} sortOrder`),
          defaultValue: `ASC`,
          type: new GraphQLEnumType({
            name: _.camelCase(`${typeName} sortOrderValues`),
            values: {
              ASC: {
                value: `asc`
              },
              DESC: {
                value: `desc`
              }
            }
          })
        }
      }
    })
  };
};
//# sourceMappingURL=create-sort-field.js.map