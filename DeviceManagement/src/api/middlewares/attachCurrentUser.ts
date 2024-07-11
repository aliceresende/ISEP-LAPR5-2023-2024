import { Container} from 'typedi';

import winston from 'winston';

import config from '../../../config';

import IUserRepo from '../../repos/IRepos/IUserRepo';

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger = Container.get('logger') as winston.Logger;
  try {
    
    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
      next( new Error("Token inexistente ou inválido ") );

    const id = req.token.id;

    const user = await userRepo.findById( id );

    if (user){
      console.log("USER ROLE:",user.role);
      if (checkPermissions(req.originalUrl, user.role)) {
        next();
      } else {
        next(new Error("Utilizador não tem permissão para esta operação"));
      }
  }else{
      next( new Error("Token não corresponde a qualquer utilizador do sistema") );
}
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};
const checkPermissions = (route, userRole) => {
  if (userRole.name === 'Campus Manager' && (route.startsWith('/api/buildings') || route.startsWith('/api/elevators') || route.startsWith('/api/floors') || route.startsWith('/api/passages') || route.startsWith('/api/rooms'))) {
    return true;
  } else if (userRole.name === 'Fleet Manager' && (route.startsWith('/api/robots') || route.startsWith('/api/robotsTypes'))) {
    return true;
  } else if(userRole.name =='Admin'){
    return true;
  }
  
  return false;
};

export default attachCurrentUser;
