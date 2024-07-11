import { Result } from "../../core/logic/Result";
import { Building } from "../../domain/building/building";
import {IBuildingDTO} from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  listBuildings(): Promise<Result<IBuildingDTO[]>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>
  //updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  //getRole (roleId: string): Promise<Result<IRoleDTO>>;
}