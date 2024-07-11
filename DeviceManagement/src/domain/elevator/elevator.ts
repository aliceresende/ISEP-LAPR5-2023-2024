import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { ElevatorId } from './elevatorId';
import { ElevatorBrand } from './elevatorBrand';
import { ElevatorModel } from './elevatorModel';
import { ElevatorSeriesNumber } from './elevatorSeriesNumber';
import { Building } from '../building/building';
import { Floor } from '../floor/floor';
import { Guard } from '../../core/logic/Guard';
import { ElevatorX } from './elevatorX';
import { ElevatorY } from './elevatorY';
import { ElevatorLocation } from './elevatorLocation';

export interface ElevatorProps {
  building: Building;
  floors: Floor[];
  brand: ElevatorBrand;
  model: ElevatorModel; // obrigatory if it has brand
  seriesNumber: ElevatorSeriesNumber;
  description: string;
  x: ElevatorX;
  y: ElevatorY;
  location: ElevatorLocation;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }
  get elevatorId(): ElevatorId {
    return ElevatorId.caller(this.id);
  }

  get building(): Building {
    return this.props.building;
  }

  get buildingName(): string {
    return this.props.building.name;
  }

  get floors(): Floor[] {
    return this.props.floors;
  }

  get floorsNumbers(): string[] {
    return this.props.floors.map(floor => floor.floorNumber.value);
  }

  get brand(): ElevatorBrand {
    return this.props.brand;
  }

  get model(): ElevatorModel {
    return this.props.model;
  }

  get seriesNumber(): ElevatorSeriesNumber {
    return this.props.seriesNumber;
  }

  get description(): string {
    return this.props.description;
  }

  get x(): ElevatorX {
    return this.props.x;
  }
  get y(): ElevatorY {
    return this.props.y;
  }
  get location(): ElevatorLocation {
    return this.props.location;
  }

  private constructor(props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
    const guardedProps = [
      { argument: props.building, argumentName: 'building' },
      { argument: props.floors, argumentName: 'floors' },
      { argument: props.brand, argumentName: 'brand' },
      { argument: props.model, argumentName: 'model' },
      { argument: props.seriesNumber, argumentName: 'seriesNumber' },
      { argument: props.x, argumentName: 'x' },
      { argument: props.y, argumentName: 'y' },
      { argument: props.location, argumentName: 'location' },

    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Elevator>(guardResult.message);
    } else {
      const elevator = new Elevator(
        {
          ...props,
        },
        id,
      );
      return Result.ok<Elevator>(elevator);
    }
  }
}
