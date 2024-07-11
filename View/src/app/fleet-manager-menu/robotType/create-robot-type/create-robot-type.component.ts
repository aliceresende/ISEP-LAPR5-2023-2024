import { Component } from '@angular/core';
import { RobotType } from '../robotType';
import { RobotTypeService } from '../robot-type.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-robot-type',
  templateUrl: './create-robot-type.component.html',
  styleUrls: ['./create-robot-type.component.css']
})
export class CreateRobotTypeComponent {
  constructor(private robotTypeService: RobotTypeService) {}

  robotType: string = '';
  brand: string = '';
  model: string = '';
  typeOfTasks: string[] = [];

  typeOfTaskChanged() {
    if (this.typeOfTasks.includes('ambas')) {
      this.typeOfTasks = ['pickupdelivery', 'vigilancia'];
    } else if (this.typeOfTasks.includes('pickupdelivery')) {
      this.typeOfTasks = ['pickupdelivery'];
    } else if (this.typeOfTasks.includes('vigilancia')) {
      this.typeOfTasks = ['vigilancia'];
    }
  }

  createRobotType(formData: NgForm): void {
    const robotTypeData ={
      robotType: formData.value.robotType,
      brand: formData.value.brand,
      model: formData.value.model,
      typeOfTasks: formData.value.typeOfTasks
    };

    this.robotTypeService.create(
      robotTypeData.robotType,
      robotTypeData.brand,
      robotTypeData.model,
      robotTypeData.typeOfTasks
        )
      .subscribe(response => {
        console.log(response);
      });
  }
}
