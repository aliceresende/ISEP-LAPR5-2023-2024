import { Result } from '../../core/logic/Result';
import { Building } from '../../domain/building/building';
import { Elevator } from '../../domain/elevator/elevator';
import { IElevatorDTO } from '../../dto/IElevatorDTO';

export default interface IElevatorService {
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getBuilding(buildingId: string): Promise<Result<Building>>;
  listByBuilding(building: string): Promise<Elevator[]>;
  listElevatorsByBuilding(building: string): Promise<Result<IElevatorDTO[]>>;
  listAllElevators(): Promise<Result<IElevatorDTO[]>>;
}
