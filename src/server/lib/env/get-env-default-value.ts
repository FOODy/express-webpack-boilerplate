import {isUndefined} from 'lodash';

export default function getEnvDefaultValue<T>(name: string, defaultValue: T | undefined): T {
  if (!isUndefined(defaultValue)) {
    return defaultValue;
  }

  throw new Error(`ERROR: Missing env "${name}".`);
}