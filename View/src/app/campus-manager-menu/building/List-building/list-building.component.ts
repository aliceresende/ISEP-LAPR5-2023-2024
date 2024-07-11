import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../building.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent {
  title = 'Building List';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private buildingService: BuildingService, private router: Router) { }
  buidlings = new Array<any>();
  ngOnInit(): void {
      this.getBuildings();
  }
  getBuildings(){
    this.buildingService.getBuildingsList().subscribe((data) => {
      this.buidlings = data;
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
    this.router.navigate(['/buildings']);
  }
}