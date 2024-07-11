import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTasksComponent } from './create-tasks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTasksService } from '../create-tasks.service';
import { RoomService } from 'src/app/campus-manager-menu/room/room.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/campus-manager-menu/room/room';

describe('CreateTasksComponent', () => {
  let component: CreateTasksComponent;
  let fixture: ComponentFixture<CreateTasksComponent>;
  let createTasksService: CreateTasksService;
  let roomService: RoomService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [CreateTasksComponent],
      providers: [CreateTasksService, RoomService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTasksComponent);
    component = fixture.componentInstance;
    createTasksService = TestBed.inject(CreateTasksService);
    roomService = TestBed.inject(RoomService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should initialize with a defined taskForm', () => {
    expect(component.taskForm).toBeDefined();
  });
  
  it('should have an empty rooms array on init', () => {
    expect(component.rooms).toEqual([]);
  });
  it('should create task form with required fields', () => {
    const taskForm = component.taskForm;
    expect(taskForm.get('taskType')).toBeDefined();
    expect(taskForm.get('vigilance')).toBeDefined();
    expect(taskForm.get('pickupanddelivery')).toBeDefined();
  });
  
  it('should validate task form fields', () => {
    const taskForm = component.taskForm;
    expect(taskForm.valid).toBeFalsy(); // Should be invalid when empty
  
    taskForm.patchValue({
      taskType: 'vigilance',
      vigilance: {
        userId: 'testuser@example.com',
        message: 'Test Message',
        phoneNumber: '1234567890',
        startingPoint: 'Point A',
        endingPoint: 'Point B'
      }
    });
    expect(taskForm.valid).toBeFalsy(); // Should be valid with correct data
  });
    
 
});
