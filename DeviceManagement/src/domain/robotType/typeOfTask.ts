import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

enum TypeOfTaskEnum {
    PICKUPDELIVERY = "PickUpDelivery",
    VIGILANCIA = "Vigilancia"
}

interface TypeOfTaskProps {
    typeOfTask: string[];
}

export class TypeOfTask extends ValueObject<TypeOfTaskProps> {
  
  get typeOfTask(): string[] {
    return this.props.typeOfTask;
  }

  private constructor(props: TypeOfTaskProps) {
    super(props);
  }

  public static create(typeOfTask: string[]): Result<TypeOfTask> {
    
    if (typeOfTask.length === 0) {
      return Result.fail<TypeOfTask>('Insert types of task!');
    }
    
    for (const type of typeOfTask) {
      console.log("TYPE TASK VALUE OBJECT:", type);
      const typeOfTaskEnumValue = TypeOfTaskEnum[type.toUpperCase()];
      if (!typeOfTaskEnumValue) {
        return Result.fail<TypeOfTask>('Type of task invalid.');
      }
    }

    const typeOfTaskParsed = typeOfTask.map((typeOfTask) => {
      const typeOfTaskValue = TypeOfTaskEnum[typeOfTask.toUpperCase()] as TypeOfTaskEnum;
      return typeOfTaskValue;
    })

    return Result.ok<TypeOfTask>(new TypeOfTask({ typeOfTask: typeOfTaskParsed }));
  }
}