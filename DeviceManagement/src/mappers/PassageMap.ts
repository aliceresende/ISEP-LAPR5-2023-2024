import { Container } from 'typedi';
import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Passage } from '../domain/passage/passage';
import IPassageDTO from '../dto/IPassageDTO';
import FloorRepo from '../repos/floorRepo';
export class PassageMap extends Mapper<Passage> {
    public static toDTO(passage: any): IPassageDTO {
        return {
          id: passage.domainId,
          location: passage.location,
          floorBuilding1: passage.floorBuilding1.toString(),
          floorBuilding2: passage.floorBuilding2.toString(),
          fb1x:passage.fb1x,
          fb1y:passage.fb1y,
          fb2x:passage.fb2x,
          fb2y:passage.fb2y,
          passageCode:passage.passageCode
        } as IPassageDTO;
      }
      public static async toDomain(passage: any): Promise<Passage> {
        const repo = Container.get(FloorRepo);
        console.log(passage);
        const floor1 = await repo.findById(passage.floorBuilding1);
        const floor2 = await repo.findById(passage.floorBuilding2);
        //console.log("Floor1: ", floor1);
        //console.log("Floor2: ", floor2);
    
        const passageOrError = Passage.create({
            location: passage.location,
            floorBuilding1: floor1,
            floorBuilding2: floor2,
            fb1x:passage.fb1x,
            fb1y:passage.fb1y,
            fb2x:passage.fb2x,
            fb2y:passage.fb2y,
            passageCode:passage.passageCode
        }, new UniqueEntityID(passage.domainId));

        console.log(passageOrError);
    
        if (passageOrError.isFailure) {
            console.log(passageOrError.error);
            return null; // Handle the error as needed
        }
    
        console.log("Chegou ao toDomain");
        return passageOrError.getValue();
    }
    
    public static toPersistence(passage: Passage): any {
      return {
        domainId: passage.id.toValue(),
        location: passage.location,
        floorBuilding1: passage.floorBuilding1.id.toValue(),
        floorBuilding2: passage.floorBuilding2.id.toValue(),
        fb1x:passage.fb1x,
        fb1y:passage.fb1y,
        fb2x:passage.fb2x,
        fb2y:passage.fb2y,
        passageCode: passage.passageCode,
      };
    }
    
}