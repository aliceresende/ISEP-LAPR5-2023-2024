import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITypeOfTaskController from '../../controllers/IControllers/ITypeOfTaskController';

const route = Router();

export default (app: Router) => {
  app.use('/typeOfTasks', route);

  const ctrl = Container.get(config.controllers.typeOfTask.name) as ITypeOfTaskController;

  route.post('',
    celebrate({
      body: Joi.object({
        designation: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createTypeOfTask(req, res, next) );
};