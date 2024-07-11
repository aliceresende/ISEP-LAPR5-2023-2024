import { Container } from 'typedi';
import { Mapper } from "../core/infra/Mapper";

import { Building } from "../domain/building/building";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { IBuildingDTO } from '../dto/IBuildingDTO';
import BuildingRepo from '../repos/buildingRepo';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { Document, Model } from 'mongoose';

export class BuildingMap extends Mapper<Building> {

  public static toDTO( building: any): IBuildingDTO {
    return {
      id: building.domainId,
      code: building.code,
      name: building.name,
      description: building.description,
      x: building.x,
      y: building.y,
    } as IBuildingDTO;
  }

  public static toDomain(building: any | Model<IBuildingPersistence & Document>): Building {
    const buildingOrError = Building.create({
      id: building.buildingId,
      code: building.code,
      name: building.name,
      description: building.description,
      x: building.x,
      y: building.y,
    },new UniqueEntityID(building.domainId));

        buildingOrError.isFailure ? console.log(buildingOrError) : '';
    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
}
 
  public static toPersistence(building: Building): any {
    const a = {
      domainId: building.id.toString(),
      code: building.code,
      name: building.name,
      description: building.description,
      x: building.x,
      y: building.y,
    };
    return a;
  }
}