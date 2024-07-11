import { Component } from '@angular/core';
import { FloorService } from '../floor.service';
import { Floor } from '../floor';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';

@Component({
  selector: 'app-list-floors',
  templateUrl: './list-floors.component.html',
  styleUrls: ['./list-floors.component.css']
})
export class ListFloorsComponent {
  floors: Floor[] = [];
  buildingID: string = '';
  buildings: any[] = [];

  constructor(private floorService: FloorService, private buildingService: BuildingService) {
    this.getBuildings();
   }

  getFloorsByBuilding(idBuilding:string): void {
    this.floors=[];
    idBuilding = idBuilding.trim();
    this.floorService.getFloorsByBuilding(idBuilding)
    .subscribe(floors => 
      {
        console.log('Floors:', floors);
        this.floors = floors;
      }); 
  }
  getBuildings() {
    this.buildingService.getBuildingsList().subscribe((data) => {
      this.buildings = data;
    });
  }


}
