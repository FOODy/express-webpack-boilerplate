import {DocumentNode} from 'graphql';
import GraphqlContext from './graphql-context';
import {flatten, isArray, merge} from 'lodash';
import {Resolvers} from '../../generated/graphql-server-types.generated';
import {IResolvers} from 'graphql-tools';

const registeredTypeDefs: DocumentNode[][] = [];
const registeredResolvers: Resolvers[] = [];

export function addGraphqlTypeDefs(typeDefs: DocumentNode | DocumentNode[]): void {
  registeredTypeDefs.push(isArray(typeDefs) ? typeDefs : [typeDefs]);
}

export function addGraphqlResolvers(resolvers: Resolvers): void {
  registeredResolvers.push(resolvers);
}

export function getGraphqlTypeDefs(): DocumentNode[] {
  return flatten(registeredTypeDefs);
}

export function getGraphqlResolvers(): IResolvers<any, GraphqlContext> {
  return merge(registeredResolvers);
}