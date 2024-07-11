import { Component } from '@angular/core';
import { PassageService } from '../passage.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-passages',
  templateUrl: './create-passages.component.html',
  styleUrls: ['./create-passages.component.css']
})
export class CreatePassagesComponent {
  floorBuilding1: string = '';
  floorBuilding2: string = '';
  location: string = '';
  passageCode:string='';
  floors: any[] = [];
  constructor(private passageService: PassageService,private router:Router) {
    this.getFloors();
  }

  createPassage(formData: any) {
    // You can access the form data directly from the formData parameter
    const passageData = {
      floorBuilding1: formData.value.floorBuilding1,
      floorBuilding2: formData.value.floorBuilding2,
      location: formData.value.location,
      passageCode:formData.value.passageCode
    };

    console.log(passageData);

    this.passageService.createPassage(
      passageData.floorBuilding1,
      passageData.floorBuilding2,
      passageData.location,
      passageData.passageCode
    ).subscribe(response => {
      // Handle the response, e.g., show a success message
      console.log('Passage created:', response);
    }, error => {
      // Handle any errors, e.g., display an error message
      console.error('Error creating passage:', error);
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
  getFloors() {
    this.passageService.getFloorsList().subscribe((data) => {
      this.floors = data;
    });
  }
}
