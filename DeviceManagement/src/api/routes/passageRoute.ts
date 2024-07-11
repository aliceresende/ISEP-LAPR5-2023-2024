import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPassageController from '../../controllers/IControllers/IPassageController';
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
  app.use('/passages', isAuth,attachCurrentUser, route);

  const ctrl = Container.get(config.controllers.passage.name) as IPassageController;

  route.post('',
    celebrate({
      body: Joi.object({
        location: Joi.string().required(),
        floorBuilding1: Joi.string().required(),
        floorBuilding2: Joi.string().required(),
        fb1x: Joi.number().required().min(0),
        fb2x: Joi.number().required().min(0),
        fb1y: Joi.number().required().min(0),
        fb2y: Joi.number().required().min(0),
        passageCode:Joi.string().optional()
      })
    }),
    (req, res, next) => ctrl.createPassage(req, res, next) );

   /* route.get(
      '/listPassages/:idBuilding1/:idBuilding2',
      (req, res, next) => { 
        ctrl.listPassagesBetweenBuildings(req,res,next);
        req.params.idBuilding1;
        req.params.idBuilding2
      }
    );
*/
    route.get(
      '/listPassages/:idBuilding1/:idBuilding2',
      (req, res, next) => { 
        ctrl.listPassagesBetweenBuilding(req,res,next);
        req.params.idBuilding1;
        req.params.idBuilding2
      }
    );
    route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        floorBuilding1: Joi.string().required(),
        floorBuilding2: Joi.string().required(),
        location: Joi.string().optional(),
        passageCode:Joi.string().optional()
      }),
    }),
    (req, res, next) =>  ctrl.updatePassage(req, res, next));
  
    //route.get('/listPassages/:floorBuilding1/:floorBuilding2', (req, res, next) => ctrl.listPassagesBetweenBuildings(req,res, next));
    route.get('/listPassages/:floorBuilding1/:floorBuilding2', (req, res, next) => ctrl.listPassagesBetweenBuilding(req,res, next));
    route.get('/listPassages',(req, res, next) => ctrl.listPassages(req,res, next));
}

