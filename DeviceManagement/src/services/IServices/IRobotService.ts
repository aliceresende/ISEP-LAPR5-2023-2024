import { Result } from "../../core/logic/Result";
import { RobotType } from "../../domain/robotType/robotType";

import {IRobotDTO} from "../../dto/IRobotDTO";

export default interface IRobotService  {
  createRobot(RobotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  getRobotType(robotTypeId: string): Promise<Result<RobotType>>;
  listRobots(): Promise<Result<IRobotDTO[]>>;
  deactivateRobot(robotDTO: IRobotDTO ): Promise<Result<boolean>>;
  listRobotsByRobotType(robotTypeId: string): Promise<Result<IRobotDTO[]>>;
}
