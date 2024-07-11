import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

import { Elevator } from '../domain/elevator/elevator';
import { ElevatorId } from '../domain/elevator/elevatorId';
import { ElevatorMap } from '../mappers/ElevatorMap';
import IElevatorRepo from './IRepos/IElevatorRepo';
import { Floor } from '../domain/floor/floor';

@Service()
export default class ElevatorRepo implements IElevatorRepo {
  private models: any;

  constructor(@Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(elevatorId: ElevatorId | string): Promise<boolean> {
    const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).id.toValue() : elevatorId;

    const query = { domainId: idX };
    const ElevatorDocument = await this.elevatorSchema.findOne(query);

    return !!ElevatorDocument === true;
  }

  public async save(elevator: Elevator): Promise<Elevator> {
    const query = { domainId: elevator.id.toString() };

    const ElevatorDocument = await this.elevatorSchema.findOne(query);
    try {
      if (ElevatorDocument === null) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);
        console.log('Raw Elevator: ', rawElevator);
        const ElevatorCreated = await this.elevatorSchema.create(rawElevator);
        return ElevatorMap.toDomain(ElevatorCreated);
      } else {
        const brandString = elevator.props.brand.value;
        const modelString = elevator.props.model.value;
        const seriesNumberString = elevator.props.seriesNumber.value;
        const xNumber = elevator.props.x.value;
        const yNumber = elevator.props.y.value;
        const locationString = elevator.props.location.value;
        ElevatorDocument.brand = brandString;
        ElevatorDocument.model = modelString;
        ElevatorDocument.seriesNumber = seriesNumberString;
        ElevatorDocument.description = elevator.description;
        ElevatorDocument.x = xNumber.toString();
        ElevatorDocument.y = yNumber.toString();
        ElevatorDocument.location = locationString;
        await ElevatorDocument.save();

        return elevator;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findById(elevatorId: ElevatorId | string): Promise<Elevator> {
    const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).id.toValue() : elevatorId;

    const query = { domainId: idX };
    const ElevatorRecord = await this.elevatorSchema.findOne(query);

    if (ElevatorRecord != null) {
      return ElevatorMap.toDomain(ElevatorRecord);
    } else return null;
  }

  public async listElevatorByBuilding(building: string): Promise<Elevator[]> {
    return new Promise<Elevator[]>((resolve, reject) => {
      // Using a simple equality check for building name
      this.elevatorSchema.find({ building: building }, (error: any, result: Elevator[]) => {
        if (error) {
          console.error('Error in listElevatorByBuilding:', error);
          reject(error);
        } else {
          // Use the map function to simplify the code
          const elevators = result.map((element: Elevator) => element);
          resolve(elevators);
        }
      });
    });
  }
  public async findByBuilding(building: string): Promise<Elevator> {
    const query = { building: building };
    const elevadorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (elevadorRecord != null) {
      return ElevatorMap.toDomain(elevadorRecord);
    } else {
      return null;
    }
  }

  public async listAll(): Promise<Elevator[]> {
    const elevators = await this.elevatorSchema.find({});
    const elevatorEntities = await Promise.all(
      elevators.map(async (elevator: IElevatorPersistence & Document) => {
        return ElevatorMap.toDomain(elevator);
      }),
    );
    return elevatorEntities; /*
    return new Promise<Elevator[]>((resolve, reject) => {
      this.elevatorSchema.find({}, (error: any, result: Elevator[]) => {
        if (error) reject(error);
        else {
          let elevators: Elevator[] = [];
          result.forEach(function(element: Elevator) {
            elevators.push(element);
          });
          resolve(elevators);
        }
      });
    });*/
  }
}
