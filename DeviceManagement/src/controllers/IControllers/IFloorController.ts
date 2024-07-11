import { Request, Response, NextFunction } from 'express';

export default interface IFloorController  {
  createFloor(req: Request, res: Response, next: NextFunction);
  listFloorsByBuilding(req: Request, res: Response, next: NextFunction);
  updateFloor(req: Request, res: Response, next: NextFunction);
  listBuildingsByMaxMin(req: Request, res: Response, next: NextFunction);
  listFloorWithPassages(req: Request, res: Response, next: NextFunction);
  listFloors(req: Request, res: Response, next: NextFunction);
  loadMap(req: Request, res: Response, next: NextFunction);
}