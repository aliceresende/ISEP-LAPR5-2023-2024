import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController'; 
import config from "../../../config";
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';


const route = Router();

export default (app: Router) => {
  app.use('/buildings',isAuth, attachCurrentUser, route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
  
  route.post('',
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        x: Joi.number().required().min(0),
        y: Joi.number().required().min(0)
      })
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next) );

    route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        code: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        x: Joi.number().required().min(0),
        y: Joi.number().required().min(0)
      })
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );

    route.get('/listBuildings', (req, res, next) => ctrl.listBuildings(req,res, next));
};