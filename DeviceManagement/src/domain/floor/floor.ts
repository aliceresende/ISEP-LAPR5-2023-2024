import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";
import { Building } from "../building/building";
import { FloorDescription } from "./floorDescription";

import { FloorId } from "./floorId";
import { FloorNumber } from "./floorNumber";

interface FloorProps {
  floorNumber: FloorNumber;
  description: FloorDescription;
  floorBuilding: Building;
  map?:string;
}

export class Floor extends AggregateRoot<FloorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get floorId (): FloorId {
    return FloorId.caller(this.id);
  }

  get floorNumber (): FloorNumber {
    return this.props.floorNumber;
  }

  get map(): string{
    return this.props.map
  }
  
  set map(map:string){
    this.props.map = map;
}
set description(description: FloorDescription){
  this.props.description = description;
}

  get description (): FloorDescription {
    return this.props.description;
  }

  get floorBuilding (): Building {
    return this.props.floorBuilding;
  }

  get buildingName (): string {
    return this.props.floorBuilding.name;
  }

  private constructor (props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }



  public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {
    const guardedProps = [
      { argument: props.floorNumber, argumentName: 'floorNumber' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.floorBuilding, argumentName: 'floorBuilding' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Floor>(guardResult.message)
    }     
    else {
      const floor = new Floor({
        ...props
      }, id);

      return Result.ok<Floor>(floor);
    }
  }

 
}
