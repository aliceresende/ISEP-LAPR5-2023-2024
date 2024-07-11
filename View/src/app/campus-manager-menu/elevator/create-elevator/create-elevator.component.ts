import { Component, OnInit } from '@angular/core';
import { ElevatorService } from '../elevator.service';
import { NgForm } from '@angular/forms';
import { Floor } from 'src/app/campus-manager-menu/floor/floor';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';
import { Building } from 'src/app/campus-manager-menu/building/building';
import { FloorService } from 'src/app/campus-manager-menu/floor/floor.service';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html' ,
  styleUrls: ['./elevator.component.css']
})
export class CreateElevatorComponent  {

 elevatorBuilding: string = '';
 elevatorFloors: String[] = [];
 elevatorBrand: string = '';
 elevatorModel: string = '';
 elevatorSeriesNumber: string = '';
 elevatorDescription: string = '';
 elevatorX: string = '';
 elevatorY: string = '';
 elevatorLocation: string = '';
 buildings: any[] = [];
 availableFloors: any[] = [];

  constructor(private elevatorService: ElevatorService,private buildingService: BuildingService, private floorService: FloorService) {
    this.getBuildings();
    this.getFloors();
   }


  createElevator(formData: NgForm) {
    // You can access the form data directly from the formData parameter
    console.log("Form data from template:", formData.value);

    const elevatorData = {
      building: formData.value.elevatorBuilding,
      floors: formData.value.elevatorFloors,
      brand: formData.value.elevatorBrand,
      model: formData.value.elevatorModel,
      seriesNumber: formData.value.elevatorSeriesNumber,
      description: formData.value.elevatorDescription,
      x: formData.value.elevatorX,
      y: formData.value.elevatorY,
      location: formData.value.elevatorLocation
    };
    console.log(elevatorData.floors);

     console.log("elevator data before calling service:", elevatorData);

    this.elevatorService.create(
      elevatorData.building,
      elevatorData.floors,
      elevatorData.brand,
      elevatorData.model,
      elevatorData.seriesNumber,
      elevatorData.description,
      elevatorData.x,
      elevatorData.y,
      elevatorData.location
    ).subscribe(response => {
      // Handle the response, e.g., show a success message
      console.log('elevator created:', response);
    }, error => {
      // Handle any errors, e.g., display an error message
      console.error('Error creating elevator:', error);
    });
  }

  getBuildings() {
    this.buildingService.getBuildingsList().subscribe((data) => {
      this.buildings = data;
      console.log(this.buildings)
    });
  }

  getFloors() {
    this.floorService.getFloorsList().subscribe((data) => {
      this.availableFloors = data;
      console.log(this.availableFloors)
    });
  }
}
