import {DocumentNode} from 'graphql';
import {IResolvers} from 'graphql-tools';
import GraphqlContext from './graphql-context';
import {flatten, isArray, merge} from 'lodash';
import Schema from './schema.graphqls';

const registeredTypeDefs: DocumentNode[][] = [
  [Schema],
];

const registeredResolvers: IResolvers<any, GraphqlContext>[] = [];

export function registerGraphqlTypes(typeDefs: DocumentNode | DocumentNode[],
                                     resolvers: IResolvers<any, GraphqlContext>): void {
  registeredTypeDefs.push(isArray(typeDefs) ? typeDefs : [typeDefs]);
  registeredResolvers.push(resolvers);
}

export function getGraphqlTypeDefs(): DocumentNode[] {
  return flatten(registeredTypeDefs);
}

export function getGraphqlResolvers(): IResolvers<any, GraphqlContext> {
  return merge(registeredResolvers);
}