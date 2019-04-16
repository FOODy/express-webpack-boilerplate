import {DocumentNode} from 'graphql';
import GraphqlContext from './graphql-context';
import {flatten, isArray, merge} from 'lodash';
import Schema from './schema.graphqls';
import {Resolvers} from '../../generated/graphql-server-types.generated';
import {IResolvers} from 'graphql-tools';

const registeredTypeDefs: DocumentNode[][] = [
  [Schema],
];

const registeredResolvers: Resolvers[] = [];

export function registerGraphqlTypes(typeDefs: DocumentNode | DocumentNode[],
                                     resolvers: Resolvers): void {
  registeredTypeDefs.push(isArray(typeDefs) ? typeDefs : [typeDefs]);
  registeredResolvers.push(resolvers);
}

export function getGraphqlTypeDefs(): DocumentNode[] {
  return flatten(registeredTypeDefs);
}

export function getGraphqlResolvers(): IResolvers<any, GraphqlContext> {
  return merge(registeredResolvers);
}