import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { CreateRobotTypeComponent } from './create-robot-type.component';
import { RobotTypeService } from '../robot-type.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateRobotTypeComponent', () => {
  let component: CreateRobotTypeComponent;
  let fixture: ComponentFixture<CreateRobotTypeComponent>;
  let robotTypeService: RobotTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CreateRobotTypeComponent],
      providers: [RobotTypeService]
    });

    fixture = TestBed.createComponent(CreateRobotTypeComponent);
    component = fixture.componentInstance;
    robotTypeService = TestBed.inject(RobotTypeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRobotType method and subscribe to the service', () => {
    const formData: Partial<NgForm> = {
      value: {
        robotType: 'Test Robot',
        brand: 'Test Brand',
        model: 'Test Model',
        typeOfTasks: ['task1', 'task2']
      }
    };

    const createSpy = spyOn(robotTypeService, 'create').and.returnValue(of('Created!'));
    
    component.createRobotType(formData as NgForm);

    expect(createSpy).toHaveBeenCalledWith('Test Robot', 'Test Brand', 'Test Model', ['task1', 'task2']);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });



  it('should update typeOfTasks based on selection', () => {
    component.typeOfTasks = ['ambas'];

    component.typeOfTaskChanged();
    expect(component.typeOfTasks).toEqual(['pickupdelivery', 'vigilancia']);

    component.typeOfTasks = ['pickupdelivery'];

    component.typeOfTaskChanged();
    expect(component.typeOfTasks).toEqual(['pickupdelivery']);

    component.typeOfTasks = ['vigilancia'];

    component.typeOfTaskChanged();
    expect(component.typeOfTasks).toEqual(['vigilancia']);
  });
});
