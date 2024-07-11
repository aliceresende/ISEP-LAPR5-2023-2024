import { Result } from "../../core/logic/Result";
import ITypeOfTaskDTO from "../../dto/ITypeOfTaskDTO";

export default interface ITypeOfTaskService  {
  createTypeOfTask(typeOfTaskDTO: ITypeOfTaskDTO): Promise<Result<ITypeOfTaskDTO>>;
}
