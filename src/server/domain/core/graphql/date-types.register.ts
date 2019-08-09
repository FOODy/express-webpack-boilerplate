import {addGraphqlResolvers} from '../../../lib/graphql/graphql-schema-builder';
import {GraphQLDate, GraphQLDateTime, GraphQLTime} from 'graphql-iso-date';

addGraphqlResolvers({
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
});