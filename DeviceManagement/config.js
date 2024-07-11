import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}


export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL:
    process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.ihmuga8.mongodb.net/?retryWrites=true&w=majority',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  // Property for rooms types
  room: process.env.ACCEPTEDROOMTYPES ||  '["Anfiteatro", "Gabinete", "Auditório", "Outro" ]',

  // New property for email extension
  acceptedEmailExtension: process.env.ACCEPTED_EMAIL_EXTENSION || 'isep.ipp.pt',


  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    user:{
      name: 'UserController',
      path: '../controllers/userController',
    },
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    building: {
      name: 'BuildingController',
      path: '../controllers/buildingController',
    },
    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
    },
    passage: {
      name: 'PassageController',
      path: '../controllers/passageController',
    },
    elevator: {
      name: 'ElevatorController',
      path: '../controllers/elevatorController',
    },
    room: {
      name: 'RoomController',
      path: '../controllers/roomController',
    },
    robotType: {
      name: 'RobotTypeController',
      path: '../controllers/robotTypeController',
    },
    robot: {
      name: 'RobotController',
      path: '../controllers/robotController',
    },
    typeOfTask: {
      name: 'typeOfTaskController',
      path: '../controllers/typeOfTaskController',
    },
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    building: {
      name: 'BuildingRepo',
      path: '../repos/buildingRepo',
    },
    floor: {
      name: 'FloorRepo',
      path: '../repos/floorRepo',
    },
    passage: {
      name: 'PassageRepo',
      path: '../repos/passageRepo',
    },
    elevator: {
      name: 'ElevatorRepo',
      path: '../repos/elevatorRepo',
    },
    room: {
      name: 'RoomRepo',
      path: '../repos/roomRepo',
    },
    robotType: {
      name: 'RobotTypeRepo',
      path: '../repos/robotTypeRepo',
    },
    robot: {
      name: 'RobotRepo',
      path: '../repos/robotRepo',
    },
    typeOfTask: {
      name: 'TypeOfTaskRepo',
      path: '../repos/typeOfTaskRepo',
    },
  },

  services: {
    user:{
      name: 'UserService',
      path: '../services/userService',
    },
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    building: {
      name: 'BuildingService',
      path: '../services/buildingService',
    },
    floor: {
      name: 'FloorService',
      path: '../services/floorService',
    },
    passage: {
      name: 'PassageService',
      path: '../services/passageService',
    },
    elevator: {
      name: 'ElevatorService',
      path: '../services/elevatorService',
    },
    room: {
      name: 'RoomService',
      path: '../services/roomService',
    },
    robotType: {
      name: 'RobotTypeService',
      path: '../services/robotTypeService',
    },
    robot: {
      name: 'RobotService',
      path: '../services/robotService',
    },
    typeOfTask: {
      name: 'TypeOfTaskService',
      path: '../services/typeOfTaskService',
    },
  },
};
