import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import passage from './routes/passageRoute';
import floor from './routes/floorRoute';
import building from './routes/buildingRoute';
import elevator from './routes/elevatorRoute';
import room from './routes/roomRoute'
import robotType  from './routes/robotTypeRoute';
import robot  from './routes/robotRoute';
import typeOfTask from './routes/typeOfTaskRoute'



export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	floor(app);
	building(app);
	passage(app);
	elevator(app);
	room(app);
	robotType(app);
	robot(app);
	typeOfTask(app);

	return app;
}