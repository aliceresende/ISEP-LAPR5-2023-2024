import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { RobotService } from 'src/app/fleet-manager-menu/robots/robot.service';
import { RobotTypeService } from 'src/app/fleet-manager-menu/robotType/robot-type.service';
import { RobotType } from 'src/app/fleet-manager-menu/robotType/robotType';
import { Robot } from 'src/app/fleet-manager-menu/robots/robot';

@Component({
  selector: 'app-tasks-sequence',
  templateUrl: './tasks-sequence.component.html',
  styleUrls: ['./tasks-sequence.component.css']
})
export class TasksSequenceComponent implements OnInit{
  robotPickDelivery = new Array<any>();
  robotVigilance= new Array<any>();
  taskPickDeliver = new Array<any>();
  taskVigilance = new Array<any>();
  allRobots: Robot[] = [];

  ngOnInit(): void {
    this.loadAllRobots();
  }
  constructor(private taskRequestService: TasksService,  private robotService: RobotService, private robotTypeService: RobotTypeService) { }
  onRobotSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const robotId = selectElement.value;
    this.fetchPUDTasksByRobot(robotId);
    this.fetchVigilanceTasksByRobot(robotId);
  }

  fetchPUDTasksByRobot(robotId: string) {
    this.taskRequestService.getPUDTaskByRobot(robotId).subscribe((data: any[]) => {
      this.taskPickDeliver = data;
    });
  }

  fetchVigilanceTasksByRobot(robotId: string) {
    this.taskRequestService.getVigilanceTaskByRobot(robotId).subscribe((data: any[]) => {
      this.taskVigilance = data;
    });
  }
  loadAllRobots() {
    this.robotTypeService.getPickDeliveryRobots().subscribe((pickupDeliveryTypes: RobotType[]) => {
      this.robotService.getRobotsList().subscribe((allRobots: Robot[]) => {
        this.allRobots = allRobots.filter((robot: Robot) =>
          pickupDeliveryTypes.some((type: RobotType) => type.id === robot.robotType)
        );
      });
    });
    this.robotTypeService.getVigilanceRobots().subscribe((vigilanceTypes: RobotType[]) => {
      this.robotService.getRobotsList().subscribe((allRobots: Robot[]) => {
        this.allRobots = [...this.allRobots, ...allRobots.filter((robot: Robot) =>
          vigilanceTypes.some((type: RobotType) => type.id === robot.robotType)
        )];
      });
    });
  }

  getPickUpDeliveryRobots(){
    this.robotTypeService.getPickDeliveryRobots().subscribe((pickupDeliveryTypes: RobotType[]) => {
      this.robotService.getRobotsList().subscribe((allRobots: Robot[]) => {
        this.robotPickDelivery = allRobots.filter((robot: Robot) =>
          pickupDeliveryTypes.some((type: RobotType) => type.id === robot.robotType)
        );
      });
    });
  }
  getVigilanceRobots(){
    this.robotTypeService.getVigilanceRobots().subscribe((vigilanceTypes: RobotType[]) => {
      this.robotService.getRobotsList().subscribe((allRobots: Robot[]) => {
        this.robotVigilance = allRobots.filter((robot: Robot) =>
        vigilanceTypes.some((type: RobotType) => type.id === robot.robotType)
        );
      });
    });
  }

}
