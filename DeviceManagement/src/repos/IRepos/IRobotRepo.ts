import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot/robot";
import { RobotId } from "../../domain/robot/robotId";


export default interface IRobotRepo extends Repo<Robot> {
	save(robot: Robot): Promise<Robot>;
	findById (robotId: RobotId | string): Promise<Robot>;
	listAll(): Promise<Robot[]>;
	findByDomainId (robotId: RobotId | string): Promise<Robot>;
	findByRobotTypeId(id: string): Promise<any[]>;
}