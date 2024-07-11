import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

import config from '../../../config';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
  app.use('/elevators',isAuth, attachCurrentUser, route);

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        building: Joi.string().required(),
        floors: Joi.array()
          .items(Joi.string())
          .required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        seriesNumber: Joi.string().required(),
        description: Joi.string().optional(),
        x: Joi.number().required(),
        y: Joi.number().required(),
        location: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createElevator(req, res, next),
  );

  route.patch(
    '',

    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        building: Joi.string().required(),
        floors: Joi.array()
          .items(Joi.string())
          .required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        seriesNumber: Joi.string().required(),
        description: Joi.string().optional(),
        x: Joi.number().required(),
        y: Joi.number().required(),
        location: Joi.string().required(),

      }),
    }),
    (req, res, next) => ctrl.updateElevator(req, res, next),
  );

  route.get('/listElevators/:elevatorBuilding', (req, res, next) => ctrl.listElevatorsByBuilding(req, res, next));

  route.get('/allElevators', (req, res, next) => ctrl.listAllElevators(req, res, next));
};
