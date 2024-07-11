import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";


import { Result } from "../core/logic/Result";
import ITypeOfTaskController from './IControllers/ITypeOfTaskController';
import ITypeOfTaskService from '../services/IServices/ITypeOfTaskService';
import ITypeOfTaskDTO from '../dto/ITypeOfTaskDTO';


@Service()
export default class TypeOfTaskController implements ITypeOfTaskController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.typeOfTask.name) private typeOfTaskServiceInstance : ITypeOfTaskService
  ) {}
 
  public async createTypeOfTask(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Chegou ao controller createTypeOfTask")
      const typeOfTaskOrError = await this.typeOfTaskServiceInstance.createTypeOfTask(req.body as ITypeOfTaskDTO) as Result<ITypeOfTaskDTO>;
        
      if (typeOfTaskOrError.isFailure) {
        return res.status(402).send();
      }

      const typeOfTaskDTO = typeOfTaskOrError.getValue();
      return res.json( typeOfTaskDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

}