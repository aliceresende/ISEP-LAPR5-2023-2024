import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { TypeOfTask } from "./typeOfTask";
import { RobotTypeBrand } from "./robotTypeBrand";


import { RobotTypeId } from "./robotTypeId";
import { RobotTypeModel } from "./robotTypeModel";
/**
tipo de robot: obrigatório, alfanum+ericos, maximo 25 caracteres
marca: obrigatório, maximo 50 caracteres
modelo: obrigatório, máximo 100 caracteres
 */
interface RobotTypeProps {
  robotType: string;
  brand: RobotTypeBrand;
  model: RobotTypeModel;
  typeOfTasks: TypeOfTask;
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get robotTypeId (): RobotTypeId {
    return RobotTypeId.caller(this.id);
  }
  get robotType (): string {
    return this.props.robotType;
  }

  get brand (): RobotTypeBrand {
    return this.props.brand;
  }

  get model (): RobotTypeModel {
    return this.props.model;
  }

  get typeOfTasks (): TypeOfTask {
    return this.props.typeOfTasks;
  }



  private constructor (props: RobotTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {
    const guardedProps = [
      { argument: props.robotType, argumentName: 'robotType' },
      { argument: props.brand, argumentName: 'brand' },
      { argument: props.model, argumentName: 'model' },
      { argument: props.typeOfTasks, argumentName: 'typeOfTasks' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<RobotType>(guardResult.message)
    }     
    else {
      const robotType = new RobotType({
        ...props
      }, id);
console.log("else robot type")
      return Result.ok<RobotType>(robotType);
    }
  }

 
}
