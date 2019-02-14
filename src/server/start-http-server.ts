import express from 'express';
import {Server} from 'http';
import {GraphQLSchema} from 'graphql';
import {PubSubEngine} from 'graphql-subscriptions';
import createSessionRequestHandler from './lib/session/create-session-request-handler';
import mountGraphqlMiddleware from './lib/graphql/mount-graphql-middleware';
import mountStaticServeMiddleware from './lib/assets/mount-static-serve-middleware';

export interface HttpServerOptions {
  host: string;
  port: number;
  schema: GraphQLSchema;
  pubsub: PubSubEngine;
}

export default function startHttpServer({
                                          host,
                                          port,
                                          schema,
                                          pubsub,
                                        }: HttpServerOptions): Server {
  const app = express();

  app.use(createSessionRequestHandler());

  mountGraphqlMiddleware(app, schema, pubsub);
  mountStaticServeMiddleware(app);

  return app.listen(port, () => {
    console.log(`HTTP Server is now running on http://${host}:${port}`);
  });
}