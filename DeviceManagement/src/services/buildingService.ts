import { Service, Inject } from 'typedi';
import config from "../../config";
import {IBuildingDTO} from '../dto/IBuildingDTO';
import { Building } from "../domain/building/building";
import IBuildingRepo from '../repos/IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {

      const buildingOrError = await Building.create( buildingDTO );

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();
      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
      return Result.ok<IBuildingDTO>( buildingDTOResult )
    } catch (e) {
      throw e;
    }
  }
  public async listBuildings(): Promise<Result<IBuildingDTO[]>> {
    let values: IBuildingDTO[] = [];

		const buildings = await this.buildingRepo.listAll();

    console.log("List Buildings: ", buildings);
		buildings.forEach((building) => {
			values.push(BuildingMap.toDTO(building));
		});

		return Result.ok<IBuildingDTO[]>(values);
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
      console.log("Update building service ", buildingDTO.id);
  
      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }
      else {
        building.props.code = buildingDTO.code;
        building.props.name = buildingDTO.name;
        building.props.description= buildingDTO.description;
        building.props.x = buildingDTO.x;
        building.props.y = buildingDTO.y;
        await this.buildingRepo.save(building);

        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
    
        console.log("DTO result: ", buildingDTOResult);
        return Result.ok<IBuildingDTO>( buildingDTOResult )
        }
    } catch (e) {
      console.error("Error in updateBuilding: ", e);
      throw e;
    }
  }

}
