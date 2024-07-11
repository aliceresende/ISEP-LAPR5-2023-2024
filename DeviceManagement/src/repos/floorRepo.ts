import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

import { Floor } from '../domain/floor/floor';
import { FloorId } from '../domain/floor/floorId';
import { FloorMap } from '../mappers/FloorMap';
import IFloorRepo from './IRepos/IFloorRepo';
import { Building } from '../domain/building/building';
import { Passage } from '../domain/passage/passage';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';
import { PassageMap } from '../mappers/PassageMap';
import { map } from 'lodash';

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;

  constructor(
    @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>,
    @Inject('passageSchema') private passageSchema: Model<IPassagePersistence & Document>,
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(floorId: FloorId | string): Promise<boolean> {
    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : floorId;

    const query = { domainId: idX };
    const FloorDocument = await this.floorSchema.findOne(query);

    return !!FloorDocument === true;
  }

  public async save(floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString() };
    console.log(query)
    const FloorDocument = await this.floorSchema.findOne(query);
    console.log('Chegou ao Repo função save');
    try {
      if (FloorDocument === null ) {

        const rawFloor: any = FloorMap.toPersistence(floor);
        console.log("Raw Floor: ", rawFloor);
        const FloorCreated = await this.floorSchema.create(rawFloor);
        console.log("Floor Created: ", FloorCreated);
        return FloorMap.toDomain(FloorCreated);
      } else {
        console.log("else")
        const descriptionString = floor.props.description.value;
        const floorNumberString = floor.props.floorNumber.value;
        FloorDocument.description= descriptionString;
        FloorDocument.floorNumber = floorNumberString;
        FloorDocument.map = floor.map;

        console.log(FloorDocument)
        await FloorDocument.save();

        return floor;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findById(floorId: FloorId | string): Promise<Floor> {
    console.log('ID: ', floorId);
    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : floorId;
    console.log('idx', idX);
    const query = { domainId: idX };
    const FloorRecord = await this.floorSchema.findOne(query);

    if (FloorRecord != null) {
      return FloorMap.toDomain(FloorRecord);
    } else return null;
  }
  public async findByDomainId(floorId: FloorId | string): Promise<Floor> {
    const query = { domainId: floorId };
    const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    console.log('Find by domain ID');
    console.log(floorRecord);
    if (floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    } else return null;
  }
  public async listFloorByBuilding(building: string): Promise<Floor[]> {
    return new Promise<Floor[]>((resolve, reject) => {
      this.floorSchema.find({ floorBuilding: { $regex: '^' + building } }, (error: any, result: Floor[]) => {
        if (error) {
          reject(error);
        } else {
          let floors: Floor[] = [];
          result.forEach(function(element: Floor) {
            floors.push(element);
          });
          resolve(floors);
        }
      });
    });
  }
  public async findByBuildingID(buildingID: string): Promise<string[]> {
    const floorRecord = await this.getAllPassageIDs();
    if (floorRecord != null) {
      let array: string[] = [];
      floorRecord.forEach(element => {
        if (element == buildingID) array.push(element);
      });
      return array;
    } else return null;
  }
  async getAllPassageIDs(): Promise<string[]> {
    try {
      const passageIDs = await this.passageSchema.find({}, '_id').exec();
      console.log(passageIDs);
      return passageIDs.map(id => id._id.toString());
    } catch (error) {
      console.error('Error while fetching all Passage IDs:', error);
      throw error;
    }
  }
  public async listAll(): Promise<any[]> {
    return new Promise<Floor[]>((resolve, reject) => {
      this.floorSchema.find({}, (error: any, result: Floor[]) => {
        if (error) reject(error);
        else {
          let floors: Floor[] = [];
          result.forEach(function (element: Floor) {
            floors.push(element);
          });
          resolve(floors);
        }
      });
    });
  }

  public async findByDescription(description: string) {
    const query = { description: description };
    console.log(query)
    const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    console.log("pesquisa");
    console.log(floorRecord, "repo");
    console.log("repo", floorRecord)
    
    if (floorRecord != null){
      return FloorMap.toDomain(floorRecord);
    }
    else return null;
  }



}
