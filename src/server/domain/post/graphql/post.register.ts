import {registerGraphqlTypes} from '../../../lib/graphql/graphql-schema-builder';
import {createPost, deletePost, getPost, getPosts, updatePost} from '../post';
import {withFilter} from 'graphql-subscriptions';
import PostSchema from './post.graphqls';
import {MutationType} from '../../../../common/generated/graphql-client-types.generated';

registerGraphqlTypes(PostSchema, {
  Query: {
    getPost: (_, args) => getPost(args.id),
    getPosts: () => getPosts(),
  },

  Mutation: {
    createPost: async (_, args, { pubsub }) => {
      const post = createPost(args.title, args.text);

      await pubsub.publish(POST_CHANGED, { odd: (odd = !odd), data: { type: MutationType.CREATED, post } });

      return post;
    },

    updatePost: async (_, args, { pubsub }) => {
      const post = updatePost(args.id, args.title, args.text);

      await pubsub.publish(POST_CHANGED, { odd: (odd = !odd), data: { type: MutationType.UPDATED, post } });

      return post;
    },

    deletePost: async (_, args, { pubsub }) => {
      const post = deletePost(args.id);

      await pubsub.publish(POST_CHANGED, { odd: (odd = !odd), data: { type: MutationType.DELETED, post } });

      return post;
    },
  },

  Subscription: {
    watchPostChanges: {
      resolve: (payload) => payload.data,
      subscribe: withFilter(
        (_source, _args, { pubsub }) => pubsub.asyncIterator(POST_CHANGED),
        (payload, args) => {
          if (args.oddOnly && !payload.odd) {
            return false;
          }

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

let odd = false;