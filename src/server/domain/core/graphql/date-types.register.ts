import {registerGraphqlTypes} from '../../../lib/graphql/graphql-schema-builder';
import {GraphQLDate, GraphQLDateTime, GraphQLTime} from 'graphql-iso-date';
import DateTypesSchema from './date-types.graphqls';

registerGraphqlTypes(DateTypesSchema, {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
});