import { Component } from '@angular/core';
import { FloorService } from '../../floor/floor.service';
import {Building} from "../building";

@Component({
  selector: 'app-list-min-max',
  templateUrl: './list-min-max.component.html',
  styleUrls: ['./list-min-max.component.css']
})
export class ListMinMaxComponent {
  buildings: Building[] = [];
  max: string = '';
  min: string = '';

  constructor(private floorService: FloorService) { }

  getMinMaxFloorBuildings(min: string, max: string): void {
    this.buildings = [];
    max = max.trim();
    min = min.trim();
    this.floorService.getMinMaxFloorBuildings(min, max).subscribe(buildings => {
      console.log('Buildings:', buildings);
      this.buildings = buildings; // Try assigning buildings directly to see the structure
    });

  }
}
