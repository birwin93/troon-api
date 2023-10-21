import { GraphQLScalarType } from 'graphql/type/definition';

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function validate(uuid: unknown): string | never {
  if (typeof uuid !== 'string' || !regex.test(uuid)) {
    throw new Error('invalid UUID');
  }
  return uuid;
}

export const GraphQLUUID = new GraphQLScalarType({
  name: 'UUID',
  description: 'A simple UUID parser',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  // @ts-ignore
  parseLiteral: (ast) => validate(ast.value),
});
