import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor/floor";
import { FloorId } from "../../domain/floor/floorId";

export default interface IFloorRepo extends Repo<Floor> {
	save(floor: Floor): Promise<Floor>;
	findById (floorId: FloorId | string): Promise<Floor>;
	findByDomainId (floorId: FloorId | string): Promise<Floor>;
	listFloorByBuilding (floorN: string): Promise<Floor[]>;
	findByBuildingID(buildingID: string): Promise<string[]>;
	listAll(): Promise<any[]>; 
	findByDescription(description: string);
}
  