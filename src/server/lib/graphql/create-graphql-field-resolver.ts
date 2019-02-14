import {GraphQLFieldResolver} from 'graphql';
import GraphqlContext from './graphql-context';

export default function createGraphqlFieldResolver(): GraphQLFieldResolver<any, GraphqlContext> {
  return (value, _args, _context, info) => {
    return value != null ? value[info.fieldName] : null;
  };
}