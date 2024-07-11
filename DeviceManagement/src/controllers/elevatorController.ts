import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import IElevatorController from './IControllers/IElevatorController';
import IElevatorService from '../services/IServices/IElevatorService';
import { IElevatorDTO } from '../dto/IElevatorDTO';
import { IBuildingDTO } from '../dto/IBuildingDTO';

@Service()
export default class ElevatorController
  implements IElevatorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.elevator.name) private ElevatorServiceInstance: IElevatorService) {}

  // Create elevators /POST
  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.ElevatorServiceInstance.createElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;

      if (elevatorOrError.isFailure) {
        return res.status(402).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.json(elevatorDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  // Edit elevators /PUT/PATCH
  public async updateElevator(req: Request, res: Response, next: NextFunction) {
    console.log("controller");
    try {
      const ElevatorOrError = (await this.ElevatorServiceInstance.updateElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;

      if (ElevatorOrError.isFailure) {
        return res.status(404).send();
      }

      const ElevatorDTO = ElevatorOrError.getValue();
      return res.status(201).json(ElevatorDTO);
    } catch (e) {
      return next(e);
    }
  }

  // Listing elevators /GET
  public async listElevatorsByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const building = req.params.elevatorBuilding; //elevatorNumber mesmo nome que no Route
      const elevatorOrError = (await this.ElevatorServiceInstance.listElevatorsByBuilding(building)) as Result<
        IElevatorDTO[]
      >;
      if (elevatorOrError.isFailure) {
        return res.status(404).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(201).json(elevatorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async listAllElevators(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorsOrError = (await this.ElevatorServiceInstance.listAllElevators()) as Result<IElevatorDTO[]>;

      if (elevatorsOrError.isFailure) {
        return res.status(402).json(elevatorsOrError.error);
      }

      const buildingDTO = elevatorsOrError.getValue();
      return res.status(201).json(buildingDTO);
    } catch (e) {
      return next(e);
    }
  }
}
