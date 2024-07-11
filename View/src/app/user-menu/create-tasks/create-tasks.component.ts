import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTasksService } from '../create-tasks.service';
import { Vigilance } from '../vigilance';
import { PickUpDelivery } from '../pickUpDelivery';
import { BuildingService } from 'src/app/campus-manager-menu/building/building.service';
import { RoomService } from 'src/app/campus-manager-menu/room/room.service';
import { Room } from 'src/app/campus-manager-menu/room/room';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.css']
})
export class CreateTasksComponent implements OnInit{
  taskTypes = ['vigilance', 'pickupanddelivery'];
  taskForm!: FormGroup;
  rooms: any[] = [];

  constructor(private fb: FormBuilder,private createTaskService: CreateTasksService, private roomService: RoomService,private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskType: ['', Validators.required],
      vigilance: this.fb.group({
        userId: [this.authService.getLoggedInUserEmail(), Validators.required],
        message: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        startingPoint: ['', Validators.required],
        endingPoint: ['', Validators.required],
      }),
      pickupanddelivery: this.fb.group({
        userId: [this.authService.getLoggedInUserEmail(), Validators.required],
        roomPick: ['', Validators.required],
        roomDeliver: ['', Validators.required],
        namePick: ['', Validators.required],
        nameDeliver: ['', Validators.required],
        phoneNumberPick: ['', Validators.required],
        phoneNumberDeliver: ['', Validators.required],
        code: ['', Validators.required],
      })
    });
    this.getRooms();
  }
  onSubmit() {
    if (this.isVigilanceSelected) {
      const vigilanceData = this.taskForm.value.vigilance as Vigilance;
      this.createTaskService.createVigilanceRequests(vigilanceData).pipe(
       
      ).subscribe();
    } else if (this.isPickupAndDeliverySelected) {
      const pudData = this.taskForm.value.pickupanddelivery as PickUpDelivery;
      this.createTaskService.createPUDRequests(pudData).pipe(
      
      ).subscribe();
    }
  }

  get isVigilanceSelected() {
    return this.taskForm.get('taskType')?.value === 'vigilance';
  }

  get isPickupAndDeliverySelected() {
    return this.taskForm.get('taskType')?.value === 'pickupanddelivery';
  }
  getRooms() {
    this.roomService.getRoomsList().subscribe((rooms) => {
      this.rooms = rooms;
  });
}
}
