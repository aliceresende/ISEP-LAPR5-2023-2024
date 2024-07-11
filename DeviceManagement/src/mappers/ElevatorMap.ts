import { Container } from 'typedi';
import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { IElevatorDTO } from '../dto/IElevatorDTO';
import { Elevator } from '../domain/elevator/elevator';
import ElevatorRepo from '../repos/elevatorRepo';
import BuildingRepo from '../repos/buildingRepo';
import { ElevatorBrand } from '../domain/elevator/elevatorBrand';
import { ElevatorModel } from '../domain/elevator/elevatorModel';
import { ElevatorSeriesNumber } from '../domain/elevator/elevatorSeriesNumber';
import { Result } from '../core/logic/Result';
import { ElevatorX } from '../domain/elevator/elevatorX';
import { ElevatorY } from '../domain/elevator/elevatorY';
import { ElevatorLocation } from '../domain/elevator/elevatorLocation';
import FloorRepo from '../repos/floorRepo';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): IElevatorDTO {
    return ({
      id: elevator.id.toString(),
      building: elevator.building.id.toString(),
      floors: elevator.floors.map(floor => floor.id.toValue()),
      brand: elevator.brand.value,
      model: elevator.model.value,
      seriesNumber: elevator.seriesNumber.value,
      description: elevator.description,
      x: elevator.x.value,
      y: elevator.y.value,
      location: elevator.location.value,
    } as unknown) as IElevatorDTO;
  }

  public static async toDomain(elevator: any): Promise<Elevator> {
    console.log('To Domain Elevator Map');
    const repoBuilding = Container.get(BuildingRepo);
    const repoFloor = Container.get(FloorRepo);
    const buildingElevator = await repoBuilding.findById(elevator.building);
    const brandOrError = ElevatorBrand.create(elevator.brand).getValue();
    const modelOrError = ElevatorModel.create(elevator.model).getValue();
    const serieNumOrError = ElevatorSeriesNumber.create(elevator.seriesNumber).getValue();
    const xOrError = ElevatorX.create(elevator.x).getValue();
    const yOrError = ElevatorY.create(elevator.y).getValue();
    const locationOrError = ElevatorLocation.create(elevator.location).getValue();
    console.log("Elevator floors", elevator.building);

    const floorOrError = [];
    for (const floorId of elevator.floors) {
    
      const floor = await repoFloor.findByDomainId(floorId);
      if (floor) {
        floorOrError.push(floor);
      } else {
        throw new Error(`Floor: ${floorId} of elevator: ${elevator.seriesNumber} not found.`);
      }
    }

    const elevatorOrError = Elevator.create(
      {
        building: buildingElevator,
        floors: floorOrError,
        brand: brandOrError, //create
        model: modelOrError, //create
        seriesNumber: serieNumOrError, //create
        description: elevator.description,
        x: xOrError,
        y: yOrError,
        location: locationOrError,
      },
      new UniqueEntityID(elevator.domainId),
    );

    elevatorOrError.isFailure ? console.log(elevatorOrError) : '';

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence(elevator: Elevator): any {


    const a = {
      domainId: elevator.id.toString(),
      building: elevator.building.id.toValue(),
      floors: elevator.floors.map(floor => floor.id.toValue()),
      brand: elevator.brand.value,
      model: elevator.model.value,
      seriesNumber: elevator.seriesNumber.value,
      description: elevator.description,
      x: elevator.x.value,
      y: elevator.y.value,
      location: elevator.location.value,
    };
    return a;
  }
}
