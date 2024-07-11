import { Component } from '@angular/core';
import { BuildingService } from '../building.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-building',
  templateUrl: './update-building.component.html',
  styleUrls: ['./update-building.component.css']
})
export class UpdateBuildingComponent {
  id: string = '';
  name: string = '';
  code: string = '';
  description: string = '';
  x: number = 0 ;
  y: number = 0 ;
  buildings: any[]=[];
 
   constructor(private buildingService: BuildingService) { 
    this.getBuildings();
   }
 
 
   updateBuilding(formData: NgForm) {
     // You can access the form data directly from the formData parameter
     console.log("Form data from template:", formData.value);
 
     const buildingData = {
       id: formData.value.id,
       name: formData.value.name,
       code: formData.value.code,
       description: formData.value.description,
       x: formData.value.x,
       y: formData.value.y
     };
 
      console.log("building data before calling service:", buildingData);
 
     this.buildingService.updateBuilding(
       buildingData.id,
       buildingData.name,
       buildingData.code,
       buildingData.description,
       buildingData.x,
       buildingData.y,
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
      console.log(this.buildings)
    });
  }
   
}
