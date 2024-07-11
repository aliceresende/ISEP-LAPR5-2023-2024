import { Result } from "../../core/logic/Result";

import {IRobotTypeDTO} from "../../dto/IRobotTypeDTO";

export default interface IRobotTypeService  {
  createRobotType(RobotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
  listRobots(): Promise<Result<IRobotTypeDTO[]>>;
  findByTaskVigilancia(): Promise<Result<IRobotTypeDTO[]>>;
  findByTaskPickUpDelivery(): Promise<Result<IRobotTypeDTO[]>>;
}
