"use strict";

exports.__esModule = true;
exports.inferInputObjectStructureFromNodes = inferInputObjectStructureFromNodes;

const _require = require(`graphql`),
      GraphQLInputObjectType = _require.GraphQLInputObjectType,
      GraphQLBoolean = _require.GraphQLBoolean,
      GraphQLString = _require.GraphQLString,
      GraphQLFloat = _require.GraphQLFloat,
      GraphQLInt = _require.GraphQLInt,
      GraphQLList = _require.GraphQLList;

const _require2 = require(`common-tags`),
      oneLine = _require2.oneLine;

const _ = require(`lodash`);

const invariant = require(`invariant`);

const typeOf = require(`type-of`);

const createTypeName = require(`./create-type-name`);

const createKey = require(`./create-key`);

const _require3 = require(`./data-tree-utils`),
      getExampleValues = _require3.getExampleValues,
      extractFieldNames = _require3.extractFieldNames,
      isEmptyObjectOrArray = _require3.isEmptyObjectOrArray;

const _require4 = require(`./infer-graphql-type`),
      findLinkedNode = _require4.findLinkedNode;

const _require5 = require(`../redux`),
      getNodes = _require5.getNodes;

const is32BitInteger = require(`../utils/is-32-bit-integer`);

function typeFields(type) {
  switch (type) {
    case `boolean`:
      return {
        eq: {
          type: GraphQLBoolean
        },
        ne: {
          type: GraphQLBoolean
        },
        in: {
          type: new GraphQLList(GraphQLBoolean)
        },
        nin: {
          type: new GraphQLList(GraphQLBoolean)
        }
      };

    case `string`:
      return {
        eq: {
          type: GraphQLString
        },
        ne: {
          type: GraphQLString
        },
        regex: {
          type: GraphQLString
        },
        glob: {
          type: GraphQLString
        },
        in: {
          type: new GraphQLList(GraphQLString)
        },
        nin: {
          type: new GraphQLList(GraphQLString)
        }
      };

    case `int`:
      return {
        eq: {
          type: GraphQLInt
        },
        ne: {
          type: GraphQLInt
        },
        gt: {
          type: GraphQLInt
        },
        gte: {
          type: GraphQLInt
        },
        lt: {
          type: GraphQLInt
        },
        lte: {
          type: GraphQLInt
        },
        in: {
          type: new GraphQLList(GraphQLInt)
        },
        nin: {
          type: new GraphQLList(GraphQLInt)
        }
      };

    case `float`:
      return {
        eq: {
          type: GraphQLFloat
        },
        ne: {
          type: GraphQLFloat
        },
        gt: {
          type: GraphQLFloat
        },
        gte: {
          type: GraphQLFloat
        },
        lt: {
          type: GraphQLFloat
        },
        lte: {
          type: GraphQLFloat
        },
        in: {
          type: new GraphQLList(GraphQLFloat)
        },
        nin: {
          type: new GraphQLList(GraphQLFloat)
        }
      };
  }

  return {};
}

