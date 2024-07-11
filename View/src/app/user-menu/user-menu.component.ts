import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateTasksService } from './create-tasks.service';
import { PickUpDelivery } from './pickUpDelivery';
import { catchError, of, tap } from 'rxjs';
import { Vigilance } from './vigilance';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css', '/../app.component.css']
})

export class UserMenuComponent {
  
}



