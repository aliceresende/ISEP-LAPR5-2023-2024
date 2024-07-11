import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

import IRoomRepo from './IRepos/IRoomRepo';
import { RoomId } from '../domain/room/roomId';
import { Room } from '../domain/room/room';
import { RoomMap } from '../mappers/RoomMap';

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(@Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(roomId: RoomId | string): Promise<boolean> {
    const idX = roomId instanceof RoomId ? (<RoomId>roomId).id.toValue() : roomId;

    const query = { domainId: idX };
    const RoomDocument = await this.roomSchema.findOne(query);

    return !!RoomDocument === true;
  }

  public async save(room: Room): Promise<Room> {
    const query = { domainId: room.id.toString() };

    const RoomDocument = await this.roomSchema.findOne(query);
    console.log('Chegou ao Repo função save');
    try {
      if (RoomDocument === null) {
        const rawRoom: any = RoomMap.toPersistence(room);
        const RoomCreated = await this.roomSchema.create(rawRoom);
        return RoomMap.toDomain(RoomCreated);
      } else {
        RoomDocument.name = room.props.name;
        RoomDocument.xDimension = room.props.xDimension;
        RoomDocument.yDimension = room.props.yDimension;
        RoomDocument.roomType = room.props.roomType;
        RoomDocument.doorx = room.props.doorx;
        RoomDocument.doory = room.props.doory;
        RoomDocument.description = room.props.description;
        RoomDocument.superiorCornerX = room.props.superiorCornerX;
        RoomDocument.superiorCornerY = room.props.superiorCornerY;
        await RoomDocument.save();
        return room;
      }
    } catch (err) {
      console.error('Error in save method:', err);
      throw err;
    }
  }
  public async findById(roomId: RoomId | string): Promise<Room> {
    const idX = roomId instanceof RoomId ? (<RoomId>roomId).id.toValue() : roomId;

    const query = { domainId: idX };
    const RoomRecord = await this.roomSchema.findOne(query);

    if (RoomRecord != null) {
      return RoomMap.toDomain(RoomRecord);
    } else return null;
  }

  public async listAll(): Promise<any[]> {
    return new Promise<Room[]>((resolve, reject) => {
      this.roomSchema.find({}, (error: any, result: Room[]) => {
        if (error) reject(error);
        else {
          let rooms: Room[] = [];
          result.forEach(function (element: Room) {
            rooms.push(element);
          });
          resolve(rooms);
        }
      });
    });
  }

  public async findByDomainId(roomId: RoomId | string): Promise<Room> {
    const query = { domainId: roomId };
    const roomRecord = await this.roomSchema.findOne(query as FilterQuery<IRoomPersistence & Document>);
    console.log('Find by domain ID');
    console.log(roomRecord);
    if (roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    } else return null;
  }
}
