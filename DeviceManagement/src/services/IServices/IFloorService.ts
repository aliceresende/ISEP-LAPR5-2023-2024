import { Result } from '../../core/logic/Result';
import { Building } from '../../domain/building/building';
import { Floor } from '../../domain/floor/floor';
import IFloorDTO from '../../dto/IFloorDTO';
import IMapDTO from '../../dto/IMapDTO';

export default interface IFloorService {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  getBuilding(buildingId: string): Promise<Result<Building>>;
  listByBuilding(floorN: string): Promise<Floor[]>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  findBuildingsWithFloorCount(minFloors: number, maxFloors: number): Promise<Building[]>;
  getFloorWithPassages(floorBuildingId: string): Promise<Result<IFloorDTO[]>>;
  listFloors(): Promise<Result<IFloorDTO[]>>;
  loadMap(file: IMapDTO): Promise<Result<boolean>>
}
