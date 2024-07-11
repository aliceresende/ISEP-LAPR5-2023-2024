import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagePersistence } from '../dataschema/IPassagePersistence';
import IPassageRepo from './IRepos/IPassageRepo';
import { Passage } from '../domain/passage/passage';
import { PassageId } from '../domain/passage/passageId';
import { PassageMap } from '../mappers/PassageMap';


@Service()
export default class PassageRepo implements IPassageRepo {
  private models: any;

  constructor(
    @Inject('passageSchema') private passageSchema : Model<IPassagePersistence & Document>,
  ) { }


  private createBaseQuery (): any {
    return {
      where: {},
    }
  }
  

  public async exists (passageId: PassageId | string): Promise<boolean> {

    const idX = passageId instanceof PassageId ? (<PassageId>passageId).id.toValue() : PassageId;

    const query = { domainId: idX}; 
    const PassageDocument = await this.passageSchema.findOne( query );

    return !!PassageDocument === true;
  }


  public async save (passage: Passage): Promise<Passage> {
    const query = { domainId: passage.id.toString() }; 

    const PassageDocument = await this.passageSchema.findOne( query );
    console.log("Chegou ao Repo função save");
    try {
      if (PassageDocument === null ) {
        const rawPassage: any = PassageMap.toPersistence(passage);
        console.log("Antes do create:",rawPassage);
        const PassageCreated = await this.passageSchema.create(rawPassage);
        console.log("Depois do create",PassageCreated);
        return PassageMap.toDomain(PassageCreated);
      } else {
        PassageDocument.floorBuilding1= passage.floorBuilding1.id.toString();
        PassageDocument.floorBuilding2 = passage.floorBuilding2.id.toString();
        PassageDocument.location = passage.location;
        PassageDocument.fb1x = passage.fb1x;
        PassageDocument.fb2x = passage.fb2x;
        PassageDocument.fb1y = passage.fb1y;
        PassageDocument.fb2y = passage.fb2y;
        PassageDocument.passageCode=passage.passageCode;
  
          await PassageDocument.save();
  
          return passage;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findById (passageId: PassageId | string): Promise<Passage> {

    const idX = passageId instanceof PassageId ? (<PassageId>passageId).id.toValue() : passageId;

    const query = { domainId: idX }; 
    const PassageRecord = await this.passageSchema.findOne( query );
  
    if( PassageRecord != null) {
      return PassageMap.toDomain(PassageRecord);
    }
    else
      return null;
  }
  public async findByDomainId (passageId: PassageId | string): Promise<Passage> {
    const query = { domainId: passageId};
    const passageRecord = await this.passageSchema.findOne( query as FilterQuery<IPassagePersistence & Document> );
    console.log("Find by domain ID");
    console.log(passageRecord);
    if( passageRecord != null) {
      return PassageMap.toDomain(passageRecord);
    }
    else
      return null;
  }
  public async listPassage(building1: string,building2: string): Promise<Passage[]> {
    return new Promise<Passage[]>((resolve, reject) => {
      this.passageSchema.find({ floorBuilding1: { $regex: '^' + building1} },{floorBuilding2: {$regex: '^'+building2}}, (error: any, result: Passage[]) => {
        if (error) {
          reject(error);
        } else {
          let passages: Passage[] = [];
          result.forEach(function (element: Passage) {
            passages.push(element);
          });
          resolve(passages);
        }
      });
    });
    
  }

  public async findAll(): Promise<Passage[]> {
    return new Promise<Passage[]>((resolve, reject) => {
      this.passageSchema.find({}, (error: any, result: Passage[]) => {
        if (error) reject(error);
        else {
          let passages: Passage[] = [];
          result.forEach(function (element: Passage) {
            passages.push(element);
          });
          resolve(passages);
        }
      });
    });
  }

  
  async getAllPassageIDs(): Promise<string[]> {
    try {
      const passages = await this.passageSchema.find({}, 'domainId').exec();
      return passages.map((passage) => passage.id.toString());
    } catch (error) {
      console.error('Error while fetching all Passage IDs:', error);
      throw error;
    }
  }
  public async findAllByBuilding(building1: string, building2: string): Promise<string[]> {
    try {
        const passages = await this.passageSchema.find({
            $or: [
                {
                    $and: [
                        { floorBuilding1: { $regex: building1, $options: 'i' } }, // Correspondência parcial do edifício1 em piso1
                        { floorBuilding2: { $regex: building2, $options: 'i' } }, // Correspondência parcial do edifício2 em piso2
                    ]
                },
                {
                    $and: [
                      { floorBuilding2: { $regex: building2, $options: 'i' } }, // Correspondência parcial do edifício1 em piso1
                      { floorBuilding1: { $regex: building1, $options: 'i' } }// Correspondência parcial do edifício1 em piso2
                    ]
                },
            ],
        }).exec();

        if (passages.length > 0) {
            const passageIds = passages.map((passage) => passage.id);
            return passageIds;
        }

        return [];
    } catch (error) {
        console.error(error);
        return [];
    }

}
  

}