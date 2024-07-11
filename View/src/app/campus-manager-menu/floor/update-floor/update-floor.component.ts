import { Component } from '@angular/core';
import { FloorService } from '../floor.service';
import { NgForm } from '@angular/forms';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';

@Component({
  selector: 'app-update-floor',
  templateUrl: './update-floor.component.html',
  styleUrls: ['./update-floor.component.css']
})
export class UpdateFloorComponent {
  id: string = '';
  floorNumber: string = '';
  description: string = '';
  floorBuilding: string = '';
  buildings: any[] = [];
  floors: any[] = [];
 
   constructor(private floorService: FloorService, private buildingService: BuildingService) { 
    this.getBuildings();
    this.getFloors();
   }
 
   updateFloor(formData: NgForm) {
     // You can access the form data directly from the formData parameter
     console.log("Form data from template:", formData.value);
 
     const floorData = {
       id: formData.value.id,
       floorNumber: formData.value.floorNumber,
       description: formData.value.description
     };
 
      console.log("Floor data before calling service:", floorData);
 
     this.floorService.updateFloor(
       floorData.id,
       floorData.floorNumber,
       floorData.description,
     ).subscribe(response => {
       // Handle the response, e.g., show a success message
       console.log('Floor updated:', response);
     }, error => {
       // Handle any errors, e.g., display an error message
       console.error('Error update floor:', error);
     });
   }
   getBuildings() {
    this.buildingService.getBuildingsList().subscribe((data) => {
      this.buildings = data;
    });
  }
  getFloors(){
    this.floorService.getFloorsList().subscribe((data) => {
      this.floors = data;
    })
  }
}
