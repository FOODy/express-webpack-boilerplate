import {trim} from 'lodash';
import getEnvDefaultValue from './get-env-default-value';

export default function getEnvPattern(name: string, pattern: RegExp, defaultValue?: string): string {
  const value = process.env[name];

  if (value != null && trim(value) !== '') {
    if (!pattern.test(value)) {
      throw new Error(`ERROR: "${name}" is invalid. (Pattern: ${pattern.source})`);
    }

    return value;
  }

  return getEnvDefaultValue(name, defaultValue);
}