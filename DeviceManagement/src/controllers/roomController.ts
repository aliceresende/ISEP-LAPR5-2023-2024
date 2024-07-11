import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IRoomController from './IControllers/IRoomController';
import IRoomDTO from '../dto/IRoomDTO';
import IRoomService from '../services/IServices/IRoomService';

import { Result } from '../core/logic/Result';

@Service()
export default class RoomController implements IRoomController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.room.name) private RoomServiceInstance: IRoomService) {}

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Chegou ao controller createRoom');
      const roomOrError = (await this.RoomServiceInstance.createRoom(req.body as IRoomDTO)) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res.status(402).send();
      }

      const roomDTO = roomOrError.getValue();
      return res.json(roomDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
  public async listRooms(req: Request, res: Response, next: NextFunction) {
    try {
			const roomOrError = (await this.RoomServiceInstance.listRooms()) as Result<IRoomDTO[]>;
      
			if (roomOrError.isFailure) {
				return res.status(402).json(roomOrError.error);
			}

			const roomDTO = roomOrError.getValue();
			return res.status(201).json(roomDTO);
		} catch (e) {
			return next(e);
		}
}
}
