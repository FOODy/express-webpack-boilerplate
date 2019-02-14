import {PubSubEngine} from 'graphql-subscriptions';
import {RedisPubSub} from 'graphql-redis-subscriptions';

export default function createGraphqlPubSub(): PubSubEngine {
  return new RedisPubSub();
}