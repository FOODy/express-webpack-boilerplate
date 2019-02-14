import {ApolloClient, ApolloQueryResult, QueryOptions} from 'apollo-client';
import {DocumentNode} from 'graphql';

export type QueryFunction<Result, Variables> =
  (client: ApolloClient<any>, options: Omit<QueryOptions<Variables>, 'query'>) => Promise<ApolloQueryResult<Result>>;

export default function makeQueryFunction<Result, Variables>(query: DocumentNode): QueryFunction<Result, Variables> {
  return (client, options) => client.query<Result, Variables>({ ...options, query });
}