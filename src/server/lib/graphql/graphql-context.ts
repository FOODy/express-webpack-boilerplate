import {Request, Response} from 'express';

export default interface GraphqlContext {
  req: Request;
  res: Response;
}