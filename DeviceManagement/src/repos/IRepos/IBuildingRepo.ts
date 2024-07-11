import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building/building";
import { BuildingId } from "../../domain/building/buildingId";

export default interface IBuildingRepo extends Repo<Building> {
	save(building: Building): Promise<Building>;
	findById (id: string): Promise<Building>;
	listAll(): Promise<any[]>;
	listAllDomainIds(): Promise<string[]>;
	findByBuilding(buildingId: BuildingId | string);
	findByDomainId (buildingId: BuildingId | string): Promise<Building>
}
  