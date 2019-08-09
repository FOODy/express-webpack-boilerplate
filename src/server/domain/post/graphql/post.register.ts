import {addGraphqlResolvers} from '../../../lib/graphql/graphql-schema-builder';
import {createPost, deletePost, getPost, getPosts, updatePost} from '../post-storage';
import {withFilter} from 'graphql-subscriptions';
import {MutationType} from '../../../../common/generated/graphql-client-types.generated';
import {UserInputError} from 'apollo-server-errors';

addGraphqlResolvers({
  Query: {
    getPost: (_, args) => {
      const post = getPost(args.id);

      if (post == null) {
        throw new UserInputError('Post not found.');
      }

      return post;
    },

    getPosts: () => getPosts(),
  },

  Mutation: {
    createPost: async (_, args, { pubsub }) => {
      const post = createPost(args.title, args.text);

      await pubsub.publish(POST_CHANGED, { type: MutationType.CREATED, post });

      return post;
    },

    updatePost: async (_, args, { pubsub }) => {
      const post = updatePost(args.id, args.title, args.text);

      await pubsub.publish(POST_CHANGED, { type: MutationType.UPDATED, post });

      return post;
    },

    deletePost: async (_, args, { pubsub }) => {
      const post = deletePost(args.id);

      await pubsub.publish(POST_CHANGED, { type: MutationType.DELETED, post });

      return post;
    },
  },

  Subscription: {
    watchPostChanges: {
      resolve: (payload) => payload,
      subscribe: withFilter(
        (_source, _args, { pubsub }) => pubsub.asyncIterator(POST_CHANGED),
        (payload, args) => {
          if (args.types && !args.types.includes(payload.data.type)) {
            return false;
          }

          return true;
        },
      ),
    },
  },
});

const POST_CHANGED = 'POST_CHANGED';