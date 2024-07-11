import { Component } from '@angular/core';
import {Elevator} from "../elevator";
import {ElevatorService} from "../elevator.service";
import {BuildingService} from "../../building/building.service";

@Component({
  selector: 'app-list-elevator',
  templateUrl: './list-elevator.component.html',
  styleUrls: ['./list-elevator.component.css']
})
export class ListElevatorComponent {

  elevatorsList: Elevator[] = [];
  buildingID: string ='';
  buildings: any[] = [];

  constructor(
    private elevatorService: ElevatorService,
    private buildingService:BuildingService
  ) {
    this.getBuildings();
  }

  getElevators(idBuilding:string): void {
    this.elevatorService.getElevators(idBuilding).subscribe(elevators => {console.log(elevators);this.elevatorsList = elevators});
  }

  getBuildings() {
    this.buildingService.getBuildingsList().subscribe((data) => {
      this.buildings = data;
    });
  }

}
