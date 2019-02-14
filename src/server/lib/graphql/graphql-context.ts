import {PubSubEngine} from 'graphql-subscriptions';
import {IncomingMessage} from 'http';

export default interface GraphqlContext {
  request: IncomingMessage;
  pubsub: PubSubEngine;
}