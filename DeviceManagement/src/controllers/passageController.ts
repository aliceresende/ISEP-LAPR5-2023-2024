import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";


import { Result } from "../core/logic/Result";
import IPassageController from './IControllers/IPassageController';
import IPassageService from '../services/IServices/IPassageService';
import IPassageDTO from '../dto/IPassageDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';


@Service()
export default class PassageController implements IPassageController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.passage.name) private PassageServiceInstance : IPassageService
  ) {}
 
  public async createPassage(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Chegou ao controller createPassage")
      const passageOrError = await this.PassageServiceInstance.createPassage(req.body as IPassageDTO) as Result<IPassageDTO>;
        
      if (passageOrError.isFailure) {
        return res.json( passageOrError ).status(402);
      }

      const passageDTO = passageOrError.getValue();
      return res.json( passageDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

 /* public async listPassagesBetweenBuildings(req: Request, res: Response, next: NextFunction){
   try{
    const building1 = req.params.idBuilding1;
    const building2 = req.params.idBuilding2;

    await this.PassageServiceInstance.listPassagesBetweenBuildings(building1,building2).then(value=>{
      res.status(200).send(value);
    }).catch(value => {
      res.status(400).send(value);
    });
} catch (e) {
  return next(e);
  
}

}*/
public async updatePassage(req: Request, res: Response, next: NextFunction) {
  try {
    const PassageOrError = await this.PassageServiceInstance.updatePassage(req.body as IPassageDTO) as Result<IPassageDTO>;

    if (PassageOrError.isFailure) {
      return res.status(404).send();
    }

    const PassageDTO = PassageOrError.getValue();
    return res.status(201).json( PassageDTO );
  }
  catch (e) {
    return next(e);
  }
}

public async listPassagesBetweenBuilding(req: Request, res: Response, next: NextFunction){
  try{
   const building1 = req.params.idBuilding1;
   const building2 = req.params.idBuilding2;

   await this.PassageServiceInstance.getPassagesBetweenBuildings(building1,building2).then(value=>{
     res.status(200).send(value);
   }).catch(value => {
     res.status(400).send(value);
   });
} catch (e) {
 return next(e);
 
}
}
public async listPassages (req: Request, res: Response, next: NextFunction) {
  try {
    const passagesOrError = (await this.PassageServiceInstance.listPassages()) as Result<IPassageDTO[]>;

    if (passagesOrError.isFailure) {
      return res.status(402).json(passagesOrError.error);
    }

    const passagesDTO = passagesOrError.getValue();
    return res.status(201).json(passagesDTO);
  } catch (e) {
    return next(e);
  }
}
}