import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassageService } from '../../../campus-manager-menu/passage/passage.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { RobotService } from '../robot.service';
@Component({
  selector: 'app-update-robots',
  templateUrl: './update-robots.component.html',
  styleUrls: ['./update-robots.component.css']
})
export class UpdateRobotsComponent {
  robots = new Array<any>();
    
    ngOnInit() {
      this.getRobot();
    }
    
    getRobot() {
      this.robotService.getRobotsList().subscribe((data) => {
        this.robots = data;
      });
    }
  id:string='';
  constructor(private robotService: RobotService, private router:Router) {}
  updateRobot(formData: any) {
    // You can access the form data directly from the formData parameter
    const robotData = {
      id:formData.value.id
    };
    console.log(robotData);
    this.robotService.updateRobots(
      robotData.id,
    ).subscribe(response => {
      // Handle the response, e.g., show a success message
      console.log('Passage updated:', response);
    }, error => {
      // Handle any errors, e.g., display an error message
      console.error('Error updating passage:', error);
    });
  }
  goBack() {
    this.router.navigate(['/robots']);
  }
}
