export function requireBrowserDomainModules() {
  const registerModules = require.context('.', true, /\.register\.ts$/);

  registerModules.keys().sort().forEach((key: string) => {
    registerModules(key);
  });
}