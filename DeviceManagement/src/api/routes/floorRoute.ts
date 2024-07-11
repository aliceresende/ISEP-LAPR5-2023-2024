import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorController from '../../controllers/IControllers/IFloorController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';
import { isEmpty } from 'lodash';

const route = Router();



export default (app: Router) => {
  app.use('/floors', route);

  console.log("Chegou à Rota");
  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post('',
    celebrate({
      body: Joi.object({
        floorNumber: Joi.number().required(),
        description: Joi.string().optional(),
        floorBuilding: Joi.string().required(),
        map: Joi.string().optional(),
      })
    }),
    
    (req, res, next) => ctrl.createFloor(req, res, next) 
    );

    route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        floorNumber: Joi.string().required(),
        description: Joi.string().optional(),
        floorBuilding: Joi.string().optional(),
       
      }),
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next) );

    route.get('/listFloors', (req, res, next) => ctrl.listFloors(req,res, next));
    route.get('/listFloors/:floorBuilding', (req, res, next) => ctrl.listFloorsByBuilding(req,res, next));
    route.get('/listFloors/:min/:max', (req, res, next) => ctrl.listBuildingsByMaxMin(req,res, next));
    route.get('listFloors/:floorId', (req, res, next) => ctrl.listFloorsByBuilding(req,res, next));

    route.patch('/loadMap',
    
    (req, res, next) => {
      const ficheiro = req.body;
      if(isEmpty(ficheiro)){
        return res.status(200).json("O ficheiro carregado não é um ficheiro JSON ");
      }
        ctrl.loadMap(req, res, next);
      
    }
  )
  
};