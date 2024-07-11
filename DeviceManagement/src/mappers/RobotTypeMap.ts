
import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import { RobotType } from '../domain/robotType/robotType';
import { IRobotTypeDTO } from '../dto/IRobotTypeDTO';
import { RobotTypeBrand } from '../domain/robotType/robotTypeBrand';
import { RobotTypeModel } from '../domain/robotType/robotTypeModel';
import { TypeOfTask } from "../domain/robotType/typeOfTask";




export class RobotTypeMap extends Mapper<RobotType> {

  public static toDTO(robotType: any): IRobotTypeDTO {
    return{
      id: robotType.domainId,
      robotType: robotType.robotType,
      brand: robotType.brand.toString(),
      model: robotType.model.toString(),
      typeOfTasks: robotType.typeOfTasks.typeOfTask,
    } as IRobotTypeDTO;
  }  
  

  public static async toDomain(robotType: any): Promise<RobotType> {
    
    const brandOrError = RobotTypeBrand.create(robotType.brand).getValue();
    const modelOrError = RobotTypeModel.create(robotType.model).getValue();
    const typeOfTaskOrError = TypeOfTask.create(robotType.typeOfTasks).getValue();
    
    const robotTypeOrError = RobotType.create({
      robotType: robotType.robotType,
      brand: brandOrError, //create
      model: modelOrError,
      typeOfTasks: typeOfTaskOrError
    },new UniqueEntityID(robotType.domainId));
        console.log("ROBOT TYPE OR ERROR",robotTypeOrError);
        robotTypeOrError.isFailure ? console.log(robotTypeOrError) : '';

    return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
}

 
  public static toPersistence(robotType: RobotType): any {
console.log("no to persistence");
    const a = {
      domainId: robotType.id.toValue(),
      robotType: robotType.robotType,
      brand: robotType.brand.value,
      model: robotType.model.value,
      typeOfTasks: robotType.typeOfTasks.typeOfTask   
};
    return a;
  }
}