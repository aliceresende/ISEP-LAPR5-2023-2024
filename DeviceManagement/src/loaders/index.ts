import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import UserService from '../services/userService';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');


  // SCHEMAS 
  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const floorSchema ={
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };
  const passageSchema ={
    name: 'passageSchema',
    schema: '../persistence/schemas/passageSchema',
  };

  const elevatorSchema ={
    name:'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema'
  };

  const roomSchema = {
    name:'roomSchema',
    schema: '../persistence/schemas/roomSchema'
  };

  const robotTypeSchema = {
    name:'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema'
  };
  const robotSchema = {
    name:'robotSchema',
    schema: '../persistence/schemas/robotSchema'
  };

  const typeOfTaskSchema = {
    name:'typeOfTaskSchema',
    schema: '../persistence/schemas/typeOfTaskSchema'
  }


//CONTROLLERS
  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }
  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const floorController ={
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }
  const passageController ={
    name: config.controllers.passage.name,
    path: config.controllers.passage.path
  }
  const elevatorController ={
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  }
  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  }
  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path
  }
  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }
  const typeOfTaskController = {
    name: config.controllers.typeOfTask.name,
    path: config.controllers.typeOfTask.path
  }

  //REPOS
  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }
  const passageRepo = {
    name: config.repos.passage.name,
    path: config.repos.passage.path
  }
  const elevatorRepo ={
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  }
  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }
  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path
  }
  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }
  const typeOfTaskRepo = {
    name: config.repos.typeOfTask.name,
    path: config.repos.typeOfTask.path
  }
  //SERVICES
  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }
  const floorService={
    name:config.services.floor.name,
    path:config.services.floor.path
  }
  const passageService={
    name:config.services.passage.name,
    path:config.services.passage.path
  }
  const elevatorService ={
    name:config.services.elevator.name,
    path:config.services.elevator.path
  }
  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }
  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path
  }
  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }
  const typeOfTaskService = {
    name: config.services.typeOfTask.name,
    path: config.services.typeOfTask.path
  }

  const buildingSchema = {
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path,
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      floorSchema,
      buildingSchema,
      passageSchema,
      elevatorSchema,
      roomSchema,
      robotTypeSchema,
      robotSchema,
      typeOfTaskSchema,

    ],
    controllers: [
      userController,
      roleController,
      floorController,
      buildingController,
      passageController,
      elevatorController,
      roomController,
      robotTypeController,
      robotController,
      typeOfTaskController
    ],
    repos: [
      roleRepo,
      userRepo,
      floorRepo,
      buildingRepo,
      passageRepo,
      elevatorRepo,
      roomRepo,
      robotTypeRepo,
      robotRepo,
      typeOfTaskRepo
    ],
    services: [
      userService,
      roleService,
      floorService,
      buildingService,
      passageService,
      elevatorService,
      roomService,
      robotTypeService,
      robotService,
      typeOfTaskService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
