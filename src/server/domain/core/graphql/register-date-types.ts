import {registerGraphqlTypes} from '../../../lib/graphql/graphql-schema-builder';
import gql from 'graphql-tag';
import {GraphQLDate, GraphQLDateTime, GraphQLTime} from 'graphql-iso-date';

registerGraphqlTypes(
  gql`
    scalar Date
    scalar DateTime
    scalar Time
  `,
  {
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
    Time: GraphQLTime,
  },
);