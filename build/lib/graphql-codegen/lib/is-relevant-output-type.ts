import {GraphQLInterfaceType, GraphQLObjectType} from 'graphql';

export default function isRelevantOutputType(type: any): type is GraphQLObjectType | GraphQLInterfaceType {
  const isOutputType = (
    (type instanceof GraphQLObjectType) ||
    (type instanceof GraphQLInterfaceType)
  );

  if (!isOutputType) {
    return false;
  }

  const isExcluded =
    type.name === 'Schema' ||
    type.name === 'Query' ||
    type.name === 'Subscription' ||
    type.name === 'Mutation' ||
    type.name.startsWith('__');

  return !isExcluded;
}