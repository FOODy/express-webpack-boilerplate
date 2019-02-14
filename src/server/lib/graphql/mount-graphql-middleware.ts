import {Application, Request, Response} from 'express';
import {ApolloServer, PubSubEngine} from 'apollo-server-express';
import {PlaygroundRenderPageOptions} from 'apollo-server-core';
import createGraphqlFieldResolver from './create-graphql-field-resolver';
import {GraphQLSchema} from 'graphql';
import {APP_HOST, APP_WS_PORT} from '../../env';
import GraphqlContext from './graphql-context';
import {GRAPHQL_ENDPOINT_URL} from '../../../common/config';

export default function mountGraphqlMiddleware(app: Application,
                                               schema: GraphQLSchema,
                                               pubsub: PubSubEngine): void {
  const server = new ApolloServer({
    schema: schema,
    debug: process.env.NODE_ENV !== 'production',
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV === 'production' ? false : {
      settings: {
        'request.credentials': 'same-origin',
      },
      subscriptionEndpoint: `http://${APP_HOST}:${APP_WS_PORT}${GRAPHQL_ENDPOINT_URL}`,
    } as PlaygroundRenderPageOptions,

    context: (context: ApolloServerContext): GraphqlContext => ({
      request: context.req,
      pubsub: pubsub,
    }),

    fieldResolver: createGraphqlFieldResolver(),
  });

  server.applyMiddleware({
    app: app,
    path: GRAPHQL_ENDPOINT_URL,
  });
}

interface ApolloServerContext {
  req: Request;
  res: Response;
}