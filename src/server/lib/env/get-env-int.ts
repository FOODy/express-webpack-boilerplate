import getEnvPattern from './get-env-pattern';
import getEnvDefaultValue from './get-env-default-value';

const reInt = /^\d+$/;

export default function getEnvInt(name: string, defaultValue?: number): number {
  const rawValue = getEnvPattern(name, reInt, '');

  if (rawValue === '') {
    return getEnvDefaultValue(name, defaultValue);
  }

  return parseInt(rawValue, 10);
}