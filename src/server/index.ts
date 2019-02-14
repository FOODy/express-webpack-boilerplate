import './bootstrap';
import createGraphqlSchema from './lib/graphql/create-graphql-schema';
import createGraphqlPubSub from './lib/graphql/create-graphql-pub-sub';
import startHttpServer from './start-http-server';
import startWebsocketServer from './start-websocket-server';
import {APP_HOST, APP_HTTP_PORT, APP_WS_PORT} from './env';

const schema = createGraphqlSchema();
const pubsub = createGraphqlPubSub();

startHttpServer({
  host: APP_HOST,
  port: APP_HTTP_PORT,
  schema,
  pubsub,
});

startWebsocketServer({
  host: APP_HOST,
  port: APP_WS_PORT,
  schema,
  pubsub,
});