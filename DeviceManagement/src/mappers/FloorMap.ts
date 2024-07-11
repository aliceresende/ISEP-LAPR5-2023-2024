import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import { Floor } from "../domain/floor/floor";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IFloorDTO from '../dto/IFloorDTO';
import BuildingRepo from '../repos/buildingRepo';
import { FloorNumber } from '../domain/floor/floorNumber';
import { FloorDescription } from '../domain/floor/floorDescription';
import { map } from 'lodash';


export class FloorMap extends Mapper<Floor> {

  public static toDTO(floor: any): IFloorDTO {
    return {
      id: floor.domainId,
      description: floor.description.toString(),
      floorNumber: floor.floorNumber.toString(),
      floorBuilding: floor.floorBuilding.toString(),
      map: floor.map,
    } as IFloorDTO;
    
  }

  public static async toDomain(floor: any): Promise<Floor> {
    console.log("Chegou ao toDomain");
    const repo = Container.get(BuildingRepo);
    const building = await repo.findById(floor.floorBuilding);
    const numberOrError = FloorNumber.create(floor.floorNumber).getValue();
    console.log("depois do number, antes do description");
    console.log("Number:",numberOrError);

    const descriptionOrError = FloorDescription.create(floor.description).getValue();
    console.log("Description to Domain:",descriptionOrError);
    const floorOrError = Floor.create({
         floorNumber: numberOrError,
         description: descriptionOrError,
         floorBuilding: building,
         map: floor.map,
    }, new UniqueEntityID(floor.domainId));
  
        floorOrError.isFailure ? console.log(floorOrError) : '';
        console.log("Chegou ao toDomain");

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
}

 
  public static toPersistence(floor: Floor): any {
    console.log("persistance", floor.floorBuilding.id.toString());
    
    const a = {
      domainId: floor.id.toString(),
      description: floor.description.value,
      floorNumber: floor.floorNumber.value,
      floorBuilding: floor.floorBuilding.id.toString(),
      map: floor.map
};
    return a;
  }
}