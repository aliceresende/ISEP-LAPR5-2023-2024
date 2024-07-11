import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePassagesComponent } from './campus-manager-menu/passage/create-passages/create-passages.component';
import { ListPassagesComponent } from './campus-manager-menu/passage/list-passages/list-passages.component';
import { UpdatePassagesComponent } from './campus-manager-menu/passage/update-passages/update-passages.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { ListFloorsComponent } from './campus-manager-menu/floor/list-floors/list-floors.component';
import { ListMinMaxComponent } from './campus-manager-menu/building/list-min-max/list-min-max.component';
import { UpdateFloorComponent } from './campus-manager-menu/floor/update-floor/update-floor.component';
import { CreateBuildingComponent } from './campus-manager-menu/building/create-building/create-building.component';
import { ListElevatorComponent } from './campus-manager-menu/elevator/list-elevator/list-elevator.component';
import { CreateRobotsComponent } from './fleet-manager-menu/robots/create-robots/create-robots.component';
import { UpdateRobotsComponent } from './fleet-manager-menu/robots/update-robots/update-robots.component';
import { ListRobotsComponent } from './fleet-manager-menu/robots/list-robots/list-robots.component';
import { FloorComponent } from './campus-manager-menu/floor/create-floor/floor.component';
import { EditElevatorComponent } from './campus-manager-menu/elevator/edit-elevator/edit-elevator.component';
import { CreateRoomComponent } from './campus-manager-menu/room/create-room/create-room.component';
import { CreateElevatorComponent } from './campus-manager-menu/elevator/create-elevator/create-elevator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListBuildingComponent } from './campus-manager-menu/building/List-building/list-building.component';
import { UpdateBuildingComponent } from './campus-manager-menu/building/update-building/update-building';
import { BuildingService } from './campus-manager-menu/building/building.service';
import { FloorService } from './campus-manager-menu/floor/floor.service';
import { ElevatorService } from './campus-manager-menu/elevator/elevator.service';
import { PassageService } from './campus-manager-menu/passage/passage.service';
import { RobotService } from './fleet-manager-menu/robots/robot.service';
import { RoomService } from './campus-manager-menu/room/room.service';
import { CreateRobotTypeComponent } from './fleet-manager-menu/robotType/create-robot-type/create-robot-type.component';
import { RobotTypeService } from './fleet-manager-menu/robotType/robot-type.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { CampusMenuComponent } from './campus-manager-menu/campus-menu/campus-menu.component';
import { FleetMenuComponent } from './fleet-manager-menu/fleet-menu/fleet-menu.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { RouteViewComponent } from './common/route-view/route-view.component';
import { PlanningComponent } from './planning/planning.component';
import { CreateManagersComponent } from './admin/create-managers/create-managers.component';
import { ActivateUsersComponent } from './admin/activate-users/activate-users.component';
import { PrivacyPolicyModalComponent } from './auth/privacy-policy-modal/privacy-policy-modal.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { TaskMenuComponent } from './task-manager-menu/task-menu/task-menu.component';
import { WaitingRequestsComponent } from './task-manager-menu/waiting-requests/waiting-requests.component';
import { CreateTasksComponent } from './user-menu/create-tasks/create-tasks.component';
import { TasksSequenceComponent } from './task-manager-menu/tasks-sequence/tasks-sequence.component';
import { DeleteUserComponent } from './user-menu/delete-user/delete-user.component';
import { UpdateUserComponent } from './user-menu/update-user/update-user.component';
import { GetTaskByUser } from './task-manager-menu/get-tasks-by-user/get-tasks-by-user.component';
import { CreateTasksService } from './user-menu/create-tasks.service';
import { TasksService } from './task-manager-menu/tasks.service';
import { UserService } from './user-menu/user.service';
import { OpenFloorComponent } from './campus-manager-menu/floor/open-floor/open-floor.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    FloorComponent,
    CreatePassagesComponent,
    ListPassagesComponent,
    UpdatePassagesComponent,
    ListFloorsComponent,
    ListMinMaxComponent,
    UpdateFloorComponent,
    OpenFloorComponent,
    CreateBuildingComponent,
    ListBuildingComponent,
    ListElevatorComponent,
    CreateRobotsComponent,
    UpdateRobotsComponent,
    ListRobotsComponent,
    EditElevatorComponent,
    CreateElevatorComponent,
    CreateRoomComponent,
    UpdateBuildingComponent,
    CreateRobotTypeComponent,
    SignupComponent,
    SigninComponent,
    CampusMenuComponent,
    FleetMenuComponent,
    AdminMenuComponent,
    RouteViewComponent,
    PlanningComponent,
    CreateManagersComponent,
    ActivateUsersComponent,
    PrivacyPolicyModalComponent,
    UserMenuComponent,
    TaskMenuComponent,
    WaitingRequestsComponent,
    CreateTasksComponent,
    TasksSequenceComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    GetTaskByUser,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule
    
  ],

  providers: [UserService,TasksService,CreateTasksService,AuthService, BuildingService, FloorService,ElevatorService,PassageService,RobotService,RoomService,RobotTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
