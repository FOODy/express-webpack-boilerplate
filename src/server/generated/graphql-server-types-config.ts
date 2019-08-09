import GraphqlContext from '../lib/graphql/graphql-context';
import {Post} from '../domain/post/post-storage';

export type DefaultMapperType<_T> = any;

export {GraphqlContext as ContextType};

/**
 * Map GraphQL types to internal types in resolvers (e.g. Database records)
 * Should be in sync with the mappers-configuration in `graphql.codegen.yml`.
 *
 * @see graphql.codegen.yml
 */
export interface ResolversTypes {
  Post: Post;
}