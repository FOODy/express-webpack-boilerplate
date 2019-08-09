import {addGraphqlTypeDefs} from './graphql-schema-builder';

export default function requireGraphqlSchemaFiles() {
  const schemaModules = require.context('../..', true, /\.graphqls$/);

  schemaModules.keys().forEach((moduleId) => {
    const typeDefs = schemaModules(moduleId);

    addGraphqlTypeDefs(typeDefs);
  });
}