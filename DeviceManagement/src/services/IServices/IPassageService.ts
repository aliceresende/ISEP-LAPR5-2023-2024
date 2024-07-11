import { Result } from "../../core/logic/Result";
import { Building } from "../../domain/building/building";
import { Floor } from "../../domain/floor/floor";
import IFloorDTO from "../../dto/IFloorDTO";
import IPassageDTO from "../../dto/IPassageDTO";

export default interface IFloorService  {
  createPassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  getFloor(floorId1: string,floorId2: string): Promise<Result<Floor>>;
  //listPassagesBetweenBuildings(idbuilding1:string,idbuilding2:string): Promise<Result<IPassageDTO[]>>
  //listPassagesBetweenBuildings(idbuilding1: string,idbuilding2:string): Promise<Result<IPassageDTO[]>>
  updatePassage(passageDTO: IPassageDTO): Promise<Result<IPassageDTO>>;
  getPassagesBetweenBuildings(building1: string, building2: string): Promise<Result<IPassageDTO[]>>
  listPassages(): Promise<Result<IPassageDTO[]>>
}
