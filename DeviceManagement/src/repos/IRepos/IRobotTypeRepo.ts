import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType/robotType";
import { RobotTypeId } from "../../domain/robotType/robotTypeId";


export default interface IRobotTypeRepo extends Repo<RobotType> {
	save(robotType: RobotType): Promise<RobotType>;
	findById (robotTypeId: RobotTypeId | string): Promise<RobotType>;
	listAll(): Promise<RobotType[]>;
	findByTaskPickUpDelivery(): Promise<RobotType[]>;
	findByTaskVigilancia(): Promise<RobotType[]>;
}