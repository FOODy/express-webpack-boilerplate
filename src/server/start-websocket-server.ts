import {createServer, Server} from 'http';
import {GraphQLSchema} from 'graphql';
import {PubSubEngine} from 'graphql-subscriptions';
import createGraphqlSubscriptionServer from './lib/graphql/create-graphql-subscription-server';

export interface WebsocketServerOptions {
  host: string;
  port: number;
  schema: GraphQLSchema;
  pubsub: PubSubEngine;
}

export default function startWebsocketServer({
                                               host,
                                               port,
                                               schema,
                                               pubsub,
                                             }: WebsocketServerOptions): Server {

  const server = createServer((_req, res) => {
    res.writeHead(404);
    res.end();
  });

  server.listen(port, () => {
    console.log(`Websocket Server is now running on http://${host}:${port}`);
  });

  createGraphqlSubscriptionServer(server, schema, pubsub);

  return server;
}