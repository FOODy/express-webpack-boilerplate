import {ApolloClient, SubscriptionOptions} from 'apollo-client';
import {DocumentNode} from 'graphql';
import {Observable} from 'apollo-client/util/Observable';

export type SubscribeFunction<Result, Variables> =
  (client: ApolloClient<any>,
   options: Omit<SubscriptionOptions<Variables>, 'query'>) => Observable<Result>;

export default function makeSubscribeFunction<Result, Variables>(query: DocumentNode): SubscribeFunction<Result, Variables> {
  return (client, options) => client.subscribe<Result, Variables>({ ...options, query });
}