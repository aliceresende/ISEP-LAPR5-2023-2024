import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RoomService} from "../room.service";
import {Room} from "../room";
import {Floor} from "../../floor/floor";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {

  rooms= this.roomService.items

  checkoutForm = this.formBuilder.group({
    floor: [''],
    name: ['',Validators.required],
    xDimension: [0,Validators.min(0)],
    yDimension: [0,Validators.min(0)],
    roomType: [''],
    description: [''],
  });

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
  ) { }

  add(floor:string,name: string, xDimension: number, yDimension : number,roomType:string, description:string ): void {
    if (!name && !roomType && !xDimension &&!yDimension) { return; }

    this.roomService.createRoom({ floor,name,xDimension,yDimension,roomType,description} as Room)
      .subscribe(room => {this.rooms.push(room);});
  }
}
