import { Component, OnInit } from '@angular/core';
import { FloorService } from '../floor.service';
import { NgForm } from '@angular/forms';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html' ,
  styleUrls: ['./floor.component.css']
})
export class FloorComponent  {
 floorNumber: string = '';
 description: string = '';
 floorBuilding: string = '';
 buildings: any[] = [];

  constructor(private floorService: FloorService, private buildingService: BuildingService) { 
    this.getBuildings();
  }


  createFloor(formData: NgForm) {
    // You can access the form data directly from the formData parameter
    console.log("Form data from template:", formData.value);

    const floorData = {
      floorNumber: formData.value.floorNumber,
      description: formData.value.description,
      floorBuilding: formData.value.floorBuilding
    };

     console.log("Floor data before calling service:", floorData);

    this.floorService.createFloor(
      floorData.floorNumber,
      floorData.description,
      floorData.floorBuilding,
    ).subscribe(response => {
      // Handle the response, e.g., show a success message
      console.log('Floor created:', response);
    }, error => {
      // Handle any errors, e.g., display an error message
      console.error('Error creating floor:', error);
    });
  }
  getBuildings() {
    this.buildingService.getBuildingsList().subscribe((data) => {
      this.buildings = data;
    });
  }

}

