declare module '*.graphqls' {
  import {DocumentNode} from 'graphql';

  const Document: DocumentNode;

  export default Document;
}