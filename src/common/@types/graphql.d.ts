declare global {
  declare module '*.graphql' {
    import {DocumentNode} from 'graphql';

    const Document: DocumentNode;

    export default Document;
  }
}