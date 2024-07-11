import { Request, Response, NextFunction } from 'express';

export default interface ITypeOfTaskController  {
  createTypeOfTask(req: Request, res: Response, next: NextFunction);
}