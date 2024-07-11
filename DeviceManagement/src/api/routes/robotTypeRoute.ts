import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
  //app.use('/robotTypes', isAuth, attachCurrentUser, route);
  app.use('/robotTypes', route);

  const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

  route.post('',
    celebrate({
      body: Joi.object({
        robotType: Joi.string().required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        typeOfTasks: Joi.array()
        .items(Joi.string())
        .required(),
      })
    }),
    (req, res, next) => ctrl.createRobotType(req, res, next) );
    route.get('/listRobots', (req, res, next) => ctrl.listRobots(req,res, next));
    route.get('/listRobots/pickUpDelivery', (req, res, next) => ctrl.findByTaskPickUpDelivery(req,res, next));
    route.get('/listRobots/vigilancia', (req, res, next) => ctrl.findByTaskVigilancia(req,res, next));
};