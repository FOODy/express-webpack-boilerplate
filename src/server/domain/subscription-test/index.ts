import {registerGraphqlTypes} from '../../lib/graphql/graphql-schema-builder';
import gql from 'graphql-tag';
import {createPost, deletePost, getPost, getPosts, updatePost} from './post';
import {withFilter} from 'graphql-subscriptions';

enum MutationType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED'
}

registerGraphqlTypes(
  gql`
    type Post {
      id: ID!
      title: String!
      text: String!
      createdAt: DateTime!
      createdBy: User
    }

    type User {
      id: String!
      name: String!
    }

    type PostMutation {
      type: MutationType!
      post: Post!
    }

    enum MutationType {
      CREATED
      UPDATED
      DELETED
    }

    extend type Query {
      getPosts: [Post!]!
      getPost(id: ID!): [Post!]!
    }

    extend type Mutation {
      createPost(title: String!, text: String!): Post!
      updatePost(id: ID!, title: String!, text: String!): Post!
      deletePost(id: ID!): Post!
    }

    extend type Subscription {
      postChanges(types: [MutationType!], oddOnly: Boolean): PostMutation!
    }
  `,
  {
    MutationType: {
      CREATED: MutationType.CREATED,
      UPDATED: MutationType.UPDATED,
      DELETED: MutationType.DELETED,
    },

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
      postChanges: {
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
  },
);

const POST_CHANGED = 'POST_CHANGED';

let odd = false;