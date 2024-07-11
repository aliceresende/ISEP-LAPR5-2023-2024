import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateRobotsComponent } from './update-robots.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RobotService } from '../robot.service';

describe('UpdateRobotsComponent', () => {
  let component: UpdateRobotsComponent;
  let fixture: ComponentFixture<UpdateRobotsComponent>;
  let robotService: any;
  let router: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      declarations: [UpdateRobotsComponent],
      providers: [RobotService], // If using a real service, provide it here
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateRobotsComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should handle error when updating robot', () => {
    const formData = {
      value: {
        id: '1', // Set your test data here
      },
    };

    spyOn(robotService, 'updateRobots').and.returnValue(throwError('Error updating robot'));
    spyOn(console, 'error');

    component.updateRobot(formData);

    expect(robotService.updateRobots).toHaveBeenCalledWith('1'); // Ensure the service method is called with correct data
    expect(console.error).toHaveBeenCalledWith('Error updating passage:', 'Error updating robot'); // Ensure error is logged
  });


});
