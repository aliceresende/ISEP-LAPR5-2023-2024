import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import ITypeOfTaskDTO from "../../dto/ITypeOfTaskDTO";
import { TypeOfTaskId } from "./typeOfTaskId";


interface TypeOfTaskProps {
  designation: string;
}

export class TypeOfTask extends AggregateRoot<TypeOfTaskProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get typeOfTaskId (): TypeOfTaskId {
    return TypeOfTaskId.caller(this.id);
  }

  get designation (): string {
    return this.props.designation;
  }

  private constructor (props: TypeOfTaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (typeOfTaskDTO: ITypeOfTaskDTO, id?: UniqueEntityID): Result<TypeOfTask> {
    const designation = typeOfTaskDTO.designation;

    if (!!designation === false || designation.length === 0) {
      return Result.fail<TypeOfTask>('Must provide a designation')
    } else {
      const typeOfTask = new TypeOfTask({ designation: designation }, id);
      return Result.ok<TypeOfTask>( typeOfTask )
    }
  }
}
