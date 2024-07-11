import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITypeOfTaskPersistence } from '../dataschema/ITypeOfTaskPersistence';

import ITypeOfTaskDTO from "../dto/ITypeOfTaskDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TypeOfTask } from "../domain/typeOfTask/typeOfTask";

export class TypeOfTaskMap extends Mapper<TypeOfTask> {
  
  public static toDTO( typeOfTask: TypeOfTask): ITypeOfTaskDTO {
    return {
      id: typeOfTask.id.toString(),
      designation: typeOfTask.designation,
    } as ITypeOfTaskDTO;
  }

  public static toDomain (typeOfTask: any | Model<ITypeOfTaskPersistence & Document> ): TypeOfTask {
    const typeOfTaskOrError = TypeOfTask.create(
      typeOfTask,
      new UniqueEntityID(typeOfTask.domainId)
    );

    typeOfTaskOrError.isFailure ? console.log(typeOfTaskOrError.error) : '';

    return typeOfTaskOrError.isSuccess ? typeOfTaskOrError.getValue() : null;
  }

  public static toPersistence (typeOfTask: TypeOfTask): any {
    return {
      domainId: typeOfTask.id.toString(),
      designation: typeOfTask.designation
    }
  }
}