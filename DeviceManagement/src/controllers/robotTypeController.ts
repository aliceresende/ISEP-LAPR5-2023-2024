import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import { IRobotTypeDTO } from '../dto/IRobotTypeDTO';
import IRobotTypeController from './IControllers/IRobotTypeController';


@Service()
export default class RobotTypeController implements IRobotTypeController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robotType.name) private robotTypeServiceInstance : IRobotTypeService
  ) {}
 
  public async createRobotType(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeOrError = await this.robotTypeServiceInstance.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;
        
      if (robotTypeOrError.isFailure) {
        return res.status(402).send();
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.json( robotTypeDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
  public async listRobots (req: Request, res: Response, next: NextFunction) {
    try {
			const robotsOrError = (await this.robotTypeServiceInstance.listRobots()) as Result<IRobotTypeDTO[]>;

			if (robotsOrError.isFailure) {
				return res.status(402).json(robotsOrError.error);
			}

			const robotsDTO = robotsOrError.getValue();
			return res.status(201).json(robotsDTO);
		} catch (e) {
			return next(e);
		}
  }
  public async findByTaskVigilancia(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypesOrError = await this.robotTypeServiceInstance.findByTaskVigilancia();

      if (robotTypesOrError.isFailure) {
        return res.status(400).json(robotTypesOrError.error);
      }

      const robotTypesDTO = robotTypesOrError.getValue();
      return res.status(200).json(robotTypesDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async findByTaskPickUpDelivery(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypesOrError = await this.robotTypeServiceInstance.findByTaskPickUpDelivery();

      if (robotTypesOrError.isFailure) {
        return res.status(400).json(robotTypesOrError.error);
      }

      const robotTypesDTO = robotTypesOrError.getValue();
      return res.status(200).json(robotTypesDTO);
    } catch (e) {
      return next(e);
    }
  }
}