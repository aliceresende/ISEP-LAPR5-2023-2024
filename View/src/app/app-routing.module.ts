import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPassagesComponent } from './campus-manager-menu/passage/list-passages/list-passages.component';
import { CreatePassagesComponent } from './campus-manager-menu/passage/create-passages/create-passages.component';
import { UpdatePassagesComponent } from './campus-manager-menu/passage/update-passages/update-passages.component';
import { ListFloorsComponent } from './campus-manager-menu/floor/list-floors/list-floors.component';
import { ListMinMaxComponent } from './campus-manager-menu/building/list-min-max/list-min-max.component';
import { CreateBuildingComponent } from './campus-manager-menu/building/create-building/create-building.component';
import { ListRobotsComponent } from './fleet-manager-menu/robots/list-robots/list-robots.component';
import { CreateRobotsComponent } from './fleet-manager-menu/robots/create-robots/create-robots.component';
import { UpdateFloorComponent } from './campus-manager-menu/floor/update-floor/update-floor.component';
import { UpdateBuildingComponent } from './campus-manager-menu/building/update-building/update-building';

import { FloorComponent } from "./campus-manager-menu/floor/create-floor/floor.component";
import {ListElevatorComponent} from "./campus-manager-menu/elevator/list-elevator/list-elevator.component";
import { CreateElevatorComponent } from './campus-manager-menu/elevator/create-elevator/create-elevator.component';
import { UpdateRobotsComponent } from './fleet-manager-menu/robots/update-robots/update-robots.component';
import {CreateRoomComponent} from "./campus-manager-menu/room/create-room/create-room.component";
import { ListBuildingComponent } from './campus-manager-menu/building/List-building/list-building.component';
import {EditElevatorComponent} from "./campus-manager-menu/elevator/edit-elevator/edit-elevator.component";
import { CreateRobotTypeComponent } from './fleet-manager-menu/robotType/create-robot-type/create-robot-type.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CampusMenuComponent } from './campus-manager-menu/campus-menu/campus-menu.component';
import { FleetMenuComponent } from './fleet-manager-menu/fleet-menu/fleet-menu.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { CampusManagerGuard } from './guards/campus-manager.guard';
import { FleetManagerGuard } from './guards/fleet-manager.guard';
import { CreateManagersComponent } from './admin/create-managers/create-managers.component';
import { ActivateUsersComponent } from './admin/activate-users/activate-users.component';
import { AdminGuard } from './guards/admin.guard';
import { TaskMenuComponent } from './task-manager-menu/task-menu/task-menu.component';
import { WaitingRequestsComponent } from './task-manager-menu/waiting-requests/waiting-requests.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CreateTasksComponent } from './user-menu/create-tasks/create-tasks.component';
import { TaskManagerGuard } from './guards/task-manager.guard';
import { UserGuard } from './guards/user.guard';
import { TasksSequenceComponent } from './task-manager-menu/tasks-sequence/tasks-sequence.component';
import { DeleteUserComponent } from './user-menu/delete-user/delete-user.component';
import { UpdateUserComponent } from './user-menu/update-user/update-user.component';
import { GetTaskByUser } from './task-manager-menu/get-tasks-by-user/get-tasks-by-user.component';
import { OpenFloorComponent } from './campus-manager-menu/floor/open-floor/open-floor.component';




const routes: Routes = [
  { path: '', redirectTo: 'auth/signup', pathMatch: 'full' },
  {
    path: 'campus-menu',
    canActivate: [CampusManagerGuard],
    component: CampusMenuComponent,
    children: [
      { path: 'passages/list', component: ListPassagesComponent },
      { path: 'passages/create', component: CreatePassagesComponent },
      { path: 'passages/list', component: ListPassagesComponent },
      { path: 'passages/update', component: UpdatePassagesComponent },
      { path: 'floors/create', component: FloorComponent },
      { path: 'floors/update', component: UpdateFloorComponent },
      { path: 'floors/list', component: ListFloorsComponent },
      { path: 'floors/open', component: OpenFloorComponent },
      { path: 'buildings/create', component: CreateBuildingComponent},
      { path: 'buildings/update', component: UpdateBuildingComponent},
      { path: 'buildings/list', component: ListBuildingComponent},
      { path: 'buildings/listMinMax', component: ListMinMaxComponent },
      { path: 'elevators/create', component: CreateElevatorComponent},
      { path: 'elevators/editElevators', component:EditElevatorComponent },
      { path: 'elevators/listElevators', component:ListElevatorComponent},
      { path:'rooms/create', component:CreateRoomComponent},


    ]
  },
  { path: 'fleet-menu',
  component: FleetMenuComponent,
  canActivate: [FleetManagerGuard],
  children:[
    { path: 'robots/list', component: ListRobotsComponent },
    { path: 'robots/create', component: CreateRobotsComponent},
    { path: 'robots/update', component: UpdateRobotsComponent },
  
    { path: 'robotType/create', component: CreateRobotTypeComponent },
  ], 
},

 { path: 'admin', component: AdminMenuComponent, canActivate: [AdminGuard],
 children:[{path:'create', component: CreateManagersComponent},
 {path:'activate', component: ActivateUsersComponent}
],
},
 { path: 'auth/signup', component: SignupComponent},
 { path: 'auth/signin', component: SigninComponent},
 { path: 'user-menu', component:UserMenuComponent, canActivate: [UserGuard, AdminGuard],
children:[{path:'create-task', component: CreateTasksComponent},
          {path:'delete-user', component: DeleteUserComponent},
          {path:'update-user', component: UpdateUserComponent}] },
 
{path: 'task-menu', component:TaskMenuComponent,
canActivate: [TaskManagerGuard],
children:[{path: 'waiting', component:WaitingRequestsComponent},
{path: 'sequence', component: TasksSequenceComponent},
{path: 'getTasks', component: GetTaskByUser}],
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
