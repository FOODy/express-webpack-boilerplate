"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function plugin(schema) {
    const queryCacheRedirects = [];
    const queryFields = schema.getType('Query').getFields();
    for (const fieldName of Object.keys(queryFields)) {
        const field = queryFields[fieldName];
        if (field.args.length !== 1 || field.args[0].name !== 'id') {
            continue;
        }
        if (!isObjectType(field.type)) {
            continue;
        }
        const type = graphql_1.getNamedType(field.type);
        queryCacheRedirects.push(`\t\t${field.name}: (_: any, args: any, { getCacheKey }: any) => ` +
            `getCacheKey({ __typename: '${type.name}', id: args.id }),`);
    }
    const lines = [];
    lines.push('export const CacheRedirects = {');
    lines.push('\tQuery: {');
    lines.push(queryCacheRedirects.join('\n'));
    lines.push('\t},');
    lines.push('};');
    return lines.join('\n');
}
exports.plugin = plugin;
function isObjectType(type) {
    if (type instanceof graphql_1.GraphQLObjectType) {
        return true;
    }
    return (type instanceof graphql_1.GraphQLNonNull &&
        type.ofType instanceof graphql_1.GraphQLObjectType);
}
