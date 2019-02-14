import {RequestHandler} from 'express';
import session from 'express-session';
import {APP_SESSION_MAX_AGE, APP_SESSION_NAME, APP_SESSION_SECRET} from '../../env';
import createSessionStore from './create-session-store';

export default function createSessionRequestHandler(): RequestHandler {
  return session({
    name: APP_SESSION_NAME,
    store: createSessionStore(),
    secret: APP_SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: APP_SESSION_MAX_AGE,
    },
  });
}