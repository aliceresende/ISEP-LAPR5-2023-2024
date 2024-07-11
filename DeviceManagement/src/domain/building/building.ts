import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IBuildingDTO } from "../../dto/IBuildingDTO";
import { BuildingId } from "./buildingId";

export interface BuildingProps {
  code: string;
  name: string;
  description: string;
  x: number;
  y:  number;
}

export class Building extends AggregateRoot<BuildingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingId (): BuildingId {
    return BuildingId.caller(this.id);
  }

  get code ():  string {
    return this.props.code;
  }

  get description (): string {
    return this.props.description;
  }

  get name (): string {
    return this.props.name;
  }
  get x (): number {
    return this.props.x;
  }
  get y (): number {
    return this.props.y;
  }

  private constructor (props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {
    const code = buildingDTO.code;
    const description = buildingDTO.description;
    const name = buildingDTO.name;
    const x = buildingDTO.x;
    const y = buildingDTO.y;

    if (!!name === false || name.length === 0) {
      return Result.fail<Building>('Must provide a building name')
    } else {
      const building = new Building({ 
        code:code,
        description:description,
        name:name,
        x:x,
        y:y 
    }, id);
    console.log(id);
      return Result.ok<Building>( building )
    }
  }
 
}
