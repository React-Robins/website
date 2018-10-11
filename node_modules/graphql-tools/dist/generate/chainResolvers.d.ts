import { GraphQLResolveInfo, GraphQLFieldResolver } from 'graphql';
declare function chainResolvers(resolvers: GraphQLFieldResolver<any, any>[]): (root: any, args: {
    [argName: string]: any;
}, ctx: any, info: GraphQLResolveInfo) => any;
export default chainResolvers;
