"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function isRelevantOutputType(type) {
    const isOutputType = ((type instanceof graphql_1.GraphQLObjectType) ||
        (type instanceof graphql_1.GraphQLInterfaceType));
    if (!isOutputType) {
        return false;
    }
    const isExcluded = type.name === 'Schema' ||
        type.name === 'Query' ||
        type.name === 'Subscription' ||
        type.name === 'Mutation' ||
        type.name.startsWith('__');
    return !isExcluded;
}
exports.default = isRelevantOutputType;
