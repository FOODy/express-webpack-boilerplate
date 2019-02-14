import {ApolloClient, MutationOptions} from 'apollo-client';
import {DocumentNode} from 'graphql';
import {FetchResult} from 'apollo-link';

export type MutateFunction<Result, Variables> =
  (client: ApolloClient<any>,
   options: Omit<MutationOptions<Result, Variables>, 'mutation'>) => Promise<FetchResult<Result>>;

export default function CreatePostmakeMutateFunction<Result, Variables>(mutation: DocumentNode): MutateFunction<Result, Variables> {
  return (client, options) => client.mutate<Result, Variables>({ ...options, mutation });
}