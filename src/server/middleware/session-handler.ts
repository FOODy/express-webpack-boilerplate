import {RequestHandler} from 'express';
import session from 'express-session';
import ConnectRedis from 'connect-redis';
import {APP_SESSION_MAX_AGE, APP_SESSION_NAME, APP_SESSION_SECRET} from '../env';

export default function sessionHandler(): RequestHandler {
  const RedisStore = ConnectRedis(session);

  return session({
    name: APP_SESSION_NAME,
    store: new RedisStore({}),
    secret: APP_SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: APP_SESSION_MAX_AGE,
    },
  });
}