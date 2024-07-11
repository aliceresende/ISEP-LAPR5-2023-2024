import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import IPassageDTO from "../../dto/IPassageDTO";
import { Building } from "../building/building";
import { Floor } from "../floor/floor";
import { PassageId } from "./passageId";

interface PassageProps {
  location: string;
  floorBuilding1: Floor;
  floorBuilding2: Floor;
  fb1x: number;
  fb1y: number;
  fb2x: number;
  fb2y: number;
  passageCode: string;
}

export class Passage extends AggregateRoot<PassageProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get passageId (): PassageId {
    return PassageId.caller(this.id);
  }
  get location (): string {
    return this.props.location;
  }
  get passageCode (): string {
    return this.props.passageCode;
  }

  get floorBuilding1 (): Floor {
    return this.props.floorBuilding1;
  }
  get floor1Name(): string{
    return this.props.floorBuilding1.floorNumber.value;
  }

  get building1(): string{
    return this.props.floorBuilding1.buildingName;
  }
  get floorBuilding2 (): Floor {
    return this.props.floorBuilding2;
  }

  get floor2Name():string{
    return this.props.floorBuilding2.floorNumber.value;
  }
  get building2():string{
    return this.props.floorBuilding2.buildingName;
  }

  get fb1x (): number {
    return this.props.fb1x;
  } 
  get fb1y (): number { 
    return this.props.fb1y;
  }
  get fb2x (): number {
    return this.props.fb2x;
  }
  get fb2y (): number {
    return this.props.fb2y;
  }
  private constructor (props: PassageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PassageProps, id?: UniqueEntityID): Result<Passage> {

    const guardedProps = [
      { argument: props.location, argumentName: 'location'},
      { argument: props.floorBuilding1, argumentName: 'floorBuilding1' },
      { argument: props.floorBuilding2, argumentName: 'floorBuilding2' },
      { argument: props.fb1x, argumentName: 'fb1x' },
      { argument: props.fb1y, argumentName: 'fb1y' },
      { argument: props.fb2x, argumentName: 'fb2x' },
      { argument: props.fb2y, argumentName: 'fb2y' },
      { argument: props.passageCode, argumentName: 'passageCode' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passage>(guardResult.message)
    }     
    else {
      const passage = new Passage({
        ...props
      }, id);

      return Result.ok<Passage>(passage);
    }
  }

 
}
