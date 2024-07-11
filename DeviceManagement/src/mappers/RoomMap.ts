import { Container } from 'typedi';
import { Mapper } from '../core/infra/Mapper';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { Room } from '../domain/room/room';
import IRoomDTO from '../dto/IRoomDTO';
import FloorRepo from '../repos/floorRepo';

export class RoomMap extends Mapper<Room> {
  public static toDTO(room: Room): IRoomDTO {
    return {
      id: room.id?.toString(),
      floor: room.floor?.id?.toString(),
      name: room.name,
      xDimension: room.xDimension,
      yDimension: room.yDimension,
      roomType: room.roomType,
      doorx: room.doorx,
      doory: room.doory,
      description: room.description,
      superiorCornerX: room.superiorCornerX,
      superiorCornerY: room.superiorCornerY,
    } as IRoomDTO;
  }


  public static async toDomain(room: any): Promise<Room> {
    const repo = Container.get(FloorRepo);
    const floor = await repo.findById(room.floor);

    const roomOrError = Room.create(
      {
        floor: floor,
        name: room.name,
        xDimension: room.xDimension,
        yDimension: room.yDimension,
        roomType: room.roomType,
        doorx: room.doorx,
        doory: room.doory,
        description: room.description,
        superiorCornerX: room.superiorCornerX,
        superiorCornerY: room.superiorCornerY,
      },
      new UniqueEntityID(room.domainId),
    );

    roomOrError.isFailure ? console.error('Error in toDomain:', roomOrError.error) : null;

    console.log('Chegou ao toDomain');

    return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence(room: Room): any {
    const a = {
      domainId: room.id.toString(),
      floor: room.floor.id.toValue(),
      name: room.name,
      xDimension: room.xDimension,
      yDimension: room.yDimension,
      roomType: room.roomType,
      doorx: room.doorx,
      doory: room.doory,
      description: room.description,
      superiorCornerX: room.superiorCornerX,
      superiorCornerY: room.superiorCornerY,
    };
    return a;
  }
}
