import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { RobotService } from 'src/app/fleet-manager-menu/robots/robot.service';
import { RobotTypeService } from 'src/app/fleet-manager-menu/robotType/robot-type.service';
import { Robot } from 'src/app/fleet-manager-menu/robots/robot';
import { RobotType } from 'src/app/fleet-manager-menu/robotType/robotType';
import { Room } from 'src/app/campus-manager-menu/room/room';
import { RoomService } from 'src/app/campus-manager-menu/room/room.service';

@Component({
  selector: 'app-waiting-requests',
  templateUrl: './waiting-requests.component.html',
  styleUrls: ['./waiting-requests.component.css']
})
export class WaitingRequestsComponent {

  constructor(private taskRequestService: TasksService, private roomService:RoomService, private robotService: RobotService, private robotTypeService: RobotTypeService) { }

  taskPickDeliver = new Array<any>();
  taskVigilance = new Array<any>();
  robotPickDelivery = new Array<any>();
  robotVigilance= new Array<any>();

  rooms:Room[]=[];
  roomName?:string;


  ngOnInit(): void {
    this.listWaitingPUDTask();
    this.listWaitingVigilanceTask();
    this.getPickUpDeliveryRobots();
    this.getVigilanceRobots();
  }
  getPickUpDeliveryRobots(){
    this.robotTypeService.getPickDeliveryRobots().subscribe((pickupDeliveryTypes: RobotType[]) => {
      console.log("Pickup Delivery Types:", pickupDeliveryTypes);
      this.robotService.getRobotsList().subscribe((allRobots: Robot[]) => {
        console.log("All Robots:", allRobots);
        this.robotPickDelivery = allRobots.filter((robot: Robot) =>
          pickupDeliveryTypes.some((type: RobotType) => type.id === robot.robotType)
        );
        console.log("Filtered Robots:", this.robotPickDelivery);
      });
    });
  }

  getVigilanceRobots(){
    this.roomService.getRoomsList().subscribe(rooms => this.rooms=rooms);
    this.robotTypeService.getVigilanceRobots().subscribe((vigilanceTypes: RobotType[]) => {
      this.robotService.getRobotsList().subscribe((allRobots: Robot[]) => {
        this.robotVigilance = allRobots.filter((robot: Robot) =>
        vigilanceTypes.some((type: RobotType) => type.id === robot.robotType)
        );
      });
    });
  }

  listWaitingPUDTask() {
    this.roomService.getRoomsList().subscribe(rooms => this.rooms=rooms);
    this.taskRequestService.listWaitingPUDRequests().subscribe((data: any[]) => {
      this.taskPickDeliver = data.map(task => {
        return {
          ...task,
          robotAssignedTo: '' // Override with empty string to show "Select Robot"
        };
      });
    });
  }

  listWaitingVigilanceTask() {
    this.taskRequestService.listWaitingVigilanceRequests().subscribe((data: any[]) => {
      this.taskVigilance = data.map(task => {
        return {
          ...task,
          robotAssignedTo: '' // Override with empty string to show "Select Robot"
        };
      });
    });
  }
  approveTask(taskId: string, robotId: string, isPickUpDelivery: boolean) {
    if (isPickUpDelivery) {
      this.taskRequestService.approveOrRefusePickUpDelivery(taskId, true, robotId)
        .subscribe(
          response => {
            console.log('Task approved', response);
          },
          error => {
            console.error('Error approving task', error);
          }
        );
    } else {
      this.taskRequestService.approveOrRefuseVigilance(taskId, true, robotId)
        .subscribe(
          response => {
            console.log('Task approved', response);
          },
          error => {
            console.error('Error approving task', error);
          }
        );
    }
  }

  rejectTask(taskId: string, isPickUpDelivery: boolean) {
    if (isPickUpDelivery) {
      this.taskRequestService.approveOrRefusePickUpDelivery(taskId, false, "")
        .subscribe(
          response => {
            console.log('Task rejected', response);
          },
          error => {
            console.error('Error rejecting task', error);
          }
        );
    } else {
      this.taskRequestService.approveOrRefuseVigilance(taskId, false, "")
        .subscribe(
          response => {
            console.log('Task rejected', response);
            // handle the response
          },
          error => {
            console.error('Error rejecting task', error);
          }
        );
    }
  }

  filterIdToName(roomId?: string){
    if(roomId){
      for(let i = 0; i < this.rooms.length; i++){
        if(roomId === this.rooms[i].id){
          let name = this.rooms[i].name;
          if (name != undefined) {
            this.roomName = name;
          }
        }
      }
    }
    return this.roomName
  }

}

