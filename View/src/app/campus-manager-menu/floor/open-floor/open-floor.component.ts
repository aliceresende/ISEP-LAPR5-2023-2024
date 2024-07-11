import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FloorService } from '../floor.service';

@Component({
  selector: 'app-open-floor',
  templateUrl: './open-floor.component.html',
  styleUrls: ['./open-floor.component.css']
})
export class OpenFloorComponent {
  floors: any[] = [];
  selectedFloor: string = ''; // Make sure selectedFloor is of type string
  selectedAutomaticFloor: string = ''; 
  constructor(private floorService: FloorService) { 
    this.getFloors();
   }

   openFloor() {
    if (!this.selectedFloor) {
      // If no floor is selected, handle accordingly (show an error message, etc.)
      alert('Please select a floor.');
      return;
    }
    const link = `http://192.168.1.70:5500/3DView/SGRAI/Thumb_Raiser.html?floor=${this.selectedFloor}`;
    window.open(link, '_blank');
  }
  openAutomaticFloor() {
    if (!this.selectedFloor) {
      // If no floor is selected, handle accordingly (show an error message, etc.)
      alert('Please select a floor.');
      return;
    }
    const link = `http://192.168.1.70:5500/3DView/SGRAI/Thumb_Raiser_auto.html?floor=${this.selectedAutomaticFloor}`;
    window.open(link, '_blank');
  }
  getFloors(){
    this.floorService.getFloorsList().subscribe((data) => {
      this.floors = data;
    })
  }

}

