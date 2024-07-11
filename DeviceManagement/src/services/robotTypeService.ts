import { Service, Inject } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import IRobotTypeService from './IServices/IRobotTypeService';
import { REFUSED } from 'dns';
import { IRobotTypeDTO } from '../dto/IRobotTypeDTO';
import { RobotTypeBrand } from '../domain/robotType/robotTypeBrand';
import { RobotTypeModel } from '../domain/robotType/robotTypeModel';
import { RobotType } from '../domain/robotType/robotType';
import IRobotTypeRepo from '../repos/IRepos/IRobotTypeRepo';
import { forEach } from 'lodash';
import ITypeOfTaskRepo from '../repos/IRepos/ITypeOfTaskRepo';
import { TypeOfTask } from '../domain/robotType/typeOfTask';



@Service()
export default class RobotTypeService implements IRobotTypeService {
  constructor(
      @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo,
      @Inject(config.repos.typeOfTask.name) private typeOfTaskRepo : ITypeOfTaskRepo,
  ) {}

  public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {

    try {
 
      const brand =  RobotTypeBrand.create(robotTypeDTO.brand).getValue();
      const model = RobotTypeModel.create(robotTypeDTO.model).getValue();
      const typeOfTask = TypeOfTask.create(robotTypeDTO.typeOfTasks).getValue();
      const robotTypeOrError = RobotType.create({
        robotType: robotTypeDTO.robotType,
        brand: brand,
        model: model,
        typeOfTasks: typeOfTask
      });

      if (robotTypeOrError.isFailure) {
        return Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
      }

      const robotTypeResult = robotTypeOrError.getValue();
      console.log(robotTypeResult);

      await this.robotTypeRepo.save(robotTypeResult);
      console.log("------Save------")

      const robotTypeDTOResult = RobotTypeMap.toDTO(robotTypeResult) as IRobotTypeDTO;
      return Result.ok<IRobotTypeDTO>(robotTypeDTOResult)
    } catch (e) {
      console.log("TRY CATCH 1");
      throw e;
    }
  }
  
  public async listRobots(): Promise<Result<IRobotTypeDTO[]>> {
    let values: IRobotTypeDTO[] = [];

		const robots = await this.robotTypeRepo.listAll();

    let cont=0;
		robots.forEach((robot) => {
      cont++;

			values.push(RobotTypeMap.toDTO(robot));
		});
		return Result.ok<IRobotTypeDTO[]>(values);
  }
  public async findByTaskVigilancia(): Promise<Result<IRobotTypeDTO[]>> {
    try {
      const robotTypes = await this.robotTypeRepo.findByTaskVigilancia();
      const robotTypeDTOs = robotTypes.map(robotType => RobotTypeMap.toDTO(robotType));
      return Result.ok<IRobotTypeDTO[]>(robotTypeDTOs);
    } catch (e) {
      console.log("Error in findByTaskVigilancia:", e);
      throw e;
    }
  }

  public async findByTaskPickUpDelivery(): Promise<Result<IRobotTypeDTO[]>> {
    try {
      const robotTypes = await this.robotTypeRepo.findByTaskPickUpDelivery();
      console.log("ROBOT TYPES", robotTypes);
      const robotTypeDTOs = robotTypes.map(robotType => RobotTypeMap.toDTO(robotType));
      return Result.ok<IRobotTypeDTO[]>(robotTypeDTOs);
    } catch (e) {
      console.log("Error in findByTaskPickUpDelivery:", e);
      throw e;
    }
  }

}
