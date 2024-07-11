import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { RobotTypeMap } from '../mappers/RobotTypeMap';
import { RobotTypeId } from '../domain/robotType/robotTypeId';
import { RobotType } from '../domain/robotType/robotType';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
  private models: any;

  constructor(
    @Inject('robotTypeSchema') private robotTypeSchema : Model<IRobotTypePersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (robotTypeId: RobotTypeId | string): Promise<boolean> {

    const idX = robotTypeId instanceof RobotTypeId ? (<RobotTypeId>robotTypeId).id.toValue() : robotTypeId;

    const query = { domainId: idX}; 
    const RobotTypeDocument = await this.robotTypeSchema.findOne( query );

    return !!RobotTypeDocument === true;
  }

  public async save (robotType: RobotType): Promise<RobotType> {
    const query = { domainId: robotType.id.toString() }; 
    const robotTypeDocument = await this.robotTypeSchema.findOne( query );
    
    console.log("Document:", robotTypeDocument);
    try {
      if (robotTypeDocument === null ) {
        const rawRobotType: any = RobotTypeMap.toPersistence(robotType);
        console.log("Raw Robot", rawRobotType);
        const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);
        console.log("Created Robot",robotTypeCreated );
        return RobotTypeMap.toDomain(robotTypeCreated);
      } else {
        const brandString = robotType.props.brand.value;
        const modelString = robotType.props.model.value;
        robotTypeDocument.brand= brandString;
        robotTypeDocument.model = modelString;
        robotTypeDocument.robotType= robotType.robotType;
        await robotTypeDocument.save();

        return robotType;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findById (robotTypeId: RobotTypeId | string): Promise<RobotType> {

    const idX = robotTypeId instanceof RobotTypeId ? (<RobotTypeId>robotTypeId).id.toValue() : robotTypeId;

    const query = { domainId: idX }; 
    const RobotTypeRecord = await this.robotTypeSchema.findOne( query );

    if( RobotTypeRecord != null) {
      return RobotTypeMap.toDomain(RobotTypeRecord);
    }
    else
      return null;
  }  

  public async listAll(): Promise<RobotType[]> {
    return new Promise<RobotType[]>((resolve, reject) => {
      this.robotTypeSchema.find({}, (error: any, result: RobotType[]) => {
        if (error) reject(error);
        else {
          let robots: RobotType[] = [];
          result.forEach(function (element: RobotType) {
            robots.push(element);
          });
          resolve(robots);
        }
      });
    });
    
  }

  public async findByTaskPickUpDelivery(): Promise<RobotType[]> {
    return this.findByTask('PickUpDelivery');
  }

  public async findByTaskVigilancia(): Promise<RobotType[]> {
    return this.findByTask('Vigilancia');
  }

  private async findByTask(taskName: string): Promise<any[]> {
    try {
    const robotTypeRecords = await this.robotTypeSchema.find({ "typeOfTasks": taskName });
    const robotTypes = await Promise.all(robotTypeRecords.map(async (record) => RobotTypeMap.toDTO(record)));
 
    return robotTypeRecords;
    } catch (err) {
      throw err;
    }
  }

}