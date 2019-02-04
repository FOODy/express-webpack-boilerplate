import path from 'path';
import {trim} from 'lodash';

export const APP_BUILD_DIR = path.resolve(__dirname, '..');
export const APP_ROOT_DIR = path.resolve(APP_BUILD_DIR, '..');
export const APP_PUBLIC_DIR = path.join(APP_BUILD_DIR, 'public');
export const APP_RESOURCES_DIR = path.join(APP_ROOT_DIR, 'resources');

export const APP_HOST = ensureString('APP_HOST');
export const APP_PORT = ensureNumber('APP_PORT');

// Session
export const APP_SESSION_SECRET = ensureString('APP_SESSION_SECRET');
export const APP_SESSION_NAME = 'sid';
export const APP_SESSION_MAX_AGE = 4 * 7 * 24 * 3600 * 1000; // 4 weeks


function ensureString(name: string): string {
  const value = process.env[name];

  if (value != null && trim(value) !== '') {
    return value;
  }

  throw new Error(`ERROR: Missing env "${name}".`);
}

function ensureNumber(name: string): number {
  const value = parseInt(ensureString(name), 10);

  if (isNaN(value)) {
    throw new Error(`ERROR: Env "${name}" is not a number.`);
  }

  return value;
}