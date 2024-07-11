import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import IRoomController from '../../controllers/IControllers/IRoomController';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
  app.use('/room', route,isAuth, attachCurrentUser);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        floor: Joi.string().required(),
        name: Joi.string().required(),
        xDimension: Joi.number().required(),
        yDimension: Joi.number().required(),
        roomType: Joi.string().required(),
        doorx: Joi.number().required(),
        doory: Joi.number().required(),
        description: Joi.string(),
        superiorCornerX: Joi.number().required(),
        superiorCornerY: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createRoom(req, res, next),
  );
  route.get('/listRooms', (req, res, next) => ctrl.listRooms(req,res, next));
};
