import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import AuthService from '../../services/userService';
import { IUserDTO } from '../../dto/IUserDTO';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';

import winston = require('winston');

import config from "../../../config";
import IUserController from '../../controllers/IControllers/IUserController';

const route = Router();
var user_controller = require('../../controllers/userController');

export default (app: Router) => {
  app.use('/auth', route);

  app.use('/users',route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

// Creating user by admin
  route.post(
    '/user-create',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        phone: Joi.number().required().min(100000000).max(999999999).required().error(new Error('enter contact with 9 digits')),
        taxPayerNumber: Joi.number().default(0),
      }),
    }),
    //(req, res, next) => ctrl.createUser(req, res, next));
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.createUser(req.body as IUserDTO);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }

        const {userDTO, token} = userOrError.getValue();

        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );


  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.number().required().min(100000000).max(999999999).required().error(new Error('enter contact with 9 digits')),
        role: Joi.string().default('User'),
        taxPayerNumber: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const authServiceInstance = Container.get(AuthService);
        const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }

        const {userDTO, token} = userOrError.getValue();

        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  //all users signin
  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SignIn(email, password);

        if( result.isFailure )
          return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);

  //User asks for deleting account
  route.patch('/delete/:email',(req, res, next) => ctrl.deleteUser(req, res, next));

  //User asks for update account
  route.patch('/update/:email',celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      //role: Joi.string().required(),
      phone: Joi.number().required().min(100000000).max(999999999).required().error(new Error('enter contact with 9 digits')),
      taxPayerNumber: Joi.number().default(0),
    }),
  }),(req, res, next) => ctrl.updateUser(req, res, next));


  //Activating user
  route.patch('/activateUser/:email',
  (req, res, next) => ctrl.activateUser(req, res, next) );
  //Deactivating user
  route.patch('/deactivateUser/:email',
  (req, res, next) => ctrl.deactivateUser(req, res, next) );

  route.get('/getAll', (req, res, next) => ctrl.getUsers(req, res, next));
  
  route.get('/listWaitingUsers', (req, res, next) => ctrl.getWaitingUsers(req, res, next));
};
