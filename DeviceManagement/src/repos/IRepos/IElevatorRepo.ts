import { Repo } from '../../core/infra/Repo';
import { Elevator } from '../../domain/elevator/elevator';
import { ElevatorId } from '../../domain/elevator/elevatorId';

export default interface IElevatorRepo extends Repo<Elevator> {
  save(elevator: Elevator): Promise<Elevator>;
  findById(elevatorId: ElevatorId | string): Promise<Elevator>;
  listElevatorByBuilding(elevatorId: string): Promise<Elevator[]>;
  findByBuilding(building: string): Promise<Elevator>;
  listAll(): Promise<Elevator[]>;
}
