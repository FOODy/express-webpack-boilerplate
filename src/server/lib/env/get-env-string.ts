import {trim} from 'lodash';
import getEnvDefaultValue from './get-env-default-value';

export default function getEnvString(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (value != null && trim(value) !== '') {
    return value;
  }

  return getEnvDefaultValue(name, defaultValue);
}
