import { Component, NgModule } from '@angular/core';
import { PassageService } from '../passage.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateRobotsComponent } from '../../../fleet-manager-menu/robots/update-robots/update-robots.component';
@Component({
  selector: 'app-update-passages',
  templateUrl: './update-passages.component.html',
  styleUrls: ['./update-passages.component.css']
})
export class UpdatePassagesComponent {
  id:string='';
  
  location: string = '';
  selectedPassage: any;
  passages = new Array<any>();
  floors = new Array<any>();

    
    ngOnInit() {
      this.getPassages();
      this.getFloors();
    }
    
    getPassages() {
      this.passageService.getPassageList().subscribe((data) => {
        this.passages = data;
        console.log(data);
      });
    }
    getFloors() {
      this.passageService.getFloorsList().subscribe((data) => {
        this.floors = data;
      });
    }
    passageCode:string='';
    floorBuilding1: string = '';
    floorBuilding2: string = '';
  constructor(private passageService: PassageService, private router:Router) {}
  createPassage(formData: any) {
    // You can access the form data directly from the formData parameter
    const selectedId = this.selectedPassage.id;
    const selectedPassageCode = this.selectedPassage.passageCode;
    const passageData = {
      id:selectedId,
      floorBuilding1: formData.value.floorBuilding1,
      floorBuilding2: formData.value.floorBuilding2,
      location: formData.value.location,
      passageCode:selectedPassageCode
    };
    console.log(passageData);
    this.passageService.updatePassage(
      passageData.id,
      passageData.floorBuilding1,
      passageData.floorBuilding2,
      passageData.location,
      passageData.passageCode
    ).subscribe(response => {
      // Handle the response, e.g., show a success message
      console.log('Passage updated:', response);
    }, error => {
      // Handle any errors, e.g., display an error message
      console.error('Error updating passage:', error);
    });
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
