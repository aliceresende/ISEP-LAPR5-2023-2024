import { Component } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';
import { RobotService } from '../robot.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Robot {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-robots',
  templateUrl: './create-robots.component.html',
  styleUrls: ['./create-robots.component.css']
})


export class CreateRobotsComponent {

    code: string='';
    nickname:string='';
    seriesNumber:string='';
    description:string='';
    status:boolean=false;

    robots:any[] = [];
    
    ngOnInit() {
      this.getRobotTypes();
    }
    
    getRobotTypes() {
      this.robotService.getRobotsTypeList().subscribe((data) => {
        this.robots = data;
      });
    }
    robotType: string=''; // or whatever type your robotType is
    constructor(private robotService: RobotService,private router:Router) {}
    
    createRobot(formData: any) {
      // You can access the form data directly from the formData parameter
      
      const robotData = {
        code: formData.value.code,
        nickname:formData.value.nickname,
        seriesNumber:formData.value.seriesNumber,
        robotType:formData.value.robotType,
        description:formData.value.description,
        status:formData.value.status
      };

      console.log(robotData);
      this.robotService.createRobots(
        robotData.code,
        robotData.nickname,
        robotData.seriesNumber,
        robotData.robotType,
        robotData.description,
        robotData.status
      ).subscribe(response => {
        // Handle the response, e.g., show a success message
        console.log('Robot created:', response);
      }, error => {
        // Handle any errors, e.g., display an error message
        console.error('Error creating robot:', error);
      });
    }

    goBack() {
      this.router.navigate(['/robots']);
    }
}
