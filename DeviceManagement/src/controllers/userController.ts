import { Response, Request, NextFunction } from 'express';

import { Container, Inject, Service} from 'typedi';

import config from '../../config';

import IUserRepo from '../repos/IRepos/IUserRepo';

import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';
import IUserController from './IControllers/IUserController';
import { Result } from '../core/logic/Result';
import IUserService from '../services/IServices/IUserService';


exports.getMe = async function(req, res: Response) {
  
    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMap.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}

@Service()
export default class UserController implements IUserController {

  constructor(@Inject(config.services.user.name) private userServiceInstance: IUserService) {}

  public async createUser(req: Request, res: Response, next: NextFunction){
    try {
      const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<{userDTO:IUserDTO, token:string}>;

      if (userOrError.isFailure) {
        return res.status(402).send();
      }

      const userResponseDto = userOrError.getValue();

      return res.json(userResponseDto).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.deleteUser(req.params.email);

      if (userOrError.isFailure) {
        return res.status(402).send();
      }
      const userResponseDto = userOrError.getValue();

      return res.json(userResponseDto).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.updateUser(req.body as IUserDTO);

      if (userOrError.isFailure) {
        return res.status(402).send();
      }
      const userResponseDto = userOrError.getValue();

      return res.json(userResponseDto).status(201);
    } catch (e) {
      return next(e);
    }
  }

    public async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.activateUser(req.params.email) as Result<IUserDTO>;
      if (userOrError.isFailure) {
      return res.status(402).send();
      }
  
      const userDTO = userOrError.getValue();  
  
      return res.json(userDTO ).status(201);    }
    catch (e) {
      return next(e);
    }
    };
  
    public async deactivateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.deactivateUser(req.params.email) as Result<IUserDTO>;
      if (userOrError.isFailure) {
      return res.status(402).send();
      }
  
      const userDTO = userOrError.getValue();  
    
      return res.json( userDTO ).status(201);    }
    catch (e) {
      return next(e);
    }
    };


    public async getUsers(req: Request, res: Response, next: NextFunction) {
			try {
			  const userOrError = await this.userServiceInstance.getUsers() as Result<IUserDTO[]>;
			  console.log(userOrError.getValue());
			  if (userOrError.isFailure) {
				  return res.status(402).send();
			  }
			  const userDTO = userOrError.getValue();

			  return res.json( userDTO ).status(200);   
      } catch (e) {
			  return next(e);
			}
		};

    public async getWaitingUsers(req: Request, res: Response, next: NextFunction) {
      try {
        const userOrError = await this.userServiceInstance.getWaitingUsers() as Result<IUserDTO[]>;
        console.log(userOrError.getValue());
        if (userOrError.isFailure) {
          return res.status(402).send();
        }
        const userDTO = userOrError.getValue();

        return res.json( userDTO ).status(200);   
      } catch (e) {
        return next(e);
      }
    }
}