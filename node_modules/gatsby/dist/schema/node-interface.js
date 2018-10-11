"use strict";

exports.__esModule = true;
exports.nodeInterface = void 0;

var _graphql = require("graphql");

const nodeInterface = new _graphql.GraphQLInterfaceType({
  name: `Node`,
  description: `An object with an id, parent, and children`,
  fields: () => {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
        description: `The id of the node.`
      },
      parent: {
        type: nodeInterface,
        description: `The parent of this node.`
      },
      children: {
        type: new _graphql.GraphQLList(nodeInterface),
        description: `The children of this node.`
      }
    };
  }
});
exports.nodeInterface = nodeInterface;
//# sourceMappingURL=node-interface.js.map