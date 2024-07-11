import { Component } from '@angular/core';
import { PassageService } from '../passage.service';
import { Router } from '@angular/router';
import { FloorService } from 'src/app/campus-manager-menu/floor/floor.service';

@Component({
  selector: 'app-list-passages',
  templateUrl: './list-passages.component.html',
  styleUrls: ['./list-passages.component.css']
})
export class ListPassagesComponent {
  title = 'Passage List';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private passageService: PassageService,private floorService:FloorService, private router: Router) { }
  passages = new Array<any>();
  ngOnInit(): void {
      this.getPassages();
  }
  getPassages() {
    this.passageService.getPassageList().subscribe((data) => {
      this.passages = data;
  
      // Iterate through each passage and update floorBuilding descriptions
      this.passages.forEach((passage) => {
        // Assuming 'floorBuilding1' and 'floorBuilding2' are properties in each passage
        this.floorService.getFloorsByBuilding(passage.floorBuilding1).subscribe((floor1) => {
          passage.floorBuilding1 = floor1.description;
          console.log(passage.floorBuilding1);
        });
  
        this.floorService.getFloorsByBuilding(passage.floorBuilding2).subscribe((floor2) => {
          passage.floorBuilding2 = floor2.description;
          console.log(passage.floorBuilding2);
        });
      });
    });
    
    
  }
  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.errorMessage = null;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // 3000 milliseconds (3 seconds)
  }
  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.successMessage = null;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000); // 3000 milliseconds (3 seconds)
  }
  goBack() {
    this.router.navigate(['/passages']);
  }

}
