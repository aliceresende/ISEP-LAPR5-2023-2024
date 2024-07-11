import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITypeOfTaskService from './IServices/ITypeOfTaskService';
import ITypeOfTaskDTO from '../dto/ITypeOfTaskDTO';
import { TypeOfTask } from '../domain/typeOfTask/typeOfTask';
import { TypeOfTaskMap } from '../mappers/TypeOfTaskMap';
import ITypeOfTaskRepo from '../repos/IRepos/ITypeOfTaskRepo';


@Service()
export default class TypeOfTaskService implements ITypeOfTaskService {
  constructor(
      @Inject(config.repos.typeOfTask.name) private typeOfTaskRepo : ITypeOfTaskRepo
  ) {}

  public async createTypeOfTask(typeOfTaskDTO: ITypeOfTaskDTO): Promise<Result<ITypeOfTaskDTO>> {
    try {

      const typeOfTaskOrError = await TypeOfTask.create( typeOfTaskDTO );

      if (typeOfTaskOrError.isFailure) {
        return Result.fail<ITypeOfTaskDTO>(typeOfTaskOrError.errorValue());
      }

      const typeOfTaskResult = typeOfTaskOrError.getValue();

      await this.typeOfTaskRepo.save(typeOfTaskResult);

      const typeOfTaskDTOResult = TypeOfTaskMap.toDTO( typeOfTaskResult ) as ITypeOfTaskDTO;
      return Result.ok<ITypeOfTaskDTO>( typeOfTaskDTOResult )
    } catch (e) {
      throw e;
    }
  }


}
