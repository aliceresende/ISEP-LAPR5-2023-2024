import { Service, Inject } from 'typedi';
import config from '../../config';
import IRoomRepo from '../repos/IRepos/IRoomRepo';
import { Result } from '../core/logic/Result';
import { RoomMap } from '../mappers/RoomMap';
import IRoomService from './IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';
import IFloorRepo from '../repos/IRepos/IFloorRepo';
import { Floor } from '../domain/floor/floor';
import { Room } from '../domain/room/room';

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
  ) {}

  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    console.log('Chegou ao serviço');

    try {
      let floor: Floor;
      const [floorOrError] = await Promise.all([this.getFloor(roomDTO.floor)]);
      if (floorOrError.isFailure) {
        console.log('Erro:', floorOrError.error);
        return Result.fail<IRoomDTO>(floorOrError.error);
      } else {
        floor = floorOrError.getValue();
      }

      const roomOrError = await Room.create({
        floor: floor,
        name: roomDTO.name,
        xDimension: roomDTO.xDimension,
        yDimension: roomDTO.yDimension,
        roomType: roomDTO.roomType,
        doorx: roomDTO.doorx,
        doory: roomDTO.doory,
        description: roomDTO.description == null ? '' : roomDTO.description,
        superiorCornerX: roomDTO.superiorCornerX,
        superiorCornerY: roomDTO.superiorCornerY,
      });

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      console.log('Antes roomResult Service');
      const roomResult = roomOrError.getValue();
      console.log('CHEGOU ANTES SAVE');
      await this.roomRepo.save(roomResult);
      console.log('guardou');
      const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
      return Result.ok<IRoomDTO>(roomDTOResult);
    } catch (e) {
      console.log('Chegou ao catch');
      throw e;
    }
  }

  public async getFloor(floorId: string): Promise<Result<Floor>> {
    console.log('Entrou no getFloor',floorId);
    const floor = await this.floorRepo.findByDomainId(floorId);
    console.log("Floor", floor);
    const found = !!floor;
    console.log(found);
    if (found) {
      console.log('Entrou no found if');
      return Result.ok<Floor>(floor);
    } else {
      console.log('Entrou no found else');
      return Result.fail<Floor>("Couldn't find Floor by id=" + floorId);
    }
  }
  public async listRooms(): Promise<Result<IRoomDTO[]>> {
    let values: IRoomDTO[] = [];

		const rooms = await this.roomRepo.listAll();
    console.log("SERVICE ROOMS:", rooms);
		rooms.forEach((room) => {
			values.push(RoomMap.toDTO(room));
		});

		return Result.ok<IRoomDTO[]>(values);
  }
}
