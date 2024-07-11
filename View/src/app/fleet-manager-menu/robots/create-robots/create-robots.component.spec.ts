import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateRobotsComponent } from './create-robots.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RobotService } from '../robot.service';

describe('CreateRobotsComponent', () => {
  let component: CreateRobotsComponent;
  let fixture: ComponentFixture<CreateRobotsComponent>;
  let robotService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      declarations: [CreateRobotsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRobotsComponent);
    component = fixture.componentInstance;
    robotService = TestBed.inject(RobotService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch robot types on initialization', () => {
    const mockRobotTypes = [{ /* Mock robot types data */ }];
    spyOn(robotService, 'getRobotsTypeList').and.returnValue(of(mockRobotTypes));

    component.ngOnInit();

    expect(robotService.getRobotsTypeList).toHaveBeenCalled();
    expect(component.robots).toEqual(mockRobotTypes);
  });

  it('should create robot and handle success', fakeAsync(() => {
    const mockForm = {
      value: {
        code: 'ROBOT1',
        nickname: 'Test Robot',
        seriesNumber: 'SR123',
        robotType: 'TestType',
        description: 'Test Description',
        status: true
      }
    };
    spyOn(robotService, 'createRobots').and.returnValue(of({ message: 'Robot created successfully' }));

    component.createRobot(mockForm as any);
    tick();

    expect(robotService.createRobots).toHaveBeenCalledWith('ROBOT1', 'Test Robot', 'SR123', 'TestType', 'Test Description', true);
  }));

  it('should handle error during robot creation', fakeAsync(() => {
    const mockForm = {
      value: {
        code: 'ROBOT2',
        nickname: 'Test Robot 2',
        seriesNumber: 'SR456',
        robotType: 'AnotherType',
        description: 'Another Test Description',
        status: false
      }
    };
    spyOn(robotService, 'createRobots').and.returnValue(throwError(new Error('Failed to create robot')));

    component.createRobot(mockForm as any);
    tick();

    expect(robotService.createRobots).toHaveBeenCalledWith('ROBOT2', 'Test Robot 2', 'SR456', 'AnotherType', 'Another Test Description', false);
  }));
});
