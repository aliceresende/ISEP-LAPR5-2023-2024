import { Component, OnInit } from '@angular/core';
import { RobotService } from '../robot.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-robots',
  templateUrl: './list-robots.component.html',
  styleUrls: ['./list-robots.component.css']
})
export class ListRobotsComponent {
  title = 'Robot List';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private robotService: RobotService, private router: Router) { }
  robots = new Array<any>();
  ngOnInit(): void {
      this.getRobots();
  }
  getRobots(){
    this.robotService.getRobotsList().subscribe((data) => {
      this.robots = data;
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
    this.router.navigate(['/robots']);
  }
}

