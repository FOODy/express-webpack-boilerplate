import {GraphQLFieldResolver} from 'graphql';

export default function createGraphqlFieldResolver(): GraphQLFieldResolver<any, any> {
  return (value, _args, _context, info) => {
    return value != null ? value[info.fieldName] : null;
  };
}