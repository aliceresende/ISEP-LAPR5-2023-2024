import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

import { Building } from "../domain/building/building";
import { BuildingId } from "../domain/building/buildingId";
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingRepo from './IRepos/IBuildingRepo';

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;
  constructor(
    @Inject('buildingSchema') private buildingSchema : Model<IBuildingPersistence & Document>
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (buildingId: BuildingId | string): Promise<boolean> {

    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : buildingId;

    const query = { domainId: idX}; 
    const buildingDocument = await this.buildingSchema.findOne( query );

    return !!buildingDocument === true;
  }

  public async save (building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() }; 
    console.log(query);
    const buildingDocument = await this.buildingSchema.findOne( query );

    try {
      if (buildingDocument === null ) {
        const rawbuilding: any = BuildingMap.toPersistence(building);

        const buildingCreated = await this.buildingSchema.create(rawbuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.code = building.code;
        buildingDocument.name = building.name;
        buildingDocument.description= building.description;
        buildingDocument.x= building.x;
        buildingDocument.y=building.y;
        await buildingDocument.save();
        return building;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findById (buildingId: BuildingId | string): Promise<Building> {
    const query = { domainId: buildingId }; 
    const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document>);
    if( buildingRecord != null) {
      console.log("Building Schema :",buildingRecord);
      return BuildingMap.toDomain(buildingRecord);
    }
    else
      return null;
  }
  public async findByBuilding(buildingId: BuildingId | string) {
    const query = { domainId: buildingId }; 
    const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document>);
    if( buildingRecord != null) {
      return buildingRecord;
    }
    else
      return null;
  }

  public async listAll(): Promise<any[]> {
    return new Promise<Building[]>((resolve, reject) => {
      this.buildingSchema.find({}, (error: any, result: Building[]) => {
        if (error) reject(error);
        else {
          let buildings: Building[] = [];
          result.forEach(function (element: Building) {
            buildings.push(element);
          });
          resolve(buildings);
        }
      });
    });
  }
  public async listAllDomainIds(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.buildingSchema.find({}, 'domainId', (error: any, result: { domainId: string }[]) => {
        if (error) {
          reject(error);
        } else {
          const domainIds: string[] = result.map((element) => element.domainId);
          resolve(domainIds);
        }
      });
    });
  }

  public async findByDomainId (buildingId: BuildingId | string): Promise<Building> {
    const query = { domainId: buildingId};
    const buildingRecord = await this.buildingSchema.findOne( query as FilterQuery<IBuildingPersistence & Document> );
    console.log("Find by domain ID");
    console.log(buildingRecord);
    if( buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }
    else
      return null;
  }

}