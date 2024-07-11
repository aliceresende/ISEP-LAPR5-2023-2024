import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

import IRobotRepo from './IRepos/IRobotRepo';
import { RobotMap } from '../mappers/RobotMap';
import { RobotId } from '../domain/robot/robotId';
import { Robot } from '../domain/robot/robot';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (robotId: RobotId | string): Promise<boolean> {

    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { domainId: idX}; 
    const RobotDocument = await this.robotSchema.findOne( query );

    return !!RobotDocument === true;
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString() }; 
    console.log("Query:" , query);
    const robotDocument = await this.robotSchema.findOne( query );
    console.log("Document:", robotDocument);
    try {
      if (robotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);
        console.log("Raw Robot", rawRobot);

        const robotCreated = await this.robotSchema.create(rawRobot);
        console.log("Created Robot",robotCreated );

        return RobotMap.toDomain(robotCreated);
      } else {
        const seriesNumberString = robot.props.seriesNumber.value;
        robotDocument.code= robot.code;
        robotDocument.nickname = robot.nickname;
        robotDocument.seriesNumber= seriesNumberString;
        robotDocument.status  = robot.status;
        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findById (robotId: RobotId | string): Promise<Robot> {

    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { domainId: idX }; 
    const RobotRecord = await this.robotSchema.findOne( query );

    if( RobotRecord != null) {
      return RobotMap.toDomain(RobotRecord);
    }
    else
      return null;
  }  

  public async listAll(): Promise<Robot[]> {
    return new Promise<Robot[]>((resolve, reject) => {
      this.robotSchema.find({}, (error: any, result: Robot[]) => {
        if (error) reject(error);
        else {
          let robots: Robot[] = [];
          result.forEach(function (element: Robot) {
            robots.push(element);
          });
          resolve(robots);
        }
      });
    });
    
  }

  public async findByDomainId (robotId: RobotId | string): Promise<Robot> {
    const query = { domainId: robotId};
    const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );
    console.log(robotRecord, "repo");
    if( robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    }
    else
      return null;
  }

  public async findByRobotTypeId(id: string): Promise<any[]> {
    const query={robotType:id};

    const robotResult = await this.robotSchema.find( query as FilterQuery<IRobotPersistence & Document>);
    console.log("ROBOT REPO", robotResult);
    const robots = []
    if(robotResult != null){
      robotResult.forEach((element) => {
      robots.push(RobotMap.toDomain(element));
      })
    }
    console.log("ROBOT", robots);
    return robotResult;
}

}