
import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import { Robot } from '../domain/robot/robot';
import { IRobotDTO } from "../dto/IRobotDTO";
import { RobotSeriesNumber } from "../domain/robot/robotSeriesNumber";
import { Container } from "typedi";
import RobotTypeRepo from "../repos/robotTypeRepo";



export class RobotMap extends Mapper<Robot> {

  public static toDTO(robot: any): IRobotDTO {
    return{
      id: robot.domainId,
      code: robot.code,
      nickname: robot.nickname,
      seriesNumber: robot.seriesNumber,
      robotType: robot.robotType,
      description: robot.description,
      status: robot.status
    } as IRobotDTO
  }

  public static async toDomain(robot: any): Promise<Robot> {    
  const repo = Container.get(RobotTypeRepo);
  const  robotType = await repo.findById(robot.robotType);
  const seriesNumberOrError = RobotSeriesNumber.create(robot.seriesNumber).getValue();
    const robotOrError = Robot.create({
      code: robot.code,
      nickname: robot.nickname,
      seriesNumber: seriesNumberOrError,
      robotType: robotType,
      description: robot.description,
      status: robot.status
    } ,new UniqueEntityID(robot.domainId));
        
      robotOrError.isFailure ? console.log(robotOrError) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
}

 
  public static toPersistence(robot: Robot): any {
    const a = {
      domainId: robot.id.toValue(),
      code: robot.code,
      nickname: robot.nickname,
      seriesNumber: robot.seriesNumber.value,
      robotType: robot.robotType.id.toString(),
      description: robot.description,
      status: robot.status 
};
    return a;
  }
}