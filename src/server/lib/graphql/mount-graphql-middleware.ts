import {Application, Request, Response} from 'express';
import {ApolloServer} from 'apollo-server-express';
import {PlaygroundRenderPageOptions} from 'apollo-server-core';
import createGraphqlContext from './create-graphql-context';
import createGraphqlFieldResolver from './create-graphql-field-resolver';
import {GraphQLSchema} from 'graphql';

export default function mountGraphqlMiddleware(app: Application,
                                               path: string,
                                               schema: GraphQLSchema): void {
  const server = new ApolloServer({
    schema: schema,
    debug: process.env.NODE_ENV !== 'production',
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV === 'production' ? false : {
      settings: {
        'request.credentials': 'same-origin',
      },
    } as PlaygroundRenderPageOptions,

    context: ({ req, res }: { req: Request, res: Response }) => createGraphqlContext(req, res),

    fieldResolver: createGraphqlFieldResolver(),
  });

  server.applyMiddleware({
    app: app,
    path: path,
  });
}