import * as Actions from './post-actions.graphql';
import makeQueryFunction from '../../../../common/lib/graphql/make-query-function';
import {
  CreatePost,
  DeletePost,
  GetAllPosts,
  UpdatePost,
  WatchPostChanges,
} from '../../../../common/generated/graphql-client-types.generated';
import makeMutateFunction from '../../../../common/lib/graphql/make-mutate-function';
import makeSubscribeFunction from '../../../../common/lib/graphql/make-subscribe-function';

export const getAllPosts =
  makeQueryFunction<GetAllPosts.GetPosts, GetAllPosts.Variables>(Actions.GetAllPosts);

export const createPost =
  makeMutateFunction<CreatePost.Mutation, CreatePost.Variables>(Actions.CreatePost);

export const updatePost =
  makeMutateFunction<UpdatePost.Mutation, UpdatePost.Variables>(Actions.UpdatePost);

export const deletePost =
  makeMutateFunction<DeletePost.Mutation, DeletePost.Variables>(Actions.DeletePost);

export const watchPostChanges =
  makeSubscribeFunction<WatchPostChanges.Subscription, WatchPostChanges.Variables>(Actions.WatchPostChanges);