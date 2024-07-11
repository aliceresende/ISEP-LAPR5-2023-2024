import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { RobotType } from "../robotType/robotType";
import { RobotId } from "./robotId";
import { RobotSeriesNumber } from "./robotSeriesNumber";

/**
tipo de robot: obrigatório, alfanum+ericos, maximo 25 caracteres
marca: obrigatório, maximo 50 caracteres
modelo: obrigatório, máximo 100 caracteres
 */
interface RobotProps {
  code: string;
  nickname: string;
  robotType: RobotType;
  seriesNumber: RobotSeriesNumber;
  description: string;
  status: boolean;

}

export class Robot extends AggregateRoot<RobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get robotId (): RobotId {
    return RobotId.caller(this.id);
  }
  get code (): string {
    return this.props.code;
  }

  get nickname (): string {
    return this.props.nickname;
  }

  get robotType (): RobotType {
    return this.props.robotType;
  }
  get seriesNumber (): RobotSeriesNumber {
    return this.props.seriesNumber;
  }
  get description (): string {
    return this.props.description;
  }
  get status (): boolean {
    return this.props.status;
  }



  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot> {
    const guardedProps = [
      { argument: props.code, argumentName: 'code' },
      { argument: props.nickname, argumentName: 'nickname' },
      { argument: props.robotType, argumentName: 'robotType' },
      { argument: props.seriesNumber, argumentName: 'seriesNumber' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.status, argumentName: 'status' },

    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Robot>(guardResult.message)
    }     
    else {
      const robot = new Robot({
        ...props
      }, id);

      return Result.ok<Robot>(robot);
    }
  }

 
}
