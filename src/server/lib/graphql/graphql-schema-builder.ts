import {DocumentNode} from 'graphql';
import {IResolvers} from 'graphql-tools';
import GraphqlContext from './graphql-context';
import {flatten, isArray, merge} from 'lodash';
import gql from 'graphql-tag';

const registeredTypeDefs: DocumentNode[][] = [
  gql`
      type Query {
          _empty_: Boolean
      }

      type Mutation {
          _empty_: Boolean
      }

      type Subscription {
          _empty_: Boolean
      }
  `,
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