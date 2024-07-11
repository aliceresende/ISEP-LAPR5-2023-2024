import { RobotType } from "../domain/robotType/robotType";
import { TypeOfTask } from "../domain/typeOfTask/typeOfTask";

export interface IRobotTypeDTO {
    id:string;
    robotType: string;
    brand: string;
    model: string; 
    typeOfTasks: string[];
}