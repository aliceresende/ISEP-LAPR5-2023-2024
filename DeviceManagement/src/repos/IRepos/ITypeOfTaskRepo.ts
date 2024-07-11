import { Repo } from "../../core/infra/Repo";
import { TypeOfTask } from "../../domain/typeOfTask/typeOfTask";
import { TypeOfTaskId } from "../../domain/typeOfTask/typeOfTaskId";


export default interface ITypeOfTaskRepo extends Repo<TypeOfTask> {
	save(typeTask: TypeOfTask): Promise<TypeOfTask>;
	findById (typeTask: TypeOfTaskId | string): Promise<TypeOfTask>;
	existsByDomainId (typeOfTaskId: TypeOfTaskId | string): Promise<Boolean>;
	findByDomainId (buildingId: TypeOfTaskId | string): Promise<TypeOfTask> ;
}
  