import { ComponentFixture, TestBed } from '@angular/core/testing';
import {GetTaskByUser} from "./get-tasks-by-user.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';


describe('GetTasksByUserComponent', () => {
  let component: GetTaskByUser;
  let fixture: ComponentFixture<GetTaskByUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetTaskByUser],
      imports: [HttpClientTestingModule, FormsModule],
      providers:[TasksService]
    });
    fixture = TestBed.createComponent(GetTaskByUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
