import { DocumentNode, DefinitionNode, GraphQLSchema, GraphQLResolveInfo, GraphQLFieldResolver } from 'graphql';
import { IExecutableSchemaDefinition, ILogger, IResolvers, ITypeDefinitions, ITypedef, IFieldIteratorFn, IResolverValidationOptions, IDirectiveResolvers, GraphQLParseOptions, IAddResolveFunctionsToSchemaOptions } from './Interfaces';
declare class SchemaError extends Error {
    message: string;
    constructor(message: string);
}
declare function makeExecutableSchema<TContext = any>({typeDefs, resolvers, connectors, logger, allowUndefinedInResolve, resolverValidationOptions, directiveResolvers, schemaDirectives, parseOptions, inheritResolversFromInterfaces}: IExecutableSchemaDefinition<TContext>): GraphQLSchema;
declare function concatenateTypeDefs(typeDefinitionsAry: ITypedef[], calledFunctionRefs?: any): string;
declare function buildSchemaFromTypeDefinitions(typeDefinitions: ITypeDefinitions, parseOptions?: GraphQLParseOptions): GraphQLSchema;
export declare function extractExtensionDefinitions(ast: DocumentNode): DocumentNode & {
    definitions: DefinitionNode[];
};
declare function forEachField(schema: GraphQLSchema, fn: IFieldIteratorFn): void;
declare const attachConnectorsToContext: Function;
declare function addSchemaLevelResolveFunction(schema: GraphQLSchema, fn: GraphQLFieldResolver<any, any>): void;
declare function addResolveFunctionsToSchema(options: IAddResolveFunctionsToSchemaOptions | GraphQLSchema, legacyInputResolvers?: IResolvers, legacyInputValidationOptions?: IResolverValidationOptions): void;
declare function assertResolveFunctionsPresent(schema: GraphQLSchema, resolverValidationOptions?: IResolverValidationOptions): void;
declare function addErrorLoggingToSchema(schema: GraphQLSchema, logger: ILogger): void;
declare function chainResolvers(resolvers: GraphQLFieldResolver<any, any>[]): (root: any, args: {
    [argName: string]: any;
}, ctx: any, info: GraphQLResolveInfo) => any;
declare function addCatchUndefinedToSchema(schema: GraphQLSchema): void;
declare function attachDirectiveResolvers(schema: GraphQLSchema, directiveResolvers: IDirectiveResolvers<any, any>): void;
export { makeExecutableSchema, SchemaError, forEachField, chainResolvers, addErrorLoggingToSchema, addResolveFunctionsToSchema, addCatchUndefinedToSchema, assertResolveFunctionsPresent, buildSchemaFromTypeDefinitions, addSchemaLevelResolveFunction, attachConnectorsToContext, concatenateTypeDefs, attachDirectiveResolvers };
