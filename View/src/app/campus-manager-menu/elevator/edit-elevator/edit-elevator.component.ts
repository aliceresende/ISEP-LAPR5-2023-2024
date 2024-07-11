import { Component } from '@angular/core';
import {ElevatorService} from "../elevator.service";
import {BuildingService} from "../../building/building.service";
import {FloorService} from "../../floor/floor.service";
import {NgForm} from "@angular/forms";
import {Elevator} from "../elevator";

@Component({
  selector: 'app-edit-elevator',
  templateUrl: './edit-elevator.component.html',
  styleUrls: ['./edit-elevator.component.css']
})
export class EditElevatorComponent {

  id: string = '';
  elevators: any[] = [];

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
    this.getElevators();
    this.getBuildings();
    this.getFloors();
  }

  updateElevator(formData: NgForm) {
    // You can access the form data directly from the formData parameter
    console.log("Form data from template:", formData.value);

    const elevatorData = {
      id: formData.value.id,
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

    this.elevatorService.update(
      elevatorData.id,
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
      console.log('elevator updated:', response);
    }, error => {
      // Handle any errors, e.g., display an error message
      console.error('Error updating elevator:', error);
    });
  }

  getElevators(){
    this.elevatorService.getAllElevators().subscribe((data)=>{
      this.elevators = data;
      console.log(this.elevators);
    })
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
