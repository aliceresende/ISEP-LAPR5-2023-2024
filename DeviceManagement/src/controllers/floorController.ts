import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorController from "./IControllers/IFloorController";
import IFloorService from '../services/IServices/IFloorService';

import { Result } from "../core/logic/Result";
import IFloorDTO from '../dto/IFloorDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IMapDTO from '../dto/IMapDTO';


@Service()
export default class FloorController implements IFloorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.floor.name) private FloorServiceInstance : IFloorService
  ) {}
 
  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Chegou ao controller createFloor")
      const floorOrError = await this.FloorServiceInstance.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;
        
      if (floorOrError.isFailure) {
        return res.json( floorOrError ).status(402);
      }

      const floorDTO = floorOrError.getValue();
      return res.json( floorDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
  public async listFloorsByBuilding(req: Request, res: Response, next: NextFunction) {
    try {
        const building= req.params.floorBuilding; //floorNumber mesmo nome que no Route
        console.log("No controller");
        console.log(building);
        await this.FloorServiceInstance.listByBuilding(building).then(value=>{
            res.status(200).send(value);
        }).catch(value => {
            res.status(400).send(value);
        });
    } catch (e) {
        return next(e);
    }
}
public async listFloors(req: Request, res: Response, next: NextFunction) {
  try {
    const floorOrError = (await this.FloorServiceInstance.listFloors()) as Result<IFloorDTO[]>;

    if (floorOrError.isFailure) {
      return res.status(402).json(floorOrError.error);
    }

    const floorDTO = floorOrError.getValue();
    return res.status(201).json(floorDTO);
  } catch (e) {
    return next(e);
  }
}
public async listBuildingsByMaxMin(req: Request, res: Response, next: NextFunction) {
  try {
      const min= parseInt(req.params.min); 
      const max= parseInt(req.params.max);
      await this.FloorServiceInstance.findBuildingsWithFloorCount(min,max).then(value=>{
          res.status(200).send(value);
      }).catch(value => {
          res.status(400).send(value);
      });
  } catch (e) {
      return next(e);
  }
}
public async listBuildingFloorByPassage(req: Request, res: Response, next: NextFunction) {
  try {
      const building= req.params.floorNumber; //floorNumber mesmo nome que no Route
      console.log("No controller");
      console.log(building);
      await this.FloorServiceInstance.listByBuilding(building).then(value=>{
          res.status(200).send(value);
      }).catch(value => {
          res.status(400).send(value);
      });
  } catch (e) {
      return next(e);
  }
}
public async listFloorWithPassages(req: Request, res: Response, next: NextFunction) {
  try {
      const floorBuilding= req.params.floorBuildingId; //floorNumber mesmo nome que no Route
      console.log("No controller");
      console.log(floorBuilding);
      await this.FloorServiceInstance.getFloorWithPassages(floorBuilding).then(value=>{
          res.status(200).send(value);
      }).catch(value => {
          res.status(400).send(value);
      });
  } catch (e) {
      return next(e);
  }
}

public async updateFloor(req: Request, res: Response, next: NextFunction) {
  try {
    const FloorOrError = await this.FloorServiceInstance.updateFloor(req.body as IFloorDTO) as Result<IFloorDTO>;

    if (FloorOrError.isFailure) {
      return res.status(404).send();
    }

    const FloorDTO = FloorOrError.getValue();
    return res.status(201).json( FloorDTO );
  }
  catch (e) {
    return next(e);
  }
}

public async loadMap(req: Request, res: Response, next: NextFunction) {
  try {
    const ficheiroDTO = req.body as IMapDTO;
    console.log("controler",ficheiroDTO);
    console.log(ficheiroDTO.floorCode);
    console.log(ficheiroDTO.buildingCode);
    const carregarMapaOrError = await this.FloorServiceInstance.loadMap(ficheiroDTO);

    if (carregarMapaOrError.isFailure) {
      return res.status(400).json({ error: carregarMapaOrError.error });
    }
    return res.json(carregarMapaOrError.getValue()).status(200);
  } catch (e) {
    return res.json(e.message).status(400);
  }

  
  console.log("controller mapa");
 };

}