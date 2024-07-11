import { Component } from '@angular/core';
import { BuildingService } from '../building.service';
import { FormBuilder, Validators} from '@angular/forms';
import { Building } from '../building';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent {

  buildings= this.buildingService.items;

  checkoutForm = this.formBuilder.group({
    name: ['',Validators.required],
    code: ['',Validators.required],
    description: [''],
    x: [0,Validators.min(0)],
    y: [0,Validators.min(0)],
  });

  constructor(
    private buildingService: BuildingService,
    private formBuilder: FormBuilder,
  ) { }


  add(name: string, code: string, description:string, x: number, y : number): void {
    if (!name && !code && !x &&!y) { return; }

    this.buildingService.createBuilding({ name,code,description,x,y } as Building)
      .subscribe(building => {this.buildings.push(building);});
  }


}
