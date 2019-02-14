import './polyfills';
import './domain';
import express from 'express';
import {APP_HOST, APP_PORT} from './env';
import createGraphqlSchema from './lib/graphql/create-graphql-schema';
import mountGraphqlMiddleware from './lib/graphql/mount-graphql-middleware';
import mountStaticServeMiddleware from './lib/static/mount-static-serve-middleware';
import createSessionRequestHandler from './lib/session/create-session-request-handler';

const app = express();
const graphqlSchema = createGraphqlSchema();

app.use(createSessionRequestHandler());

mountGraphqlMiddleware(app, '/api/graphql', graphqlSchema);
mountStaticServeMiddleware(app);

//
// Start server
//
app.listen(APP_PORT, () => {
  console.log('Listening: http://' + APP_HOST + ':' + APP_PORT);
});