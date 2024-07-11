import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
  //app.use('/robots', isAuth, attachCurrentUser, route);
  app.use('/robots', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post('',
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        nickname: Joi.string().required(),
        seriesNumber: Joi.string().required(),
        robotType: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.boolean().required(),
      })
    }),
    (req, res, next) => ctrl.createRobot(req, res, next) );

    route.get('/listRobots', (req, res, next) => ctrl.listRobots(req,res, next));

    route.get('/robotType/:id', (req, res, next) => ctrl.listRobotsByRobotType(req,res,next));
    
    route.patch('/state',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.deactivateRobot(req, res, next) );

};