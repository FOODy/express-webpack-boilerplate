import path from 'path';
import getEnvString from './lib/env/get-env-string';
import getEnvInt from './lib/env/get-env-int';

export const APP_BUILD_DIR = path.resolve(__dirname, '..');
export const APP_ROOT_DIR = path.resolve(APP_BUILD_DIR, '..');
export const APP_PUBLIC_DIR = path.join(APP_BUILD_DIR, 'public');
export const APP_RESOURCES_DIR = path.join(APP_ROOT_DIR, 'resources');

export const APP_HOST = getEnvString('APP_HOST', 'localhost');
export const APP_HTTP_PORT = getEnvInt('APP_HTTP_PORT', 8080);
export const APP_WS_PORT = getEnvInt('APP_WS_PORT', 5000);

// Session
export const APP_SESSION_SECRET = getEnvString('APP_SESSION_SECRET');
export const APP_SESSION_NAME = getEnvString('APP_SESSION_NAME', 'sid');
export const APP_SESSION_MAX_AGE = getEnvInt('APP_SESSION_MAX_AGE', 4 * 7 * 24 * 3600 * 1000 /* 4 weeks*/);