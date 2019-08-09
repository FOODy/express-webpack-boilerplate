import {getNamedType, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLType} from 'graphql';

export function plugin(schema: GraphQLSchema) {
  const queryCacheRedirects = [];
  const queryFields = (schema.getType('Query') as GraphQLObjectType).getFields();

  for (const fieldName of Object.keys(queryFields)) {
    const field = queryFields[fieldName];

    if (field.args.length !== 1 || field.args[0].name !== 'id') {
      continue;
    }

    if (!isObjectType(field.type)) {
      continue;
    }

    const type = getNamedType(field.type);

    queryCacheRedirects.push(
      `\t\t${field.name}: (_: any, args: any, { getCacheKey }: any) => ` +
      `getCacheKey({ __typename: '${type.name}', id: args.id }),`,
    );
  }

  const lines = [];

  lines.push('export const CacheRedirects = {');
  lines.push('\tQuery: {');
  lines.push(queryCacheRedirects.join('\n'));
  lines.push('\t},');
  lines.push('};');

  return lines.join('\n');
}

function isObjectType(type: GraphQLType) {
  if (type instanceof GraphQLObjectType) {
    return true;
  }

  return (
    type instanceof GraphQLNonNull &&
    type.ofType instanceof GraphQLObjectType
  );
}