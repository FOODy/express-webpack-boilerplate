import session, {MemoryStore, Store} from 'express-session';
import ConnectRedis from 'connect-redis';

export default function createSessionStore(): Store | MemoryStore {
  const RedisStore = ConnectRedis(session);

  return new RedisStore({});
}