import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import ITypeOfTaskRepo from './IRepos/ITypeOfTaskRepo';
import { ITypeOfTaskPersistence } from '../dataschema/ITypeOfTaskPersistence';
import { TypeOfTaskId } from '../domain/typeOfTask/typeOfTaskId';
import { TypeOfTask } from '../domain/typeOfTask/typeOfTask';
import { TypeOfTaskMap } from '../mappers/TypeOfTaskMap';

@Service()
export default class TypeOfTaskRepo implements ITypeOfTaskRepo {
  private models: any;

  constructor(
    @Inject('typeOfTaskSchema') private typeOfTaskSchema : Model<ITypeOfTaskPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (typeOfTaskId: TypeOfTaskId | string): Promise<boolean> {

    const idX = typeOfTaskId instanceof TypeOfTaskId ? (<TypeOfTaskId>typeOfTaskId).id.toValue() : typeOfTaskId;

    const query = { domainId: idX}; 
    const TypeOfTaskDocument = await this.typeOfTaskSchema.findOne( query );

    return !!TypeOfTaskDocument === true;
  }


  public async save (typeOfTask: TypeOfTask): Promise<TypeOfTask> {
    const query = { domainId: typeOfTask.id.toString() }; 

    const typeOfTaskDocument = await this.typeOfTaskSchema.findOne( query );
    console.log("Chegou ao Repo função save");
    try {
      if (typeOfTaskDocument === null ) {
        const rawTypeOfTask: any = TypeOfTaskMap.toPersistence(typeOfTask);
        const TypeOfTaskCreated = await this.typeOfTaskSchema.create(rawTypeOfTask);
        return TypeOfTaskMap.toDomain(TypeOfTaskCreated);
      } else {
        typeOfTaskDocument.designation= typeOfTask.designation;
        await typeOfTaskDocument.save();
        return typeOfTask;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findById (typeOfTaskId: TypeOfTaskId | string): Promise<TypeOfTask> {

    const idX = typeOfTaskId instanceof TypeOfTaskId ? (<TypeOfTaskId>typeOfTaskId).id.toValue() : typeOfTaskId;

    const query = { domainId: idX }; 
    const typeOfTaskRecord = await this.typeOfTaskSchema.findOne( query );

    if( typeOfTaskRecord != null) {
      return TypeOfTaskMap.toDomain(typeOfTaskRecord);
    }
    else
      return null;
  }

  public async existsByDomainId (typeOfTaskId: TypeOfTaskId | string): Promise<Boolean> {
    console.log("repo \n");
    const query = { domainId: typeOfTaskId};
    console.log(query, "teste")
    const typeOfTaskRecord = await this.typeOfTaskSchema.findOne( query as FilterQuery<ITypeOfTaskPersistence & Document> );
    console.log("Find by domain ID \n \n \n \n");
    console.log(typeOfTaskRecord, "task record printed no repo");
    if( typeOfTaskRecord != null) {
      return true;
    }
    else
      return false;
  }  public async findByDomainId (buildingId: TypeOfTaskId | string): Promise<TypeOfTask> {
    const query = { domainId: buildingId};
    const buildingRecord = await this.typeOfTaskSchema.findOne( query as FilterQuery<ITypeOfTaskPersistence & Document> );
    console.log("Find by domain ID");
    console.log(buildingRecord);
    if( buildingRecord != null) {
      return TypeOfTaskMap.toDomain(buildingRecord);
    }
    else
      return null;
  }
  }

