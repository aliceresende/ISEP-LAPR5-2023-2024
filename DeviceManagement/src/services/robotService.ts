import { Service, Inject } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";
import IRobotService from './IServices/IRobotService';
import { REFUSED } from 'dns';
import { IRobotDTO } from '../dto/IRobotDTO';
import { Robot } from '../domain/robot/robot';
import IRobotRepo from '../repos/IRepos/IRobotRepo';
import { RobotSeriesNumber } from '../domain/robot/robotSeriesNumber';
import { RobotType } from '../domain/robotType/robotType';
import IRobotTypeRepo from '../repos/IRepos/IRobotTypeRepo';


@Service()
export default class RobotService implements IRobotService {
  constructor(
      @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
      @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo

  ) {}

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    console.log("Chegou ao serviço");
    try {
      let robotType: RobotType;
      const robotTypeOrError = await this.getRobotType(robotDTO.robotType);
      if(robotTypeOrError.isFailure){
        console.log("Erro:", robotTypeOrError.error);
        return Result.fail<IRobotDTO>(robotTypeOrError.error);
      }else{
        robotType = robotTypeOrError.getValue();
      }
 
      const seriesNumber =  RobotSeriesNumber.create(robotDTO.seriesNumber).getValue();
      const robotOrError = await Robot.create({
        code: robotDTO.code,
        seriesNumber: seriesNumber,
        nickname: robotDTO.nickname,
        description: robotDTO.description ,
        robotType: robotType,
        status: robotDTO.status
      });
      console.log("Robot create",robotOrError);

      if (robotOrError.isFailure) {
        console.log("FALHOU no create do Service");
        return Result.fail<IRobotDTO>(robotOrError.errorValue());
      }
      const robotResult = robotOrError.getValue();
      
      await this.robotRepo.save(robotResult);
      console.log("------Save------")
      const RobotDTOResult = RobotMap.toDTO( robotResult ) as IRobotDTO;
      return Result.ok<IRobotDTO>( RobotDTOResult )
    } catch (e) {
      console.log("TRY CATCH");
      throw e;
    }
  }
  public async getRobotType(robotTypeId: string): Promise<Result<RobotType>> {
    console.log("Entrou no getRobotType");
      const robotType = await this.robotTypeRepo.findById(robotTypeId);
      const found= !!robotType;
      console.log(found);
      if (found) {
        console.log("Entrou no found if");
        return Result.ok<RobotType>(robotType);
      } else {
        console.log("Entrou no found else");
        return Result.fail<RobotType>("Couldn't find RobotType by id=" + robotTypeId);
      }
  }
  
  public async listRobots(): Promise<Result<IRobotDTO[]>> {
    let values: IRobotDTO[] = [];

    console.log("Serviço pré-repo")
		const robots = await this.robotRepo.listAll();

    console.log(robots.length)

    console.log("serviço pós-repo")

    let cont=0;
		robots.forEach((robot) => {
      cont++;
      console.log(robot ,"----- CONT:", cont);
			values.push(RobotMap.toDTO(robot));
		});

		return Result.ok<IRobotDTO[]>(values);
  }
  public async listRobotsByRobotType(robotTypeId: string): Promise<Result<IRobotDTO[]>> {
    try{
      console.log("ROBOT ID:", robotTypeId);
      const robotResult = await this.robotRepo.findByRobotTypeId(robotTypeId);
      console.log("ROBOT SERVICE: ", robotResult);
      const robots=[];

      if(robotResult.length != 0){
        robotResult.forEach((element) => {
          robots.push(RobotMap.toDTO(element));
        })
      }
      return Result.ok<IRobotDTO[]>( robots );
    } catch (e) {
      throw e;
    }
  }

  public async deactivateRobot(robotDTO: IRobotDTO ): Promise<Result<boolean>> {
		try {
      console.log(robotDTO.id)
			const robot = await this.robotRepo.findByDomainId(robotDTO.id);
      console.log(robot);
			if (robot === null) {
				return Result.fail<boolean>('The robot does not exist!');
			} else if (robot.props.status === false) {
				return Result.fail<boolean>('Robot is already deactivated!');
			} else {
				robot.props.status = false;
				await this.robotRepo.save(robot);
				return Result.ok<boolean>(true);
			}
		} catch (e) {
			throw e;
		}
	}

}
