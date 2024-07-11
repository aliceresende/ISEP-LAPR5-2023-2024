import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
  createRobot(req: Request, res: Response, next: NextFunction);

  listRobots(req: Request, res: Response, next: NextFunction);

  deactivateRobot(req: Request, res: Response, next: NextFunction);

  listRobotsByRobotType(req: Request, res: Response, next: NextFunction);
}