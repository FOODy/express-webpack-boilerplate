import {Request, Response} from 'express';
import GraphqlContext from './graphql-context';

export default function createGraphqlContext(req: Request,
                                             res: Response): GraphqlContext {
  return {
    req,
    res,
  };
}