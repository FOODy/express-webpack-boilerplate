"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.plugin = (_schema, documents, _config, info) => {
    const outputDir = path_1.dirname((info && info.outputFile) || process.cwd());
    const imports = [];
    const queries = [];
    const mutations = [];
    const subscriptions = [];
    for (const document of documents) {
        const referencedOperations = [];
        for (const definition of document.content.definitions) {
            if (definition.kind !== 'OperationDefinition') {
                continue;
            }
            const name = definition.name.value;
            switch (definition.operation) {
                case 'query':
                    referencedOperations.push(name);
                    queries.push({
                        name: name,
                        path: document.filePath,
                        resultType: `Types.${name}Query`,
                        variablesType: `Types.${name}QueryVariables`,
                    });
                    break;
                case 'mutation':
                    referencedOperations.push(name);
                    mutations.push({
                        name: name,
                        path: document.filePath,
                        resultType: `Types.${name}Mutation`,
                        variablesType: `Types.${name}MutationVariables`,
                    });
                    break;
                case 'subscription':
                    referencedOperations.push(name);
                    subscriptions.push({
                        name: name,
                        path: document.filePath,
                        resultType: `Types.${name}Subscription`,
                        variablesType: `Types.${name}SubscriptionVariables`,
                    });
                    break;
            }
        }
        if (referencedOperations.length) {
            imports.push({
                selection: `{${referencedOperations.join(', ')}}`,
                path: document.filePath,
            });
        }
    }
    const configImports = [
        queries.length > 0 && 'createQuery',
        mutations.length > 0 && 'createMutation',
        subscriptions.length > 0 && 'createSubscription',
    ]
        .filter((v) => !!v)
        .join(', ');
    const lines = [];
    //
    // Imports
    //
    if (configImports) {
        lines.push(`import {${configImports}} from './graphql-queries-config';`);
    }
    lines.push(`import * as Types from './graphql-client-types.generated';`);
    for (const { selection, path } of imports) {
        lines.push(`import ${selection} from '${path_1.relative(outputDir, path)}';`);
    }
    lines.push('');
    //
    // Queries
    //
    lines.push('export const Queries = {');
    for (const query of queries) {
        lines.push(`\t${query.name}: createQuery<${query.resultType}, ${query.variablesType}>(${query.name}),`);
    }
    lines.push('} as const;');
    lines.push('');
    //
    // Mutations
    //
    lines.push('export const Mutations = {');
    for (const mut of mutations) {
        lines.push(`\t${mut.name}: createMutation<${mut.resultType}, ${mut.variablesType}>(${mut.name}),`);
    }
    lines.push('} as const;');
    lines.push('');
    //
    // Subscriptions
    //
    lines.push('export const Subscriptions = {');
    for (const sub of subscriptions) {
        lines.push(`\t${sub.name}: createSubscription<${sub.resultType}, ${sub.variablesType}>(${sub.name}),`);
    }
    lines.push('} as const;');
    lines.push('');
    return lines.join('\n');
};
