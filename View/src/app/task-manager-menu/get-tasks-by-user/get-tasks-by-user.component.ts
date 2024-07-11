import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { UserService } from 'src/app/user-menu/user.service';


@Component({
  selector: 'app-get-task-by-user',
  templateUrl: './get-tasks-by-user.component.html',
  styleUrls: ['./get-tasks-by-user.component.css']
})

export class GetTaskByUser{
    email : string = "";
    state: string = "";
    taskPickDeliver = new Array<any>();
    taskVigilance = new Array<any>();
    pickDeliver = new Array<any>();
    vigilance= new Array<any>();
    users = new Array<any>();
    user : any


    constructor(private taskRequestService: TasksService, private uService: UserService) { }
   
   
    getTaskByUser(email:string, state: string){
    const trimedEMail = email.trim();
    console.log(email)
    this.fetchPUDTasksByUser(trimedEMail)
    this.fetchVigilanceTasksByUser(trimedEMail)
    console.log(this.taskPickDeliver)
    console.log(this.taskVigilance)
    
    this.taskPickDeliver.forEach(element => {
      if(element.status === state){
        this.pickDeliver.push(element)
      }
    });

    this.taskVigilance.forEach(element => {
      console.log(element)
      console.log("teste")
      console.log(state)
      console.log(element.startingPoint)
      if(element.status === state){
        this.vigilance.push(element)
        console.log("if",element)
      }
    });
    }

    fetchPUDTasksByUser(email: string,) {
      console.log(email)
        this.taskRequestService.getPUDTaskByEmail(email).subscribe((data: any[]) => {
          this.taskPickDeliver = data;
        });
      }
    
    fetchVigilanceTasksByUser(email: string) {
      console.log(email)
        this.taskRequestService.getVigilanceTaskByEmail(email).subscribe((data: any[]) => {
          this.taskVigilance = data;
        });
    }

}