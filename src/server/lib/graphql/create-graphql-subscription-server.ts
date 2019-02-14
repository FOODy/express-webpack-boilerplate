import {Server} from 'http';
import GraphqlContext from './graphql-context';
import {ConnectionContext, SubscriptionServer} from 'subscriptions-transport-ws';
import WebSocket from 'ws';
import {PubSubEngine} from 'graphql-subscriptions';
import {execute, GraphQLSchema, subscribe} from 'graphql';
import {GRAPHQL_ENDPOINT_URL} from '../../../common/config';

export default function createGraphqlSubscriptionServer(wsServer: Server,
                                                        schema: GraphQLSchema,
                                                        pubsub: PubSubEngine): SubscriptionServer {
  function onConnect(_connectionParams: unknown,
                     _webSocket: WebSocket,
                     { request }: ConnectionContext): GraphqlContext {
    return {
      request: request,
      pubsub: pubsub,
    };
  }

  return SubscriptionServer.create({
    schema: schema,
    execute: execute,
    subscribe: subscribe,
    onConnect: onConnect,
  }, {
    server: wsServer,
    path: GRAPHQL_ENDPOINT_URL,
  });
}