import { Request, Response, NextFunction } from 'express';

export default interface IRobotTypeController  {
  createRobotType(req: Request, res: Response, next: NextFunction);
  listRobots (req: Request, res: Response, next: NextFunction);
  findByTaskVigilancia(req: Request, res: Response, next: NextFunction);  
  findByTaskPickUpDelivery(req: Request, res: Response, next: NextFunction);
}