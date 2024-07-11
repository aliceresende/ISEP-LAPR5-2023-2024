import { Service, Inject } from 'typedi';
import config from '../../config';
import { Elevator } from '../domain/elevator/elevator';
import IElevatorRepo from '../repos/IRepos/IElevatorRepo';
import { Result } from '../core/logic/Result';
import { ElevatorMap } from '../mappers/ElevatorMap';
import IElevatorService from './IServices/IElevatorService';
import IBuildingRepo from '../repos/IRepos/IBuildingRepo';
import { Building } from '../domain/building/building';
import { IElevatorDTO } from '../dto/IElevatorDTO';
import { ElevatorBrand } from '../domain/elevator/elevatorBrand';
import { ElevatorModel } from '../domain/elevator/elevatorModel';
import { ElevatorSeriesNumber } from '../domain/elevator/elevatorSeriesNumber';
import { ElevatorX } from '../domain/elevator/elevatorX';
import { ElevatorY } from '../domain/elevator/elevatorY';
import { ElevatorLocation } from '../domain/elevator/elevatorLocation';
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import { Floor } from '../domain/floor/floor';

@Service()
export default class ElevatorService implements IElevatorService {
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
  ) {}

  // Create Elevator
  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    console.log('Chegou ao serviço');
    try {
      let building: Building;

      const buildingOrError = await this.getBuilding(elevatorDTO.building);
      if (buildingOrError.isFailure) {
        console.log('Erro:', buildingOrError.error);
        return Result.fail<IElevatorDTO>(buildingOrError.error);
      } else {
        building = buildingOrError.getValue();
      }
      console.log('Antes do GetFloors');
      const floorOrError = await this.getFloors(elevatorDTO.floors);
      if (floorOrError.isFailure) {
        console.log('Falhou');
        return Result.fail<IElevatorDTO>('Error floors ' + floorOrError.error);
      }

      const floors: Floor[] = floorOrError.getValue();

      const brand = ElevatorBrand.create(elevatorDTO.brand == null ? '' : elevatorDTO.brand).getValue();
      const model = ElevatorModel.create(elevatorDTO.model == null ? '' : elevatorDTO.model).getValue();
      const seriesNumber = ElevatorSeriesNumber.create(
        elevatorDTO.seriesNumber == null ? '' : elevatorDTO.seriesNumber,
      ).getValue();
      const x = ElevatorX.create(elevatorDTO.x).getValue();
      const y = ElevatorY.create(elevatorDTO.y).getValue();
      const location = ElevatorLocation.create(elevatorDTO.location == null ? '' : elevatorDTO.location).getValue();

      const elevatorOrError = Elevator.create({
        building: building,
        floors: floors,
        brand: brand,
        model: model,
        seriesNumber: seriesNumber,
        description: elevatorDTO.description == null ? '' : elevatorDTO.description,
        x: x,
        y: y,
        location: location,
      });
      console.log('Elevator create', elevatorOrError);

      if (elevatorOrError.isFailure) {
        return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
      }
      const elevatorResult = elevatorOrError.getValue();

      await this.elevatorRepo.save(elevatorResult);
      console.log('------Save------');
      const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (e) {
      console.log('TRY CATCH');
      throw e;
    }
  }

  public async getBuilding(buildingId: string): Promise<Result<Building>> {
    const building = await this.buildingRepo.findById(buildingId);
    const found = !!building;
    if (found) {
      return Result.ok<Building>(building);
    } else {
      return Result.fail<Building>("Couldn't find building by id=" + buildingId);
    }
  }

  public async getFloors(floorsId: string[]): Promise<Result<Floor[]>> {
    let floors: Floor[] = [];
    console.log('Floors: ', floorsId);
    for (let i = 0; i < floorsId.length; i++) {
      const floorFound = await this.floorRepo.findByDomainId(floorsId[i]);
      floors.push(floorFound);
    }
    if (floors != null) {
      return Result.ok<Floor[]>(floors);
    } else {
      return null;
    }
  }

  // Update elevator
  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findById(elevatorDTO.id);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>('Elevator not found');
      } else {
        const brand = await ElevatorBrand.create(elevatorDTO.brand);
        const model = await ElevatorModel.create(elevatorDTO.model);
        const seriesNumber = await ElevatorSeriesNumber.create(elevatorDTO.seriesNumber);
        const x = await ElevatorX.create(elevatorDTO.x);
        const y = await ElevatorY.create(elevatorDTO.y);
        const location = await ElevatorLocation.create(elevatorDTO.location);
        const floorOrError = await this.getFloors(elevatorDTO.floors);
        if (floorOrError.isFailure) {
          console.log('Falhou');
          return Result.fail<IElevatorDTO>('Error floors ' + floorOrError.error);
        }

        elevator.props.brand = brand.getValue();
        elevator.props.model = model.getValue();
        elevator.props.seriesNumber = seriesNumber.getValue();
        elevator.props.x = x.getValue();
        elevator.props.y = y.getValue();
        elevator.props.location = location.getValue();
        elevator.props.floors = floorOrError.getValue();

        //(elevator.props.floors = elevatorDTO.floors), (elevator.props.description = elevatorDTO.description);

        await this.elevatorRepo.save(elevator);

        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;

        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  // List elevator by building
  public async listByBuilding(building: string): Promise<Elevator[]> {
    try {
      console.log('In the service ');
      var elevators = await this.elevatorRepo.listElevatorByBuilding(building);
      return elevators;
    } catch (e) {
      throw e;
    }
  }
  public async listElevatorsByBuilding(building: string): Promise<Result<IElevatorDTO[]>> {
    try {
      const elevador = await this.elevatorRepo.findByBuilding(building);

      if (elevador == null)
        return Result.fail<IElevatorDTO[]>('O edifício com o código ' + building + ' não tem elevadores.');

      let elevadoresDTO: IElevatorDTO[] = [];

      // O UC pede para listar os elevadorES, porém, no sprint A é pedido para assumir que no máximo existe apenas 1 elevador por edifício.
      // Como tal, esta solução adiciona só 1 elemento ao array. Se no futuro for necessário alterar, basta meter um foreach.
      elevadoresDTO.push(ElevatorMap.toDTO(elevador));

      console.log('ELEVATOR DTO DATA', elevadoresDTO);
      return Result.ok<IElevatorDTO[]>(elevadoresDTO);
    } catch (e) {
      throw e;
    }
  }

  public async listAllElevators(): Promise<Result<IElevatorDTO[]>> {
    let values: IElevatorDTO[] = [];

    const elevators = await this.elevatorRepo.listAll();

    elevators.forEach(elevator => {
      values.push(ElevatorMap.toDTO(elevator));
    });

    return Result.ok<IElevatorDTO[]>(values);
  }
}
