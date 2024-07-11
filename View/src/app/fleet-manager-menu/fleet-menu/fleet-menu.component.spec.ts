import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetMenuComponent } from './fleet-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { TasksService } from 'src/app/task-manager-menu/tasks.service';

describe('FleetMenuComponent', () => {
  let component: FleetMenuComponent;
  let fixture: ComponentFixture<FleetMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FleetMenuComponent],
      imports:[RouterTestingModule],
      providers:[AuthService]
    });
    fixture = TestBed.createComponent(FleetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
