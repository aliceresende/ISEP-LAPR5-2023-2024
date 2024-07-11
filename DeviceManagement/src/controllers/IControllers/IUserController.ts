import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  createUser(req: Request, res: Response, next: NextFunction);
  deleteUser(req: Request, res: Response, next: NextFunction);
  activateUser(req: Request, res: Response, next: NextFunction);
  deactivateUser(req: Request, res: Response, next: NextFunction);
  getUsers(req: Request, res: Response, next: NextFunction);
  updateUser(req: Request, res: Response, next: NextFunction);
  getWaitingUsers(req: Request, res: Response, next: NextFunction);
}
