import { Service, Inject } from 'typedi';
import config from '../../config';
import { Floor } from '../domain/floor/floor';
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import { Result } from '../core/logic/Result';
import { FloorMap } from '../mappers/FloorMap';
import IFloorService from './IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';
import IBuildingRepo from '../repos/IRepos/IBuildingRepo';
import { Building } from '../domain/building/building';
import { REFUSED } from 'dns';
import { BuildingMap } from '../mappers/BuildingMap';
import IPassageRepo from '../repos/IRepos/IPassageRepo';
import { Passage } from '../domain/passage/passage';
import { FloorNumber } from '../domain/floor/floorNumber';
import { FloorDescription } from '../domain/floor/floorDescription';
import IRoomRepo from '../repos/IRepos/IRoomRepo';
import IMapDTO from '../dto/IMapDTO';


@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.floor.name) private passageRepo: IPassageRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
  ) {}

  public async listByBuilding(building: string): Promise<Floor[]> {
    try {
      console.log('No serviço');
      console.log(building);
      var floors = await this.floorRepo.listFloorByBuilding(building);
      return floors;
    } catch (e) {
      throw e;
    }
  }
  public async listFloors(): Promise<Result<IFloorDTO[]>> {
    let values: IFloorDTO[] = [];

		const floors = await this.floorRepo.listAll();

    console.log("List Buildings: ", floors);
		floors.forEach((floor) => {
			values.push(FloorMap.toDTO(floor));
		});

		return Result.ok<IFloorDTO[]>(values);
  }
  
  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    console.log('Chegou ao serviço');
    try {
      let building: Building;
      const buildingOrError = await this.getBuilding(floorDTO.floorBuilding);
      if (buildingOrError.isFailure) {
        console.log('Erro:', buildingOrError.error);
        return Result.fail<IFloorDTO>(buildingOrError.error);
      } else {
        building = buildingOrError.getValue();
      }
      const floorNumber = FloorNumber.create(floorDTO.floorNumber == null ? '' : floorDTO.floorNumber).getValue();
      const description = FloorDescription.create(floorDTO.description == null ? '' : floorDTO.description).getValue();
      console.log('Create Floor Service - Number: ', floorNumber);
      console.log('Create Floor Service - Description: ', description);
      const floorOrError = await Floor.create({
        floorNumber: floorNumber,
        description: description ,
        floorBuilding: building,
        map: floorDTO.map == null ? '' : floorDTO.map
      });
      console.log(floorOrError);

      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);
      console.log('guardou');
      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (e) {
      console.log('Chegou ao catch');
      throw e;
    }
  }
  public async getBuilding(buildingId: string): Promise<Result<Building>> {
    console.log('Entrou no getBuilding');
    const building = await this.buildingRepo.findById(buildingId);
    const found = !!building;
    console.log(found);
    if (found) {
      console.log('Entrou no found if');
      return Result.ok<Building>(building);
    } else {
      console.log('Entrou no found else');
      return Result.fail<Building>("Couldn't find building by id=" + buildingId);
    }
  }
  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByDomainId(floorDTO.id);
      console.log('Update floor service ', floorDTO.id);

      if (floor === null) {

        return Result.fail<IFloorDTO>("Floor not found");
      } else {
        const floorNumber = FloorNumber.create(floorDTO.floorNumber == null ? '' : floorDTO.floorNumber).getValue();
        const description = FloorDescription.create(floorDTO.description == null ? '' : floorDTO.description).getValue();
        floor.props.floorNumber = floorNumber;
        floor.props.description= description;
        await this.floorRepo.save(floor);

        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;

        console.log('DTO result: ', floorDTOResult);
        return Result.ok<IFloorDTO>(floorDTOResult);
      }
    } catch (e) {
      console.error('Error in updateFloor: ', e);
      throw e;
    }
  }
  public async findBuildingsWithFloorCount(minFloors: number, maxFloors: number): Promise<Building[]> {
    const buildings = await this.buildingRepo.listAllDomainIds();
    const resultBuildings = [];
    for (const building of buildings) {
      const floors = await this.floorRepo.listFloorByBuilding(building);
      const floorCount = floors.length;
      if (floorCount >= minFloors && floorCount <= maxFloors) {
        const foundBuilding = await this.buildingRepo.findByBuilding(building);
        if (foundBuilding) {
          console.log('Found Building: ', foundBuilding);
          resultBuildings.push(foundBuilding);
        }
      }
    }

    return resultBuildings;
  }
  public async getFloorWithPassages(floorBuildingId: string): Promise<Result<IFloorDTO[]>> {
    try {
      const floors = await this.floorRepo.findByBuildingID(floorBuildingId);
      console.log('Floors', floors);
      const passages = await this.passageRepo.getAllPassageIDs();
      console.log('Passages', passages);
      const floorInfoArray: Floor[] = [];
      floors.forEach(async floorId => {
        try {
          const floorInfo = await this.floorRepo.findById(floorId);
          floorInfoArray.push(floorInfo);
        } catch (error) {
          console.error(`Error while retrieving floor information for ${floorId}:`, error);
        }
      });
      const PassageInfoArray: Passage[] = [];
      passages.forEach(async passageId => {
        try {
          const passageInfo = await this.passageRepo.findById(passageId);
          PassageInfoArray.push(passageInfo);
        } catch (error) {
          console.error(`Error while retrieving floor information for ${passageId}:`, error);
        }
      });

      if (floorInfoArray === null) {
        return Result.fail<IFloorDTO[]>('No Floor found');
      } else if (PassageInfoArray === null) {
        return Result.fail<IFloorDTO[]>('No Passage found');
      } else {
        let array: IFloorDTO[] = [];
        PassageInfoArray.forEach(passage => {
          floorInfoArray.forEach(floor => {
            if (passage.floorBuilding1.toString() === floor.floorId.toString()) {
              array.push(FloorMap.toDTO(floor));
            } else if (passage.floorBuilding2.toString() === floor.floorId.toString()) {
              array.push(FloorMap.toDTO(floor));
            }
          });
        });

        //Delete duplicate entries
        const uniqueIds: Set<string> = new Set();
        let newArray: IFloorDTO[] = [];
        newArray = array.filter(item => {
          // Check if the id is already in the Set
          if (!uniqueIds.has(item.id)) {
            // If not, add it to the Set and include it in the new array
            uniqueIds.add(item.id);
            return true;
          }
          // If it's a duplicate id, exclude it from the new array
          return false;
        });
        return Result.ok<IFloorDTO[]>(newArray);
      }
    } catch (e) {
      throw e;
    }
  }

  public async loadMap(file: IMapDTO): Promise<Result<boolean>> {

    try {

      const jsonString = JSON.stringify(file);
      console.log(file.floorCode)
      const floor = await this.floorRepo.findByDescription(file.floorCode);

      if (floor === null) {
        return Result.fail<boolean>("floor not found");
      }
      floor.map = jsonString;
      console.log("jsonString");
      console.log(floor);
      const floorPersistence = FloorMap.toPersistence(floor);
      console.log("persistance", floorPersistence);
      const saveFloor = await this.floorRepo.save(floor);
      console.log("save floor:",saveFloor);

      if (floor === null) {
        return Result.fail<boolean>("Erro ao carregar Mapa")
      }
      return Result.ok<boolean>(true);
    }

    catch (e) {
      throw e;
    }
  }
 
}
