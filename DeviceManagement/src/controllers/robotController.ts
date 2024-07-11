import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IRobotService from '../services/IServices/IRobotService';
import { IRobotDTO } from '../dto/IRobotDTO';
import IRobotController from './IControllers/IRobotController';


@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
  ) {}
 
  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;
        
      if (robotOrError.isFailure) {
        return res.json( robotOrError ).status(402);
      }

      const robotDTO = robotOrError.getValue();
      return res.json( robotDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
  public async listRobotsByRobotType(req: Request, res: Response, next: NextFunction) {
    try{
      let robotTypeId = req.params.id

      const robotOrError = await this.robotServiceInstance.listRobotsByRobotType(robotTypeId) as Result<Array<IRobotDTO>>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotsDTO = robotOrError.getValue();
      return res.json( robotsDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  public async listRobots (req: Request, res: Response, next: NextFunction) {
    try {
			const robotsOrError = (await this.robotServiceInstance.listRobots()) as Result<IRobotDTO[]>;

			if (robotsOrError.isFailure) {
				return res.status(402).json(robotsOrError.error);
			}

			const robotsDTO = robotsOrError.getValue();
			return res.status(201).json(robotsDTO);
		} catch (e) {
			return next(e);
		}
  }

  public async deactivateRobot (req: Request, res: Response, next: NextFunction) {
    try {
      console.log("cntrl")
			const robotsOrError = (await this.robotServiceInstance.deactivateRobot(req.body as IRobotDTO)) as Result<boolean>;
      
			if (robotsOrError.isFailure) {
				return res.status(402).json(robotsOrError.error);
			}

			const robotsDTO = robotsOrError.getValue();
			return res.status(201).json(robotsDTO);
		} catch (e) {
			return next(e);
		}
  }

}