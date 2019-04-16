import GraphqlContext from '../lib/graphql/graphql-context';
import {Post} from '../domain/post/post-storage';

export type DefaultMapperType<_T> = any;

export {
  Post,
  GraphqlContext as ContextType,
};