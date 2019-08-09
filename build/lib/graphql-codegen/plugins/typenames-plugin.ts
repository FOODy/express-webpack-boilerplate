import {GraphQLInterfaceType, GraphQLNamedType, GraphQLObjectType, GraphQLSchema} from 'graphql';
import isRelevantOutputType from '../lib/is-relevant-output-type';

export function plugin(schema: GraphQLSchema) {
  const typeMap = schema.getTypeMap();
  const relevantOutputTypes = Object.keys(typeMap).map((key) => typeMap[key]).filter(isRelevantOutputType);
  const lines = [];

  const generateTypename =
    ({
       name,
       types,
       isMain,
       generateSubTypes,
     }: {
      name: string,
      types: GraphQLNamedType[],
      isMain: boolean,
      generateSubTypes?: () => void,
    }) => {
      if (lines.length) {
        lines.push('');
      }

      //
      // Typename type
      //
      lines.push(`export type ${name} =`);

      for (const type of types) {
        lines.push(`  | '${type.name}'`);
      }

      lines.push('  ;');
      lines.push('');

      //
      // Typename namespace
      //
      lines.push(`export namespace ${name} {`);

      if (isMain) {
        for (const type of types) {
          lines.push(`export const ${type.name} = '${type.name}' as '${type.name}';`);
          lines.push(`export type ${type.name} = '${type.name}';`);

          lines.push('');
        }
      }

      lines.push(`export interface TypedValue<T extends ${name} = ${name}> {`);
      lines.push(`  __typename: T;`);
      lines.push('}');

      lines.push('');
      lines.push(`export const all: ${name}[] = [`);

      for (const type of types) {
        lines.push(`  ${type.name},`);
      }

      lines.push('];');

      lines.push('');
      lines.push(`export function is(value: any): value is ${name} {`);
      lines.push('  return value != null && all.includes(value);');
      lines.push('}');

      lines.push('');
      lines.push(`export function isTypedValue(value: any): value is TypedValue {`);
      lines.push('  return value != null && isPlainObject(value) && is(value.__typename);');
      lines.push('}');

      if (generateSubTypes) {
        generateSubTypes();
      }

      lines.push('}');
    };

  lines.push(`import {isPlainObject} from 'lodash';`);

  generateTypename({
    name: 'Typename',
    isMain: true,
    types: relevantOutputTypes.filter((type) => !(type instanceof GraphQLInterfaceType)),
    generateSubTypes: () => {
      const interfaceTypes = relevantOutputTypes.filter((type) => type instanceof GraphQLInterfaceType);

      for (const interfaceType of interfaceTypes) {
        generateTypename({
          name: interfaceType.name,
          isMain: false,
          types: relevantOutputTypes.filter((type) => {
            if (!(type instanceof GraphQLObjectType)) {
              return false;
            }

            return type.getInterfaces().some((other) => other.name === interfaceType.name);
          }),
        });
      }
    },
  });

  return lines.join('\n');
}