function inferGraphQLInputFields({
  value,
  nodes,
  prefix
}) {
  if (value == null || isEmptyObjectOrArray(value)) return null;

  switch (typeOf(value)) {
    case `array`:
      {
        const headValue = value[0];
        let headType = typeOf(headValue);
        if (headType === `number`) headType = is32BitInteger(headValue) ? `int` : `float`; // Determine type for in operator.

        let inType;

        switch (headType) {
          case `int`:
            inType = GraphQLInt;
            break;

          case `float`:
            inType = GraphQLFloat;
            break;

          case `date`:
          case `string`:
            inType = GraphQLString;
            break;

          case `boolean`:
            inType = GraphQLBoolean;
            break;

          case `array`:
          case `object`:
            {
              let inferredField = inferGraphQLInputFields({
                value: headValue,
                prefix,
                nodes
              });
              invariant(inferredField, `Could not infer graphQL type for value: ${JSON.stringify(Object.keys(headValue))}`);
              inType = inferredField.type;
              break;
            }

          default:
            invariant(false, oneLine`
              Could not infer an appropriate GraphQL input type
              for value: ${headValue} of type ${headType} along path: ${prefix}
            `);
        }

        let fields;

        if (headType === `object`) {
          fields = {
            elemMatch: {
              type: inType
            }
          };
        } else {
          fields = Object.assign({}, typeFields(headType), {
            in: {
              type: new GraphQLList(inType)
            }
          });
        }

        return {
          type: new GraphQLInputObjectType({
            name: createTypeName(`${prefix}QueryList`),
            fields
          })
        };
      }

    case `boolean`:
      {
        return {
          type: new GraphQLInputObjectType({
            name: createTypeName(`${prefix}QueryBoolean`),
            fields: typeFields(`boolean`)
          })
        };
      }

    case `date`:
    case `string`:
      {
        return {
          type: new GraphQLInputObjectType({
            name: createTypeName(`${prefix}QueryString`),
            fields: typeFields(`string`)
          })
        };
      }

    case `object`:
      {
        const fields = inferInputObjectStructureFromNodes({
          nodes,
          prefix,
          exampleValue: value
        }).inferredFields;

        if (!_.isEmpty(fields)) {
          return {
            type: new GraphQLInputObjectType({
              name: createTypeName(`${prefix}InputObject`),
              fields
            })
          };
        } else {
          return null;
        }
      }

    case `number`:
      {
        if (is32BitInteger(value)) {
          return {
            type: new GraphQLInputObjectType({
              name: createTypeName(`${prefix}QueryInteger`),
              fields: typeFields(`int`)
            })
          };
        } else {
          return {
            type: new GraphQLInputObjectType({
              name: createTypeName(`${prefix}QueryFloat`),
              fields: typeFields(`float`)
            })
          };
        }
      }

    default:
      return null;
  }
}

const EXCLUDE_KEYS = {
  parent: 1,
  children: 1
};

const recursiveOmitBy = (value, fn) => {
  if (_.isObject(value)) {
    if (_.isPlainObject(value)) {
      value = _.omitBy(value, fn);
    } else if (_.isArray(value)) {
      // don't mutate original value
      value = _.clone(value);
    }

    _.each(value, (v, k) => {
      value[k] = recursiveOmitBy(v, fn);
    });

    if (_.isEmpty(value)) {
      // don't return empty objects - gatsby doesn't support these
      return null;
    }
  }

  return value;
};

const linkedNodeCache = {};

function inferInputObjectStructureFromNodes({
  nodes,
  typeName = ``,
  prefix = ``,
  exampleValue = null
}) {
  const inferredFields = {};
  const isRoot = !prefix;
  prefix = isRoot ? typeName : prefix;

  if (exampleValue === null) {
    // typeName includes "Connection" string, which is not what we want,
    // so extract type from first node
    exampleValue = getExampleValues({
      nodes,
      typeName: nodes && nodes[0] && nodes[0].internal && nodes[0].internal.type
    });
  }

  _.each(exampleValue, (v, k) => {
    let value = v;
    let key = k; // Remove fields for traversing through nodes as we want to control
    // setting traversing up not try to automatically infer them.

    if (isRoot && EXCLUDE_KEYS[key]) return;

    if (_.includes(key, `___NODE`)) {
      // TODO: Union the objects in array
      const nodeToFind = _.isArray(value) ? value[0] : value;
      const linkedNode = findLinkedNode(nodeToFind); // Get from cache if found, else store into it

      if (linkedNodeCache[linkedNode.internal.type]) {
        value = linkedNodeCache[linkedNode.internal.type];
      } else {
        const relatedNodes = getNodes().filter(node => node.internal.type === linkedNode.internal.type);
        value = getExampleValues({
          nodes: relatedNodes,
          typeName: linkedNode.internal.type
        });
        value = recursiveOmitBy(value, (_v, _k) => _.includes(_k, `___NODE`));
        linkedNodeCache[linkedNode.internal.type] = value;
      }

      if (_.isArray(value)) {
        value = [value];
      }

      ;

      var _key$split = key.split(`___`);

      key = _key$split[0];
    }

    let field = inferGraphQLInputFields({
      nodes,
      value,
      prefix: `${prefix}${_.upperFirst(key)}`
    });
    if (field == null) return;
    inferredFields[createKey(key)] = field;
  }); // Add sorting (but only to the top level).


  let sort = [];

  if (typeName) {
    sort = extractFieldNames(nodes);
  }

  return {
    inferredFields,
    sort
  };
}
//# sourceMappingURL=infer-graphql-input-fields.js.map