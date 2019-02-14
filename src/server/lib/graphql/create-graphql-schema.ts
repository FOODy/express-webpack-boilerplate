import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-tools';
import {getGraphqlResolvers, getGraphqlTypeDefs} from './graphql-schema-builder';

export default function createGraphqlSchema(): GraphQLSchema {
  return makeExecutableSchema({
    typeDefs: getGraphqlTypeDefs(),
    resolvers: getGraphqlResolvers(),
  });
}