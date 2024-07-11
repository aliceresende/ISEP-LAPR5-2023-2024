import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMenuComponent } from './task-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { TasksService } from '../tasks.service';

describe('TaskMenuComponent', () => {
  let component: TaskMenuComponent;
  let fixture: ComponentFixture<TaskMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskMenuComponent],
      imports:[RouterTestingModule],
      providers:[AuthService,TasksService]
    });
    fixture = TestBed.createComponent(TaskMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
